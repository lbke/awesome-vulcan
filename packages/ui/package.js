Package.describe({
  name: "ui"
});

Package.onUse(api => {
  api.use(["vulcan:core"]);

  api.mainModule("lib/client/main.js", "client");
});
