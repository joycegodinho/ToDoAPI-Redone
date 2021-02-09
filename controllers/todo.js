const models = require('../models')

exports.allTodos = (req, res) => {
    let allTodos = models.Todo.find({}, (err, result) => {
        if (err){
            res.status(500).send(err);
        }
        res.status(200).json(result);
    });
};

exports.singleTodo = (req, res) => {
    let singleTodo = models.Todo.findById(req.params.id, (err, result) => {
        if (err){
            res.status(500).send(err);
        }
        res.status(200).json(result);
    });
};

exports.deleteTodo = (req, res) => {
    let deleteTodo = models.Todo.findByIdAndDelete(req.params.id, (err, result) => {
    if (err){
        res.status(404).send(err);
    }
    res.status(200).json({ message: 'Deleted'});
    });
};

exports.updatedTodo = (req, res) => {
    let updatedTodo = models.Todo.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, result) => {
    if (err){
        res.status(500).send(err);
    }
    res.status(200).json(result);
    });
};

exports.newTodo = (req, res) => {
    let newTodo = new models.Todo (req.body)
    newTodo.save((err, result) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(201).json(result);
    });
};