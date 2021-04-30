process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const request = require('supertest');
const mocha = require('mocha');
const app = require('../app');
const db = require('../db');

describe('GET /products/fetch', () => {
  mocha.before((done) => {
    db.connect().then(() => {
      done();
    });
  });

  mocha.after((done) => {
    db.close()
      .then(() => done())
      .catch((err) => done(err));
  });

  it('OK, no products found', (done) => {
    request(app)
      .get('/api/products/fetch')
      .then((res) => {
        const { body } = res;
        expect(body.length).to.equal(0);
        done();
      })
      .catch((err) => done(err));
  });

  it('OK, created a product and getting the product', (done) => {
    request(app)
      .post('/api/products/create')
      .send({
        price: 15,
        title: 'test book for sale',
        description: 'this is a test',
      })
      .then(() => {
        request(app)
          .get('/api/products/fetch')
          .then((res) => {
            const { body } = res;
            expect(body.length).to.equal(1);
            done();
          });
      })
      .catch((err) => done(err));
  });
});
