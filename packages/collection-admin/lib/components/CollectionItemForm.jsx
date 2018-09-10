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
import { toast } from "react-toastify";
import { getCollectionDisplayName } from "../modules/namingHelpers";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ArrowLeftBoldIcon from "mdi-material-ui/ArrowLeftBold";
import { Link, browserHistory } from "react-router";
import { FormattedMessage, intlShape } from "meteor/vulcan:i18n";

import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  addButtonWrapper: {
    textAlign: "right"
  },
  headerWrapper: {
    padding: theme.spacing.unit * 4
  }
});

export const CollectionItemForm = (
  {
    collection,
    currentUser,
    documentId,
    mutationFragment,
    queryFragment,
    closeModal,
    router,
    baseRoute,
    fields,
    headerText,

    submitCallback,
    successCallback,

    classes,
    ...otherProps
  },
  { intl }
) => (
  <div>
    <Grid container className={classes.headerWrapper}>
      <Grid item sm={6} xs={12}>
        <Typography variant="title" color="inherit" className="tagline">
          {headerText || (
            <span>
              <FormattedMessage
                id={`collectionAdmin.default.${documentId ? "edit" : "new"}`}
              />
              {` ${collection.typeName}`}
            </span>
          )}
        </Typography>
      </Grid>
      <Grid item sm={6} xs={12} className={classes.addButtonWrapper}>
        <Components.Button
          onClick={() => browserHistory.goBack()}
          variant="contained"
          color="secondary"
        >
          <ArrowLeftBoldIcon />
          <FormattedMessage id="collectionAdmin.default.go_back" />
        </Components.Button>
      </Grid>
    </Grid>
    {(documentId || collection.options.mutations.new.check(currentUser)) && (
      <div>
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
            toast.error(
              intl.formatMessage({
                id: "collectionAdmin.collectionItemForm.error"
              })
            );
          }}
          removeSuccessCallback={document => {
            toast.success(
              intl.formatMessage({
                id: "collectionAdmin.collectionItemForm.deleted"
              })
            );
            if (closeModal) {
              closeModal();
            }
          }}
          submitCallback={submitCallback || undefined}
          successCallback={document => {
            if (successCallback) {
              successCallback(document);
            }
            toast.success(
              intl.formatMessage({
                id: "collectionAdmin.collectionItemForm.updated"
              })
            );
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
    )}
  </div>
);

CollectionItemForm.contextTypes = {
  intl: intlShape
};
export default CollectionItemForm;
registerComponent("CollectionItemForm", CollectionItemForm, withCurrentUser, [
  withStyles,
  styles
]);
