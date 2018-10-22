Package.describe({
  name: "vulcan:material-ui-layouts"
});

Package.onUse(api => {
  api.use([
    "vulcan:core",
    "erikdakoda:vulcan-material-ui",
    "fourseven:scss@4.5.0",
    "vulcan:menu",
    "vulcan:backoffice-builder"
  ]);

  api.addFiles(
    ["lib/stylesheets/roboto.css"], //, "lib/stylesheets/ReactToastify.min.css"],
    "client"
  );
  api.mainModule("lib/server/main.js", "server");
  api.mainModule("lib/client/main.js", "client");
});
