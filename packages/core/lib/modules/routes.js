import { addRoute } from "meteor/vulcan:core";
addRoute({
  name: "home",
  path: "/",
  componentName: "Home"
});
addRoute({
  name: "applications",
  path: "/applications",
  componentName: "Applications"
});

addRoute({
  name: "articles",
  path: "/articles",
  componentName: "Articles"
});
addRoute({
  name: "packages",
  path: "/packages",
  componentName: "Packages"
});
addRoute({
  name: "videos",
  path: "/videos",
  componentName: "Videos"
});
