/* eslint-disable no-underscore-dangle */
process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const request = require('supertest');
const mocha = require('mocha');
const app = require('../app');
const db = require('../db');

const testProduct = {
  price: 15,
  title: 'test book for sale',
  description: 'this is a test',
};
describe('GET /products', () => {
  mocha.before((done) => {
    console.log('connecting db');
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
      .send(testProduct)
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

  it('OK, created a product and the product by id', (done) => {
    request(app)
      .post('/products')
      .send(testProduct)
      .then((res) => {
        const id = res.body._id;
        request(app)
          .get(`/products/${id}`)
          .then((productResult) => {
            expect(productResult.body === testProduct);
            done();
          });
      })
      .catch((err) => done(err));
  });

  it('OK, created a product and delete the product', (done) => {
    request(app)
      .post('/products')
      .send(testProduct)
      .then((res) => {
        const id = res.body._id;
        request(app)
          .delete(`/products/${id}`)
          .then((deleteResponse) => {
            expect(deleteResponse.statusCode === 200);
            done();
          });
      })
      .catch((err) => done(err));
  });
});