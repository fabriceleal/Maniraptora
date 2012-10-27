(function(){
	var gramm = require('./grammar.js');
	var fs = require('fs');


	exports.parse = function(file, callback){
		fs.readFile(file, 'utf-8', function(err, data){
			if(err) throw err;

			if(callback) callback(gramm.parse(data));
		});
	};


})();




