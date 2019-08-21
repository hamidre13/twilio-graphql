"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_merge_1 = __importDefault(require("lodash.merge"));
const apollo_server_express_1 = require("apollo-server-express");
const user_1 = require("./resources/user");
const graphql_tools_1 = require("graphql-tools");
const twilio_1 = require("./resources/twilio");
const stripe_1 = require("./resources/stripe");
const option_1 = require("./resources/option");
const auth_1 = require("./resources/auth");
const sendGrid_1 = require("./resources/sendGrid");
const twilio_model_1 = require("./resources/twilio/twilio.model");
//import { signupType, signupResolvers } from './resources/signUp';
const account_1 = require("./resources/account");
// import {
//   productType,
//   productResolvers,
//   productModel
// } from './resources/product';
// Definig root for graphql
const baseSchema = `
  schema {
    query: Query,
    mutation:Mutation
  }
`;
const ConsLogger = {
    log: e => console.log(e)
};
exports.structure = {
    // all the graphql files go here!!
    typeDefs: [
        account_1.accountType,
        baseSchema,
        user_1.userType,
        twilio_1.twilioType,
        auth_1.authType,
        sendGrid_1.sendGridType,
        option_1.optionType,
        stripe_1.stripeType
    ].join(" "),
    resolvers: lodash_merge_1.default({}, auth_1.authResolvers, user_1.userResolvers, twilio_1.twilioResolvers, auth_1.authResolvers, sendGrid_1.sendGridResolvers, option_1.optionResolvers, account_1.accountResolvers, stripe_1.stripeResolvers)
};
//const schema = makeExecutableSchema(structure);
const Models = {
    userModel: user_1.userModel,
    userMeta: user_1.userMeta,
    authModel: auth_1.authModel,
    callModel: twilio_model_1.callModel,
    smsModel: twilio_model_1.smsModel,
    accountModel: account_1.accountModel,
    optionModel: option_1.optionModel
};
exports.graphQLServer = new apollo_server_express_1.ApolloServer({
    schema: graphql_tools_1.makeExecutableSchema(exports.structure),
    context: ({ req, res }) => ({
        req,
        res,
        Models
    }),
    playground: {
        settings: {
            "editor.theme": "dark"
        }
    },
    tracing: true
});
//# sourceMappingURL=graphQLRouter.js.map