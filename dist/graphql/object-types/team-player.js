'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _setup = require('../../model/setup');

var _teamSl = require('./team-sl');

var _teamSl2 = _interopRequireDefault(_teamSl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLBoolean = graphql.GraphQLBoolean,
    GraphQLList = graphql.GraphQLList;


var TeamPlayerType = new GraphQLObjectType({
  name: 'TeamPlayer',
  fields: function fields() {
    return {
      tp_code: { type: GraphQLInt },
      id_sl: { type: GraphQLInt },
      id_player: { type: GraphQLInt },
      order: { type: GraphQLInt },
      primary_position: { type: GraphQLString },
      secondary_position: { type: GraphQLString },

      team: {
        type: _teamSl2.default,
        resolve: resolver(_setup.TeamPlayer.TeamSl)
      }
    };
  }
});

exports.default = TeamPlayerType;