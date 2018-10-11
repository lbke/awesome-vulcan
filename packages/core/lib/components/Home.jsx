import React, { PureComponent } from "react";
import {
  withCurrentUser,
  Components,
  registerComponent
} from "meteor/vulcan:core";
import homeContent from "../static-content/en/home.js";
import { FormattedMessage } from "meteor/vulcan:i18n";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  imgWrapper: {
    textAlign: "center"
  },
  img: {
    maxWidth: "100%",
    width: "256px"
  }
};
class Home extends PureComponent {
  render() {
    const { classes, currentUser } = this.props;
    return (
      <Grid alignItems="center" container spacing={16}>
        <Grid item lg={6} md={3} sm={12} className={classes.imgWrapper}>
          <img
            className={classes.img}
            src="/img/awesome-vulcan-logo_512.png"
            alt="Awesome Vulcan Logo"
          />
        </Grid>
        <Grid item lg={6} md={9} sm={12}>
          {!currentUser ? (
            <div>
              <Typography variant="headline">
                <FormattedMessage id="core.signupOrLogin" />
              </Typography>
              <Components.AccountsLoginForm />
            </div>
          ) : (
            <div>
              <Typography variant="headline">
                <FormattedMessage id="core.home.loggedIn" />
              </Typography>
            </div>
          )}
        </Grid>
        <Grid item sm={12} xl={6}>
          {homeContent && <Components.Markdown source={homeContent} />}
        </Grid>
      </Grid>
    );
  }
}

registerComponent({
  name: "Home",
  component: Home,
  hocs: [withCurrentUser, [withStyles, styles]]
});

export default Home;
