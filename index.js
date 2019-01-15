import createPool from './db';

const actions = {
  add: 'INSERT INTO ?? SET ?',
  select: 'SELECT FROM ?? WHERE ?',
  update: 'UPDATE ?? SET ?',
  delete: 'DELETE FROM ?? WHERE ?',
};

const JOIN = ' a JOIN ?? b ON a.? = b.?';

module.exports = (config) => {
  const mysql = createPool(config);

  return () => {

    const db = {

      queryString: '',
      table: '??',

      async query(params = 1, row = false) {
        let q = mysql.format(db.queryString, [params])
        if (q.indexOf('WHERE') !== -1) {
          q = q.replace(/=\s+NULL/ig, 'IS NULL').replace(/,/g, 'AND ');
        }
        return mysql[`query${row ? 'Row' : ''}`](q);
      },

      on(firstField, condition, secondField) {
        db.table = db.table
          .replace('a.?', `a.${firstField}`)
          .replace('=', condition)
          .replace('b.?', `b.${secondField}`);
        return primql;
      },

    };

    const primql = new Proxy(db, {

      get(target, prop) {
        if (actions[prop]) {
          db.queryString += target[prop];
          return target.query;
        } else if (prop === 'join') {
          target.table += JOIN;
        } else if (prop === 'on') {
          return target.on;
        } else {
          db.table = target.table.replace('??', prop);
        }
        return primql;
      },
    });

    return primql;
  }

};