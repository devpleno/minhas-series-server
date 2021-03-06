const router = require("express").Router();

const controller = require("../controllers/series");

router.get("/", controller.get);
router.get("/:id", controller.getOne);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
