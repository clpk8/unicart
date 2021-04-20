const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

require("dotenv/config");

// import routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");

// connect to database
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB!!");
    console.log(process.env.DB_CONNECTION);
  }
);

const app = express();
const port = 3001;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
console.log(__dirname + "/product_photos");
app.use("/product_photos", express.static(__dirname + "/product_photos"));

app.listen(port, () => {
  console.log(`Unicart backend listening on localhost:${port}`);
});
