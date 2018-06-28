'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pick = require('./pick');

var _pick2 = _interopRequireDefault(_pick);

var _league = require('./league');

var _league2 = _interopRequireDefault(_league);

var _setup = require('../../model/setup');

var _player = require('./player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList;


var DraftType = new GraphQLObjectType({
  name: 'Draft',
  fields: function fields() {
    return {
      id_draft: {
        type: GraphQLInt
      },
      id_season: {
        type: GraphQLInt
      },
      id_league: {
        type: GraphQLInt
      },
      year_draft: {
        type: GraphQLInt
      },
      status_draft: {
        type: GraphQLInt
      },
      draft_type: {
        type: GraphQLInt
      },
      picks: {
        type: new GraphQLList(_pick2.default),
        resolve: resolver(_setup.Draft.Picks)
      },
      season: {
        type: _pick2.default,
        resolve: resolver(_setup.Draft.Season)
      },
      league: {
        type: _league2.default,
        resolve: resolver(_setup.Draft.League)
      },
      available_players: {
        type: new GraphQLList(_player2.default),
        resolve: _setup.Draft.AvailablePlayers
      }
    };
  }
});

exports.default = DraftType;