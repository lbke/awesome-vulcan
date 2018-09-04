import React from "react";
import {
  registerComponent,
  getComponent,
  withDelete,
  Components
} from "meteor/vulcan:core";
import EyeOutlineIcon from "mdi-material-ui/EyeOutline";
import PencilIcon from "mdi-material-ui/Pencil";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CloseIcon from "mdi-material-ui/Close";
import { Link } from "react-router";
import { getCollectionDisplayName } from "../../modules/namingHelpers";

export const buildActionsColumn = ({
  collection,
  name = "Actions",
  baseRoute,
  editRoute
}) => {
  // build the component
  const component = ({ document, currentUser, ...otherProps }) => {
    return (
      <div justify="space-around" align="center">
        <IconButton
          component={Link}
          to={`${baseRoute}/${document._id}`}
          variant="fab"
          color="primary"
        >
          <EyeOutlineIcon />
        </IconButton>
        {collection.options.mutations.edit.check(currentUser, document) ? (
          <IconButton
            component={Link}
            to={`${baseRoute}/${document._id}${editRoute}`}
            variant="fab"
            color="primary"
          >
            <PencilIcon />
          </IconButton>
        ) : null}
        {collection.options.mutations.delete.check(currentUser, document) ? (
          <Components.ModalTrigger
            size="small"
            component={
              <IconButton variant="fab" color="primary">
                <CloseIcon />
              </IconButton>
            }
          >
            <DeleteModalContent
              collection={collection}
              document={document}
              {...otherProps}
            />
          </Components.ModalTrigger>
        ) : null}
      </div>
    );
  };
  // we need to register it in order to provide it relevant HOC
  const componentName = getCollectionDisplayName(collection) + "ActionButtons";
  component.displayName = componentName;
  registerComponent({
    name: componentName,
    component,
    hocs: [[withDelete, { collection }]]
  });
  return {
    name,
    component: getComponent(componentName)
  };
};

const DeleteModalContent = ({
  collection,
  closeModal,
  document,
  ...otherProps
}) => {
  return (
    <div style={{ textAlign: "center" }}>
      <Button
        onClick={() => {
          otherProps["delete" + collection.options.typeName]({
            selector: { _id: document._id }
          });
          closeModal();
        }}
      >
        Confirmer la suppression ?
      </Button>
    </div>
  );
};
export default buildActionsColumn;
