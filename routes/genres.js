const router = require("express").Router();

const controller = require("../controllers/genres");

router.get("/:id", controller.getOne);
router.get("/", controller.get);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
