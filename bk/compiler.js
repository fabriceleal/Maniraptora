(function(){
	var core = require('./core.js');
/*
	var sliceArg = function( c ){
		return  {
			args: 				c.args.slice(1),
			body: 				c.body,
			out_validators:	c.out_validators
		};
	}

	// This function will be needed in the final compilation itself.
	var compileCoreNotationToJs = function(coreNotation, arguments){
		var ret = undefined;
		try{
			var ret = undefined;
			
			ret = (function __compileCoreNotationToJs(c, a){

				if(c.args.length === 0){
					// Compile body
					return c.body;

				} else if( a[0] === undefined || a[0].tag === 'ignore_arg' ){

					return 	'(function(){ \n' + 
									'return (\n' + 
										'function(' + c.args[0].name + '){\n' + 
											'return (' + __compileCoreNotationToJs( sliceArg(c), a.slice(1)) + ');' + 
										'\n}\n' +
									')\n;' + 
								'})()';
					//---
				} else {
					return '(function(){' +
								' var ' + c.args[0].name + ' = ' + compile(false)( a[0] ) + ';' +
								' return (' + __compileCoreNotationToJs( sliceArg(c), a.slice(1)) + '); ' + 
							 '})()';
					//---

				}
			})(coreNotation, arguments);
			
			return eval(ret);
		}catch(e){
			console.log(JSON.stringify(coreNotation, null, 3));
			console.log(JSON.stringify(arguments, null, 3));
			throw new Error('Error converting core notation to js: ' + e);
		}		
	};

	var lambdaToCoreNotation = function(expr){		
		return {
				args:					expr.pars.value.map(function(a){ return { name: undefined, validators: undefined }; }), 
				body:					compile(true)(expr.code), // Compile body, top level
				out_validators:	expr.out.value.map(compile(false)) // Compile out validators
		};
	};
	*/
	var compileString = function(is_top_level){
		return function(scalar){
			var ret = "\"" + scalar.value.toString() + "\"";
			if(is_top_level){
				ret = '__ret = ' + ret + ';\n';
			}
			return ret;
		};
	};

	var compileScalar = function(is_top_level){
		return function(scalar){
			var ret = scalar.value.toString();
			if(is_top_level){
				ret = '__ret = ' + ret + ';\n';
			}
			return ret;
		};
	};

	var compileLet = function(is_top_level){
		return function(let_form){
			var ret = compile(false)(let_form.destiny) + ' = ' + compile(false)(let_form.expression);
			if(is_top_level){
				ret = 'var ' + ret + ';\n';
			}
			return ret;
		};
	};

	var compileCollection = function(is_top_level){
		return function(expr){
			var ret = "[" + expr.value.map(compile(false)).join(", ") + "]";
			if(is_top_level){
				ret = "__ret = " + ret + ";\n";
			}
			return ret;
		};
	};

	var compileFunction = function(is_top_level){
		return function(expr){
			var ret = JSON.stringify(lambdaToCoreNotation(expr));
			if(is_top_level){
				ret = "__ret = " + ret + ";\n";
			}
			return ret;
		};
	};

	var compileWithCore = function(expr){
		var ret = '';

		ret += '(function(){\n';

		/*var to_include = {
				"compileCoreNotationToJs": compileCoreNotationToJs,
				"compile": compile,
				"compileScalar" : compileScalar,
				"sliceArg" : sliceArg
		};

		for (var k in to_include) {
			ret += 'var ' + k + ' = ' + to_include[k].toString() + ';\n';
		}*/

		for(var k in core.core){
			ret += 'var ' + k + ' = ' + JSON.stringify(core.core[k]) +';\n';
		}
		ret += 	'return ' + compile(true)(expr) + ';\n';
		ret += '})();\n';

		return ret;
	};

	var compile = function(is_top_level){
		return function(expr){
			switch(expr.tag){
				case "code":
					var ret = '(function(){\n';
					ret += 	'var __ret;\n';
					ret += 	expr.value.map(compile(true)).join('');
					ret += 	'return __ret;\n';
					ret += "})()\n";
					return ret;
				case "string":
					return compileString(is_top_level)(expr);
				case "number":
				case "identifier":
					return compileScalar(is_top_level)(expr);
				case "let":
					return compileLet(is_top_level)(expr);
				case "tuple":
				case "list":
					return compileCollection(is_top_level)(expr);
				case "lambda":
					return compileFunction(is_top_level)(expr);
				
			}
			console.log("---");
			console.log(JSON.stringify(expr, null, 3));
			throw new Error('Not implemented!');
		};
	};

	exports.lambdaToCoreNotation = lambdaToCoreNotation;
	exports.compileCoreNotationToJs = compileCoreNotationToJs;
	exports.compile = compileWithCore; //compile(true);
})();
