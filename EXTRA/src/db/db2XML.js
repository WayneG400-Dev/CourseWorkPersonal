var xt = require('/QOpenSys/QIBM/ProdData/OPS/Node6/os400/xstoolkit/lib/itoolkit')

var DBname = '*LOCAL'
var userId = 'u0019837'
var passwd = 'itdevwg1'
// var ip = '172.29.153.62';
// var port = 5000;

var db2XML = (cl) => {
  return new Promise((resolve, reject) => {
    // Promise usage:
    if (cl && cl.length > 0) {
      console.log('CL statement : ' + cl)
      var conn = new xt.IConn(DBname, userId, passwd)  // xt.iConn(DBname, userId, passwd)
      conn.add(xt.iSh('system -i ' + cl))
      conn.run((rs) => {
        var jrs = xt.xmlToJson(rs)[0].data
        console.log(JSON.stringify(jrs, undefined, 2))
        resolve(jrs)
      })
    } else {
      reject(new Error(`Invalid SQL: ${cl}`))
    }
  })
}

module.exports.db2XML = db2XML
