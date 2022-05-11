const { db } = require('../config/database')
const { v4: uuidv4 } = require('uuid')
const generator = require('generate-password')
const slugify = require('slugify')
const { down, up } = require('../service/tenant-service')
const {getConnection} =require("../service/connection-service");

const index = async (req, res) => {
  const tenants = await db
    .select('uuid', 'db_name', 'db_username', 'db_password')
    .from('tenants')
  return res.formatter.ok({ tenants })
}

const store = async (req, res) => {
  const {
    body: { organization }
  } = req

  const tenantName = slugify(organization.toLowerCase(), '_') //shows full name in lowecase without _
  const password = generator.generate({ length: 12, numbers: true })
  const uuid = uuidv4()
  const tenant = {
    uuid,
    db_name: tenantName,
    db_username: tenantName,
    db_password: password
  }
  const tenantRes=await db('tenants').insert(tenant)
  await up({ tenantName, password, uuid })

  //return res.formatter.ok({ tenant: { ...tenant } })
  return res.formatter.ok(tenantRes)
}

const destroy = async (req, res) => {
  const {
    params: { uuid }
  } = req

  const tenant = await db
    .select('db_name', 'db_username', 'uuid')
    .where('uuid', uuid)
    .from('tenants')

  await down({
    userName: tenant[0].db_username,
    tenantName: tenant[0].db_name,
    uuid: tenant[0].uuid
  })
  await db('tenants').where('uuid', uuid).del()

  return res.formatter.ok({ message: 'tenant was deleted successfully' })
}
const index2=async(req,res)=>{
  const {
        params : { tenantId }
      } = req
  //     const staffName = slugify(staff_name.toLowerCase(), '_') //shows full name in lowecase without _
  //     console.log("staff_name"+staffName);
       const uuid = tenantId;
       console.log("uuid"+uuid);
         const conn = await getConnection();
if (!conn) {
  return null;
}
         
       // await conn.where(uuid).from("tenants").select();
       await conn.select('*').from("tenants").where(uuid);
        
     
  

  return res.formatter.ok({uuid})

  // const staff = await seed()
  // console.log("staff controller"+staff);
  // return res.formatter.ok({ staff})

}
module.exports = { index, store, destroy,index2 }