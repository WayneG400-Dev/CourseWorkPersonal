// const db2SQL = require('./db/db2SQL')
var dba = require('idb-connector')
const mysql = require('mysql')

var parseString = '{ "stnNum": 1, "stnDate": "2017-11-15", "stntyp": "D", "stn": "000100171115     H DEBUG DATEDIT(*YMD) DFTACTGRP(*NO)", "opCode": "CT", "sVar1": "DEBUG", "sVar2": "DATEDIT", "sVar3": "DFTACTGRP" }'

// let prepsql = 'INSERT INTO `wg_core`.`code`(?) values (?)'
var pgmName = '{ "prgName": "CONTUPD2ER.RPGLE",'
console.error('SQL:' + pgmName + parseString.slice(1))
var parseObject = JSON.parse(pgmName + parseString.slice(1))
let keyString = ' '
let valarray = []
for (var k in parseObject) keyString += ' , ' + k
for (var property1 in parseObject) valarray.push(parseObject[property1])
let sqlinserts = []
sqlinserts.push(valarray)
let keyString1 = keyString.slice(3)
let prepsql = `INSERT INTO WG_CORE.CODE(${keyString1}) values (?)`
let sql3 = mysql.format(prepsql, sqlinserts)
console.error('Stat: ' + sql3)

console.log('TEST IBM INSERT.')
var dbconn = new dba.dbconn()
dbconn.debug(true)
dbconn.conn('*LOCAL')
var sqlA = new dba.dbstmt(dbconn)
console.log('Execute A.')
sqlA.exec(sql3, function (x) {
  console.log('Execute A Done. Row Count: %d', x.length)
  sqlA.close()
  dbconn.disconn()
  dbconn.close()
})
