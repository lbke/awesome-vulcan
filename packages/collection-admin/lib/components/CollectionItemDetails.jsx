/**
 * Generic page for a collection element
 *
 * Must be handled by the parent :
 * - the document, using withDocument and options
 * - the FormComponent
 * - the viewableFields
 */

import React from "react";
import {
  registerComponent,
  Components,
  Loading,
  withCurrentUser
} from "meteor/vulcan:core";
import { FormattedMessage, intlShape } from "meteor/vulcan:i18n";
import PencilIcon from "mdi-material-ui/Pencil";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router";

import { getCollectionDisplayName } from "../modules/namingHelpers";

import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  addButtonWrapper: {
    textAlign: "right"
  },
  headerWrapper: {
    padding: theme.spacing.unit * 4
  }
});
const CollectionItemDetails = ({
  loading,
  document,
  currentUser,
  baseRoute,
  editRoute = "/edit",
  collection,

  editText,
  editTextToken,
  headerText,
  headerTextToken,

  fields,

  classes
}) => {
  return loading ? (
    <Loading />
  ) : (
    <div>
      <Grid container className={classes.headerWrapper}>
        <Grid item sm={6} xs={12}>
          <Typography variant="title" color="inherit" className="tagline">
            {headerText ||
              (headerTextToken && <FormattedMessage id={headerTextToken} />) ||
              getCollectionDisplayName(collection)}
          </Typography>
        </Grid>
        {collection.options.mutations.edit.check(currentUser, document) && (
          <Grid item sm={6} xs={12} className={classes.addButtonWrapper}>
            <Components.Button
              component={Link}
              to={`${baseRoute}/${document._id}${editRoute}`}
              variant="contained"
              color="secondary"
            >
              <PencilIcon />
              {editText || (
                <FormattedMessage
                  id={editTextToken || "collectionAdmin.default.edit"}
                />
              )}
            </Components.Button>
          </Grid>
        )}
      </Grid>
      <div>
        <Components.Card
          canEdit={false}
          collection={collection}
          document={document}
          currentUser={currentUser}
          fields={fields}
        />
      </div>
    </div>
  );
};

registerComponent(
  "CollectionItemDetails",
  CollectionItemDetails,
  withCurrentUser,
  [withStyles, styles]
);
