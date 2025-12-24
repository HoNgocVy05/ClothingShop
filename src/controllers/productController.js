const Product = require('../models/productModel');
const pool = require('../models/database');


// ADD
exports.addProduct = async (req, res) => {
    try {
        const images = req.files?.length ? req.files.map(f => f.filename) : [];

        const data = {
            name: req.body.name,
            category_id: req.body.category_id,
            price: req.body.price,
            discount_percent: Number(req.body.discount_percent || 0),
            final_price: req.body.final_price || req.body.price,
            description: req.body.description || null,
            stock_s: Number(req.body.stock_s || 0),
            stock_m: Number(req.body.stock_m || 0),
            stock_l: Number(req.body.stock_l || 0),
            stock_xl: Number(req.body.stock_xl || 0),
            images
        };

        await Product.add(data);

        // thông báo
        req.session.message = {
            type: "success",
            text: "Thêm sản phẩm thành công!"
        };

        return res.redirect('/admin/product-management');

    } catch (err) {
        console.error("Add product error:", err);

        req.session.message = {
            type: "error",
            text: "Lỗi khi thêm sản phẩm!"
        };

        return res.redirect('/admin/product-management');
    }
};


// UPDATE
exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const newImages = req.files?.length ? req.files.map(f => f.filename) : [];
        
        // Lấy ảnh cũ từ request body (nếu có)
        const oldImages = req.body.old_images ? JSON.parse(req.body.old_images) : [];
        
        // Gộp ảnh cũ và ảnh mới
        const images = [...oldImages, ...newImages];

        const data = {
            name: req.body.name,
            category_id: req.body.category_id,
            price: req.body.price,
            discount_percent: Number(req.body.discount_percent || 0),
            final_price: req.body.final_price || req.body.price,
            description: req.body.description || null,
            stock_s: Number(req.body.stock_s || 0),
            stock_m: Number(req.body.stock_m || 0),
            stock_l: Number(req.body.stock_l || 0),
            stock_xl: Number(req.body.stock_xl || 0),
            images
        };

        await Product.update(id, data);

        req.session.message = {
            type: "success",
            text: "Cập nhật sản phẩm thành công!"
        };

        return res.redirect('/admin/product-management');

    } catch (err) {
        console.error("Update product error:", err);

        req.session.message = {
            type: "error",
            text: "Lỗi khi cập nhật sản phẩm!"
        };

        return res.redirect('/admin/product-management');
    }
};


// DELETE
exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        await Product.delete(id);

        req.session.message = {
            type: "success",
            text: "Xóa sản phẩm thành công!"
        };

        return res.redirect('/admin/product-management');

    } catch (err) {
        console.error("Delete product error:", err);

        req.session.message = {
            type: "error",
            text: "Lỗi khi xóa sản phẩm!"
        };

        return res.redirect('/admin/product-management');
    }
};
exports.deleteMultiple = async (req, res) => {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Chưa chọn sản phẩm nào để xóa!'
        });
    }

    try {
        // Kiểm tra những sản phẩm nào đã có trong order_items
        const [linkedRows] = await pool.query(
            'SELECT DISTINCT product_id FROM order_items WHERE product_id IN (?)',
            [ids]
        );

        const linkedIds = linkedRows.map(row => row.product_id);
        const safeToDeleteIds = ids.filter(id => !linkedIds.includes(parseInt(id)));

        let message = '';
        let deletedCount = 0;

        if (safeToDeleteIds.length > 0) {
            const placeholders = safeToDeleteIds.map(() => '?').join(',');
            await pool.query(`DELETE FROM products WHERE id IN (${placeholders})`, safeToDeleteIds);
            deletedCount = safeToDeleteIds.length;
        }

        if (linkedIds.length > 0) {
            message = `Đã xóa thành công ${deletedCount} sản phẩm. `;
            message += `Không thể xóa ${linkedIds.length} sản phẩm (ID: ${linkedIds.sort((a,b)=>a-b).join(', ')}) vì đã có đơn hàng liên kết.`;
            return res.json({
                success: true, // vẫn tính là thành công một phần
                partial: true,
                message,
                deletedCount,
                blockedIds: linkedIds
            });
        }

        res.json({
            success: true,
            message: `Xóa thành công ${deletedCount} sản phẩm!`,
            deletedCount
        });

    } catch (err) {
        console.error('DELETE MULTIPLE ERROR:', err);
        res.status(500).json({
            success: false,
            message: 'Lỗi server khi xóa sản phẩm!'
        });
    }
};