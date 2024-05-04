const mongodb = require("../data/database");

const getAll = async () => {
  try {
    const db = await mongodb.getDb().db();
    const contacts = await db.collection("contacts").find({}).toArray();
    return contacts;
  } catch (err) {
    console.error(err);
  }
};

const getOne = async (id) => {
  try {
    const db = await mongodb.getDb().db();
    const contact = await db.collection("contacts").findOne({ contact_id: parseInt(id) });
    console.log(contact);
    return contact;
  } catch (err) {
    console.error(err);
  }
};

const createContact = async (contact) => {
  const response = await mongodb
    .getDb()
    .db()
    .collection("contacts")
    .insertOne({ ...contact });
  console.log(response);
  if (response.acknowledged > 0) {
    return true;
  } else {
    return false;
  }
};

const updateContact = async (id, contact) => {
  const oldContact = await getOne(id);
  for (const key in contact) {
    if (contact[key] !== oldContact[key] && contact[key] !== undefined && contact[key] !== null) {
      oldContact[key] = contact[key];
    }
  }
  const response = await mongodb
    .getDb()
    .db()
    .collection("contacts")
    .replaceOne({ contact_id: parseInt(id) }, { ...oldContact });
  console.log(response);
  if (response.modifiedCount > 0) {
    return await getOne(id);
  } else {
    return null;
  }
};

const deleteContact = async (id) => {
  const response = await mongodb
    .getDb()
    .db()
    .collection("contacts")
    .deleteOne({ contact_id: parseInt(id) });
  console.log(response);
  if (response.deletedCount > 0) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  getAll,
  getOne,
  createContact,
  updateContact,
  deleteContact,
};
