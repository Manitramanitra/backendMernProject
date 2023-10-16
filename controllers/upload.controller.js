const UserModel = require("../models/user.models");
const multer = require("multer");

module.exports.uploadProfil = async (req, res) => {
  console.log(req.body)
  try {
    const file = req.file;
    console.log(file);
    if (!file) {
      const error = "Please upload a file";
      return res.status(400).send({ err: error });
    }
    if (
      req.file.mimetype !== "image/jpg" &&
      req.file.mimetype !== "image/jpeg" &&
      req.file.mimetype !== "image/png"
    ) {
      const error = "Invalid  file";
      return res.status(400).send({ error });
    }
    if (req.file.size > 500000) {
      const error = "Max size 500ko";
      return res.status(400).send({ error });
    }

    const addProfil = await UserModel.findByIdAndUpdate(
      req.body.userId,
      {
        $set: {
          picture: req.file.path,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    if (addProfil) {
      res.status(200).send({ message: "Upload file success!" });
    }
  } catch (err) {
    if (err) return res.status(201).send(err);
  }
};

module.exports.storageProfil = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./client/public/uploads/profil/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
module.exports.storagePost = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./client/public/uploads/posts/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
