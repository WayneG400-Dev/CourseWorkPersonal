// const folderData = require('./folderdata')
// const fileData = require('./filedata')
// const readFiles = require('./readfiles')
const folderFileData = require('./folderfiledata.js')

const path = './source_in/'
// const fullfolderfiles = [ './source_in/CONTUPD2ER.RPGLE', './source_in/CONTUPD2FR.RPGLE', './source_in/CONTUPD2GR.RPGLE' ]
// const folderfiles = [ 'CONTUPD2ER.RPGLE', 'CONTUPD2FR.RPGLE', 'CONTUPD2GR.RPGLE' ]

folderFileData.folderFileData(path)
.then((res) => {
  console.log('Should be 45', res)
}).catch((errorMessage) => {
  console.log(errorMessage)
})

/*
readFiles.readFiles(fullfolderfiles)
.then((res) => {
  console.log('Should be 45', res)
}).catch((errorMessage) => {
  console.log(errorMessage)
})
*/
/*
folderData.folderData(path)
.then((res) => {
  console.log('Should be 45', res)
}).catch((errorMessage) => {
  console.log(errorMessage)
})
*/
/*
const fullpath = './source_in/CONTUPD2ER.RPGLE'
fileData.fileData(fullpath)
.then((res) => {
  console.log('Should be 45', res)
}).catch((errorMessage) => {
  console.log(errorMessage)
})
*/
