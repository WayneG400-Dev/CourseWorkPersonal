var db = require('/QOpenSys/QIBM/ProdData/OPS/Node6/os400/db2i/lib/db2a');
var sqlGetSrc = "select srcseq concat ' ' concat srcdat concat ' ' concat srcdta from SPHTMP.TEMPSRC ";

const dbRead = () => {
  var dbconn = new db.dbconn(); // Create a connection object.

  dbconn.conn("*LOCAL"); // Connect to a database.

  var stmt = new db.dbstmt(dbconn); // Create a statement object of the connection.

  stmt.exec(sqlGetSrc, function (result) {

    console.log("Result:", JSON.stringify(result));

    stmt.close(); // Clean up the statement object.

    dbconn.disconn(); // Disconnect from the database.

    dbconn.close(); // Clean up the connection object.
  });
};
module.exports.dbRead = dbRead;