
var db = require('/QOpenSys/QIBM/ProdData/OPS/Node6/os400/db2i/lib/db2a')

var DBname = '*LOCAL'
var userId = 'u0019837'
var passwd = 'itdevwg1'
// var ip = '172.29.153.62'
// var port = 5000

var db2SQL = (sql) => {
  return new Promise((resolve, reject) => {
    // Promise usage:
    if (sql && sql.length > 0) {
      console.log('SQL statement : ' + sql)
      var dbconn = new db.dbconn()  // db.dbconn()
      dbconn.conn(DBname, userId,
                    passwd)  // Connect to the DB
      var stmt = new db.dbstmt(dbconn) // db.dbstmt(dbconn)
      // stmt.conn('*LOCAL')
	    stmt.exec('SET SCHEMA QIWS', (rs) => {  // Query the statement
      console.log(JSON.stringify(rs, undefined, 2))
      stmt.exec(sql, (rs) => {  // Query the statement
          console.log(JSON.stringify(rs, undefined, 2))
        // stmt.close()
          dbconn.disconn()
          dbconn.close()
          resolve(rs)
        })
    })
    } else {
      reject(new Error(`Invalid SQL: ${sql}`))
    }
  })
}

module.exports.db2SQL = db2SQL
