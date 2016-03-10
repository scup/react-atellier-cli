#!/usr/bin/env babel-node --presets es2015,react

import pkg from './package';
import program from 'commander';
import Server from './src/Server/Server';

program
  .version(pkg.version)
  .option('-c, --componentsDir <dir>', 'components directory. defaults to ./components', 'components')
  .option('-h, --hostname <hostname>', 'server hostname. defaults to 0.0.0.0', '0.0.0.0')
  .option('-p, --port <port>', 'components directory. defaults to 8080', '8080')
  .option('-r, --rootDir <root_dir>', 'components directory. defaults to' + process.cwd(), process.cwd())
  .parse(process.argv);

new Server(program).run(function () {
  let _figlet = '\x1b[36m%s\x1b[0m';
  console.log(_figlet, '    _   _       _ _ _');
  console.log(_figlet, '   / \\\ | |_ ___| | (_) ___ _ __');
  console.log(_figlet, '  / _ \\\| __/ _ \\\ | | |/ _ \\\ \'__|');
  console.log(_figlet, ' / ___ \\\ ||  __/ | | |  __/ |');
  console.log(_figlet, '/_/   \\\_\\\__\\\___|_|_|_|\\\___|_|');
  console.log();
});
