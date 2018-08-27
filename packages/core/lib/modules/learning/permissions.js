import Users from 'meteor/vulcan:users';

Users.groups.members.can([
  'Learnings.new',
  'Learnings.edit.own',
  'Learnings.remove.own',
]);

Users.groups.admins.can([
  'Learnings.edit.all',
  'Learnings.remove.all,'
]);
