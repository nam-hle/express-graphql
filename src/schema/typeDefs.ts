import Fs from "fs";
import Path from "path";

export const typeDefs = Fs.readFileSync(
  Path.resolve(__dirname, "..", "src", "schema", "schema.graphql"),
  "utf8"
);
