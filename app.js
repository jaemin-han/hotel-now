
require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const homeRoute = require('./routes/home');
const hotelsRoute = require('./routes/hotels');

const app = express();
const PORT = process.argv[2] || process.env.PORT || 3000;

// sets logging so that we can see what's happening
// and sets static assets path - my styling
app.use(logger('dev'));
app.use(express.static('./public'));

// sets default templating engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// middleware to receive form inputs
app.use(bodyParser.urlencoded({ extended: true }));

// middleware for method override
app.use(methodOverride('_method'));

// creating index file
app.use('/', homeRoute);
app.use('/hotels', hotelsRoute);


app.listen(PORT, () => console.warn('Server started on port ', PORT));
