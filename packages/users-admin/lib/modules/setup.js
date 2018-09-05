import Users from "meteor/vulcan:users";
import { setupCollectionAdminPages } from "meteor/collection-admin";
import { registerMenuItem } from "meteor/menu";

setupCollectionAdminPages(Users, {
  list: {
    basicColumns: [
      "_id",
      "createdAt",
      "username",
      "email",
      "isAdmin",
      "groups"
    ],
    accessGroups: ["admins"],
    accessRedirect: "/"
  },
  details: {
    fields: ["_id", "createdAt", "username", "email", "isAdmin", "groups"],
    accessGroups: ["admins"],
    accessRedirect: "/"
  },
  form: {
    newFields: ["username", "email", "_password", "groups", "isAdmin"],
    editFields: [
      "_id",
      "createdAt",
      "username",
      "email",
      "_password",
      "groups",
      "isAdmin"
    ],
    accessGroups: ["admins"],
    accessRedirect: "/"
  }
});
registerMenuItem("users", {
  label: "Users",
  path: "/users",
  groups: ["admins"],
  parent: "admin"
});
