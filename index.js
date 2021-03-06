const createPool = require('./db');

const actions = {
  add: 'INSERT INTO {table} SET ?',
  update: 'UPDATE {table} SET ?',
  delete: 'DELETE FROM {table}',
};

const operators = {
  where: 'WHERE',
  and: 'AND',
  or: 'OR',
  in: 'IN',
  notIn: 'NOT IN'
};

module.exports = (config) => {
  const mysql = createPool(config);

  return () => {

    const db = {

      queryString: '',
      table: '??',

      async query(params = 1) {
        let q = mysql.format(db.queryString.replace('{table}', db.table), [params]);
        if (q.indexOf('WHERE') !== -1) {
          q = q.replace(/=\s+NULL/ig, 'IS NULL').replace(/,/g, 'AND ');
        }
        return mysql.query(q);
      },

      on(firstField, secondField, op = '=') {
        db.table = db.table
          .replace(`? {op} ${db.lastTable}.?`, `${firstField} ${op} ${db.lastTable}.${secondField}`);
        return primql;
      },

      operator(firstField, secondField, op = '=') {
        db.queryString += secondField
          ? mysql.format(`?? ${op} ?`, [firstField, secondField])
          : mysql.format('?', [firstField]); // typeof firstField === 'object' in this case
        return primql;
      },

      select(row = false, fields = '*') {
        db.queryString = `SELECT ${fields} FROM {table}` + db.queryString;
        return row ? db.query().then(result => result[0]) : db.query();
      },

      sortBy(by, isDesc = false) {
        db.queryString += mysql.format(` ORDER BY ?? ${isDesc ? 'DESC' : 'ASC'}`, [by]);
        return primql;
      },

      limit(lim, offset = 0) {
        db.queryString += mysql.format(` LIMIT ? OFFSET ?`, [lim, offset]);
      }

    };

    const primql = new Proxy(db, {

      get(target, prop) {
        if (target[prop]) {
          return target[prop];
        } else if (operators[prop]) {
          db.queryString += ` ${operators[prop]} `;
          return db.operator;
        } else if (actions[prop]) {
          db.queryString = actions[prop] + db.queryString;
          return target.query;
        } else if (prop === 'join') {
          db.table += ` JOIN ?? ON ${db.lastTable}.? {op} ??.?`;
        } else {
          db.table = db.table.replace(/\?\?/g, prop);
          db.lastTable = prop;
        }
        return primql;
      },

    });

    return primql;
  }

};