'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draft = require('../../object-types/draft');

var _draft2 = _interopRequireDefault(_draft);

var _setup = require('../../../model/setup');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLNonNull = graphql.GraphQLNonNull;


var DraftQuery = {
  draft: {
    type: _draft2.default,
    resolve: resolver(_setup.Draft),
    args: {
      id_draft: {
        name: 'id_draft',
        type: new GraphQLNonNull(GraphQLInt)
      }
    }
  },
  drafts: {
    type: new GraphQLList(_draft2.default),
    resolve: resolver(_setup.Draft),
    args: {
      id_league: {
        name: 'id_league',
        type: GraphQLInt
      },
      year_draft: {
        name: 'year_draft',
        type: GraphQLInt
      }
    }
  }
};

exports.default = DraftQuery;