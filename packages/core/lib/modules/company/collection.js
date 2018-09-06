import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core';
import schema from './schema.js';
import './fragments.js';
import './permissions.js';

const Companies = createCollection({
  collectionName: 'Companies',
  typeName: 'Company',
  schema,
  resolvers: getDefaultResolvers({ typeName: 'Company'}),
  //mutations: getDefaultMutations({typeName: 'Company'})
});

Companies.addDefaultView(terms => {
  return {
    options: { sort: { createdAt: -1 } }
  }
})

export default Companies;
