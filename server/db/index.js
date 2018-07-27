var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
var connection = mongoose.connection;
var { dbConf } = require('../config');

const connect = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return mongoose.connect(
        dbConf.dev.url,
        { useNewUrlParser: true }
      );
    case 'production':
      return mongoose.connect(
        dbConf.prod.url,
        { useNewUrlParser: true }
      );
  }
};

module.exports = {
  connect,
  connection
};
