const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
const db = require("./db/models");
const cors = require("cors");
const router = require("./v1");
// const utils = require("./helpers/decisionTree");

const PORT = process.env.DB_PORT || 8080;

var corsOptions = {
  origin: [
    // "http://localhost:3000",
    "http://salesapp.odessaseparator.com",
    "http://odessaseparator.s3-website-us-east-1.amazonaws.com",
  ],
  exposedHeaders: ["X-Total-Records", "X-Total-Pages", "X-Current-Page"],
};

app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With,     Content-Type"
  );
  next();
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Synced db.");
    app.listen(PORT, () => {
      console.log(`🚀  Server is running on port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use(express.json());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

router(app, db);

// utils.execTree();

// app.listen(PORT, () => {
//   console.log(`🚀  Server is running on port ${PORT}.`);
// });
