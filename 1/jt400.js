const config = {
  host: '217.113.174.74',
  user: 'SPHNODE',
  password: 'SPHNODE'
}
const pool = require('node-jt400').pool(config)
pool
  .query('SELECT * from EXT1_ALL.ENTITIES')
  .then(result => {
    console.log('result')
    const field1 = result[0].FIELD1
    console.log(field1)
  })
  .fail(error => {
    console.log('error')
    console.log(error)
  })

/*
try {
    const results = await pool.query('SELECT * from EXT1_ALL.ENTITIES');
    console.log('result');
    const field1 = result[0].FIELD1;
    console.log(field1);
}
catch (error) {
    console.log('error');
    console.log(error);
} */