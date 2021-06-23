import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';

export const Auction = new GraphQLObjectType({
  name: 'Auction',
  fields: () => ({
    id_auction: { type: GraphQLInt },
    id_league: { type: GraphQLInt },
    status: { type: GraphQLInt },
    date_started: { type: GraphQLString },
    date_ended: { type: GraphQLString },
  }),
});
