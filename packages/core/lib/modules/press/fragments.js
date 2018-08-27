import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
   fragment PressesFragment on Press {
     _id
     createdAt
   }
`);
