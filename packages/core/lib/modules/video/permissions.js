import Users from "meteor/vulcan:users";

Users.groups.members.can([
  "video.create",
  "video.update.own",
  "video.delete.own"
]);

Users.groups.admins.can(["video.update.all", "video.delete.all"]);
