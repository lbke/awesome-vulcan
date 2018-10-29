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
    "vulcan:more-helpers",
    "vulcan:backoffice-builder",
    "vulcan:users-manager",
    "vulcan:validation-workflows",
    "vulcan:i18n-fr-fr",
    "vulcan:http-redirect"
  ]);

  api.mainModule("lib/server/main.js", "server");
  api.mainModule("lib/client/main.js", "client");
});
