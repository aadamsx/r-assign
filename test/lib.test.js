'use strict';

const tap = require('tap');
const lib = require('r-assign/lib');

tap.test('rAssign lib exports', (test) => {
	test.ok('useString' in lib);
	test.end();
});