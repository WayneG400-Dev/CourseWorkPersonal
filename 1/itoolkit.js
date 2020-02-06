    var xt = require("itoolkit");
    var conn = new xt.iConn("*LOCAL", "SPHNODE", "SPHNODE");
 
    function cbJson(str) {
      var result = xt.xmlToJson(str);
      console.log(JSON.stringify(result, " ", 2))
    }
 
    conn.add(xt.iCmd("RTVJOBA USRLIBL(?) SYSLIBL(?)"));  /* Test iCmd */
    conn.add(xt.iSh("system -i wrksyssts"));	/* Test iSh */
    var pgm = new xt.iPgm("QWCRSVAL", {"lib":"QSYS"}); /* Test iPgm */
    var outBuf = [
            [0, "10i0"],
            [0, "10i0"],
            ["", "36h"],
            ["", "10A"],
            ["", "1A"],
            ["", "1A"],
            [0, "10i0"],
            [0, "10i0"]
        ];
    pgm.addParam(outBuf, {"io":"out"});
    pgm.addParam(66, "10i0");
    pgm.addParam(1, "10i0");
    pgm.addParam("QCCSID", "10A");
    pgm.addParam(this.errno, {"io":"both", "len" : "rec2"});
    conn.add(pgm);
 
    var sql = new xt.iSql();  /* Test iSql Class */
    sql.prepare("call qsys2.tcpip_info()");
    sql.execute();
    sql.fetch();
    sql.free();
    conn.add(sql);
    conn.run(cbJson);
