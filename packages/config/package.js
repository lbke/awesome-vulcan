Package.describe({
  name: "config"
});

Package.onUse(api => {
  api.use(["vulcan:core", "erikdakoda:vulcan-material-ui"]);

  api.mainModule("lib/server/main.js", "server");
  api.mainModule("lib/client/main.js", "client");
});
