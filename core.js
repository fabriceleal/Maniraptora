(function(){

	var FunctionObj = function(arg, body, in_vals, out_vals){
		this.arg = arg;

		if(!(body instanceof FunctionObj) || typeof body !== 'function' )
			throw new Error('Body of FunctionObj should be either a function or a FunctionObj !');

		this.body = body;
		this.in_vals = in_vals;
		this.out_vals = out_vals;
		return this;
	};

	FunctionObj.prototype.bindArg = function( arg ){
		this.argValue = arg;

		return this.body;
	};
	

	var core2 = {
		'add': new FunctionObj('a', new FunctionObj('b', function(){ this.argValue + this.parent.argValue }, [], []), [],[])
	};

	

	// TODO Change this to work with nested functions
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
