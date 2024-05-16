const dotenv = require("dotenv");
dotenv.config();
const MongoClient = require("mongodb").MongoClient;

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log("Db is already initialized!");
    return callback(null, _db);
  }
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      console.log("Initialized db!");
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = (collection) => {
  if (!_db) {
    throw Error("Db not initialized");
  }
  return _db.db().collection(collection);
};

module.exports = {
  initDb,
  getDb,
};
