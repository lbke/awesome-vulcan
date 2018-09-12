import Users from "meteor/vulcan:users";

Users.groups.members.can([
  "course.create",
  "course.update.own",
  "course.delete.own"
]);

Users.groups.admins.can(["course.update.all", "course.delete.all"]);
