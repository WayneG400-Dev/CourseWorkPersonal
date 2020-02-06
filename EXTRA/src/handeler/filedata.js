
var fs = require('fs-extra')

var fileData = (path) => {
  return new Promise((resolve, reject) => {
    // Promise usage:
    fs.pathExists(path)
      .then((exists) => {
        if (exists === false) {
          reject(new Error('Unable to find file.'))
        }
        fs.readFile(path, 'utf-8', function (err, content) {
          if (err) {
            reject(new Error(err))
          } else if (content.length === 0) {
            reject(new Error('File is Empty.'))
          } else if (content.length !== ' ') {
            resolve(
              { PGMName: path.split('\\').pop().split('/').pop(), SrcCode: content }
            )
          }
        })
      })
  })
}
module.exports.fileData = fileData
