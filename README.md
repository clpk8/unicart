# unicart

unicart for 17-356

## MongoDB

We could just run mongoDB locally when doing development, and there is a mongoDB created in the docker-compose when deploy the containers. The advantage of doing it this way is faster development, since mongoDB do not really have a "schema", the "schema" could be setup during runtime. The disadvantage is the data will be wiped when we redeploy the app, but it should be fine for a MVP. We could choose to setup a mongoDB instance in Azure at the end.

### Install MongoDB locally

- for windows: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
- for mac via homebrew: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/
- MongoDB Compass, UI for visualizing MongoDB: https://www.mongodb.com/products/compass

Compass is pretty useful to see what collections we have and what data is in each connection

### connect to local MongoDB

- create a .env file under /server, the content of the file will be:
  DB_CONNECTION=mongodb://127.0.0.1:27017/unicart

- this will connect to a mongodb locally at port 27017, where 27017 is the default port of mongoDB
- If you download the compass, you should be able to connect to it without anything extra configuration

### Schema

- we are using a package called Mongoose, here is the link to the page: https://mongoosejs.com/

- we have our schema defined under server/models, when we try to interact with the mongoDB, corresponding schema will be created as a collection

- When we add other schema, we will need to add other files.
