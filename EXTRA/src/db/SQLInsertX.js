var mysql = require('mysql')
// Application Configs
Object.defineProperty(exports, '__esModule', {
  value: true
})
var _config = require('../config')
var _config2 = _interopRequireDefault(_config)
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
// USAGE: _config2.default.bodyLimit

// Setup Variables with defaults if not found
var dbHost = _config2.default.MYSQL_HOST || 'localhost'
var dbPort = _config2.default.MYSQL_PORT || 8889
var dbUser = _config2.default.MYSQL_USER || 'root'
var dbPassword = _config2.default.MYSQL_PASSWORD || 'root'
var dbDatabase = _config2.default.MYSQL_DATABASE || 'ant_test'
var dbLimit = _config2.default.DB_POOL || 100

var pool = mysql.createPool({
  connectionLimit: dbLimit,
  host: dbHost,
  port: dbPort,
  user: dbUser,
  password: dbPassword,
  database: dbDatabase
})

var SQLInsert = (record) => {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(new Error(err))
      }
      console.log(JSON.stringify(record))
      pool.query('INSERT INTO code SET ?', [record], function (err, rows, fields) {
        if (err) { reject(new Error(err)) }
        console.log('The solution is: ', rows)
        resolve(rows)
        pool.end(function (err) { if (err) reject(new Error(err)) })
      })
    })
  })
}

module.exports.SQLInsert = SQLInsert
