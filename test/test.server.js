/*
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const mongoose = require('mongoose');

const server = require('../server');
const Todo = require('../models/todo');

chai.use(chaiHttp);

describe('Todo API', function() {

    beforeEach(function (done){
        var newTodo = new Todo ({
            content: 'acabar esse app',
            title: 'BDD'
        });
        newTodo.save(function(err){
            if (err) done(err);
            else done();
        });
    });

    afterEach(function(done) {
        Todo.collection.drop()
        .then(function(){})
        .catch(function(){ console.warn('Colection may not exists')})
        done()
    });

    it('shold list All Todos on /todos GET', function(done){
        chai.request(server)
            .get('/todos')
            .end(function(err,res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('content');
                res.body[0].should.have.property('title');
                res.body[0].should.have.property('_id');
                done();
            });
    });

    it('shold return a single todo on /todos/<id> GET', function(done){
        chai.request(server)
            .get('/todos')
            .end(function(err,res){
                chai.request(server)
                    .get('/todos/' + res.body[0]._id)
                    .end(function(err,res){
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('content');
                        res.body.should.have.property('title');
                        res.body.should.have.property('_id');
                        done();
                    });
            });
    });

    it('shold add a Todo on /todos POST', function(done){
        chai.request(server)
            .post('/todos')
            .send({
                'content': 'teste',
                'title': 'teste title'
            })
            .end(function(err,res){
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('content');
                res.body.should.have.property('title');
                res.body.should.have.property('_id');
                res.body.content.should.equal('teste');
                res.body.title.should.equal('teste title')
                done();
            });
    });

    it('shold update a todo on /todos/<id> PUT', function(done){
        chai.request(server)
            .get('/todos')
            .end(function(err,res){
                chai.request(server)
                    .put('/todos/' + res.body[0]._id)
                    .send({
                        'content': 'teste 2',
                        'title': 'teste title 2'
                    })
                    .end(function(err,res){
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('content');
                        res.body.should.have.property('title');
                        res.body.should.have.property('_id');
                        res.body.content.should.equal('teste 2');
                        res.body.title.should.equal('teste title 2')
                        done();
                    });
            });
    });

    it('shold delete a todo on /todos/<id> DELETE', function(done){
        chai.request(server)
            .get('/todos')
            .end(function(err,res){
                chai.request(server)
                    .delete('/todos/' + res.body[0]._id)
                    .end(function(err,res){
                        res.should.have.status(200);
                        res.body.should.have.property('message');
                        res.body.message.should.equal('Deleted');
                        done();
                    });
            });
    });


})

*/

