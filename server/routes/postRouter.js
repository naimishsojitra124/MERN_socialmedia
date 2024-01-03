const router = require('express').Router();
const postCtrl = require('../controllers/postCtrl');
const auth = require('../middleware/auth');

router.post('/createPost', auth, postCtrl.createPost);

router.get('/getPosts', auth, postCtrl.getPosts);

router.patch('/updatePost/:id', auth, postCtrl.updatePost);

router.patch('/:id/like', auth, postCtrl.likePost);

router.patch('/:id/unlike', auth, postCtrl.unlikePost);

module.exports = router;
