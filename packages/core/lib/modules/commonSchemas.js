export const name = {
  type: String,
  optional: false,
  label: "Name",
  canRead: ["guests"],
  canUpdate: ["admins", "members"],
  canCreate: ["admins", "members"]
};
export const title = {
  type: String,
  optional: false,
  label: "Title",
  canRead: ["guests"],
  canUpdate: ["admins", "members"],
  canCreate: ["admins", "members"]
};
export const description = {
  type: String,
  label: "Description",
  optional: false,
  canRead: ["guests"],
  canUpdate: ["admins", "members"],
  canCreate: ["admins", "members"],
  max: 140
};

export const links = {
  links: {
    type: Array,
    optional: false,
    label: "Links",
    canRead: ["guests"],
    canUpdate: ["admins", "members"],
    canCreate: ["admins", "members"],
    min: 1,
    input: "ArrayOf"
  },
  "links.$": {
    type: String,
    input: "url"
  }
};

export const link = {
  type: String,
  optional: false,
  label: "Link",
  canRead: ["guests"],
  canUpdate: ["admins"],
  canCreate: ["admins", "members"],
  input: "url"
};

export const userId = {
  type: String,
  optional: true,
  canRead: ["admins"],
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
