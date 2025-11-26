// middlewares/multer.js
const multer = require('multer');

// ✅ Use memory storage instead of disk storage
const storage = multer.memoryStorage(); // Files will be in memory as Buffer

// File filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage, // ✅ Memory storage
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  }
});

module.exports = upload;