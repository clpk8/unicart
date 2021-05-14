# unicart

unicart for 17-356

[![codecov](https://codecov.io/gh/clpk8/unicart/branch/main/graph/badge.svg?token=MTK62NK1U8)](https://codecov.io/gh/clpk8/unicart)

[![CI](https://github.com/clpk8/unicart/actions/workflows/main.yml/badge.svg)](https://github.com/clpk8/unicart/actions/workflows/main.yml)

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

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
