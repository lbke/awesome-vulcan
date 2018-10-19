import React from "react";

import { registerComponent, withMulti, Components } from "meteor/vulcan:core";

import { withStyles } from "@material-ui/core/styles";

import GenericItem from "./GenericItem";
import withSearch from "./withSearch";

const styles = theme => ({});

const VideoItem = ({ item: { title, link, createdAt }, classes }) => (
  <GenericItem title={title} link={link} createdAt={createdAt} />
);
const StyledVideoItem = withStyles(styles)(VideoItem);
const Videos = ({ classes, ...otherProps }) => (
  <Components.ResultsGrid
    createPath="/admin/packages/create"
    titleToken="core.video.title"
    ItemComponent={StyledVideoItem}
    {...otherProps}
    cols={2}
  />
);

const withMultiOptions = {
  collectionName: "Videos",
  limit: 10,
  terms: {
    view: "validOnlyView"
  }
};
registerComponent({
  name: "Videos",
  component: Videos,
  hocs: [withSearch, [withMulti, withMultiOptions]]
});
export default Videos;
