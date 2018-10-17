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
    //const mongoUrl = process.env.MONGO_URL;
    const folderName = `mongodump-${execSync('printf `date +"%m-%d-%y"`')}`;
    const savePath = `/tmp/${folderName}`;
    const mongodumpArgs = `--out ${savePath}`;
    const zipFileName = `${folderName}.zip`;
    const zipPath = `/tmp/${zipFileName}`;
    const zipArgs = `-r ${zipPath} ${savePath}`;
    const mongodumpCmd = `mongodump ${mongodumpArgs}`;
    const zipCmd = `zip ${zipArgs}`;
    const script = [mongodumpCmd, zipCmd].join(" && ");
    // Using spawn instead of exec:
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

    const saveToS3 = (data, cb) => {
      const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
      const base64data = new Buffer(data, "binary");
      const params = {
        Bucket: "awesome-vulcan",
        Key: `mongo-backups/${zipFileName}`,
        Body: base64data
      };
      console.log(
        "*** Sending MongoDB dump to S3...",
        params.Bucket,
        params.Key
      );
      s3.putObject(params, (err, data) => {
        cb(err, data);
      });
    };
    const onFileRead = async (err, data) => {
      if (err) {
        console.log("*** Could not open MongoDB dump file", err);
        return;
      }
      //
      saveToS3(data, (err, data) => {
        if (err) {
          console.log("*** Could not send MongoDB dump to AWS S3", err);
        } else {
          console.log("*** Successfully backed up MongoDB Data");
        }
        //  // STEP 3: email on success OR failure
        //  // TODO
      });
    };
    const mongodumpProcess = exec(script, function() {
      // TODO: handle error, email if needed
      // STEP 2: push the dump to AWS Glacier
      // @see https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/glacier-example-uploadrchive.html
      // Do we need to zip it?
      // setup AWS
      AWS.config.update({
        region: Meteor.settings.AWS.REGION
      });

      //const glacier = new AWS.Glacier({ apiVersion: "2012-06-01" });
      fs.readFile(zipPath, onFileRead);
    });
  } catch (err) {
    console.log("*** ERROR: could not backup mongo database");
    // TODO: email error
  }
};

console.log("running job");
job();
registerCron({
  frequencySettingName: "mongoBackup.frequency",
  timeSettingName: "mongoBackup.time",
  name: "scheduleMongoBackup",
  enable: Meteor.settings["enableMongoBackup"],
  job
});
