// Default imports
import express from 'express'
// Application Configs
import config from '../config'
// Application Contollers To Expose
import dashboard from '../controller/dashboard'
// Local Objects - Middleware
import initializeDb from '../db/'
import middleware from '../middleware'
// +++++ LOGGING +++++
import fs from 'fs'
import path from 'path'
/// Error Handeling
var DEBUG = config.DEBUG_ALL
var errMsg = 'Error: InValid Request'
var errReq
var logDirectory = path.join(__dirname, 'DEBUG')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
const debugLogStream = fs.createWriteStream(`${logDirectory}/Routes.log`)
function logJSONError (errMsg, errReq) {
  var resJSONError = {}
  resJSONError = {
    'Location': `${errMsg}`,
    'Details': `${JSON.stringify(errReq)}`
  }
  debugLogStream.write(JSON.stringify(resJSONError))
  debugLogStream.write('\n')
}

let router = express()

// connect to db
initializeDb(db => {
  // internal middleware
  router.use(
    middleware({
      config,
      db
    })
  )
  router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })

  // api routes (api//dashboard)
  router.use(
    '/dashboard',
    dashboard({
      config,
      db
    })
  )
})

export default router
