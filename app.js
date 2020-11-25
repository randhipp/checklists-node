var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressAccessToken = require('express-access-token');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const accessTokens = [
  "6d7f3f6e-269c-4e1b-abf8-9a0add479511",
  "110546ae-627f-48d4-9cf8-fd8850e0ac7f",
  "04b90260-3cb3-4553-a1c1-ecca1f83a381"
];

const firewall = (req, res, next) => {
  const authorized = accessTokens.includes(req.accessToken);
  if(!authorized) return res.status(401).json({
    message: 'Unauthenticated',
  });
  next();
};

app.use('/', indexRouter);

app.use('/api/v1', 
  expressAccessToken,
  firewall, apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
  return res.json({
    code: 404,
    error: 'Not Found'
  })
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
