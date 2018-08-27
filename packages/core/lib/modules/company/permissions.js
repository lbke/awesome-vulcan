import Users from 'meteor/vulcan:users';

Users.groups.members.can([
  'Companies.new',
  'Companies.edit.own',
  'Companies.remove.own',
]);

Users.groups.admins.can([
  'Companies.edit.all',
  'Companies.remove.all,'
]);
