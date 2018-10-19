import React from "react";

import { registerComponent, withMulti, Components } from "meteor/vulcan:core";

import { withStyles } from "@material-ui/core/styles";
import withSearch from "./withSearch";

import GenericItem from "./GenericItem";

const styles = theme => ({});

const ArticleItem = ({ item: { title, link, createdAt }, classes }) => (
  <GenericItem title={title} link={link} createdAt={createdAt} />
);
const StyledArticleItem = withStyles(styles)(ArticleItem);
const Articles = ({ classes, ...otherProps }) => (
  <Components.ResultsGrid
    createPath="/admin/articles/create"
    titleToken="core.article.title"
    ItemComponent={StyledArticleItem}
    {...otherProps}
    cols={2}
  />
);

const withMultiOptions = {
  collectionName: "Articles",
  limit: 10,
  terms: {
    view: "validOnlyView"
  }
};
registerComponent({
  name: "Articles",
  component: Articles,
  hocs: [withSearch, [withMulti, withMultiOptions]]
});
export default Articles;
