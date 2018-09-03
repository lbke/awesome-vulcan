import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/vulcan:accounts";
import { getCollection } from "meteor/vulcan:lib";

Meteor.methods({
  "users.setPassword"({ _id, password }) {
    console.log("creating user", _id, password, Meteor.user());
    if (getCollection("Users").isAdmin(Meteor.user())) {
      //const id = newDocument._id
      // FIXME: newDocument has no _id yet
      console.log("creating password for user", _id, password);
      if (_id && password && password.length) {
        Accounts.setPassword(_id, password);
      }
    }
  }
});
