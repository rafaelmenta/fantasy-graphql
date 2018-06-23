'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _teamSl = require('./team-sl');

var _teamSl2 = _interopRequireDefault(_teamSl);

var _division = require('./division');

var _division2 = _interopRequireDefault(_division);

var _league = require('./league');

var _league2 = _interopRequireDefault(_league);

var _setup = require('../../model/setup');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        type: new GraphQLList(_division2.default),
        resolve: resolver(_setup.Conference.Divisions)
      },
      teams: {
        type: new GraphQLList(_teamSl2.default),
        resolve: _setup.Conference.Teams
      },
      league: {
        type: _league2.default,
        resolve: resolver(_setup.Conference.League)
      }
    };
  }
});

exports.default = ConferenceType;