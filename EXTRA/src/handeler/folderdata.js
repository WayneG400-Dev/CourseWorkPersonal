
var fs = require('fs-extra')

var folderData = (folder) => {
  return new Promise((resolve, reject) => {
    // Promise usage:
    fs.pathExists(folder)
      .then((exists) => {
        if (exists === false) {
          reject(new Error('Unable to find folder.'))
        }
        fs.readdir(folder, function (err, filenames) {
          if (err) {
            reject(new Error(err))
          } else if (filenames.length === 0) {
            reject(new Error('Folder is Empty.'))
          } else if (filenames[0] !== ' ') {
            let filterFiles = filenames.filter(filename => filename.slice(0, 1) !== '.')
            const fullpath = filterFiles.map(x => folder + x)
            console.log(JSON.stringify(fullpath, undefined, 2))
            resolve(
              fullpath
            )
          }
        })
      })
  })
}
module.exports.folderData = folderData
