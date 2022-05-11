const { Knex, default: knex } = require("knex");
const { db } = require("../config/database");

const staffsTable = async (tenant) => {
  console.log("tenants in staffs in table");
  await tenant.schema.createTable("staff_info", (table) => {
    table.increments();
    table.string("staff_name");
    table.timestamps();
  });
};

module.exports = staffsTable;
