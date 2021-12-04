const router = require("express").Router();

router.use("/pets", require("./pet"));

module.exports = router;
