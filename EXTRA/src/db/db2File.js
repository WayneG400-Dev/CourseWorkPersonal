var fs = require('fs')

var db2File = (realPath) => {
  return new Promise((resolve, reject) => {
    // Promise usage:
    if (realPath && realPath.length > 0) {
      console.log('File statement : ' + realPath)
      var file = fs.createReadStream(realPath)
      file.on('data', resolve(file))
      file.on('close', resolve(file))
      file.on('error', (err) => {
        reject(new Error(`Invalid : ${err}`))
      })
    } else {
      reject(new Error(`Invalid Path: ${realPath}`))
    }
  })
}

module.exports.db2File = db2File
