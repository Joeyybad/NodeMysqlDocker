const express = require('express');
const exphbs = require('express-handlebars');
require('dotenv').config();
const db = require('./db');
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));

app.engine('hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.json());

app.get('/users', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM users');
  res.render('users', { users: rows })
});

app.post('/users', async (req, res) => {
  console.log('req.body:', req.body);
  const { name } = req.body;
  if (!name) return res.status(400).send("Le nom est requis");
  await db.query('INSERT INTO users (name) VALUES (?)', [name]);
  res.redirect('/users');
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

module.exports = app;



