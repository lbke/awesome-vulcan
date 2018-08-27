import Users from 'meteor/vulcan:users';

Users.groups.members.can([
  'Packages.new',
  'Packages.edit.own',
  'Packages.remove.own',
]);

Users.groups.admins.can([
  'Packages.edit.all',
  'Packages.remove.all,'
]);
