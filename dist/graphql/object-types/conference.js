"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _teamSl = _interopRequireDefault(require("./team-sl"));

var _division = _interopRequireDefault(require("./division"));

var _league = _interopRequireDefault(require("./league"));

var _setup = require("../../model/setup");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList;
var ConferenceType = new GraphQLObjectType({
  name: 'Conference',
  fields: function fields() {
    return {
      id_conference: {
        type: GraphQLInt
      },
      name: {
        type: GraphQLString
      },
      symbol: {
        type: GraphQLString
      },
      divisions: {
        type: new GraphQLList(_division["default"]),
        resolve: resolver(_setup.Conference.Divisions)
      },
      teams: {
        type: new GraphQLList(_teamSl["default"]),
        resolve: _setup.Conference.Teams
      },
      league: {
        type: _league["default"],
        resolve: resolver(_setup.Conference.League)
      }
    };
  }
});
var _default = ConferenceType;
exports["default"] = _default;