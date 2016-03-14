import fs from 'fs';
import path from 'path';
import url from 'url';
import http from 'http';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';

class Server {
  constructor(config) {
    this.componentsDir = config.componentsDir;
    this.host = config.hostname;
    this.port = config.port;
    this.rootDir = config.rootDir;
    this.socket = null;
    this.components = null;
    this.entry = null;
  }

  run(callback) {
    return this.createServer().listen(this.port, this.host, callback);
  }

  createServer() {
    let config = require(path.resolve(this.rootDir + '/webpack.config.js'));
    let compiler = webpack(config);

    this.socket = new webpackDevServer(compiler, {
      publicPath: config.rootDir,
      stats: { colors: true },
      contentBase: path.resolve(__dirname + '/../..'),
      hot: true
    });

    return this.socket;
  }
}

export default Server;
