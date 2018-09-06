import { setupCollectionAdminPages } from "meteor/collection-admin";
import { registerMenuItem } from "meteor/menu";
import Application from "./application/collection";
import Article from "./article/collection";
import Company from "./company/collection";
import Course from "./course/collection";
import Package from "./package/collection";
import Schema from "./schema/collection";
import Video from "./video/collection";

// create components and pages
setupCollectionAdminPages(Application);
setupCollectionAdminPages(Article);
setupCollectionAdminPages(Company);
setupCollectionAdminPages(Course);
setupCollectionAdminPages(Package);
setupCollectionAdminPages(Schema);
setupCollectionAdminPages(Video);

// add routes to menu
[Application, Article, Company, Course, Package, Schema, Video].forEach(
  collection => {
    const typeName = collection.options.typeName;
    const collectionName = collection.options.collectionName;
    const lowerTypeName = typeName.toLowerCase();
    const lowerCollectionName = collectionName.toLowerCase();
    registerMenuItem(lowerTypeName, {
      label: typeName,
      path: `/${lowerCollectionName}`,
      groups: ["admins"],
      parent: "admin"
    });
  }
);

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
