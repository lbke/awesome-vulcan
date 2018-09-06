import React, { PureComponent } from "react";
import {
  registerComponent,
  Components,
  withDocument,
  withCurrentUser,
  withList,
  withAccess
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
const setupItemDetailsComponent = (collection, options) => {
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
          headerText={options.details.headerText}
          fields={options.details.fields}
        />
      );
    }
  };
  component.displayName = componentName;
  const withDocumentOptions = {
    collection
  };
  const withAccessOptions = {
    groups: options.details.accessGroups,
    redirect: options.details.accessRedirect
  };
  registerComponent(
    componentName,
    component,
    /*withDocumentId('userId'),*/ [withDocument, withDocumentOptions],
    [withAccess, withAccessOptions]
  );
  return component; // return if the component is needed
};

/**
 * Create the new/edit component
 */
const setupFormComponent = (collection, options) => {
  const componentName = getFormComponentName(collection);
  const component = class ItemComponent extends PureComponent {
    render() {
      const { documentId, params, ...otherProps } = this.props;
      const finalDocumentId = documentId || params.documentId;
      return (
        <Components.CollectionItemForm
          collection={collection}
          mutationFragment={getFragmentName(collection)}
          queryFragment={getFragmentName(collection)}
          baseRoute={getBaseRoute(collection)}
          documentId={finalDocumentId}
          params={params}
          fields={
            finalDocumentId ? options.form.editFields : options.form.newFields
          }
          {...otherProps}
        />
      );
    }
  };
  component.displayName = componentName;
  const withAccessOptions = {
    groups: options.form.accessGroups,
    redirect: options.form.accessRedirect
  };
  registerComponent(componentName, component, withCurrentUser, [
    withAccess,
    withAccessOptions
  ]);
  return component;
};

const setupListComponent = (collection, options) => {
  const component = class ListComponent extends PureComponent {
    render() {
      const { results = [], loading } = this.props;
      return (
        <Components.CollectionList
          collection={collection}
          //loading={loading}
          results={results}
          baseRoute={getBaseRoute(collection)}
          check={Users.isAdmin}
          basicColumns={options.list.basicColumns}
          headerText={options.details.headerText}
        />
      );
    }
  };

  const withListOptions = {
    collection: collection,
    fragmentName: getFragmentName(collection),
    limit: 6
  };
  const withAccessOptions = {
    groups: options.list.accessGroups,
    redirect: options.list.accessRedirect
  };

  const componentName = getListComponentName(collection);
  component.displayName = componentName;
  registerComponent(
    componentName,
    component,
    [withList, withListOptions],
    [withAccess, withAccessOptions]
  );
  return component;
};

const defaultOptions = {
  list: { accessGroups: ["admins"], accessRedirect: "/" },
  details: { accessGroups: ["admins"], accessRedirect: "/" },
  form: { accessGroups: ["admins"], accessRedirect: "/" }
};
const setupCollectionAdminPages = (collection, options) => {
  const mergedOptions = merge({}, defaultOptions, options);
  // register list page
  const ListComponent = setupListComponent(collection, mergedOptions);
  // register detail page
  const DetailsComponent = setupItemDetailsComponent(collection, mergedOptions);
  // register new/edit form page
  const FormComponent = setupFormComponent(collection, mergedOptions);
  // setup the routes
  setupCollectionAdminRoutes(collection, mergedOptions);
  return { ListComponent, DetailsComponent, FormComponent };
};
export default setupCollectionAdminPages;
