const sql = require('mysql')

function executeSql (record, callback) {
  let connection = sql.createConnection({
      host: 'localhost',
      port: 8889,
      user: 'root',
      password: 'root',
      database: 'ant_test'
    })
    connection.connect(function (err) {
      if (err) {
          console.error('connection error: ' + err.stack)
            callback(null, err)
            return;
        }

      connection.query('INSERT INTO code SET ?', [record], function (error, results, fields) {
          if (error) {
              console.error('error: ' + error.stack)
                callback(null, error)
                return;
            }
          callback(results, null)
        })
    })
};

executeSql(queryData, function (data, err) {
  if (err) {
      console.error(err)
    } else {
      console.log('success') 
    }
})
