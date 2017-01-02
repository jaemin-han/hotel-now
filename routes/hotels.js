const router = require('express').Router();
const { authenticate } = require('../lib/auth');
const { findHotel } = require('../services/hotels');
const { saveFavoriteHotels, getFavoriteHotels, deleteFavoriteHotels, getEditHotel, editFavoriteHotel } = require('../models/favoritesDB');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));


// Finds all hotels near selected airport
router.get('/', authenticate, findHotel, (req, res) => {
  // console.log(res.hotels);
  res.render('./hotels', {
    hotels: res.hotels,
    // Services
    favorites: res.gotHotels,
    // Model - favorites
  });
});

// Edit hotel title
router.get('/favorites/edit/:id', getEditHotel, (req, res) => {
  res.render('./edit', {
    hotel: res.hotel,
  });
});

// Update hotel title
router.put('/favorites/:id', editFavoriteHotel, (req, res) => {
  res.redirect('./');
});

// Save favorite hotel data to the 3rd page with user id
router.post('/favorites', authenticate, saveFavoriteHotels, (req, res) => {
  res.redirect('./favorites');
});

router.get('/favorites', authenticate, getFavoriteHotels, (req, res) => {
  // console.log(res.gotHotels);
  res.render('favorites', {
    savedHotels: res.gotHotels,
  });
});

// Based on users preference - can delete saved/favorite items and return
router.delete('/favorites/:id', deleteFavoriteHotels, (req, res) => {
  res.redirect('/favorites');
});

module.exports = router;
