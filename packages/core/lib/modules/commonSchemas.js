export const name = {
  type: String,
  optional: false,
  canRead: ["guests"],
  canUpdate: ["admins"],
  canCreate: ["admins"]
};
export const title = {
  type: String,
  optional: false,
  canRead: ["guests"],
  canUpdate: ["admins"],
  canCreate: ["admins"]
};

export const links = {
  links: {
    type: Array,
    optional: false,
    canRead: ["guests"],
    canUpdate: ["admins"],
    canCreate: ["admins"],
    min: 1
  },
  "links.$": {
    type: String
  }
};

export const userId = {
  type: String,
  optional: true,
  canRead: ["guests"],
  resolveAs: {
    fieldName: "user",
    type: "User",
    resolver: (movie, args, context) => {
      return context.Users.findOne(
        { _id: movie.userId },
        {
          fields: context.Users.getViewableFields(
            context.currentUser,
            context.Users
          )
        }
      );
    },
    addOriginalField: true
  }
};

export const link = {
  type: String,
  optional: true,
  canRead: ["guests"],
  canUpdate: ["admins"],
  canCreate: ["admins"]
};
