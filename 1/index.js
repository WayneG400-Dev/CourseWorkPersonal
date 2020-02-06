const getData = require('./basicrd');
const multiSrc = require('./basiccr');
var wlib = 'SPHSRC';
var wfile = 'QRPLESRC';
var wmbr = 'PROGRAMS';
multiSrc.setData(wlib, wfile, wmbr)
  .then((res1)) => {
    getData.dbRead()
      .then((res) => {
          console.log('Parsed Data:')
          console.log(JSON.stringify(res, undefined, 2))
        }
      }).catch((errorMessage) => {
    console.error(errorMessage)
  })
}).catch((errorMessage) => {
  console.error(errorMessage)
});