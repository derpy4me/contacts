const router = require("express").Router();
const contactController = require("../controller/contacts");

router.get("/", async (req, res) => {
  const contacts = await contactController.getAll();
  res.send(contacts);
});

router.get("/:id", async (req, res) => {
  const contact = await contactController.getOne(req.params.id);
  res.send(contact);
});

module.exports = router;
