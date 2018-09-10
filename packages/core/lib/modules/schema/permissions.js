import Users from 'meteor/vulcan:users';

Users.groups.members.can([
  'Schemata.create',
  'Schemata.update.own',
  'Schemata.delete.own',
]);

Users.groups.admins.can([
  'Schemata.update.all',
  'Schemata.delete.all,'
]);
