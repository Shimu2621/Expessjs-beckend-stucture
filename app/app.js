// import expressjs
const express = require("express");
// import routes
const appRoutes = require('./routes');
const { notFoundHandler, globalErrorHandler } = require("./errors");
const middleware = require('./middleware');
const connectDB = require("../db/connectDb");

// create app and call express application
const app = express();

// db connection
connectDB()

//get all routes and use app.use()method 
app.use(middleware)
app.use(appRoutes)
app.use(notFoundHandler)
app.use(globalErrorHandler)

// Exports app
module.exports = app;