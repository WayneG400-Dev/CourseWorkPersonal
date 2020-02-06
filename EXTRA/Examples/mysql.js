import mysql from 'mysql';

import genconfig from '../config';

// export default callback => {

function MYSQLConnect() {
  let db = mysql.createConnection({
    host: genconfig.MYSQL_HOST,
    port: genconfig.MYSQL_PORT,
    user: genconfig.MYSQL_USER,
    password: genconfig.MYSQL_PASSWORD
  });
  db.connect(function(err) {
    if (err) throw err;
  });
  return (db);
};



function MYSQLExQry(conVar, query, fail, success) {
  conVar.query(query, function(err, result) {
    if (err) {
      console.log(fail);
    } else {
      console.log(success);
    }
    console.log(`coolstory bro: ${result}`);
  });
};


function MYSQLCreate(conVar) {
  MYSQLExQry(
      conVar, 'CREATE SCHEMA IF NOT EXISTS source_code',
      'Error: Database not found !', 'Using database !');
  MYSQLExQry(
      conVar, 'USE source_code', 'Error: Database not found !',
      'Using database !');
  MYSQLExQry(
      conVar,
      'CREATE TABLE IF NOT EXISTS code(prgName varchar(50) not null, stnNum int not null, stnDate date, stnTyp varchar(2) not null, stn varchar(120) not null, opCode varchar(10), opType varchar(20), mVar varchar(50), sVar1 varchar(50), sVar2 varchar(50), sVar3 varchar(50), cat1 varchar(2), cat2 varchar(2), cat3 varchar(2))',
      'Error: Table not created !', 'Table created successfully !');
}
let jsonArr = [];
function MYSQLInsert(conVar, jsonArr, fName) {
  console.log(`Insert: ${jsonArr}`);
  var insQryArr = [];
  var keys = '(prgName';
  var vals = 'VALUES(\'' + fName + '\'';
  var cnt = 0;
  jsonArr.forEach(function(keyVal) {
    for (key in keyVal) {
      keys = keys + ', ' + key;
      vals = vals + ', "' + keyVal[key] + '"';
    }
    insQryArr[cnt] = 'INSERT INTO code' + keys + ')' + vals + ')';
    keys = '(prgName';
    vals = 'VALUES(\'' + fName + '\'';
    cnt++;
  });

  insQryArr.forEach(function(query) {
    MYSQLExQry(
        conVar, query, 'Error: Row not inserted !',
        'Row inserted successfully !');
  });
  return true;
}


function MYSQLDisconnect(conVar) {
  conVar.end(function(err) {
    if (err) throw err;
  });
  return ('MySQL Disconnected!');
}


module.exports = {
  MYSQLConnect,
  MYSQLCreate,
  MYSQLInsert,
  MYSQLDisconnect
};