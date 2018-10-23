import { registerMenuItem } from "meteor/vulcan:menu";
import ApplicationIcon from "mdi-material-ui/Application";
import PackageVariantIcon from "mdi-material-ui/PackageVariant";
import FormatPilcrowIcon from "mdi-material-ui/FormatPilcrow";
import YoutubeIcon from "mdi-material-ui/Youtube";

registerMenuItem({
  name: "appliactions",
  path: "/applications",
  label: "Applications",
  LeftComponent: ApplicationIcon
});
registerMenuItem({
  name: "articles",
  path: "/articles",
  label: "Articles",
  LeftComponent: FormatPilcrowIcon
});
registerMenuItem({
  name: "packages",
  path: "/packages",
  label: "Packages",
  LeftComponent: PackageVariantIcon
});
registerMenuItem({
  name: "videos",
  path: "/videos",
  label: "Videos",
  LeftComponent: YoutubeIcon
});
