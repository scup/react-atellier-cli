import fs from 'fs';
import React from 'react';

const DOM = React.DOM;
const COMPONENTS_DIR = process.cwd() + '/components';

// SPA single page application
class AtellierUI extends React.Component{
  constructor(props) {
    super(props);
    this.state = { components: null };
  }

  loadComponents() {
    fs.readdir(COMPONENTS_DIR, (err, components) => {
      this.setState({components});
    });
  }

  componentDidMount() {
    loadComponents();
  }

  render() {
    return DOM.body(null,
      DOM.div({ id: '__atellier' }),
      DOM.script({ src: '//fb.me/react-0.14.7.min.js' }),
      DOM.script({ src: '//fb.me/react-dom-0.14.7.min.js' }),
      DOM.script({ src: '/react-atellier/dist/react-atellier.min.js' })
    );
  }
}

export default AtellierUI;
