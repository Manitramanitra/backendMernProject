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
  if (user) res.status(200).send(user);
  else res.status(500).json({ message: "error please try later" });
};

module.exports.userDelete = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(200).json({ message: "ID unkown" });
  }
  try {
    UserModel.deleteOne({ _id: req.params.id })
      .then(() => {
        return res.status(201).send({ message: "user deleted success" });
      })
      .catch((err) => {
        return res.status(500).json({ message: err });
      });
  } catch (err) {
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

module.exports.follow = async (req, res) => {
  if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.idToFollow)) {
    return res.status(400).json({ message: "Unknown ID" });
  }

  try {
    // add to following list
    const userToFollow = await UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true }
    );
    
    // add to follower's following list
    const currentUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true }
    );

    return res.status(201).json({ message: "Follow successful", userToFollow, currentUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


module.exports.unfollow = async (req, res) => {
  if (
    !ObjectId.isValid(req.params.id) ||
    !ObjectId.isValid(req.body.idToUnFollow)
  ) { 
    res.status(200).json({ message: "ID unkown" });
  }
  try {
    // add to following list
    const userToUnFollow = await UserModel.findByIdAndUpdate(
      req.body.idToUnFollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true }
    );
    
    // add to follower's following list
    const currentUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnFollow } },
      { new: true, upsert: true }
    );

    return res.status(201).json({ message: "UnFollow successful", userToUnFollow, currentUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
