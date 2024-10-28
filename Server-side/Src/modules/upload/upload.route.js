const { authChecker } = require("../../helper/AuthChecker");
const { uploadImage } = require("../../helper/storage");
const fs = require("fs");
const path = require("path");
const router = require("express").Router();
const sharp = require("sharp");
const Upload = require("./upload.model");

router.post("/", authChecker, uploadImage.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const file = req.file;
    const resizedFileName =
      `${Math.round(Math.random() * 1e9)}_` + file.originalname;
    const result = await sharp(file.path)
      .resize({ width: 1000 })
      .toFile(path.join("upload/user/" + req.user.email, resizedFileName));

    fs.unlinkSync(file.path);

    const image = {
      name: resizedFileName,
      path: path.join("upload/user/" + req.user.email, resizedFileName),
      type: file.mimetype.split("/")[0],
      mainType: file.mimetype.split("/")[1],
      size: file.size,
      ...result,
    };
    const newImage = Upload(image);
    const imageSaved = await newImage.save();
    res.status(200).json(imageSaved);
  } catch (error) {
    console.error("Error processing upload:", error);
    res.status(500).json({ message: "An error occurred during image upload" });
  }
});
router.delete("/:id", authChecker, async (req, res) => {
  try {
    const image = await Upload.findByIdAndDelete(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    fs.unlinkSync(image.path);
    await Upload.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/", authChecker, async (req, res) => {
  try {
    const images = await Upload.find().sort({ _id: -1 });
    const total = await Upload.countDocuments();
    res.status(200).json({ total, images });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
