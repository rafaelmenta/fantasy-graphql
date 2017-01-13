
const graphql = require('graphql');
const {GraphQLEnumType} = graphql;

const TradeStatus = new GraphQLEnumType({
  name : 'TradeStatus',
  values : {
    PENDING : {
      value : 1
    },
    ACCEPTED : {
      value : 2
    },
    REFUSED : {
      value : 3
    },
    CANCELLED : {
      value : 4
    }
  }
});

export default TradeStatus;
