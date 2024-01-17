const router = require('express').Router();
const commentCtrl = require('../controllers/commentCtrl');
const auth = require('../middleware/auth');

router.post('/createComment', auth, commentCtrl.createComment);

router.patch('/:id/likecomment', auth, commentCtrl.likeComment);

router.patch('/:id/unlikecomment', auth, commentCtrl.unlikeComment);

router.patch('/:id/deletecomment', auth, commentCtrl.deleteComment);

module.exports = router;