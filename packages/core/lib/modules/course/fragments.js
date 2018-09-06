import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
   fragment CoursesFragment on Course {
     _id
     createdAt
   }
`);
