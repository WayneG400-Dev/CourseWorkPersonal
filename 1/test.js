const db = require('idb-connector')
const sSql = 'SELECT * FROM EXT1_ALL.ENTITIES'
const dbconn = new db.dbconn()
dbconn.conn('*LOCAL')
const stmt = new db.dbstmt(dbconn)

stmt.exec(sSql, (x) => {
  console.log('%s', JSON.stringify(x))
  stmt.close()
  dbconn.disconn()
  dbconn.close()
})

const db2 = require('idb-connector')
const sSql2 = 'SELECT * FROM EXT1_ALL.PROGRAMES'
const dbconn2 = new db.dbconn()
dbconn2.conn('*LOCAL')
const stmt2 = new db.dbstmt(dbconn)

stmt2.prepare(sSql2, () => {
  stmt2.execute(() => {
    stmt2.fetchAll((x) => {
      console.log('%s', JSON.stringify(x))
      stmt2.close()
    })
  })
})
