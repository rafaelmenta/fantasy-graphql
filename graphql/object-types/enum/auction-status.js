
const graphql = require('graphql');

const {GraphQLEnumType} = graphql;

export const AuctionStatus = new GraphQLEnumType({
  name : 'AuctionStatus',
  values : {
      STATUS_CLOSED : {
      value : 0,
    },
      STATUS_OPEN : {
      value : 1,
    },
  }
});
