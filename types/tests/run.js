"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphQLRouter_1 = require("../src/api/graphQLRouter");
const graphql_tools_1 = require("graphql-tools");
const graphql_1 = require("graphql");
exports.runQuery = (query, variables = {}, ctx = {}) => {
    const schema = graphql_tools_1.makeExecutableSchema(graphQLRouter_1.structure);
    return graphql_1.graphql(schema, query, null, ctx, variables);
};
//# sourceMappingURL=run.js.map