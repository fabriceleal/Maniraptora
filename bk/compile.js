#!/usr/bin/node

var p = require('./parser.js');
var c = require('./compiler.js');

p.parse(
		process.argv[2], 
		function(ast){ console.log(c.compile(ast)); });

