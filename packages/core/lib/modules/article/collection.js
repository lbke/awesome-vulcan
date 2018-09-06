import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core';
import schema from './schema.js';
import './fragments.js';
import './permissions.js';

const Articles = createCollection({
  collectionName: 'Articles',
  typeName: 'Article',
  schema,
  resolvers: getDefaultResolvers({ typeName: 'Article'}),
  //mutations: getDefaultMutations({typeName: 'Article'})
});

Articles.addDefaultView(terms => {
  return {
    options: { sort: { createdAt: -1 } }
  }
})

export default Articles;
