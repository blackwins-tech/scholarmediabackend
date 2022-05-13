require("dotenv").config();
const { db } = require("./config/database");
const {
  bootstrap,
  getTenantConnection,
} = require("./service/connection-service");
const fs = require("fs");
const path = require("path");
const { responseEnhancer } = require("express-response-formatter");
const sanitize = require("express-sanitizer");
const PORT = process.env.PORT || 3000;
const BASE_URL = `/api/${process.env.VERSION || "v1"}`;
var express = require("express");
var app = express();
app.use(express.json());
app.use(sanitize());
app.use(responseEnhancer());

const axios = require("axios");
// const cors = require("cors");
// app.use(cors());
// app.use((req, res) => {
//   res.setHeader("Access-Control_Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin,X-Requested-With,Content-Type,Accept,Authorization"
//   );

//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET",
//     "POST",
//     "PATCH",
//     "DELETE",
//     "OPTIONS"
//   );
// });

// app.get("/employees", async (req, res) => {
//   //var tenant = await axios.get('http://tenants:3000/');
//   var tenant = await axios.get("http://tenants:3000/api/v1/tenants");
//   console.log("emp response axios" + tenant);
//   res
//     .status(200)
//     .send("response fetched from tenant api  ==" + JSON.stringify(tenant.data));
// });

// app.get("/employees/addemployee/:uuid", async (req, res) => {
//   console.log("addemployee-uuid", req.params.uuid);
//   var tenant_uuid = req.params.uuid;
//   var single_tenant = await axios.get(
//     "http://tenants:3000/api/v1/tenantviewbyid",
//     { uuid: tenant_uuid }
//   );
//   console.log("single tenant response axios" + single_tenant);
//   //const tenant = getTenantConnection(single_tenant[0].uuid);
//   //console.log(data);
//   res.status(200).send("success");
// });
fs.readdir(path.join(__dirname, "routes"), (err, files) => {
  if (err) console.error("error in index readdir" + err);

  files.forEach((file) => {
    console.log("employee base url index");
    app.use(BASE_URL, require(`./routes/${file}`));
  });
});
app.listen(PORT, () => {
  console.log(`employee service running on port: ${PORT}`);
});
