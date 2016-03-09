class App {
  constructor(config) {
    this.id = (Date.now()).toString(36);
    console.log(config);

    Loader.loadDir(config.componentsDir, (err, components) => {
      this.components = components;
      console.log(this.components);
    });
  }

}

export default App;
