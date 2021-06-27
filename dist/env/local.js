"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = void 0;
var config = {
  database: {
    name: process.env.GRAPHQL_DB_NAME || 'api',
    login: process.env.GRAPHQL_DB_LOGIN || 'root',
    password: process.env.GRAPHQL_DB_PASSWORD || '',
    host: process.env.GRAPHQL_DB_HOST || 'localhost',
    dialect: 'mysql'
  }
};
exports.config = config;