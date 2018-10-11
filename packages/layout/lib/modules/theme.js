import { registerSetting } from "meteor/vulcan:core";
import {
  registerTheme,
  getCurrentTheme
} from "meteor/erikdakoda:vulcan-material-ui";
import indigo from "@material-ui/core/colors/indigo";
import blue from "@material-ui/core/colors/blue";
import pink from "@material-ui/core/colors/pink";
import lime from "@material-ui/core/colors/lime";
import cyan from "@material-ui/core/colors/cyan";
import red from "@material-ui/core/colors/red";

/** @ignore */

/**
 *
 * For a complete list of configuration variables see:
 * https://material-ui-next.com/customization/themes/
 *
 */

const theme = {
  palette: {
    primary: cyan,
    secondary: pink,
    error: red
  },

  utils: {
    tooltipEnterDelay: 700,

    errorMessage: {
      textAlign: "center",
      backgroundColor: red[500],
      color: "white",
      borderRadius: "4px",
      fontWeight: "bold"
    },

    denseTable: {
      "& > thead > tr > th, & > tbody > tr > td": {
        padding: "4px 16px 4px 16px"
      },
      "& > thead > tr > th:last-child, & > tbody > tr > td:last-child": {
        paddingRight: "16px"
      }
    },

    flatTable: {
      "& > thead > tr > th, & > tbody > tr > td": {
        padding: "4px 16px 4px 16px"
      },
      "& > thead > tr > th:last-child, & > tbody > tr > td:last-child": {
        paddingRight: "16px"
      }
    },

    denserTable: {
      "& > thead > tr, & > tbody > tr": {
        height: "40px"
      },
      "& > thead > tr > th, & > tbody > tr > td": {
        padding: "4px 8px 4px 8px"
      },
      "& > thead > tr > th:last-child, & > tbody > tr > td:last-child": {
        paddingRight: "16px"
      }
    }
  }
};

registerTheme("AwesomeVulcanDefault", theme);
registerSetting("muiTheme", "AwesomeVulcanDefault");
