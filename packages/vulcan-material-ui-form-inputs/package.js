Package.describe({
  name: "vulcan:material-ui-form-inputs"
});

Package.onUse(api => {
  api.use(["vulcan:core"]);

  api.mainModule("lib/server/main.js", "server");
  api.mainModule("lib/client/main.js", "client");
});
