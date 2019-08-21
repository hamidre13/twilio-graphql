"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
exports.userType = fs_1.readFileSync(__dirname + '/user.graphql', 'utf8');
var user_resolvers_1 = require("./user.resolvers");
exports.userResolvers = user_resolvers_1.userResolvers;
//# sourceMappingURL=user.graphQLRouter.js.map