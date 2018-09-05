const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const getCollectionName = collection => collection._name;
export const getCollectionDisplayName = collection =>
  capitalizeFirstLetter(getCollectionName(collection));

const makeComponentName = suffix => collection =>
  `${capitalizeFirstLetter(getCollectionName(collection))}${suffix}`;

export const getDetailsComponentName = makeComponentName("Details");
export const getListComponentName = makeComponentName("List");
export const getFormComponentName = makeComponentName("Form");
export const getFragmentName = makeComponentName("DefaultFragment");
export const getBaseRouteName = collection =>
  getCollectionName(collection).toLowerCase();
export const getBaseRoute = collection =>
  "/" + getCollectionName(collection).toLowerCase();
export const getNewRoute = collection => getBaseRoute(collection) + "/create";
export const getEditRoute = collection =>
  getBaseRoute(collection) + "/:documentId/edit";
export const getDetailsRoute = collection =>
  getBaseRoute(collection) + "/:documentId";
