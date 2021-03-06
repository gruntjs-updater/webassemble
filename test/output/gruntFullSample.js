// This file was generated by modules-webmake (modules for web) project.
// See: https://github.com/medikoo/modules-webmake

define("full", function () { return (function (modules) {
	var resolve, getRequire, require, notFoundError, extensions = [];
	notFoundError = function (path) {
		var error = new Error("Could not find module '" + path + "'");
		error.code = 'MODULE_NOT_FOUND';
		return error;
	};
	resolve = function (scope, tree, path, fullpath, state) {
		var name, dir, exports, module, fn, found, i, ext;
		path = path.split('/');
		name = path.pop();
		if ((name === '.') || (name === '..')) {
			path.push(name);
			name = '';
		}
		while ((dir = path.shift()) != null) {
			if (!dir || (dir === '.')) continue;
			if (dir === '..') {
				scope = tree.pop();
			} else {
				tree.push(scope);
				scope = scope[dir];
			}
			if (!scope) throw notFoundError(fullpath);
		}
		if (name && (typeof scope[name] !== 'function')) {
			if (typeof scope[name + '.js'] === 'function') {
				name += '.js';
			} else if (typeof scope[name + '.json'] === 'function') {
				name += '.json';
			} else {
				for (i = 0; (ext = extensions[i]); ++i) {
					if (typeof scope[name + ext] === 'function') {
						name += ext;
						found = true;
						break;
					}
				}
				if (!found && (state !== 2) && (typeof scope[name] === 'object')) {
					tree.push(scope);
					scope = scope[name];
					name = '';
				}
			}
		}
		if (!name) {
			if ((state !== 1) && scope[':mainpath:']) {
				return resolve(scope, tree, scope[':mainpath:'], fullpath, 1);
			}
			return resolve(scope, tree, 'index', fullpath, 2);
		}
		fn = scope[name];
		if (!fn) throw notFoundError(fullpath);
		if (fn.hasOwnProperty('module')) return fn.module.exports;
		exports = {};
		fn.module = module = { exports: exports };
		fn.call(exports, exports, module, getRequire(scope, tree));
		return module.exports;
	};
	require = function (scope, tree, fullpath) {
		var name, path = fullpath, t = fullpath.charAt(0), state = 0;
		if (t === '/') {
			path = path.slice(1);
			scope = modules['/'];
			tree = [];
		} else if (t !== '.') {
			name = path.split('/', 1)[0];
			scope = modules[name];
			if (!scope) throw notFoundError(fullpath);
			tree = [];
			path = path.slice(name.length + 1);
			if (!path) {
				path = scope[':mainpath:'];
				if (path) {
					state = 1;
				} else {
					path = 'index';
					state = 2;
				}
			}
		}
		return resolve(scope, tree, path, fullpath, state);
	};
	getRequire = function (scope, tree) {
		return function (path) { return require(scope, [].concat(tree), path); };
	};
	return getRequire(modules, []);
})({
	"webassemble": {
		"test": {
			"output": {
				"gruntFullSample-pre.js": function (exports, module, require) {
					// ----- Exports from test/src/constants.js -----
					exports.CONSTANTS = require('../src/constants.js');

					// ----- Exports from test/src/module_exports_abc.js -----
					exports.funA = require('../src/module_exports_abc.js').funA;
					exports.funB = require('../src/module_exports_abc.js').funB;
					exports.funC = require('../src/module_exports_abc.js').funC;

					// ----- Exports from test/src/module_exports_d.js -----
					exports.funD = require('../src/module_exports_d.js');

					// ----- Exports from test/src/module_exports_e.js -----
					exports.funE = require('../src/module_exports_e.js');

					// ----- Exports from test/src/module_exports_f.js -----
					exports.funF = require('../src/module_exports_f.js');

					// ----- Exports from test/src/module_exports_g.js -----
					exports.funG = require('../src/module_exports_g.js');
				}
			},
			"src": {
				"constants.js": function (exports, module, require) {
					'use strict';

					var CONSTANTS = {
					    DATE_FORMAT: 'YYYY/MM/DD',
					    DATETIME_FORMAT: 'YYYY/MM/DDTHH:mm:ss.SSSZ'
					};

					exports = CONSTANTS;
				},
				"fn_wrap.js": function (exports, module, require) {
					'use strict';

					var f = function (result) {
					    return function () {
					        return result;
					    };
					};

					module.exports = f;
				},
				"module_exports_abc.js": function (exports, module, require) {
					var f = require('./fn_wrap');

					exports.funA = f('A');

					exports.funB = f('B');

					module.exports.funC = f('C');
				},
				"module_exports_d.js": function (exports, module, require) {
					var f = require('./fn_wrap');

					var funD = f('D');

					module.exports = funD;
				},
				"module_exports_e.js": function (exports, module, require) {
					var f = require('./fn_wrap');

					var funE = f('E');

					exports = module.exports = funE;
				},
				"module_exports_f.js": function (exports, module, require) {
					var f = require('./fn_wrap');

					var funF = f('F');

					module.exports = exports = funF;
				},
				"module_exports_g.js": function (exports, module, require) {
					var f = require('./fn_wrap');
					var funG;

					exports = module.exports = funG = f('G');
				}
			}
		}
	}
})("webassemble/test/output/gruntFullSample-pre");
});
