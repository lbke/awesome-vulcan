import React from "react";
import { registerComponent } from "meteor/vulcan:core";
import ReactMarkdown from "react-markdown";
import Typography from "@material-ui/core/Typography";
// @see https://github.com/rexxars/react-markdown
// @see https://material-ui.com/style/typography/
const DefaultTypography = props => <Typography variant="body1" {...props} />;
// correspondence between heading level (h1, h2...) and material ui typography
const headingLevelMap = {
  1: "headline",
  2: "title",
  3: "subheading",
  4: "subheading",
  5: "subheading",
  6: "subheading"
};
const defaultRenderers = {
  heading: ({ level, ...props }) => (
    <Typography variant={headingLevelMap[level]} {...props} />
  ),
  //:h2: props => <Typography variant="title" {...props} />,
  //:h3: props => <Typography variant="subheading" {...props} />,
  paragraph: DefaultTypography,
  listItem: props => (
    <li>
      <Typography variant="body1" {...props} />
    </li>
  )
};
const Markdown = props => (
  <ReactMarkdown renderers={defaultRenderers} {...props} />
);
registerComponent({ name: "Markdown", component: Markdown });

export default Markdown;
