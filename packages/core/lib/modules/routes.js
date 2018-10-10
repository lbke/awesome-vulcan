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
