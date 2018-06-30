'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draft = require('../../object-types/draft');

var _draft2 = _interopRequireDefault(_draft);

var _setup = require('../../../model/setup');

var _season = require('../../object-types/season');

var _season2 = _interopRequireDefault(_season);

var _teamSl = require('../../../model/team-sl');

var _teamSl2 = _interopRequireDefault(_teamSl);

var _player = require('../../object-types/player');

var _player2 = _interopRequireDefault(_player);

var _player3 = require('../../../model/player');

var _player4 = _interopRequireDefault(_player3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLNonNull = graphql.GraphQLNonNull,
    GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLBoolean = graphql.GraphQLBoolean,
    GraphQLString = graphql.GraphQLString;


var teamMap = {};

var ManualTeam = function ManualTeam(type) {
  return {
    type: new GraphQLObjectType({
      name: 'ManualDraftTeam' + type,
      fields: function fields() {
        return {
          id_sl: {
            type: GraphQLInt
          },
          city: {
            type: GraphQLString
          },
          nickname: {
            type: GraphQLString
          },
          slug: {
            type: GraphQLString
          },
          symbol: {
            type: GraphQLString
          }
        };
      }
    }),
    resolve: function resolve(pick) {
      return teamMap[pick[type]];
    }
  };
};

var ManualPicks = {
  type: new GraphQLList(new GraphQLObjectType({
    name: 'ManualDraftPicks',
    fields: function fields() {
      return {
        id_pick: { type: GraphQLInt },
        round: { type: GraphQLInt },
        order: { type: GraphQLInt },
        is_used: { type: GraphQLBoolean },
        deadline: { type: GraphQLString },
        id_player: { type: GraphQLInt },
        player: {
          type: _player2.default,
          resolve: function resolve(pick) {
            return pick.id_player && _player4.default.findOne({ where: { id_player: pick.id_player } });
          }
        },
        owner: ManualTeam('id_owner'),
        original: ManualTeam('id_sl_original')
      };
    }
  })),
  resolve: function resolve(draft) {
    var picks$ = _setup.Pick.findAll({
      where: {
        id_draft: draft.id_draft
      }
    });

    var teams$ = _teamSl2.default.findAll({
      include: [{
        model: _setup.Division,
        include: [{
          model: _setup.Conference,
          where: {
            id_league: draft.id_league
          }
        }]
      }]
    });

    return Promise.all([picks$, teams$]).then(function (results) {
      teamMap = results[1].reduce(function (teams, team) {
        teams[team.id_sl] = team;
        return teams;
      }, {});
      return results[0];
    });
  }
};

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
  },
  draft_overview: {
    type: new GraphQLObjectType({
      name: 'ManualDraftOverview',
      fields: function fields() {
        return {
          id_draft: { type: GraphQLInt },
          id_league: { type: GraphQLInt },
          year_draft: { type: GraphQLInt },
          draft_type: { type: GraphQLInt },
          status_draft: { type: GraphQLString },
          season: { type: _season2.default },
          picks: ManualPicks
        };
      }
    }),
    args: {
      id_draft: {
        name: 'id_draft',
        type: GraphQLInt
      }
    },
    resolve: function resolve(root, args) {
      return _setup.Draft.findOne({
        include: [{
          model: _setup.Season
        }],
        where: {
          id_draft: args.id_draft
        }
      });
    }
  }
};

exports.default = DraftQuery;