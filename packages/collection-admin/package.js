Package.describe({
  name: "collection-admin"
});

Package.onUse(api => {
  api.use(["vulcan:core", "erikdakoda:vulcan-material-ui", "vulcan:i18n"]);

  api.mainModule("lib/server/main.js", "server");
  api.mainModule("lib/client/main.js", "client");
});
