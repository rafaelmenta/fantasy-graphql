'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _season = require('../../object-types/season');

var _season2 = _interopRequireDefault(_season);

var _setup = require('../../../model/setup');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLNonNull = graphql.GraphQLNonNull;


var SeasonQuery = {
  season: {
    type: _season2.default,
    resolve: resolver(_setup.Season),
    args: {
      id_season: {
        name: 'id_season',
        type: new GraphQLNonNull(GraphQLInt)
      }
    }
  },
  current_season: {
    type: _season2.default,
    resolve: _setup.Season.Current
  },
  seasons: {
    type: new GraphQLList(_season2.default),
    resolve: resolver(_setup.Season)
  }
};

exports.default = SeasonQuery;