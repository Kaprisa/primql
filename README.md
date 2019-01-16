```js
import createPrimql from 'primql';

const primql = createPrimql(mysqlConfig);

(async () => {
  const allUsers = await primql().users.select();
  
  const firstSixUsers = await primql().users.where('id', 7, '<').select();
  
  await primql().users.add({ name: 'Kseniya', id: 1 });
  
  const user1 = await primql().users.where('id', 1).select(true);
  
  const user2 = await primql().users.where({ email: 'example@gmail.com', name: 'Example' }).select(true);
  
  const userName = await primql().users.where('id', 1).select(true, 'name');
  
  await primql().users.join.roles.on('role_id', 'id').select();
  
  await primql().users.join.roles.on('role_id', 'id', '>').select();
 
})()
```