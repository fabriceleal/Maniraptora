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
		
	};


	var sliceArg = function( c ){
		return  {
			args: 				c.args.slice(1),
			body: 				c.body,
			out_validators:	c.out_validators
		};
	}

	exports.core = core;
	exports.sliceArg = sliceArg;

})();
