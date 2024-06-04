const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("../routes");

const createServer = () => {
  const app = express();

  // parse body request
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // cors access handler
  app.use(cors());
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
  });

  routes(app);

  return app;
};

module.exports = createServer;
