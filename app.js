// express setup
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const indexRouter = require('./routes/index.js');

// routes setup
// indexRouter called in the index routes
const authRouter = require('./routes/auth.js');
const usersRouter = require('./routes/users.js');
const homeRoute = require('./routes/home');
const hotelsRoute = require('./routes/hotels');
const favoritesRoute = require('./routes/favorites');

const app = express();
const SECRET = 'hotel3000';

// sets default templating engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// log requests to STDOUT
app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// middleware for method override
app.use(methodOverride('_method'));

// This is how we read the cookies sent over from the browser
app.use(cookieParser());

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: SECRET,
}));

// Set static file root folder
// sets logging so that we can see what's happening
// and sets static assets path - my styling
app.use(express.static(path.join(__dirname, 'public')));

// creating index file
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/main', homeRoute);
app.use('/hotels', hotelsRoute);
app.use('/favorites', favoritesRoute);

// Listen on port for connections
// process.env.PORT is needed for when we deploy to Heroku

// const PORT = process.argv[2] || process.env.PORT || 3000;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Airport hotels at ${PORT}`);
});
