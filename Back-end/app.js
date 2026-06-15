require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Importing routes
var indexRouter = require('./routes/index');
const initRoutes = require('./routes/initRoute');

// Database connection
const sequelize = require('./config/config');
const db = require('./models');

var app = express();

sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  db.sequelize.sync()
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch(err => {
    console.error('Database synchronization failed:', err);
  });
  
// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Route setup
app.use('/', indexRouter);
app.use('/init', initRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use((err, req, res, next) => {

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });

});

module.exports = app;