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
  sellerId: 1,
};
describe('Test', () => {
  mocha.before((done) => {
    db.connect()
      .then(() => done())
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

  it('OK, created a product and getting all products', (done) => {
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

  it('OK, created a product and find the product by id', (done) => {
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

  it('OK, created a product and get the product by userId', (done) => {
    request(app)
      .post('/api/products/create')
      .send(testProduct)
      .then((res) => {
        const { sellerId } = res.body;
        request(app)
          .get(`/api/products/fetch/${sellerId}`)
          .then((productResponse) => {
            expect(productResponse.statusCode === 200);
            done();
          });
      })
      .catch((err) => done(err));
  });

  it('OK, create a product and the product is stored in selling', (done) => {
    request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'test first name',
        lastName: 'test last name',
        email: '1234@andrew.cmu.edu',
        password: 'hellohello',
        school: 'Carnegie Mellon University',
      })
      .then((response) => {
        const { user } = response.body;

        request(app)
          .post('/api/products/create')
          .send({
            price: 15,
            title: 'test book for sale',
            description: 'this is a test',
            sellerId: user,
          })
          .then((res) => {
            const id = res.body._id;
            request(app)
              .get(`/api/products/${id}`)
              .then((productResult) => {
                expect(productResult.body === testProduct);
                request(app)
                  .get(`/api/users/${user}`)
                  .then((userResponse) => {
                    const { body } = userResponse;
                    expect(body.selling.length).to.equal(1);
                    done();
                  });
              });
          });
      })
      .catch((err) => done(err));
  });

  it('OK, create a product and then edit the product', (done) => {
    request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'test first name',
        lastName: 'test last name',
        email: '1234@andrew.cmu.edu',
        password: 'hellohello',
        school: 'Carnegie Mellon University',
      })
      .then((response) => {
        const { user } = response.body;

        request(app)
          .post('/api/products/create')
          .send({
            title: 'test book for sale',
            price: 15,
            description: 'this is a test',
            sellerId: user,
          })
          .then((res) => {
            const id = res.body._id;
            request(app)
              .post('/api/products/editListing')
              .set('_id', id)
              .send({
                title: 'new title for test book',
                price: 15,
                description: 'this is a new test description',
                sellerId: user,
              })
              .then((productResult) => {
                expect(productResult.statusCode).to.equal(200);
                expect(productResult.body.title).to.equal(
                  'new title for test book',
                );
                expect(productResult.body.description).to.equal(
                  'this is a new test description',
                );
                done();
              });
          });
      })
      .catch((err) => done(err));
  });
});
