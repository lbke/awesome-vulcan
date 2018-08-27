import {
  createCollection,
  getDefaultResolvers,
  getDefaultMutations
} from "meteor/vulcan:core";
import schema from "./schema.js";
import "./fragments.js";
import "./permissions.js";

const Schemata = createCollection({
  collectionName: "Schemata",
  typeName: "Schema",
  schema,
  resolvers: getDefaultResolvers("Schemata"),
  mutations: getDefaultMutations("Schemata")
});

Schemata.addDefaultView(terms => {
  return {
    options: { sort: { createdAt: -1 } }
  };
});

export default Schemata;
