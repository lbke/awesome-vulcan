import React from "react";
import {
  Components,
  registerComponent,
  withCurrentUser
} from "meteor/vulcan:core";
import Button from "@material-ui/core/Button";
import { Accounts } from "meteor/vulcan:accounts";
import { FormattedMessage } from "meteor/vulcan:i18n";

const UserIndicator = ({ currentUser, router }) =>
  !currentUser ? (
    <Button color="inherit" href="/">
      <FormattedMessage id={"layout.user.signin"} />
    </Button>
  ) : (
    <Button
      color="inherit"
      onClick={() => {
        // TODO: develop a signout method
        Accounts.logout(Accounts.ui._options.onSignedOutHook);
      }}
    >
      <FormattedMessage id={"layout.user.signout"} />
    </Button>
  );
registerComponent("UserIndicator", UserIndicator, withCurrentUser);

export default UserIndicator;
