import Users from 'meteor/vulcan:users';

Users.groups.members.can([
  'Packages.create',
  'Packages.update.own',
  'Packages.delete.own',
]);

Users.groups.admins.can([
  'Packages.update.all',
  'Packages.delete.all,'
]);
