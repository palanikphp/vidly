const winston = require("winston");
const mongoose = require('mongoose');

module.exports = function () {
  mongoose.connect('mongodb://localhost/vidly')
    .then(() => {
      winston.info("Connected to MongoDB...");
    });
    // .catch(err => {
    //   //TODO: No need CATCH, we should terminate the process if we can't connect to DB
    //   console.log('Could not connect to MongoDB...');
    // });
}