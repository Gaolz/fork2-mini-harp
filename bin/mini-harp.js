#!/usr/bin/env node

var miniHarp = require("mini-harp");
var parseArgs = require('minimist');
var argv = parseArgs(process.argv.slice(2));
var port = 'port' in argv ? parseInt(argv.port) : 4000;
var root = argv['_'].length > 0 ? argv['_'][0] : process.cwd();

miniHarp(root).listen(port);
console.log('Starting mini-harp on http://localhost:' + port + "\n"); 
