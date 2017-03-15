import Sequelize from 'Sequelize';
import Conn from '../../../database/connection';
import TradeType from '../../object-types/trade';
import TradeStatus from '../../object-types/enum/trade-status';
import {Trade, PlayerTrade, PickTrade, Pick, TeamPlayer} from '../../../model/setup';

const graphql = require('graphql');

const {
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLString

} =  graphql;

const input = new GraphQLInputObjectType({
  name: 'TradeInput',
  fields: () => ({
    id_sender: { type: new GraphQLNonNull(GraphQLInt) },
    id_receiver: { type: new GraphQLNonNull(GraphQLInt) },
    trade_comment: { type: GraphQLString },
    sender_players: { type: new GraphQLList(GraphQLInt) },
    sender_picks: { type: new GraphQLList(GraphQLInt) },
    receiver_players: { type: new GraphQLList(GraphQLInt) },
    receiver_picks: { type: new GraphQLList(GraphQLInt) },
    status_trade: { type: GraphQLInt, defaultValue: TradeStatus.parseValue('PENDING') }
  })
});

const getTradePlayer = (trade, player, sender) => {
  return {
    id_trade: trade,
    id_player: player,
    is_sender: sender
  }
};

const getTradePick = (trade, pick, sender) => {
  return {
    id_trade: trade,
    id_pick: pick,
    is_sender: sender
  }
};

const TradeMutation = {
  addTrade: {
    type: TradeType,
    args: {
      trade: { type: input },
    },
    resolve: (root, {trade}) => Conn.transaction(t =>
      Trade.create(trade, { transaction: t })
      .then(createdTrade => {


        let senderPlayersRows = [];
        if (trade.sender_players) {
          senderPlayersRows = trade.sender_players.map(player => getTradePlayer(createdTrade.id_trade, player, true));
        }

        let receiverPlayersRows = [];
        if (trade.receiver_players) {
          receiverPlayersRows = trade.receiver_players.map(player => getTradePlayer(createdTrade.id_trade, player, false));
        }

        let senderPickRows = [];
        if (trade.sender_picks) {
          senderPickRows = trade.sender_picks.map(pick => getTradePick(createdTrade.id_trade, pick, true));
        }

        let receiverPickRows = [];
        if (trade.receiver_picks) {
          receiverPickRows = trade.receiver_picks.map(pick => getTradePick(createdTrade.id_trade, pick, false));
        }


        var b1 = PlayerTrade.bulkCreate([
          ...senderPlayersRows,
          ...receiverPlayersRows
        ], { transaction: t });

        var b2 = PickTrade.bulkCreate([
          ...senderPickRows,
          ...receiverPickRows
        ], { transaction: t })

        return Promise.all([b1, b2]).then(results => createdTrade);
      })
    )
  },
  removeTrade: {
    type: new GraphQLList(GraphQLInt),
    description: 'Returns [delete_count]',
    args: {
      id_trade: { type: GraphQLInt },
      status_trade: { type: GraphQLInt }
    },
    resolve: (root, {id_trade, status_trade}) => Trade.update({
      status_trade: status_trade
    }, {
      where: {
        id_trade: id_trade
      }
    })
  },
  acceptTrade: {
    type: new GraphQLList(GraphQLInt),
    description: 'Returns [update_count]',
    args: {
      id_trade: { type: GraphQLInt },
    },
    resolve: (root, {id_trade}) => Conn.transaction(t => Trade.findOne({
      where : {
        id_trade: id_trade
      }
    }, { transaction: t }).then(trade => {

      let playersQuery = PlayerTrade.findAll({ where: { id_trade: trade.id_trade } });
      let picksQuery = PickTrade.findAll({ where: { id_trade: trade.id_trade } });

      return Promise.all([playersQuery, picksQuery]).then(data => {

        let players = data[0],
            picks = data[1];

        let playersUpdate = players.map(player => TeamPlayer.update({
          id_sl: player.is_sender ? trade.id_receiver : trade.id_sender
        }, {
          where: {
            id_player : player.id_player,
            id_sl: player.is_sender ? trade.id_sender : trade.id_receiver
          },
          transaction: t
        }));

        let picksUpdate = picks.map(pick => Pick.update({
          id_owner: pick.is_sender ? trade.id_receiver : trade.id_sender
        }, {
          where: {
            id_pick: pick.id_pick,
            id_owner: pick.is_sender ? trade.id_sender : trade.id_receiver
          },
          transaction: t
        }));

        let notCurrentTrade = {
          status_trade: TradeStatus.parseValue('PENDING'),
          id_trade: {
            $ne : trade.id_trade
          },
          $or: {
            id_sender: [trade.id_sender, trade.id_receiver],
            id_receiver: [trade.id_sender, trade.id_receiver]
          }
        };

        let cancelTrades = trades => trades.length > 0 && Trade.update({
          status_trade: TradeStatus.parseValue('CANCELLED')
        },{
          where: {
            id_trade: trades.map(trade => trade.id_trade)
          },
          transaction: t
        });

        let relatedPickTrades = Trade.findAll({
          include: [{
            model: PickTrade,
            foreignKey: 'id_trade',
            where: {
                id_pick: picks.map(pick => pick.id_pick)
            }
          }],
          where: notCurrentTrade
        }).then(cancelTrades)

        let relatedPlayerTrades = Trade.findAll({
          include: [{
            model: PlayerTrade,
            foreignKey: 'id_trade',
            where: {
                id_player: players.map(player => player.id_player)
            }
          }],
          where: notCurrentTrade
        }).then(cancelTrades)

        return Promise.all([...playersUpdate, ...picksUpdate, relatedPickTrades, relatedPlayerTrades]).then(data => Trade.update({
          status_trade: TradeStatus.parseValue('ACCEPTED')
        }, {
          where: {
            id_trade: trade.id_trade
          }
        }));
      });

    }))
  }
};

export default TradeMutation;
