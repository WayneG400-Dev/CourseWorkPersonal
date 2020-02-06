// Application Configs
import config from '../config'
import fs from 'fs'
import path from 'path'
// Variables
var errorsfound = []
var validNames = []
var validRelationshipIDs = []
var DEBUG = config.DEBUG_ALL
/// Error Handeling - DEBUG
var errMsg = 'Error: InValid Request'
var errReq
var logDirectory = path.join(__dirname, 'DEBUG')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
const debugLogStream = fs.createWriteStream(`${logDirectory}/validateReq.log`)
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
export default function (recievedReq) {
  if (DEBUG) {
    errMsg = 'ProcessValidatiom-Main-Start'
    errReq = recievedReq
    logJSONError(errMsg, errReq)
  }
  // See templates folder for Req Structures
  // reset variables
  errorsfound = []
  validNames = config.VALID_NAMES
  validRelationshipIDs = config.VALID_REL_ID
  // Check the Structure 1st
  checkReqStruct(recievedReq)
  if (errorsfound.length !== 0) {
    return errorsfound
  } else {
    // Check Request against Structure Requirements.
    checkReqData(recievedReq)
    if (errorsfound.length !== 0) {
      return errorsfound
    } else {
      return errorsfound
    }
  }
  function checkReqStruct (recievedReq) {
    if (typeof recievedReq === 'undefined') {
      errorsfound.push(`Error-Request-Struct: InValid JSON OBJECT for Request`)
      if (DEBUG) errorsfound.push(`1-REQ: ${recievedReq}`)
      return
    }

    // Required Universally
    if (typeof recievedReq.name === 'undefined' || typeof recievedReq.relationshipID === 'undefined' ||
    typeof recievedReq.paging === 'undefined' || typeof recievedReq.stateObj === 'undefined') {
      errorsfound.push(`Error-Request-Struct: InValid JSON OBJECT for Request`)
      if (DEBUG) errorsfound.push(`2-REQ: ${recievedReq}`)
      return
    }
    // if RelationshipID = 0, Assume INITIAL CALL.
    if (recievedReq.relationshipID === 0 || recievedReq.relationshipID === null) {
      // no Validation needed
    } else {
      // All other calls check for stateObj relationshipID
      if (!recievedReq.stateObj.relationshipID) {
        errorsfound.push(`Error-Request-Struct: InValid STATE OBJECT for Request`)
        if (DEBUG) errorsfound.push(`3-REQ: ${recievedReq}`)
      } else {
        // Required Call 2 - (SORTS,PAGING,SEARCH,FILTER) - if relationshipID not changed check for schema
        if (recievedReq.relationshipID === recievedReq.stateObj.relationship) {
          if (!recievedReq.schema) {
            errorsfound.push(`Error-Request-Struct: InValid JSON OBJECT for Request`)
            if (DEBUG) errorsfound.push(`4-REQ: ${recievedReq}`)
          }
        }
      }
    }
    // Required Call ViewDetail.Next() - no structure validations
  }

  function checkReqData (recievedReq) {
    // Required Universally - Name populated and valid
    if (recievedReq.name === ' ' || recievedReq.name === null) {
      errorsfound.push(`Error-Request-Data: InValid Data for Name in Request`)
      return
    } else {
      if (validNames.includes(`${recievedReq.name}`) === null) {
        errorsfound.push(`Error-Request-Data: InValid Data for Name in Request`)
        return
      }
    }

    // if RelationshipID = 0, Assume INITIAL CALL.
    if (recievedReq.relationshipID === 0 || recievedReq.relationshipID === null) {
      // DO no more
    } else {
      if (validRelationshipIDs.find(recievedReq.relationshipID) === null) {
        errorsfound.push(`Error-Request-Data: InValid Data for RelationshipID in Request`)
        return
      }
    }
    // Required Call 2 - (SORTS,PAGING,SEARCH,FILTER) - Check paging details populated
    if (recievedReq.relationshipID === recievedReq.stateObj.relationshipID) {
      if (!recievedReq.paging.pgNumber || !recievedReq.paging.pgSize) {
        errorsfound.push(`Error-Request-Data: InValid Data for Paging in Request`)
        return
      }
    }

    // Required Call ViewDetail.Next() - Check from and to relationshipID link is valid
    if (recievedReq.relationshipID !== recievedReq.stateObj.relationshipID) {
      if (recievedReq.stateObj.relationshipID === null) {
        errorsfound.push(`Error-Request-Data: InValid Data for State in Request`)
      }
    }
  }
}
