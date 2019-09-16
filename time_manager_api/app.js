var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var employeesRouter = require('./routes/employee');
var rolesRouter = require('./routes/roles');
var clocksRouter = require('./routes/clock');
var workingTimeRouter = require('./routes/workingtime');
var teamsRouter = require('./routes/teams');
var teamsContentRouter = require('./routes/teamcontent');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', employeesRouter);
app.use('/api/roles', rolesRouter);
app.use('/api/clocks', clocksRouter);
app.use('/api/workingtimes', workingTimeRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/teamscontent', teamsContentRouter);

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
