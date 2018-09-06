import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core';
import schema from './schema.js';
import './fragments.js';
import './permissions.js';

const Courses = createCollection({
  collectionName: 'Courses',
  typeName: 'Course',
  schema,
  resolvers: getDefaultResolvers({ typeName: 'Course'}),
  //mutations: getDefaultMutations({typeName: 'Course'})
});

Courses.addDefaultView(terms => {
  return {
    options: { sort: { createdAt: -1 } }
  }
})

export default Courses;
