const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const todoController = require('./controllers/todo');
const authController = require('./controllers/auth');
require('./config/db');
const models = require('./models')

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




app.get('/todos', todoController.allTodos);
app.get('/todos/:id', todoController.singleTodo);
app.delete('/todos/:id', authController.authRequired, todoController.deleteTodo);
app.put('/todos/:id',  authController.authRequired, todoController.updatedTodo);
app.post('/todos', authController.authRequired, todoController.newTodo);

app.post('/auth/signup', authController.signUp);
app.post('/auth/signin', authController.signIn);



app.listen(port, () => console.log (`Server running at http://localhost:${port}`))