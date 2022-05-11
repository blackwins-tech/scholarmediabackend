require('dotenv').config()
const express = require('express')
const fs = require('fs')
const redis = require('redis')
const path = require('path')
const { responseEnhancer } = require('express-response-formatter')
const sanitize = require('express-sanitizer')
const { bootstrap } = require('./service/connection-service')

// const client = redis.createClient({
//     host: 'redis',
//     port: 6379
// })

const PORT = process.env.PORT || 3000
const BASE_URL = `/api/${process.env.VERSION || 'v1'}`
const app = express()
app.set('port', PORT)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(sanitize())
app.use(responseEnhancer())

bootstrap()

app.get('/', (req, res,next) => res.send('success'));



fs.readdir(path.join(__dirname, 'routes'), (err, files) => {
  if (err) console.error("error in index readdir"+err)

  files.forEach((file) => {
    console.log("base url index");
    app.use(BASE_URL, require(`./routes/${file}`))
  })
})

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`)
})