import React from "react";

import IconButton from "@material-ui/core/IconButton";
import LinkVariantIcon from "mdi-material-ui/LinkVariant";
import GithubCircleIcon from "mdi-material-ui/GithubCircle";
import YoutubeIcon from "mdi-material-ui/Youtube";

// auto detect github, social networks, etc. from links
const getLinkType = href => {
  if (href.match("github")) return "github";
  if (href.match("youtube")) return "youtube";
  return "default";
};
const getIcon = linkType => {
  switch (linkType) {
    case "github":
      return <GithubCircleIcon />;
    case "youtube":
      return <YoutubeIcon />;
    default:
      return <LinkVariantIcon />;
  }
};
export const LinkButton = ({ href }) => {
  if (!href) return null;
  const linkType = getLinkType(href);
  let selectedIcon = getIcon(linkType);
  return (
    <IconButton
      href={href}
      target="_blank"
      title="Open in new tab"
      variant="fab"
      color="primary"
    >
      {selectedIcon}
    </IconButton>
  );
};

export default LinkButton;
