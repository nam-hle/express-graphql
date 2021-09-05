import http from "http";
import * as path from "path";

import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import jwt from "express-jwt";
import { buildSchema } from "type-graphql";

import { SCHEMA_PATH, SRC_PATH } from "./paths";
import { UserResolver, BeerResolver } from "./resolvers";

dotenv.config({ path: path.resolve(SRC_PATH, "..", "configs", ".env") });

const PORT = process.env.PORT || 9000;

async function startServer() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  const auth = jwt({
    secret: process.env.JWT_SECRET as string,
    credentialsRequired: false,
    algorithms: ["HS256"],
  });
  app.use(auth);

  const httpServer = http.createServer(app);

  const schema = await buildSchema({
    resolvers: [UserResolver, BeerResolver],
    emitSchemaFile: SCHEMA_PATH,
  });

  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ user: req.user }),
  });

  await server.start();
  server.applyMiddleware({
    app,
    cors: false,
  });

  await new Promise((resolve) =>
    httpServer.listen({ port: PORT }, () => resolve(null))
  );
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
}

startServer();
