import Users from "meteor/vulcan:users";
import { setupCollectionAdminPages } from "meteor/collection-admin";
import { registerMenuItem } from "meteor/menu";

setupCollectionAdminPages(Users, {
  list: {
    basicColumns: ["_id", "createdAt", "email", "isAdmin", "groups"]
  },
  details: {
    fields: [
      "_id",
      "createdAt",
      "isAdmin",
      "displayName",
      "username",
      "email",
      "groups"
    ]
  }
});
registerMenuItem("users", { label: "Users", path: "/users" });
