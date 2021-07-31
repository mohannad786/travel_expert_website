"use strict";

//Import required packages and set routes
var createError = require('http-errors');

var express = require('express');

var path = require('path');

var cookieParser = require('cookie-parser');

var logger = require('morgan');

var assert = require('assert'); //setup routing to webpages


var indexRouter = require('./routes/index');

var usersRouter = require('./routes/users');

var contactRouter = require('./routes/contact');

var galleryRouter = require('./routes/aboutus');

var app = express(); // view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express["static"](path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/contact", contactRouter);
app.use('/login', function (req, res, next) {
  res.render('login');
});
app.use('/user-error', function (req, res, next) {
  res.render('user-error');
});
app.use('/thankyou', function (req, res, next) {
  res.render('thankyou');
});
app.use('/aboutus', function (req, res, next) {
  res.render('aboutus');
}); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
//# sourceMappingURL=app.dev.js.map
