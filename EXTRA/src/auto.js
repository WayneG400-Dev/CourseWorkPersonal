'use strict'
/* Importing packages */
const yargs = require('yargs')
// Application Configs
Object.defineProperty(exports, '__esModule', {
  value: true
})
var _config = require('./config')
var _config2 = _interopRequireDefault(_config)
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
// USAGE: _config2.default.bodyLimit

// File Handelers:
const folderData = require('./handeler/folderdata')
const folderFileData = require('./handeler/folderfiledata')
const fileData = require('./handeler/filedata')
const readFiles = require('./readfiles')

/* Command formation/validation using yargs */
var argv = yargs
    .usage('Usage: node $0 -f <filename>')
    .option({
      filename: {
        alias: 'f',
        description: '<filename> Input file name. ** File must be placed in the <source_in> folder**',
        requiresArg: true
        // required: true
      }
    })
    .help('help').alias('help', 'h')
    .version(false)
    .argv

var argsCheck = () => {
  return new Promise((resolve, reject) => {
    var argInx = process.argv.indexOf('-f')
    var fileName
    if (argInx === -1 || argInx === 0) {
      fileName = '*ALL'
      console.log('FileName Parm not found defaulting to *ALL')
      if (_config2.default.AUTO_LVL === 1) {
        folderData.folderData(_config2.default.DEFAULT_FOLDER)
        .then((resFiles) => {
          console.log('Folder Data:', resFiles)
          readFiles.readFiles(resFiles)
          .then((res) => {
            console.log('Multi Read Data:', res)
            resolve(res)
          }).catch((errorMessage) => {
            console.log(errorMessage)
            reject(new Error(errorMessage))
          })
        }).catch((errorMessage) => {
          console.log(errorMessage)
          reject(new Error(errorMessage))
        })
      } else {
        folderFileData.folderFileData(_config2.default.DEFAULT_FOLDER)
        .then((res) => {
          console.log('Folder File Data:', res)
          resolve(res)
        }).catch((errorMessage) => {
          console.log(errorMessage)
          reject(new Error(errorMessage))
        })
      }
    } else {
      console.log(argv)
      fileName = process.argv[argInx + 1]
      console.log(`Executing on on File: ${fileName}`)
      const fullpath = `${_config2.default.DEFAULT_FOLDER}${fileName}`
      fileData.fileData(fullpath)
      .then((res) => {
        console.log('Input File Data:', res)
        resolve(res)
      }).catch((errorMessage) => {
        console.log(errorMessage)
        reject(new Error(errorMessage))
      })
    }
  })
}

module.exports.argsCheck = argsCheck
