Package.describe({
  name: "core"
});

Package.onUse(api => {
  api.use(["vulcan:core", "vulcan:accounts", "config", "layout"]);

  api.mainModule("lib/server/main.js", "server");
  api.mainModule("lib/client/main.js", "client");
});
