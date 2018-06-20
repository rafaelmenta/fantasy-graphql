'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _round = require('../../object-types/round');

var _round2 = _interopRequireDefault(_round);

var _setup = require('../../../model/setup');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLNonNull = graphql.GraphQLNonNull;


var RoundQuery = {
  round: {
    type: _round2.default,
    resolve: resolver(_setup.Round),
    args: {
      id_round: {
        name: 'id_round',
        type: new GraphQLNonNull(GraphQLInt)
      }
    }
  },
  rounds: {
    type: new GraphQLList(_round2.default),
    resolve: resolver(_setup.Round),
    args: {
      id_season: {
        name: 'id_season',
        type: new GraphQLList(GraphQLInt)
      }
    }
  }
};

exports.default = RoundQuery;