import fs from 'fs';
import path from 'path';
import url from 'url';
import http from 'http';
import webpack from 'webpack';
import chokidar from 'chokidar';
import _sendFile from './lib/send-file';

class Server {
  constructor({componentsDir, hostname, port, rootDir}) {
    this.host = hostname;
    this.port = port;
    this.componentsDir = componentsDir;

    this.socket = null;
    this.components = null;
    this.loadComponents();
    this.watchComponents();
  }

  run(callback) {
    return this.createServer().listen(this.port, callback);
  }

  loadComponents() {
    fs.readdir(this.componentsDir, (err, components) => {
      this.components = components;
    });
  }

  watchComponents() {
    chokidar.watch(`${this.componentsDir}/**/*`)
      .on('all', (event, path) => {
        console.log(event, path);
      });
  }

  createServer() {
    this.socket = http.createServer((request, response) => {
      let uri = url.parse(request.url).pathname;
      let filename = path.join(process.cwd(), uri);
      _sendFile.call(response, uri, filename);
    });

    this.socket.on('error', (e) => {
      console.error(e.message);
      process.exit(1);
    });

    return this.socket;
  }

  listen(port, callback) {
    this.socket.listen({ host: this.host, port: this.port, exclusive: true }, callback);
  }
}

export default Server;
