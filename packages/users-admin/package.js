Package.describe({
  name: "users-admin"
});

Package.onUse(api => {
  api.use(["vulcan:core", "vulcan:users", "collection-admin"]);

  api.mainModule("lib/server/main.js", "server");
  api.mainModule("lib/client/main.js", "client");
});
