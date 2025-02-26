const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
const db = require("./db/models");
const cors = require("cors");
const router = require("./v1");
const https = require("https");
const fs = require("fs");
// const utils = require("./helpers/decisionTree");

const PORT = process.env.DB_PORT || 8080;
const crt = process.env.CERT_CRT;
const key = process.env.CERT_KEY;

// var corsOptions = {
//   origin: [
//     "http://localhost:3000",
//     "https://uat.osidesigner.com",

//     "https://osidesigner.com",
//   ],
//   exposedHeaders: ["X-Total-Records", "X-Total-Pages", "X-Current-Page"],
// };

app.use(
  cors({
    origin: ["https://uat.osidesigner.com"], // Allow only this origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed request headers
    exposedHeaders: [
      "X-Authorization",
      "X-Total-Records",
      "X-Total-Pages",
      "X-Current-Page",
    ],
    credentials: true, // Allow credentials (e.g., cookies)
  })
);

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// app.all("/*", function (req, res, next) {
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,     Content-Type"
//   );
//   next();
// });

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://uat.osidesigner.com, https://osidesigner.com"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use((req, res, next) => {
  console.log("Host header:", req.headers.origin);
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

    // https
    //   .createServer(
    //     {
    //       cert: fs.readFileSync(crt),
    //       key: fs.readFileSync(key),
    //     },
    //     app
    //   )
    //   .listen(PORT, function () {
    //     console.log(`App listening on port ${PORT}`);
    //   });
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
