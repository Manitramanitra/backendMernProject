const router = require('express').Router();
const multer = require('multer');module
const postController = require('../controllers/post.controller');
const uploadController = require('../controllers/upload.controller');

const uploadPost = multer({storage : uploadController.storagePost});

router.get('/',postController.readPost);
router.post('/',uploadPost.single("file"),postController.createPost);
router.put('/:id',postController.updatePost);
router.delete('/:id',postController.deletePost);
router.patch('/like-post/:id',postController.likePost);
router.patch('/unlike-post/:id',postController.unlikePost);

//comments
router.patch('/delete-comment-post/:id',postController.deleteCommentPost);
router.patch('/edit-comment-post/:id',postController.editCommentPost);
router.patch('/comment-post/:id',postController.commentPost);

module.exports = router;