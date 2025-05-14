const multer = require('multer');
const path = require('path');
const fs = require('fs');
const iconv = require('iconv-lite');

const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const originalName = iconv.decode(Buffer.from(file.originalname, 'binary'), 'utf8');
    cb(null, uniqueSuffix + '-' + originalName);
  },
});

const upload = multer({ storage });

module.exports = upload;
