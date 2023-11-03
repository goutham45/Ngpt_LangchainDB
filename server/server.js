const express = require('express');
const mysql = require('mysql');
const cors = require('cors')
const bodyParser = require('body-parser');
const { Configuration, OpenAI } = require("openai");
const app = express();
const port = 3000; // Choose a suitable port

const openai = new OpenAI({
  apiKey: ""


});

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

//post request to Hit the OpenAI API
app.post("/chat", async (req, res) => {
  const { message } = req.body;
  console.log(message)
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: "You are a MySQL expert. Given an input question, create a syntactically correct MySQL query to run, make any reasonable assumptions, also mention if the output is an SQL or not\\n\\nUse the following format:\\n\\nQuestion: \\\"Get me all actors\\\"\\n```sql select * from actors```\\nSTOP\\nQuestion: \\\"How are you\\\"\\nGeneral: I am fine\\nSTOP\\n\\n\\nOnly use the following tables:\\nCREATE TABLE Properties (\\n    PropertyID INT NOT NULL PRIMARY KEY,\\n    Address VARCHAR(255),\\n    City VARCHAR(255),\\n    State VARCHAR(2),\\n    Zipcode VARCHAR(10),\\n    Bedrooms INT,\\n    Bathrooms INT,\\n    SquareFeet INT\\n);\\n\\nCREATE TABLE PropertySales (\\n    SaleID INT NOT NULL PRIMARY KEY,\\n    PropertyID INT,\\n    SaleDate DATE,\\n    SalePrice DECIMAL(10,2)\\n);\\n\\nCREATE TABLE Submarkets (\\n    SubmarketID INT NOT NULL PRIMARY KEY,\\n    SubmarketName VARCHAR(255),\\n    PropertyID INT\\n);\\n\"" }, 
                { role: "user", content: message }, 
                { role: "assistant", content: "" } ],
  });
  console.log(chatCompletion.choices[0].message);

  const reply =chatCompletion.choices[0].message.content;
  console.log("This is reply from chat GPT:",reply)
  // res.json({ reply });
  
  
  const regex = /```sql([\s\S]*)```/;
  const match = regex.exec(reply);
  if (match) {
    console.log("THis is match:",reply)
    const sqlCode = match[1].trim();
    console.log("here it isss",sqlCode)
        // displays the result in HTML tags of table
          getSql(sqlCode, (error, results) => {
            if (error) {
              console.error('Error executing query: ' + error);
              res.status(500).json({ error: 'Failed to connect to the database' });
            } else {
              // const firstThreeItems = results.slice(0, 3); // Extract the first three items

              if (results.length > 0) {
                const columns = Object.keys(results[0]); // Extract the keys of the first item (up to 3 keys)

                // Create an HTML table with dynamic headers and data for the first 3 columns
                let tableHTML = '<table><thead><tr>';
                columns.forEach(column => {
                  tableHTML += `<th>${column}</th>`;
                });
                tableHTML += '</tr></thead><tbody>';

                results.forEach(item => {
                  tableHTML += '<tr>';
                  columns.forEach(column => {
                    tableHTML += `<td>${item[column]}</td>`;
                  });
                  tableHTML += '</tr>';
                });

                tableHTML += '</tbody></table>';
                res.json({ reply: tableHTML });
                // res.json(reply : tableHTML);
              } else {
                res.json({ reply: 'No data available' });
              }
            }
          });
        } else {
          console.log("No SQL Statements:", typeof reply);
          res.json({ reply });
        }

 // diplay the data reults in json format
  //   getSql(sqlCode, (error, results) => {
  //     if (error) {
  //       console.error('Error executing query: ' + error);
  //       res.status(500).json({ error: 'Failed to connect to the database' });
  //     } else {
        
  //       const jsonString = JSON.stringify(results);
  //       res.json({ reply: jsonString });
  //       console.log("Output from the function is:",results)
  //       // console.log("Output from the function is:",typeof jsonString);
  //       // res.json(jsonString)
  //     }
  //   });
  // } else {
  //   console.log("No SQL Statements:",typeof reply);
  //   res.json({ reply });

  // }

function getSql(reply, callback) {
  // Use regular expression to find SQL statements enclosed in backticks
  const query = reply;
  console.log("The SQL executable query is:", query);
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query: ' + error);
      callback(error, null);
    } else {
      // Pass the results to the callback
      callback(null, results);
    }
  });
}

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
