// Database imports
import mysql from 'mysql2'
// Application Configs
import config from '../config'
import fs from 'fs'
import path from 'path'
// +++++ LOGGING +++++
/// Error Handeling
var DEBUG = config.DEBUG_ALL
var errMsg = 'Error: InValid Request'
var errReq
var logDirectory = path.join(__dirname, 'DEBUG')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
const debugLogStream = fs.createWriteStream(`${logDirectory}/DB.log`)
function logJSONError (errMsg, errReq) {
  var resJSONError = {}
  resJSONError = {
    'Location': `${errMsg}`,
    'Details': `${JSON.stringify(errReq)}`
  }
  debugLogStream.write(JSON.stringify(resJSONError))
  debugLogStream.write('\n')
}

// ++++ MAIN ++++//
export default callback => {
  let db = mysql.createConnection({
    host: config.MYSQL_HOST,
    port: config.MYSQL_PORT,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD,
    database: config.MYSQL_DATABASE,
    debug: config.MYSQL_DEBUG
    // Caution:: SQL Injection Security can be bypassed.//
    // uncomment at own RISK //// multiplestatemnts: config.MYSQL_MULTI
  })

  if (DEBUG) {
    errMsg = 'Final-DB-JSON'
    errReq = db.authorized
    logJSONError(errMsg, errReq)
    errReq = db.config
    logJSONError(errMsg, errReq)
  }
  callback(db)
}
