const graphql = require('graphql');

const {
  GraphQLString,
  GraphQLInt,
  GraphQLInputObjectType

} =  graphql;

const UserInputType = new GraphQLInputObjectType({
  name: 'InputUser',
  description: 'A User',
  fields: () => ({
    id_user: { type: GraphQLInt, },
    login: { type: GraphQLString, },
    first_name: { type: GraphQLString, },
    last_name: { type: GraphQLString, },
    email: { type: GraphQLString, },
    password: { type: GraphQLString, },
    nickname: { type: GraphQLString, },
    id_permission: { type: GraphQLInt },
  })
});

export default UserInputType;
