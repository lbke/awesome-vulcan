import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core';
import schema from './schema.js';
import './fragments.js';
import './permissions.js';

const Companies = createCollection({
  collectionName: 'Companies',
  typeName: 'Company',
  schema,
  resolvers: getDefaultResolvers('Companies'),
  mutations: getDefaultMutations('Companies')
});

Companies.addDefaultView(terms => {
  return {
    options: { sort: { createdAt: -1 } }
  }
})

export default Companies;
