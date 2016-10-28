const { MongoClient } = require('mongodb');
const { ObjectID } = require('mongodb');
const dbConnection = 'mongodb://localhost:27017/hotels';

function getFavoriteHotels(req, res, next) {
  MongoClient.connect(dbConnection, (err, db) => {
    if (err) return next(err);

    db.collection('favoritehotels')
    .find({})
    .toArray((insertErr, gethotel) => {
      if (insertErr) return next(insertErr);

      res.gotHotels = gethotel;
      db.close();
      return next();
    });
    return false;
  });
  return false;
}

function saveFavoriteHotels(req, res, next) {
  MongoClient.connect(dbConnection, (err, db) => {
    if (err) return next(err);

    db.collection('favoritehotels')
    .insert(req.body.favoritehotels, (insertErr, hotelresult) => {
      if (insertErr) return next(insertErr);

      res.savedHotels = hotelresult;
      db.close();
      return next();
    });
    return false;
  });
  return false;
}

function deleteFavoriteHotels(req, res, next) {
  MongoClient.connect(dbConnection, (err, db) => {
    if (err) return next(err);

    db.collection('favoritehotels')
    .findAndRemove({ _id: ObjectID(req.params.id) }, (removeErr, doc) => {
      if (removeErr) return next(removeErr);

      res.removedHotels = doc;
      db.close();
      return next();
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
