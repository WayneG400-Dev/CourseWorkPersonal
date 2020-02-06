const fileData = require('./filedata')

var readFiles = (filepaths) => {
  return new Promise((resolve, reject) => {
    var itemPromises = filepaths.map(fileData.fileData)
    // for (let i = 0; i < filenames.length; i++) {
    //  fullPath = path + filenames[i]
    //  var promise = fileData.fileData(fullPath)
    Promise.all(itemPromises)
        .then((contents) => {
          console.log(JSON.stringify(contents, undefined, 2))
          resolve(contents)
        }).catch((errorMessage) => {
          console.log(errorMessage)
          reject(new Error(errorMessage))
        })
  })
}

module.exports.readFiles = readFiles
