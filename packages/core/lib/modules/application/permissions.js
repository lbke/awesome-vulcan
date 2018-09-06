import Users from 'meteor/vulcan:users';

Users.groups.members.can([
  'Applications.create',
  'Applications.update.own',
  'Applications.delete.own',
]);

Users.groups.admins.can([
  'Applications.update.all',
  'Applications.delete.all,'
]);
