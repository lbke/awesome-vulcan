import Users from 'meteor/vulcan:users';

Users.groups.members.can([
  'Applications.new',
  'Applications.edit.own',
  'Applications.remove.own',
]);

Users.groups.admins.can([
  'Applications.edit.all',
  'Applications.remove.all,'
]);
