const express = require('express');
const mysql = require('mysql');
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Choose a suitable port

app.use(cors());
app.use(bodyParser.json());

//connect to mysql server

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Goutham@4511',
  database: 'properties_info',
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

app.get('/connect-to-database/:token', (req, res) => {
  const selectedDatabase = req.params.token;

  // Implement your logic to connect to the selected database here
  // You can use the 'selectedDatabase' parameter to determine the database to connect to
  // Example: Query the database

  const query = `SELECT * FROM ${selectedDatabase}`;
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query: ' + error);
      res.status(500).json({ error: 'Failed to connect to the database' });
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
