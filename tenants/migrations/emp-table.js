const { Knex, default: knex } = require("knex");
const { db } = require("../config/database");

const empTable = async (tenant) => {
  try {
    console.log("tenants in emp in table");
    await tenant.schema.createTable("emp_info", (table) => {
      table.increments();
      table.string("emp_name");
      table.timestamps();
    });
  } catch (err) {
    console.log("emps table caught error" + err);
  }
};

module.exports = empTable;
