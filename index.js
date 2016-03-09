#!/usr/bin/env babel-node --presets es2015,react


import pkg from './package';
import program from 'commander';

import Server from './src/Server/Server';
import AtellierUI from './src/Server/Components/AtellierUI';

program
  .version(pkg.version)
  .option('-c, --componentsDir <dir>', 'components directory. defaults to ./components', 'components')
  .option('-h, --hostname <hostname>', 'server hostname. defaults to 0.0.0.0', '0.0.0.0')
  .option('-p, --port <port>', 'components directory. defaults to 8080', '8080')
  .option('-r, --rootDir <root_dir>', 'components directory. defaults to' + process.cwd(), process.cwd())
  .parse(process.argv);

let server = new Server()
server.run(function () {
  console.log('Running');
});


// let page = new AtellierUI();
