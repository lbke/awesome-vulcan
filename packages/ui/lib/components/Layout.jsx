import React from "react";
import { LeftMenuLayout } from "meteor/vulcan:more-material-ui";
import { replaceComponent, withCurrentUser } from "meteor/vulcan:core";
import { getAuthorizedBackofficeMenuItems } from "meteor/vulcan:backoffice-builder";

import GithubButton from "./GithubButton";

const Layout = ({ children, currentUser }) => {
  const adminMenuItems = getAuthorizedBackofficeMenuItems(currentUser);
  return (
    <LeftMenuLayout
      headerProps={{
        headerRight: <GithubButton />
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
