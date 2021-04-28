/* eslint-disable consistent-return */
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoose = require('mongoose');

const DB_URI = process.env.DB_CONNECTION || 'mongodb://localhost:27017/unicart';

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
    })
    .catch((err) => {
      console.log(err);
    });
}

function close() {
  return mongoose.disconnect();
}

module.exports = { connect, close };
