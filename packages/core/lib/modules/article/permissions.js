import Users from "meteor/vulcan:users";

Users.groups.members.can([
  "article.create",
  "article.update.own",
  "article.delete.own"
]);

Users.groups.admins.can(["article.update.all", "article.delete.all,"]);
