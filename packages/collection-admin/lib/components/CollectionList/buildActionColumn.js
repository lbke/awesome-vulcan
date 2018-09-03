import React from "react";
import EyeOutlineIcon from "mdi-material-ui/EyeOutline";
import PencilIcon from "mdi-material-ui/Pencil";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router";

export const buildActionsColumn = ({
  collection,
  name = "Actions",
  baseRoute,
  editRoute
}) => ({
  name,
  component: ({ document, currentUser }) => {
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
      </div>
    );
  }
});
export default buildActionsColumn;
