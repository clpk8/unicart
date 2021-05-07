process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const request = require('supertest');
const mocha = require('mocha');
const app = require('../app');
const db = require('../db');

describe('GET /user', () => {
  mocha.before((done) => {
    console.log('connecting db');
    db.connect()
      .then(() => {
        done();
      })
      .catch((err) => done(err));
  });

  mocha.after((done) => {
    db.close()
      .then(() => done())
      .catch((err) => done(err));
  });

  it('OK, no users found', (done) => {
    request(app)
      .get('/api/users/fetch')
      .then((res) => {
        const { body } = res;
        expect(body.length).to.equal(0);
        done();
      })
      .catch((err) => done(err));
  });

  it('OK, registered a uer and get the user', (done) => {
    request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'test first name',
        lastName: 'test last name',
        email: '123@andrew.cmu.edu',
        password: 'hellohello',
        school: 'Carnegie Mellon University',
      })
      .then(() => {
        request(app)
          .get('/api/users/fetch')
          .then((res) => {
            const { body } = res;
            expect(body.length).to.equal(1);
            done();
          });
      })
      .catch((err) => done(err));
  });
});
