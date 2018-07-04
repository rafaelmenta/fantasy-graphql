'use strict';

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
} from 'graphql';

export const ArchiveTeamStatsType = new GraphQLObjectType({
  name: 'ArchiveTeamStats',
  fields: () => ({
    ats_id: { type: GraphQLInt },
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