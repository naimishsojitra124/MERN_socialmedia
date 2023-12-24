const router = require('express').Router();
const postCtrl = require('../controllers/postCtrl');
const auth = require('../middleware/auth');

router.post('/createPost', auth, postCtrl.createPost);

router.get('/getPosts', auth, postCtrl.getPosts);

module.exports = router;