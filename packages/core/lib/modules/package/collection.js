import {
  createCollection,
  getDefaultResolvers,
  getDefaultMutations
} from "meteor/vulcan:core";
import schema from "./schema.js";
import "./fragments.js";
import "./permissions.js";

const Packages = createCollection({
  collectionName: "Packages",
  typeName: "Package",
  schema,
  resolvers: getDefaultResolvers({ typeName: "Package" }),
  mutations: getDefaultMutations({ typeName: "Package" })
});

Packages.addDefaultView(terms => {
  return {
    options: { sort: { createdAt: -1 } }
  };
});

export default Packages;
