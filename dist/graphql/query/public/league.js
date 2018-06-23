'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _league = require('../../object-types/league');

var _league2 = _interopRequireDefault(_league);

var _setup = require('../../../model/setup');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLNonNull = graphql.GraphQLNonNull;


var LeagueQuery = {
  leagues: {
    type: new GraphQLList(_league2.default),
    resolve: resolver(_setup.League)
  },
  league: {
    type: _league2.default,
    resolve: resolver(_setup.League),
    args: {
      id_league: {
        type: new GraphQLNonNull(GraphQLInt),
        name: 'id_league'
      }
    }
  }
};

exports.default = LeagueQuery;