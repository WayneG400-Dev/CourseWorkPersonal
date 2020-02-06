var db = require('/QOpenSys/QIBM/ProdData/OPS/Node6/os400/db2i/lib/db2a');

var sql = "SELECT * FROM EXT1_ALL.ENTITIES";

var dbconn = new db.dbconn();  // Create a connection object.

dbconn.conn("*LOCAL");  // Connect to a database.

var stmt = new db.dbstmt(dbconn);  // Create a statement object of the connection.

stmt.exec(sql, function(result) {

         console.log("Result: %s", JSON.stringify(result));

         var fieldNum = stmt.numFields();

         console.log("There are %d fields in each row.", fieldNum);

         console.log("Name | Length | Type | Precise | Scale | Null");

         for(var i = 0; i < fieldNum; i++)

               console.log("%s | %d | %d | %d | %d | %d", stmt.fieldName(i), stmt.fieldWidth(i), stmt.fieldType(i), stmt.fieldPrecise(i), stmt.fieldScale(i), stmt.fieldNullable(i));

 

         stmt.close();  // Clean up the statement object.

         dbconn.disconn();  // Disconnect from the database.

         dbconn.close();  // Clean up the connection object.

});
