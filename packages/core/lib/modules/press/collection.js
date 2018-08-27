import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core';
import schema from './schema.js';
import './fragments.js';
import './permissions.js';

const Presses = createCollection({
  collectionName: 'Presses',
  typeName: 'Press',
  schema,
  resolvers: getDefaultResolvers('Presses'),
  mutations: getDefaultMutations('Presses')
});

Presses.addDefaultView(terms => {
  return {
    options: { sort: { createdAt: -1 } }
  }
})

export default Presses;
