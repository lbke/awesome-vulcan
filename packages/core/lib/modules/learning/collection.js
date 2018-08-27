import {
  createCollection,
  getDefaultResolvers,
  getDefaultMutations
} from "meteor/vulcan:core";
import schema from "./schema.js";
import "./fragments.js";
import "./permissions.js";

const Learnings = createCollection({
  collectionName: "Learnings",
  typeName: "Learning",
  schema,
  resolvers: getDefaultResolvers("Learnings")
  //mutations: getDefaultMutations('Learnings')
});

Learnings.addDefaultView(terms => {
  return {
    options: { sort: { createdAt: -1 } }
  };
});

export default Learnings;
