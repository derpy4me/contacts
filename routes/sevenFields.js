const router = require("express").Router();

const sevenFieldDal = require("../dal/sevenFields");
const sevenFieldDto = require("../dto/sevenFields");
const {validate} = require("../middleware/validate.js");
const {v4} = require("uuid");
const {param} = require("express-validator");
const {isAuthenticated} = require('../middleware/authenticate.js');

router.get("/", isAuthenticated, async (req, res) => {
    try {
        const sevenFields = await sevenFieldDal.getAll();
        res.send(sevenFields);
    } catch (err) {
        console.error(err);
        res.status(500).json("Internal Server Error");
    }
});

router.get("/:id", isAuthenticated, [param('id', 'UUID required').isUUID()], validate, async (req, res) => {
    console.log(`Get SevenField request received for ${req.params.id}`);
    try {
        const sevenField = await sevenFieldDal.getOne(req.params.id);
        if (sevenField === null) {
            res.status(404).send("sevenField not found");
        } else {
            res.status(200).send(sevenField);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json("Internal Server Error");
    }
});

router.post('/', isAuthenticated, sevenFieldDto.sevenFieldValidationRules(), validate, async (req, res) => {
    console.log("Create sevenFields received");
    console.log(req.body);
    const {species_name, family_name, average_size, habitat, life_span, diet} = req.body;
    const newSevenField = {
        species_name,
        family_name,
        average_size,
        habitat,
        life_span,
        diet
    };
    const newId = v4();

    try {
        const newItem = await sevenFieldDal.createSevenFields(newId, newSevenField);
        res.status(200).send({id: req.params.id, newItem});
    } catch (err) {
        console.error(err);
        res.status(500).json("Internal Server Error");
    }

});

router.put("/:id", isAuthenticated, sevenFieldDto.sevenFieldUpdateRules(), validate, async (req, res) => {
    console.log("Update Contact received");
    console.log(req.body);
    const sevenFieldId = req.params.id;
    const {species_name, family_name, average_size, habitat, life_span, diet} = req.body;
    const newSevenField = {
        species_name,
        family_name,
        average_size,
        habitat,
        life_span,
        diet
    };
    try {
        const updatedSevenField = await sevenFieldDal.updateSevenFields(sevenFieldId, newSevenField);
        if (updatedSevenField) {
            res.status(200).send({id: req.params.id, updatedSevenField});
        } else {
            res.status(404).send(`Contact with id ${sevenFieldId} not found`);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json("Internal Server Error");
    }
});

router.delete("/:id", isAuthenticated, [param('id', 'UUID required').isUUID()], validate, async (req, res) => {
    console.log("Delete sevenField received");
    try {
        await sevenFieldDal.deleteSevenFields(req.params.id);
        res.status(200).send(`sevenField with id: ${req.params.id} deleted`);
    } catch (err) {
        console.error(err);
        res.status(500).json("Internal Server Error");
    }

});

module.exports = router;
