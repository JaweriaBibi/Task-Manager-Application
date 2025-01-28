const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Get all tasks
app.get('/tasks', (req, res) => {
    const sql = 'SELECT * FROM tasks';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Create a new task
app.post('/tasks', (req, res) => {
    const { title } = req.body;
    const sql = 'INSERT INTO tasks (title) VALUES (?)';
    db.query(sql, [title], (err) => {
        if (err) throw err;
        res.sendStatus(201);
    });
});

// Update a task
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const sql = 'UPDATE tasks SET title = ? WHERE id = ?';
    db.query(sql, [title, id], (err) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM tasks WHERE id = ?';
    db.query(sql, [id], (err) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
