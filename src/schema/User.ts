import { Int, Field, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field((_type) => Int)
  id: number;

  @Field()
  login: string;
}
