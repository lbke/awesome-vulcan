import Users from 'meteor/vulcan:users';

Users.groups.members.can([
  'Presses.new',
  'Presses.edit.own',
  'Presses.remove.own',
]);

Users.groups.admins.can([
  'Presses.edit.all',
  'Presses.remove.all,'
]);
