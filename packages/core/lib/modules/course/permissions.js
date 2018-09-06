import Users from 'meteor/vulcan:users';

Users.groups.members.can([
  'Courses.create',
  'Courses.update.own',
  'Courses.delete.own',
]);

Users.groups.admins.can([
  'Courses.update.all',
  'Courses.delete.all,'
]);
