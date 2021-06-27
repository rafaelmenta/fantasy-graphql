"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _teamSl = _interopRequireDefault(require("./team-sl"));

var _user = _interopRequireDefault(require("./user"));

var _conference = _interopRequireDefault(require("./conference"));

var _leagueConfig = _interopRequireDefault(require("./league-config"));

var _freeAgencyHistory = _interopRequireDefault(require("./free-agency-history"));

var _setup = require("../../model/setup");

var _player = _interopRequireDefault(require("./player"));

var _trade = _interopRequireDefault(require("./trade"));

var _season = _interopRequireDefault(require("./season"));

var _draft = _interopRequireDefault(require("./draft"));

var _draftStatus = _interopRequireDefault(require("./enum/draft-status"));

var _player2 = _interopRequireDefault(require("../../model/player"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLBoolean = graphql.GraphQLBoolean;
var teamMap;

var ManualTeam = function ManualTeam(type) {
  return {
    type: new GraphQLObjectType({
      name: "ManualTeam".concat(type),
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
        id_pick: {
          type: GraphQLInt
        },
        round: {
          type: GraphQLInt
        },
        order: {
          type: GraphQLInt
        },
        is_used: {
          type: GraphQLBoolean
        },
        deadline: {
          type: GraphQLString
        },
        id_player: {
          type: GraphQLInt
        },
        player: {
          type: _player["default"],
          resolve: function resolve(pick) {
            return pick.id_player && _player2["default"].findOne({
              where: {
                id_player: pick.id_player
              }
            });
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
        type: _user["default"],
        resolve: resolver(_setup.League.Owner)
      },
      conferences: {
        type: new GraphQLList(_conference["default"]),
        resolve: resolver(_setup.League.Conferences)
      },
      teams: {
        type: new GraphQLList(_teamSl["default"]),
        resolve: _setup.League.Teams
      },
      configs: {
        type: new GraphQLList(_leagueConfig["default"]),
        resolve: resolver(_setup.League.Configs)
      },
      free_agency_history: {
        type: new GraphQLList(_freeAgencyHistory["default"]),
        resolve: _setup.FreeAgencyHistory.ByLeague
      },
      free_agents: {
        type: new GraphQLList(_player["default"]),
        resolve: _setup.League.FreeAgents
      },
      trade_history: {
        type: new GraphQLList(_trade["default"]),
        resolve: _setup.Trade.History
      },
      previous_drafts: {
        type: new GraphQLList(_draft["default"]),
        resolve: function resolve(league) {
          return _setup.Draft.findAll({
            where: {
              id_league: league.id_league,
              $or: {
                status_draft: _draftStatus["default"].parseValue('STATUS_FINISHED'),
                year_draft: {
                  $lt: new Date().getFullYear()
                }
              }
            }
          });
        }
      },
      next_drafts: {
        type: new GraphQLList(_draft["default"]),
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
              id_draft: {
                type: GraphQLInt
              },
              id_league: {
                type: GraphQLInt
              },
              year_draft: {
                type: GraphQLInt
              },
              draft_type: {
                type: GraphQLInt
              },
              status_draft: {
                type: GraphQLString
              },
              season: {
                type: _season["default"]
              },
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
var _default = LeagueType;
exports["default"] = _default;