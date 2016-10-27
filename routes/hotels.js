const router = require('express').Router();
const { findHotel } = require('../services/hotels');


router.get('/', findHotel, (req, res) => {
  // console.log(res.hotels);
  res.render('hotels', {
    hotels: res.hotels,
  });
});

module.exports = router;
