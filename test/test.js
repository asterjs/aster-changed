/* global describe, it */

'use strict';

var assert = require('chai').assert,
	Rx = require('rx'),
	changed = require('..');

it('test', function (done) {
	var steps = Rx.Observable.fromArray([
			Rx.Observable.fromArray([
				{
					path: 'empty.js',
					contents: ''
				},
				{
					path: 'src.js',
					contents: 'x = 1'
				}
			]),
			Rx.Observable.fromArray([
				{
					path: 'empty.js',
					contents: ''
				},
				{
					path: 'src.js',
					contents: 'x = 2'
				}
			]),
			Rx.Observable.fromArray([
				{
					path: 'src.js',
					contents: 'x = 2'
				}
			])
		]),
		expected = [
			['empty.js', 'src.js'],
			['src.js'],
			[]
		],
		step = 0,
		getPathArray = function (files) {
			return files.pluck('path').toArray();
		};

	function checkPaths(paths) {
		return paths.do(function (paths) {
			assert.deepEqual(paths, expected[step++]);
		});
	}

	// simulating file sequence and applying transformation
	steps
	.map(changed(function (src) {
		return src.map(getPathArray).map(checkPaths);
	}))
	.concatAll()
	.zip(steps.flatMap(getPathArray), assert.deepEqual)
	.subscribe(function () {}, done, done);
});
