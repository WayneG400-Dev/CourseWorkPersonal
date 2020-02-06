// var db = require('/QOpenSys/QIBM/ProdData/Node6/os400/db2i/lib/db2');
var db = require('/QOpenSys/QIBM/ProdData/OPS/Node6/os400/db2i/lib/db2a');
try {

  db.debug(true); // Enable Debug Mode if needed.

  db.init(function () { // Initialize the environment for database connections.

    db.serverMode(true); // Enable Server Mode if needed

  });

  db.conn("*LOCAL", "SPHNODE","SPHNODE", function () { // Connect to a database

    db.autoCommit(true); // Enable the Auto Commit feature if needed.

  });

  db.exec("CREATE TABLE TEST.NAMEID(ID INTEGER, NAME VARCHAR(50), SALARY DECIMAL(8, 2))"); // Create a new table in the dat    abase.

  db.exec("INSERT INTO TEST.NAMEID VALUES(0, 'David', 999.99)"); // Insert a new record in the table.

  console.log("There are %d rows affected.", db.numRows()); // Get the execution result.

  db.exec("SELECT * FROM TEST.NAMEID", // Query the data in the new table.

    function (jsonObj) { // Print the output in a readble way.

      console.log("Result: %s", JSON.stringify(jsonObj));

      var fieldNum = db.numFields();

      console.log("There are %d fields in each row.", fieldNum);

      console.log("Name | Length | Type | Precise | Scale | Null"); // Print all the fields information.

      for (var i = 0; i < fieldNum; i++)

        console.log(" %s | %d | %d | %d | %d | %d", db.fieldName(i), db.fieldWidth(i), db.fieldType(i), db.fieldPrecise(i),    db.fieldScale(i), db.fieldNullable(i));

    }

  );

  db.exec("DROP TABLE TEST.NAMEID"); // Delete the example table from the database.

  db.close(); // Release any used resource.

} catch(e) { // Exception handler

  console.log(e);

}
