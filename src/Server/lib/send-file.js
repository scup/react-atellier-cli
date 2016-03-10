import fs from 'fs';
import path from 'path';
import url from 'url';
import mime from 'mime';

export default function (filename) {
  fs.exists(filename, (exists) => {
    if (!exists) {
      this.writeHead(404, {'Content-Type': 'text/plain'});
      this.write('404 Not Found\n');
      this.end();
      return;
    }

    fs.readFile(filename, 'binary', (error, file) => {
      if (error) {
        this.writeHead(500, { 'Content-Type': 'text/plain' });
        this.write(`${error}\n`);
        this.end();
        return;
      }

      this.writeHead(200, { 'Content-Type': mime.lookup(filename) });
      this.write(file, 'binary');
      this.end();
    });
  });
}
