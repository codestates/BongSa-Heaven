const router = require("express").Router();
const controller = require("../controllers/comment");

router.post("/fbcommentregister", controller.fbcommentregisterControl);
// router.post("/fbchildregister", controller.fbchildregisterControl);
router.patch("/fbcommentedit", controller.fbcommenteditControl);
router.delete("/fbcommentdelete", controller.fbcommentdeleteControl);

// router.post("/cbregister", controller.cbregisterControl);
// router.patch("/cbedit", controller.cbeditControl);
// router.delete("/cbdelete", controller.cbwithdrawalControl);

module.exports = router;
