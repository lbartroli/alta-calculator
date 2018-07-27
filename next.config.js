module.exports = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.module.rules.push({
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          // Emit errors as warnings for dev to not break webpack build.
          // Eslint errors are shown in console for dev, yay :-)
          emitWarning: dev
        }
      });
    }
    return config;
  }
};
