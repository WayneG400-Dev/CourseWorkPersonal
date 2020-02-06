const getData = require('./handeler')
const multiParse = require('./grammer')
// const MYSQL = require('./db/SQLMultiInsert')
// const _MYSQL = require('./db/SQLInsert')
console.log('Processing Index.js:')
getData.argsCheck()
.then((res) => {
  console.log('Processing Data Set:')
  console.log(JSON.stringify(res, undefined, 2))
  multiParse.multiParse(res)
  .then((contents) => {
    console.log('Parsed Data:')
    console.log(JSON.stringify(contents, undefined, 2))
    /* MYSQL.SQLMultiInsert(contents)
    .then((mysqlres) => {
      console.log('MYSQL Results:')
      console.log(JSON.stringify(mysqlres, undefined, 2))
      setTimeout(() => {
        console.log('Kill it DEAD')
        _MYSQL.SQLEND()
      }, 52000)
    }).catch((errorMessage) => {
      console.log(errorMessage)
    }) */
  }).catch((errorMessage) => {
    console.log(errorMessage)
  })
}).catch((errorMessage) => {
  console.log(errorMessage)
})
