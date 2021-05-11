const multer = require('multer');

/**
 * Change the name of the file to the date + the original name
 */
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './api/images/');
  },
  filename(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

/**
 * Reject a file if mimetype is not jpeg or png for now
 * @param {*} req request
 * @param {*} file file to check for
 * @param {*} cb callback
 */
const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

/**
 * use multer with the storage and fileFilter above, with a file limitation
 */
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
});

module.exports = upload;
