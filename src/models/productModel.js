const db = require('../models/database'); // mysql2/promise

exports.getAll = async () => {
    const sql = `
        SELECT p.*, c.name AS category_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        ORDER BY p.id DESC
    `;
    const [rows] = await db.query(sql);

    return rows.map(r => ({
        ...r,
        images: r.images ? JSON.parse(r.images) : [],
        stock_s: Number(r.stock_s || 0),
        stock_m: Number(r.stock_m || 0),
        stock_l: Number(r.stock_l || 0),
        stock_xl: Number(r.stock_xl || 0)
    }));
};

exports.getById = async (id) => {
    const [rows] = await db.query(`
        SELECT * FROM products WHERE id = ?
    `, [id]);

    if (!rows[0]) return null;

    return {
        ...rows[0],
        images: rows[0].images ? JSON.parse(rows[0].images) : []
    };
};

exports.getByCategory = async (categoryId) => {
    const sql = `
        SELECT 
            p.*, 
            c.name AS category_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.category_id IN (
            SELECT id FROM categories WHERE id = ? OR parent_id = ?
        )
        ORDER BY p.id DESC
    `;

    // Truyền categoryId vào 2 lần cho 2 dấu hỏi chấm
    const [rows] = await db.query(sql, [categoryId, categoryId]);

    return rows.map(r => {
        let images = [];
        try {
            images = r.images ? JSON.parse(r.images) : [];
        } catch (e) {
            images = [];
        }

        return {
            ...r,
            images,
            stock_s: Number(r.stock_s || 0),
            stock_m: Number(r.stock_m || 0),
            stock_l: Number(r.stock_l || 0),
            stock_xl: Number(r.stock_xl || 0),
        };
    });
};

exports.filterProducts = async ({ categoryId, isSale, priceRange, size }) => {
    let conditions = [];
    let params = [];

    // DANH MỤC (Xử lý cả cha và con)
    if (categoryId) {
        conditions.push(`p.category_id IN (SELECT id FROM categories WHERE id = ? OR parent_id = ?)`);
        params.push(categoryId, categoryId);
    }

    // SALE
    if (isSale) {
        conditions.push("p.discount_percent > 0");
    }

    // GIÁ
    switch (priceRange) {
        case "0-200": conditions.push("p.final_price BETWEEN 0 AND 200000"); break;
        case "200-500": conditions.push("p.final_price BETWEEN 200000 AND 500000"); break;
        case "500-1000": conditions.push("p.final_price BETWEEN 500000 AND 1000000"); break;
        case "1000+": conditions.push("p.final_price > 1000000"); break;
    }

    // SIZE
    switch (size) {
        case "S": conditions.push("p.stock_s > 0"); break;
        case "M": conditions.push("p.stock_m > 0"); break;
        case "L": conditions.push("p.stock_l > 0"); break;
        case "XL": conditions.push("p.stock_xl > 0"); break;
    }

    const sql = `
        SELECT p.*, c.name AS category_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        ${conditions.length ? "WHERE " + conditions.join(" AND ") : ""}
        ORDER BY ${
            sort === 'price-asc' ? 'p.final_price ASC' :
            sort === 'price-desc' ? 'p.final_price DESC' :
            'p.id DESC'
        }
    `;

    const [rows] = await db.query(sql, params);

    return rows.map(r => ({
        ...r,
        images: r.images ? JSON.parse(r.images) : [],
        stock_s: Number(r.stock_s || 0),
        stock_m: Number(r.stock_m || 0),
        stock_l: Number(r.stock_l || 0),
        stock_xl: Number(r.stock_xl || 0)
    }));
};

exports.add = async (data) => {
    const sql = `
        INSERT INTO products 
        (name, category_id, stock_s, stock_m, stock_l, stock_xl, price, discount_percent, final_price, description, images)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [
        data.name,
        data.category_id,
        data.stock_s,
        data.stock_m,
        data.stock_l,
        data.stock_xl,
        data.price,
        data.discount_percent || 0,
        data.final_price || data.price,
        data.description || null,
        JSON.stringify(data.images || [])
    ]);

    return result.insertId;
};

exports.update = async (id, data) => {
    const sql = `
        UPDATE products SET
            name=?, category_id=?, 
            stock_s=?, stock_m=?, stock_l=?, stock_xl=?, 
            price=?, discount_percent=?, final_price=?, description=?, images=?
        WHERE id=?
    `;

    await db.query(sql, [
        data.name,
        data.category_id,
        data.stock_s,
        data.stock_m,
        data.stock_l,
        data.stock_xl,
        data.price,
        data.discount_percent || 0,
        data.final_price || data.price,
        data.description || null,
        JSON.stringify(data.images || []),
        id
    ]);

    return true;
};

exports.delete = async (id) => {
    await db.query(`
        DELETE FROM products WHERE id=?
    `, [id]);
    return true;
};

exports.searchByName = async (keyword, sort) => {
    let orderBy = 'p.id DESC'; // default
    switch (sort) {
        case 'newest':
            orderBy = 'p.createdAt DESC';
            break;
        case 'price-asc':
            orderBy = 'p.final_price ASC';
            break;
        case 'price-desc':
            orderBy = 'p.final_price DESC';
            break;
    }

    const sql = `
        SELECT p.*, c.name AS category_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.name LIKE ?
        ORDER BY ${orderBy}
    `;
    const [rows] = await db.query(sql, [`%${keyword}%`]);
    return rows.map(r => ({
        ...r,
        images: r.images ? JSON.parse(r.images) : [],
        stock_s: Number(r.stock_s || 0),
        stock_m: Number(r.stock_m || 0),
        stock_l: Number(r.stock_l || 0),
        stock_xl: Number(r.stock_xl || 0)
    }));
};
// Lấy top N sản phẩm bán chạy
exports.getBestSellers = async (limit = 5) => {
    const [rows] = await db.query(`
        SELECT p.id, p.name, SUM(oi.quantity) as sold, SUM(oi.price * oi.quantity) as revenue
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        GROUP BY p.id, p.name
        ORDER BY sold DESC
        LIMIT ?
    `, [limit]);
    return rows;
};

exports.getLowStockProducts = async (threshold = 10) => {
    const sql = `
        SELECT 
            id, name,
            stock_s, stock_m, stock_l, stock_xl,
            (stock_s + stock_m + stock_l + stock_xl) AS total_stock
        FROM products
        WHERE (stock_s + stock_m + stock_l + stock_xl) < ?
        ORDER BY total_stock ASC
    `;
    const [rows] = await db.query(sql, [threshold]);
    return rows;
};
exports.getLowStockBySize = async (threshold = 10) => {
    const sql = `
        SELECT 
            id, name,
            stock_s, stock_m, stock_l, stock_xl
        FROM products
        WHERE stock_s < ? OR stock_m < ? OR stock_l < ? OR stock_xl < ?
        ORDER BY id ASC
    `;
    const [rows] = await db.query(sql, [threshold, threshold, threshold, threshold]);
    return rows;
};
exports.deleteMultiple = async (ids) => {
    if (!ids.length) return;
    const placeholders = ids.map(() => '?').join(',');
    const sql = `DELETE FROM products WHERE id IN (${placeholders})`;
    console.log('SQL DELETE:', sql, 'IDS:', ids);
    await db.query(sql, ids);
};