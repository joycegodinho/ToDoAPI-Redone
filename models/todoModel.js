const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema ({ 
    content: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true   
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

const todoModel = mongoose.model('todoModel', todoSchema);

module.exports = todoModel;