import { name, link, userId } from "../commonSchemas";
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
  link,
  userId,
  price: {
    type: Number,
    optional: false,
    canRead: ["guests"],
    canUpdate: ["admins"],
    canCreate: ["admins"],
    min: 0
  }
};

export default schema;
