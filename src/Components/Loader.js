import fs from 'fs';

class Loader {
  static loadDir (dir, cb) {
    fs.readdir(dir, cb);
  }
}

export default Loader;
