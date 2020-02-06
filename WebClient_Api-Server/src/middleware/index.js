// Default imports
import {Router} from 'express'
// Logging Related
import fs from 'fs'
import morgan from 'morgan'
import rfs from 'rotating-file-stream'
// Application Configs
import config from '../config'

// ++++ MAIN ++++//
export default ({configin, db}) => {
  let api = Router()
  // Logging setup default auto_log
  var DEBUG = config.DEBUG_LOG || false
  var AUTO_LOG = config.DEBUG_LOG || true
  var LOG_INTERVAL = config.AUTO_LOG_ROTATION_INTERVAL || '1d'
  var LOG_SIZE = config.AUTO_LOG_ROTATION_SIZE || '10M'
  var logDirectory = config.LOG_DIR
  // ensure log directory exists - again
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
  if (AUTO_LOG) {
    // create a rotating write stream
    var accessLogStream =
        rfs('access.log',
          {maxSize: LOG_SIZE, interval: LOG_INTERVAL, path: logDirectory})
    // setup the logger
    api.use(morgan('tiny', {stream: accessLogStream}))
  }
  if (DEBUG) {
    // create a rotating write stream
    var requestLogStream =
        rfs('request.log',
          {maxSize: LOG_SIZE, interval: LOG_INTERVAL, path: logDirectory})
    // create a rotating write stream
    var responseLogStream =
        rfs('response.log',
          {maxSize: LOG_SIZE, interval: LOG_INTERVAL, path: logDirectory})
    // setup the logger
    api.use(morgan('dev', {
      stream: requestLogStream,
      skip: function (req, res) {
        return res.statusCode < 400
      }
    }))
    // setup the logger
    api.use(morgan('combined', {stream: responseLogStream}))
  }
  return api
}
