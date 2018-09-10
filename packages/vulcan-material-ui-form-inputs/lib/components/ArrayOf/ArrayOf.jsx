import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Components, registerComponent } from "meteor/vulcan:core";
import PlusIcon from "mdi-material-ui/Plus";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import "./NestedItem";

const styles = theme => ({
  addButtonWrapper: {
    textAlign: "center"
  }
});
export const arrayOf = C => {
  const ArrayOfWrapper = ({ ...props }) => (
    <ArrayOf ChildComponent={C} {...props} />
  );
  return ArrayOfWrapper;
};

class ArrayOf extends PureComponent {
  getCurrentValue() {
    return this.props.value || [];
  }

  addItem = () => {
    const value = this.getCurrentValue();
    this.props.updateCurrentValues({
      [`${this.props.path}.${value.length}`]: undefined
    });
  };

  removeItem = index => {
    const currentValue = this.getCurrentValue();
    const newValue = [...currentValue];
    newValue.splice(index, 1);
    this.props.updateCurrentValues({ [`${this.props.path}`]: newValue });
  };

  render() {
    const value = this.getCurrentValue();
    // do not pass FormNested's own value, input and inputProperties props down
    const properties = _.omit(
      this.props,
      "value",
      "input",
      "inputProperties",
      "nestedInput",
      "classes",
      "arrayField",
      "arrayFieldSchema",
      "itemIndex"
    );
    const {
      classes,
      errors,
      path,
      arrayField,
      showNextField = true,
      ChildComponent = Components.ArrayOfNestedItem // default component
    } = this.props;
    // only keep errors specific to the nested array (and not its subfields)
    const nestedArrayErrors = errors.filter(
      error => error.path && error.path === path
    );
    const hasErrors = nestedArrayErrors && nestedArrayErrors.length;

    const fields = showNextField ? [...value, undefined] : value;

    return (
      <Grid
        container
        className={`form-group row form-nested ${
          hasErrors ? "input-error" : ""
        }`}
      >
        <Grid item md={12}>
          <Typography variant="subheading">
            <label className="control-label col-sm-3">{this.props.label}</label>
          </Typography>
        </Grid>
        <Grid item md={12}>
          {fields.map((subValue, i) => (
            <ChildComponent
              value={subValue}
              {...properties}
              key={i}
              itemIndex={i}
              path={`${this.props.path}.${i}`}
              // an additonnal field can be displayed to avoid the need of pressing the plus button
              // this field should not be removable though
              removeItem={
                showNextField && i === fields.length - 1
                  ? undefined
                  : () => {
                      this.removeItem(i);
                    }
              }
              field={arrayField}
            />
          ))}
        </Grid>
        {!showNextField && (
          <Grid item md={12} className={classes.addButtonWrapper}>
            <Button color="primary" variant="contained" onClick={this.addItem}>
              <PlusIcon />
            </Button>
          </Grid>
        )}
        <Grid item md={12}>
          {hasErrors ? (
            <Components.FieldErrors errors={nestedArrayErrors} />
          ) : null}
        </Grid>
      </Grid>
    );
  }
}
registerComponent({
  name: "ArrayOf",
  component: ArrayOf,
  hocs: [[withStyles, styles]]
});
export default ArrayOf;

ArrayOf.propTypes = {
  currentValues: PropTypes.object,
  path: PropTypes.string,
  label: PropTypes.string,
  // if true next field is automatically printed
  // if false user must manually press an "add" button
  showNextField: PropTypes.bool
};
