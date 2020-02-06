const folderData = require('./folderdata')
const readFiles = require('./readfiles')

var folderFileData = (path) => {
  return new Promise((resolve, reject) => {
    // Promise usage:
    folderData.folderData(path)
      .then((filenames) => {
        let filterFiles = filenames.filter(filename => filename.slice(0, 1) !== '.')
        console.log(JSON.stringify(filterFiles, undefined, 2))
        return readFiles.readFiles(filterFiles)
      }).then((contents) => {
        console.log(JSON.stringify(contents, undefined, 2))
        resolve(contents)
      }).catch((errorMessage) => {
        console.log(errorMessage)
        reject(new Error(errorMessage))
      })
  })
}

module.exports.folderFileData = folderFileData
/*
var folderFileData = (folder, callback) => {
  fs.readdir(dirname, function (err, filenames) {
    if (err) {
      onError(err)
      return
    }
    filenames.forEach(function (filename) {
      fs.readFile(dirname + filename, 'utf-8', function (err, content) {
        if (err) {
          onError(err)
          return
        }
        onFileContent(filename, content)
      })
    })
  })
}

module.exports.folderFileData = folderFileData
*/
