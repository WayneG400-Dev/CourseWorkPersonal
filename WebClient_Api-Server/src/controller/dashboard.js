// Default Imports
import {Router} from 'express'
// Application Configs
import conf from '../config'
import fs from 'fs'
import path from 'path'
// Application Actions
import validateReq from '../actions/validateReq'
import processSQL from '../actions/processSQL'
import constructRes from '../actions/constructRes'
// Variables
var DEBUG = conf.DEBUG_ALL
var reqErrors = []
// DEBUG SETUP
var errMsg = 'Error: InValid Request'
var errReq

var logDirectory = path.join(__dirname, 'DEBUG')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
const debugLogStream = fs.createWriteStream(`${logDirectory}/dashboard.log`)
function logJSONError (errMsg, errReq) {
  var resJSONError = {}
  resJSONError = {
    'Location': `${errMsg}`,
    'Details': `${JSON.stringify(errReq)}`
  }
  debugLogStream.write(JSON.stringify(resJSONError))
  debugLogStream.write('\n')
}

function resJSONError (errMsg, errReq) {
  var resJSONError = {}
  if (DEBUG) {
    resJSONError = {
      'Error': true,
      'Message': `${errMsg}`,
      'Details': `${JSON.stringify(errReq)}`
    }
  } else {
    resJSONError = {
      'Error': true,
      'Message': `${errMsg}`
    }
  }
  return resJSONError
}
// Process Request from Router /// Seperate as part of next Cycle
function processReq (db, req, res) {
  let recievedReq
  let schemaName
  let reqBody
  let reqName
  let reqPaging
  let reqRelationshipID
  let reqStateObj
  let reqSchema
  if (typeof req.body === 'undefined') {
    recievedReq = req
    schemaName = req.name
    reqBody = req
    reqName = req.name
    reqPaging = req.paging
    reqRelationshipID = req.relationshipID
    reqStateObj = req.stateObj
    if (typeof req.schema !== 'undefined') reqSchema = req.schema
  } else {
    recievedReq = req.body
    schemaName = req.body.name
    reqBody = req.body
    reqName = req.body.name
    reqPaging = req.body.paging
    reqRelationshipID = req.body.relationshipID
    reqStateObj = req.body.stateObj
    if (typeof req.body.schema !== 'undefined') reqSchema = req.body.schema
  }
  if (DEBUG) errReq = recievedReq

  reqErrors = validateReq(recievedReq)
  if (DEBUG) {
    errMsg = 'Dashboard-After-ValidateREQ'
    errReq = reqErrors
    logJSONError(errMsg, errReq)
  }
  // return any errors
  if (reqErrors.length > 0) {
    errMsg = `${reqErrors}`
    res.json(resJSONError(errMsg, errReq))
  }
  errMsg = `Internal ERROR - Please contact Provider`
  // Returns SQL Statements based on requestLVL: INIT || CALL2 || DETAILS
  processSQL(reqBody, db, res, (SQLSET) => {
    if (DEBUG) {
      errMsg = 'Dashboard-After-processSQL'
      errReq = SQLSET
      logJSONError(errMsg, errReq)
    }
    constructRes(SQLSET, reqSchema, (jsonRes) => {
      if (DEBUG) {
        errMsg = 'Dashboard-Before-ReturnResults'
        errReq = jsonRes
        logJSONError(errMsg, errReq)
        let finDump = { recievedReq, schemaName, reqBody, reqName, reqPaging, reqRelationshipID, reqStateObj }
        errMsg = 'Dashboard-Variable-DUMP'
        errReq = finDump
        logJSONError(errMsg, errReq)
      }
      // Return Response
      return res.json(jsonRes)
    })
  })
}

export default ({ config, db }) => {
  let api = Router()
  // '/api/dashboard/' - Generic End-Point
  api.post('/', function (req, res) {
    errMsg = `Error: InValid JSON OBJECT for Request`
    if (DEBUG) errReq = req.body
    // Check the Required Universally Struct.
    if (typeof req.body === 'undefined') {
      res.json(resJSONError(errMsg, errReq))
    } else {
      if ((typeof req.body.name === 'undefined') || (typeof req.body.relationshipID === 'undefined') ||
        (typeof req.body.paging === 'undefined') || (typeof req.body.stateObj === 'undefined')) {
        res.json(resJSONError(errMsg, errReq))
      } else {
        processReq(db, req.body, res)
      }
    }
  })
  // '/api/dashboard/?PageIndex' - GET Allowed Implicit Structure
  api.post('/:id', function (req, res) {
    errMsg = `Error: InValid JSON OBJECT for Request`
    if (DEBUG) errReq = req.body
    if (req.params.id === 'EXPOSE') {
      // '/api/dashboard/expose' - Ninja Generic End-Point
      //  res.render('api', { routes: api.stack })
      require('../document')(api.stack, 'express')
      errMsg = `Error invalid NINJA`
      res.json(resJSONError(errMsg, errReq))
    } else {
      if (req.params.id !== 'CUSTOMER') {
        res.json(resJSONError(errMsg, errReq))
      } else {
        // Check the Required Universally Struct.
        if (typeof req.body === 'undefined') {
          res.json(resJSONError(errMsg, errReq))
        } else {
          if ((typeof req.body.name === 'undefined') || (typeof req.body.relationshipID === 'undefined') ||
          (typeof req.body.paging === 'undefined') || (typeof req.body.stateObj === 'undefined')) {
            res.json(resJSONError(errMsg, errReq))
          } else {
            processReq(db, req.body, res)
          }
        }
      }
    }
  })
  return api
}
