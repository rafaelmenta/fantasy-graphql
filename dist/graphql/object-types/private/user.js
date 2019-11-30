'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _userTeam = require('../user-team');

var _userTeam2 = _interopRequireDefault(_userTeam);

var _permission = require('../enum/permission');

var _permission2 = _interopRequireDefault(_permission);

var _setup = require('../../../model/setup');

var _league = require('../../../model/league');

var _league2 = _interopRequireDefault(_league);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    var _ref;

    return _ref = {
      id_user: { type: GraphQLInt },
      id_permission: { type: GraphQLInt },
      login: { type: GraphQLString },
      first_name: { type: GraphQLString },
      last_name: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
      nickname: { type: GraphQLString }
    }, _defineProperty(_ref, 'id_permission', { type: GraphQLInt }), _defineProperty(_ref, 'teams', {
      type: new GraphQLList(_userTeam2.default),
      resolve: resolver(_setup.User.UserTeams)
    }), _defineProperty(_ref, 'leagues_owned', {
      type: new GraphQLList(GraphQLInt),
      resolve: function resolve(user) {
        return _league2.default.findAll({ attributes: ['id_league'], where: { id_owner: user.id_user } }).then(function (leagues) {
          return leagues.map(function (league) {
            return league.id_league;
          });
        });
      }
    }), _ref;
  }
});

exports.default = UserType;