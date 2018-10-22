import React from "react";
import { LeftMenuLayout } from "meteor/vulcan:more-material-ui";
import { replaceComponent } from "meteor/vulcan:core";

const Layout = ({ children }) => <LeftMenuLayout>{children}</LeftMenuLayout>;

replaceComponent("Layout", Layout);
