'use strict';

var Rx = require('rx');

module.exports = function (changedCallback) {
	var cache = Object.create(null);

	return function (files) {
		return files
			.map(function (file) {
				return {
					json: JSON.stringify(file),
					file: file
				};
			})
			// split into cached / non-cached groups
			.groupBy(function (obj) { return obj.json in cache })
			// handle each correspondingly
			.flatMap(function (objects) {
				var jsons = objects.pluck('json');

				if (objects.key) {
					return jsons.map(function (json) {
						return JSON.parse(cache[json]);
					});
				} else {
					return changedCallback(Rx.Observable.return(objects.pluck('file'))).single().flatMap(function (files) {
						return jsons.zip(files, function (json, file) {
							cache[json] = JSON.stringify(file);
							return file;
						});
					});
				}
			});
	};
};
