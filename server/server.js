const app = require('./app');
const db = require('./db');

const PORT = 3001;

db.connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Unicart backend listening on localhost:${PORT}`);
  });
});
