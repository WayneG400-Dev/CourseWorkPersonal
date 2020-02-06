// Application Configs
import config from '../config'
import fs from 'fs'
import path from 'path'
// Variables
let workSet
// SQL Statements
let iniStm
let linksStm
let schemaStm
let selDataStm
// queriesList
var execSet = []
// Error Handeling
var DEBUG = config.DEBUG_ALL
var errMsg = 'Error: InValid Request'
var errReq
var logDirectory = path.join(__dirname, 'DEBUG')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
const debugLogStream = fs.createWriteStream(`${logDirectory}/processSQL.log`)
function logJSONError (errMsg, errReq) {
  var resJSONError = {}
  resJSONError = {
    'Location': `${errMsg}`,
    'Details': `${JSON.stringify(errReq)}`

  }
  debugLogStream.write(JSON.stringify(resJSONError))
  debugLogStream.write('\n')
  // debugLogStream.end()
}

// ++++ MAIN ++++//
export default function (recievedReq, db, res, callback) {
  if (!config.MYSQL_DATABASE || !config.MYSQL_SCHEMA) {
    return {}
  }
  if (DEBUG) {
    errMsg = 'ProcessSQL-Main-Start'
    errReq = recievedReq
    logJSONError(errMsg, errReq)
  }
  // SQL Statements
  iniStm = `SELECT a.*, b.entNM as entTable FROM ${config.MYSQL_SCHEMA}.EntFile a JOIN ${config.MYSQL_SCHEMA}.Entities b ON b.entid = a.fileID  where a.entNM = "??" ORDER BY a.efID`
  linksStm = `SELECT a.rTxt AS LabelText, b.entTX AS Label, b.entNM as NameID, c.entJRId as RelationshipID FROM ${config.MYSQL_SCHEMA}.EntRelS a JOIN ${config.MYSQL_SCHEMA}.Entities b ON b.entid = a.chld JOIN ${config.MYSQL_SCHEMA}.EntJRules c ON c.rlnID = a.rlnid WHERE a.par= ?? ORDER BY a.chld`
  schemaStm = `SELECT * FROM ${config.MYSQL_SCHEMA}.EntSchema where entID= ?? ORDER BY fSEQ`
  selDataStm = `SELECT ## FROM ${config.MYSQL_DATABASE}.??`
  // Old- allDataStm = `SELECT * FROM ${config.MYSQL_DATABASE}.??`
  // map
  let querySet = [
    {'ini': `${iniStm}`},
    {'links': `${linksStm}`},
    {'schema': `${schemaStm}`},
    {'data': `${selDataStm}`}
  ]
  // determine lvl for sql statement mapping
  workSet = getStmList(recievedReq)
  // Map workset to query list
  execSet.push(querySet[0])
  workSet.forEach(workSetItem => {
    execSet.push(querySet[workSetItem])
  })
  if (DEBUG) {
    errMsg = 'ProcessSQL-Main-preSQL'
    errReq = querySet
    logJSONError(errMsg, errReq)
    errMsg = 'ProcessSQL-Main-WORKSET'
    errReq = workSet
    logJSONError(errMsg, errReq)
    errMsg = 'ProcessSQL-Main-EXECSET'
    errReq = execSet
    logJSONError(errMsg, errReq)
  }
  executeSQL(db, execSet, recievedReq.name, (execRes) => {
    // return prepared statement for proocessing
    if (DEBUG) {
      errMsg = 'ProcessSQL-END'
      errReq = {'state': 'Successfull'}
      logJSONError(errMsg, errReq)
    }
    callback(execRes)
  })
}

function getStmList (recievedReq) {
  let LVL = []
  // if RelationshipID = 0, Assume INITIAL CALL.
  if (recievedReq.relationshipID === 0 || recievedReq.relationshipID === null) {
    LVL = [1, 2, 3]
  } else {
    // New DataSet Requested: Change in relationshipIDs, Assume ViewDetail.Next()
    if (recievedReq.relationshipID !== recievedReq.stateObj.relationshipID) {
      LVL = [1, 2, 4]
    } else {
      // Data Change Requested(No change in relationshipID): , Assume Call 2 (SORTS,PAGING,SEARCH,FILTER)
      // if schema is present dont rebuild,
      if (!recievedReq.schema) {
        LVL = [1, 2, 4]
      } else {
        if ((typeof recievedReq.schema !== 'undefined') ||
           (recievedReq.schema === ' ') || recievedReq.schema === null) {
          LVL = [1, 2, 4]
        } else {
          LVL = [1, 4]
        }
      }
    }
  }
  return LVL
}
// Run Statements
function executeSQL (db, execSet, reqName, callback) {
  if (DEBUG) {
    errMsg = `ProcessSQL-executeSQL-Start: ${reqName}`
    errReq = execSet
    logJSONError(errMsg, errReq)
  }
  let returnResult
  let rowsError = []
  let preparedSet = []
  let query
  let tmpFldString = ' '
  // Results
  var rowsInit
  var rowsLinks
  var rowsSchema
  var rowsDatabase
  var rowsExtra

  // START SQL CALLS";
  query = execSet[0].ini
  // Fisrt Request - Initialization
  query = query.replace('??', reqName)
  preparedSet.push(query)
  db.execute(query, function (err, results, fields) {
    if (err) {
      rowsError.push(`Error:${err}`)
    } else {
      rowsInit = results
      db.unprepare(query)
      // Second Request - Link Retrieval - Solo
      query = execSet[1].links
      query = query.replace('??', rowsInit[0].entID)
      preparedSet.push(query)
      db.execute(query, function (err, results, fields) {
        if (err) {
          rowsError.push(`Error:${err}`)
        } else {
          rowsLinks = results
          db.unprepare(query)
          // Third Request - Schema Detail - Combo
          query = execSet[2].schema
          query = query.replace('??', rowsInit[0].entID)
          preparedSet.push(query)
          db.execute(query, function (err, results, fields) {
            if (err) {
              rowsError.push(`Error:${err}`)
            } else {
              rowsSchema = results
              // Prep for Fourth Request - Selected Fields - Combo
              rowsSchema.forEach(row => {
                if (row.fNAME !== 'undefined') {
                  tmpFldString = tmpFldString + (row.fNAME) + ','
                }
              })
              const selFldString = tmpFldString.slice(0, tmpFldString.length - 1)
              db.unprepare(query)
              // Fourth Request - Data Load - Dual Substitution
              query = execSet[3].data
              // First Substitution - Fields
              query = query.replace('##', selFldString)
              // Second Substitution - Files
              query = query.replace('??', rowsInit[0].entTable)
              preparedSet.push(query)
              db.execute(query, function (err, results, fields) {
                if (err) {
                  rowsError.push(`Error:${err}`)
                } else {
                  rowsDatabase = results
                  returnResult = {
                    rowsError, rowsInit, rowsLinks, rowsSchema, rowsDatabase, rowsExtra
                  }
                  if (DEBUG) {
                    errMsg = 'ProcessSQL-executeSQL-PREPARED'
                    errReq = preparedSet
                    logJSONError(errMsg, errReq)
                  }
                  db.unprepare(query)
                  callback(returnResult)
                }
              })
            }
          })
        }
      })
    }
  })
}
