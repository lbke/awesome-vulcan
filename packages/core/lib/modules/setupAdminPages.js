import { setupCollectionAdminPages } from "meteor/vulcan:backoffice-builder";
import { setupDocumentValidation } from "meteor/vulcan:validation-workflows";
import { registerMenuItem } from "meteor/vulcan:menu";
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
  //Course,
  Package,
  //Schema,
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
