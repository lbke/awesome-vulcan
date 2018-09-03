import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { replaceComponent, Utils } from "meteor/vulcan:core";
import classNames from "classnames";

export class MuiButton extends Component {
  render() {
    const { label, children, className, ...otherProps } = this.props;

    return (
      <Button
        {...otherProps}
        className={classNames(`button-${Utils.slugify(label)}`, className)}
      >
        {label || children}
      </Button>
    );
  }
}

Button.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string
};

replaceComponent("Button", MuiButton);
