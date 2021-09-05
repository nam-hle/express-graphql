import { Field, Float, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Beer {
  @Field((_type) => Int)
  id: string;

  @Field((_type) => String)
  name: string;

  @Field((_type) => String)
  brand: String;

  @Field((_type) => Float)
  price: number;
}
