
final=grammar.js

grammar.js: grammar.peg
	pegjs grammar.peg

