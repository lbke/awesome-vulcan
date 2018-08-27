import Users from 'meteor/vulcan:users';

Users.groups.members.can([
  'Schemata.new',
  'Schemata.edit.own',
  'Schemata.remove.own',
]);

Users.groups.admins.can([
  'Schemata.edit.all',
  'Schemata.remove.all,'
]);
