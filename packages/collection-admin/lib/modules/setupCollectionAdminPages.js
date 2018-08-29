import React from "react";
import {
  registerComponent,
  Components,
  withDocument,
  withCurrentUser,
  withList
} from "meteor/vulcan:core";
import Users from "meteor/vulcan:users";
import setupCollectionAdminRoutes from "./setupCollectionAdminRoutes";
import {
  getDetailsComponentName,
  getFormComponentName,
  getListComponentName,
  getFragmentName,
  getBaseRoute
} from "./namingHelpers";

/**
 * Create the item details page
 */
const setupItemDetailsComponent = collection => {
  const componentName = getDetailsComponentName(collection);
  const component = ({ loading, document, currentUser }) => (
    <Components.CollectionItemDetails
      collection={collection}
      baseRoute="/users"
      FormComponentName={getFormComponentName(collection)}
      displayedSchemaFields={Object.keys(collection.options.schema).map(
        key => ({
          name: key,
          ...collection.options.schema[key]
        })
      )}
      loading={loading}
      document={document}
    />
  );
  component.displayName = componentName;
  const options = {
    collection
  };
  registerComponent(
    componentName,
    component,
    /*withDocumentId('userId'),*/ [withDocument, options]
  );
  return component; // return if the component is needed
};

/**
 * Create the new/edit component
 */
const setupFormComponent = collection => {
  const componentName = getFormComponentName(collection);
  const component = ({ currentUser, documentId, params, ...otherProps }) => (
    <Components.CollectionItemForm
      collection={collection}
      mutationFragment={getFragmentName(collection)}
      queryFragment={getFragmentName(collection)}
      documentId={documentId || params.documentId}
      baseRoute={getBaseRoute(collection)}
      {...otherProps}
      params={params}
      //fields={["email", "username", "groups", "isAdmin"]}
    />
  );
  component.displayName = componentName;

  registerComponent(componentName, component, withCurrentUser);
  return component;
};

const setupListComponent = collection => {
  const component = ({ results = [], loading }) => (
    <Components.CollectionPage
      collection={collection}
      //loading={loading}
      results={results}
      baseRoute={getBaseRoute(collection)}
      check={Users.isAdmin}
    />
  );

  const options = {
    collection: collection,
    fragmentName: getFragmentName(collection),
    limit: 6
  };

  const componentName = getListComponentName(collection);
  component.displayName = componentName;
  registerComponent(componentName, component, [withList, options]);
  return component;
};

const setupCollectionAdminPages = collection => {
  // register list page
  setupListComponent(collection);
  // register detail page
  setupItemDetailsComponent(collection);
  // register new/edit form page
  setupFormComponent(collection);
  // setup the routes
  setupCollectionAdminRoutes(collection);
};
export default setupCollectionAdminPages;
