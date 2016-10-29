const router = require('express').Router();
const { authenticate } = require('../lib/auth');
const { findHotel } = require('../services/hotels');
const { saveFavoriteHotels, getFavoriteHotels, editFavoriteHotel } = require('../models/favoritesDB');
// const fav = require('../models/favoritesDB');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

// const dbService = require('../models/favoritesDB');
// const methodOverride = require('method-override');

// router.use(methodOverride('_method'));


router.get('/', authenticate, findHotel, (req, res) => {
  // console.log(res.hotels);
  res.render('./hotels', {
    hotels: res.hotels,
    // services
    favorites: res.gotHotels,
    // model - favorites
  });
});

// edit hotel title
router.get('/edit/:id', findHotel, (req, res) => {
  res.render('./edit', {
    hotel: res.updatedHotels,
  });
});

router.put('/:id', editFavoriteHotel, (req, res) => {
  res.render('./hotels');
});

// save favorite hotel data to the 3rd page with user id
router.post('/favorites', authenticate, saveFavoriteHotels, (req, res) => {
  res.redirect('./favorites');
});

router.get('/favorites', authenticate, getFavoriteHotels, (req, res) => {
  // console.log(res.gotHotels);
  res.render('favorites', {
    savedHotels: res.gotHotels,
  });
});

module.exports = router;
