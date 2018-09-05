import React from "react";
import PropTypes from "prop-types";
import {
  Components,
  registerComponent,
  withCurrentUser
} from "meteor/vulcan:core";
import { browserHistory } from "react-router";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import ExpandLessIcon from "mdi-material-ui/ChevronUp";
import ExpandMoreIcon from "mdi-material-ui/ChevronDown";
import LockIcon from "mdi-material-ui/Lock";
import UsersIcon from "mdi-material-ui/AccountMultiple";
import ThemeIcon from "mdi-material-ui/Palette";
import HomeIcon from "mdi-material-ui/Home";
import withStyles from "@material-ui/core/styles/withStyles";
import Users from "meteor/vulcan:users";

import { getMenuItems } from "meteor/menu";
import _partition from "lodash/partition";

const styles = theme => ({
  root: {},
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

class SideNavigation extends React.Component {
  state = {
    isOpen: { admin: true }
  };

  toggle = item => {
    const newState = { isOpen: {} };
    newState.isOpen[item] = !this.state.isOpen[item];
    this.setState(newState);
  };

  render() {
    const currentUser = this.props.currentUser;
    const classes = this.props.classes;
    const isOpen = this.state.isOpen;

    // ignores items the user can't see
    const menuItems = getMenuItems();
    const authorizedMenuItems = menuItems.filter(({ groups }) => {
      // items without groups are visible by guests too
      if (!groups) return true;
      if (Users.isMemberOf(currentUser, groups)) return true;
      return false;
    });
    const splitItems = _partition(authorizedMenuItems, ["parent", "admin"]);
    const adminMenuItems = splitItems[0];
    const basicMenuItems = splitItems[1];

    return (
      <div className={classes.root}>
        <List>
          <ListItem
            button
            onClick={() => {
              browserHistory.push("/");
            }}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText inset primary="Home" />
          </ListItem>
        </List>
        {basicMenuItems.length > 0 && (
          <List>
            {menuItems.map(({ label, path }) => (
              <ListItem
                key={label}
                button
                onClick={() => browserHistory.push(path)}
              >
                <ListItemText primary={label} />
              </ListItem>
            ))}
          </List>
        )}

        {adminMenuItems.length > 0 && (
          <div>
            <Divider />
            <List>
              <ListItem button onClick={e => this.toggle("admin")}>
                <ListItemIcon>
                  <LockIcon />
                </ListItemIcon>
                <ListItemText primary="Admin" />
                {isOpen.admin ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>
              <Collapse
                in={isOpen.admin}
                transitionduration="auto"
                unmountOnExit
              >
                {adminMenuItems.map(({ label, path }) => (
                  <ListItem
                    key={label}
                    button
                    onClick={() => browserHistory.push(path)}
                  >
                    <ListItemText primary={label} />
                  </ListItem>
                ))}
              </Collapse>
            </List>
          </div>
        )}
      </div>
    );
  }
}

SideNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object
};

SideNavigation.displayName = "SideNavigation";

registerComponent(
  "SideNavigation",
  SideNavigation,
  [withStyles, styles],
  withCurrentUser
);
