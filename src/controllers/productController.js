const Product = require('../models/productModel');

// ADD
exports.addProduct = async (req, res) => {
    try {
        const images = req.files?.length ? req.files.map(f => f.filename) : [];

        const data = {
            name: req.body.name,
            category_id: req.body.category_id,
            price: req.body.price,
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

        req.session.save((err) => {
            if (err) {
                console.error("Session save error:", err);
                return res.status(500).json({ error: "Lỗi lưu session" });
            }
            return res.redirect('/admin/product-management');
        });

    } catch (err) {
        console.error("Add product error:", err);

        req.session.message = {
            type: "error",
            text: "Lỗi khi thêm sản phẩm!"
        };

        req.session.save((err) => {
            if (err) {
                console.error("Session save error:", err);
                return res.status(500).json({ error: "Lỗi lưu session" });
            }
            return res.redirect('/admin/product-management');
        });
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

        req.session.save((err) => {
            if (err) {
                console.error("Session save error:", err);
                return res.status(500).json({ error: "Lỗi lưu session" });
            }
            return res.redirect('/admin/product-management');
        });

    } catch (err) {
        console.error("Update product error:", err);

        req.session.message = {
            type: "error",
            text: "Lỗi khi cập nhật sản phẩm!"
        };

        req.session.save((err) => {
            if (err) {
                console.error("Session save error:", err);
                return res.status(500).json({ error: "Lỗi lưu session" });
            }
            return res.redirect('/admin/product-management');
        });
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

        req.session.save((err) => {
            if (err) {
                console.error("Session save error:", err);
                return res.status(500).json({ error: "Lỗi lưu session" });
            }
            return res.redirect('/admin/product-management');
        });

    } catch (err) {
        console.error("Delete product error:", err);

        req.session.message = {
            type: "error",
            text: "Lỗi khi xóa sản phẩm!"
        };

        req.session.save((err) => {
            if (err) {
                console.error("Session save error:", err);
                return res.status(500).json({ error: "Lỗi lưu session" });
            }
            return res.redirect('/admin/product-management');
        });
    }
};
