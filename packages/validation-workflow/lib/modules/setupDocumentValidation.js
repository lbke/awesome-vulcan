/**
 * Enhance a collection so that it requires validation
 * before viewing
 *
 */
import _merge from "lodash/merge";
import Users from "meteor/vulcan:users";
import { extendFragment } from "meteor/vulcan:core";

const defaultOptions = {
  // no need to add "admins", it is added automatically
  moderatorGroups: [],
  // document are invalid as a default, but user may want documents
  // to be valid as a default, and only invalidate if needed
  defaultValidation: false,
  validFieldName: "_valid"
};
const ownsOrInGroup = groupOrGroups => (user, document) => {
  return (
    Users.isAdmin(user) ||
    Users.isMemberOf(user, groupOrGroups) ||
    Users.owns(user, document)
  );
};
const getDefaultFragmentName = collection =>
  `${collection.options.collectionName}DefaultFragment`;

export const setupDocumentValidation = (collection, options = {}) => {
  const mergedOptions = _merge(defaultOptions, options);
  const moderatorGroups = ["admins", ...mergedOptions.moderatorGroups];
  // add a validation field
  collection.addField({
    fieldName: mergedOptions.validFieldName,
    fieldSchema: {
      type: Boolean,
      optional: true,
      onCreate: ({ newDocument, currentUser }) => {
        const isValid = newDocument[mergedOptions.validFieldName];
        // if __valid value is set, respect it
        if (typeof isValid === "boolean") {
          return isValid;
          // for document created by moderators, the default value is true
        } else if (
          Users.isAdmin(currentUser) ||
          Users.isMemberOf(currentUser, moderatorGroups)
        ) {
          return true;
          // for other people we respect the default value
          // (usually false)
        } else {
          return mergedOptions.defaultValidation;
        }
      },
      canRead: ownsOrInGroup(moderatorGroups),
      canUpdate: moderatorGroups,
      canCreate: moderatorGroups
    }
  });
  // extend the graphQL fragment
  extendFragment(
    getDefaultFragmentName(collection),
    `
    ${mergedOptions.validFieldName}
  `
  );
  // enhance the check access collection with validity test
  const bareCheckAccess = collection.checkAccess;
  collection.checkAccess = (currentUser, document, ...otherArgs) => {
    if (Users.isAdmin(currentUser)) return true;
    if (
      !(
        document[mergedOptions.validFieldName] ||
        ownsOrInGroup(moderatorGroups)(currentUser, document)
      )
    ) {
      return false;
    }
    if (bareCheckAccess) {
      return bareCheckAccess(currentUser, document, ...otherArgs);
    }
    // checkAccess is meant restrict access further within allowed groups
    // so result must be true as a default (same as if it did not exist)
    return true;
  };
};

export default setupDocumentValidation;
