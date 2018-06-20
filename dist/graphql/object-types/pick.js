'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draft = require('./draft');

var _draft2 = _interopRequireDefault(_draft);

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


var PickType = new GraphQLObjectType({
  name: 'Pick',
  fields: function fields() {
    return {
      id_pick: {
        type: GraphQLInt
      },
      id_sl_original: {
        type: GraphQLInt
      },
      id_owner: {
        type: GraphQLInt
      },
      id_draft: {
        type: GraphQLInt
      },
      round: {
        type: GraphQLInt
      },
      order: {
        type: GraphQLInt
      },
      deadline: {
        type: GraphQLInt
      },
      is_used: {
        type: GraphQLBoolean
      },
      id_player: {
        type: GraphQLInt
      },
      draft: {
        type: _draft2.default,
        resolve: resolver(_setup.Pick.Draft)
      },
      owner: {
        type: _teamSl2.default,
        resolve: resolver(_setup.Pick.Owner)
      },
      original: {
        type: _teamSl2.default,
        resolve: resolver(_setup.Pick.Original)
      }
    };
  }
});

exports.default = PickType;