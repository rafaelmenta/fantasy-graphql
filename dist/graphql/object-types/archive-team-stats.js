'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArchiveTeamStatsType = undefined;

var _graphql = require('graphql');

var ArchiveTeamStatsType = exports.ArchiveTeamStatsType = new _graphql.GraphQLObjectType({
  name: 'ArchiveTeamStats',
  fields: function fields() {
    return {
      ats_id: { type: _graphql.GraphQLInt },
      id_season: { type: _graphql.GraphQLInt },
      id_league: { type: _graphql.GraphQLInt },
      name: { type: _graphql.GraphQLString },
      slug: { type: _graphql.GraphQLString },
      season: { type: _graphql.GraphQLString },
      win: { type: _graphql.GraphQLInt },
      loss: { type: _graphql.GraphQLInt },
      fantasy_points: { type: _graphql.GraphQLFloat }
    };
  }
});