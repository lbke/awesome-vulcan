/**
 * Setup the account management and auth workflow
 * @see https://github.com/studiointeract/accounts-ui
 * @see http://docs.meteor.com/api/accounts-multi.html#AccountsCommon-config
 */
import { Accounts } from "meteor/vulcan:accounts";
import Users from "meteor/vulcan:users";
import { getRoutePath } from "../modules/routes";
import { browserHistory } from "react-router";

// to fetch the local gql server
import { getFragment } from "meteor/vulcan:lib";
import gql from "graphql-tag";
import { createApolloFetch } from "apollo-fetch";
const uri = "/graphql";
const apolloFetch = createApolloFetch({ uri });

Accounts.config({
  // user can not create their own account, only admins and managers
  // can add users
  forbidClientAccountCreation: true,
  // login never expires
  loginExpirationInDays: null,
  // passwords reset quickly expires to avoid security flaws
  passwordResetTokenExpirationInDays: 1
});

Accounts.ui.config({
  onSignedInHook: () => {
    const userId = Meteor.userId();
    console.log("user " + userId + " just signed in");
    if (Meteor.isClient) {
      // TODO: encapsulate this into a "getUser" reusable method
      const query = `
        query user{
            UsersSingle(documentId: "${userId}"){
              _id
              groups
              isAdmin
            }
          }
          `;
      apolloFetch({ query, variables: {} }).then(({ data }) => {
        const user = data.UsersSingle;
        // in case react-router is not available
        if (!browserHistory) {
          console.log("browserHistory unavailable");
          browserHistory = {
            pushState: redirect =>
              window.history.pushState({}, "redirect", redirect)
          };
        }
        const groups = Users.getGroups(user);
        if (Users.isAdmin(user)) {
          browserHistory.push("/users");
        } else if (groups.includes("runners")) {
          browserHistory.push("/runners");
        } else if (groups.includes("salesmans")) {
          browserHistory.push("/sales");
        }
      });
    }
  }
});
