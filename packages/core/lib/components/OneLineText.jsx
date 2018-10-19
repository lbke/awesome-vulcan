import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  cutText: {
    maxWidth: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
};
const OneLineText = ({
  Component = "span",
  text,
  classes,
  children,
  ...otherProps
}) => (
  <Component title={text} className={classes.cutText} {...otherProps}>
    {text}
  </Component>
);
export default withStyles(styles)(OneLineText);
