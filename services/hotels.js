const fetch = require('node-fetch');

const API_KEY = process.env.OPENHOTEL_KEY;
const API_URL = 'http://api.sandbox.amadeus.com/v1.2/hotels/search-circle?';

function findHotelByAddress(req, res, next) {
  fetch(`${API_URL}apikey=${API_KEY}&latitude=40.744396&longitude=-73.99086&radius=2&check_in=2016-11-15&check_out=2016-11-16`)
  .then(r => r.json())
  .then((result) => {
    res.hotels = result;
    next();
  })
  .catch((err) => {
    res.err = err;
    next();
  });
}

module.exports = { findHotelByAddress };
