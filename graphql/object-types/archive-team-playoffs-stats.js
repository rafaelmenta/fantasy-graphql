'use strict';

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
} from 'graphql';

export const ArchiveTeamPlayoffsStatsType = new GraphQLObjectType({
  name: 'ArchiveTeamPlayoffsStats',
  fields: () => ({
    atps_id: { type: GraphQLInt },
    id_season: { type: GraphQLInt },
    id_league: { type: GraphQLInt },
    name: { type: GraphQLString },
    slug: { type: GraphQLString },
    season: { type: GraphQLString },
    win: { type: GraphQLInt },
    loss: { type: GraphQLInt },
    fantasy_points: { type: GraphQLFloat },
  }),
});