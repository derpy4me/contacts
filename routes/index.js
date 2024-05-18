const router = require("express").Router();
const passport = require('passport');
const boring = require("./boring");
const sevenFields = require("./sevenFields");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

router.get('/login', passport.authenticate('github'), (req, res) => {
});

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.use("/boring", boring);
router.use("/sevenFields", sevenFields);
router.use("/api-docs", swaggerUi.serve);
router.use("/api-docs", swaggerUi.setup(swaggerDocument));

module.exports = router;
