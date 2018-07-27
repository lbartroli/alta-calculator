const devConfig = {
  url: 'mongodb://localhost:27017/calculator'
};

const prodConfig = {
  url: 'mongodb://localhost/prod'
};

exports.dev = devConfig;
exports.prod = prodConfig;
