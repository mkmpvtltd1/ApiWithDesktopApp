process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('./server');
var should = chai.should();

chai.use(chaiHttp);

describe('User', function () {
    it('should signup  /signup - POST', function (done) {
        chai.request(server)
            .post('/signup')
            .send({'username': 'superadmin', 'password': 'superadmin'})
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('SUCCESS');
                res.body.SUCCESS.should.be.a('object');
                res.body.SUCCESS.should.have.property('name');
                res.body.SUCCESS.should.have.property('lastName');
                res.body.SUCCESS.should.have.property('_id');
                res.body.SUCCESS.name.should.equal('Java');
                res.body.SUCCESS.lastName.should.equal('Script');
                done();
            });
    });
    it('should login  /login - POST');
});