import React from "react";

import { registerComponent, withMulti, Components } from "meteor/vulcan:core";

import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import LinkButton from "./LinkButton";
import moment from "moment";

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

const ApplicationItem = ({
  item: { name, description, links, createdAt },
  classes
}) => (
  <Card className={classes.card}>
    <CardContent className={classes.content}>
      <Typography variant="title" component="h2">
        {name}
      </Typography>
      <Typography className={classes.description} component="p">
        {description}
      </Typography>
    </CardContent>
    <CardActions>
      <Grid container className={classes.actions}>
        <Grid item>
          {links.map(link => (
            <LinkButton key={link} href={link} />
          ))}
        </Grid>
        <Grid item className={classes.dateWrapper}>
          <Typography variant="caption">
            {moment(createdAt).format("ll")}
          </Typography>
        </Grid>
      </Grid>
    </CardActions>
  </Card>
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
    selector: { _valid: { $eq: true } }
  }
};
registerComponent({
  name: "Applications",
  component: Applications,
  hocs: [[withMulti, withMultiOptions]]
});
export default Applications;
