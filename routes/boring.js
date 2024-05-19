const router = require("express").Router();
const boringDal = require("../dal/boring");
const boringDto = require("../dto/boring");
const {validate} = require("../middleware/validate.js");
const {v4} = require("uuid");
const {param} = require("express-validator");
const {isAuthenticated} = require("../middleware/authenticate.js");


router.get("/", isAuthenticated, async (req, res) => {
    try {
        const sevenFields = await boringDal.getAll();
        res.send(sevenFields);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/:id", isAuthenticated, [param('id', 'UUID required').isUUID()], validate, async (req, res) => {
    try {
        const sevenField = await boringDal.getOne(req.params.id);
        if (sevenField === null) {
            res.status(404).send(`Boring with ${req.params.id} not found`);
        } else {
            res.status(200).send(sevenField);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/", isAuthenticated, boringDto.boringValidationRules(), validate, async (req, res) => {
    console.log("Create boring received");
    console.log(req.body);
    const {name, domain} = req.body;
    const newBoring = {
        name,
        domain
    };
    const newId = v4();
    try {
        const newItem = await boringDal.createBoring(newId, newBoring);
        res.status(200).send({id: req.params.id, newItem});
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }

});

router.put("/:id", isAuthenticated, boringDto.boringUpdateRules(), validate, async (req, res) => {
    console.log("Update sevenField received");
    console.log(req.body);
    const boringId = req.params.id
    const {name, domain} = req.body;
    const newBoring = {
        name,
        domain
    };
    try {
        const updatedBoring = await boringDal.updateBoring(boringId, newBoring);
        if (updatedBoring) {
            res.status(200).send(updatedBoring);
        } else {
            res.status(404).send(`boring with id ${boringId} not found`);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

router.delete("/:id", isAuthenticated, [param('id', 'UUID required').isUUID()], validate, async (req, res) => {
    console.log("Delete sevenField received");
    try {
        await boringDal.deleteBoring(req.params.id);
    } catch (err) {
        console.error(err);
        res.status(500).json("Internal Server Error");
    }

    res.status(200).send(`contact with id: ${req.params.id} deleted`);
});

module.exports = router;
