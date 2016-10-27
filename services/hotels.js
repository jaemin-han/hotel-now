const fetch = require('node-fetch');


const API_URL = 'https://api.sandbox.amadeus.com/v1.2/hotels/search-circle?';
const API_KEY = process.env.OPENHOTEL_KEY;

function findHotel(req, res, next) {

// console.log(`This is Key == ${API_KEY}`);
// fetch(`${API_URL}apikey=${API_KEY}&latitude=40.744396&longitude=-73.99086&radius=2&check_in=2016-11-15&check_out=2016-11-16`)
  fetch(`${API_URL}apikey=${API_KEY}&location=${req.query.location}&check_in=${req.query.check_in}&check_out=${req.query.check_out}`)
  // .then(r => r.json())
  .then(data => data.json())
  .then((data) => {
    console.log(data);
    res.hotels = data.results;
    next();
  })
  .catch((err) => {
    res.err = err;
    next();
  });
}

module.exports = { findHotel };
