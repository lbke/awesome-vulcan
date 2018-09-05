import { addRoute } from "meteor/vulcan:core";
import {
  getBaseRoute,
  getBaseRouteName,
  getNewRoute,
  getEditRoute,
  getDetailsRoute,
  getFormComponentName,
  getListComponentName,
  getDetailsComponentName
} from "./namingHelpers";

export default collection => {
  const baseRoute = getBaseRoute(collection);
  const baseRouteName = getBaseRouteName(collection);
  const routes = [
    {
      name: baseRouteName,
      path: baseRoute,
      componentName: getListComponentName(collection),
      returnRoute: baseRoute
    },
    {
      name: "new-" + baseRouteName,
      path: getNewRoute(collection),
      componentName: getFormComponentName(collection),
      returnRoute: getBaseRoute(collection)
    },
    {
      name: "edit-" + baseRouteName,
      path: getEditRoute(collection),
      componentName: getFormComponentName(collection),
      returnRoute: baseRoute
    },
    {
      name: baseRouteName + "-details",
      path: getDetailsRoute(collection),
      componentName: getDetailsComponentName(collection),
      returnRoute: baseRoute
    }
  ];
  routes.forEach(route => {
    addRoute(route);
  });
};
