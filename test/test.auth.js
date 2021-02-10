const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const mongoose = require('mongoose');

const server = require('../server');
const models = require('../models')

chai.use(chaiHttp);

describe('Todo API', function() {

    beforeEach(function (done){
        var newTodo = new models.Todo ({
            content: 'acabar esse app',
            title: 'BDD'
        });
        newTodo.save(function(err){
            if (err) done(err);
            else done();
        });
    });

    afterEach(function(done) {
        models.Todo.deleteMany({})
        .then(function(){})
        .catch(function(){ console.warn('Colection may not exists')})
        done()
        

    });

    afterEach(function(done) {
        models.User.deleteOne({})
        .then(function(){})
        .catch(function(){ console.warn('Colection may not exists')})
        done()
    })

    it('should logup, login, check token and delete a todo on /todo/<id> DELETE', function(done) {
        chai.request(server)
            .post('/auth/signup')
            .send({ 
                'email': 'agata@email',
                'username': 'agata',
                'password': 'test'
            })
            .end(function(err,res){
                res.should.have.status(201);
              
                chai.request(server)
                .post('/auth/signin')
                .send({ 
                    'email': 'agata@email',
                    'password': 'test'
                })
                .end(function(err,res){
                    res.body.should.have.property('token');
                    var token = res.body.token;

                    chai.request(server)
                    .get('/todos')
                    .end(function(err,res){
                        
                        chai.request(server)
                            .delete('/todos/' + res.body[0]._id)
                            .set('Authorization' , token)
                        
                            .end(function(err,res){
                                res.should.have.status(200);
                                res.body.should.have.property('message');
                                res.body.message.should.equal('Deleted');
                                done();
                            });
                    });                    
                });
            });
    });

    it('should logup, login, check token and update a todo on /todo/<id> UPDATE', function(done) {
        chai.request(server)
            .post('/auth/signup')
            .send({ 
                'email': 'agata@email',
                'username': 'agata',
                'password': 'test'
            })
            .end(function(err,res){
                res.should.have.status(201);
              
                chai.request(server)
                .post('/auth/signin')
                .send({ 
                    'email': 'agata@email',
                    'password': 'test'
                })
                .end(function(err,res){
                    res.body.should.have.property('token');
                    var token = res.body.token;

                    chai.request(server)
                    .get('/todos')
                    .end(function(err,res){
                        
                        chai.request(server)
                            .put('/todos/' + res.body[0]._id)
                            .set('Authorization' , token)
                            .send({
                                'content': 'teste',
                                'title': 'teste title'
                            })
                            .end(function(err,res){
                                res.should.have.status(200);
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
                });
            });
    });

    it('should logup, login, check token and add a todo on /todos POST', function(done) {
        chai.request(server)
            .post('/auth/signup')
            .send({ 
                'email': 'agata@email',
                'username': 'agata',
                'password': 'test'
            })
            .end(function(err,res){
                res.should.have.status(201);
              
                chai.request(server)
                .post('/auth/signin')
                .send({ 
                    'email': 'agata@email',
                    'password': 'test'
                })
                .end(function(err,res){
                    res.body.should.have.property('token');
                    var token = res.body.token;

                    chai.request(server)
                    .get('/todos')
                    .end(function(err,res){
                        
                        chai.request(server)
                            .post('/todos')
                            .set('Authorization' , token)
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
                });
            });
    });

})

