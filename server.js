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
    dialect: 'mysql'
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

const client = graphql.graphql

const User = Conn.define('user', {
  id_user : {
    type :Sequelize.INTEGER,
    primaryKey : true
  },
  login : Sequelize.STRING,
}, {
  updatedAt : false,
  createdAt : false,
  freezeTableName: true // Model tableName will be the same as the model name
});

const UserTeam = Conn.define('user_team', {
  ut_code : {
    type : Sequelize.INTEGER,
    primaryKey : true
  },
  id_sl : {
    type: Sequelize.INTEGER,
    references: {
      model: 'team_sl',
      key: 'id_sl'
    }
  },
  id_user : {
    type: Sequelize.INTEGER,
    references: {
      model: 'user',
      key: 'id_user'
    }
  }
}, {
  freezeTableName : true,
  updatedAt: false,
  createdAt: false
});

const TeamSl = Conn.define('team_sl', {
  id_sl : {
    type :Sequelize.INTEGER,
    primaryKey : true
  },
  city : Sequelize.STRING,
}, {
  updatedAt : false,
  createdAt : false,
  freezeTableName: true // Model tableName will be the same as the model name
});

// UserTeam.sync().then(function() {
//   return UserTeam.findAll();
// })
//   .then(function(data) {
//   console.log('data is', data);
// })

// User.Teams = User.hasMany(UserTeam, { foreignKey : 'id_user'});
User.Teams = User.belongsToMany(TeamSl, {through: UserTeam, foreignKey: 'id_user'});

TeamSl.Users = TeamSl.belongsToMany(User, { foreignKey: 'id_sl', through: UserTeam});

const TeamSlType = new GraphQLObjectType({
  name: 'TeamSl',
  fields: () => ({
    id_sl: {
      type: GraphQLInt,
      description: 'The id of the Team'
    },
    city: {
      type: GraphQLString,
      description: 'The city of the Team'
    }
  })
});

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
    ,
    teams: {
      type: new GraphQLList(TeamSlType),
      resolve: resolver(User.Teams)
    }
  })
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    user: {
      type: UserType,
      resolve: resolver(User),
      args: {
        id_user: {
          name : 'id_user',
          type : new GraphQLNonNull(GraphQLInt)
        }
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: resolver(User)
    },
    teams: {
      type: new GraphQLList(TeamSlType),
      resolve: resolver(TeamSl)
    }
  })
});

const Schema = new GraphQLSchema({
  query: Query
});

// client(Schema, '{user(id_user:19){login},}').then(console.log);

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: Schema,
  // rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
