Package.describe({
  name: "core"
});

Package.onUse(api => {
  api.use([
    "vulcan:core",
    "vulcan:accounts",
    "vulcan:i18n",
    "config",
    "vulcan:more-material-ui",
    "vulcan:backoffice-builder",
    "vulcan:validation-workflows",
    "vulcan:i18n-fr-fr"
  ]);

  api.mainModule("lib/server/main.js", "server");
  api.mainModule("lib/client/main.js", "client");
});
