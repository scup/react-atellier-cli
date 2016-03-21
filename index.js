#!/usr/bin/env babel-node --presets es2015,react


import pkg from './package';
import program from 'commander';

import React from 'react';
import App from './src/App/App';
import Server from './src/Server/Server';
import Router from './src/Router/Router';

program
  .version(pkg.version)
  .option('-c, --componentsDir <dir>', 'components directory. defaults to ./components', 'components')
  .option('-h, --hostname <hostname>', 'server hostname. defaults to 0.0.0.0', '0.0.0.0')
  .option('-p, --port <port>', 'components directory. defaults to 8080', '8080')
  .option('-r, --rootDir <root_dir>', 'components directory. defaults to' + process.cwd(), process.cwd())
  .parse(process.argv);

let server = new Server();
let router = new Router(<App/>);

server.use(router.reactMiddleware());
server.run();
