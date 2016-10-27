const router = require('express').Router();
const { findHotelByAddress } = require('../services/hotels');


router.get('/nyc', findHotelByAddress, (req, res) => {
  console.log(res.hotels);
  res.render('hotels', {
    hotels: res.hotels,
  });
});

module.exports = router;
