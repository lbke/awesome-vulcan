import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
   fragment ApplicationsFragment on Application {
     _id
     createdAt
   }
`);
