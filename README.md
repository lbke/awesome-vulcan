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

## Install

We rely on Vulcan [2 repo install](http://docs.vulcanjs.org/#Two-Repo-Install-Optional) and work on the `devel` branch of Vulcan.

```sh
# Step 1: copy all relevant packages locally
mkdir ./vulcan-packages # create a directory for the packages
cd ./vulcan-packages # go to the folder
git clone "https://github.com/lbke/vulcan-users-manager" # user management
git clone "https://github.com/lbke/vulcan-more-helpers" # various helpers and components
git clone "https://github.com/lbke/vulcan-more-material-ui" # material ui additionnal components/layouts
git clone "https://github.com/lbke/vulcan-validation-workflows" # document moderation
git clone "https://github.com/lbke/vulcan-backoffice-builder" # backoffice generation
git clone "https://github.com/lbke/vulcan-menu" # menu management
# save the database content daily on AWS (can be enabled/disabled through settings)
git clone "https://github.com/lbke/vulcan-mongo-backup"
cd ../ # back to your home folder
# Step 2: install
meteor npm i
# Step 3: run
METEOR_PACKAGE_DIRS="<path-to-your-vulcan-install>:<path-to-vulcan-packages>" meteor run
```

Please open an issue if you encounter issues while installing the app, we will try to answser as soon as possible.

## Deployment

Awesome Vulcan is hosted on AWS, and rely on [Meteor Up](http://meteor-up.com) for deployment. We provide an example `.deploy` folder to reproduce our setup.

The Mongo database is saved daily in a S3 Bucket. Old backups are then transferred to Glacier (this can be setup in the AWS Console directly using transition rules).

## Roadmap

If you begin with Vulcan, taking care of one of those features is a good way to learn. They are simple enough and can be based on Vulcan Starter example packages or even on Vulcan core feature.

- Allow to share schemas
- Rewrite ResultsGrid to use the DataTable (need to update the Vulcan component to allow this)
- Allow upvoting/downvoting and sorting from new/best
- Add notifications (email notification and in-app notifications), and newsletter
- Setup forgot/change password emails
- Add 3rd party auth, especially with Github
- Plug Sentry
- Plug a mail system
- Plug Google Analytics (with DGPR compliancy, of course)
- i18n of menu items and form inputs
- fix form error message
- Allow exporting the list of resources in the .md format
- Add responsiveness
