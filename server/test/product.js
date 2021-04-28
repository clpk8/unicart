process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const request = require('supertest');
const mocha = require('mocha');
const app = require('../app');
const db = require('../db');

describe('GET /products', () => {
  mocha.before((done) => {
    console.log('connecting db');
    db.connect()
      .then(() => done())
      .catch((err) => done(err));
  });

  mocha.after((done) => {
    db.close()
      .then(() => done())
      .catch((err) => done(err));
  });

  it('OK, no products found', (done) => {
    request(app)
      .get('/products')
      .then((res) => {
        const { body } = res;
        expect(body.length).to.equal(0);
        done();
      })
      .catch((err) => done(err));
  });

  it('OK, created a product and getting the product', (done) => {
    request(app)
      .post('/products')
      .send({
        price: 15,
        title: 'test book for sale',
        description: 'this is a test',
      })
      .then(() => {
        request(app)
          .get('/products')
          .then((res) => {
            const { body } = res;
            expect(body.length).to.equal(1);
            done();
          });
      })
      .catch((err) => done(err));
  });
});
