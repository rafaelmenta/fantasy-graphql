import TradeType from '../object-types/trade';
import {Trade} from '../../model/setup';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} =  graphql;


const TradeQuery = {
  trade : {
    type : TradeType,
    resolve : resolver(Trade),
    args : {
      id_trade : {
        name : 'id_trade',
        type : new GraphQLNonNull(GraphQLInt)
      }
    }
  },
  trades: {
    type: new GraphQLList(TradeType),
    resolve: resolver(Trade),
    args : {
      id_sender : {
        name : 'id_sender',
        type : GraphQLInt
      },
      id_receiver : {
        name : 'id_receiver',
        type : GraphQLInt
      },
      status_trade : {
        name : 'status_trade',
        type : GraphQLInt
      }
    }
  }
};

export default TradeQuery;
