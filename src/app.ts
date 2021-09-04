import http from "http";
import * as path from "path";

import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import express from "express";
import jwt from "express-jwt";

import { resolvers } from "./resolvers/resolvers";
import { typeDefs } from "./schema/typeDefs";

dotenv.config({ path: path.join(__dirname, "..", ".env") });

async function startServer() {
  const app = express();
  app.use(express.json());

  const auth = jwt({
    secret: process.env.JWT_SECRET as string,
    credentialsRequired: false,
    algorithms: ["HS256"],
  });
  app.use(auth);

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      return {
        user: req.headers.user
          ? // @ts-ignore
            JSON.parse(req.headers.user)
          : req.user
          ? req.user
          : null,
      };
    },
  });

  await server.start();

  server.applyMiddleware({ app });
  const PORT = process.env.PORT || 9000;
  // @ts-ignore
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
}

startServer();
