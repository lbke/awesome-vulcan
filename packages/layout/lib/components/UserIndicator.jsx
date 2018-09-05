import React from "react";
import {
  Components,
  registerComponent,
  withCurrentUser
} from "meteor/vulcan:core";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { Accounts } from "meteor/vulcan:accounts";
const UserIndicator = ({ currentUser, router }) =>
  !currentUser ? (
    <Button color="inherit" href="/">
      Connexion
    </Button>
  ) : (
    <Button
      color="inherit"
      onClick={() => {
        // TODO: develop a signout method
        Accounts.logout(Accounts.ui._options.onSignedOutHook);
      }}
    >
      Déconnexion
    </Button>
  );
registerComponent("UserIndicator", UserIndicator, withCurrentUser);

export default UserIndicator;
