import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

class Router {
  constructor() {
  }

  route(req, res, next) {
    switch (req.path) {
      case '/':
      case '/index.html':
        this.singlePageApp(req, res, next);
      break;
      case '/react.js':
      case '/react-dom.js':
        this.reactJsFiles(req, res, next);
      break;
      case '/react-atellier.min.js':
        this.atellierApp(req, res, next);
      break;
      default:
        next();
    }
  }

  atellierApp(req, res, next) {
    res.sendFile(path.resolve(__dirname, '../../node_modules/react-atellier/dist/react-atellier.min.js'));
  }

  singlePageApp(req, res, next) {
    res.sendFile(path.resolve(__dirname, '../../static/index.html'));
  }

  reactJsFiles(req, res, next) {
    const dir = req.path.replace('.js', '');
    const file = req.path.replace(/^\//, '');
    res.sendFile(path.resolve(__dirname, '../../node_modules' + dir + '/dist/' + file));
  }

  reactMiddleware() {
    return function reactRouter(req, res, next) {
      this.route(req, res, next);
    }.bind(this);
  }
}

export default Router;
