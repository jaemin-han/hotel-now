const router = require('express').Router();
const { findHotel } = require('../services/hotels');
const { saveFavoriteHotels } = require('../models/favoritesDB');
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

router.post('/favorites', saveFavoriteHotels, (req, res) => {
  res.redirect('./favorites');
});


module.exports = router;

