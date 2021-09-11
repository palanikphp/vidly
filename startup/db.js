const winston = require("winston");
const mongoose = require('mongoose');
const config = require("config");

module.exports = function () {
  const db = config.get("db");
  mongoose.connect(db)
    .then(() => {
      winston.info(`Connected to ${db}...`);
    });
    // .catch(err => {
    //   //TODO: No need CATCH, we should terminate the process if we can't connect to DB
    //   console.log('Could not connect to MongoDB...');
    // });
}