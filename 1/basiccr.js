var db = require('/QOpenSys/QIBM/ProdData/OPS/Node6/os400/db2i/lib/db2a');

var sqlFixedSrc = "CREATE ALIAS SPHTMP.TEMPSRC FOR SPHSRC.QRPGLESRC(ENTITIES)"
var sqlEndSrc = "drop ALIAS SPHTMP.TEMPSRC"

const setData = (wlib, wfile, wmbr) => {
    var dbconn = new db.dbconn(); // Create a connection object.

    dbconn.conn("*LOCAL"); // Connect to a database.
    if (wlib !== undefined) {
      sqlFixedSrc = `CREATE ALIAS SPHTMP.TEMPSRC FOR ${wlib}.${wfile}(${wmbr})`
    }
    var stmt = new db.dbstmt(dbconn); // Create a statement object of the connection.
    stmt.exec(sqlEndSrc, function (EndResult) {
      console.log("EndResult: %s", JSON.stringify(EndResult));
      stmt.close(); // Clean up the statement object.

      dbconn.disconn(); // Disconnect from the database.

      dbconn.close(); // Clean up the connection object.
    });
    var dbconn = new db.dbconn(); // Create a connection object.

    dbconn.conn("*LOCAL"); // Connect to a database.

    var stmt = new db.dbstmt(dbconn);
    stmt.exec(sqlFixedSrc, function (FixedResult) {
      console.log("FixedResult: %s", JSON.stringify(FixedResult));
      stmt.close(); // Clean up the statement object.

      dbconn.disconn(); // Disconnect from the database.

      dbconn.close(); // Clean up the connection object.
    });
    module.exports.setData = setData;