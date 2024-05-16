const router = require("express").Router();
const boringDal = require("../dal/boring");
const boringDto = require("../dto/boring");
const {validate} = require("../utilities/validate.js");
const {v4} = require("uuid");
const {param} = require("express-validator");


router.get("/", async (req, res) => {
    try {
        const sevenFields = await boringDal.getAll();
        res.send(sevenFields);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/:id", [param('id', 'UUID required').isUUID()], validate, async (req, res) => {
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

router.post("/", boringDto.boringValidationRules(), validate, async (req, res) => {
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

router.put("/:id", boringDto.boringUpdateRules(), validate, async (req, res) => {
    console.log("Update sevenField received");
    console.log(req.body);
    const contact_id = req.params.id;
    const updatedContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
    };
    try {
        const contact = await boringDal.updateBoring(contact_id, updatedContact);
        if (contact) {
            res.status(200).send({id: req.params.id, updatedContact});
        } else {
            res.status(404).send(`Contact with id ${contact_id} not found`);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

router.delete("/:id", [param('id', 'UUID required').isUUID()], validate, async (req, res) => {
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
