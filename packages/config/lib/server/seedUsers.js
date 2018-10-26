/**
 * Setup the database and seed it with demo/base data
 */
import { Meteor } from "meteor/meteor";
import Users from "meteor/vulcan:users";
import { newMutation, registerSetting, getSetting } from "meteor/vulcan:core";
import { Accounts } from "meteor/accounts-base";

registerSetting(
  "admin.email",
  undefined,
  "Admin email (will be the first user)"
);
registerSetting(
  "admin.password",
  undefined,
  "Admin email (will be the first user)"
);

const createUser = function(user) {
  const userWithEmails = {
    ...user,
    emails: [{ address: user.email }]
  };
  return newMutation({
    collection: Users,
    document: userWithEmails,
    validate: false
  });
};
const setPassword = function(user) {
  const bdUser = Users.findOne({ email: user.email });
  console.log("Setting password for user:", user.email, "of id:", bdUser._id);
  return Accounts.setPassword(bdUser._id, user.password);
};

const adminUsers = [
  {
    username: "admin-dev",
    email: getSetting("admin.email"),
    isDummy: false,
    isAdmin: true
  }
];
// needs to be stored separately otherwise the password is stored in clear
const adminPasswords = [
  {
    email: getSetting("admin.email"),
    password: getSetting("admin.password")
  }
];
const createUsers = function() {
  Promise.all(adminUsers.map(createUser)).then(() =>
    Promise.all(adminPasswords.map(setPassword))
  );
};

Meteor.startup(function() {
  // seed the users if necessary
  if (!Users.find().count()) {
    createUsers();
  }
});
