import React from "react";
import { LeftMenuLayout } from "meteor/vulcan:more-material-ui";
import {
  Components,
  replaceComponent,
  withCurrentUser
} from "meteor/vulcan:core";
import { getAuthorizedBackofficeMenuItems } from "meteor/vulcan:backoffice-builder";

import GithubButton from "./GithubButton";

const Layout = ({ children, currentUser }) => {
  const adminMenuItems = getAuthorizedBackofficeMenuItems(currentUser);
  return (
    <LeftMenuLayout
      headerProps={{
        headerRight: (
          <React.Fragment>
            <Components.UserIndicator />
            <GithubButton />
          </React.Fragment>
        )
      }}
      menuProps={{
        adminMenuItems
      }}
    >
      {children}
    </LeftMenuLayout>
  );
};

replaceComponent({
  name: "Layout",
  component: Layout,
  hocs: [withCurrentUser]
});
