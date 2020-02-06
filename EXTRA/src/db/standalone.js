const sql = require('mysql')
/*
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

for(let i = 0; i<val1.length, i++)
    values.push([val1[i], val2]);

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
