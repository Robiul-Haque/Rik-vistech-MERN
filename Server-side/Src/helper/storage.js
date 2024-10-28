const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadImage = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const destination = path.join("upload/user/", req.user.email);
      if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination);
      }
      cb(null, destination);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

module.exports = {
  uploadImage,
};
