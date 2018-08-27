import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
   fragment CompaniesFragment on Company {
     _id
     createdAt
   }
`);
