const getData = require('./handeler')
const multiParse = require('./grammer')
const db2 = require('./db/db2MultiInsert')

console.log('Processing Index.js:')
getData.argsCheck()
.then((res) => {
  console.log('Processing Data Set:')
  console.log(JSON.stringify(res, undefined, 2))
  multiParse.multiParse(res)
  .then((contents) => {
    console.log('Parsed Data:')
    console.log(JSON.stringify(contents, undefined, 2))
    db2.SQLMultiInsert(contents)
    .then((mysqlres) => {
      console.log('db2 Results:')
      console.log(JSON.stringify(mysqlres, undefined, 2))
    }).catch((errorMessage) => {
      console.log(errorMessage)
    })
  }).catch((errorMessage) => {
    console.log(errorMessage)
  })
}).catch((errorMessage) => {
  console.log(errorMessage)
})
