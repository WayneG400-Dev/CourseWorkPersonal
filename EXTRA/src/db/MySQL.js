const mysql = require('mysql')

var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  port: 8889,
  user: 'root',
  password: 'root',
  database: 'source_code'
})

function StaticSQL (sql) {
  pool.getConnection(function (err, connection) {
    if (err) throw err
    // Use the connection
    connection.query(sql, function (err, rows) {
      if (err) throw err
        // And done with the connection.
      console.log(rows[0])
      connection.release()
      // Don't use the connection here, it has been returned to the pool.
    })
  })
}

function DynamicSQL (sql, value1, value2) {
  pool.getConnection(function (err, connection) {
    if (err) throw err
    // Use the connection
    connection.query(sql, [value1, value2], function (err, rows) {
      if (err) throw err
      // And done with the connection.
      console.log(rows[0])
      connection.release()
      // Don't use the connection here, it has been returned to the pool.
    })
  })
}

module.exports = {
  StaticSQL,
  DynamicSQL
}
