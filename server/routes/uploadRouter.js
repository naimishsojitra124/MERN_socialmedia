const router = require('express').Router();
const uploadCtrl = require('../controllers/uploadCtrl');
const multer = require('multer');

const storage = multer.memoryStorage({});
const upload = multer({ storage });

router.post('/uploadprofilePic/:userId', upload.single('file'), uploadCtrl.uploadprofilePic);

router.delete('/deleteprofilePic/:filename/:userId', uploadCtrl.deleteprofilePic);

router.post('/uploadPostImgs/:userId', upload.single('files'), uploadCtrl.uploadPostImgs);

router.delete('/deletePostImgs/:filename/:userId', uploadCtrl.deletePostImgs);

module.exports = router;