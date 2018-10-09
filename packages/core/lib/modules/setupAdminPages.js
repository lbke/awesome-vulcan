import { setupBackoffice } from "meteor/vulcan:backoffice-builder";
import {
  setupDocumentValidation,
  getValidationView
} from "meteor/vulcan:validation-workflows";
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
  //Company,
  //Course,
  Package,
  //Schema,
  Video
];

const getOptions = currentUser => {
  const view = getValidationView(currentUser);
  return view
    ? {
        terms: {
          view
        }
      }
    : undefined;
};

setupBackoffice(collections, {
  basePath: undefined,
  // for all collections
  list: { accessGroups: ["members", "guests", "admins"], getOptions },
  details: { accessGroups: ["members", "guests", "admins"] },
  form: {
    accessGroups: ["members", "guests", "admins"]
  },
  menuItem: {
    groups: ["admins", "guests", "members"]
  },
  generateUI: false // we provide our own UI
  // Some options are overridable for a specific collection
  // Articles: { accessGroups: ... }
});

// make collections validated
collections.forEach(collection => {
  setupDocumentValidation(collection);
});
