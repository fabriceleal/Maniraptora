(function(){

	var core = {
		'add' 	: function(a){ return function(b){ return a + b; }; },
		'mult' 	: function(a){ return function(b){ return a * b; }; }
	};

	exports.core = core;

})();
