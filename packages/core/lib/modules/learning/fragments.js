import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
   fragment LearningsFragment on Learning {
     _id
     createdAt
   }
`);
