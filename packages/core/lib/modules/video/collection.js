import {
  createCollection,
  getDefaultResolvers,
  getDefaultMutations
} from "meteor/vulcan:core";
import schema from "./schema.js";
import "./fragments.js";
import "./permissions.js";

const Videos = createCollection({
  collectionName: "Videos",
  typeName: "Video",
  schema,
  resolvers: getDefaultResolvers({ typeName: "Video" }),
  mutations: getDefaultMutations({ typeName: "Video" })
});

Videos.addDefaultView(terms => {
  return {
    options: { sort: { createdAt: -1 } }
  };
});

export default Videos;
