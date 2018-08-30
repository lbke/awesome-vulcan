import React from "react";
import { Components, registerComponent } from "meteor/vulcan:core";

const Home = () => (
  <div>
    <Components.AccountsLoginForm />
    Find me at packages/core/lib/components/Home.jsx
  </div>
);
registerComponent("Home", Home);

export default Home;
