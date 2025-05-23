const multer = require("multer");

const imageFilter = (req, file, cb) => {
  if (req.file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

var uploadFile = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
}); // 5 megas de subida como máximo
module.exports = { imageFilter, uploadFile };
