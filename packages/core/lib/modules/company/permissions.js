import Users from "meteor/vulcan:users";

Users.groups.members.can([
  "company.create",
  "company.update.own",
  "company.delete.own"
]);

Users.groups.admins.can(["company.update.all", "company.delete.all,"]);
