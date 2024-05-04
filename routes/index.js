const router = require("express").Router();
const contacts = require("./contacts");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

router.get("/", (req, res) => res.send("Nothing here. Try Somewhere else."));
router.use("/contacts", contacts);
router.use("/api-docs", swaggerUi.serve);
router.use("/api-docs", swaggerUi.setup(swaggerDocument));

module.exports = router;
