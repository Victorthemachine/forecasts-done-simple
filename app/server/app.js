const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const testRouter = require('./routes/test');
const secureRouter = require('./routes/secure');

const DatabaseManager = require('./lib/databaseManager');
const database = new DatabaseManager();
const eventManager = require('./lib/eventManager');

//Initialize enviromental variables
process.env.PORT = '8000';
//=================================

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, "..", "build")});
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/test', testRouter);
app.use('/secure', secureRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

/**
 * Crediting board:
 * 
 * Serving react pages from express: https://levelup.gitconnected.com/how-to-render-react-app-using-express-server-in-node-js-a428ec4dfe2b
 * 
 */