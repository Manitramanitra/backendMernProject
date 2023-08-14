const PostModel = require("../models/post.model");
const UserModel = require("../models/user.models");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.readPost = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.error("erreur: " + err);
  });
};

module.exports.createPost = async (req, res) => {
  const newPost = new PostModel({
    posterId: req.body.posterId,
    message: req.body.message,
    video: req.body.video,
    likers: [],
    comments: [],
  });
  // console.log(newPost)
  try {
    // const post = await PostModel.create({ posteId, message, video });
    const post = await newPost.save();
    return res.status(200).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.updatePost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Unknown ID" });
  }
  try {
    const docs = await PostModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          message: req.body.message,
        },
      },
      {
        new: true,
      }
    );

    if (docs) return res.send(docs);
    else return res.status(500).send({ message: err });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.deletePost = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(200).json({ message: "ID unkown" });
  }
  try {
    PostModel.deleteOne({ _id: req.params.id })
      .then(() => {
        return res.status(201).send({ message: "Post deleted success" });
      })
      .catch((err) => {
        return res.status(500).json({ message: err });
      });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports.likePost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.id)) {
    return res.status(400).json({ message: "Unknown ID" });
  }

  try {
    const likePost = await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: {
          likers: req.body.id,
        },
      },
      { new: true }
    );
    const postLike = await UserModel.findByIdAndUpdate(
      req.body.id,
      { $addToSet: { likes: req.params.id } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return res
      .status(201)
      .json({ message: "like post successful", postLike, likePost });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
module.exports.unlikePost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.id)) {
    return res.status(400).json({ message: "Unknown ID" });
  }

  try {
    const likePost = await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          likers: req.body.id,
        },
      },
      { new: true }
    );
    const postLike = await UserModel.findByIdAndUpdate(
      req.body.id,
      { $pull: { likes: req.params.id } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return res
      .status(201)
      .json({ message: "unlike post successful", postLike, likePost });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};


module.exports.commentPost = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Unknown ID" });
  }

  try{
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push:{
          comments:{
            commenterId:req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text:req.body.text,
            timestamp: new Date().getTime()
          }
        }
      },
      {
        new: true
      },
      (err,docs)=>{
        if(!err) return res.send(docs);
        else return res.status(400).send(err)
      }
    )
  }catch(err){
    return res.status(400).send(err)
  }
};

module.exports.editCommentPost = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Unknown ID" });
  }
};

module.exports.deleteCommentPost = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Unknown ID" });
  }
};
