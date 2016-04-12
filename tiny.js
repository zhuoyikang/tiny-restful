#!/usr/bin/env node

var Config = require('./config');
var Mongo = require('./mongo');

Mongo.insertDemo(Config.mongo.url)
