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

var connection = mysql.createConnection({
  host: dbHost,
  port: dbPort,
  user: dbUser,
  password: dbPassword,
  database: dbDatabase
})

function SQLInsert (record) {
  connection.connect()
  connection.query('INSERT INTO code SET ?', [record], function (err, rows, fields) {
    if (err) throw err
    console.log(rows[0])
  })
  // connection.end()
}

module.exports.SQLInsert = SQLInsert
