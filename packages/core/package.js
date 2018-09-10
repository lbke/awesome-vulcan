Package.describe({
  name: "core"
});

Package.onUse(api => {
  api.use([
    "vulcan:core",
    "vulcan:accounts",
    "config",
    "layout",
    "collection-admin",
    "validation-workflow",
    "vulcan:i18n-fr-fr",
    "vulcan:material-ui-form-inputs"
  ]);

  api.mainModule("lib/server/main.js", "server");
  api.mainModule("lib/client/main.js", "client");
});
