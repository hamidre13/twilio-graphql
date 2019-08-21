"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_merge_1 = __importDefault(require("lodash.merge"));
// I disabled the webpack plugin for process.env so I can use my actual enviroment
require('dotenv').config();
//console.log("node env is "+ process.env.NODE_ENV)
let env;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    env = 'dev';
}
else {
    env = process.env.NODE_ENV;
}
const baseConfig = {
    db: {
        Url: 'mongodb://localhost/seodapopCrm'
    },
    port: '3000',
    expireTime: 24 * 60 * 10
};
let config = {};
switch (env) {
    case 'dev':
        config = require('./config/dev');
        break;
    case 'test':
        config = require('./config/test');
        break;
    case 'production':
        config = require('./config/prod');
        break;
    default:
        config = require('./config/dev');
}
exports.default = lodash_merge_1.default(baseConfig, config.default);
//# sourceMappingURL=config.js.map