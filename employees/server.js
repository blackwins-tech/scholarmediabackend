var express = require("express");
var app = express();
//var ip = require('ip');
var port = 3000;
const axios = require("axios");

// app.get('/', function(req, res){
//    res.send("Hello Student API!");
// });

app.get("/employees", async (req, res) => {
  try {
    //var tenant = await axios.get('http://tenants:3000/');
    var tenant = await axios.get("http://tenants:3000/api/v1/tenants");
    console.log("emp response axios" + tenant.data);
    res
      .status(200)
      .send(
        "response fetched from tenant api ==>" + JSON.stringify(tenant.data)
      );
  } catch (error) {
    console.log("employee error" + error);
  }
});

app.listen(port, () => {
  console.log("Node running on " + "port: ", port);
});
