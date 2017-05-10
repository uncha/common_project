"use strict";

// es6 collections polyfill
(function (e) {
	function f(a, c) {
		function b(a) {
			if (!this || this.constructor !== b) return new b(a);this._keys = [];this._values = [];this._itp = [];this.objectOnly = c;a && v.call(this, a);
		}c || w(a, "size", { get: x });a.constructor = b;b.prototype = a;return b;
	}function v(a) {
		this.add ? a.forEach(this.add, this) : a.forEach(function (a) {
			this.set(a[0], a[1]);
		}, this);
	}function d(a) {
		this.has(a) && (this._keys.splice(b, 1), this._values.splice(b, 1), this._itp.forEach(function (a) {
			b < a[0] && a[0]--;
		}));return -1 < b;
	}function m(a) {
		return this.has(a) ? this._values[b] : void 0;
	}function n(a, c) {
		if (this.objectOnly && c !== Object(c)) throw new TypeError("Invalid value used as weak collection key");if (c != c || 0 === c) for (b = a.length; b-- && !y(a[b], c);) {} else b = a.indexOf(c);return -1 < b;
	}function p(a) {
		return n.call(this, this._values, a);
	}function q(a) {
		return n.call(this, this._keys, a);
	}function r(a, c) {
		this.has(a) ? this._values[b] = c : this._values[this._keys.push(a) - 1] = c;return this;
	}function t(a) {
		this.has(a) || this._values.push(a);return this;
	}function h() {
		(this._keys || 0).length = this._values.length = 0;
	}function z() {
		return k(this._itp, this._keys);
	}function l() {
		return k(this._itp, this._values);
	}function A() {
		return k(this._itp, this._keys, this._values);
	}function B() {
		return k(this._itp, this._values, this._values);
	}function k(a, c, b) {
		var g = [0],
		    e = !1;a.push(g);return { next: function next() {
				var f,
				    d = g[0];!e && d < c.length ? (f = b ? [c[d], b[d]] : c[d], g[0]++) : (e = !0, a.splice(a.indexOf(g), 1));return { done: e, value: f };
			} };
	}function x() {
		return this._values.length;
	}function u(a, c) {
		for (var b = this.entries();;) {
			var d = b.next();if (d.done) break;
			a.call(c, d.value[1], d.value[0], this);
		}
	}var b,
	    w = Object.defineProperty,
	    y = function y(a, b) {
		return isNaN(a) ? isNaN(b) : a === b;
	};"undefined" == typeof WeakMap && (e.WeakMap = f({ "delete": d, clear: h, get: m, has: q, set: r }, !0));"undefined" != typeof Map && "function" === typeof new Map().values && new Map().values().next || (e.Map = f({ "delete": d, has: q, get: m, set: r, keys: z, values: l, entries: A, forEach: u, clear: h }));"undefined" != typeof Set && "function" === typeof new Set().values && new Set().values().next || (e.Set = f({ has: p, add: t, "delete": d, clear: h,
		keys: l, values: l, entries: B, forEach: u }));"undefined" == typeof WeakSet && (e.WeakSet = f({ "delete": d, add: t, clear: h, has: p }, !0));
})("undefined" != typeof exports && "undefined" != typeof global ? global : window);
// define private
var map = new WeakMap();
window._ = function (key) {
	map.get(key) || map.set(key, {});
	return map.get(key);
};
//# sourceMappingURL=maps/es6.js.map
