var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const logger = require('morgan');



var app = express();
require('./database');
require('./passport/local-auth');


var tasksRouter = require('./routes/tasks');
var usersRouter = require('./routes/users');
var subjectsRouter = require('./routes/subjects');
var verProfesoresRouter = require('./routes/verProfesores');
var verAlumnosRouter = require('./routes/verAlumnos');
var verAsignaturasRouter = require('./routes/verAsignaturas');



// view engine setup
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'mysecretsession',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  app.locals.signinMessage = req.flash('signinMessage');
  app.locals.signupMessage = req.flash('signupMessage');
  app.locals.user = req.user;
  next();
});

//routes
app.use('/', usersRouter);
app.use('/', tasksRouter);
app.use('/', subjectsRouter);
app.use('/', verProfesoresRouter);
app.use('/', verAlumnosRouter);
app.use('/', verAsignaturasRouter);



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
