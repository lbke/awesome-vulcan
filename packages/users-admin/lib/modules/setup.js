import Users from "meteor/vulcan:users";
import { setupCollectionAdminPages } from "meteor/collection-admin";
import { registerMenuItem } from "meteor/menu";

setupCollectionAdminPages(Users, {
  list: {
    basicColumns: ["_id", "createdAt", "username", "email", "isAdmin", "groups"]
  },
  details: {
    fields: ["_id", "createdAt", "username", "email", "isAdmin", "groups"]
  },
  form: {
    newFields: ["username", "email", "_password", "groups", "isAdmin"],
    editFields: ["_id", "createdAt", "username", "email", "groups", "isAdmin"]
  }
});
registerMenuItem("users", { label: "Users", path: "/users" });
