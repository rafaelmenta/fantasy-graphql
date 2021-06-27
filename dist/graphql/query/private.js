"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("./private/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLObjectType = graphql.GraphQLObjectType;
var Query = new GraphQLObjectType({
  name: 'PrivateQuery',
  fields: function fields() {
    return Object.assign({}, _user["default"]);
  }
});
var _default = Query;
exports["default"] = _default;