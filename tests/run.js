import { structure } from '../src/api/graphQLRouter';
import { makeExecutableSchema } from 'graphql-tools';
import { graphql } from 'graphql';

export const runQuery = (query, variables = {}, ctx = {}) => {
  const schema = makeExecutableSchema(structure);
  return graphql(schema, query, null, ctx, variables);
};
