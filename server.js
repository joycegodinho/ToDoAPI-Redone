const express = require('express');
const bodyParser = require('body-parser');

require('./config/db');
const Todo = require('./models/todoModel')

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/todos', (req, res) => {
    let allTodos = Todo.find({}, (err, result) => {
        if (err){
            res.status(500).send(err);
        }
        res.status(200).send(result);
    });
});

app.get('/todos/:id', (req, res) => {
    let singleTodo = Todo.findById(req.params.id, (err, result) => {
        if (err){
            res.status(500).send(err);
        }
        res.status(200).send(result);
    });
});

app.delete('/todos/:id', (req, res) => {
    let deleteTodo = Todo.findByIdAndDelete(req.params.id, (err, result) => {
    if (err){
        res.status(404).send(err);
    }
    res.status(200).send({ message: 'Deleted'});
    });
});

app.put('/todos/:id', (req, res) => {
    let newTodo = Todo.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, result) => {
    if (err){
        res.status(500).send(err);
    }
    res.status(200).send(result);
    });
});

app.post('/todos', (req, res) => {
    let newTodo = new Todo (req.body)
    newTodo.save((err, result) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(201).send(result);
    });
});

app.listen(port, () => console.log (`Server running at http://localhost:${port}`))