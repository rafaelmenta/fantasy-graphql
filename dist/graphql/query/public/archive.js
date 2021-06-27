'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArchiveQuery = void 0;

var _graphql = require("graphql");

var _graphqlSequelize = require("graphql-sequelize");

var _archiveTeamStats = require("../../object-types/archive-team-stats");

var _archiveTeamStats2 = _interopRequireDefault(require("../../../model/archive-team-stats"));

var _archiveTeamPlayoffsStats = require("../../object-types/archive-team-playoffs-stats");

var _archive_team_playoffs_stats = require("../../../model/archive_team_playoffs_stats");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ArchiveQuery = {
  archive_team_stats: {
    type: new _graphql.GraphQLList(_archiveTeamStats.ArchiveTeamStatsType),
    resolve: (0, _graphqlSequelize.resolver)(_archiveTeamStats2["default"]),
    args: {
      id_sl: {
        type: _graphql.GraphQLInt
      },
      id_league: {
        type: _graphql.GraphQLInt
      },
      id_season: {
        type: _graphql.GraphQLInt
      },
      slug: {
        type: _graphql.GraphQLString
      }
    }
  },
  archive_team_playoffs_stats: {
    type: new _graphql.GraphQLList(_archiveTeamPlayoffsStats.ArchiveTeamPlayoffsStatsType),
    resolve: (0, _graphqlSequelize.resolver)(_archive_team_playoffs_stats.ArchiveTeamPlayoffsStats),
    args: {
      id_sl: {
        type: _graphql.GraphQLInt
      },
      id_league: {
        type: _graphql.GraphQLInt
      },
      id_season: {
        type: _graphql.GraphQLInt
      },
      slug: {
        type: _graphql.GraphQLString
      }
    }
  }
};
exports.ArchiveQuery = ArchiveQuery;