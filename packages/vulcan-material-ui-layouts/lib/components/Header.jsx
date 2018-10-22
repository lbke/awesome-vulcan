import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "mdi-material-ui/Menu";
import ChevronLeftIcon from "mdi-material-ui/ChevronLeft";
import withStyles from "@material-ui/core/styles/withStyles";
import { getSetting, Components, registerComponent } from "meteor/vulcan:core";
import classNames from "classnames";
import GithubButton from "./GithubButton";

const drawerWidth = 240;
const topBarHeight = 100;
`

background: #4CA1AF;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #C4E0E5, #4CA1AF);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #C4E0E5, #4CA1AF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  background: #E0EAFC;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #CFDEF3, #E0EAFC);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #CFDEF3, #E0EAFC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

background: #2980b9;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #2c3e50, #2980b9);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #2c3e50, #2980b9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

background: #FEAC5E;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #4BC0C8, #C779D0, #FEAC5E);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #4BC0C8, #C779D0, #FEAC5E); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

`;
const styles = theme => ({
  appBar: {
    position: "absolute",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    color: "white",
    //background: "linear-gradient(to right, #4BC0C8, #C779D0, #FEAC5E)"
    //background: "linear-gradient(to right, #C4E0E5, #4CA1AF)"
    //background: "linear-gradient(to right, #d38312, #a83279)"
    //background: "linear-gradient(to right, #2c3e50, #2980b9)"
    //background: "linear-gradient(to left, #70e1f5, #ffd194)"
    //background: "linear-gradient(to right, #9d50bb, #6e48aa)"
    //background: "linear-gradient(to right, #c9ffbf, #ffafbd)"
    //background: "linear-gradient(to right, #b993d6, #8ca6db)"
    background: "linear-gradient(to left, #00d2ff, #3a7bd5)",
    backgroundColor: "#70e1f5"
  },

  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  toolbar: {
    height: `${topBarHeight}px`,
    minHeight: `${topBarHeight}px`
  },
  headerMid: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    "& h1": {
      margin: "0 24px 0 0",
      fontSize: "18px",
      lineHeight: 1
    }
  },
  menuButton: {
    marginRight: theme.spacing.unit * 3
  },
  logo: {
    maxHeight: "64px",
    marginRight: theme.spacing.unit * 2
  }
});

const Header = (props, context) => {
  const classes = props.classes;
  const isSideNavOpen = props.isSideNavOpen;
  const toggleSideNav = props.toggleSideNav;

  const siteTitle = getSetting("title", "My App");

  return (
    <AppBar
      className={classNames(
        classes.appBar,
        isSideNavOpen && classes.appBarShift
      )}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          aria-label="open drawer"
          onClick={e => toggleSideNav()}
          className={classNames(classes.menuButton)}
          color="inherit"
        >
          {isSideNavOpen ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>

        <div className={classNames(classes.headerMid)}>
          <img src="/img/awesome-vulcan-logo_64.png" className={classes.logo} />
          <Typography variant="title" color="inherit" className="tagline">
            {siteTitle}
          </Typography>
        </div>
        <Components.UserIndicator />
        <GithubButton />
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  isSideNavOpen: PropTypes.bool,
  toggleSideNav: PropTypes.func
};

Header.displayName = "Header";

registerComponent("Header", Header, [withStyles, styles]);
