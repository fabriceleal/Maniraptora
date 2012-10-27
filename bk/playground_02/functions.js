#!/usr/bin/node

var FunctionElem = function(context, fun){
	this.context = context;
	this.fun = fun;
	return this;
};

FunctionElem.prototype.toString = function(){
	return this.fun.toString() + ' with context ' + this.context.arg;
};

var FunctionObj = function(arg, body, in_vals, out_vals){
	this.arg = arg;

	if(!((body instanceof FunctionObj) || (body instanceof FunctionElem) || (typeof FunctionElem === 'function') ))
		throw new Error('Body of FunctionObj should be either a function, a FunctionElem or a FunctionObj !');
	
	if(body instanceof FunctionObj){
		body.parent = this;
		this.body = body;
	} else if(body instanceof FunctionElem){ 
		this.body = body;
	} else {
		this.body = new FunctionElem(this, body);
	}
	this.binded = false;	
	this.in_vals = in_vals;
	this.out_vals = out_vals;
	return this;
};

var IgnoreObj = function(){
	return this;
};

FunctionObj.prototype.toString = function(){
	return '(' + 
			this.arg + ( this.binded ? ' as ' + this.argValue : '' ) + ', ' + 
			(this.parent === undefined? 'no parent' : 'with parent, its ' + this.parent.arg ) + ') => ' + this.body.toString();
};

FunctionObj.prototype.bindArg = function( arg ){
	if(arg instanceof IgnoreObj){
		// Re-arranje function chain. Return it.
		if(this.body instanceof FunctionElem){
			return this;
		}

		// Create new function obj, starting with the body of *this*
		/*var ret = this.body;
		//ret.parent = undefined;

		// Find inner-most FunctionObj
		var fo = ret;
		for(; (fo.fun !== undefined) ; fo = fo.body );

		// Replace its body with this, change body to the function
		var fun = fo.body;
		//console.log(fun);
		fo.body = this;
		//console.log(fun);
		fo.body.body = fun;*/

		// Normal function objs
		var k = function(){ return 0; };
		var inner = new FunctionObj(this.arg, k, this.in_vals, this.out_vals);
		var ret = new FunctionObj(this.body.arg, inner, this.body.in_vals, this.body.out_vals);

		// Fix parenting
		ret.parent = inner;
		inner.parent = undefined;
		inner.body = new FunctionElem(ret, this.body.body.fun);

		/**/
		
		
		return ret;
	}

	this.argValue = arg;
	this.binded = true;

	if(this.body instanceof FunctionElem){
		return this.body.fun.apply(this.body.context, undefined);
	}

	return this.body;
};

var core2 = {
	'add': new FunctionObj('a', new FunctionObj('b', 
			function(){ 
				console.log(' this is ' + this.arg);
				//console.log(this.argValue); 
				console.log(' this.parent is ' + this.parent.arg);
				//console.log(this.parent.argValue); 
				return this.argValue - this.parent.argValue;
			}, [], []), [],[])
};

console.log(core2['add'].toString());
console.log(core2['add'].bindArg(new IgnoreObj()).toString());
//console.log(core2['add'].bindArg(new IgnoreObj()).bindArg(1).toString());

console.log(core2['add'].bindArg(1).bindArg(3));
console.log(core2['add'].bindArg(new IgnoreObj()).bindArg(1).bindArg(3));

//console.log(core2['add'].bindArg(1).bindArg(4));
//console.log(core2['add'].bindArg(new IgnoreObj()).bindArg(1).bindArg(4));
//console.log(core2['add'].bindArg(new IgnoreObj()).bindArg(1).bindArg(4));

