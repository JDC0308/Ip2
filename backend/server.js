const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createPool({
  host: 'localhost',
  user: 'root', 
  password: '', 
  database: 'ufc'
});

// CRUD Operations

// Create a new fighter
app.post('/fighters', (req, res) => {
  const { name, weight_class, wins, losses, draws } = req.body;
  const sql = 'INSERT INTO fighters (name, weight_class, wins, losses, draws) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, weight_class, wins, losses, draws], (err, result) => {
      if (err) throw err;
      res.send('Fighter added successfully.');
  });
});

// Read all fighters
app.get('/fighters', (req, res) => {
  const sql = 'SELECT * FROM fighters';
  db.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
  });
});

// Fetch a single fighter by ID
app.get('/fighters/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM fighters WHERE id = ?';
  db.query(sql, [id], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
          res.json(result[0]);
      } else {
          res.status(404).send('Fighter not found');
      }
  });
});


// Update a fighter
app.put('/fighters/:id', (req, res) => {
  const { id } = req.params;
  const { name, weight_class, wins, losses, draws } = req.body;
  const sql = 'UPDATE fighters SET name = ?, weight_class = ?, wins = ?, losses = ?, draws = ? WHERE id = ?';
  db.query(sql, [name, weight_class, wins, losses, draws, id], (err, result) => {
      if (err) throw err;
      res.send('Fighter updated successfully.');
  });
});

// Delete a fighter
app.delete('/fighters/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM fighters WHERE id = ?';
  db.query(sql, [id], (err, result) => {
      if (err) throw err;
      res.send('Fighter deleted successfully.');
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
