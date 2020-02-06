// Default Imports
import bodyParser from 'body-parser'
import express from 'express'
import http from 'http'
import fs from 'fs'
// Helper imports
import methodOverride from 'method-override'
import path from 'path'
// Application Configs
import config from './config'
// Application Routes
import apiRoutes from './routes'

// ++++ SETUP ++++//
// Debug and loggng setup
var logDirectory = path.join(__dirname, 'log')
config.LOG_DIR = logDirectory
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
if (config.DEBUG_ALL) {
  config.DEBUG_LOG = true
  config.MYSQL_DEBUG = true
}

// ++++ MAIN ++++//
var app = express()
app.server = http.createServer(app)
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(bodyParser.json({limit: config.BODY_LIMIT}))
app.use(methodOverride('X-HTTP-Method-Override'))
// api routebase /api
app.use(config.SRV_BASE, apiRoutes)

app.server.listen(config.SRV_PORT, function () {
  console.log(`Server running at port: ${app.server.address().port}`)
  console.log(`Server STACK: ${JSON.stringify(app._router.stack)}`)
})

app.server.stop =
    function (err) {
      console.error('ISSUE WITH MYSQL-CONNECTION:' + err)
      process.exit(1)
    }

// All Done
export default app
