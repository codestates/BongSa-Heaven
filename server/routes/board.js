const router = require("express").Router();
const controller = require("../controllers/board");
const upload = require("../middlewares/multer");

router.post("/fbregister", upload.array("image"), controller.fbregisterControl);
router.get("/fblist", controller.fblistControl);
router.post("/fbinfo", controller.fbinfoControl);
router.patch("/fbedit", controller.fbeditControl);
router.delete("/fbdelete", controller.fbdeleteControl);

router.post("/cbregister", upload.array("image"), controller.cbregisterControl);
router.get("/cblist", controller.cblistControl);
router.post("/cbinfo", controller.cbinfoControl);
router.patch("/cbedit", controller.cbeditControl);
router.delete("/cbdelete", controller.cbdeleteControl);

router.post("/freelike", controller.freelikeControl);
router.post("/freedislike", controller.freedislikeControl);
router.post("/crewlike", controller.freelikeControl);
router.post("/crewdislike", controller.crewdislikeControl);

module.exports = router;
