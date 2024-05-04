const express = require("express");
const mongodb = require("./data/database");

const app = express();

const port = process.env.PORT || 3000;

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use("/", require("./routes"));

mongodb.initDb((err) => {
  if (err) throw err;
  app.listen(port, () => console.log(`Listening on port ${port}`));
});
