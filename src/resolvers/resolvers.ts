import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

import { beersData } from "../data/beers";
import { Resolvers, User } from "../schema/types.generated";

const { User: UserModel } = require("../models");

const JWT_SECRET = process.env.JWT_SECRET || "";

export const resolvers: Resolvers<{ user: User }> = {
  Query: {
    async current(_, args, { user }) {
      if (user) {
        return await UserModel.findOne({ where: { id: user.id } });
      }

      throw new Error("Sorry, you're not an authenticated user");
    },
    async beer(_, { id }, { user }) {
      if (user) {
        return beersData.filter((beer) => beer.id === id)[0];
      }
      throw new Error("Sorry, you're not an authenticated user!");
    },

    async beers(_, { brand }, { user }) {
      if (user) {
        return beersData.filter((beer) => beer.brand === brand);
      }
      throw new Error("Sorry, you're not an authenticated user!");
    },
  },

  Mutation: {
    async register(_, { login, password }) {
      const user = await UserModel.create({
        login,
        password: await bcrypt.hash(password, 10),
      });

      return jsonwebtoken.sign({ id: user.id, login: user.login }, JWT_SECRET, {
        expiresIn: "3m",
      });
    },
    async login(_, { login, password }) {
      const user = await UserModel.findOne({ where: { login } });

      if (!user) {
        throw new Error("This user does not exist.");
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        throw new Error("Your password is incorrect.");
      }

      return jsonwebtoken.sign({ id: user.id, login: user.login }, JWT_SECRET, {
        expiresIn: "1d",
      });
    },
  },
};
