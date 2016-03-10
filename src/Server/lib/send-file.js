import fs from 'fs';
import path from 'path';
import url from 'url';
import mime from 'mime';

const NODE_MODULES_DIR = path.join(__dirname, '../../../node_modules');

function _send(filename) {
  fs.readFile(filename, 'binary', (error, file) => {
    if (error) {
      this.writeHead(500, { 'Content-Type': 'text/plain' });
      this.write(`${error}\n`);
      return this.end();
    }

    this.writeHead(200, { 'Content-Type': mime.lookup(filename) });
    this.write(file, 'binary');
    this.end();
  });
}

function _resolve(filepath) {
  console.log('filepath', filepath);
  let _path = path.resolve(path.join(NODE_MODULES_DIR, filepath));
  console.log('_path', _path);
  return _path;
}

export default function (uri, filename) {
  //
  // TODO: Router
  //
  if (/^\/(index\.html)?$/.test(uri)) {
    filename = path.resolve(path.join(__dirname, '../atellier.html'));
  } else if (/^\/react-atellier\.min\.js$/.test(uri)) {
    filename = _resolve('react-atellier/dist/react-atellier.min.js');
  }  else if (/^\/react-atellier\.min\.js\.map$/.test(uri)) {
    filename = _resolve('react-atellier/dist/react-atellier.min.js.map');
  } else if (/^\/react\.js$/.test(uri)) {
    filename = _resolve('react/dist/react.js');
  } else if (/^\/react-dom\.js$/.test(uri)) {
    filename = _resolve('react-dom/dist/react-dom.js');
  } else {
    this.writeHead(404, { 'Content-Type': 'text/plain' });
    this.write('404 Not Found\n');
    this.end();
    return false;
  }

  return _send.call(this, filename);
}
