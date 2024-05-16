const express = require("express");
const mongodb = require("./utilities/database");

const app = express();

const port = process.env.PORT || 3000;

app
    .use(express.json())
    .use(express.urlencoded({extended: true}))
    .use((err, req, res, next) => {
        if (err instanceof express.ValidationError) {
            return res.status(400).json({errors: err.array()});
        }
        next(err);
    })
    .use("/", require("./routes"));

mongodb.initDb((err) => {
    if (err) throw err;
    app.listen(port, () => console.log(`Listening on port ${port}`));
});
