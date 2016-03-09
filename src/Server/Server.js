import net from 'net';
import http from 'http';

import serveStatic from 'serve-static';
import Loader from '../Components/Loader';

const HOST = '0.0.0.0';
const PORT = 8080;

class Server {
  constructor() {
    this.socket = null;
    this.request = null;
    this.response = null;
    this.checkPort();
  }

  run() {
    return this.createServer().listen(PORT);
  }

  checkPort(port) {
    let server = net.createServer()
      .once('listening', () => server.close())
      .listen(PORT);
  }

  createServer() {
    this.socket = http.createServer((request, response) => {
      this.request = request;
      this.response = response;
      this.response.end('OK');
    });

    this.socket.on('error', (e) => {
      console.error(e.message);
      process.exit(1);
    });

    return this.socket;
  }

  listen(port) {
    this.socket.listen({ host: HOST, port: PORT, exclusive: true }, () => {
      console.log('HTTP::listen::OK', arguments);
    });
  }
}

export default Server;
