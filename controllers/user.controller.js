const UserModel = require("../models/user.models");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.getAlluser = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).send(users);
};

module.exports.userInfo = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(200).json({ message: "ID unkown" });
  }
  const user = await UserModel.findById(req.params.id).select("-password");
  res.status(200).send(user);
};

module.exports.userDelete = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(200).json({ message: "ID unkown" });
  }
  try{
      await UserModel.deleteOne({ _id: req.params.id })
        .then(()=>{
            return res.status(201).send({ message: "user deleted success" });
        }).catch(err=>{
            return res.status(500).json({ message: err });
        })

  }catch(err){
    res.status(500).json({ message: err });
  }
};

module.exports.userUpdate = async (req, res) => {
  try {
    const doc = await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );

    if (doc) return res.send(doc);
    else return res.status(500).send({ message: err });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
