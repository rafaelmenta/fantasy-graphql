"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _teamSl = _interopRequireDefault(require("../../object-types/team-sl"));

var _setup = require("../../../model/setup");

var _teamOverview = require("../../object-types/manual/team-overview");

var _teamRoster = require("../../object-types/manual/team-roster");

var _trade = _interopRequireDefault(require("../../../model/trade"));

var _tradeStatus = _interopRequireDefault(require("../../object-types/enum/trade-status"));

var _connection = _interopRequireDefault(require("../../../database/connection"));

var _auctionStatus = require("../../object-types/enum/auction-status");

require("core-js/stable");

require("regenerator-runtime/runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLString = graphql.GraphQLString,
    GraphQLNonNull = graphql.GraphQLNonNull;
var CapType = new graphql.GraphQLObjectType({
  name: 'CapType',
  fields: {
    salary_cap: {
      type: graphql.GraphQLFloat
    },
    team_salaries: {
      type: graphql.GraphQLFloat
    },
    open_bids: {
      type: graphql.GraphQLFloat
    }
  }
});
var TeamSLQuery = {
  team: {
    type: _teamSl["default"],
    resolve: resolver(_setup.TeamSl),
    args: {
      id_sl: {
        name: 'id_sl',
        type: GraphQLInt
      },
      slug: {
        name: 'slug',
        type: GraphQLString
      }
    }
  },
  teams: {
    type: new GraphQLList(_teamSl["default"]),
    resolve: resolver(_setup.TeamSl),
    args: {
      id_sl: {
        name: 'id_sl',
        type: new GraphQLList(GraphQLInt)
      }
    }
  },
  team_overview: _teamOverview.ManualTeamOverviewQuery,
  team_roster: _teamRoster.ManualTeamRosterQuery,
  team_trades: {
    type: GraphQLInt,
    args: {
      id_sl: {
        name: 'id_sl',
        type: GraphQLInt
      }
    },
    resolve: function resolve(root, args) {
      return _trade["default"].count({
        where: {
          id_receiver: args.id_sl,
          status_trade: _tradeStatus["default"].parseValue('PENDING')
        }
      });
    }
  },
  cap: {
    type: CapType,
    args: {
      id_sl: {
        type: GraphQLInt
      }
    },
    resolve: function () {
      var _resolve = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(root, _ref) {
        var id_sl, team, league, configs, salaryCapConfig, salaryCap, query, contracts, salaries;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id_sl = _ref.id_sl;
                _context.next = 3;
                return _setup.TeamSl.findOne({
                  where: {
                    id_sl: id_sl
                  }
                });

              case 3:
                team = _context.sent;

                if (team) {
                  _context.next = 6;
                  break;
                }

                throw new Error('TEAM_NOT_FOUND');

              case 6:
                ;
                _context.next = 9;
                return _setup.League.findOne({
                  where: {
                    id_league: team.league_id
                  }
                });

              case 9:
                league = _context.sent;
                _context.next = 12;
                return league.getConfigs();

              case 12:
                configs = _context.sent;
                salaryCapConfig = configs.find(function (config) {
                  return config.id_config === 'SALARY_CAP';
                });
                salaryCap = Number(salaryCapConfig.config_value) * 1000 * 1000;

                if (!isNaN(salaryCap)) {
                  _context.next = 17;
                  break;
                }

                throw new Error('SALARY_CAP_NOT_AVAILABLE');

              case 17:
                _context.next = 19;
                return _connection["default"].query("\n        SELECT sum(b.salary) as salary\n        FROM player_bid b\n        JOIN auction a ON a.id_auction=b.id_auction\n        WHERE a.status = ".concat(_auctionStatus.AuctionStatus.parseValue('STATUS_OPEN'), "\n          AND b.id_sl = ").concat(id_sl, "\n          AND b.expiration >= CURDATE();\n      "), {
                  model: _setup.PlayerBid
                });

              case 19:
                query = _context.sent;
                _context.next = 22;
                return _setup.TeamSl.RosterSalary({
                  id_sl: id_sl,
                  id_league: team.league_id
                });

              case 22:
                contracts = _context.sent;
                salaries = contracts.reduce(function (soFar, contract) {
                  return soFar + contract.contract_salary;
                }, 0);
                return _context.abrupt("return", {
                  salary_cap: salaryCap,
                  team_salaries: salaries,
                  open_bids: query[0].salary
                });

              case 25:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function resolve(_x, _x2) {
        return _resolve.apply(this, arguments);
      }

      return resolve;
    }()
  }
};
var _default = TeamSLQuery;
exports["default"] = _default;