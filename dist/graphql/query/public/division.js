'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _division = require('../../object-types/division');

var _division2 = _interopRequireDefault(_division);

var _setup = require('../../../model/setup');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLNonNull = graphql.GraphQLNonNull;


var DivisionQuery = {
  divisions: {
    type: new GraphQLList(_division2.default),
    resolve: resolver(_setup.Division)
  }
};

exports.default = DivisionQuery;