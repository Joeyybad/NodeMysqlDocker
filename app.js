 const express = require('express');
const db = require('./db');
const app = express();
app.use(express.json());

app.get('/users', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM users');
  res.json(rows);
});

app.post('/users', async (req, res) => {
  const { name } = req.body;
  await db.query('INSERT INTO users (name) VALUES (?)', [name]);
  res.status(201).send('User added');
});

app.listen(3000, () => console.log(Server running on port 3000));

