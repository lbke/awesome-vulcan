import React from "react";
import PropTypes from "prop-types";
import { Components, registerComponent } from "meteor/vulcan:core";
import MinusIcon from "mdi-material-ui/Minus";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  buttonWrapper: {
    marginBottom: theme.spacing.unit * 2
  },
  wrapper: {
    paddingLeft: theme.spacing.unit * 2,
    borderLeft: "4px solid #eeeeee"
  }
});

const ArrayOfNestedItem = (
  { field, name, path, removeItem, itemIndex, classes, ...props },
  { errors }
) => {
  const isArray = typeof itemIndex !== "undefined";
  return (
    <Grid container className={classes.wrapper} alignItems="center">
      <Grid className={classes.inputWrapper} item style={{ flexGrow: 1 }}>
        {
          <Components.FormComponent
            key={name}
            {...props}
            {...(field || {})}
            name={name}
            path={path}
            itemIndex={itemIndex}
            hideLabel={true}
          />
        }
      </Grid>
      {isArray &&
        removeItem && (
          <Grid item key="remove-button" className={classes.buttonWrapper}>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => {
                removeItem(name);
              }}
            >
              <MinusIcon />
            </Button>
          </Grid>
        )}
    </Grid>
  );
};

ArrayOfNestedItem.propTypes = {
  path: PropTypes.string.isRequired,
  itemIndex: PropTypes.number
};

ArrayOfNestedItem.contextTypes = {
  errors: PropTypes.array
};

export default ArrayOfNestedItem;

registerComponent({
  name: "ArrayOfNestedItem",
  component: ArrayOfNestedItem,
  hocs: [[withStyles, styles]]
});
