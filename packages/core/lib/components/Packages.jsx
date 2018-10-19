import React from "react";

import { registerComponent, withMulti, Components } from "meteor/vulcan:core";

import { withStyles } from "@material-ui/core/styles";

import GenericItem from "./GenericItem";

const styles = theme => ({});

const PackageItem = ({
  item: { name, description, links = [], createdAt },
  classes
}) => (
  <GenericItem
    title={name}
    content={description}
    links={links}
    createdAt={createdAt}
  />
);
const StyledPackageItem = withStyles(styles)(PackageItem);
const Packages = ({ classes, ...otherProps }) => (
  <Components.ResultsGrid
    createPath="/admin/packages/create"
    titleToken="core.package.title"
    ItemComponent={StyledPackageItem}
    {...otherProps}
  />
);

const withMultiOptions = {
  collectionName: "Packages",
  limit: 10,
  terms: {
    view: "validOnlyView"
  }
};
registerComponent({
  name: "Packages",
  component: Packages,
  hocs: [[withMulti, withMultiOptions]]
});
export default Packages;
