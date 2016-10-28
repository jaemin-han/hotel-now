// express setup
const express = require('express');
const logger = require('morgan');
const dotenv = require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// routes setup
const homeRoute = require('./routes/home');
const hotelsRoute = require('./routes/hotels');
const favoritesRoute = require('./routes/favorites');

const app = express();
const PORT = process.argv[2] || process.env.PORT || 3000;

// sets default templating engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// sets logging so that we can see what's happening
// and sets static assets path - my styling
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// middleware to receive form inputs
app.use(bodyParser.urlencoded({ extended: true }));

// middleware for method override
app.use(methodOverride('_method'));

// creating index file
app.use('/', homeRoute);
app.use('/hotels', hotelsRoute);
app.use('/favorites', favoritesRoute);


app.listen(PORT, () => console.warn('Server started on port ', PORT));
