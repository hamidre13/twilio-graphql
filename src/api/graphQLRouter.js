import merge from "lodash.merge";
import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { twilioType, twilioResolvers } from "./resources/twilio";

// Definig root for graphql
const baseSchema = `
  schema {
    query: Query,
  }
`;

const ConsLogger = {
  log: e => console.log(e)
};
export const structure = {
  // all the graphql files go here!!
  typeDefs: [baseSchema, twilioType].join(" "),
  resolvers: merge({}, twilioResolvers)
};

export const graphQLServer = new ApolloServer({
  schema: makeExecutableSchema(structure),
  context: ({ req, res }) => ({
    req,
    res
  }),
  playground: {
    settings: {
      "editor.theme": "dark"
    }
  },
  tracing: true
});
