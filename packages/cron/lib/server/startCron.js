import { SyncedCron } from "meteor/percolatestudio:synced-cron";
//@see https://stackoverflow.com/questions/40687237/cron-jobs-in-meteor
Meteor.startup(() => {
  SyncedCron.start();
});
