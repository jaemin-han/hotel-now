// const { MongoClient } = require('mongodb');
const { ObjectID } = require('mongodb');
const { getDB } = require('../lib/dbConnect.js');

// const dbConnection = 'mongodb://localhost:27017/hotels';

function getFavoriteHotels(req, res, next) {
  // find all favorites for your userId
  getDB().then((db) => {
    db.collection('favoritehotels')
      .find({ userId: { $eq: req.session.userId } })
      .toArray((toArrErr, gethotel) => {
        if (toArrErr) return next(toArrErr);
        res.gotHotels = gethotel;
        db.close();
        next();
      });
    return false;
  });
  return false;
}

function saveFavoriteHotels(req, res, next) {
  // creating an empty object for the insertObj
  const insertObj = {};

  // copying all of req.body into insertObj
  for(key in req.body) {
    insertObj[key] = req.body[key];
  }

  // Adding userId to insertObj
  insertObj.favoritehotels.userId = req.session.userId;

  getDB().then((db) => {
    db.collection('favoritehotels')
      .insert(insertObj.favoritehotels, (insertErr, hotelresult) => {
        if (insertErr) return next(insertErr);
        res.savedHotels = hotelresult;
        db.close();
        next();
      });
    return false;
  });
  return false;
}


// Delete method doesn't change because we are deleting objects from the database
// based on that object's unique _id - you do not need to specify which user as
// the _id is sufficient enough
function deleteFavoriteHotels(req, res, next) {
  getDB().then((db) => {
    db.collection('favoritehotels')
    .findAndRemove({ _id: ObjectID(req.params.id) }, (removeErr, result) => {
      if (removeErr) return next(removeErr);
      res.removedHotels = result;
      db.close();
      next();
    });
    return false;
  });
  return false;
}


module.exports = {
  getFavoriteHotels,
  saveFavoriteHotels,
  deleteFavoriteHotels,
};
