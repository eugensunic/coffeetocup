var chai = require('chai');
var chaiHttp = require('chai-http');
var sinon = require('sinon');
var server = require('../../../app.js');
const passport = require('passport');

chai.use(chaiHttp);
beforeEach(() => {

});

afterEach(() => {});

beforeEach(function (done) {
  server.on('appStarted', function () {
    sinon.stub(passport, 'authenticate').returns((req, res, next) => next());
    done();
  });
});

describe('User registration', () => {

  it('responds with HTTP 204 if form fields are valid', (done) => {
    chai.request(server)
      .post('/login')
      .end(function (error, response, body) {
        console.log('End login in end');
        if (error) {
          done(error);
        } else {
          done();
        }
      });

  });

});