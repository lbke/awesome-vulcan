import React from "react";

import { registerComponent, withMulti, Components } from "meteor/vulcan:core";

import { withStyles } from "@material-ui/core/styles";
import withSearch from "./withSearch";

import GenericItem from "./GenericItem";

const styles = theme => ({});

const ApplicationItem = ({
  item: { name, description, links, createdAt },
  classes
}) => (
  <GenericItem
    title={name}
    content={description}
    links={links}
    createdAt={createdAt}
  />
);
const StyledApplicationItem = withStyles(styles)(ApplicationItem);
const Applications = ({ classes, ...otherProps }) => (
  <Components.ResultsGrid
    titleToken="core.application.title"
    createPath="/admin/applications/create"
    ItemComponent={StyledApplicationItem}
    {...otherProps}
  />
);

const withMultiOptions = {
  collectionName: "Applications",
  limit: 10,
  terms: {
    view: "validOnlyView"
  }
};
registerComponent({
  name: "Applications",
  component: Applications,
  hocs: [withSearch, [withMulti, withMultiOptions]]
});
export default Applications;
