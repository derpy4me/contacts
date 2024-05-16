const router = require("express").Router();
const boring = require("./boring");
const sevenFields = require("./sevenFields");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

router.get("/", (req, res) => res.send("Nothing here. Try Somewhere else."));
router.use("/boring", boring);
router.use("/sevenFields", sevenFields);
router.use("/api-docs", swaggerUi.serve);
router.use("/api-docs", swaggerUi.setup(swaggerDocument));

module.exports = router;
