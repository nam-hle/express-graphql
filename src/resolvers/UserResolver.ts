import { Context } from "@apollo/client";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

import { User } from "../schema/User";

const { User: UserModel } = require("../models");

@Resolver()
export class UserResolver {
  @Query((_returns) => User, { nullable: true })
  async current(@Ctx() ctx: Context): Promise<User> {
    return await UserModel.findOne({ where: { id: ctx.user.id } });
  }

  @Mutation((_returns) => String, { nullable: true })
  async register(
    @Arg("login") login: string,
    @Arg("password") password: string
  ): Promise<string> {
    const user = await UserModel.create({
      login,
      password: await bcrypt.hash(password, 10),
    });

    return jsonwebtoken.sign(
      { id: user.id, login: user.login },
      process.env.JWT_SECRET || "",
      { expiresIn: "3m" }
    );
  }

  @Mutation((_returns) => String, { nullable: true })
  async login(@Arg("login") login: string, @Arg("password") password: string) {
    const user = await UserModel.findOne({ where: { login } });

    if (!user) {
      throw new Error("This user does not exist.");
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error("Your password is incorrect.");
    }

    return jsonwebtoken.sign(
      { id: user.id, login: user.login },
      process.env.JWT_SECRET || "",
      {
        expiresIn: "1d",
      }
    );
  }
}
