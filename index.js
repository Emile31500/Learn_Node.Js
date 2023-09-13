const express = require('express');
require('dotenv').config();
Task = require('./Model/Task.js');
// User = require('./Model/User.js');

const port = 3000;
const app = express();
const mysql = require('mysql2');
const sequelize = require('./db.js');


//app.use(express.json());
app.use(express.static('public'));

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

    const requestBody = req.body;
    
    const newTask = Task.create ({
        title: requestBody.title,
        content: requestBody.content,
        created_at: requestBody.created_at,
        is_done: requestBody.is_done

    }).catch(error => {

        console.log(error);
        res.statusCode = 501
        res.json({'status' : 501});
    })

    res.statusCode = 201
    res.json(newTask);
});
