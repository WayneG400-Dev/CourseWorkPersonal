const getData = require('./handeler')
const multiParse = require('./grammer')
const MYSQL = require('./db/SQLMultiInsert')
const _MYSQL = require('./db/SQLInsert')
/*
getData.argsCheck()
.then((res) => {
  console.log('Processing Data Set:')
  console.log(JSON.stringify(res, undefined, 2))
  multiParse.multiParse(res)
  .then((contents) => {
    console.log('Parsed Data:')
    console.log(JSON.stringify(contents, undefined, 2))
    MYSQL.SQLMultiInsert(contents)
    .then((mysqlres) => {
      console.log('MYSQL Results:')
      console.log(JSON.stringify(mysqlres, undefined, 2))
      setTimeout(() => {
        console.log('Kill it DEAD')
        _MYSQL.SQLEND()
      }, 52000)
    }).catch((errorMessage) => {
      console.log(errorMessage)
    })
  }).catch((errorMessage) => {
    console.log(errorMessage)
  })
}).catch((errorMessage) => {
  console.log(errorMessage)
})
const sql = require("mysql")

//Connection settings
const sqlConfig = require("../settings");

function executeSql(queryData, callback){
    let connection = sql.createConnection(sqlConfig.dbConfig);
    connection.connect(function(err){
        if(err){
            console.error('connection error: ' + err.stack);
            callback(null, err);
            return;
        }

        connection.query(queryData, function(error, results, fields){
            if(error){
                console.error('error: '+error.stack);
                callback(null, error);
                return;
            }
            callback(results, null);
        });
    });
};

let sqlquery = "INSERT INTO table(val1, val2) VALUES (?)";

let val1 = [1,2,3,4];
let val2 = 1;

let values = [];

for (let i = 0; i<val1.length, i++) {
    values.push([val1[i], val2]);
};

let queryData = {
    sql: sqlquery,
    values: values
}

executeSql(queryData, function(data, err) {
    if (err) {
        console.error(err);
    } else {
        console.log("success");
    }
}); */
