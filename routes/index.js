const router = require("express").Router();

const series = require("./series");
const genres = require("./genres");

router.use("/series", series);
router.use("/genres", genres);

module.exports = router;
