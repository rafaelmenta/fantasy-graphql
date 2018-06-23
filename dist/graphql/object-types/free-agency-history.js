'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _player = require('./player');

var _player2 = _interopRequireDefault(_player);

var _teamSl = require('./team-sl');

var _teamSl2 = _interopRequireDefault(_teamSl);

var _setup = require('../../model/setup');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLBoolean = graphql.GraphQLBoolean,
    GraphQLList = graphql.GraphQLList;


var FreeAgencyHistoryType = new GraphQLObjectType({
  name: 'FreeAgencyHistory',
  fields: function fields() {
    return {
      fah_code: { type: GraphQLInt },
      event_date: { type: GraphQLString },
      action: { type: GraphQLString },
      id_player: { type: GraphQLInt },
      id_sl: { type: GraphQLInt },
      player: {
        type: _player2.default,
        resolve: resolver(_setup.FreeAgencyHistory.Player)
      },
      team_sl: {
        type: _teamSl2.default,
        resolve: resolver(_setup.FreeAgencyHistory.TeamSl)
      }
    };
  }
});

exports.default = FreeAgencyHistoryType;