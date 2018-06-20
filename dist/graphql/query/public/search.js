'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _player = require('../../object-types/player');

var _player2 = _interopRequireDefault(_player);

var _teamSl = require('../../object-types/team-sl');

var _teamSl2 = _interopRequireDefault(_teamSl);

var _setup = require('../../../model/setup');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLNonNull = graphql.GraphQLNonNull;


var SearchQuery = {
  search_players: {
    type: new GraphQLList(_player2.default),
    resolve: _setup.Player.PlayerSearch,
    args: {
      query: {
        type: new GraphQLNonNull(GraphQLString),
        name: 'query'
      }
    }
  },
  search_teams: {
    type: new GraphQLList(_teamSl2.default),
    resolve: _setup.TeamSl.TeamSearch,
    args: {
      query: {
        type: new GraphQLNonNull(GraphQLString),
        name: 'query'
      },
      id_league: {
        type: new GraphQLNonNull(GraphQLInt),
        name: 'id_league'
      }
    }
  }
};

exports.default = SearchQuery;