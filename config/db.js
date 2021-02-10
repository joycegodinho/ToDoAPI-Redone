const mongoose = require('mongoose');

var url = 'mongodb://localhost:27017/todo';
//var url = 'mongodb://localhost:27017/todotest';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true

};

const db = mongoose.connect(url, options)
    .then(() => console.log('Connect to Database'))
    .catch(err => console.log('Error connecting to Database: ' + err))

module.exports = db;
