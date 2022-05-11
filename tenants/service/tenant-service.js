const Queue = require('bull')
const { db } = require('../config/database')
const migrate = require('../migrations')
//const seed = require('../seeders')
const { bootstrap, getTenantConnection } = require('./connection-service')

const up = async (params) => {
  console.log("Up Message" , params);
  const job = new Queue(
    `setting-up-database-${new Date().getTime()}`,
    `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
  )
  //console.log("Up Message", job);
  job.add({
    ...params
  })
  job.process(async (job, done) => {
    try {
      
     
      await db.raw(`CREATE ROLE ${params.tenantName} WITH LOGIN`)
      await db.raw(
        `GRANT ${params.tenantName} TO ${process.env.POSTGRES_ROLE};`
      )
      await db.raw(`CREATE DATABASE ${params.tenantName};`)
      await db.raw(
        `GRANT ALL PRIVILEGES ON DATABASE ${params.tenantName} TO ${params.tenantName};`
      )

      
      console.log("Database created successfully");
      
        console.log("tenant-service b4 bootstrap");
      await bootstrap()
      console.log("uuid in tenant service"+params.uuid);
      const tenant = getTenantConnection(params.uuid)
      console.log("tenant-service"+tenant);
      await migrate(tenant)
      //await seed(tenant)
      done()
      
    } catch (e) {
      console.error("outside od tenant service"+e);
    }
  })
}

const down = async (params) => {
  const job = new Queue(
    `deleting-database-${new Date().getTime()}`,
    `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
  )

  job.add({
    ...params
  })
  job.process(async (job, done) => {
    try {
      await db.raw(
        `SELECT pg_terminate_backend(pid) FROM pg_stat_activity
        WHERE pid <> pg_backend_pid()
        AND datname = '${params.tenantName}';`
      )
      await db.raw(`DROP DATABASE IF EXISTS ${params.tenantName};`)
      await db.raw(`DROP ROLE IF EXISTS ${params.tenantName};`)
      await bootstrap()
      done()
    } catch (e) {
      console.error(e)
    }
  })
}

module.exports = { up, down }