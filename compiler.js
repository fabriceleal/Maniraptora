(function(){
	var core = {

	};

	var compile = function(tree) {
		return compileWithCore(tree, core);
	};

	var compileWithCoreCurry = function(core) {
		return function(tree){
			return compileWithCore(tree, core);
		}
	}

	var compileWithCore = function(tree, core) {
		var s = '';

		if(typeof tree === 'string')
			return tree;

		s += '<' + tree.name; 
		// Attributes

		if(tree.id) {
			s +=' id="' + tree.id.name + '"';
		}

		if(tree.classes && tree.classes.length > 0) {
			s += ' class="' + tree.classes.map(function(c){ 
				return c.name;
			}).join(' ') + '"';
		}

		if(tree.attr && tree.attr.length > 0) {
			s += ' ' + tree.attr.map(function(a){
				return a.name + '="' + a.value + '"'; 
			}).join('');
		}

		s += '>';

		var content = tree.inner;
		if(content) {
			if(content instanceof Array) {
				s += content.map(compileWithCoreCurry(core)).join('');
			//} else if (typeof content === 'string') {
			//	s += content;
			} else {
				s += compileWithCore(content, core);
			}
		}

		s += '</' + tree.name + '>';

		return s;
	};

	exports.compile = compile; //compile(true);
})();
