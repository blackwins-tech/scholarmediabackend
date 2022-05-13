const { db } = require("../config/database");
const { getConnection } = require("../service/connection-service");
const axios = require("axios");

const employees = async (req, res) => {
  //var tenant = await axios.get('http://tenants:3000/');
  var tenant = await axios.get("http://tenants:3000/api/v1/tenants");
  console.log("emp response axios" + tenant);
  res
    .status(200)
    .send("response fetched from tenant api  ==" + JSON.stringify(tenant.data));
};

const getTeachersList = async (req, res) => {
  //const connection = await getConnection();
  const uuid = req.body.uuid;
  //const connection = await getConnection(uuid);
  console.log("getTeachersList", uuid);
  var single_tenant = await axios.get(
    "http://tenants:3000/api/v1/tenantviewbyid",
    { uuid: tenant_uuid }
  );
  console.log("single tenant response axios" + single_tenant);
  //const tenant = getTenantConnection(single_tenant[0].uuid);
  //console.log(data);
  res.status(200).send("success");
};

module.exports = { employees, getTeachersList };
