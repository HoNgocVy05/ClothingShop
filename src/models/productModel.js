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
        WHERE p.category_id = ?
        ORDER BY p.id DESC
    `;

    const [rows] = await db.query(sql, [categoryId]);

    return rows.map(r => {
        let images = [];

        // Parse ảnh an toàn
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

    // DANH MỤC
    if (categoryId) {
        conditions.push("p.category_id = ?");
        params.push(categoryId);
    }

    // SALE
    if (isSale === "1") { // nhớ chuỗi
        conditions.push("p.discount_percent > 0");
    }

    // GIÁ
    switch (priceRange) {
        case "0-200":
            conditions.push("p.final_price BETWEEN 0 AND 200000");
            break;
        case "200-500":
            conditions.push("p.final_price BETWEEN 200000 AND 500000");
            break;
        case "500-1000":
            conditions.push("p.final_price BETWEEN 500000 AND 1000000");
            break;
        case "1000+":
            conditions.push("p.final_price > 1000000");
            break;
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
        ORDER BY p.id DESC
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
