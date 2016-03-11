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
  }

  run() {
    return this.createServer().listen(this.port);
  }

  createServer() {
    let rootDir = process.cwd();
    let config = require(path.resolve(rootDir + '/webpack.config.js'));

    config.entry = rootDir + '/index.js';
    config.output = {
      path: rootDir,
      filename: rootDir + '/dist/bundle.js',
      sourceFilename: '[file].map'
    };

    let compiler = webpack(config);

    this.socket = new webpackDevServer(compiler, { hot: true });

    return this.socket;
  }

  listen(port, callback) {
    this.socket.listen({ host: this.host, port: this.port, exclusive: true });
  }
}

export default Server;
