"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
exports.sendGridType = fs_1.readFileSync(__dirname + "/sendGrid.graphql", "utf8");
var sendGrid_resolvers_1 = require("./sendGrid.resolvers");
exports.sendGridResolvers = sendGrid_resolvers_1.sendGridResolvers;
//# sourceMappingURL=sendGrid.graphQLRouter.js.map