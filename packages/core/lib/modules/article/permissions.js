import Users from 'meteor/vulcan:users';

Users.groups.members.can([
  'Articles.create',
  'Articles.update.own',
  'Articles.delete.own',
]);

Users.groups.admins.can([
  'Articles.update.all',
  'Articles.delete.all,'
]);
