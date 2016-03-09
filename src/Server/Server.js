import http from 'http';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Loader from '../Components/Loader';

let DOM = React.DOM;

class Server {
  run(cb) {
    this.createServer().listen(8080, cb);
  }

  createServer() {
    return http.createServer((req, res) => {
      if (req.url === '/') {
        res.setHeader('Content-Type', 'text/html');

        let props = {
          items: [
            'Item 0',
            'Item 1',
            'Item </script>',
            'Item <!--inject!-->',
          ]
        };

        let html = ReactDOMServer.renderToStaticMarkup(
          DOM.body(null,
            DOM.div({ id: '__atellier' }),
            DOM.script({ src: '//fb.me/react-0.14.7.min.js' }),
            DOM.script({ src: '//fb.me/react-dom-0.14.7.min.js' }),
            DOM.script({ src: '/react-atellier/dist/react-atellier.min.js' })
          )
        );

        res.end(html);
      } else {
        res.statusCode = 404;
        res.end();
      }
    });
  }

  listen(port, cb) {
    return http.listen(port, cb);
  }
}

export default Server;
