/**
 * Daily mongodb backup
 */

import { SyncedCron } from "meteor/percolatestudio:synced-cron";
import moment from "moment";
import { getSetting, registerSetting } from "meteor/vulcan:core";

const registerCron = ({
  frequencySettingName,
  timeSettingName,
  defaultFrequency = [2, 4, 6],
  defaultTime = "02:00",
  debug = false,
  name,
  job,
  enable = true,
  enableInDev = false
}) => {
  if (!enable) return;
  if (process.env !== "production" && !enableInDev) return;
  registerSetting(frequencySettingName, defaultFrequency);
  registerSetting(timeSettingName, defaultTime);

  SyncedCron.options = {
    log: true,
    collectionName: "cronHistory",
    utc: false,
    collectionTTL: 172800
  };

  // compute the schedule while handleing GMT/server time
  const addZero = num => {
    return num < 10 ? "0" + num : num;
  };
  const getSchedule = function(parser) {
    const frequency = getSetting(frequencySettingName, defaultFrequency);
    const recur = parser.recur();
    let schedule;

    if (!!frequency) {
      const frequencyArray = Array.isArray(frequency)
        ? frequency
        : _.toArray(frequency);
      schedule = recur.on(frequencyArray).dayOfWeek();
    } else {
      schedule = recur.on(defaultFrequency).dayOfWeek(); // every other day
    }

    // handle GMT
    const offsetInMinutes = new Date().getTimezoneOffset();
    const GMTtime = moment.duration(getSetting(timeSettingName, defaultTime));
    const serverTime = GMTtime.subtract(offsetInMinutes, "minutes");
    const serverTimeString =
      addZero(serverTime.hours()) + ":" + addZero(serverTime.minutes());

    if (debug) {
      console.log(
        "// scheduled for: (GMT): " + getSetting(timeSettingName, defaultTime)
      );
      console.log("// server offset (minutes): " + offsetInMinutes);
      console.log(
        "// server scheduled time (minutes): " + serverTime.asMinutes()
      );
      console.log("// server scheduled time: " + serverTimeString);
    }

    return schedule.on(serverTimeString).time();
  };

  Meteor.methods({
    getNextJob: function() {
      var nextJob = SyncedCron.nextScheduledAtDate(name);
      console.log(nextJob); // eslint-disable-line
      return nextJob;
    }
  });

  // actually add the cron
  const addJob = function() {
    SyncedCron.add({
      name,
      schedule: function(parser) {
        // parser is a later.parse object
        return getSchedule(parser);
      },
      job: function() {
        // only schedule in prod
        if (process.env.NODE_ENV === "production" || enableInDev) {
          console.log(`// Running cron job ${name}`); // eslint-disable-line
          console.log(new Date()); // eslint-disable-line
          job();
        }
      }
    });
  };

  Meteor.startup(function() {
    addJob();
  });
};
export default registerCron;
