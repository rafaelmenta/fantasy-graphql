import UserType from '../../object-types/private/user';
import {User} from '../../../model/setup';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
} =  graphql;


const UserQuery = {
  private_user: {
    type: UserType,
    resolve: resolver(User),
    args: {
      id_user: {
        name : 'id_user',
        type : GraphQLInt
      },
      login: {
        name: 'login',
        type : GraphQLString
      }
    }
  },
  private_users: {
      type: new GraphQLList(UserType),
      resolve: resolver(User)
  }
}

export default UserQuery;
