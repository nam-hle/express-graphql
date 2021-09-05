import { Context } from "@apollo/client";
import { Arg, Ctx, Query, Resolver } from "type-graphql";

import { beersData } from "../data/beers";
import { Beer } from "../schema/Beer";

@Resolver()
export class BeerResolver {
  @Query((_returns) => Beer, { nullable: true })
  async beer(
    @Arg("id") id: string,
    @Ctx() ctx: Context
  ): Promise<Beer | undefined> {
    if (ctx.user) {
      return beersData.filter((beer) => beer.id === id)[0];
    }
    throw new Error("Sorry, you're not an authenticated user!");
  }

  @Query((_returns) => [Beer])
  async beers(@Arg("brand") brand: string, @Ctx() ctx: Context) {
    if (ctx.user) {
      return beersData.filter((beer) => beer.brand === brand);
    }
    throw new Error("Sorry, you're not an authenticated user!");
  }
}
