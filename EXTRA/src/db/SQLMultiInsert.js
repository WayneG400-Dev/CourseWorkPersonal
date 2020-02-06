const MYSQL = require('./SQLInsert')

var SQLMultiInsert = (dataObjs) => {
  return new Promise((resolve, reject) => {
   // var itemPromises = dataObjs.map(MYSQL.SQLInsert)
    var itemPromises = dataObjs.map(pgm => pgm.map(MYSQL.SQLInsert))
    Promise.all(itemPromises)
        .then((contents) => {
          console.log(JSON.stringify(contents, undefined, 2))
          resolve(contents)
          setTimeout(() => {
            console.log('Kill it DEAD')
          //  MYSQL.SQLEND()
          }, 52000)
        }).catch((errorMessage) => {
          console.log(errorMessage)
          reject(new Error(errorMessage))
        })
  })
}

module.exports.SQLMultiInsert = SQLMultiInsert
