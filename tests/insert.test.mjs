// import chai from 'chai';
// import { primql, mysql } from './db';
//
// const { expect } = chai;
//
// describe('INSERT test', () => {
//   it('INSERT', async () => {
//     const user = {
//       name: 'Kseniya',
//       email: 'kaprisa57@gmail.com',
//       password: '111',
//     };
//     await primql().users.add(user);
//     const mysqlUser = await mysql.queryRow('SELECT * FROM users WHERE ?', [{email: user.email}]);
//     Object.entries(user).forEach(([key, value]) => {
//       expect(mysqlUser[key]).to.equal(value);
//     });
//   });
// });