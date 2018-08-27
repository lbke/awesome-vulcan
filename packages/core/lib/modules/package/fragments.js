import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
   fragment PackagesFragment on Package {
     _id
     createdAt
   }
`);
