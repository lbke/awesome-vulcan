import Users from "meteor/vulcan:users";

Users.groups.members.can([
  "package.create",
  "package.update.own",
  "package.delete.own"
]);

Users.groups.admins.can(["package.update.all", "package.delete.all,"]);
