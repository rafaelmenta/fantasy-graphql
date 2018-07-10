'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SystemQuery = undefined;

var _setup = require('../../../model/setup');

var _graphql = require('graphql');

var SystemQuery = exports.SystemQuery = {
  slug_count: {
    type: _graphql.GraphQLInt,
    args: {
      slug: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    },
    resolve: function resolve(root, _ref) {
      var slug = _ref.slug;
      return _setup.Taxonomy.count({ where: { slug: slug } });
    }
  }
};