"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
//For some reason it does not consider it as js!
exports.stripeType = fs_1.readFileSync(__dirname + '/stripe.graphql', 'utf8');
var stripe_resolvers_1 = require("./stripe.resolvers");
exports.stripeResolvers = stripe_resolvers_1.stripeResolvers;
//# sourceMappingURL=stripe.graphQLRouter.js.map