import Users from "meteor/vulcan:users";

Users.groups.members.can([
  "application.create",
  "application.update.own",
  "application.delete.own"
]);

Users.groups.admins.can(["application.update.all", "application.delete.all,"]);
