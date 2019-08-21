"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
//For some reason it does not consider it as js!
exports.twilioType = fs_1.readFileSync(__dirname + '/twilio.graphql', 'utf8');
//export * from './twilio.graphql'
var twilio_resolvers_1 = require("./twilio.resolvers");
exports.twilioResolvers = twilio_resolvers_1.twilioResolvers;
//# sourceMappingURL=twilio.graphQLRouter.js.map