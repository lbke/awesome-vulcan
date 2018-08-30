import React, { PureComponent } from "react";
import {
  registerComponent,
  Components,
  withDocument,
  withCurrentUser,
  withList
} from "meteor/vulcan:core";
import Users from "meteor/vulcan:users";
import merge from "lodash/merge";
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
  const component = class DetailsComponent extends PureComponent {
    render() {
      const { loading, document, currentUser } = this.props;
      return (
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
    }
  };
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
  const component = class ItemComponent extends PureComponent {
    render() {
      const { currentUser, documentId, params, ...otherProps } = this.props;
      return (
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
    }
  };
  component.displayName = componentName;

  registerComponent(componentName, component, withCurrentUser);
  return component;
};

const setupListComponent = (collection, options) => {
  const component = class ListComponent extends PureComponent {
    render() {
      const { results = [], loading } = this.props;
      return (
        <Components.CollectionPage
          collection={collection}
          //loading={loading}
          results={results}
          baseRoute={getBaseRoute(collection)}
          check={Users.isAdmin}
          basicColumns={options.list.basicColumns}
        />
      );
    }
  };

  const withListOptions = {
    collection: collection,
    fragmentName: getFragmentName(collection),
    limit: 6
  };

  const componentName = getListComponentName(collection);
  component.displayName = componentName;
  registerComponent(componentName, component, [withList, withListOptions]);
  return component;
};

const defaultOptions = {
  list: {},
  details: {},
  form: {}
};
const setupCollectionAdminPages = (collection, options) => {
  const mergedOptions = merge(defaultOptions, options);
  // register list page
  setupListComponent(collection, mergedOptions);
  // register detail page
  setupItemDetailsComponent(collection, mergedOptions);
  // register new/edit form page
  setupFormComponent(collection, mergedOptions);
  // setup the routes
  setupCollectionAdminRoutes(collection, mergedOptions);
};
export default setupCollectionAdminPages;
