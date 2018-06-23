'use strict';

Object.defineProperty(exports, "__esModule", {
      value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)(),
    env = app.get('env') || 'local',
    config = require('./env/' + env);

exports.default = config;