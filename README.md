```js
import createPrimql from 'primql';

const primql = createPrimql(mysqlConfig);

(async () => {
  const allUsers = await primql().users.select();
  
  await primql().users.add({ name: 'Kseniya', id: 1 });
  
  const user = await primql().users.select({ id: 1}, true);
  
  await primql().users.join.roles.on('role_id', '=', 'id').select();
 
})()
```