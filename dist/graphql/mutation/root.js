'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('./rule/user');

var _user2 = _interopRequireDefault(_user);

var _team = require('./rule/team');

var _team2 = _interopRequireDefault(_team);

var _trade = require('./rule/trade');

var _trade2 = _interopRequireDefault(_trade);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql');

var GraphQLObjectType = graphql.GraphQLObjectType;


var RootMutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: function fields() {
    return Object.assign({}, _user2.default, _team2.default, _trade2.default);
  }
});

exports.default = RootMutationType;