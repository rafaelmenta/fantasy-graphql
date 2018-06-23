'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('./private/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLObjectType = graphql.GraphQLObjectType;


var Query = new GraphQLObjectType({
  name: 'PrivateQuery',
  fields: function fields() {
    return Object.assign({}, _user2.default);
  }
});

exports.default = Query;