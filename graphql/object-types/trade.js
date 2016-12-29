import TeamSlType from './team-sl';
import PlayerType from './player';
import {Trade} from '../../model/setup';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} =  graphql;

const TradeType = new GraphQLObjectType({
  name: 'Trade',
  fields: () => ({
    id_trade: {
      type: GraphQLInt,
    },
    id_sender: {
      type: GraphQLInt,
    },
    id_receiver: {
      type: GraphQLInt,
    },
    status_trade: {
      type: GraphQLInt
    },
    trade_comment: {
      type: GraphQLString
    },
    last_change : { type : GraphQLString },
    views : { type : GraphQLInt },
    sender: {
      type: TeamSlType,
      resolve: resolver(Trade.Sender)
    },
    receiver: {
      type: TeamSlType,
      resolve: resolver(Trade.Receiver)
    },
    // sender_players: {
    //   type: new GraphQLList(PlayerType),
    //   resolve: resolver(Trade.SenderPlayers)
    // },
    // receiver_players: {
    //   type: new GraphQLList(PlayerType),
    //   resolve: resolver(Trade.ReceiverPlayers)
    // },
    // sender_picks: {
    //   type: new GraphQLList(PickType),
    //   resolve: resolver(Trade.SenderPicks)
    // },
    // receiver_picks: {
    //   type: new GraphQLList(PickType),
    //   resolve: resolver(Trade.ReceiverPicks)
    // }
  })
});

export default TradeType;