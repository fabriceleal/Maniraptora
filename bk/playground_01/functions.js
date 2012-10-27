#!/usr/bin/node

var nbr_complement = {
	pars:['_'],
	args:['i'],
	body: 'i * -1'
};

var minus = {
	pars:['_', 4 /*4, '_'*/],
	args:['i', 'j'],
	body: 'i - j'
};

var reduce = {
	pars:['_', '_', '_'],
	args:['f', 'i', 'a'], 
	body:'a.reduce(f, i)'
};



console.log(
		eval(
		(function compile(stuff){
			if(stuff.args.length === 0){
				return stuff.body;
			}
			if(stuff.pars[0] === '_'){
				return '(function(){' + 
							' return function('  + stuff.args[0] + '){ ' +
								' return (' + compile({ args: stuff.args.slice(1), body: stuff.body, pars:stuff.pars.slice(1)})  + '); ' +
							' }; ' + 
						 '})()'
				//---
			} else {
				return '(function(){' +
							' var ' + stuff.args[0] + ' = ' + stuff.pars[0] + ';' +
							' return (' + compile({ args: stuff.args.slice(1), body: stuff.body, pars:stuff.pars.slice(1)})  + '); ' + 
						 '})()';
				//---
			}			
		})( minus /*reduce*/ /*add*/ /*nbr_complement*/ )

		)		
		//( function(t, i){ return  t + i;} )( 0 )([1,2,3])
		(2)
		// (13)
)


/*

map = function(f){
	return function(a){
		return (function(){ return a.map(f); })();
	};
};


reduce = function(f){
	return function(i){
		return function(a){
			return (function(){ return a.reduce(f, i); });
		};
	};
};

****

reduce _ # 0 # []

=> function(f){
	// "a" and "i" captured
	return (function(){ return a.reduce(f, i); });
}

****


*/

