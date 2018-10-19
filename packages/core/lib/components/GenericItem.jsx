import React from "react";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import OneLineText from "./OneLineText";
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

export const GenericItem = ({
  title,
  link,
  links,
  createdAt,
  content,
  classes
}) => {
  if (link) {
    links = [link];
  }
  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <OneLineText
          Component={Typography}
          variant="title"
          component="h2"
          text={title}
        />
        {content && (
          <Typography className={classes.description} component="p">
            {content}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Grid container className={classes.actions}>
          {links && links.length ? (
            <Grid item>
              {links.map(link => (
                <LinkButton key={link} href={link} />
              ))}
            </Grid>
          ) : null}
          <Grid item className={classes.dateWrapper}>
            <Typography variant="caption">
              {moment(createdAt).format("ll")}
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};
const StyledGenericItem = withStyles(styles)(GenericItem);

export default StyledGenericItem;
