"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
exports.productType = fs_1.readFileSync(__dirname + '/product.graphql', 'utf8');
var product_resolvers_1 = require("./product.resolvers");
exports.productResolvers = product_resolvers_1.productResolvers;
//# sourceMappingURL=product.graphQLRouter.js.map