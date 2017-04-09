const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const routes = require('./main/routes.js');
const passConfig = require('./models/passconfig.js');
const config = require('./config/config.js');

var port = process.env.PORT || 8080;
var app = express();
mongoose.connect(config.db.url);
passConfig(passport);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/views"));
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(flash());

app.use(session({
  secret: 'IDONTFUCKWITHUUUUUUU',
  cookie: { maxAge: 2628000000 },
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

routes(app);

app.listen(port);
console.log('Listening on port %d', port);
