const webpack = require('webpack');
module.exports = function(config) {
  const fallback = config.resolve.fallback || {};

  Object.assign(fallback, {
    stream: require.resolve("stream-browserify"),
    path: require.resolve("path-browserify"),
    zlib: require.resolve("browserify-zlib"),
    crypto: require.resolve("crypto-browserify"),
    http: require.resolve("stream-http"),
    querystring: require.resolve("querystring-es3") ,
    buffer: require.resolve("buffer/") ,
    util: require.resolve("util/"),
    net:false,
    fs: false,
    assert: require.resolve("assert/"),
    vm: require.resolve("vm-browserify")
  })

  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || {}).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ])
  return config;
}