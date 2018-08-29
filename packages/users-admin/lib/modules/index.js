import "./routes";
import "./components";

import Users from "meteor/vulcan:users";
import { setupCollectionAdminPages } from "meteor/collection-admin";

setupCollectionAdminPages(Users);
