import {
  createCollection,
  getDefaultResolvers,
  getDefaultMutations
} from "meteor/vulcan:core";
import schema from "./schema.js";
import "./fragments.js";
import "./permissions.js";

const Applications = createCollection({
  collectionName: "Applications",
  typeName: "Application",
  schema,
  resolvers: getDefaultResolvers({ typeName: "Application" }),
  mutations: getDefaultMutations({ typeName: "Application" })
});

Applications.addDefaultView(terms => {
  return {
    options: { sort: { createdAt: -1 } }
  };
});

export default Applications;
