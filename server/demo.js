import express from 'express';

const app = express();

let users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Alice' },
];

app.get('/', (req, res) => {
  res.send('this is home page');
});

app.get('/users', (req, res) => {
  if (!users.length) {
    throw new Error('No users found');
  }
  res.json(users);
});

app.post('/users', (req, res) => {
  const { user } = req.body;
  if (!user) {
    return res.json({ success: false, message: 'No user is present' });
  }
  const exist = users.find((u) => u.id === id);
  if (exist)
    return res.json({
      success: false,
      message: 'User with the same name is exist',
    });
  const newUser = { id: users.length + 1, name: user.name };
  users.push(newUser);
  return res.json({ success: true, message: 'User added ', user: newUser });
  res.json(users);
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: 'Id is not present' });
  }
  const exist = users.find((u) => u.name === user.name);
  if (!exist)
    return res.status(400).json({
      success: false,
      message: 'User with the id is not exist',
    });
  users = users.filter((u) => u.id !== id);

  return res
    .status(200)
    .json({ success: true, message: 'User deleted successfully' });
  res.json(users);
});

app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const {name}=req.body
 
  if(!id)return res.status(404).json({success:false,message:`id is missing`})
  if(!name)return res.status(404).json({success:false,"message": "Name is required" })
    const exist=users.find(u=u.id===Number(id))
  if(!exist)return res.status(404).json({success:false,message:'User not found'})
    const updated={...exist,name:name}
users=users.map(user=>user.id.toString()===id?updated:user)
  
});

app.use((err, req, res, next) => {
  res.status(404).json({ success: false, message: err.message });
});

app.listen(7000, () => {
  console.log(` listening`);
});
