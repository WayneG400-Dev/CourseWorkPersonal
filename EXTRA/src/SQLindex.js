const getData = require('./handeler')
const multiParse = require('./grammer')
const sql = require('mysql')
function executeSql (record, callback) {
  let connection = sql.createConnection({
    host: 'localhost',
    port: 8888,
    user: 'root',
    password: 'root',
    database: 'ant_test'
  })
  connection.connect(function (err) {
    if (err) {
      console.error('connection error: ' + err.stack)
      callback(null, err)
      return
    }

    connection.query('INSERT INTO code SET ?', [record], function (error, results, fields) {
      if (error) {
        console.error('error: ' + error.stack)
        callback(null, error)
        return
      }
      callback(results, null)
    })
  })
};

let recSet = []

getData.argsCheck()
.then((res) => {
  console.log('Processing Data Set:')
  console.log(JSON.stringify(res, undefined, 2))
  multiParse.multiParse(res)
  .then((contents) => {
    console.log('Parsed Data:')
    console.log(JSON.stringify(contents, undefined, 2))
    contents.forEach(file => {
      file.forEach(record => {
        recSet.push(record)
        console.log(JSON.stringify(record, undefined, 2))
// ==========================================================================================
/*        executeSql(record, function (data, err) {
          if (err) {
            console.error(err)
          } else {
            console.log('success')
          }
        }) */
// ==========================================================================================
      })
    })
    console.log(JSON.stringify(recSet, undefined, 2))
  }).catch((errorMessage) => {
    console.log(errorMessage)
  })
}).catch((errorMessage) => {
  console.log(errorMessage)
})
.catch((errorMessage) => {
  console.log(errorMessage)
})
