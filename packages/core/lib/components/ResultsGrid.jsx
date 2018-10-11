import React from "react";

import { registerComponent, Components } from "meteor/vulcan:core";

import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { FormattedMessage } from "meteor/vulcan:i18n";

const styles = theme => ({
  loadMoreWrapper: {
    textAlign: "center",
    padding: theme.spacing.unit
  }
});
const ResultsGrid = ({
  loadingMore,
  totalCount,
  count,
  loadMore,
  loading,
  results,
  classes,
  ItemComponent,
  title,
  titleToken,
  cols = 2
}) => {
  if (loading) return <Components.Loading />;

  const hasMore = count < totalCount;

  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <Typography variant="display2" component="h1">
          {title || <FormattedMessage id={titleToken} />}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={16}>
          {results.map(result => (
            <Grid key={result._id} item xs={12} md={12 / cols}>
              <ItemComponent item={result} />
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
              <FormattedMessage id="common.load_more" />
            </Button>
          ))}
      </Grid>
    </Grid>
  );
};

registerComponent({
  name: "ResultsGrid",
  component: ResultsGrid,
  hocs: [[withStyles, styles]]
});
export default ResultsGrid;
