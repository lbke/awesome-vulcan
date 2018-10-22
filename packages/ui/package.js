Package.describe({
  name: "ui"
});

Package.onUse(api => {
  api.use(["vulcan:core", "vulcan:more-material-ui"]);

  api.mainModule("lib/client/main.js", "client");
});
