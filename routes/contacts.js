const router = require("express").Router();
const contactController = require("../controller/contacts");

router.get("/", async (req, res) => {
  const contacts = await contactController.getAll();
  res.send(contacts);
});

router.get("/:id", async (req, res) => {
  const contact = await contactController.getOne(req.params.id);
  if (contact === null) {
    res.status(404).send("Contact not found");
  } else {
    res.status(200).send(contact);
  }
});

router.post("/", async (req, res) => {
  console.log("Create Contact received");
  console.log(req.body);
  const newContact = {
    contact_id: req.body.contact_id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const isSuccess = await contactController.createContact(newContact);

  if (isSuccess) {
    res.status(200).send({ id: req.params.id, newContact });
  } else {
    res.status(500).send("Some error occurred while create the user");
  }
});

router.put("/:id", async (req, res) => {
  console.log("Update Contact received");
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
    const contact = await contactController.updateContact(contact_id, updatedContact);
    if (contact) {
      res.status(200).send({ id: req.params.id, updatedContact });
    } else {
      res.status(404).send(`Contact with id ${contact_id} not found`);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Some error occurred while updating the user");
  }
});

router.delete("/:id", async (req, res) => {
  console.log("Delete Contact received");
  const isSuccess = await contactController.deleteContact(req.params.id);

  if (isSuccess) {
    res.status(200).send(`contact with id: ${req.params.id} deleted`);
  } else {
    res.status(500).json("Some error occurred while deleting the user");
  }
});

module.exports = router;
