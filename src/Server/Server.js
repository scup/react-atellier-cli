import path from 'path';

import bodyParser from 'body-parser';
import compression from 'compression';
import errorhandler from 'errorhandler';
import express from 'express';
import favicon from 'serve-favicon';
import logger from 'morgan';
import serveStatic from 'serve-static';
import { Compiler } from 'express-compile';
import livereload from 'livereload';


const HOST = '0.0.0.0';
const PORT = 8080;
const ROOT_DIR = process.cwd();
const COMPONENTS_DIR = ROOT_DIR + '/components';

class Server {
  constructor() {
    this.host = HOST;
    this.port = PORT;
    this.__app = express();

    this.use = this.__app.use.bind(this.__app);

    this.use(logger('dev'));
    this.use(bodyParser.urlencoded({ extended: false }));
    this.use(bodyParser.json());
    this.use(compression());
    this.use(favicon(path.resolve(__dirname, '../../static/icons/favicon.ico')));
    this.use(serveStatic(path.resolve(__dirname, '../../static')));
    this.use(serveStatic(COMPONENTS_DIR));
    this.use(Compiler({
      root: ROOT_DIR,
      cwd: COMPONENTS_DIR,
      paths: ['components/**/*'],
      ignore: ['components/node_modules/**/*'],
      ignoreStyleCache: true
    }));
    this.use(errorhandler());
  }

  run(callback) {
    this.__app.listen(this.port, this.host, () => {
      console.log(`Attelier listening on http://${this.host}:${this.port}`);
      callback && callback();
    });

    this.__app = livereload.createServer({ applyJSLive: true, applyCSSLive: true, applyImgLive: true });
    this.__app.watch(COMPONENTS_DIR);
  }
}



export default Server;
