import Users from 'meteor/vulcan:users';

Users.groups.members.can([
  'Companies.create',
  'Companies.update.own',
  'Companies.delete.own',
]);

Users.groups.admins.can([
  'Companies.update.all',
  'Companies.delete.all,'
]);
