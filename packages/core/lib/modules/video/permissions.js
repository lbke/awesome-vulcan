import Users from 'meteor/vulcan:users';

Users.groups.members.can([
  'Videos.create',
  'Videos.update.own',
  'Videos.delete.own',
]);

Users.groups.admins.can([
  'Videos.update.all',
  'Videos.delete.all,'
]);
