const express = require('express');
require('dotenv').config();
// const Taks = require('./Model/Task.js');
// User = require('./Model/User.js');

const port = 3000;
const app = express();
const mysql = require('mysql2');
const sequelize = require('./db.js');


app.use(express.json());

app.listen(port, () => {

    console.log(`Server is listening on port ${port}`);

});

// Define a GET route
app.get('/api/task', (req, res) => {

    let results;
    
    results = sequelize.query('SELECT * FROM `task` WHERE 1', {

        raw: true 

    }).then((results) => {

        res.setHeader('Content-Type', 'application/json');
        res.json(results[0]); // Assuming results is an array of rows

    }).catch((error) => {

        res.statusCode = 500;
        res.json({"status": 500});

    });
});

app.post('/api/task', (req, res) => {
    
    const connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'nodejs_todo'
      });
    

    const requestBody = req.body;

    console.log(requestBody);

    connection.query("INSERT INTO task(`title`, `content`, `created_at`, `is_done`, `user_id`) VALUES ('" + requestBody.title + "','" + requestBody.content + "','" + requestBody.created_at + "' ," + requestBody.is_done + ", " + requestBody.user_id + ") ", (error, results, fields) => {
    
        if (error) {

            console.error('Error executing query:', error);
            return;

        } else {

            res.setHeader('Content-Type', 'application/json');
            res.json({"status": 201});

        }
    
    });
    
    connection.end();

});
