import merge from "lodash.merge";
// I disabled the webpack plugin for process.env so I can use my actual enviroment

require("dotenv").config();
//console.log("node env is "+ process.env.NODE_ENV)
let env;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  env = "dev";
} else {
  env = process.env.NODE_ENV;
}

const baseConfig = {
  db: {
    Url: ""
  },
  port: "3000"
};

let config = {};
switch (env) {
  case "dev":
    config = require("./config/dev");
    break;
  case "test":
    config = require("./config/test");
    break;
  case "production":
    config = require("./config/prod");
    break;
  default:
    config = require("./config/dev");
}
export default merge(baseConfig, config.default);
