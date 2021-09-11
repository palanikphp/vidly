const winston =  require("winston");
//require("winston-mongodb");
require("express-async-errors");

module.exports = function() {
  // process.on("uncaughtException", (ex) => {
  //   console.log("WE GOT UNCAUGHT EXCEPTION", ex);
  //   winston.error(ex.message, ex);
  //   process.exit(1);
  // })

  winston.handleExceptions(
    new winston.transports.Console({colorize: true, prettyPrint: true }),
    new winston.transports.File({
      filename: "logs/uncaughtExceptions.log",
      humanReadableUnhandledException: true,
    })
  );

  process.on("unhandledRejection", (ex) => {
   throw ex;
  })

  // process.on("unhandledRejection", (ex) => {
  //   console.log("WE GOT AN UNHANDELED REJECTION", ex);
  //   winston.error(ex.message, ex);
  //   process.exit(1);
  // })

  winston.add(winston.transports.File, {filename: "logs/logfile.log"});
  //winston.add(winston.transport.MongoDB, {db: "mongodb://localhost/vidly"});
}