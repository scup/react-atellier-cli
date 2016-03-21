let componentList = [{
  componentName: MyComponent.displayName,
  component: MyComponent
}];

ReactDOM.render(React.createElement(ReactAtellier(React), {
  components: componentList
}), document.getElementById('__atellier'));
