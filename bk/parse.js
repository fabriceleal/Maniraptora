#!/usr/bin/node

require('./parser.js').parse(
		process.argv[2],
		function(data){ console.log(JSON.stringify(data, null, 3)); });

