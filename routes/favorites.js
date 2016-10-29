const router = require('express').Router();
const { getFavoriteHotels, deleteFavoriteHotels } = require('../models/favoritesDB');
// const fav = require('../models/favoritesDB');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));
// const dbService = require('../models/favoritesDB');
// const methodOverride = require('method-override');

// router.use(methodOverride('_method'));


router.get('/', getFavoriteHotels, (req, res) => {
  res.render('./favorites', {
    savedHotels: res.gotHotels,
  });
});

router.delete('/hotels/favorites/:id', deleteFavoriteHotels, (req, res) => {
  res.redirect('./favorites');
});


// Testing delete with above section
// router.get('/:id', getFavoriteHotels, (req, res) => {
//   // console.log(res.gotHotels);
//   res.render('favorites', {
//     savedHotels: res.gotHotels,
//   });
// });

module.exports = router;
