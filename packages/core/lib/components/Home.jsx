import React, { PureComponent } from "react";
import {
  withCurrentUser,
  Components,
  registerComponent
} from "meteor/vulcan:core";
import homeContent from "../static-content/en/home.js";
import { FormattedMessage } from "meteor/vulcan:i18n";
import Typography from "@material-ui/core/Typography";

class Home extends PureComponent {
  render() {
    const { currentUser } = this.props;
    return (
      <div>
        {homeContent && <Components.Markdown source={homeContent} />}
        {!currentUser && (
          <div>
            <Typography variant="headline">
              <FormattedMessage id="core.signupOrLogin" />
            </Typography>
            <Components.AccountsLoginForm />
          </div>
        )}
      </div>
    );
  }
}

registerComponent({
  name: "Home",
  component: Home,
  hocs: [withCurrentUser]
});

export default Home;
