require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerDocs = require('./swaggers');

// Importing routes
var indexRouter = require('./Routes/index');
const initRoutes = require('./Routes/initRoute');
const authRoutes = require('./Routes/authRoute');
const productRoutes = require('./Routes/productRoute');
const brandRoutes = require('./Routes/brandRoute');
const categoryRoutes = require('./Routes/categoryRoute');
const cartRoutes = require('./Routes/cartRoute');
const orderRoutes = require('./Routes/orderRoute');
const searchRoutes = require('./Routes/searchRoute');
const membershipRoutes = require('./Routes/membershipRoute');

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

swaggerDocs(app);

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