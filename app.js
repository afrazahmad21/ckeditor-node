var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const basicauth = require('basicauth-middleware');

var indexRouter = require('./Modules/index');
var usersRouter = require('./Modules/users');
const mongoose = require('mongoose');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));


app.use(basicauth('ckeditor', 'pakistan123'));

app.use('/', indexRouter);

app.set('basePath', __dirname)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

mongoose.connect('mongodb://localhost:27017/ckEditor', {useNewUrlParser: true}, (err) => {
    if (err) console.log('Error while connecting to Mongo: ', err);
    else console.log('Successfully connected to Mongo');
});
module.exports = app;
