// const { MongoClient } = require('mongodb');
const { ObjectID } = require('mongodb');
const { getDB } = require('../lib/dbConnect.js');

// const dbConnection = 'mongodb://localhost:27017/hotels';

// Get all hotel List
function getFavoriteHotels(req, res, next) {
  // Find all favorites for your userId and display
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

// Saving all favorite hotel list
function saveFavoriteHotels(req, res, next) {
  // Creating an empty object for the insertObj
  const insertObj = {};

  // Copying all of req.body into insertObj
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
// Find and remove the object id
function deleteFavoriteHotels(req, res, next) {
  getDB().then((db) => {
    db.collection('favoritehotels')
    .findAndRemove({ _id: ObjectID(req.params.id) }, (removeErr, doc) => {
      if (removeErr) return next(removeErr);
      res.removedHotels = doc;
      db.close();
      next();
    });
    return false;
  });
  return false;
}

// Edit user's saved items
function editFavoriteHotel(req, res, next) {
  getDB().then((db) => {
    db.collection('favoritehotels')
    .findAndModify({ _id: ObjectID(req.params.id) }, [] /* sort */,
      { $set: req.body.hotel }, { new: true }, (updateError, doc) => {
        if (updateError) return next(updateError);

      // return the data
      res.updatedHotels = doc;
        db.close();
        next();
      });
    return false;
  });
  return false;
}

function getEditHotel(req, res, next) {
  getDB().then((db) => {
    db.collection('favoritehotels')
      .findOne({ _id: ObjectID(req.params.id) }, (findErr, hotel) => {
        if (findErr) return next(findErr);

        // return the data
        res.hotel = hotel;
        db.close();
        return next();
      });
    return false;
  });
  return false;
}

// Modules called in various routes
module.exports = {
  getFavoriteHotels,
  saveFavoriteHotels,
  deleteFavoriteHotels,
  editFavoriteHotel,
  getEditHotel,
};
