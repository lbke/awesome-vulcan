import React from "react";

import { registerComponent, withMulti, Components } from "meteor/vulcan:core";

import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import LinkVariantIcon from "mdi-material-ui/LinkVariant";
import GithubCircleIcon from "mdi-material-ui/GithubCircle";
import YoutubeIcon from "mdi-material-ui/Youtube";

// auto detect github, social networks, etc. from links
const getLinkType = href => {
  if (href.match("github")) return "github";
  if (href.match("youtube")) return "youtube";
  return "default";
};
const getIcon = linkType => {
  switch (linkType) {
    case "github":
      return <GithubCircleIcon />;
    case "youtube":
      return <YoutubeIcon />;
    default:
      return <LinkVariantIcon />;
  }
};
const LinkButton = ({ href }) => {
  const linkType = getLinkType(href);
  let selectedIcon = getIcon(linkType);
  return (
    <IconButton
      href={href}
      target="_blank"
      title="Open in new tab"
      variant="fab"
      color="primary"
    >
      {selectedIcon}
    </IconButton>
  );
};
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
  },
  loadMoreWrapper: {
    textAlign: "center",
    padding: theme.spacing.unit
  }
});
const Applications = ({
  loadingMore,
  totalCount,
  count,
  loadMore,
  loading,
  results: applications,
  classes
}) => {
  if (loading) return <Components.Loading />;

  const hasMore = count < totalCount;

  return (
    <Grid container spacing={8}>
      <Grid item>
        <Typography variant="display2" component="h1">
          Built with Vulcan.js
        </Typography>
      </Grid>
      <Grid item>
        <Grid container spacing={16}>
          {applications.map(({ _id, createdAt, name, description, links }) => (
            <Grid key={_id} item xs={12} md={6}>
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
                        <LinkButton href={link} />
                      ))}
                    </Grid>
                    <Grid item className={classes.dateWrapper}>
                      <Typography variant="caption">{createdAt}</Typography>
                    </Grid>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.loadMoreWrapper}>
        {hasMore &&
          (loadingMore ? (
            <Components.Loading />
          ) : (
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => loadMore()}
            >
              Load more
            </Button>
          ))}
      </Grid>
    </Grid>
  );
};

const withMultiOptions = {
  collectionName: "Applications",
  limit: 2,
  terms: {
    selector: { _valid: { $eq: true } }
  }
};
registerComponent({
  name: "Applications",
  component: Applications,
  hocs: [[withMulti, withMultiOptions], [withStyles, styles]]
});
export default Applications;
