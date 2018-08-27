import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
   fragment SchemataFragment on Schema {
     _id
     createdAt
   }
`);
