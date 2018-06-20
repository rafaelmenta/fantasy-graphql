'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _teamSl = require('./team-sl');

var _teamSl2 = _interopRequireDefault(_teamSl);

var _conference = require('./conference');

var _conference2 = _interopRequireDefault(_conference);

var _setup = require('../../model/setup');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList;


var DivisionType = new GraphQLObjectType({
  name: 'Division',
  fields: function fields() {
    return {
      id_division: {
        type: GraphQLInt
      },
      name: {
        type: GraphQLString
      },
      symbol: {
        type: GraphQLString
      },
      teams: {
        type: new GraphQLList(_teamSl2.default),
        resolve: resolver(_setup.Division.Teams)
      },
      conference: {
        type: _conference2.default,
        resolve: resolver(_setup.Division.Conference)
      }
    };
  }
});

exports.default = DivisionType;