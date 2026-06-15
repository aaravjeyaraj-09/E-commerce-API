require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Importing routes
var indexRouter = require('./routes/index');
const initRoutes = require('./routes/initRoute');
const authRoutes = require('./routes/authRoute');
const productRoutes = require('./routes/productRoute');
const brandRoutes = require('./routes/brandRoute');
const categoryRoutes = require('./routes/categoryRoute');
const cartRoutes = require('./routes/cartRoute');
const orderRoutes = require('./routes/orderRoute');
const searchRoutes = require('./routes/searchRoute');
const membershipRoutes = require('./routes/membershipRoute');

// importing middleware
const errorHandler = require('./middleware/error.middleware');

// Database connection
const sequelize = require('./config/config');
const db = require('./models');

var app = express();

if (process.env.NODE_ENV !== "test") {
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
}
const jsend = require('jsend');
  
// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(jsend.middleware);

// Route setup
app.use('/', indexRouter);
app.use('/init', initRoutes);
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/brands', brandRoutes);
app.use('/categories', categoryRoutes);
app.use('/carts', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/search', searchRoutes);
app.use('/memberships', membershipRoutes);

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