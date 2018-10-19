import React from "react";
import PropTypes from "prop-types";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Components, replaceComponent, Utils } from "meteor/vulcan:core";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

const drawerWidth = 240;
const topBarHeight = 100;

const styles = theme => {
  const contentPadding = theme.spacing.unit * 2;
  return {
    "@global": {
      html: {
        background: theme.palette.background.default,
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        overflow: "hidden"
      },
      body: {
        margin: 0
      }
    },
    root: {
      width: "100%",
      zIndex: 1,
      overflow: "hidden"
    },
    appFrame: {
      position: "relative",
      display: "flex",
      height: "100vh",
      alignItems: "stretch"
    },
    drawerPaper: {
      position: "relative",
      width: drawerWidth,
      backgroundColor: theme.palette.background[200],
      // TODO: use an elevation instead?
      boxShadow:
        "0px 0px 6px -2px #000000, 2px 0px 4px -1px rgba(0, 0, 0, 0.2), 4px 0px 5px 0px rgba(0, 0, 0, 0.14), 1px 0px 10px 0px rgba(0, 0, 0, 0.12)"
    },
    drawerHeader: {
      height: `${topBarHeight}px !important`,
      minHeight: `${topBarHeight}px !important`,
      position: "relative !important",
      backgroundColor: "#3A7bd5"
    },
    content: {
      padding: contentPadding,
      paddingLeft: contentPadding + 8,
      width: "100%",
      marginLeft: -drawerWidth,
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      height: `calc(100% - ${topBarHeight}px - ${2 * contentPadding}px)`,
      marginTop: topBarHeight,
      overflowY: "scroll"
    },
    mainShift: {
      marginLeft: 0,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    }
  };
};

class Layout extends React.Component {
  state = {
    isOpen: { sideNav: true }
  };

  toggle = (item, openOrClose) => {
    const newState = { isOpen: {} };
    newState.isOpen[item] =
      typeof openOrClose === "string"
        ? openOrClose === "open"
        : !this.state.isOpen[item];
    this.setState(newState);
  };

  render = () => {
    const routeName = Utils.slugify(this.props.currentRoute.name);
    const classes = this.props.classes;
    const isOpen = this.state.isOpen;

    return (
      <div
        className={classNames(classes.root, "wrapper", `wrapper-${routeName}`)}
      >
        <div className={classes.appFrame}>
          <Components.Header
            isSideNavOpen={isOpen.sideNav}
            toggleSideNav={openOrClose => this.toggle("sideNav", openOrClose)}
          />

          <Drawer
            variant="persistent"
            classes={{ paper: classes.drawerPaper }}
            open={isOpen.sideNav}
            //elevation={12}
          >
            <AppBar
              className={classes.drawerHeader}
              elevation={4}
              square={true}
            >
              <Toolbar />
            </AppBar>
            <Components.SideNavigation />
          </Drawer>

          <main
            className={classNames(
              classes.content,
              isOpen.sideNav && classes.mainShift
            )}
          >
            {this.props.children}
          </main>

          <Components.FlashMessages />
          <Components.ToastContainer />
        </div>
      </div>
    );
  };
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node
};

Layout.displayName = "Layout";

replaceComponent("Layout", Layout, [withStyles, styles]);
