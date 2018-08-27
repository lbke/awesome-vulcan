Package.describe({
  name: "core"
});

Package.onUse(api => {
  api.use(["vulcan:core", "layout"]);

  api.mainModule("lib/server/main.js", "server");
  api.mainModule("lib/client/main.js", "client");
});
