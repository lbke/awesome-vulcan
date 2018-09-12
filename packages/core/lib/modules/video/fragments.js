import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
   fragment VideosFragment on Video {
     _id
     createdAt
   }
`);
