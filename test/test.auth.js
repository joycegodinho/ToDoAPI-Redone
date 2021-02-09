const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const mongoose = require('mongoose');

const server = require('../server');
//const Todo = require('../models/todo');
//const User = require('../models/user');

const models = require('../models')

chai.use(chaiHttp);

describe('Todo API', function() {
    it('should logup, login, check token and delete a todo on /todo/<id> DELETE', function(done) {
        chai.request(server)
            .post('/auth/signup')
            .send({ 
                'email': 'ana7email',
                'username': 'ana7',
                'password': 'test'
            })
            .end(function(err,res){
                res.should.have.status(201);
              
                chai.request(server)
                .post('/auth/signin')
                .send({ 
                    'email': 'ana7email',
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
                })

            })


    })
})