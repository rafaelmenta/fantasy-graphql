'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _division = require('../../object-types/division');

var _division2 = _interopRequireDefault(_division);

var _setup = require('../../../model/setup');

var _connection = require('../../../database/connection');

var _connection2 = _interopRequireDefault(_connection);

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
  },
  league_divisions: {
    type: new GraphQLList(_division2.default),
    args: {
      id_league: { type: GraphQLInt }
    },
    resolve: function resolve(root, _ref) {
      var id_league = _ref.id_league;
      return _connection2.default.query('\n      SELECT d.*\n      FROM division d\n      JOIN conference c on d.id_conference=c.id_conference\n      WHERE c.id_league=' + id_league + ';\n    ', { model: _setup.Division });
    }
  }
};

exports.default = DivisionQuery;