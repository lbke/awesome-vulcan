import Users from "meteor/vulcan:users";
import { newMutation } from "meteor/vulcan:core";

const seedData = [];

Meteor.startup(() => {
  if (Users.find().count() <= 1) {
    Accounts.createUser({
      username: "demodemo",
      //email: "demo@demo.demodummyuser@gmail.com",
      profile: {
        isDummy: true
      },
      password: "demodemo"
    });
    Accounts.createUser({
      username: "demo1",
      //email: "demo@demo.demodummyuser@gmail.com",
      profile: {
        isDummy: true
      },
      password: "demodemo1"
    });
    Accounts.createUser({
      username: "demo2",
      //email: "demo@demo.demodummyuser@gmail.com",
      profile: {
        isDummy: true
      },
      password: "demodemo2"
    });
  }
});
