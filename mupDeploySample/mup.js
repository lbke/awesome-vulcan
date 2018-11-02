// DO NOT TRACK THE `.deploy` FOLDER! IT CONTAINS SENSITIVE INFORMATION!
module.exports = {
  servers: {
    one: {
      // your server
      host: "XX.XX.XXX.XX.XXX",
      username: "ubuntu",
      pem: "./YourAwsRsaKey.pem"
    }
  },

  // @see http://meteor-up.com/docs.html#ssl
  // @see https://github.com/zodern/meteor-up/issues/898
  // @see https://github.com/zodern/meteor-up/issues/1023
  // don't forget to open the 443 port for HTTPS
  proxy: {
    domains: "awesome-vulcan.com,www.awesome-vulcan.com",
    ssl: {
      // mup takes care of creating the certificate for you
      // and renews it too
      letsEncryptEmail: "your@email.com",
      forceSSL: true // redirect http to https
    }
    // @see http://nginx.org/en/docs/http/converting_rewrite_rules.html
    // @see https://github.com/zodern/meteor-up/issues/669
    // for the moment we have to use this method:
    // @see https://blog.wax-o.com/2017/11/meteor-galaxy-redirect-non-www-to-www-with-ssl-and-https/
    //nginxServerConfig: "./nginx.conf"
  },
  app: {
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
      ROOT_URL: "https://www.awesome-vulcan.com", //"http://35.180.30.105",
      MONGO_URL: "mongodb://mongodb/meteor",
      MONGO_OPLOG_URL: "mongodb://mongodb/local",

      //@see  https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-environment.html
      AWS_ACCESS_KEY_ID: "XXXXXX",
      AWS_SECRET_ACCESS_KEY: "XXXXXX"
    },

    docker: {
      // change to 'abernix/meteord:base' if your app is using Meteor 1.4 - 1.5
      image: "abernix/meteord:node-8.4.0-base",
      // install mongodump to allow programmatic backups
      buildInstructions:[
        'RUN'
        + ' apt-get update'
        + ' && apt-get install -y aptitude'
        + ' && aptitude install -y apt-transport-https libwebsockets-dev libssl-dev openssl libcurl3' // allow to download the key / need for mongo install to work
        + ' && apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4' 
        + ' && echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.0.list'
        + ' && apt-get update'
        + ' && aptitude install -y mongodb-org mongodb-org-tools'
      ]


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
};
