# Awesome Vulcan

This application is an _awesome_ demo of the equally _awesome_ JavaScript framework [Vulcan.js](http://vulcanjs.org/). The functionnalities are fairly limited for the moment, however the underlying code has been built with reusability in mind.

It could serve as basis or an inspiration for your own application, especially if you want to build an admin dashboard, an item catalog or any other kind of backoffice application. Thus, it gave birth to a few generic packages:

\- [vulcan-backoffice-builder](https://github.com/lbke/vulcan-backoffice-builder): helpers to quickly generate administration pages (list, creation form...) for any collection.

\- [vulcan-users-manager](https://github.com/lbke/vulcan-users-manager): \`Users\` is a specific collection in Vulcan, due to Meteor underlying Account system, so we built a specific package to handle it.

\- [vulcan-menu](https://github.com/lbke/vulcan-menu): allow to register menu items globallly. This way packages can ask the UI to print some menus, without being dependant on the actual application layout.

\- [vulcan-validation-workflows](https://github.com/lbke/vulcan-validation-workflows): allow to setup document moderation workflows, like validating a document submitted by non-admin users before they are shown to other users.

You can propose real Vulcan related resources, like your own packages or articles, or test the form with fake data. Only valid submissions will be made public.

Now, all you have to do is sign up and test!

_[Built with love by LBKE](https://github.com/lbke)_

## Roadmap

- Allow to share schemas
- i18n of menu items and of form inputs
- fix form error message
