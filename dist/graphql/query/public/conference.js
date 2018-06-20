'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _conference = require('../../object-types/conference');

var _conference2 = _interopRequireDefault(_conference);

var _setup = require('../../../model/setup');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLNonNull = graphql.GraphQLNonNull;


var ConferenceQuery = {
  conferences: {
    type: new GraphQLList(_conference2.default),
    resolve: resolver(_setup.Conference)
  }
};

exports.default = ConferenceQuery;