'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArchiveTeamPlayoffsStatsType = void 0;

var _graphql = require("graphql");

var ArchiveTeamPlayoffsStatsType = new _graphql.GraphQLObjectType({
  name: 'ArchiveTeamPlayoffsStats',
  fields: function fields() {
    return {
      atps_id: {
        type: _graphql.GraphQLInt
      },
      id_season: {
        type: _graphql.GraphQLInt
      },
      id_league: {
        type: _graphql.GraphQLInt
      },
      name: {
        type: _graphql.GraphQLString
      },
      slug: {
        type: _graphql.GraphQLString
      },
      season: {
        type: _graphql.GraphQLString
      },
      win: {
        type: _graphql.GraphQLInt
      },
      loss: {
        type: _graphql.GraphQLInt
      },
      fantasy_points: {
        type: _graphql.GraphQLFloat
      }
    };
  }
});
exports.ArchiveTeamPlayoffsStatsType = ArchiveTeamPlayoffsStatsType;