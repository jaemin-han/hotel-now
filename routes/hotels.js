const router = require('express').Router();
const { findHotel } = require('../services/hotels');
const fav = require('../models/favoritesDB');

// const dbService = require('../models/favoritesDB');
// const methodOverride = require('method-override');

// router.use(methodOverride('_method'));


router.get('/', findHotel, (req, res) => {
  // console.log(res.hotels);
  res.render('./hotels', {
    hotels: res.hotels,
    // services
    favorites: res.gotHotels,
    // model - favorites
  });
});

router.post('/favorites', fav.saveFavoriteHotels, (req, res) => {
  res.redirect('./favorites');
});

router.get('/favorites', fav.getFavoriteHotels, (req, res) => {
  // console.log(res.gotHotels);
  res.render('favorites', {
    savedHotels: res.gotHotels,
  });
});

module.exports = router;
