import fs from 'fs';
import http from 'http';
import serveStatic from 'serve-static';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
// import ReactAtellier from 'react-atellier';

const HOST = '127.0.0.1';
const PORT = 8080;
const ROOT_DIR = process.cwd();
const COMPONENTS_DIR = ROOT_DIR + '/components';
const DOM = React.DOM;
// const AtellierUI = React.createFactory(require('./Components/AtellierUI'));

class Server {
  constructor() {
    this.socket = null;
    this.request = null;
    this.response = null;
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
      this.request = request;
      this.response = response;

      serveStatic(ROOT_DIR, { index: false })(this.request, this.response, () => {
        console.log('REQUEST OK');

        let props = {
          components: this.components
        };

        let html = ReactDOMServer.renderToStaticMarkup(
          DOM.body(null,
            DOM.div({ id: '__atellier', dangerouslySetInnerHTML: { __html: ReactDOMServer.renderToString(ReactAtellier(React)(props)) } }),
            DOM.script({ src: '//fb.me/react-0.14.7.min.js' }),
            DOM.script({ src: '//fb.me/react-dom-0.14.7.min.js' }),
            DOM.script({ src: '/react-atellier/dist/react-atellier.min.js' }),
            DOM.script({ dangerouslySetInnerHTML: {
              __html: `/* jshint undef:false */
                  ReactDOM.render(React.createElement(ReactAtellier(React), {
                    components: data
                  }), document.getElementById('main'));`
              }
            })
          )
        );

        this.response.end(html);
        html = null;
      });
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
