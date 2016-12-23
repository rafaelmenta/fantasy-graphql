var graphql = require('graphql');
var express = require('express');
var graphqlHTTP = require('express-graphql');
var Sequelize = require('sequelize');
var resolver = require('graphql-sequelize').resolver;

const Conn = new Sequelize(
  'api_dev',
  'apidev',
  'n01sf4zap4i!!',
  {
    host: '50.116.45.45',
    dialect: 'mysql',
    pool: {
      min: 1
    }
  }
);

Conn
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInt
} =  graphql;

const User = Conn.define('user', {
  id_user : Sequelize.INTEGER,
  login : Sequelize.STRING
});

const UserTeam = Conn.define('user_team', {
  id_sl : Sequelize.INTEGER,
  id_user : Sequelize.INTEGER
});

User.Teams = User.hasMany(UserTeam, { as: 'teams'});

const UserTeamType = new GraphQLObjectType({
  name: 'UserTeam',
  fields: () => ({
    id_sl: {
      type: GraphQLInt,
      description: 'The id of the User on a UserTeam'
    },
    id_user: {
      type: GraphQLInt,
      description: 'The id of the Team on a UserTeam'
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A User',
  fields: () => ({
    id_user: {
      type: GraphQLInt,
      description: 'The id of the User'
    },
    login: {
      type: GraphQLString,
      description: 'The login of the User'
    }
    // ,
    // teams: {
    //   type: GraphQLList(UserTeamType),
    //   resolve: resolver(User.Teams)
    // }
  })
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    user: {
      type: UserType,
      resolve: resolver(User)
    }
  })
});

// new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields: {
//       user: {
//         type: UserType,
//         args: {
//           id_user: {
//             description: 'id of the user',
//             type: new GraphQLNonNull(GraphQLInt)
//           }
//         },
//         resolve: resolver(User)
//       }
//     }
//   })

const Schema = new GraphQLSchema({
  query: Query
});

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: Schema,
  // rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');