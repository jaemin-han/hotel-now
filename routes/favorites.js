const router = require('express').Router();
const { getFavoriteHotels, deleteFavoriteHotels } = require('../models/favoritesDB');
// const dbService = require('../models/favoritesDB');
// const methodOverride = require('method-override');

// router.use(methodOverride('_method'));

router.get('/', getFavoriteHotels, (req, res) => {
  res.render('./favorites', {
    savedHotels:res.gotHotels,
  });
});

router.delete('/:id', deleteFavoriteHotels, (req, res) => {
  res.redirect('./favorites');
});

module.exports = router;
