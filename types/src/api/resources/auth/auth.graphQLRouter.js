"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
exports.authType = fs_1.readFileSync(__dirname + "/auth.graphql", "utf8");
var auth_resolvers_1 = require("./auth.resolvers");
exports.authResolvers = auth_resolvers_1.authResolvers;
//# sourceMappingURL=auth.graphQLRouter.js.map