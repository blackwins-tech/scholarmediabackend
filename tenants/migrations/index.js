const empTable = require("./emp-table");
const staffsTable = require("./staffs-table");

const migrate = async (tenant) => {
  console.log("migration index");
  try {
    await staffsTable(tenant);
    await empTable(tenant);
  } catch (e) {
    console.log("migration index error" + e);
  }
};

module.exports = migrate;
