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
import { Link } from "react-router";

const CollectionItemDetails = ({
  loading,
  document,
  currentUser,
  baseRoute,
  editRoute = "/edit",
  collection,

  editText = "Editer",
  headerText = "Item",

  FormComponent,

  displayedSchemaFields = []
}) => {
  return loading ? (
    <Loading />
  ) : (
    <div direction="column" style={{ width: "100%" }}>
      {collection.options.mutations.edit.check(currentUser, document) ? (
        <div px={16} py={24}>
          <Link to={`${baseRoute}/${document._id}${editRoute}`}>
            <Components.Button
              className="pt-large pt-intent-primary"
              iconName="edit"
            >
              Editer
            </Components.Button>
          </Link>
        </div>
      ) : null}
      <div px={16} py={24}>
        <h2>{headerText}</h2>
        <Components.Card
          canEdit={false}
          collection={collection}
          document={document}
          currentUser={currentUser}
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
