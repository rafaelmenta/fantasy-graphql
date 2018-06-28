'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _teamSl = require('./team-sl');

var _teamSl2 = _interopRequireDefault(_teamSl);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _conference = require('./conference');

var _conference2 = _interopRequireDefault(_conference);

var _leagueConfig = require('./league-config');

var _leagueConfig2 = _interopRequireDefault(_leagueConfig);

var _freeAgencyHistory = require('./free-agency-history');

var _freeAgencyHistory2 = _interopRequireDefault(_freeAgencyHistory);

var _setup = require('../../model/setup');

var _player = require('./player');

var _player2 = _interopRequireDefault(_player);

var _trade = require('./trade');

var _trade2 = _interopRequireDefault(_trade);

var _season = require('./season');

var _season2 = _interopRequireDefault(_season);

var _draft = require('./draft');

var _draft2 = _interopRequireDefault(_draft);

var _draftStatus = require('./enum/draft-status');

var _draftStatus2 = _interopRequireDefault(_draftStatus);

var _player3 = require('../../model/player');

var _player4 = _interopRequireDefault(_player3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLBoolean = graphql.GraphQLBoolean;


var teamMap = void 0;

var ManualTeam = function ManualTeam(type) {
  return {
    type: new GraphQLObjectType({
      name: 'ManualTeam' + type,
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
    name: 'ManualPicks',
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

    var teams$ = _setup.TeamSl.findAll({
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

var LeagueType = new GraphQLObjectType({
  name: 'League',
  fields: function fields() {
    return {
      id_league: {
        type: GraphQLInt
      },
      name: {
        type: GraphQLString
      },
      symbol: {
        type: GraphQLString
      },
      number_of_teams: {
        type: GraphQLInt
      },
      owner: {
        type: _user2.default,
        resolve: resolver(_setup.League.Owner)
      },
      conferences: {
        type: new GraphQLList(_conference2.default),
        resolve: resolver(_setup.League.Conferences)
      },
      teams: {
        type: new GraphQLList(_teamSl2.default),
        resolve: _setup.League.Teams
      },
      configs: {
        type: new GraphQLList(_leagueConfig2.default),
        resolve: resolver(_setup.League.Configs)
      },
      free_agency_history: {
        type: new GraphQLList(_freeAgencyHistory2.default),
        resolve: _setup.FreeAgencyHistory.ByLeague
      },
      free_agents: {
        type: new GraphQLList(_player2.default),
        resolve: _setup.League.FreeAgents
      },
      trade_history: {
        type: new GraphQLList(_trade2.default),
        resolve: _setup.Trade.History
      },
      previous_drafts: {
        type: new GraphQLList(_draft2.default),
        resolve: function resolve(league) {
          return _setup.Draft.findAll({
            where: {
              id_league: league.id_league,
              $or: {
                status_draft: _draftStatus2.default.parseValue('STATUS_FINISHED'),
                year_draft: {
                  $lt: new Date().getFullYear()
                }
              }
            }
          });
        }
      },
      next_drafts: {
        type: new GraphQLList(_draft2.default),
        resolve: function resolve(league) {
          return _setup.Draft.findAll({
            where: {
              id_league: league.id_league,
              year_draft: {
                $gte: new Date().getFullYear()
              }
            }
          });
        }
      },
      current_draft: {
        type: new GraphQLObjectType({
          name: 'ManualDraft',
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
        resolve: function resolve(league) {
          return _setup.League.MostRecentDraft(league);
        }
      }
    };
  }
});

exports.default = LeagueType;