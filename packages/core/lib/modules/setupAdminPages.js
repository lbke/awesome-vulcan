import { setupCollectionAdminPages } from "meteor/collection-admin";
import { setupDocumentValidation } from "meteor/validation-workflow";
import { registerMenuItem } from "meteor/menu";
import Application from "./application/collection";
import Article from "./article/collection";
import Company from "./company/collection";
import Course from "./course/collection";
import Package from "./package/collection";
import Schema from "./schema/collection";
import Video from "./video/collection";

const collections = [
  Application,
  Article,
  Company,
  Course,
  Package,
  Schema,
  Video
];
// create components and pages
collections.forEach(collection => {
  setupCollectionAdminPages(collection, {
    list: { accessGroups: ["members", "guests", "admins"] },
    details: { accessGroups: ["members", "guests", "admins"] },
    form: {
      accessGroups: ["members", "guests", "admins"]
    }
  });
});

// add routes to menu
collections.forEach(collection => {
  const typeName = collection.options.typeName;
  const collectionName = collection.options.collectionName;
  const lowerTypeName = typeName.toLowerCase();
  const lowerCollectionName = collectionName.toLowerCase();
  registerMenuItem(lowerTypeName, {
    label: typeName,
    path: `/${lowerCollectionName}`,
    groups: ["admins", "guests", "members"]
    //parent: "admin"
  });
});

// make collections validated
collections.forEach(collection => {
  setupDocumentValidation(collection);
});

/* setupCollectionAdminPages(Users, {
  list: {
    basicColumns: [
      "_id",
      "createdAt",
      "username",
      "email",
      "isAdmin",
      "groups"
    ],
    accessGroups: ["admins"],
    accessRedirect: "/"
  },
  details: {
    fields: ["_id", "createdAt", "username", "email", "isAdmin", "groups"],
    accessGroups: ["admins"],
    accessRedirect: "/"
  },
  form: {
    newFields: ["username", "email", "_password", "groups", "isAdmin"],
    editFields: [
      "_id",
      "createdAt",
      "username",
      "email",
      "_password",
      "groups",
      "isAdmin"
    ],
    accessGroups: ["admins"],
    accessRedirect: "/"
  }
}); */
