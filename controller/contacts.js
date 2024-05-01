const { ObjectId } = require("mongodb");
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
    const objId = new ObjectId(id);
    const db = await mongodb.getDb().db();
    const contact = await db.collection("contacts").findOne({ _id: objId });
    return contact;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getAll,
  getOne,
};
