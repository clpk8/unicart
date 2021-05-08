/* eslint-disable no-underscore-dangle */
process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const request = require('supertest');
const mocha = require('mocha');
const app = require('../app');
const db = require('../db');

const shared = () => {
  mocha.beforeEach((done) => {
    db.connect()
      .then(() => {
        done();
      })
      .catch((err) => done(err));
  });

  mocha.afterEach((done) => {
    db.close()
      .then(() => done())
      .catch((err) => done(err));
  });
};
const testProduct = {
  price: 15,
  title: 'test book for sale',
  description: 'this is a test',
};
describe('User tests', () => {
  shared();
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

describe('Product tests', () => {
  shared();

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

  it('OK, created a product and the product by id', (done) => {
    request(app)
      .post('/api/products/create')
      .send(testProduct)
      .then((res) => {
        const id = res.body._id;
        request(app)
          .get(`/api/products/${id}`)
          .then((productResult) => {
            expect(productResult.body === testProduct);
            done();
          });
      })
      .catch((err) => done(err));
  });

  it('OK, created a product and delete the product', (done) => {
    request(app)
      .post('/api/products/create')
      .send(testProduct)
      .then((res) => {
        const id = res.body._id;
        request(app)
          .delete(`/api/products/${id}`)
          .then((deleteResponse) => {
            expect(deleteResponse.statusCode === 200);
            done();
          });
      })
      .catch((err) => done(err));
  });
});
