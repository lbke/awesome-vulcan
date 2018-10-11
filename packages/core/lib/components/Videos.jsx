import React from "react";

import { registerComponent, withMulti, Components } from "meteor/vulcan:core";

import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import LinkButton from "./LinkButton";

const styles = theme => ({
  card: {
    display: "flex",
    flexDirection: "column",
    height: "100%"
  },
  content: {
    paddingBottom: theme.spacing.unit,
    flexGrow: 1
  },
  description: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  actions: {
    justifyContent: "space-between"
  },
  dateWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  }
});

const VideoItem = ({ item: { title, link, createdAt }, classes }) => (
  <Card className={classes.card}>
    <CardContent className={classes.content}>
      <Typography variant="title" component="h2">
        {title}
      </Typography>
      {/*
        TODO: load an extract?
        <Typography className={classes.description} component="p">
        {description}
      </Typography>
*/}
    </CardContent>
    <CardActions>
      <Grid container className={classes.actions}>
        <Grid item>
          <LinkButton key={link} href={link} />
        </Grid>
        <Grid item className={classes.dateWrapper}>
          <Typography variant="caption">{createdAt}</Typography>
        </Grid>
      </Grid>
    </CardActions>
  </Card>
);
const StyledVideoItem = withStyles(styles)(VideoItem);
const Videos = ({ classes, ...otherProps }) => (
  <Components.ResultsGrid
    titleToken="core.video.title"
    ItemComponent={StyledVideoItem}
    {...otherProps}
    cols={1}
  />
);

const withMultiOptions = {
  collectionName: "Videos",
  limit: 10,
  terms: {
    selector: { _valid: { $eq: true } }
  }
};
registerComponent({
  name: "Videos",
  component: Videos,
  hocs: [[withMulti, withMultiOptions]]
});
export default Videos;
