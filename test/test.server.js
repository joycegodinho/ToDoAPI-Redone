const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const mongoose = require('mongoose');

const server = require('../server');
const models = require('../models');

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
        models.Todo.deleteOne({})
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

})





