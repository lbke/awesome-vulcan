Package.describe({
  name: "layout"
});

Package.onUse(api => {
  api.use(["vulcan:core", "erikdakoda:vulcan-material-ui", "menu"]);

  api.addFiles(["lib/stylesheets/roboto.css"], "client");
  api.mainModule("lib/server/main.js", "server");
  api.mainModule("lib/client/main.js", "client");
});
