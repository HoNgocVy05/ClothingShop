const multer = require('multer');
const path = require('path');

// nơi lưu file
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, '../public/uploads/products'));
    },
    filename: (req, file, callback) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        callback(null, unique + ext);
    }
});

// chỉ cho ảnh
function fileFilter(req, file, callback) {
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowed.includes(file.mimetype)) callback(null, true);
    else callback(new Error('File không hợp lệ'), false);
}

module.exports = multer({
    storage,
    fileFilter,
    limits: { files: 4 } // tối đa 4 ảnh
});
