const { db } = require("../config/database");
const jwt = require("jsonwebtoken");

const { getConnection } = require("../service/connection-service");
const { DATE } = require("sequelize");

const viewEmp = async (req, res) => {
  const conn = await getConnection();

  if (!conn) {
    return null;
  }

  const emp = await conn.select("*").from("emp_info");
  console.log(emp);
  return res.send(emp);
};

const addEmp = async (req, res) => {
  const {
    body: { emp_name },
  } = req;

  console.log("emp_name" + emp_name);
  const emp = {
    emp_name: emp_name,
    created_at: new Date(),
    updated_at: new Date(),
  };
  const conn = await getConnection();
  if (!conn) {
    return null;
  }

  await conn.insert(emp).from("emp_info");

  return res.send(emp);
};

const loginEmp = async (req, res) => {
  const conn = await getConnection();
  if (!conn) {
    return null;
  }

  const empname = req.body.emp_name;
  console.log("empname = " + empname);
  const result = await conn
    .select("emp_name")
    .from("emp_info")
    .where("emp_name", empname);
  console.log("result" + JSON.stringify(result));
  const result2 = JSON.stringify(result);
  if (result.length > 0) {
    console.log("emp _name result" + result2.emp_name);
    const token = jwt.sign({ emp_name: result2.emp_name }, "secret");
    console.log("my token = " + token);
    return res.send("login successfully" + token);
  } else {
    return res.send("login failed");
  }
};

const updateEmp = async (req, res) => {
  const conn = await getConnection();
  if (!conn) {
    return null;
  }
  const id = req.body.id;
  const emp_name = req.body.emp_name;
  console.log("requested input:" + id + ",", +emp_name);
  const updatedDate = new DATE();
  const result = await conn
    .update("emp_name", emp_name, "updated_at", updatedDate)
    .from("emp_info")
    .where("id", id);
  return res.send(JSON.stringify(result));
};
module.exports = { addEmp, viewEmp, loginEmp, updateEmp };
