'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _freeAgencyHistory = require('../../object-types/free-agency-history');

var _freeAgencyHistory2 = _interopRequireDefault(_freeAgencyHistory);

var _setup = require('../../../model/setup');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLNonNull = graphql.GraphQLNonNull;


var DEFAULT_LIMIT = 20;

var FreeAgencyHistoryQuery = {
  free_agency_history: {
    type: new GraphQLList(_freeAgencyHistory2.default),
    resolve: _setup.FreeAgencyHistory.ByLeague,
    args: {
      id_league: {
        name: 'id_league',
        type: new GraphQLNonNull(GraphQLInt)
      },
      limit: {
        name: 'limit',
        type: GraphQLInt,
        defaultValue: DEFAULT_LIMIT
      }
    }
  }
};

exports.default = FreeAgencyHistoryQuery;