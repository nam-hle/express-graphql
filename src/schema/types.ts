import { GraphQLResolveInfo } from "graphql";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Beer = {
  __typename?: "Beer";
  id: Scalars["Int"];
  name: Scalars["String"];
  brand?: Maybe<Scalars["String"]>;
  price?: Maybe<Scalars["Float"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  register?: Maybe<Scalars["String"]>;
  login?: Maybe<Scalars["String"]>;
};

export type MutationRegisterArgs = {
  login: Scalars["String"];
  password: Scalars["String"];
};

export type MutationLoginArgs = {
  login: Scalars["String"];
  password: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  current?: Maybe<User>;
  beer?: Maybe<Beer>;
  beers?: Maybe<Array<Maybe<Beer>>>;
};

export type QueryBeerArgs = {
  id: Scalars["Int"];
};

export type QueryBeersArgs = {
  brand?: Maybe<Scalars["String"]>;
};

export type User = {
  __typename?: "User";
  id: Scalars["Int"];
  login: Scalars["String"];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Beer: ResolverTypeWrapper<Beer>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Beer: Beer;
  Int: Scalars["Int"];
  String: Scalars["String"];
  Float: Scalars["Float"];
  Mutation: {};
  Query: {};
  User: User;
  Boolean: Scalars["Boolean"];
};

export type BeerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Beer"] = ResolversParentTypes["Beer"]
> = {
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  brand?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  register?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRegisterArgs, "login" | "password">
  >;
  login?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, "login" | "password">
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  current?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  beer?: Resolver<
    Maybe<ResolversTypes["Beer"]>,
    ParentType,
    ContextType,
    RequireFields<QueryBeerArgs, "id">
  >;
  beers?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Beer"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryBeersArgs, never>
  >;
};

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  login?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Beer?: BeerResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};
