const router = require("express").Router();
const uploadCtrl = require("../controllers/uploadCtrl");
const multer = require("multer");

const storage = multer.memoryStorage({});
const upload = multer({ storage });

router.post("/uploadImg/:userId", upload.single("file"), uploadCtrl.uploadFile);

router.delete("/deleteImg/:filename", uploadCtrl.deleteFile);

router.post("/uploadPostImgs/:userId", upload.array("files"), uploadCtrl.uploadFiles);

router.delete("/deletePostImgs/:filename", uploadCtrl.deleteFiles);

module.exports = router;