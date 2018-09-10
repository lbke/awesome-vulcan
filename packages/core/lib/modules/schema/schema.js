import { name, links, userId } from "../commonSchemas";
const schema = {
  // default properties

  _id: {
    type: String,
    optional: true,
    canRead: ["guests"]
  },
  createdAt: {
    type: Date,
    optional: true,
    canRead: ["guests"],
    onCreate: ({ newDocument, currentUser }) => {
      return new Date();
    }
  },
  name,
  ...links,
  userId,
  definition: {
    type: String,
    optional: false,
    canRead: ["guests"]
  }
};

export default schema;
