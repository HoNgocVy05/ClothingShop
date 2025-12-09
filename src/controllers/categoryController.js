const Category = require('../models/categoryModel');

// GET all
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.getAll();
        res.json({ success: true, categories });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Lỗi load danh mục" });
    }
};

// ADD
exports.addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.json({ success: false, message: "Thiếu tên danh mục" });

        const newId = await Category.add(name);
        res.json({ success: true, id: newId });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
};

// UPDATE
exports.updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const { name } = req.body;

        await Category.update(id, name);
        res.json({ success: true });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
};

// DELETE
exports.deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;

        await Category.delete(id);
        res.json({ success: true });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
};
