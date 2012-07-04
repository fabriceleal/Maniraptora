(function(){

	var core = {
		'add' : {
			args: [
				{ 
					name			: 'a', 
					validators	: []
				}, 
				{
					name			: 'b',
					validators	: []
				}
			],
			body				: ' a + b ',
			out_validators	:[]
		},
		'mult' : {
			args: [
				{ 
					name			: 'a', 
					validators	: []
				}, 
				{
					name			: 'b',
					validators	: []
				}
			],
			body				: ' a * b ',
			out_validators	:[]
		}
	};

	exports.core = core;

})();
