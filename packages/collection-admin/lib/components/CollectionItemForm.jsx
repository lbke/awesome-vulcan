/**
 * Generic page for a collection item new/edit form
 * Must be handled by the parent:
 * - documentId
 * - mutationFragment and collection
 *
 */
import React from "react";
import {
  Components,
  getFragment,
  registerComponent,
  withCurrentUser
} from "meteor/vulcan:core";
import { browserHistory } from "react-router";

const Toaster = {
  create: () => ({
    show: console.log
  })
};
const Intent = {
  SUCCESS: "success",
  ERROR: "error"
};

export const CollectionItemForm = ({
  collection,
  currentUser,
  documentId,
  mutationFragment,
  queryFragment,
  closeModal,
  router,
  baseRoute,
  fields,
  ...otherProps
}) => (
  <div>
    {documentId || collection.options.mutations.new.check(currentUser) ? ( // new doc
      <div px={16} py={24}>
        <Components.SmartForm
          collection={collection}
          mutationFragment={
            mutationFragment ? getFragment(mutationFragment) : undefined
          }
          queryFragment={queryFragment ? getFragment(queryFragment) : undefined}
          fields={fields ? fields : undefined}
          /* for edition */
          documentId={documentId}
          showRemove={!!documentId}
          errorCallback={(document, error) => {
            Toaster.create().show({
              message: `Une erreur s'est produite`,
              iconName: "error",
              intant: Intent.ERROR
            });
          }}
          removeSuccessCallback={document => {
            Toaster.create().show({
              message: "Document supprimé",
              iconName: "tick",
              intent: Intent.SUCCESS
            });
            if (closeModal) {
              closeModal();
            }
          }}
          successCallback={document => {
            Toaster.create().show({
              message: "Données mises à jour",
              iconName: "tick",
              intent: Intent.SUCCESS
            });
            // close the modal on edit mode
            if (closeModal) {
              closeModal();
            }
            // go back to the previous page
            browserHistory.goBack();
          }}
          {...otherProps}
        />
      </div>
    ) : null}
  </div>
);

export default CollectionItemForm;
registerComponent("CollectionItemForm", CollectionItemForm, withCurrentUser);
