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
import PencilIcon from "mdi-material-ui/Pencil";

import { getCollectionName } from "../modules/namingHelpers";

const CollectionItemDetails = ({
  loading,
  document,
  currentUser,
  baseRoute,
  editRoute = "/edit",
  collection,

  editText = "Editer",
  headerText,

  fields
}) => {
  return loading ? (
    <Loading />
  ) : (
    <div direction="column" style={{ width: "100%" }}>
      {collection.options.mutations.edit.check(currentUser, document) ? (
        <div>
          <Components.Button
            href={`${baseRoute}/${document._id}${editRoute}`}
            variant="contained"
            color="secondary"
          >
            <PencilIcon />
            {editText}
          </Components.Button>
        </div>
      ) : null}
      <div>
        <h2>{headerText || `${getCollectionName(collection)}`}</h2>
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
  withCurrentUser
);
