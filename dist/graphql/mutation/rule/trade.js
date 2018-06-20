'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sequelize = require('Sequelize');

var _Sequelize2 = _interopRequireDefault(_Sequelize);

var _connection = require('../../../database/connection');

var _connection2 = _interopRequireDefault(_connection);

var _trade = require('../../object-types/trade');

var _trade2 = _interopRequireDefault(_trade);

var _tradeStatus = require('../../object-types/enum/trade-status');

var _tradeStatus2 = _interopRequireDefault(_tradeStatus);

var _setup = require('../../../model/setup');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var graphql = require('graphql');

var GraphQLList = graphql.GraphQLList,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLNonNull = graphql.GraphQLNonNull,
    GraphQLInputObjectType = graphql.GraphQLInputObjectType,
    GraphQLString = graphql.GraphQLString;


var input = new GraphQLInputObjectType({
  name: 'TradeInput',
  fields: function fields() {
    return {
      id_sender: { type: new GraphQLNonNull(GraphQLInt) },
      id_receiver: { type: new GraphQLNonNull(GraphQLInt) },
      trade_comment: { type: GraphQLString },
      sender_players: { type: new GraphQLList(GraphQLInt) },
      sender_picks: { type: new GraphQLList(GraphQLInt) },
      receiver_players: { type: new GraphQLList(GraphQLInt) },
      receiver_picks: { type: new GraphQLList(GraphQLInt) },
      status_trade: { type: GraphQLInt, defaultValue: _tradeStatus2.default.parseValue('PENDING') }
    };
  }
});

var getTradePlayer = function getTradePlayer(trade, player, sender) {
  return {
    id_trade: trade,
    id_player: player,
    is_sender: sender
  };
};

var getTradePick = function getTradePick(trade, pick, sender) {
  return {
    id_trade: trade,
    id_pick: pick,
    is_sender: sender
  };
};

var TradeMutation = {
  addTrade: {
    type: _trade2.default,
    args: {
      trade: { type: input }
    },
    resolve: function resolve(root, _ref) {
      var trade = _ref.trade;
      return _connection2.default.transaction(function (t) {
        return _setup.Trade.create(trade, { transaction: t }).then(function (createdTrade) {

          var senderPlayersRows = [];
          if (trade.sender_players) {
            senderPlayersRows = trade.sender_players.map(function (player) {
              return getTradePlayer(createdTrade.id_trade, player, true);
            });
          }

          var receiverPlayersRows = [];
          if (trade.receiver_players) {
            receiverPlayersRows = trade.receiver_players.map(function (player) {
              return getTradePlayer(createdTrade.id_trade, player, false);
            });
          }

          var senderPickRows = [];
          if (trade.sender_picks) {
            senderPickRows = trade.sender_picks.map(function (pick) {
              return getTradePick(createdTrade.id_trade, pick, true);
            });
          }

          var receiverPickRows = [];
          if (trade.receiver_picks) {
            receiverPickRows = trade.receiver_picks.map(function (pick) {
              return getTradePick(createdTrade.id_trade, pick, false);
            });
          }

          var b1 = _setup.PlayerTrade.bulkCreate([].concat(_toConsumableArray(senderPlayersRows), _toConsumableArray(receiverPlayersRows)), { transaction: t });

          var b2 = _setup.PickTrade.bulkCreate([].concat(_toConsumableArray(senderPickRows), _toConsumableArray(receiverPickRows)), { transaction: t });

          return Promise.all([b1, b2]).then(function (results) {
            return createdTrade;
          });
        });
      });
    }
  },
  removeTrade: {
    type: new GraphQLList(GraphQLInt),
    description: 'Returns [delete_count]',
    args: {
      id_trade: { type: GraphQLInt },
      status_trade: { type: GraphQLInt }
    },
    resolve: function resolve(root, _ref2) {
      var id_trade = _ref2.id_trade,
          status_trade = _ref2.status_trade;
      return _setup.Trade.update({
        status_trade: status_trade
      }, {
        where: {
          id_trade: id_trade
        }
      });
    }
  },
  acceptTrade: {
    type: new GraphQLList(GraphQLInt),
    description: 'Returns [update_count]',
    args: {
      id_trade: { type: GraphQLInt }
    },
    resolve: function resolve(root, _ref3) {
      var id_trade = _ref3.id_trade;
      return _connection2.default.transaction(function (t) {
        return _setup.Trade.findOne({
          where: {
            id_trade: id_trade
          }
        }, { transaction: t }).then(function (trade) {

          var playersQuery = _setup.PlayerTrade.findAll({ where: { id_trade: trade.id_trade } });
          var picksQuery = _setup.PickTrade.findAll({ where: { id_trade: trade.id_trade } });

          return Promise.all([playersQuery, picksQuery]).then(function (data) {

            var players = data[0],
                picks = data[1];

            var playersUpdate = players.map(function (player) {
              return _setup.TeamPlayer.update({
                id_sl: player.is_sender ? trade.id_receiver : trade.id_sender
              }, {
                where: {
                  id_player: player.id_player,
                  id_sl: player.is_sender ? trade.id_sender : trade.id_receiver
                },
                transaction: t
              });
            });

            var picksUpdate = picks.map(function (pick) {
              return _setup.Pick.update({
                id_owner: pick.is_sender ? trade.id_receiver : trade.id_sender
              }, {
                where: {
                  id_pick: pick.id_pick,
                  id_owner: pick.is_sender ? trade.id_sender : trade.id_receiver
                },
                transaction: t
              });
            });

            var notCurrentTrade = {
              status_trade: _tradeStatus2.default.parseValue('PENDING'),
              id_trade: {
                $ne: trade.id_trade
              },
              $or: {
                id_sender: [trade.id_sender, trade.id_receiver],
                id_receiver: [trade.id_sender, trade.id_receiver]
              }
            };

            var cancelTrades = function cancelTrades(trades) {
              return trades.length > 0 && _setup.Trade.update({
                status_trade: _tradeStatus2.default.parseValue('CANCELLED')
              }, {
                where: {
                  id_trade: trades.map(function (trade) {
                    return trade.id_trade;
                  })
                },
                transaction: t
              });
            };

            var relatedPickTrades = _setup.Trade.findAll({
              include: [{
                model: _setup.PickTrade,
                foreignKey: 'id_trade',
                where: {
                  id_pick: picks.map(function (pick) {
                    return pick.id_pick;
                  })
                }
              }],
              where: notCurrentTrade
            }).then(cancelTrades);

            var relatedPlayerTrades = _setup.Trade.findAll({
              include: [{
                model: _setup.PlayerTrade,
                foreignKey: 'id_trade',
                where: {
                  id_player: players.map(function (player) {
                    return player.id_player;
                  })
                }
              }],
              where: notCurrentTrade
            }).then(cancelTrades);

            return Promise.all([].concat(_toConsumableArray(playersUpdate), _toConsumableArray(picksUpdate), [relatedPickTrades, relatedPlayerTrades])).then(function (data) {
              return _setup.Trade.update({
                status_trade: _tradeStatus2.default.parseValue('ACCEPTED')
              }, {
                where: {
                  id_trade: trade.id_trade
                }
              });
            });
          });
        });
      });
    }
  }
};

exports.default = TradeMutation;