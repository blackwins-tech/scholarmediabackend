require("dotenv").config();
const express = require("express");
const fs = require("fs");
const redis = require("redis");
const path = require("path");
const cors = require("cors");
const { responseEnhancer } = require("express-response-formatter");
const sanitize = require("express-sanitizer");
const { bootstrap } = require("./service/connection-service");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;
const BASE_URL = `/api/${process.env.VERSION || "v1"}`;
const app = express();
app.set("port", PORT);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sanitize());
app.use(responseEnhancer());
app.use(cors());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

//CORS-HEADERS- Required for cross origin and cross server communication
app.use((req, res, next) => {
  res.setHeader("Access-Control_Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET",
    "POST",
    "PATCH",
    "DELETE",
    "OPTIONS"
  );
  next();
});

bootstrap();

// define a root route
app.get("/", (req, res, next) => {
  res.send("Hai Welcome To Our scholar Tenants APP!");
});

fs.readdir(path.join(__dirname, "routes"), (err, files) => {
  if (err) console.error("error in index readdir" + err);

  files.forEach((file) => {
    console.log("base url index");
    app.use(BASE_URL, require(`./routes/${file}`));
  });
});

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
