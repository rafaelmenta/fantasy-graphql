'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _userTeam = require('../user-team');

var _userTeam2 = _interopRequireDefault(_userTeam);

var _permission = require('../enum/permission');

var _permission2 = _interopRequireDefault(_permission);

var _setup = require('../../../model/setup');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList;


var UserType = new GraphQLObjectType({
  name: 'PrivateUser',
  description: 'A User',
  fields: function fields() {
    return {
      id_user: { type: GraphQLInt },
      login: { type: GraphQLString },
      first_name: { type: GraphQLString },
      last_name: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
      nickname: { type: GraphQLString },
      id_permission: { type: GraphQLInt },
      teams: {
        type: new GraphQLList(_userTeam2.default),
        resolve: resolver(_setup.User.UserTeams)
      }
    };
  }
});

exports.default = UserType;