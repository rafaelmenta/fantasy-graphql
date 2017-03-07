import UserType from '../../object-types/private/user';
import UserInputType from '../../object-types/input/user';
import {User} from '../../../model/setup';

const graphql = require('graphql');

const {
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull

} =  graphql;

const UserMutation = {
  addUser: {
    type: UserType,
    args: {
      user: { type: UserInputType },
    },
    resolve: (root, {user}) => User.create(user),
  },
  updateUser: {
    type: new GraphQLList(GraphQLInt),
    description: 'Returns [update_count]',
    args: {
      user: { type: UserInputType },
    },
    resolve: (root, {user}) => User.update(user, {
      where : {
        id_user: user.id_user
      }
    })
  },
  deleteUser: {
    type: GraphQLInt,
    description: 'Returns deleted items',
    args: {
      id_user: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: (root, user) => User.destroy({
      where : {
        id_user: user.id_user
      }
    })
  }
};

export default UserMutation;
