const knex = require('knex')
const { getNamespace } = require('continuation-local-storage')
const { db, config } = require('../config/database')

let tenantMapping;

const getConfig = (tenant) => {
  try{
  const { db_username: user, db_name: database, db_password: password } = tenant
  console.log("success connection service"+tenant.db_password);
  return {
    ...config,
    connection: {
      ...config.connection,
      user,
      database,
      password
      
    }
   
  }
  console.log("success connection service end");
}catch(e){
  console.log("connection-service error"+e);
}
}



const getConnection = () => getNamespace('tenants').get('connection') || null
console.log("success connection service success get connection");

 

const bootstrap = async () => {
  try {
    const tenants = await db
      .select('uuid', 'db_name', 'db_username', 'db_password')
      .from('tenants')
try{
    tenantMapping = tenants.map((tenant) => ({
      uuid: tenant.uuid,
      connection: knex(getConfig(tenant))
     } ))
     console.log("success mapping connection service");
    }
    catch(e){
      console.log("tenant mapping connection service"+e.stack);
    }
  } catch (error) {
    console.error("service connection tenant mapping erroe"+error)
  }
}

const getTenantConnection = (uuid) => {
  try{
  //console.log('getTenantConnection', uuid);
  const tenant = tenantMapping.find((tenant) => tenant.uuid === uuid)
  //console.log('Inside tenant', tenant);
  if (!tenant) return null
console.log("inside connection service tenanat mapping");
  return tenant.connection
  }
  catch(err){
    console.log("inside tenant mapping connection service err "+err);
  }
}


module.exports = { bootstrap, getTenantConnection, getConnection }