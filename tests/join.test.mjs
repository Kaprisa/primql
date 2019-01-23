import chai from 'chai';
import { primql, mysql } from './db';

const { expect } = chai;

describe('JOIN test', () => {
  it('JOIN', async () => {
    const primqlUsers = await primql().users.join.user_role.on('id', 'user_id').join.roles.on('role_id', 'id').select();
    const mysqlUsers = await mysql.query('SELECT * FROM users u INNER JOIN user_role ur ON u.id = ur.user_id INNER JOIN roles r ON ur.role_id = r.id');
    expect(primqlUsers).to.deep.equal(mysqlUsers);
  });

  it('JOIN WHERE', async () => {
    const primqlUser = await primql().users.join.user_role.on('id', 'user_id').where({ name: 'root' }).select(true, 'name');
    const mysqlUser = await mysql.queryRow('SELECT name FROM users u JOIN user_role ur ON u.id = ur.user_id WHERE name = ?', ['root']);
    expect(primqlUser).to.deep.equal(mysqlUser);
  });
});