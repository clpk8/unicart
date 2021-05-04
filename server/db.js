/* eslint-disable consistent-return */
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoose = require('mongoose');
const Product = require('./models/Product');
const data = require('./models/fakeProducts.json');

const DB_URI = process.env.DB_CONNECTION || 'mongodb://localhost:27017/unicart';

function populateSeedData() {
  Product.countDocuments((err, count) => {
    if (err) console.log('error');
    if (count === 0) {
      data.products.forEach((product) => {
        const productObj = new Product({
          ...product,
          _id: new mongoose.Types.ObjectId(),
        });
        productObj.save().then(() => {
          console.log('product created');
        });
      });
    }
  });
}

async function connect() {
  let mongoURI = DB_URI;
  if (process.env.NODE_ENV === 'test') {
    const mongoServer = new MongoMemoryServer();
    mongoURI = await mongoServer.getUri();
  }

  console.log(`Connecting to mongo at ${mongoURI}`);
  await mongoose
    .connect(mongoURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log('DB connected');
      if (process.env.NODE_ENV !== 'test') populateSeedData();
    })
    .catch((err) => {
      console.log(err);
    });
}

function close() {
  return mongoose.disconnect();
}

module.exports = { connect, close };
