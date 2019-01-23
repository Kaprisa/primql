import chai from 'chai';
import { primql, mysql } from './db';

const { expect } = chai;

describe('UPDATE test', () => {
  it('UPDATE', async () => {
    const userId = 1;
    const newName = 'Updated'
    await primql().users.where({ id: userId }).update({ name: newName });
    expect((await mysql.queryRow('SELECT * FROM users WHERE ?', { id: userId })).name).to.equal(newName);

  });
});