import React from "react";

import IconButton from "@material-ui/core/IconButton";
import GithubCircleIcon from "mdi-material-ui/GithubCircle";

export const GithubButton = () => {
  return (
    <IconButton
      href="https://github.com/lbke/awesome-vulcan"
      target="_blank"
      title="Fork me on GitHub"
      variant="fab"
      color="secondary"
    >
      <GithubCircleIcon style={{ fontSize: "32px" }} />
    </IconButton>
  );
};

export default GithubButton;
