var dba = require('idb-connector')
const mysql = require('mysql')
// Application Configs
Object.defineProperty(exports, '__esModule', {
  value: true
})
var _config = require('./config')
var _config2 = _interopRequireDefault(_config)
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
// USAGE: _config2.default.bodyLimit

console.log('derivePgmSchema:')
var start = Date.now()
var sqlt1 = Date.now()
var sqlt2 = Date.now()
var sqlt3 = Date.now()
var sqlt4 = Date.now()
// Setup Variables with defaults if not found
var dbHost = _config2.default.MYSQL_HOST || 'localhost'
var dbPort = _config2.default.MYSQL_PORT || 8889
var dbUser = _config2.default.MYSQL_USER || 'root'
var dbPassword = _config2.default.MYSQL_PASSWORD || 'root'
var dbDatabase = _config2.default.MYSQL_DATABASE || 'ant_test'
//  var dbLimit = _config2.default.DB_POOL || 100

var connection = mysql.createConnection({
  host: dbHost,
  port: dbPort,
  user: dbUser,
  password: dbPassword,
  database: dbDatabase
})

var presql1 = 'SELECT fileNM from entfile'
var presql2 = 'SELECT fName FROM EntSchema WHERE entNM IN (${})'
var presql3 = 'SELECT prgName, count(*) FROM code WHERE ? in (mVar, sVar1, sVar2, sVar3)'
var presql4 = 'INSERT INTO EntSchema(entId, entNM, fName, efID) VALUES(0,?,?,?)'

var cnt = 0
var fileNMArr = []
var fldNMArr = []
var insQryArr = []
var count1 = 1
var count2 = 1
var count3 = 1
var SQLPgmSchema = () => {
  connection.connect()
  var presql1 = 'SELECT fileNM from entfile'
  connection.query(presql1, function (err, rows1, fields) {
    if (err) throw err
    console.log(rows1[0])
    insQryArr = rows1
    sqlt1 = Date.now()
    let keyarray = []
    rows1.forEach(function (row1) {
      for (var key in row1) { keyarray.push(row1[key]) }
    })
    let keyString = JSON.stringify(keyarray)
    var presql2 = `SELECT fName FROM EntSchema WHERE entNM IN (${keyString})`
    connection.query(presql2, function (err, rows2, fields) {
      if (err) throw err
      console.log(rows2[0])
      sqlt2 = Date.now()
      rows2.forEach(function (row2) {
        for (var key in row2) {
          fileNMArr[cnt] = row2[key]
          cnt++
        }
      })
      var count3 = 1
      fldNMArr = fileNMArr

      fldNMArr.forEach(fldNM => {
        connection.query(presql3, [fldNM], function (err, rows3, fields) {
          if (err) throw err
          console.log(rows3[0])
          sqlt3 = Date.now()
          rows3.forEach(row3 => {
            if (row3['count(*)'] > 0) {
              let insert4 = [0, row3['prgName'], row3.val, (row3.index + 1)]
              connection.query(presql4, insert4, function (err, rows4, fields) {
                if (err) throw err
                console.log('Success: Entity Schema updated!')
                sqlt4 = Date.now()
                if (count1 === insQryArr.length + 1 &&
                      count2 === fileNMArr.length + 1 &&
                      count3 === fldNMArr.length + 1) { connection.end() }
              })
            }
          })
        })
        count3++
      })
    })  // Looping fldNMArr
               // count2++
  })
        // count2++;
}

var db2PgmSchema = () => {
  var dbconns = new dba.dbconn()
  // dbconns.debug(true);
  dbconns.conn('*LOCAL')
  var sqlAs = new dba.dbstmt(dbconns)
  var sqlBs = new dba.dbstmt(dbconns)
  var sqlCs = new dba.dbstmt(dbconns)
  var sqlDs = new dba.dbstmt(dbconns)
  console.log('Execute A.')
  sqlAs.execSync(presql1, function (rows1) {
    console.log('Execute A Done. Row Count: %d', rows1.length)
    let keyarray = []
    sqlt1 = Date.now()
    rows1.forEach(function (row1) {
      for (var key in row1) { keyarray.push(row1[key]) }
    })
    let keyString = JSON.stringify(keyarray)
    presql2 = `SELECT fName FROM EntSchema WHERE entNM IN (${keyString})`
    sqlAs.close()
  })
  console.log('Execute B.')
  sqlBs.execSync(presql2, function (rows2) {
    console.log('Execute B Done. Row Count: %d', rows2.length)
    sqlt2 = Date.now()
    let fldNMArr = []
    rows2.forEach(function (row2) {
      for (var key in row2) {
        fldNMArr[cnt] = row2[key]
        cnt++
      }
    })
    sqlCs.close()
  })
  console.log('Execute C.')
  fldNMArr.forEach(fldNM => {
    sqlAs.execSync(presql3, [fldNM], function (err, rows3, fields) {
      if (err) throw err
      console.log(rows3[0])
      sqlt3 = Date.now()
      rows3.forEach(row3 => {
        if (row3['count(*)'] > 0) {
          let insert4 = [0, row3['prgName'], row3.valval, (row3.index + 1)]
          console.log('Execute D.')
          sqlBs.execSync(presql4, insert4, function (rows4) {
            console.log('Execute D Done. Row Count: %d', rows4.length)
            sqlt4 = Date.now()
            sqlDs.close()
            if (count1 === insQryArr.length + 1 &&
                count2 === fileNMArr.length + 1 &&
                count3 === fldNMArr.length + 1) {
              dbconns.disconn()
              dbconns.close()
            }
          })
        }
      })
    })
  })
}

let reportDuration = () => {
  console.log(`--STATS--`)
  console.log(`Time Total: ${(Date.now() - start)} seconds`)
  console.log(`sql1 Total: ${(sqlt1 - start)} seconds`)
  console.log(`sql2 Total: ${(sqlt2 - sqlt1)} seconds`)
  console.log(`sql3 Total: ${(sqlt3 - sqlt2)} seconds`)
  console.log(`sql4 Total: ${(sqlt4 - sqlt3)} seconds`)
}

if (_config2.default.USE_DB) {
  db2PgmSchema()
  reportDuration()
} else {
  SQLPgmSchema()
}
