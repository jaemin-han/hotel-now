const router = require('express').Router();
const { getFavoriteHotels, deleteFavoriteHotels } = require('../models/favoritesDB');
const methodOverride = require('method-override');
router.use(methodOverride('_method'));

// Based on users favorites - stores all data on the favorites page
router.get('/', getFavoriteHotels, (req, res) => {
  res.render('./favorites', {
    savedHotels: res.gotHotels,
  });
});

// // Based on users preference - can delete saved/favorite items
// router.delete('/:id', deleteFavoriteHotels, (req, res) => {
//   res.redirect('./favorites');
// });


// Testing delete with above section
// router.get('/:id', getFavoriteHotels, (req, res) => {
//   // console.log(res.gotHotels);
//   res.render('favorites', {
//     savedHotels: res.gotHotels,
//   });
// });

module.exports = router;
