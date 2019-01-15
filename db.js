const MySQLProvider = require('mysql');
const util = require('util');

export default (config) => {
  const pool = MySQLProvider.createPool(config);

  pool.query = util.promisify(pool.query);
  pool.queryRow = async (q, p) => (await pool.query(q, p))[0];
  pool.format = (query, args) => MySQLProvider.format(query, args);
}