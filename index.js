const express = require('express');
const node_datetime = require('node-datetime');

require('dotenv').config();
Task = require('./Model/Task.js');
// User = require('./Model/User.js');

const port = 3000;
const app = express();
const mysql = require('mysql2');
const sequelize = require('./db.js');


//app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

app.listen(port, () => {

    console.log(`Server is listening on port ${port}`);

});

// Define a GET route
app.get('/api/task', (req, res) => {

    let results;
    
    results = sequelize.query('SELECT * FROM `task` WHERE 1', {
        model : Task,
        mapToModel : true,
        raw: false 

    }).then((results) => {

        res.setHeader('Content-Type', 'application/json');
        res.json(results); // Assuming results is an array of rows

    }).catch((error) => {

        res.statusCode = 500;
        res.json({"status": 500});

    });
});

app.post('/api/task', (req, res) => {

    // const requestBody = req.body;

    var dateInteger = node_datetime.create();
    var createdAt = dateInteger.format('m/d/Y H:M:S');

    console.log(req);

    const newTask = Task.create ({
        title: req.body.title,
        content: req.body.content,
        created_at: createdAt,
        is_done: false

    }).catch(error => {

        console.log(error);
        res.statusCode = 501
        res.json({'status' : 501});
    })

    res.statusCode = 201
    res.json(newTask);
});
