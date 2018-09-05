import React from "react";
import {
  withCurrentUser,
  Components,
  registerComponent
} from "meteor/vulcan:core";

const Home = ({ currentUser }) => (
  <div>
    <h1>Welcome</h1>
    {!currentUser && <Components.AccountsLoginForm />}
  </div>
);
registerComponent({
  name: "Home",
  component: Home,
  hocs: [withCurrentUser]
});

export default Home;
