const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const usersRouter = require('./routes/Users');
const categoriesRouter = require('./routes/Categories');
const productsRouter = require('./routes/Products');
// const authenticateToken = require('./routes/authenticateToken');

const app = express();
app.use(cors())

mongoose.connect('mongodb://localhost:27017/Shop_Tree', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('connected to mongodb'))
  .catch(err => console.log(err));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/Users', usersRouter);
app.use('/Categories', categoriesRouter);
app.use('/Products', productsRouter);
// app.use('/authenticateToken', authenticateToken);
app.use(express.static('public'))

app.use(function(req, res, next) {
    res.status(404).send('Sorry, we cannot find that!');
});
app.listen(3000, () => {
    console.log('listening on port 3000');
});

module.exports = app;
