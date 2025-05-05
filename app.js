const express = require('express');
const exphbs = require('express-handlebars');
require('dotenv').config();
const db = require('./db');
const PORT = process.env.PORT || 3000;
const app = express();
app.engine('hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.json());

app.get('/users', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM users');
  res.render('users', { users: rows })
});

app.post('/users', async (req, res) => {
  const { name } = req.body;
  await db.query('INSERT INTO users (name) VALUES (?)', [name]);
  res.status(201).send('User added');
});

app.post('/users/:id/delete', async (req, res) => {
  const userId = req.params.id;

  try {
    await db.query('DELETE FROM users WHERE id = ?', [userId]);
    res.redirect('/users'); // ou res.send('User deleted') selon ton cas
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors de la suppression de l\'utilisateur');
  }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

