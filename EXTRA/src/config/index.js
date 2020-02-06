'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

exports.default = {
  // MYSQL DEFAULTS //
  USE_MYSQL: true,
  MYSQL_HOST: 'localhost',
  MYSQL_PORT: 8889,
  MYSQL_USER: 'root',
  MYSQL_PASSWORD: 'root',
  MYSQL_DATABASE: 'ant_test',
  MYSQL_SCHEMA: 'WG_Code',
  MYSQL_TABLE: 'Code',
  // IBMi DEFAULTS //
  USE_DB: false,
  DB2I_HOST: '172.29.153.62',
  DB2I_PORT: 50000,
  DB2I_USERNAME: 'u0019837',
  DB2I_PASSWORD: 'itdevwg1',
  DB2I_DATABASE: '*LOCAL',
  DB2I_DATABASE2: 'SQLDB',
  DB2I_SCHEMA: 'WG_Code',
  DB2I_TABLE: 'Code',

  // MONGO DEFAULTS //
  MONGO_HOST: 'mongodb://localhost',
  MONGO_PORT: 27017,
  MONGO_COLNAME: 'WG_Code',
  MONGO_TABLE: 'Code',

  // APP DEFAULTS //
  ANTLR_LANG: '',
  DEFAULT_DB: 'MYSQL',
  DEFAULT_FOLDER: './source_in/',
  DB_POOL: 1000,
  JOB_LIMIT: 100,
  // Automation file handeling:
  // 0 - No Automation
  // 1 - 2 step List folder then Read
  // 2 - Read All at once.
  AUTO_LVL: 1

}
