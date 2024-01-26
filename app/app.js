// import expressjs
const express = require("express");
// import routes
const appRoutes = require('./routes');
const { notFoundHandler, globalErrorHandler } = require("./errors");
const middleware = require('./middleware');
const connectDB = require("../db/connectDb");

// creates express application
const app = express();

// db connection
connectDB()

//routes
app.use(middleware)
app.use(appRoutes)
app.use(notFoundHandler)
app.use(globalErrorHandler)

// Exports app
module.exports = app;