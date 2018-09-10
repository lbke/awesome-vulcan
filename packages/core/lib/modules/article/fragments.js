import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
   fragment ArticlesFragment on Article {
     _id
     createdAt
   }
`);
