const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");

router.get("/searchUser", auth, userCtrl.searchUser);

router.get("/:userId", auth, userCtrl.getUser);

router.patch("/updateUser", auth, userCtrl.updateUser);

module.exports = router;
