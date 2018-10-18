import WebApp from "meteor/webapp";
//@see https://blog.wax-o.com/2017/11/meteor-galaxy-redirect-non-www-to-www-with-ssl-and-https/
// TODO: replace with a mup config if possible to get better perfs
WebApp.rawConnectHandlers.use((req, res, next) => {
  /**
   * Redirect non-www to www in production
   */
  if (
    process.env.NODE_ENV !== "development" &&
    !req.headers.host.includes("www")
  ) {
    res.writeHead(301, {
      Location: process.env.ROOT_URL + req.originalUrl
    });
    return res.end();
  }

  /**
   * Keep going
   * /!\ DO NOT DELETE /!\
   */
  return next();
});
