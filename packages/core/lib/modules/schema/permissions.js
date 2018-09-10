import Users from "meteor/vulcan:users";

Users.groups.members.can([
  "schema.create",
  "schema.update.own",
  "schema.delete.own"
]);

Users.groups.admins.can(["schema.update.all", "schema.delete.all,"]);
