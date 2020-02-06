const db2 = require('./db2Insert')

var db2MultiInsert = (dataObjs) => {
  return new Promise((resolve, reject) => {
    // var itemPromises = dataObjs.map(pgm => pgm.map(db2.SQLInsert))
    var itemPromises = dataObjs.map(pgm => pgm.map(db2.SQLInsert))
    Promise.all(itemPromises)
        .then((contents) => {
          console.log(JSON.stringify(contents, undefined, 2))
          resolve(contents)
          setTimeout(() => {
            console.log('Kill it DEAD')
          }, 52000)
        }).catch((errorMessage) => {
          console.log(errorMessage)
          reject(new Error(errorMessage))
        })
  })
}

module.exports.db2MultiInsert = db2MultiInsert
