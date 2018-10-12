/**
 * Daily mongodb backup
 */
import registerCron from "./registerCron";
import { spawn, exec, execSync } from "child_process";
import fs from "fs";
const AWS = require("aws-sdk");

// TODO: register settings in Vulcan
// TODO: allow activation, deactivation of MongoDB glacier storage

const job = () => {
  try {
    console.log("*** Backup mongo database");
    // STEP 1: generate the dump and zip it
    const mongoUrl = process.env.MONGO_URL;
    const folderName = `mongodump-${execSync('printf `date +"%m-%d-%y"`')}`;
    const savePath = `/tmp/${folderName}`;
    const mongodumpArgs = `--out ${savePath}`;
    const zipPath = `/tmp/${folderName}.zip`;
    const zipArgs = `${zipPath} ${savePath}`;
    const mongodumpCmd = `mongodump ${mongodumpArgs}`;
    const zipCmd = `zip ${zipArgs}`;
    const script = [mongodumpCmd, zipCmd].join(" && ");
    // Using spawn:
    // mongodump.stdout.on("data", function(data) {
    //   console.log("stdout: " + data);
    // });
    // mongodump.stderr.on("data", function(data) {
    //   console.log("stderr: " + data);
    // });
    // mongodump.on("exit", function(code) {
    //
    //  console.log("mongodump exited with code " + code);
    // ...
    // })

    const mongodump = exec(script, function() {
      // TODO: handle error, email if needed
      // STEP 2: push the dump to AWS Glacier
      // @see https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/glacier-example-uploadrchive.html
      // Do we need to zip it?
      // setup AWS
      AWS.config.update({
        region: Meteor.settings.AWS.REGION
      });
      console.log(AWS.config.credentials);

      const glacier = new AWS.Glacier({ apiVersion: "2012-06-01" });
      fs.readFile(zipPath, function(err, data) {
        if (err) {
          console.log(err);
          return;
        }
        const base64data = new Buffer(data, "binary");
        const params = {
          vaultName: "awesome-vulcan",
          accountId: Meteor.settings.AWS.ACCOUNT_ID,
          body: base64data
        };
        glacier.uploadArchive(params, (err, data) => {
          if (err) console.log("Error uploading archive!", err);
          else console.log("Archive ID", data.archiveId);
          // STEP 3: email on success OR failure
          // TODO
        });
      });
    });
  } catch (err) {
    console.log("*** ERROR: could not backup mongo database");
    // TODO: email error
  }
};

job();
registerCron({
  frequencySettingName: "mongoBackup.frequency",
  timeSettingName: "mongoBackup.time",
  name: "scheduleMongoBackup",
  enable: Meteor.settings["enableMongoBackup"],
  job
});
