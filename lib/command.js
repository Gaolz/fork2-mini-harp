(function() {
  var command;

  module.exports = command = function() {
    var argv, mini_harp,params;
    mini_harp = require("../index");
    argv = require('minimist')(process.argv.slice(2));
    params = process.argv[2];
    return mini_harp(argv.port);
  };

}).call(this);
