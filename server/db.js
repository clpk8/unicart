/* eslint-disable consistent-return */
const mongoose = require('mongoose');
const { Mockgoose } = require('mockgoose');

const DB_URI = process.env.DB_CONNECTION || 'mongodb://localhost:27017/unicart';

function connect() {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'test') {
      const mockgoose = new Mockgoose(mongoose);
      mockgoose.prepareStorage().then(() => {
        mongoose
          .connect(DB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
          .then((res, err) => {
            if (err) return reject(err);
            resolve();
          });
      });
    } else {
      mongoose
        .connect(DB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
        .then((res, err) => {
          if (err) return reject(err);
          resolve();
        });
    }
  });
}

function close() {
  return mongoose.disconnect();
}

module.exports = { connect, close };
