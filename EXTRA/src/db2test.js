// const db2SQL = require('./db/db2SQL')
var dba = require('idb-connector')
const mysql = require('mysql')
var parseString = '{ "stnNum": 1, "stnDate": "2017-11-15", "stntyp": "D", "stn": "000100171115     H DEBUG DATEDIT(*YMD) DFTACTGRP(*NO)", "opCode": "CT", "sVar1": "DEBUG", "sVar2": "DATEDIT", "sVar3": "DFTACTGRP" }'
var parseString2 = '[{ "stnNum": 1, "stnDate": "2017-11-15", "stntyp": "D", "stn": "000100171115     H DEBUG DATEDIT(*YMD) DFTACTGRP(*NO)", "opCode": "CT", "sVar1": "DEBUG", "sVar2": "DATEDIT", "sVar3": "DFTACTGRP" },  { "stnNum": 2, "stnDate": "2017-11-15", "stntyp": "D", "stn": "000200171115     H OPTION(*SRCSTMT:*NODEBUGIO)",  "opCode": "CT", "sVar1": "OPTION"},  { "stnNum": 3, "stnDate": "2017-11-15", "stntyp": "D", "stn": "000300171115     FCONTRACT  UF   E           K DISK", "opCode": "FD", "mVar": "CONTRACT" }]'
var parseData = JSON.parse(parseString2)
var pgmName = '{"prgName":"CONTUPD2ER.RPGLE",'
var sqlstat = 'INSERT INTO code SET ?'
// let newData = parseData.map(data =>
//  JSON.parse(pgmName + JSON.stringify(data).slice(1))
// )
let newData = JSON.parse(pgmName + parseString.slice(1)) // JSON.parse(parseString)
var sql = ' '
let sql1 = mysql.format(sqlstat, newData)
console.error('Stat1: ' + sql)
sql = 'SELECT * FROM ?? WHERE ?? = ?'
var inserts = ['users', 'id', 'WAYNE']
let sql2 = mysql.format(sql, inserts)
console.error('Stat2: ' + sql)

let prepsql = 'INSERT INTO `ant_test`.`code`(?) values (?)'
var parseObject = JSON.parse(parseString)
let keyarray = Object.keys(parseObject)
let valarray = Object.values(parseObject)
let sqlinserts = []
sqlinserts.push(keyarray)
sqlinserts.push(valarray)
let sql3 = mysql.format(prepsql, sqlinserts)
console.error('Stat2: ' + sql)

// var sql = 'SELECT * from QIWS/QCUSTCDT'
// db2SQL.db2SQL(sql)
// .then((res) => {
//   console.log('Data Object ::', res)
// }).catch((errorMessage) => {
//   console.log(errorMessage)
// })
/*
var dba = require('idb-connector')
var dbconns = new dba.dbconn()
// dbconns.debug(true);
dbconns.conn('*LOCAL')
var sqlAs = new dba.dbstmt(dbconns)
var sqlBs = new dba.dbstmt(dbconns)
console.log('Execute A.')
sqlAs.execSync(sql1, function (x) {
  console.log('Execute A Done. Row Count: %d', x.length)
  sqlAs.close()
})
console.log('Execute B.')
sqlBs.execSync(sql2, function (x) {
  console.log('Execute B Done. Row Count: %d', x.length)
  sqlBs.close()
})
dbconns.disconn()
dbconns.close()

console.log('Test Async in callback.')
var dbconn = new dba.dbconn()
// dbconn.debug(true);
dbconn.conn('*LOCAL')
var sqlA = new dba.dbstmt(dbconn)
var sqlB = new dba.dbstmt(dbconn)
console.log('Execute A.')
sqlA.exec(sql1, function (x) {
  console.log('Execute A Done. Row Count: %d', x.length)
  sqlA.close()
  console.log('Execute B.')
  sqlB.exec(sql2, function (x) {
    console.log('Execute B Done. Row Count: %d', x.length)
    sqlB.close()
    dbconn.disconn()
    dbconn.close()
  })
})

setTimeout(function () {
  console.log('Test Async concurrently.')
  var dbconn = new dba.dbconn()
  // dbconn.debug(true);
  dbconn.conn('*LOCAL')
  var sqlA = new dba.dbstmt(dbconn)
  var sqlB = new dba.dbstmt(dbconn)
  console.log('Execute A.')
  sqlA.exec(sql1, function (x) {
    console.log('Execute A Done. Row Count: %d', x.length)
    sqlA.close()
  })
  console.log('Execute B.')
  sqlB.exec(sql2, function (x) {
    console.log('Execute B Done. Row Count: %d', x.length)
    sqlB.close()
  })
  setTimeout(function () {
    dbconn.disconn()
    dbconn.close()
  }, 1000) // Sleep for 1 sec to wait for both executions done before disconnecting.
}, 1000) // Sleep for 1 sec to wait for previous test done.
*/
