import express from "express";
import bodyParser from "body-parser";
import {} from "lodash";
import { restRouter, graphQLServer } from "./api";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", restRouter);

graphQLServer.applyMiddleware({
  app,
  path: "/graphql"
});
export default app;
