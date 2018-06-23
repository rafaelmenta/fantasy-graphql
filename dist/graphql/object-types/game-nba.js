'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _teamNba = require('./team-nba');

var _teamNba2 = _interopRequireDefault(_teamNba);

var _round = require('./round');

var _round2 = _interopRequireDefault(_round);

var _setup = require('../../model/setup');

var _graphqlDate = require('graphql-date');

var _graphqlDate2 = _interopRequireDefault(_graphqlDate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLBoolean = graphql.GraphQLBoolean,
    GraphQLList = graphql.GraphQLList;


var GameNbaType = new GraphQLObjectType({
  name: 'GameNba',
  fields: function fields() {
    return {
      id_game_nba: {
        type: GraphQLInt
      },
      away_team: {
        type: _teamNba2.default,
        resolve: resolver(_setup.GameNba.HomeTeam)
      },
      home_team: {
        type: _teamNba2.default,
        resolve: resolver(_setup.GameNba.AwayTeam)
      },
      round_away: {
        type: _round2.default,
        resolve: resolver(_setup.GameNba.AwayRound)
      },
      round_home: {
        type: _round2.default,
        resolve: resolver(_setup.GameNba.HomeRound)
      },
      game_time: { type: _graphqlDate2.default },
      is_finished: { type: GraphQLBoolean },
      external_id: { type: GraphQLString }
    };
  }
});

exports.default = GameNbaType;