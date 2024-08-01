// config-overrides.js
const webpack = require("webpack");

module.exports = function override(config, env) {
  config.resolve.fallback = {
    process: require.resolve("process/browser"),
    stream: require.resolve("stream-browserify"),
    buffer: require.resolve("buffer"),
  };

  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser",
    })
  );

  return config;
};
