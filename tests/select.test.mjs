import chai from 'chai';
import { primql, mysql } from './db';

const { expect } = chai;

describe('SELECT test', () => {
  it('SELECT', async () => {
    const primqlUsers = await primql().users.select();
    const mysqlUsers = await mysql.query('SELECT * FROM users');
    expect(primqlUsers).to.deep.equal(mysqlUsers);
  });

  it('WHERE', async () => {
    const primqlUser = await primql().users.where({ name: 'root' }).select(true);
    const mysqlUser = await mysql.queryRow('SELECT * FROM users WHERE name = ?', ['root']);
    expect(primqlUser).to.deep.equal(mysqlUser);
  });

  it('WHERE LIKE', async () => {
    const primqlUsers = await primql().users.where('email', '%l@g%', 'LIKE').select();
    const mysqlUsers = await mysql.query('SELECT * FROM users WHERE email LIKE ?', ['%l@g%']);
    expect(primqlUsers).to.deep.equal(mysqlUsers);
  });

  it('ORDER BY', async () => {
    const primqlUsers = await primql().users.sortBy('name', true).select();
    const mysqlUsers = await mysql.query('SELECT * FROM users ORDER BY name DESC');
    expect(primqlUsers).to.deep.equal(mysqlUsers);
  })
});