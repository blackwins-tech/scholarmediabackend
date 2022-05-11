const { getConnection } = require('../service/connection-service')

const getAll = async () => {
  const conn = await getConnection()

  if (!conn) {
    return null
  }
console.log("repository staff selection");
  return await conn.select('*').from('staff_info')
}






module.exports = { getAll }