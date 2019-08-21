"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
exports.optionType = fs_1.readFileSync(__dirname + '/option.graphql', 'utf8');
var option_resolvers_1 = require("./option.resolvers");
exports.optionResolvers = option_resolvers_1.optionResolvers;
//# sourceMappingURL=option.graphQLRouter.js.map