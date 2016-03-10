import fs from 'fs';
import path from 'path';
import url from 'url';

import http from 'http';

// import React from 'react';
// import ReactDOMServer from 'react-dom/server';

import _sendFile from './lib/send-file';

// const DOM = React.DOM;
// const AtellierUI = React.createFactory(require('./Components/AtellierUI'));

const HOST = '0.0.0.0';
const PORT = 8080;
const ROOT_DIR = process.cwd();
const COMPONENTS_DIR = ROOT_DIR + '/components';

class Server {
  constructor() {
    this.socket = null;
    this.components = null;
    this.loadComponents();
  }

  run(callback) {
    return this.createServer().listen(PORT, callback);
  }

  loadComponents() {
    fs.readdir(COMPONENTS_DIR, (err, components) => {
      this.components = components;
    });
  }

  createServer() {
    this.socket = http.createServer((request, response) => {
      let uri = url.parse(request.url).pathname;
      let filename = path.join(process.cwd(), uri);

      if (/^\/(index\.html)?$/.test(uri)) {
        filename = path.join(__dirname, 'atellier.html');
      } else if (/^\/(react-atellier\.min\.js)?$/.test(uri)) {
        filename = path.resolve(path.join(
          __dirname,
          '..',
          '..',
          'node_modules',
          'react-atellier',
          'dist',
          'react-atellier.min.js'
        ));
      }  else if (/^\/(react-atellier\.min\.js\.map)?$/.test(uri)) {
        filename = path.resolve(path.join(
          __dirname,
          '..',
          '..',
          'node_modules',
          'react-atellier',
          'dist',
          'react-atellier.min.js.map'
        ));
      } else if (/^\/(react\.js)?$/.test(uri)) {
        filename = path.resolve(path.join(
          __dirname,
          '..',
          '..',
          'node_modules',
          'react',
          'dist',
          'react.js'
        ));
      } else if (/^\/(react-dom\.js)?$/.test(uri)) {
        filename = path.resolve(path.join(
          __dirname,
          '..',
          '..',
          'node_modules',
          'react-dom',
          'dist',
          'react-dom.js'
        ));
      }

      _sendFile.call(response, filename);
    });

    this.socket.on('error', (e) => {
      console.error(e.message);
      process.exit(1);
    });

    return this.socket;
  }

  listen(port, callback) {
    this.socket.listen({ host: HOST, port: PORT, exclusive: true }, callback);
  }
}

export default Server;
