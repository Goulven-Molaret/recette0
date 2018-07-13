var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');



mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/receipe')
  //.then(() => console.log('connection succesful to mongodb://localhost/receipe'))
  //.catch((err) => console.error(err));

// [SH] Require passport
var passport = require('passport');

// [SH] Bring in the data model
require('./api/models/db');
// [SH] Bring in the Passport config after the model is defined
require('./api/config/passport');


var indexRouter = require('./routes/index');
var products = require('./routes/products');
var receipe = require('./routes/receipe');
var routesAPI = require('./api/routes/index');
var test = require('./routes/test');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}));

// [SH] Initialise Passport before using the route middleware
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/api', routesAPI);
app.use('/products', products);
app.use('/receipe', receipe);
app.use('/test', test);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// error handler

// [SH] Catch unauthorised errors
app.use(function(err, req, res, next){
  if(err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": "+ err.message});
  }
});


app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
