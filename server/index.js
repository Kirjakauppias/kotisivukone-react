const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

// Ladataan ympäristömuuttujat
dotenv.config();

const app = express();
const port = 5005;

// Yhteys tietokantaan
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Tietokantayhteyden virhe:', err);
  } else {
    console.log('Yhteys MySQL-tietokantaan onnistui!');
  }
});

// Endpoint testaukseen
app.get('/', (req, res) => {
  res.send('Node.js-palvelin toimii!');
});

app.listen(port, () => {
  console.log(`Palvelin käynnissä osoitteessa http://localhost:${port}`);
});

app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    });
});