const staffsTable = require('./staffs-table')


const migrate = async (tenant) => {
  console.log("migration index");
  try{
  await staffsTable(tenant);
  }catch(e){
    console.log("migration index error"+e);
  }
  //await usersTable(tenant);
}

module.exports = migrate