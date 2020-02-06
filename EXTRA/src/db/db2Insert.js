var dba = require('idb-connector')
const mysql = require('mysql')

var db2Insert = (parseObject) => {
  return new Promise((resolve, reject) => {
    let keyString = ' '
    let valarray = []
    for (var k in parseObject) keyString += ' , ' + k
    for (var property1 in parseObject) valarray.push(parseObject[property1])
    let sqlinserts = []
    sqlinserts.push(valarray)
    let keyString1 = keyString.slice(3)
    let prepsql = `INSERT INTO WG_CORE.CODE(${keyString1}) values (?)`
    let sql = mysql.format(prepsql, sqlinserts)
    console.log('Stat: ' + sql)
    var dbconn = new dba.dbconn()
    // dbconn.debug(true)
    dbconn.conn('*LOCAL')
    var sqlA = new dba.dbstmt(dbconn)
    sqlA.exec(sql, function (x) {
      console.log('Execute A Done. Row Count: %d', x.length)
      sqlA.close()
      dbconn.disconn()
      dbconn.close()
      resolve('Execute A Done. Row Count: %d', x.length)
    })
  })
}

module.exports.db2Insert = db2Insert
