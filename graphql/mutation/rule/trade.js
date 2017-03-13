import Sequelize from 'Sequelize';
import Conn from '../../../database/connection';
import TradeType from '../../object-types/trade';
import TradeStatus from '../../object-types/enum/trade-status';
import {Trade, PlayerTrade, PickTrade} from '../../../model/setup';

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

        let senderPlayersRows = trade.sender_players.map(player => getTradePlayer(createdTrade.id_trade, player, true));

        let receiverPlayersRows = trade.receiver_players.map(player => getTradePlayer(createdTrade.id_trade, player, false));

        let senderPickRows = trade.sender_picks.map(pick => getTradePick(createdTrade.id_trade, pick, true));

        let receiverPickRows = trade.receiver_picks.map(pick => getTradePick(createdTrade.id_trade, pick, false));


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
  }
};

export default TradeMutation;
