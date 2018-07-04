'use strict';

import { GraphQLInt, GraphQLList, GraphQLString } from 'graphql';
import { resolver } from 'graphql-sequelize';
import { ArchiveTeamStatsType } from '../../object-types/archive-team-stats';
import ArchiveTeamStats from '../../../model/archive-team-stats';
import { ArchiveTeamPlayoffsStatsType } from '../../object-types/archive-team-playoffs-stats';
import { ArchiveTeamPlayoffsStats } from '../../../model/archive_team_playoffs_stats';


export const ArchiveQuery = {
  archive_team_stats: {
    type: new GraphQLList(ArchiveTeamStatsType),
    resolve: resolver(ArchiveTeamStats),
    args: {
      id_sl: { type: GraphQLInt },
      id_league: { type: GraphQLInt },
      id_season: { type: GraphQLInt },
      slug: { type: GraphQLString },
    }
  },
  archive_team_playoffs_stats: {
    type: new GraphQLList(ArchiveTeamPlayoffsStatsType),
    resolve: resolver(ArchiveTeamPlayoffsStats),
    args: {
      id_sl: { type: GraphQLInt },
      id_league: { type: GraphQLInt },
      id_season: { type: GraphQLInt },
      slug: { type: GraphQLString },
    }
  }
};
