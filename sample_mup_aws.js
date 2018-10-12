module.exports = {
  servers: {
    one: {
      host: "XXXX",
      username: "XXX",
      pem: "./XXXX.pem"
      // password: 'server-password'
      // or neither for authenticate from ssh-agent
    }
  },

  app: {
    // TODO: change app name and path
    name: "awesome-vulcan",
    path: "../",

    servers: {
      one: {}
    },

    buildOptions: {
      serverOnly: true
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: "http://www.awesome-vulcan.com", //"http://35.180.30.105",
      MONGO_URL: "mongodb://mongodb/meteor",
      MONGO_OPLOG_URL: "mongodb://mongodb/local",
      //@see  https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-environment.html
      AWS_ACCESS_KEY_ID: "XXXXXXXXXXXX",
      AWS_SECRET_ACCESS_KEY: "XXXXXXXXX"
    },

    docker: {
      // change to 'abernix/meteord:base' if your app is using Meteor 1.4 - 1.5
      image: "abernix/meteord:node-8.4.0-base"
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

  mongo: {
    version: "3.4.1",
    servers: {
      one: {}
    }
  }

  // (Optional)
  // Use the proxy to setup ssl or to route requests to the correct
  // app when there are several apps

  // proxy: {
  //   domains: 'mywebsite.com,www.mywebsite.com',

  //   ssl: {
  //     // Enable Let's Encrypt
  //     letsEncryptEmail: 'email@domain.com'
  //   }
  // }
};
