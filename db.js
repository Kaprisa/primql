const MySQLProvider = require('mysql');
const util = require('util');

export default (config) => {
  const pool = MySQLProvider.createPool(config);

  pool.query = util.promisify(pool.query);
  pool.queryRow = async (q, p) => (await pool.query(q, p))[0];
  pool.format = (query, args) => MySQLProvider.format(query, args);
  pool.selectFormat = (query, args) => pool.format(query, args).replace(/=\s+NULL/ig, 'IS NULL').replace(/,/g, 'AND ');

  pool.query('SET NAMES utf8mb4');
}