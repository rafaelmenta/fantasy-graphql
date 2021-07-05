"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuctionQuery = void 0;

var _auction = require("../../object-types/auction");

var _setup = require("../../../model/setup");

var _playerBid = require("../../object-types/player-bid");

var _leagueConfig = _interopRequireDefault(require("../../object-types/league-config"));

require("core-js/stable");

require("regenerator-runtime/runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLNonNull = graphql.GraphQLNonNull;
var AuctionQuery = {
  auctions: {
    type: new GraphQLList(_auction.Auction),
    resolve: resolver(_setup.Auction)
  },
  auction: {
    type: _auction.Auction,
    resolve: resolver(_setup.Auction),
    args: {
      id_auction: {
        type: new GraphQLNonNull(GraphQLInt),
        name: 'id_auction'
      }
    }
  },
  league_auctions: {
    type: new GraphQLList(_auction.Auction),
    resolve: resolver(_setup.Auction),
    args: {
      id_league: {
        type: new GraphQLNonNull(GraphQLInt),
        name: 'id_league'
      }
    }
  },
  bids: {
    type: new GraphQLList(_playerBid.PlayerBid),
    resolve: resolver(_setup.PlayerBid),
    args: {
      id_auction: {
        type: new GraphQLNonNull(GraphQLInt),
        name: 'id_auction'
      }
    }
  },
  rules: {
    type: new GraphQLList(_leagueConfig["default"]),
    args: {
      id_auction: {
        type: new GraphQLNonNull(GraphQLInt)
      }
    },
    resolve: function () {
      var _resolve = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(root, _ref) {
        var id_auction, auction, id_league, configs, auctionConfigs;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id_auction = _ref.id_auction;
                _context.next = 3;
                return _setup.Auction.find({
                  where: {
                    id_auction: id_auction
                  }
                });

              case 3:
                auction = _context.sent;

                if (auction) {
                  _context.next = 6;
                  break;
                }

                throw new Error('AUCTION_NOT_FOUND');

              case 6:
                id_league = auction.id_league;
                _context.next = 9;
                return _setup.LeagueConfig.findAll({
                  where: {
                    id_league: id_league
                  }
                });

              case 9:
                configs = _context.sent;
                auctionConfigs = ['AUCTION_MIN_BID', 'AUCTION_MAX_BID', 'AUCTION_BID_INCREMENT', 'AUCTION_BID_OFFSET_TIME'];
                return _context.abrupt("return", configs.filter(function (config) {
                  return auctionConfigs.includes(config.id_config);
                }));

              case 12:
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
exports.AuctionQuery = AuctionQuery;