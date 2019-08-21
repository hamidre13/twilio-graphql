"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
exports.accountType = fs_1.readFileSync(__dirname + '/account.graphql', 'utf8');
var account_resolvers_1 = require("./account.resolvers");
exports.accountResolvers = account_resolvers_1.accountResolvers;
//# sourceMappingURL=account.graphQLRouter.js.map