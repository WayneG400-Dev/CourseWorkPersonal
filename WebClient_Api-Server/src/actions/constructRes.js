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
const debugLogStream = fs.createWriteStream(`${logDirectory}/constructRes.log`)
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
export default function (SQLResults, reqSchema, callback) {
  // OVERRIDES
  if (typeof SQLResults.paging === 'undefined') {
    SQLResults.paging = {
      'pgNumber': 1,
      'pgSize': 0,
      'pgMore': false
    }
  }
  if (typeof SQLResults.rowsSchema === 'undefined') {
    SQLResults.rowsSchema = reqSchema
  }
  let tempRes
  if (DEBUG) {
    errMsg = 'Final-PART-JSON'
    errReq = SQLResults
    logJSONError(errMsg, errReq)
  }

  if (!config.RESP_OBJ_TITLE) {
    tempRes = {
      'paging': {
        'pgNumber': SQLResults.paging.pgNumber,
        'pgSize': SQLResults.paging.pgSize,
        'pgMore': SQLResults.paging.pgMore
      },
      'schema': SQLResults.rowsSchema,
      'data': SQLResults.rowsDatabase,
      'links': SQLResults.rowsLinks
    }
  } else {
    tempRes = {
      'name': `${SQLResults.name}`,
      'data': {
        'paging': {
          'pgNumber': SQLResults.paging.pgNumber,
          'pgSize': SQLResults.paging.pgSize,
          'pgMore': SQLResults.paging.pgMore
        },
        'schema': SQLResults.rowsSchema,
        'data': SQLResults.rowsDatabase,
        'links': SQLResults.rowsLinks
      }
    }
  }
  callback(tempRes)
  // return tempRes
}
