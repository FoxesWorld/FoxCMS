"use strict";
var THREE = THREE || {
	REVISION: "49"
};
self.Int32Array || (self.Int32Array = Array, self.Float32Array = Array),
	function () {
		for (var b = 0, c = ["ms", "moz", "webkit", "o"], a = 0; a < c.length && !window.requestAnimationFrame; ++a) {
			window.requestAnimationFrame = window[c[a] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[c[a] + "CancelAnimationFrame"] || window[c[a] + "CancelRequestAnimationFrame"]
		}
		window.requestAnimationFrame || (window.requestAnimationFrame = function (d) {
			var e = Date.now(),
				f = Math.max(0, 16 - (e - b)),
				g = window.setTimeout(function () {
					d(e + f)
				}, f);
			return b = e + f, g
		}), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (d) {
			clearTimeout(d)
		})
	}(), THREE.Clock = function (a) {
		this.autoStart = void 0 === a || a, this.elapsedTime = this.oldTime = this.startTime = 0, this.running = !1
	}, THREE.Clock.prototype.start = function () {
		this.oldTime = this.startTime = Date.now(), this.running = !0
	}, THREE.Clock.prototype.stop = function () {
		this.getElapsedTime(), this.running = !1
	}, THREE.Clock.prototype.getElapsedTime = function () {
		return this.elapsedTime = this.elapsedTime + this.getDelta()
	}, THREE.Clock.prototype.getDelta = function () {
		var a = 0;
		if (this.autoStart && !this.running && this.start(), this.running) {
			var b = Date.now();
			a = 0.001 * (b - this.oldTime);
			this.oldTime = b, this.elapsedTime = this.elapsedTime + a
		}
		return a
	}, THREE.Color = function (a) {
		return void 0 !== a && this.setHex(a), this
	}, THREE.Color.prototype = {
		constructor: THREE.Color,
		r: 1,
		g: 1,
		b: 1,
		copy: function (a) {
			return this.r = a.r, this.g = a.g, this.b = a.b, this
		},
		copyGammaToLinear: function (a) {
			return this.r = a.r * a.r, this.g = a.g * a.g, this.b = a.b * a.b, this
		},
		copyLinearToGamma: function (a) {
			return this.r = Math.sqrt(a.r), this.g = Math.sqrt(a.g), this.b = Math.sqrt(a.b), this
		},
		convertGammaToLinear: function () {
			var b = this.r,
				c = this.g,
				a = this.b;
			return this.r = b * b, this.g = c * c, this.b = a * a, this
		},
		convertLinearToGamma: function () {
			return this.r = Math.sqrt(this.r), this.g = Math.sqrt(this.g), this.b = Math.sqrt(this.b), this
		},
		setRGB: function (b, c, a) {
			return this.r = b, this.g = c, this.b = a, this
		},
		setHSV: function (e, f, a) {
			var b, c, d;
			if (0 === a) {
				this.r = this.g = this.b = 0
			} else {
				switch (c = 6 * e - (b = Math.floor(6 * e)), e = a * (1 - f), d = a * (1 - f * c), f = a * (1 - f * (1 - c)), b) {
					case 1:
						this.r = d, this.g = a, this.b = e;
						break;
					case 2:
						this.r = e, this.g = a, this.b = f;
						break;
					case 3:
						this.r = e, this.g = d, this.b = a;
						break;
					case 4:
						this.r = f, this.g = e, this.b = a;
						break;
					case 5:
						this.r = a, this.g = e, this.b = d;
						break;
					case 6:
					case 0:
						this.r = a, this.g = f, this.b = e
				}
			}
			return this
		},
		setHex: function (a) {
			return a = Math.floor(a), this.r = (a >> 16 & 255) / 255, this.g = (a >> 8 & 255) / 255, this.b = (255 & a) / 255, this
		},
		lerpSelf: function (a, b) {
			return this.r = this.r + (a.r - this.r) * b, this.g = this.g + (a.g - this.g) * b, this.b = this.b + (a.b - this.b) * b, this
		},
		getHex: function () {
			return Math.floor(255 * this.r) << 16 ^ Math.floor(255 * this.g) << 8 ^ Math.floor(255 * this.b)
		},
		getContextStyle: function () {
			return "rgb(" + Math.floor(255 * this.r) + "," + Math.floor(255 * this.g) + "," + Math.floor(255 * this.b) + ")"
		},
		clone: function () {
			return (new THREE.Color).setRGB(this.r, this.g, this.b)
		}
	}, THREE.Vector2 = function (a, b) {
		this.x = a || 0, this.y = b || 0
	}, THREE.Vector2.prototype = {
		constructor: THREE.Vector2,
		set: function (a, b) {
			return this.x = a, this.y = b, this
		},
		copy: function (a) {
			return this.x = a.x, this.y = a.y, this
		},
		add: function (a, b) {
			return this.x = a.x + b.x, this.y = a.y + b.y, this
		},
		addSelf: function (a) {
			return this.x = this.x + a.x, this.y = this.y + a.y, this
		},
		sub: function (a, b) {
			return this.x = a.x - b.x, this.y = a.y - b.y, this
		},
		subSelf: function (a) {
			return this.x = this.x - a.x, this.y = this.y - a.y, this
		},
		multiplyScalar: function (a) {
			return this.x = this.x * a, this.y = this.y * a, this
		},
		divideScalar: function (a) {
			return a ? (this.x = this.x / a, this.y = this.y / a) : this.set(0, 0), this
		},
		negate: function () {
			return this.multiplyScalar(-1)
		},
		dot: function (a) {
			return this.x * a.x + this.y * a.y
		},
		lengthSq: function () {
			return this.x * this.x + this.y * this.y
		},
		length: function () {
			return Math.sqrt(this.lengthSq())
		},
		normalize: function () {
			return this.divideScalar(this.length())
		},
		distanceTo: function (a) {
			return Math.sqrt(this.distanceToSquared(a))
		},
		distanceToSquared: function (a) {
			var b = this.x - a.x;
			return b * b + (a = this.y - a.y) * a
		},
		setLength: function (a) {
			return this.normalize().multiplyScalar(a)
		},
		lerpSelf: function (a, b) {
			return this.x = this.x + (a.x - this.x) * b, this.y = this.y + (a.y - this.y) * b, this
		},
		equals: function (a) {
			return a.x === this.x && a.y === this.y
		},
		isZero: function () {
			return this.lengthSq() < 0.0001
		},
		clone: function () {
			return new THREE.Vector2(this.x, this.y)
		}
	}, THREE.Vector3 = function (b, c, a) {
		this.x = b || 0, this.y = c || 0, this.z = a || 0
	}, THREE.Vector3.prototype = {
		constructor: THREE.Vector3,
		set: function (b, c, a) {
			return this.x = b, this.y = c, this.z = a, this
		},
		setX: function (a) {
			return this.x = a, this
		},
		setY: function (a) {
			return this.y = a, this
		},
		setZ: function (a) {
			return this.z = a, this
		},
		copy: function (a) {
			return this.x = a.x, this.y = a.y, this.z = a.z, this
		},
		add: function (a, b) {
			return this.x = a.x + b.x, this.y = a.y + b.y, this.z = a.z + b.z, this
		},
		addSelf: function (a) {
			return this.x = this.x + a.x, this.y = this.y + a.y, this.z = this.z + a.z, this
		},
		addScalar: function (a) {
			return this.x = this.x + a, this.y = this.y + a, this.z = this.z + a, this
		},
		sub: function (a, b) {
			return this.x = a.x - b.x, this.y = a.y - b.y, this.z = a.z - b.z, this
		},
		subSelf: function (a) {
			return this.x = this.x - a.x, this.y = this.y - a.y, this.z = this.z - a.z, this
		},
		multiply: function (a, b) {
			return this.x = a.x * b.x, this.y = a.y * b.y, this.z = a.z * b.z, this
		},
		multiplySelf: function (a) {
			return this.x = this.x * a.x, this.y = this.y * a.y, this.z = this.z * a.z, this
		},
		multiplyScalar: function (a) {
			return this.x = this.x * a, this.y = this.y * a, this.z = this.z * a, this
		},
		divideSelf: function (a) {
			return this.x = this.x / a.x, this.y = this.y / a.y, this.z = this.z / a.z, this
		},
		divideScalar: function (a) {
			return a ? (this.x = this.x / a, this.y = this.y / a, this.z = this.z / a) : this.z = this.y = this.x = 0, this
		},
		negate: function () {
			return this.multiplyScalar(-1)
		},
		dot: function (a) {
			return this.x * a.x + this.y * a.y + this.z * a.z
		},
		lengthSq: function () {
			return this.x * this.x + this.y * this.y + this.z * this.z
		},
		length: function () {
			return Math.sqrt(this.lengthSq())
		},
		lengthManhattan: function () {
			return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
		},
		normalize: function () {
			return this.divideScalar(this.length())
		},
		setLength: function (a) {
			return this.normalize().multiplyScalar(a)
		},
		lerpSelf: function (a, b) {
			return this.x = this.x + (a.x - this.x) * b, this.y = this.y + (a.y - this.y) * b, this.z = this.z + (a.z - this.z) * b, this
		},
		cross: function (a, b) {
			return this.x = a.y * b.z - a.z * b.y, this.y = a.z * b.x - a.x * b.z, this.z = a.x * b.y - a.y * b.x, this
		},
		crossSelf: function (c) {
			var d = this.x,
				a = this.y,
				b = this.z;
			return this.x = a * c.z - b * c.y, this.y = b * c.x - d * c.z, this.z = d * c.y - a * c.x, this
		},
		distanceTo: function (a) {
			return Math.sqrt(this.distanceToSquared(a))
		},
		distanceToSquared: function (a) {
			return (new THREE.Vector3).sub(this, a).lengthSq()
		},
		getPositionFromMatrix: function (a) {
			return this.x = a.elements[12], this.y = a.elements[13], this.z = a.elements[14], this
		},
		getRotationFromMatrix: function (a, b) {
			var c = b ? b.x : 1,
				d = b ? b.y : 1,
				e = b ? b.z : 1,
				f = a.elements[0] / c,
				g = a.elements[4] / d,
				h = (c = a.elements[1] / c, d = a.elements[5] / d, a.elements[9] / e),
				j = a.elements[10] / e;
			return this.y = Math.asin(a.elements[8] / e), e = Math.cos(this.y), 0.00001 < Math.abs(e) ? (this.x = Math.atan2(-h / e, j / e), this.z = Math.atan2(-g / e, f / e)) : (this.x = 0, this.z = Math.atan2(c, d)), this
		},
		getScaleFromMatrix: function (b) {
			var c = this.set(b.elements[0], b.elements[1], b.elements[2]).length(),
				a = this.set(b.elements[4], b.elements[5], b.elements[6]).length();
			b = this.set(b.elements[8], b.elements[9], b.elements[10]).length();
			this.x = c, this.y = a, this.z = b
		},
		equals: function (a) {
			return a.x === this.x && a.y === this.y && a.z === this.z
		},
		isZero: function () {
			return this.lengthSq() < 0.0001
		},
		clone: function () {
			return new THREE.Vector3(this.x, this.y, this.z)
		}
	}, THREE.Vector4 = function (c, d, a, b) {
		this.x = c || 0, this.y = d || 0, this.z = a || 0, this.w = void 0 !== b ? b : 1
	}, THREE.Vector4.prototype = {
		constructor: THREE.Vector4,
		set: function (c, d, a, b) {
			return this.x = c, this.y = d, this.z = a, this.w = b, this
		},
		copy: function (a) {
			return this.x = a.x, this.y = a.y, this.z = a.z, this.w = void 0 !== a.w ? a.w : 1, this
		},
		add: function (a, b) {
			return this.x = a.x + b.x, this.y = a.y + b.y, this.z = a.z + b.z, this.w = a.w + b.w, this
		},
		addSelf: function (a) {
			return this.x = this.x + a.x, this.y = this.y + a.y, this.z = this.z + a.z, this.w = this.w + a.w, this
		},
		sub: function (a, b) {
			return this.x = a.x - b.x, this.y = a.y - b.y, this.z = a.z - b.z, this.w = a.w - b.w, this
		},
		subSelf: function (a) {
			return this.x = this.x - a.x, this.y = this.y - a.y, this.z = this.z - a.z, this.w = this.w - a.w, this
		},
		multiplyScalar: function (a) {
			return this.x = this.x * a, this.y = this.y * a, this.z = this.z * a, this.w = this.w * a, this
		},
		divideScalar: function (a) {
			return a ? (this.x = this.x / a, this.y = this.y / a, this.z = this.z / a, this.w = this.w / a) : (this.z = this.y = this.x = 0, this.w = 1), this
		},
		negate: function () {
			return this.multiplyScalar(-1)
		},
		dot: function (a) {
			return this.x * a.x + this.y * a.y + this.z * a.z + this.w * a.w
		},
		lengthSq: function () {
			return this.dot(this)
		},
		length: function () {
			return Math.sqrt(this.lengthSq())
		},
		normalize: function () {
			return this.divideScalar(this.length())
		},
		setLength: function (a) {
			return this.normalize().multiplyScalar(a)
		},
		lerpSelf: function (a, b) {
			return this.x = this.x + (a.x - this.x) * b, this.y = this.y + (a.y - this.y) * b, this.z = this.z + (a.z - this.z) * b, this.w = this.w + (a.w - this.w) * b, this
		},
		clone: function () {
			return new THREE.Vector4(this.x, this.y, this.z, this.w)
		}
	}, THREE.Frustum = function () {
		this.planes = [new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4]
	}, THREE.Frustum.prototype.setFromMatrix = function (l) {
		var n, p = this.planes;
		l = (q = l.elements)[0];
		n = q[1];
		var a = q[2],
			b = q[3],
			c = q[4],
			d = q[5],
			f = q[6],
			h = q[7],
			g = q[8],
			o = q[9],
			j = q[10],
			m = q[11],
			r = q[12],
			k = q[13],
			e = q[14],
			q = q[15];
		for (p[0].set(b - l, h - c, m - g, q - r), p[1].set(b + l, h + c, m + g, q + r), p[2].set(b + n, h + d, m + o, q + k), p[3].set(b - n, h - d, m - o, q - k), p[4].set(b - a, h - f, m - j, q - e), p[5].set(b + a, h + f, m + j, q + e), l = 0; l < 6; l++) {
			(n = p[l]).divideScalar(Math.sqrt(n.x * n.x + n.y * n.y + n.z * n.z))
		}
	}, THREE.Frustum.prototype.contains = function (d) {
		for (var e = this.planes, b = (a = d.matrixWorld).elements, a = -d.geometry.boundingSphere.radius * a.getMaxScaleOnAxis(), c = 0; c < 6; c++) {
			if ((d = e[c].x * b[12] + e[c].y * b[13] + e[c].z * b[14] + e[c].w) <= a) {
				return !1
			}
		}
		return !0
	}, THREE.Frustum.__v1 = new THREE.Vector3, THREE.Ray = function (H, J) {
		function a(x, y, i) {
			return p.sub(i, x), w = p.dot(y), u = l.add(x, q.copy(y).multiplyScalar(w)), i.distanceTo(u)
		}

		function b(y, B, i, x) {
			return p.sub(x, B), l.sub(i, B), q.sub(y, B), t = p.dot(p), A = p.dot(l), r = p.dot(q), v = l.dot(l), E = l.dot(q), s = (t * E - A * r) * (z = 1 / (t * v - A * A)), 0 <= (o = (v * r - A * E) * z) && 0 <= s && o + s < 1
		}
		this.origin = H || new THREE.Vector3, this.direction = J || new THREE.Vector3;
		var c = 0.0001;
		this.setPrecision = function (i) {
			c = i
		};
		var d = new THREE.Vector3,
			e = new THREE.Vector3,
			f = new THREE.Vector3,
			g = new THREE.Vector3,
			j = new THREE.Vector3,
			h = new THREE.Vector3,
			n = new THREE.Vector3,
			k = new THREE.Vector3,
			m = new THREE.Vector3;
		this.intersectObject = function (B) {
			var C, F = [];
			if (B instanceof THREE.Particle) {
				if ((G = a(this.origin, this.direction, B.matrixWorld.getPosition())) > B.scale.x) {
					return []
				}
				C = {
					distance: G,
					point: B.position,
					face: null,
					object: B
				}, F.push(C)
			} else {
				if (B instanceof THREE.Mesh) {
					var G = a(this.origin, this.direction, B.matrixWorld.getPosition()),
						K = THREE.Frustum.__v1.set(B.matrixWorld.getColumnX().length(), B.matrixWorld.getColumnY().length(), B.matrixWorld.getColumnZ().length());
					if (G > B.geometry.boundingSphere.radius * Math.max(K.x, Math.max(K.y, K.z))) {
						return F
					}
					var i, D, I, x = B.geometry,
						y = x.vertices;
					for (B.matrixRotationWorld.extractRotation(B.matrixWorld), G = 0, K = x.faces.length; G < K; G++) {
						C = x.faces[G], j.copy(this.origin), h.copy(this.direction), I = B.matrixWorld, n = I.multiplyVector3(n.copy(C.centroid)).subSelf(j), k = B.matrixRotationWorld.multiplyVector3(k.copy(C.normal)), i = h.dot(k), Math.abs(i) < c || (D = k.dot(n) / i) < 0 || !B.doubleSided && !(B.flipSided ? 0 < i : i < 0) || (m.add(j, h.multiplyScalar(D)), C instanceof THREE.Face3 ? (d = I.multiplyVector3(d.copy(y[C.a])), e = I.multiplyVector3(e.copy(y[C.b])), f = I.multiplyVector3(f.copy(y[C.c])), b(m, d, e, f) && (C = {
							distance: j.distanceTo(m),
							point: m.clone(),
							face: C,
							object: B
						}, F.push(C))) : C instanceof THREE.Face4 && (d = I.multiplyVector3(d.copy(y[C.a])), e = I.multiplyVector3(e.copy(y[C.b])), f = I.multiplyVector3(f.copy(y[C.c])), g = I.multiplyVector3(g.copy(y[C.d])), (b(m, d, e, g) || b(m, e, f, g)) && (C = {
							distance: j.distanceTo(m),
							point: m.clone(),
							face: C,
							object: B
						}, F.push(C))))
					}
				}
			}
			return F
		}, this.intersectObjects = function (y) {
			for (var B = [], i = 0, x = y.length; i < x; i++) {
				Array.prototype.push.apply(B, this.intersectObject(y[i]))
			}
			return B.sort(function (C, D) {
				return C.distance - D.distance
			}), B
		};
		var w, u, t, A, r, v, E, z, o, s, p = new THREE.Vector3,
			l = new THREE.Vector3,
			q = new THREE.Vector3
	}, THREE.Rectangle = function () {
		function d() {
			a = g - e, b = h - f
		}
		var e, f, g, h, a, b, c = !0;
		this.getX = function () {
			return e
		}, this.getY = function () {
			return f
		}, this.getWidth = function () {
			return a
		}, this.getHeight = function () {
			return b
		}, this.getLeft = function () {
			return e
		}, this.getTop = function () {
			return f
		}, this.getRight = function () {
			return g
		}, this.getBottom = function () {
			return h
		}, this.set = function (l, i, j, k) {
			c = !1, e = l, f = i, g = j, h = k, d()
		}, this.addPoint = function (i, j) {
			c ? (c = !1, g = e = i, h = f = j) : (e = e < i ? e : i, f = f < j ? f : j, g = i < g ? g : i, h = j < h ? h : j), d()
		}, this.add3Points = function (m, n, i, l, j, k) {
			c ? (c = !1, e = m < i ? m < j ? m : j : i < j ? i : j, f = n < l ? n < k ? n : k : l < k ? l : k, g = i < m ? j < m ? m : j : j < i ? i : j, h = l < n ? k < n ? n : k : k < l ? l : k) : (e = m < i ? m < j ? m < e ? m : e : j < e ? j : e : i < j ? i < e ? i : e : j < e ? j : e, f = n < l ? n < k ? n < f ? n : f : k < f ? k : f : l < k ? l < f ? l : f : k < f ? k : f, g = i < m ? j < m ? g < m ? m : g : g < j ? j : g : j < i ? g < i ? i : g : g < j ? j : g, h = l < n ? k < n ? h < n ? n : h : h < k ? k : h : k < l ? h < l ? l : h : h < k ? k : h), d()
		}, this.addRectangle = function (i) {
			c ? (c = !1, e = i.getLeft(), f = i.getTop(), g = i.getRight(), h = i.getBottom()) : (e = e < i.getLeft() ? e : i.getLeft(), f = f < i.getTop() ? f : i.getTop(), g = g > i.getRight() ? g : i.getRight(), h = h > i.getBottom() ? h : i.getBottom()), d()
		}, this.inflate = function (i) {
			e -= i, f -= i, g += i, h += i, d()
		}, this.minSelf = function (i) {
			e = e > i.getLeft() ? e : i.getLeft(), f = f > i.getTop() ? f : i.getTop(), g = g < i.getRight() ? g : i.getRight(), h = h < i.getBottom() ? h : i.getBottom(), d()
		}, this.intersects = function (i) {
			return !(g < i.getLeft() || e > i.getRight() || h < i.getTop() || f > i.getBottom())
		}, this.empty = function () {
			c = !0, h = g = f = e = 0, d()
		}, this.isEmpty = function () {
			return c
		}
	}, THREE.Math = {
		clamp: function (b, c, a) {
			return b < c ? c : a < b ? a : b
		},
		clampBottom: function (a, b) {
			return a < b ? b : a
		},
		mapLinear: function (d, e, a, b, c) {
			return b + (d - e) * (c - b) / (a - e)
		},
		random16: function () {
			return (65280 * Math.random() + 255 * Math.random()) / 65535
		},
		randInt: function (a, b) {
			return a + Math.floor(Math.random() * (b - a + 1))
		},
		randFloat: function (a, b) {
			return a + Math.random() * (b - a)
		},
		randFloatSpread: function (a) {
			return a * (0.5 - Math.random())
		},
		sign: function (a) {
			return a < 0 ? -1 : 0 < a ? 1 : 0
		}
	}, THREE.Matrix3 = function () {
		this.elements = new Float32Array(9)
	}, THREE.Matrix3.prototype = {
		constructor: THREE.Matrix3,
		getInverse: function (h) {
			h = (j = h.elements)[10] * j[5] - j[6] * j[9];
			var k = -j[10] * j[1] + j[2] * j[9],
				l = j[6] * j[1] - j[2] * j[5],
				a = -j[10] * j[4] + j[6] * j[8],
				b = j[10] * j[0] - j[2] * j[8],
				c = -j[6] * j[0] + j[2] * j[4],
				d = j[9] * j[4] - j[5] * j[8],
				e = -j[9] * j[0] + j[1] * j[8],
				g = j[5] * j[0] - j[1] * j[4];
			0 === (j = j[0] * h + j[1] * a + j[2] * d) && console.warn("Matrix3.getInverse(): determinant == 0");
			var j = 1 / j,
				f = this.elements;
			return f[0] = j * h, f[1] = j * k, f[2] = j * l, f[3] = j * a, f[4] = j * b, f[5] = j * c, f[6] = j * d, f[7] = j * e, f[8] = j * g, this
		},
		transpose: function () {
			var a, b = this.elements;
			return a = b[1], b[1] = b[3], b[3] = a, a = b[2], b[2] = b[6], b[6] = a, a = b[5], b[5] = b[7], b[7] = a, this
		},
		transposeIntoArray: function (a) {
			var b = this.m;
			return a[0] = b[0], a[1] = b[3], a[2] = b[6], a[3] = b[1], a[4] = b[4], a[5] = b[7], a[6] = b[2], a[7] = b[5], a[8] = b[8], this
		}
	}, THREE.Matrix4 = function (o, q, b, c, d, e, g, h, j, l, k, a, m, p, f, n) {
		this.elements = new Float32Array(16), this.set(void 0 !== o ? o : 1, q || 0, b || 0, c || 0, d || 0, void 0 !== e ? e : 1, g || 0, h || 0, j || 0, l || 0, void 0 !== k ? k : 1, a || 0, m || 0, p || 0, f || 0, void 0 !== n ? n : 1)
	}, THREE.Matrix4.prototype = {
		constructor: THREE.Matrix4,
		set: function (l, n, p, r, a, b, c, d, f, h, g, o, j, m, q, k) {
			var e = this.elements;
			return e[0] = l, e[4] = n, e[8] = p, e[12] = r, e[1] = a, e[5] = b, e[9] = c, e[13] = d, e[2] = f, e[6] = h, e[10] = g, e[14] = o, e[3] = j, e[7] = m, e[11] = q, e[15] = k, this
		},
		identity: function () {
			return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
		},
		copy: function (a) {
			return a = a.elements, this.set(a[0], a[4], a[8], a[12], a[1], a[5], a[9], a[13], a[2], a[6], a[10], a[14], a[3], a[7], a[11], a[15]), this
		},
		lookAt: function (e, f, g) {
			var a = this.elements,
				b = THREE.Matrix4.__v1,
				c = THREE.Matrix4.__v2,
				d = THREE.Matrix4.__v3;
			return d.sub(e, f).normalize(), 0 === d.length() && (d.z = 1), b.cross(g, d).normalize(), 0 === b.length() && (d.x = d.x + 0.0001, b.cross(g, d).normalize()), c.cross(d, b), a[0] = b.x, a[4] = c.x, a[8] = d.x, a[1] = b.y, a[5] = c.y, a[9] = d.y, a[2] = b.z, a[6] = c.z, a[10] = d.z, this
		},
		multiply: function (r, s) {
			var t = r.elements,
				u = s.elements,
				v = this.elements,
				w = t[0],
				y = t[4],
				z = t[8],
				D = t[12],
				G = t[1],
				E = t[5],
				M = t[9],
				H = t[13],
				K = t[2],
				R = t[6],
				J = t[10],
				a = t[14],
				f = t[3],
				d = t[7],
				k = t[11],
				b = (t = t[15], u[0]),
				i = u[4],
				j = u[8],
				e = u[12],
				n = u[1],
				g = u[5],
				P = u[9],
				l = u[13],
				o = u[2],
				m = u[6],
				q = u[10],
				c = u[14],
				p = u[3],
				h = u[7],
				A = u[11];
			u = u[15];
			return v[0] = w * b + y * n + z * o + D * p, v[4] = w * i + y * g + z * m + D * h, v[8] = w * j + y * P + z * q + D * A, v[12] = w * e + y * l + z * c + D * u, v[1] = G * b + E * n + M * o + H * p, v[5] = G * i + E * g + M * m + H * h, v[9] = G * j + E * P + M * q + H * A, v[13] = G * e + E * l + M * c + H * u, v[2] = K * b + R * n + J * o + a * p, v[6] = K * i + R * g + J * m + a * h, v[10] = K * j + R * P + J * q + a * A, v[14] = K * e + R * l + J * c + a * u, v[3] = f * b + d * n + k * o + t * p, v[7] = f * i + d * g + k * m + t * h, v[11] = f * j + d * P + k * q + t * A, v[15] = f * e + d * l + k * c + t * u, this
		},
		multiplySelf: function (a) {
			return this.multiply(this, a)
		},
		multiplyToArray: function (c, d, a) {
			var b = this.elements;
			return this.multiply(c, d), a[0] = b[0], a[1] = b[1], a[2] = b[2], a[3] = b[3], a[4] = b[4], a[5] = b[5], a[6] = b[6], a[7] = b[7], a[8] = b[8], a[9] = b[9], a[10] = b[10], a[11] = b[11], a[12] = b[12], a[13] = b[13], a[14] = b[14], a[15] = b[15], this
		},
		multiplyScalar: function (a) {
			var b = this.elements;
			return b[0] = b[0] * a, b[4] = b[4] * a, b[8] = b[8] * a, b[12] = b[12] * a, b[1] = b[1] * a, b[5] = b[5] * a, b[9] = b[9] * a, b[13] = b[13] * a, b[2] = b[2] * a, b[6] = b[6] * a, b[10] = b[10] * a, b[14] = b[14] * a, b[3] = b[3] * a, b[7] = b[7] * a, b[11] = b[11] * a, b[15] = b[15] * a, this
		},
		multiplyVector3: function (e) {
			var f = this.elements,
				a = e.x,
				b = e.y,
				c = e.z,
				d = 1 / (f[3] * a + f[7] * b + f[11] * c + f[15]);
			return e.x = (f[0] * a + f[4] * b + f[8] * c + f[12]) * d, e.y = (f[1] * a + f[5] * b + f[9] * c + f[13]) * d, e.z = (f[2] * a + f[6] * b + f[10] * c + f[14]) * d, e
		},
		multiplyVector4: function (e) {
			var f = this.elements,
				a = e.x,
				b = e.y,
				c = e.z,
				d = e.w;
			return e.x = f[0] * a + f[4] * b + f[8] * c + f[12] * d, e.y = f[1] * a + f[5] * b + f[9] * c + f[13] * d, e.z = f[2] * a + f[6] * b + f[10] * c + f[14] * d, e.w = f[3] * a + f[7] * b + f[11] * c + f[15] * d, e
		},
		rotateAxis: function (d) {
			var e = this.elements,
				a = d.x,
				b = d.y,
				c = d.z;
			return d.x = a * e[0] + b * e[4] + c * e[8], d.y = a * e[1] + b * e[5] + c * e[9], d.z = a * e[2] + b * e[6] + c * e[10], d.normalize(), d
		},
		crossVector: function (b) {
			var c = this.elements,
				a = new THREE.Vector4;
			return a.x = c[0] * b.x + c[4] * b.y + c[8] * b.z + c[12] * b.w, a.y = c[1] * b.x + c[5] * b.y + c[9] * b.z + c[13] * b.w, a.z = c[2] * b.x + c[6] * b.y + c[10] * b.z + c[14] * b.w, a.w = b.w ? c[3] * b.x + c[7] * b.y + c[11] * b.z + c[15] * b.w : 1, a
		},
		determinant: function () {
			var o, q = (o = this.elements)[0],
				b = o[4],
				c = o[8],
				d = o[12],
				e = o[1],
				g = o[5],
				h = o[9],
				j = o[13],
				l = o[2],
				k = o[6],
				a = o[10],
				m = o[14],
				p = o[3],
				f = o[7],
				n = o[11];
			return d * h * k * p - c * j * k * p - d * g * a * p + b * j * a * p + c * g * m * p - b * h * m * p - d * h * l * f + c * j * l * f + d * e * a * f - q * j * a * f - c * e * m * f + q * h * m * f + d * g * l * n - b * j * l * n - d * e * k * n + q * j * k * n + b * e * m * n - q * g * m * n - c * g * l * (o = o[15]) + b * h * l * o + c * e * k * o - q * h * k * o - b * e * a * o + q * g * a * o
		},
		transpose: function () {
			var b, a = this.elements;
			return b = a[1], a[1] = a[4], a[4] = b, b = a[2], a[2] = a[8], a[8] = b, b = a[6], a[6] = a[9], a[9] = b, b = a[3], a[3] = a[12], a[12] = b, b = a[7], a[7] = a[13], a[13] = b, b = a[11], a[11] = a[14], a[14] = b, this
		},
		flattenToArray: function (a) {
			var b = this.elements;
			return a[0] = b[0], a[1] = b[1], a[2] = b[2], a[3] = b[3], a[4] = b[4], a[5] = b[5], a[6] = b[6], a[7] = b[7], a[8] = b[8], a[9] = b[9], a[10] = b[10], a[11] = b[11], a[12] = b[12], a[13] = b[13], a[14] = b[14], a[15] = b[15], a
		},
		flattenToArrayOffset: function (b, c) {
			var a = this.elements;
			return b[c] = a[0], b[c + 1] = a[1], b[c + 2] = a[2], b[c + 3] = a[3], b[c + 4] = a[4], b[c + 5] = a[5], b[c + 6] = a[6], b[c + 7] = a[7], b[c + 8] = a[8], b[c + 9] = a[9], b[c + 10] = a[10], b[c + 11] = a[11], b[c + 12] = a[12], b[c + 13] = a[13], b[c + 14] = a[14], b[c + 15] = a[15], b
		},
		getPosition: function () {
			var a = this.elements;
			return THREE.Matrix4.__v1.set(a[12], a[13], a[14])
		},
		setPosition: function (a) {
			var b = this.elements;
			return b[12] = a.x, b[13] = a.y, b[14] = a.z, this
		},
		getColumnX: function () {
			var a = this.elements;
			return THREE.Matrix4.__v1.set(a[0], a[1], a[2])
		},
		getColumnY: function () {
			var a = this.elements;
			return THREE.Matrix4.__v1.set(a[4], a[5], a[6])
		},
		getColumnZ: function () {
			var a = this.elements;
			return THREE.Matrix4.__v1.set(a[8], a[9], a[10])
		},
		getInverse: function (b) {
			var d = this.elements,
				h = (f = b.elements)[0],
				k = f[4],
				l = f[8],
				o = f[12],
				p = f[1],
				q = f[5],
				a = f[9],
				r = f[13],
				j = f[2],
				c = f[6],
				g = f[10],
				m = f[14],
				e = f[3],
				n = f[7],
				u = f[11],
				f = f[15];
			return d[0] = a * m * n - r * g * n + r * c * u - q * m * u - a * c * f + q * g * f, d[4] = o * g * n - l * m * n - o * c * u + k * m * u + l * c * f - k * g * f, d[8] = l * r * n - o * a * n + o * q * u - k * r * u - l * q * f + k * a * f, d[12] = o * a * c - l * r * c - o * q * g + k * r * g + l * q * m - k * a * m, d[1] = r * g * e - a * m * e - r * j * u + p * m * u + a * j * f - p * g * f, d[5] = l * m * e - o * g * e + o * j * u - h * m * u - l * j * f + h * g * f, d[9] = o * a * e - l * r * e - o * p * u + h * r * u + l * p * f - h * a * f, d[13] = l * r * j - o * a * j + o * p * g - h * r * g - l * p * m + h * a * m, d[2] = q * m * e - r * c * e + r * j * n - p * m * n - q * j * f + p * c * f, d[6] = o * c * e - k * m * e - o * j * n + h * m * n + k * j * f - h * c * f, d[10] = k * r * e - o * q * e + o * p * n - h * r * n - k * p * f + h * q * f, d[14] = o * q * j - k * r * j - o * p * c + h * r * c + k * p * m - h * q * m, d[3] = a * c * e - q * g * e - a * j * n + p * g * n + q * j * u - p * c * u, d[7] = k * g * e - l * c * e + l * j * n - h * g * n - k * j * u + h * c * u, d[11] = l * q * e - k * a * e - l * p * n + h * a * n + k * p * u - h * q * u, d[15] = k * a * j - l * q * j + l * p * c - h * a * c - k * p * g + h * q * g, this.multiplyScalar(1 / b.determinant()), this
		},
		setRotationFromEuler: function (f, g) {
			var h = this.elements,
				j = f.x,
				k = f.y,
				l = f.z,
				m = Math.cos(j),
				p = (j = Math.sin(j), Math.cos(k)),
				a = (k = Math.sin(k), Math.cos(l));
			l = Math.sin(l);
			switch (g) {
				case "YXZ":
					var c = p * a,
						b = p * l,
						e = k * a,
						d = k * l;
					h[0] = c + d * j, h[4] = e * j - b, h[8] = m * k, h[1] = m * l, h[5] = m * a, h[9] = -j, h[2] = b * j - e, h[6] = d + c * j, h[10] = m * p;
					break;
				case "ZXY":
					c = p * a, b = p * l, e = k * a, d = k * l, h[0] = c - d * j, h[4] = -m * l, h[8] = e + b * j, h[1] = b + e * j, h[5] = m * a, h[9] = d - c * j, h[2] = -m * k, h[6] = j, h[10] = m * p;
					break;
				case "ZYX":
					c = m * a, b = m * l, e = j * a, d = j * l, h[0] = p * a, h[4] = e * k - b, h[8] = c * k + d, h[1] = p * l, h[5] = d * k + c, h[9] = b * k - e, h[2] = -k, h[6] = j * p, h[10] = m * p;
					break;
				case "YZX":
					c = m * p, b = m * k, e = j * p, d = j * k, h[0] = p * a, h[4] = d - c * l, h[8] = e * l + b, h[1] = l, h[5] = m * a, h[9] = -j * a, h[2] = -k * a, h[6] = b * l + e, h[10] = c - d * l;
					break;
				case "XZY":
					c = m * p, b = m * k, e = j * p, d = j * k, h[0] = p * a, h[4] = -l, h[8] = k * a, h[1] = c * l + d, h[5] = m * a, h[9] = b * l - e, h[2] = e * l - b, h[6] = j * a, h[10] = d * l + c;
					break;
				default:
					c = m * a, b = m * l, e = j * a, d = j * l, h[0] = p * a, h[4] = -p * l, h[8] = k, h[1] = b + e * k, h[5] = c - d * k, h[9] = -j * p, h[2] = d - c * k, h[6] = e + b * k, h[10] = m * p
			}
			return this
		},
		setRotationFromQuaternion: function (h) {
			var j = this.elements,
				k = h.x,
				l = h.y,
				a = h.z,
				b = h.w,
				e = a + a,
				g = (h = k * (c = k + k), k * (d = l + l)),
				f = (k = k * e, l * d),
				c = (l = l * e, a = a * e, b * c),
				d = b * d;
			b *= e;
			return j[0] = 1 - (f + a), j[4] = g - b, j[8] = k + d, j[1] = g + b, j[5] = 1 - (h + a), j[9] = l - c, j[2] = k - d, j[6] = l + c, j[10] = 1 - (h + f), this
		},
		compose: function (e, f, a) {
			var b = this.elements,
				c = THREE.Matrix4.__m1,
				d = THREE.Matrix4.__m2;
			return c.identity(), c.setRotationFromQuaternion(f), d.makeScale(a.x, a.y, a.z), this.multiply(c, d), b[12] = e.x, b[13] = e.y, b[14] = e.z, this
		},
		decompose: function (e, f, g) {
			var a = this.elements,
				b = THREE.Matrix4.__v1,
				c = THREE.Matrix4.__v2,
				d = THREE.Matrix4.__v3;
			return b.set(a[0], a[1], a[2]), c.set(a[4], a[5], a[6]), d.set(a[8], a[9], a[10]), e = e instanceof THREE.Vector3 ? e : new THREE.Vector3, f = f instanceof THREE.Quaternion ? f : new THREE.Quaternion, (g = g instanceof THREE.Vector3 ? g : new THREE.Vector3).x = b.length(), g.y = c.length(), g.z = d.length(), e.x = a[12], e.y = a[13], e.z = a[14], (a = THREE.Matrix4.__m1).copy(this), a.elements[0] = a.elements[0] / g.x, a.elements[1] = a.elements[1] / g.x, a.elements[2] = a.elements[2] / g.x, a.elements[4] = a.elements[4] / g.y, a.elements[5] = a.elements[5] / g.y, a.elements[6] = a.elements[6] / g.y, a.elements[8] = a.elements[8] / g.z, a.elements[9] = a.elements[9] / g.z, a.elements[10] = a.elements[10] / g.z, f.setFromRotationMatrix(a), [e, f, g]
		},
		extractPosition: function (a) {
			var b = this.elements;
			a = a.elements;
			return b[12] = a[12], b[13] = a[13], b[14] = a[14], this
		},
		extractRotation: function (d) {
			var e = this.elements,
				b = (d = d.elements, 1 / (a = THREE.Matrix4.__v1).set(d[0], d[1], d[2]).length()),
				c = 1 / a.set(d[4], d[5], d[6]).length(),
				a = 1 / a.set(d[8], d[9], d[10]).length();
			return e[0] = d[0] * b, e[1] = d[1] * b, e[2] = d[2] * b, e[4] = d[4] * c, e[5] = d[5] * c, e[6] = d[6] * c, e[8] = d[8] * a, e[9] = d[9] * a, e[10] = d[10] * a, this
		},
		translate: function (c) {
			var d = this.elements,
				a = c.x,
				b = c.y;
			c = c.z;
			return d[12] = d[0] * a + d[4] * b + d[8] * c + d[12], d[13] = d[1] * a + d[5] * b + d[9] * c + d[13], d[14] = d[2] * a + d[6] * b + d[10] * c + d[14], d[15] = d[3] * a + d[7] * b + d[11] * c + d[15], this
		},
		rotateX: function (h) {
			var j = this.elements,
				k = j[4],
				l = j[5],
				a = j[6],
				b = j[7],
				c = j[8],
				d = j[9],
				e = j[10],
				g = j[11],
				f = Math.cos(h);
			h = Math.sin(h);
			return j[4] = f * k + h * c, j[5] = f * l + h * d, j[6] = f * a + h * e, j[7] = f * b + h * g, j[8] = f * c - h * k, j[9] = f * d - h * l, j[10] = f * e - h * a, j[11] = f * g - h * b, this
		},
		rotateY: function (h) {
			var j = this.elements,
				k = j[0],
				l = j[1],
				a = j[2],
				b = j[3],
				c = j[8],
				d = j[9],
				e = j[10],
				g = j[11],
				f = Math.cos(h);
			h = Math.sin(h);
			return j[0] = f * k - h * c, j[1] = f * l - h * d, j[2] = f * a - h * e, j[3] = f * b - h * g, j[8] = f * c + h * k, j[9] = f * d + h * l, j[10] = f * e + h * a, j[11] = f * g + h * b, this
		},
		rotateZ: function (h) {
			var j = this.elements,
				k = j[0],
				l = j[1],
				a = j[2],
				b = j[3],
				c = j[4],
				d = j[5],
				e = j[6],
				g = j[7],
				f = Math.cos(h);
			h = Math.sin(h);
			return j[0] = f * k + h * c, j[1] = f * l + h * d, j[2] = f * a + h * e, j[3] = f * b + h * g, j[4] = f * c - h * k, j[5] = f * d - h * l, j[6] = f * e - h * a, j[7] = f * g - h * b, this
		},
		rotateByAxis: function (a, b) {
			var c = this.elements;
			if (1 === a.x && 0 === a.y && 0 === a.z) {
				return this.rotateX(b)
			}
			if (0 === a.x && 1 === a.y && 0 === a.z) {
				return this.rotateY(b)
			}
			if (0 === a.x && 0 === a.y && 1 === a.z) {
				return this.rotateZ(b)
			}
			var d = a.x,
				e = a.y,
				f = a.z,
				g = (e = e / (g = Math.sqrt(d * d + e * e + f * f)), f = f / g, (d = d / g) * d),
				h = e * e,
				j = f * f,
				n = d * e * (s = 1 - (l = Math.cos(b))),
				q = d * f * s,
				s = e * f * s,
				t = (d = d * (k = Math.sin(b)), e * k),
				k = f * k,
				l = (f = g + (1 - g) * l, g = n + k, e = q - t, n = n - k, h = h + (1 - h) * l, k = s + d, q = q + t, s = s - d, j = j + (1 - j) * l, c[0]),
				o = (d = c[1], t = c[2], c[3]),
				u = c[4],
				m = c[5],
				y = c[6],
				H = c[7],
				w = c[8],
				p = c[9],
				r = c[10],
				E = c[11];
			return c[0] = f * l + g * u + e * w, c[1] = f * d + g * m + e * p, c[2] = f * t + g * y + e * r, c[3] = f * o + g * H + e * E, c[4] = n * l + h * u + k * w, c[5] = n * d + h * m + k * p, c[6] = n * t + h * y + k * r, c[7] = n * o + h * H + k * E, c[8] = q * l + s * u + j * w, c[9] = q * d + s * m + j * p, c[10] = q * t + s * y + j * r, c[11] = q * o + s * H + j * E, this
		},
		scale: function (c) {
			var d = this.elements,
				a = c.x,
				b = c.y;
			c = c.z;
			return d[0] = d[0] * a, d[4] = d[4] * b, d[8] = d[8] * c, d[1] = d[1] * a, d[5] = d[5] * b, d[9] = d[9] * c, d[2] = d[2] * a, d[6] = d[6] * b, d[10] = d[10] * c, d[3] = d[3] * a, d[7] = d[7] * b, d[11] = d[11] * c, this
		},
		getMaxScaleOnAxis: function () {
			var a = this.elements;
			return Math.sqrt(Math.max(a[0] * a[0] + a[1] * a[1] + a[2] * a[2], Math.max(a[4] * a[4] + a[5] * a[5] + a[6] * a[6], a[8] * a[8] + a[9] * a[9] + a[10] * a[10])))
		},
		makeTranslation: function (b, c, a) {
			return this.set(1, 0, 0, b, 0, 1, 0, c, 0, 0, 1, a, 0, 0, 0, 1), this
		},
		makeRotationX: function (a) {
			var b = Math.cos(a);
			a = Math.sin(a);
			return this.set(1, 0, 0, 0, 0, b, -a, 0, 0, a, b, 0, 0, 0, 0, 1), this
		},
		makeRotationY: function (a) {
			var b = Math.cos(a);
			a = Math.sin(a);
			return this.set(b, 0, a, 0, 0, 1, 0, 0, -a, 0, b, 0, 0, 0, 0, 1), this
		},
		makeRotationZ: function (a) {
			var b = Math.cos(a);
			a = Math.sin(a);
			return this.set(b, -a, 0, 0, a, b, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
		},
		makeRotationAxis: function (j, l) {
			var a = Math.cos(l),
				b = Math.sin(l),
				c = 1 - a,
				d = j.x,
				e = j.y,
				f = j.z,
				g = c * d,
				h = c * e;
			return this.set(g * d + a, g * e - b * f, g * f + b * e, 0, g * e + b * f, h * e + a, h * f - b * d, 0, g * f - b * e, h * f + b * d, c * f * f + a, 0, 0, 0, 0, 1), this
		},
		makeScale: function (b, c, a) {
			return this.set(b, 0, 0, 0, 0, c, 0, 0, 0, 0, a, 0, 0, 0, 0, 1), this
		},
		makeFrustum: function (e, f, g, a, b, c) {
			var d = this.elements;
			return d[0] = 2 * b / (f - e), d[4] = 0, d[8] = (f + e) / (f - e), d[12] = 0, d[1] = 0, d[5] = 2 * b / (a - g), d[9] = (a + g) / (a - g), d[13] = 0, d[2] = 0, d[6] = 0, d[10] = -(c + b) / (c - b), d[14] = -2 * c * b / (c - b), d[3] = 0, d[7] = 0, d[11] = -1, d[15] = 0, this
		},
		makePerspective: function (d, e, a, b) {
			var c = -(d = a * Math.tan(d * Math.PI / 360));
			return this.makeFrustum(c * e, d * e, c, d, a, b)
		},
		makeOrthographic: function (j, l, a, b, c, d) {
			var e = this.elements,
				f = l - j,
				g = a - b,
				h = d - c;
			return e[0] = 2 / f, e[4] = 0, e[8] = 0, e[12] = -(l + j) / f, e[1] = 0, e[5] = 2 / g, e[9] = 0, e[13] = -(a + b) / g, e[2] = 0, e[6] = 0, e[10] = -2 / h, e[14] = -(d + c) / h, e[3] = 0, e[7] = 0, e[11] = 0, e[15] = 1, this
		},
		clone: function () {
			var a = this.elements;
			return new THREE.Matrix4(a[0], a[4], a[8], a[12], a[1], a[5], a[9], a[13], a[2], a[6], a[10], a[14], a[3], a[7], a[11], a[15])
		}
	}, THREE.Matrix4.__v1 = new THREE.Vector3, THREE.Matrix4.__v2 = new THREE.Vector3, THREE.Matrix4.__v3 = new THREE.Vector3, THREE.Matrix4.__m1 = new THREE.Matrix4, THREE.Matrix4.__m2 = new THREE.Matrix4, THREE.Object3D = function () {
		this.id = THREE.Object3DCount++, this.name = "", this.parent = void 0, this.children = [], this.up = new THREE.Vector3(0, 1, 0), this.position = new THREE.Vector3, this.rotation = new THREE.Vector3, this.eulerOrder = "XYZ", this.scale = new THREE.Vector3(1, 1, 1), this.flipSided = this.doubleSided = !1, this.renderDepth = null, this.rotationAutoUpdate = !0, this.matrix = new THREE.Matrix4, this.matrixWorld = new THREE.Matrix4, this.matrixRotationWorld = new THREE.Matrix4, this.matrixWorldNeedsUpdate = this.matrixAutoUpdate = !0, this.quaternion = new THREE.Quaternion, this.useQuaternion = !1, this.boundRadius = 0, this.boundRadiusScale = 1, this.visible = !0, this.receiveShadow = this.castShadow = !1, this.frustumCulled = !0, this._vector = new THREE.Vector3
	}, THREE.Object3D.prototype = {
		constructor: THREE.Object3D,
		applyMatrix: function (a) {
			this.matrix.multiply(a, this.matrix), this.scale.getScaleFromMatrix(this.matrix), this.rotation.getRotationFromMatrix(this.matrix, this.scale), this.position.getPositionFromMatrix(this.matrix)
		},
		translate: function (a, b) {
			this.matrix.rotateAxis(b), this.position.addSelf(b.multiplyScalar(a))
		},
		translateX: function (a) {
			this.translate(a, this._vector.set(1, 0, 0))
		},
		translateY: function (a) {
			this.translate(a, this._vector.set(0, 1, 0))
		},
		translateZ: function (a) {
			this.translate(a, this._vector.set(0, 0, 1))
		},
		lookAt: function (a) {
			this.matrix.lookAt(a, this.position, this.up), this.rotationAutoUpdate && this.rotation.getRotationFromMatrix(this.matrix)
		},
		add: function (a) {
			if (a === this) {
				console.warn("THREE.Object3D.add: An object can't be added as a child of itself.")
			} else {
				if (a instanceof THREE.Object3D) {
					void 0 !== a.parent && a.parent.remove(a), (a.parent = this).children.push(a);
					for (var b = this; void 0 !== b.parent;) {
						b = b.parent
					}
					void 0 !== b && b instanceof THREE.Scene && b.__addObject(a)
				}
			}
		},
		remove: function (a) {
			var b = this.children.indexOf(a);
			if (-1 !== b) {
				for (a.parent = void 0, this.children.splice(b, 1), b = this; void 0 !== b.parent;) {
					b = b.parent
				}
				void 0 !== b && b instanceof THREE.Scene && b.__removeObject(a)
			}
		},
		getChildByName: function (d, e) {
			var a, b, c;
			for (a = 0, b = this.children.length; a < b; a++) {
				if ((c = this.children[a]).name === d) {
					return c
				}
				if (e && void 0 !== (c = c.getChildByName(d, e))) {
					return c
				}
			}
		},
		updateMatrix: function () {
			this.matrix.setPosition(this.position), this.useQuaternion ? this.matrix.setRotationFromQuaternion(this.quaternion) : this.matrix.setRotationFromEuler(this.rotation, this.eulerOrder), 1 === this.scale.x && 1 === this.scale.y && 1 === this.scale.z || (this.matrix.scale(this.scale), this.boundRadiusScale = Math.max(this.scale.x, Math.max(this.scale.y, this.scale.z))), this.matrixWorldNeedsUpdate = !0
		},
		updateMatrixWorld: function (b) {
			this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || b) && (this.parent ? this.matrixWorld.multiply(this.parent.matrixWorld, this.matrix) : this.matrixWorld.copy(this.matrix), b = !(this.matrixWorldNeedsUpdate = !1));
			for (var c = 0, a = this.children.length; c < a; c++) {
				this.children[c].updateMatrixWorld(b)
			}
		}
	}, THREE.Object3DCount = 0, THREE.Projector = function () {
		function z() {
			var i = a[K] = a[K] || new THREE.RenderableObject;
			return K++, i
		}

		function A() {
			var i = e[c] = e[c] || new THREE.RenderableVertex;
			return c++, i
		}

		function E(i, x) {
			return x.z - i.z
		}

		function H(B, C) {
			var D = 0,
				F = 1,
				G = B.z + B.w,
				I = C.z + C.w,
				i = -B.z + B.w,
				x = -C.z + C.w;
			return 0 <= G && 0 <= I && 0 <= i && 0 <= x || !(G < 0 && I < 0 || i < 0 && x < 0) && (G < 0 ? D = Math.max(D, G / (G - I)) : I < 0 && (F = Math.min(F, G / (G - I))), i < 0 ? D = Math.max(D, i / (i - x)) : x < 0 && (F = Math.min(F, i / (i - x))), !(F < D) && (B.lerpSelf(C, D), C.lerpSelf(B, 1 - F), !0))
		}
		var J, K, b, c, d, j, h, g, m, o, v, a = [],
			e = [],
			f = [],
			l = [],
			r = [],
			n = [],
			t = {
				objects: [],
				sprites: [],
				lights: [],
				elements: []
			},
			u = new THREE.Vector3,
			p = new THREE.Vector4,
			q = new THREE.Matrix4,
			s = new THREE.Matrix4,
			k = new THREE.Frustum,
			w = new THREE.Vector4,
			y = new THREE.Vector4;
		this.projectVector = function (i, x) {
			return x.matrixWorldInverse.getInverse(x.matrixWorld), q.multiply(x.projectionMatrix, x.matrixWorldInverse), q.multiplyVector3(i), i
		}, this.unprojectVector = function (i, x) {
			return x.projectionMatrixInverse.getInverse(x.projectionMatrix), q.multiply(x.matrixWorld, x.projectionMatrixInverse), q.multiplyVector3(i), i
		}, this.pickingRay = function (x, B) {
			var i;
			return x.z = -1, i = new THREE.Vector3(x.x, x.y, 1), this.unprojectVector(x, B), this.unprojectVector(i, B), i.subSelf(x).normalize(), new THREE.Ray(x, i)
		}, this.projectGraph = function (i, x) {
			K = 0, t.objects.length = 0, t.sprites.length = 0, t.lights.length = 0;
			var B = function (F) {
				if (!1 !== F.visible) {
					(F instanceof THREE.Mesh || F instanceof THREE.Line) && (!1 === F.frustumCulled || k.contains(F)) ? (u.copy(F.matrixWorld.getPosition()), q.multiplyVector3(u), (J = z()).object = F, J.z = u.z, t.objects.push(J)) : F instanceof THREE.Sprite || F instanceof THREE.Particle ? (u.copy(F.matrixWorld.getPosition()), q.multiplyVector3(u), (J = z()).object = F, J.z = u.z, t.sprites.push(J)) : F instanceof THREE.Light && t.lights.push(F);
					for (var C = 0, D = F.children.length; C < D; C++) {
						B(F.children[C])
					}
				}
			};
			return B(i), x && t.objects.sort(E), t
		}, this.projectScene = function (M, i, x) {
			var N, U, G, W, I, R, F, D, Q, S, X, T, P, V, O, B = i.near,
				L = i.far,
				C = !1;
			for (v = m = h = j = 0, void(t.elements.length = 0) === i.parent && (console.warn("DEPRECATED: Camera hasn't been added to a Scene. Adding it..."), M.add(i)), M.updateMatrixWorld(), i.matrixWorldInverse.getInverse(i.matrixWorld), q.multiply(i.projectionMatrix, i.matrixWorldInverse), k.setFromMatrix(q), t = this.projectGraph(M, !1), M = 0, N = t.objects.length; M < N; M++) {
				if (S = (Q = t.objects[M].object).matrixWorld, c = 0, Q instanceof THREE.Mesh) {
					for (X = Q.geometry, T = Q.geometry.materials, W = X.vertices, P = X.faces, V = X.faceVertexUvs, X = Q.matrixRotationWorld.extractRotation(S), U = 0, G = W.length; U < G; U++) {
						(b = A()).positionWorld.copy(W[U]), S.multiplyVector3(b.positionWorld), b.positionScreen.copy(b.positionWorld), q.multiplyVector4(b.positionScreen), b.positionScreen.x = b.positionScreen.x / b.positionScreen.w, b.positionScreen.y = b.positionScreen.y / b.positionScreen.w, b.visible = b.positionScreen.z > B && b.positionScreen.z < L
					}
					for (W = 0, U = P.length; W < U; W++) {
						if ((G = P[W]) instanceof THREE.Face3) {
							if (I = e[G.a], R = e[G.b], F = e[G.c], !(I.visible && R.visible && F.visible)) {
								continue
							}
							if (C = (F.positionScreen.x - I.positionScreen.x) * (R.positionScreen.y - I.positionScreen.y) - (F.positionScreen.y - I.positionScreen.y) * (R.positionScreen.x - I.positionScreen.x) < 0, !Q.doubleSided && C == Q.flipSided) {
								continue
							}
							D = f[j] = f[j] || new THREE.RenderableFace3, j++, (d = D).v1.copy(I), d.v2.copy(R), d.v3.copy(F)
						} else {
							if (G instanceof THREE.Face4) {
								if (I = e[G.a], R = e[G.b], F = e[G.c], D = e[G.d], !(I.visible && R.visible && F.visible && D.visible)) {
									continue
								}
								if (C = (D.positionScreen.x - I.positionScreen.x) * (R.positionScreen.y - I.positionScreen.y) - (D.positionScreen.y - I.positionScreen.y) * (R.positionScreen.x - I.positionScreen.x) < 0 || (R.positionScreen.x - F.positionScreen.x) * (D.positionScreen.y - F.positionScreen.y) - (R.positionScreen.y - F.positionScreen.y) * (D.positionScreen.x - F.positionScreen.x) < 0, !Q.doubleSided && C == Q.flipSided) {
									continue
								}
								O = l[h] = l[h] || new THREE.RenderableFace4, h++, (d = O).v1.copy(I), d.v2.copy(R), d.v3.copy(F), d.v4.copy(D)
							}
						}
						for (d.normalWorld.copy(G.normal), !C && (Q.flipSided || Q.doubleSided) && d.normalWorld.negate(), X.multiplyVector3(d.normalWorld), d.centroidWorld.copy(G.centroid), S.multiplyVector3(d.centroidWorld), d.centroidScreen.copy(d.centroidWorld), q.multiplyVector3(d.centroidScreen), I = 0, R = (F = G.vertexNormals).length; I < R; I++) {
							(D = d.vertexNormalsWorld[I]).copy(F[I]), !C && (Q.flipSided || Q.doubleSided) && D.negate(), X.multiplyVector3(D)
						}
						for (I = 0, R = V.length; I < R; I++) {
							if (O = V[I][W]) {
								for (F = 0, D = O.length; F < D; F++) {
									d.uvs[I][F] = O[F]
								}
							}
						}
						d.material = Q.material, d.faceMaterial = null !== G.materialIndex ? T[G.materialIndex] : null, d.z = d.centroidScreen.z, t.elements.push(d)
					}
				} else {
					if (Q instanceof THREE.Line) {
						for (s.multiply(q, S), W = Q.geometry.vertices, (I = A()).positionScreen.copy(W[0]), s.multiplyVector4(I.positionScreen), S = Q.type === THREE.LinePieces ? 2 : 1, U = 1, G = W.length; U < G; U++) {
							(I = A()).positionScreen.copy(W[U]), s.multiplyVector4(I.positionScreen), 0 < (U + 1) % S || (R = e[c - 2], w.copy(I.positionScreen), y.copy(R.positionScreen), H(w, y) && (w.multiplyScalar(1 / w.w), y.multiplyScalar(1 / y.w), T = r[m] = r[m] || new THREE.RenderableLine, m++, (g = T).v1.positionScreen.copy(w), g.v2.positionScreen.copy(y), g.z = Math.max(w.z, y.z), g.material = Q.material, t.elements.push(g)))
						}
					}
				}
			}
			for (M = 0, N = t.sprites.length; M < N; M++) {
				S = (Q = t.sprites[M].object).matrixWorld, Q instanceof THREE.Particle && (p.set(S.elements[12], S.elements[13], S.elements[14], 1), q.multiplyVector4(p), p.z = p.z / p.w, 0 < p.z && p.z < 1 && (B = n[v] = n[v] || new THREE.RenderableParticle, v++, (o = B).x = p.x / p.w, o.y = p.y / p.w, o.z = p.z, o.rotation = Q.rotation.z, o.scale.x = Q.scale.x * Math.abs(o.x - (p.x + i.projectionMatrix.elements[0]) / (p.w + i.projectionMatrix.elements[12])), o.scale.y = Q.scale.y * Math.abs(o.y - (p.y + i.projectionMatrix.elements[5]) / (p.w + i.projectionMatrix.elements[13])), o.material = Q.material, t.elements.push(o)))
			}
			return x && t.elements.sort(E), t
		}
	}, THREE.Quaternion = function (c, d, a, b) {
		this.x = c || 0, this.y = d || 0, this.z = a || 0, this.w = void 0 !== b ? b : 1
	}, THREE.Quaternion.prototype = {
		constructor: THREE.Quaternion,
		set: function (c, d, a, b) {
			return this.x = c, this.y = d, this.z = a, this.w = b, this
		},
		copy: function (a) {
			return this.x = a.x, this.y = a.y, this.z = a.z, this.w = a.w, this
		},
		setFromEuler: function (d) {
			var e = Math.PI / 360,
				f = d.x * e,
				g = d.y * e,
				h = d.z * e,
				a = (d = Math.cos(g), g = Math.sin(g), e = Math.cos(-h), h = Math.sin(-h), Math.cos(f)),
				b = (f = Math.sin(f), d * e),
				c = g * h;
			return this.w = b * a - c * f, this.x = b * f + c * a, this.y = g * e * a + d * h * f, this.z = d * h * a - g * e * f, this
		},
		setFromAxisAngle: function (c, d) {
			var a = d / 2,
				b = Math.sin(a);
			return this.x = c.x * b, this.y = c.y * b, this.z = c.z * b, this.w = Math.cos(a), this
		},
		setFromRotationMatrix: function (a) {
			var b = Math.pow(a.determinant(), 1 / 3);
			return this.w = Math.sqrt(Math.max(0, b + a.elements[0] + a.elements[5] + a.elements[10])) / 2, this.x = Math.sqrt(Math.max(0, b + a.elements[0] - a.elements[5] - a.elements[10])) / 2, this.y = Math.sqrt(Math.max(0, b - a.elements[0] + a.elements[5] - a.elements[10])) / 2, this.z = Math.sqrt(Math.max(0, b - a.elements[0] - a.elements[5] + a.elements[10])) / 2, this.x = a.elements[6] - a.elements[9] < 0 ? -Math.abs(this.x) : Math.abs(this.x), this.y = a.elements[8] - a.elements[2] < 0 ? -Math.abs(this.y) : Math.abs(this.y), this.z = a.elements[1] - a.elements[4] < 0 ? -Math.abs(this.z) : Math.abs(this.z), this.normalize(), this
		},
		calculateW: function () {
			return this.w = -Math.sqrt(Math.abs(1 - this.x * this.x - this.y * this.y - this.z * this.z)), this
		},
		inverse: function () {
			return this.x = -1 * this.x, this.y = -1 * this.y, this.z = -1 * this.z, this
		},
		length: function () {
			return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
		},
		normalize: function () {
			var a = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
			return 0 === a ? this.w = this.z = this.y = this.x = 0 : (a = 1 / a, this.x = this.x * a, this.y = this.y * a, this.z = this.z * a, this.w = this.w * a), this
		},
		multiply: function (a, b) {
			return this.x = a.x * b.w + a.y * b.z - a.z * b.y + a.w * b.x, this.y = -a.x * b.z + a.y * b.w + a.z * b.x + a.w * b.y, this.z = a.x * b.y - a.y * b.x + a.z * b.w + a.w * b.z, this.w = -a.x * b.x - a.y * b.y - a.z * b.z + a.w * b.w, this
		},
		multiplySelf: function (d) {
			var e = this.x,
				f = this.y,
				g = this.z,
				h = this.w,
				a = d.x,
				b = d.y,
				c = d.z;
			d = d.w;
			return this.x = e * d + h * a + f * c - g * b, this.y = f * d + h * b + g * a - e * c, this.z = g * d + h * c + e * b - f * a, this.w = h * d - e * a - f * b - g * c, this
		},
		multiplyVector3: function (g, h) {
			h || (h = g);
			var j = g.x,
				k = g.y,
				l = g.z,
				p = this.x,
				a = this.y,
				b = this.z,
				c = this.w,
				e = c * j + a * l - b * k,
				d = c * k + b * j - p * l,
				f = c * l + p * k - a * j;
			j = -p * j - a * k - b * l;
			return h.x = e * c + j * -p + d * -b - f * -a, h.y = d * c + j * -a + f * -p - e * -b, h.z = f * c + j * -b + e * -a - d * -p, h
		},
		clone: function () {
			return new THREE.Quaternion(this.x, this.y, this.z, this.w)
		}
	}, THREE.Quaternion.slerp = function (e, f, a, b) {
		if ((c = e.w * f.w + e.x * f.x + e.y * f.y + e.z * f.z) < 0 ? (a.w = -f.w, a.x = -f.x, a.y = -f.y, a.z = -f.z, c = -c) : a.copy(f), 1 <= Math.abs(c)) {
			return a.w = e.w, a.x = e.x, a.y = e.y, a.z = e.z, a
		}
		var d = Math.acos(c),
			c = Math.sqrt(1 - c * c);
		return Math.abs(c) < 0.001 ? (a.w = 0.5 * (e.w + f.w), a.x = 0.5 * (e.x + f.x), a.y = 0.5 * (e.y + f.y), a.z = 0.5 * (e.z + f.z)) : (f = Math.sin((1 - b) * d) / c, b = Math.sin(b * d) / c, a.w = e.w * f + a.w * b, a.x = e.x * f + a.x * b, a.y = e.y * f + a.y * b, a.z = e.z * f + a.z * b), a
	}, THREE.Vertex = function () {
		console.warn("THREE.Vertex has been DEPRECATED. Use THREE.Vector3 instead.")
	}, THREE.Face3 = function (e, f, a, b, c, d) {
		this.a = e, this.b = f, this.c = a, this.normal = b instanceof THREE.Vector3 ? b : new THREE.Vector3, this.vertexNormals = b instanceof Array ? b : [], this.color = c instanceof THREE.Color ? c : new THREE.Color, this.vertexColors = c instanceof Array ? c : [], this.vertexTangents = [], this.materialIndex = d, this.centroid = new THREE.Vector3
	}, THREE.Face3.prototype = {
		constructor: THREE.Face3,
		clone: function () {
			var c, a, b = new THREE.Face3(this.a, this.b, this.c);
			for (b.normal.copy(this.normal), b.color.copy(this.color), b.centroid.copy(this.centroid), b.materialIndex = this.materialIndex, c = 0, a = this.vertexNormals.length; c < a; c++) {
				b.vertexNormals[c] = this.vertexNormals[c].clone()
			}
			for (c = 0, a = this.vertexColors.length; c < a; c++) {
				b.vertexColors[c] = this.vertexColors[c].clone()
			}
			for (c = 0, a = this.vertexTangents.length; c < a; c++) {
				b.vertexTangents[c] = this.vertexTangents[c].clone()
			}
			return b
		}
	}, THREE.Face4 = function (e, f, g, a, b, c, d) {
		this.a = e, this.b = f, this.c = g, this.d = a, this.normal = b instanceof THREE.Vector3 ? b : new THREE.Vector3, this.vertexNormals = b instanceof Array ? b : [], this.color = c instanceof THREE.Color ? c : new THREE.Color, this.vertexColors = c instanceof Array ? c : [], this.vertexTangents = [], this.materialIndex = d, this.centroid = new THREE.Vector3
	}, THREE.Face4.prototype = {
		constructor: THREE.Face4,
		clone: function () {
			var c, a, b = new THREE.Face4(this.a, this.b, this.c, this.d);
			for (b.normal.copy(this.normal), b.color.copy(this.color), b.centroid.copy(this.centroid), b.materialIndex = this.materialIndex, c = 0, a = this.vertexNormals.length; c < a; c++) {
				b.vertexNormals[c] = this.vertexNormals[c].clone()
			}
			for (c = 0, a = this.vertexColors.length; c < a; c++) {
				b.vertexColors[c] = this.vertexColors[c].clone()
			}
			for (c = 0, a = this.vertexTangents.length; c < a; c++) {
				b.vertexTangents[c] = this.vertexTangents[c].clone()
			}
			return b
		}
	}, THREE.UV = function (a, b) {
		this.u = a || 0, this.v = b || 0
	}, THREE.UV.prototype = {
		constructor: THREE.UV,
		set: function (a, b) {
			return this.u = a, this.v = b, this
		},
		copy: function (a) {
			return this.u = a.u, this.v = a.v, this
		},
		lerpSelf: function (a, b) {
			return this.u = this.u + (a.u - this.u) * b, this.v = this.v + (a.v - this.v) * b, this
		},
		clone: function () {
			return new THREE.UV(this.u, this.v)
		}
	}, THREE.Geometry = function () {
		this.id = THREE.GeometryCount++, this.vertices = [], this.colors = [], this.materials = [], this.faces = [], this.faceUvs = [
			[]
		], this.faceVertexUvs = [
			[]
		], this.morphTargets = [], this.morphColors = [], this.morphNormals = [], this.skinWeights = [], this.skinIndices = [], this.boundingSphere = this.boundingBox = null, this.dynamic = this.hasTangents = !1
	}, THREE.Geometry.prototype = {
		constructor: THREE.Geometry,
		applyMatrix: function (e) {
			var f = new THREE.Matrix4;
			f.extractRotation(e);
			for (var g = 0, a = this.vertices.length; g < a; g++) {
				e.multiplyVector3(this.vertices[g])
			}
			for (g = 0, a = this.faces.length; g < a; g++) {
				var b = this.faces[g];
				f.multiplyVector3(b.normal);
				for (var c = 0, d = b.vertexNormals.length; c < d; c++) {
					f.multiplyVector3(b.vertexNormals[c])
				}
				e.multiplyVector3(b.centroid)
			}
		},
		computeCentroids: function () {
			var b, c, a;
			for (b = 0, c = this.faces.length; b < c; b++) {
				(a = this.faces[b]).centroid.set(0, 0, 0), a instanceof THREE.Face3 ? (a.centroid.addSelf(this.vertices[a.a]), a.centroid.addSelf(this.vertices[a.b]), a.centroid.addSelf(this.vertices[a.c]), a.centroid.divideScalar(3)) : a instanceof THREE.Face4 && (a.centroid.addSelf(this.vertices[a.a]), a.centroid.addSelf(this.vertices[a.b]), a.centroid.addSelf(this.vertices[a.c]), a.centroid.addSelf(this.vertices[a.d]), a.centroid.divideScalar(4))
			}
		},
		computeFaceNormals: function () {
			var d, e, f, g, h, a, b = new THREE.Vector3,
				c = new THREE.Vector3;
			for (d = 0, e = this.faces.length; d < e; d++) {
				f = this.faces[d], g = this.vertices[f.a], h = this.vertices[f.b], a = this.vertices[f.c], b.sub(a, h), c.sub(g, h), b.crossSelf(c), b.isZero() || b.normalize(), f.normal.copy(b)
			}
		},
		computeVertexNormals: function () {
			var c, d, a, b;
			if (void 0 === this.__tmpVertices) {
				for (b = this.__tmpVertices = Array(this.vertices.length), c = 0, d = this.vertices.length; c < d; c++) {
					b[c] = new THREE.Vector3
				}
				for (c = 0, d = this.faces.length; c < d; c++) {
					(a = this.faces[c]) instanceof THREE.Face3 ? a.vertexNormals = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3] : a instanceof THREE.Face4 && (a.vertexNormals = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3])
				}
			} else {
				for (b = this.__tmpVertices, c = 0, d = this.vertices.length; c < d; c++) {
					b[c].set(0, 0, 0)
				}
			}
			for (c = 0, d = this.faces.length; c < d; c++) {
				(a = this.faces[c]) instanceof THREE.Face3 ? (b[a.a].addSelf(a.normal), b[a.b].addSelf(a.normal), b[a.c].addSelf(a.normal)) : a instanceof THREE.Face4 && (b[a.a].addSelf(a.normal), b[a.b].addSelf(a.normal), b[a.c].addSelf(a.normal), b[a.d].addSelf(a.normal))
			}
			for (c = 0, d = this.vertices.length; c < d; c++) {
				b[c].normalize()
			}
			for (c = 0, d = this.faces.length; c < d; c++) {
				(a = this.faces[c]) instanceof THREE.Face3 ? (a.vertexNormals[0].copy(b[a.a]), a.vertexNormals[1].copy(b[a.b]), a.vertexNormals[2].copy(b[a.c])) : a instanceof THREE.Face4 && (a.vertexNormals[0].copy(b[a.a]), a.vertexNormals[1].copy(b[a.b]), a.vertexNormals[2].copy(b[a.c]), a.vertexNormals[3].copy(b[a.d]))
			}
		},
		computeMorphNormals: function () {
			var j, l, a, b, c;
			for (a = 0, b = this.faces.length; a < b; a++) {
				for ((c = this.faces[a]).__originalFaceNormal ? c.__originalFaceNormal.copy(c.normal) : c.__originalFaceNormal = c.normal.clone(), c.__originalVertexNormals || (c.__originalVertexNormals = []), j = 0, l = c.vertexNormals.length; j < l; j++) {
					c.__originalVertexNormals[j] ? c.__originalVertexNormals[j].copy(c.vertexNormals[j]) : c.__originalVertexNormals[j] = c.vertexNormals[j].clone()
				}
			}
			var d = new THREE.Geometry;
			for (d.faces = this.faces, j = 0, l = this.morphTargets.length; j < l; j++) {
				if (!this.morphNormals[j]) {
					this.morphNormals[j] = {}, this.morphNormals[j].faceNormals = [], this.morphNormals[j].vertexNormals = [];
					var g, h, e = this.morphNormals[j].faceNormals,
						f = this.morphNormals[j].vertexNormals;
					for (a = 0, b = this.faces.length; a < b; a++) {
						c = this.faces[a], g = new THREE.Vector3, h = c instanceof THREE.Face3 ? {
							a: new THREE.Vector3,
							b: new THREE.Vector3,
							c: new THREE.Vector3
						} : {
							a: new THREE.Vector3,
							b: new THREE.Vector3,
							c: new THREE.Vector3,
							d: new THREE.Vector3
						}, e.push(g), f.push(h)
					}
				}
				for (e = this.morphNormals[j], d.vertices = this.morphTargets[j].vertices, d.computeFaceNormals(), d.computeVertexNormals(), a = 0, b = this.faces.length; a < b; a++) {
					c = this.faces[a], g = e.faceNormals[a], h = e.vertexNormals[a], g.copy(c.normal), c instanceof THREE.Face3 ? (h.a.copy(c.vertexNormals[0]), h.b.copy(c.vertexNormals[1]), h.c.copy(c.vertexNormals[2])) : (h.a.copy(c.vertexNormals[0]), h.b.copy(c.vertexNormals[1]), h.c.copy(c.vertexNormals[2]), h.d.copy(c.vertexNormals[3]))
				}
			}
			for (a = 0, b = this.faces.length; a < b; a++) {
				(c = this.faces[a]).normal = c.__originalFaceNormal, c.vertexNormals = c.__originalVertexNormals
			}
		},
		computeTangents: function () {
			function t(F, G, I, i, x, B, C) {
				E = F.vertices[G], H = F.vertices[I], K = F.vertices[i], J = D[x], a = D[B], M = D[C], R = H.x - E.x, c = K.x - E.x, P = H.y - E.y, d = K.y - E.y, j = H.z - E.z, g = K.z - E.z, o = a.u - J.u, e = M.u - J.u, l = a.v - J.v, m = M.v - J.v, h = 1 / (o * m - e * l), p.set((m * R - l * c) * h, (m * P - l * d) * h, (m * j - l * g) * h), r.set((o * c - e * R) * h, (o * d - e * P) * h, (o * g - e * j) * h), k[G].addSelf(p), k[I].addSelf(p), k[i].addSelf(p), b[G].addSelf(r), b[I].addSelf(r), b[i].addSelf(r)
			}
			var u, v, w, z, A, D, E, H, K, J, a, M, R, c, P, d, j, g, o, e, l, m, h, q, k = [],
				b = [],
				p = new THREE.Vector3,
				r = new THREE.Vector3,
				y = new THREE.Vector3,
				n = new THREE.Vector3,
				f = new THREE.Vector3;
			for (u = 0, v = this.vertices.length; u < v; u++) {
				k[u] = new THREE.Vector3, b[u] = new THREE.Vector3
			}
			for (u = 0, v = this.faces.length; u < v; u++) {
				A = this.faces[u], D = this.faceVertexUvs[0][u], A instanceof THREE.Face3 ? t(this, A.a, A.b, A.c, 0, 1, 2) : A instanceof THREE.Face4 && (t(this, A.a, A.b, A.d, 0, 1, 3), t(this, A.b, A.c, A.d, 1, 2, 3))
			}
			var s = ["a", "b", "c", "d"];
			for (u = 0, v = this.faces.length; u < v; u++) {
				for (A = this.faces[u], w = 0; w < A.vertexNormals.length; w++) {
					f.copy(A.vertexNormals[w]), z = A[s[w]], q = k[z], y.copy(q), y.subSelf(f.multiplyScalar(f.dot(q))).normalize(), n.cross(A.vertexNormals[w], q), z = (z = n.dot(b[z])) < 0 ? -1 : 1, A.vertexTangents[w] = new THREE.Vector4(y.x, y.y, y.z, z)
				}
			}
			this.hasTangents = !0
		},
		computeBoundingBox: function () {
			if (this.boundingBox || (this.boundingBox = {
					min: new THREE.Vector3,
					max: new THREE.Vector3
				}), 0 < this.vertices.length) {
				var d;
				d = this.vertices[0], this.boundingBox.min.copy(d), this.boundingBox.max.copy(d);
				for (var e = this.boundingBox.min, a = this.boundingBox.max, b = 1, c = this.vertices.length; b < c; b++) {
					(d = this.vertices[b]).x < e.x ? e.x = d.x : d.x > a.x && (a.x = d.x), d.y < e.y ? e.y = d.y : d.y > a.y && (a.y = d.y), d.z < e.z ? e.z = d.z : d.z > a.z && (a.z = d.z)
				}
			} else {
				this.boundingBox.min.set(0, 0, 0), this.boundingBox.max.set(0, 0, 0)
			}
		},
		computeBoundingSphere: function () {
			this.boundingSphere || (this.boundingSphere = {
				radius: 0
			});
			for (var c, d = 0, a = 0, b = this.vertices.length; a < b; a++) {
				d < (c = this.vertices[a].length()) && (d = c)
			}
			this.boundingSphere.radius = d
		},
		mergeVertices: function () {
			var g, a, b, c, d = {},
				e = [],
				f = [],
				h = Math.pow(10, 4);
			for (a = 0, b = this.vertices.length; a < b; a++) {
				g = this.vertices[a], void 0 === d[g = [Math.round(g.x * h), Math.round(g.y * h), Math.round(g.z * h)].join("_")] ? (d[g] = a, e.push(this.vertices[a]), f[a] = e.length - 1) : f[a] = f[d[g]]
			}
			for (a = 0, b = this.faces.length; a < b; a++) {
				if ((h = this.faces[a]) instanceof THREE.Face3) {
					h.a = f[h.a], h.b = f[h.b], h.c = f[h.c]
				} else {
					if (h instanceof THREE.Face4) {
						for (h.a = f[h.a], h.b = f[h.b], h.c = f[h.c], h.d = f[h.d], g = [h.a, h.b, h.c, h.d], d = 3; 0 < d; d--) {
							if (g.indexOf(h["abcd" [d]]) != d) {
								for (g.splice(d, 1), this.faces[a] = new THREE.Face3(g[0], g[1], g[2]), h = 0, g = this.faceVertexUvs.length; h < g; h++) {
									(c = this.faceVertexUvs[h][a]) && c.splice(d, 1)
								}
								break
							}
						}
					}
				}
			}
			return f = this.vertices.length - e.length, this.vertices = e, f
		}
	}, THREE.GeometryCount = 0, THREE.Spline = function (f) {
		function g(r, s, n, t, i, o, q) {
			return (2 * (s - n) + (r = 0.5 * (n - r)) + (t = 0.5 * (t - s))) * q + (-3 * (s - n) - 2 * r - t) * o + r * i + s
		}
		this.points = f;
		var k, l, m, p, a, c, b, e, d, h = [],
			j = {
				x: 0,
				y: 0,
				z: 0
			};
		this.initFromArray = function (i) {
			this.points = [];
			for (var n = 0; n < i.length; n++) {
				this.points[n] = {
					x: i[n][0],
					y: i[n][1],
					z: i[n][2]
				}
			}
		}, this.getPoint = function (i) {
			return k = (this.points.length - 1) * i, l = Math.floor(k), m = k - l, h[0] = 0 === l ? l : l - 1, h[1] = l, h[2] = l > this.points.length - 2 ? this.points.length - 1 : l + 1, h[3] = l > this.points.length - 3 ? this.points.length - 1 : l + 2, c = this.points[h[0]], b = this.points[h[1]], e = this.points[h[2]], d = this.points[h[3]], a = m * (p = m * m), j.x = g(c.x, b.x, e.x, d.x, m, p, a), j.y = g(c.y, b.y, e.y, d.y, m, p, a), j.z = g(c.z, b.z, e.z, d.z, m, p, a), j
		}, this.getControlPointsArray = function () {
			var o, q, i = this.points.length,
				n = [];
			for (o = 0; o < i; o++) {
				q = this.points[o], n[o] = [q.x, q.y, q.z]
			}
			return n
		}, this.getLength = function (v) {
			var i, n, o, r = i = i = 0,
				q = new THREE.Vector3,
				s = new THREE.Vector3,
				t = [],
				u = 0;
			for (t[0] = 0, v || (v = 100), n = this.points.length * v, q.copy(this.points[0]), v = 1; v < n; v++) {
				i = v / n, o = this.getPoint(i), s.copy(o), u += s.distanceTo(q), q.copy(o), i = (this.points.length - 1) * i, (i = Math.floor(i)) != r && (t[i] = u, r = i)
			}
			return t[t.length] = u, {
				chunks: t,
				total: u
			}
		}, this.reparametrizeByArcLength = function (u) {
			var v, w, i, n, o, r, q = [],
				s = new THREE.Vector3,
				t = this.getLength();
			for (q.push(s.copy(this.points[0]).clone()), v = 1; v < this.points.length; v++) {
				for (w = t.chunks[v] - t.chunks[v - 1], r = Math.ceil(u * w / t.total), n = (v - 1) / (this.points.length - 1), o = v / (this.points.length - 1), w = 1; w < r - 1; w++) {
					i = n + w * (1 / r) * (o - n), i = this.getPoint(i), q.push(s.copy(i).clone())
				}
				q.push(s.copy(this.points[v]).clone())
			}
			this.points = q
		}
	}, THREE.Camera = function () {
		THREE.Object3D.call(this), this.matrixWorldInverse = new THREE.Matrix4, this.projectionMatrix = new THREE.Matrix4, this.projectionMatrixInverse = new THREE.Matrix4
	}, THREE.Camera.prototype = new THREE.Object3D, THREE.Camera.prototype.constructor = THREE.Camera, THREE.Camera.prototype.lookAt = function (a) {
		this.matrix.lookAt(this.position, a, this.up), this.rotationAutoUpdate && this.rotation.getRotationFromMatrix(this.matrix)
	}, THREE.OrthographicCamera = function (e, f, a, b, c, d) {
		THREE.Camera.call(this), this.left = e, this.right = f, this.top = a, this.bottom = b, this.near = void 0 !== c ? c : 0.1, this.far = void 0 !== d ? d : 2000, this.updateProjectionMatrix()
	}, THREE.OrthographicCamera.prototype = new THREE.Camera, THREE.OrthographicCamera.prototype.constructor = THREE.OrthographicCamera, THREE.OrthographicCamera.prototype.updateProjectionMatrix = function () {
		this.projectionMatrix.makeOrthographic(this.left, this.right, this.top, this.bottom, this.near, this.far)
	}, THREE.PerspectiveCamera = function (c, d, a, b) {
		THREE.Camera.call(this), this.fov = void 0 !== c ? c : 50, this.aspect = void 0 !== d ? d : 1, this.near = void 0 !== a ? a : 0.1, this.far = void 0 !== b ? b : 2000, this.updateProjectionMatrix()
	}, THREE.PerspectiveCamera.prototype = new THREE.Camera, THREE.PerspectiveCamera.prototype.constructor = THREE.PerspectiveCamera, THREE.PerspectiveCamera.prototype.setLens = function (a, b) {
		this.fov = 2 * Math.atan((void 0 !== b ? b : 24) / (2 * a)) * (180 / Math.PI), this.updateProjectionMatrix()
	}, THREE.PerspectiveCamera.prototype.setViewOffset = function (e, f, a, b, c, d) {
		this.fullWidth = e, this.fullHeight = f, this.x = a, this.y = b, this.width = c, this.height = d, this.updateProjectionMatrix()
	}, THREE.PerspectiveCamera.prototype.updateProjectionMatrix = function () {
		if (this.fullWidth) {
			var c = this.fullWidth / this.fullHeight,
				d = Math.tan(this.fov * Math.PI / 360) * this.near,
				b = c * (a = -d),
				a = (c = Math.abs(c * d - b), Math.abs(d - a));
			this.projectionMatrix.makeFrustum(b + this.x * c / this.fullWidth, b + (this.x + this.width) * c / this.fullWidth, d - (this.y + this.height) * a / this.fullHeight, d - this.y * a / this.fullHeight, this.near, this.far)
		} else {
			this.projectionMatrix.makePerspective(this.fov, this.aspect, this.near, this.far)
		}
	}, THREE.Light = function (a) {
		THREE.Object3D.call(this), this.color = new THREE.Color(a)
	}, THREE.Light.prototype = new THREE.Object3D, THREE.Light.prototype.constructor = THREE.Light, THREE.Light.prototype.supr = THREE.Object3D.prototype, THREE.AmbientLight = function (a) {
		THREE.Light.call(this, a)
	}, THREE.AmbientLight.prototype = new THREE.Light, THREE.AmbientLight.prototype.constructor = THREE.AmbientLight, THREE.DirectionalLight = function (b, c, a) {
		THREE.Light.call(this, b), this.position = new THREE.Vector3(0, 1, 0), this.target = new THREE.Object3D, this.intensity = void 0 !== c ? c : 1, this.distance = void 0 !== a ? a : 0, this.onlyShadow = this.castShadow = !1, this.shadowCameraNear = 50, this.shadowCameraFar = 5000, this.shadowCameraLeft = -500, this.shadowCameraTop = this.shadowCameraRight = 500, this.shadowCameraBottom = -500, this.shadowCameraVisible = !1, this.shadowBias = 0, this.shadowDarkness = 0.5, this.shadowMapHeight = this.shadowMapWidth = 512, this.shadowCascade = !1, this.shadowCascadeOffset = new THREE.Vector3(0, 0, -1000), this.shadowCascadeCount = 2, this.shadowCascadeBias = [0, 0, 0], this.shadowCascadeWidth = [512, 512, 512], this.shadowCascadeHeight = [512, 512, 512], this.shadowCascadeNearZ = [-1, 0.99, 0.998], this.shadowCascadeFarZ = [0.99, 0.998, 1], this.shadowCascadeArray = [], this.shadowMatrix = this.shadowCamera = this.shadowMapSize = this.shadowMap = null
	}, THREE.DirectionalLight.prototype = new THREE.Light, THREE.DirectionalLight.prototype.constructor = THREE.DirectionalLight, THREE.PointLight = function (b, c, a) {
		THREE.Light.call(this, b), this.position = new THREE.Vector3(0, 0, 0), this.intensity = void 0 !== c ? c : 1, this.distance = void 0 !== a ? a : 0
	}, THREE.PointLight.prototype = new THREE.Light, THREE.PointLight.prototype.constructor = THREE.PointLight, THREE.SpotLight = function (d, e, a, b, c) {
		THREE.Light.call(this, d), this.position = new THREE.Vector3(0, 1, 0), this.target = new THREE.Object3D, this.intensity = void 0 !== e ? e : 1, this.distance = void 0 !== a ? a : 0, this.angle = void 0 !== b ? b : Math.PI / 2, this.exponent = void 0 !== c ? c : 10, this.onlyShadow = this.castShadow = !1, this.shadowCameraNear = 50, this.shadowCameraFar = 5000, this.shadowCameraFov = 50, this.shadowCameraVisible = !1, this.shadowBias = 0, this.shadowDarkness = 0.5, this.shadowMapHeight = this.shadowMapWidth = 512, this.shadowMatrix = this.shadowCamera = this.shadowMapSize = this.shadowMap = null
	}, THREE.SpotLight.prototype = new THREE.Light, THREE.SpotLight.prototype.constructor = THREE.SpotLight, THREE.Loader = function (a) {
		this.statusDomElement = (this.showStatus = a) ? THREE.Loader.prototype.addStatusElement() : null, this.onLoadStart = function () {}, this.onLoadProgress = function () {}, this.onLoadComplete = function () {}
	}, THREE.Loader.prototype = {
		constructor: THREE.Loader,
		crossOrigin: "anonymous",
		addStatusElement: function () {
			var a = document.createElement("div");
			return a.style.position = "absolute", a.style.right = "0px", a.style.top = "0px", a.style.fontSize = "0.8em", a.style.textAlign = "left", a.style.background = "rgba(0,0,0,0.25)", a.style.color = "#fff", a.style.width = "120px", a.style.padding = "0.5em 0.5em 0.5em 0.5em", a.style.zIndex = 1000, a.innerHTML = "Loading ...", a
		},
		updateProgress: function (a) {
			var b = "Loaded ";
			b = a.total ? b + ((100 * a.loaded / a.total).toFixed(0) + "%") : b + ((a.loaded / 1000).toFixed(2) + " KB");
			this.statusDomElement.innerHTML = b
		},
		extractUrlBase: function (a) {
			return (a = a.split("/")).pop(), (a.length < 1 ? "." : a.join("/")) + "/"
		},
		initMaterials: function (c, d, a) {
			c.materials = [];
			for (var b = 0; b < d.length; ++b) {
				c.materials[b] = THREE.Loader.prototype.createMaterial(d[b], a)
			}
		},
		hasNormals: function (a) {
			var c, d = a.materials.length;
			for (c = 0; c < d; c++) {
				if (a.materials[c] instanceof THREE.ShaderMaterial) {
					return !0
				}
			}
			return !1
		},
		createMaterial: function (h, j) {
			function k(i) {
				return i = Math.log(i) / Math.LN2, Math.floor(i) == i
			}

			function l(i) {
				return i = Math.log(i) / Math.LN2, Math.pow(2, Math.round(i))
			}

			function a(m, n) {
				var i = new Image;
				i.onload = function () {
					if (k(this.width) && k(this.height)) {
						m.image = this
					} else {
						var o = l(this.width),
							p = l(this.height);
						m.image.width = o, m.image.height = p, m.image.getContext("2d").drawImage(this, 0, 0, o, p)
					}
					m.needsUpdate = !0
				}, i.crossOrigin = d.crossOrigin, i.src = n
			}

			function b(m, r, i, o, n, p) {
				var q = document.createElement("canvas");
				m[r] = new THREE.Texture(q), m[r].sourceFile = i, o && (m[r].repeat.set(o[0], o[1]), 1 != o[0] && (m[r].wrapS = THREE.RepeatWrapping), 1 != o[1] && (m[r].wrapT = THREE.RepeatWrapping)), n && m[r].offset.set(n[0], n[1]), p && (void 0 !== (o = {
					repeat: THREE.RepeatWrapping,
					mirror: THREE.MirroredRepeatWrapping
				})[p[0]] && (m[r].wrapS = o[p[0]]), void 0 !== o[p[1]] && (m[r].wrapT = o[p[1]])), a(m[r], j + "/" + i)
			}

			function c(i) {
				return (255 * i[0] << 16) + (255 * i[1] << 8) + 255 * i[2]
			}
			var d = this,
				e = "MeshLambertMaterial",
				g = {
					color: 15658734,
					opacity: 1,
					map: null,
					lightMap: null,
					normalMap: null,
					wireframe: h.wireframe
				};
			if (h.shading) {
				var f = h.shading.toLowerCase();
				"phong" === f ? e = "MeshPhongMaterial" : "basic" === f && (e = "MeshBasicMaterial")
			}
			return void 0 !== h.blending && void 0 !== THREE[h.blending] && (g.blending = THREE[h.blending]), (void 0 !== h.transparent || h.opacity < 1) && (g.transparent = h.transparent), void 0 !== h.depthTest && (g.depthTest = h.depthTest), void 0 !== h.depthWrite && (g.depthWrite = h.depthWrite), void 0 !== h.vertexColors && ("face" == h.vertexColors ? g.vertexColors = THREE.FaceColors : h.vertexColors && (g.vertexColors = THREE.VertexColors)), h.colorDiffuse ? g.color = c(h.colorDiffuse) : h.DbgColor && (g.color = h.DbgColor), h.colorSpecular && (g.specular = c(h.colorSpecular)), h.colorAmbient && (g.ambient = c(h.colorAmbient)), h.transparency && (g.opacity = h.transparency), h.specularCoef && (g.shininess = h.specularCoef), h.mapDiffuse && j && b(g, "map", h.mapDiffuse, h.mapDiffuseRepeat, h.mapDiffuseOffset, h.mapDiffuseWrap), h.mapLight && j && b(g, "lightMap", h.mapLight, h.mapLightRepeat, h.mapLightOffset, h.mapLightWrap), h.mapNormal && j && b(g, "normalMap", h.mapNormal, h.mapNormalRepeat, h.mapNormalOffset, h.mapNormalWrap), h.mapSpecular && j && b(g, "specularMap", h.mapSpecular, h.mapSpecularRepeat, h.mapSpecularOffset, h.mapSpecularWrap), h.mapNormal ? (e = THREE.ShaderUtils.lib.normal, (f = THREE.UniformsUtils.clone(e.uniforms)).tNormal.texture = g.normalMap, h.mapNormalFactor && (f.uNormalScale.value = h.mapNormalFactor), g.map && (f.tDiffuse.texture = g.map, f.enableDiffuse.value = !0), g.specularMap && (f.tSpecular.texture = g.specularMap, f.enableSpecular.value = !0), g.lightMap && (f.tAO.texture = g.lightMap, f.enableAO.value = !0), f.uDiffuseColor.value.setHex(g.color), f.uSpecularColor.value.setHex(g.specular), f.uAmbientColor.value.setHex(g.ambient), f.uShininess.value = g.shininess, void 0 !== g.opacity && (f.uOpacity.value = g.opacity), g = new THREE.ShaderMaterial({
				fragmentShader: e.fragmentShader,
				vertexShader: e.vertexShader,
				uniforms: f,
				lights: !0,
				fog: !0
			})) : g = new THREE[e](g), void 0 !== h.DbgName && (g.name = h.DbgName), g
		}
	}, THREE.BinaryLoader = function (a) {
		THREE.Loader.call(this, a)
	}, THREE.BinaryLoader.prototype = new THREE.Loader, THREE.BinaryLoader.prototype.constructor = THREE.BinaryLoader, THREE.BinaryLoader.prototype.load = function (d, e, a, b) {
		a = a || this.extractUrlBase(d), b = b || this.extractUrlBase(d);
		var c = this.showProgress ? THREE.Loader.prototype.updateProgress : null;
		this.onLoadStart(), this.loadAjaxJSON(this, d, e, a, b, c)
	}, THREE.BinaryLoader.prototype.loadAjaxJSON = function (e, f, g, a, b, c) {
		var d = new XMLHttpRequest;
		d.onreadystatechange = function () {
			if (4 == d.readyState) {
				if (200 == d.status || 0 == d.status) {
					var h = JSON.parse(d.responseText);
					e.loadAjaxBuffers(h, g, b, a, c)
				} else {
					console.error("THREE.BinaryLoader: Couldn't load [" + f + "] [" + d.status + "]")
				}
			}
		}, d.open("GET", f, !0), d.overrideMimeType && d.overrideMimeType("text/plain; charset=x-user-defined"), d.setRequestHeader("Content-Type", "text/plain"), d.send(null)
	}, THREE.BinaryLoader.prototype.loadAjaxBuffers = function (d, e, f, g, h) {
		var a = new XMLHttpRequest,
			b = f + "/" + d.buffers,
			c = 0;
		a.onreadystatechange = function () {
			4 == a.readyState ? 200 == a.status || 0 == a.status ? THREE.BinaryLoader.prototype.createBinModel(a.response, e, g, d.materials) : console.error("THREE.BinaryLoader: Couldn't load [" + b + "] [" + a.status + "]") : 3 == a.readyState ? h && (0 == c && (c = a.getResponseHeader("Content-Length")), h({
				total: c,
				loaded: a.responseText.length
			})) : 2 == a.readyState && (c = a.getResponseHeader("Content-Length"))
		}, a.open("GET", b, !0), a.responseType = "arraybuffer", a.send(null)
	}, THREE.BinaryLoader.prototype.createBinModel = function (d, e, a, b) {
		var c = function (u) {
			var v, w, z, D, A, K, E, H, P, G, T, i, g, n, U;

			function l(x) {
				return x % 4 ? 4 - x % 4 : 0
			}

			function m(x, B) {
				return new Uint8Array(x, B, 1)[0]
			}

			function h(x, B) {
				return new Uint32Array(x, B, 1)[0]
			}

			function q(L, N) {
				var O, Q, S, V, W, x, B, C, F = new Uint32Array(d, N, 3 * L);
				for (O = 0; O < L; O++) {
					Q = F[3 * O], S = F[3 * O + 1], V = F[3 * O + 2], W = k[2 * Q], Q = k[2 * Q + 1], x = k[2 * S], B = k[2 * S + 1], S = k[2 * V], C = k[2 * V + 1], V = t.faceVertexUvs[0];
					var I = [];
					I.push(new THREE.UV(W, Q)), I.push(new THREE.UV(x, B)), I.push(new THREE.UV(S, C)), V.push(I)
				}
			}

			function j(V, Y) {
				var B, I, L, N, O, Q, S, W, X, x, C = new Uint32Array(d, Y, 4 * V);
				for (B = 0; B < V; B++) {
					I = C[4 * B], L = C[4 * B + 1], N = C[4 * B + 2], O = C[4 * B + 3], Q = k[2 * I], I = k[2 * I + 1], S = k[2 * L], X = k[2 * L + 1], W = k[2 * N], x = k[2 * N + 1], N = k[2 * O], L = k[2 * O + 1], O = t.faceVertexUvs[0];
					var F = [];
					F.push(new THREE.UV(Q, I)), F.push(new THREE.UV(S, X)), F.push(new THREE.UV(W, x)), F.push(new THREE.UV(N, L)), O.push(F)
				}
			}

			function M(C, F, I) {
				F = new Uint32Array(d, F, 3 * C);
				var L, N, O, x, B = new Uint16Array(d, I, C);
				for (I = 0; I < C; I++) {
					L = F[3 * I], N = F[3 * I + 1], O = F[3 * I + 2], x = B[I], t.faces.push(new THREE.Face3(L, N, O, null, null, x))
				}
			}

			function o(Q, x, B) {
				x = new Uint32Array(d, x, 4 * Q);
				var C, F, I, L, N, O = new Uint16Array(d, B, Q);
				for (B = 0; B < Q; B++) {
					C = x[4 * B], F = x[4 * B + 1], I = x[4 * B + 2], L = x[4 * B + 3], N = O[B], t.faces.push(new THREE.Face4(C, F, I, L, null, null, N))
				}
			}

			function r(F, N, O, V) {
				N = new Uint32Array(d, N, 3 * F), O = new Uint32Array(d, O, 3 * F);
				var X, aa, B, C, I, L, Q, S = new Uint16Array(d, V, F);
				for (V = 0; V < F; V++) {
					X = N[3 * V], aa = N[3 * V + 1], B = N[3 * V + 2], I = O[3 * V], L = O[3 * V + 1], Q = O[3 * V + 2], C = S[V];
					var W = s[3 * L],
						Y = s[3 * L + 1];
					L = s[3 * L + 2];
					var Z = s[3 * Q],
						x = s[3 * Q + 1];
					Q = s[3 * Q + 2], t.faces.push(new THREE.Face3(X, aa, B, [new THREE.Vector3(s[3 * I], s[3 * I + 1], s[3 * I + 2]), new THREE.Vector3(W, Y, L), new THREE.Vector3(Z, x, Q)], null, C))
				}
			}

			function p(Z, ab, ac, ae) {
				ab = new Uint32Array(d, ab, 4 * Z), ac = new Uint32Array(d, ac, 4 * Z);
				var x, B, C, F, I, L, Q, V, X, Y = new Uint16Array(d, ae, Z);
				for (ae = 0; ae < Z; ae++) {
					x = ab[4 * ae], B = ab[4 * ae + 1], C = ab[4 * ae + 2], F = ab[4 * ae + 3], L = ac[4 * ae], Q = ac[4 * ae + 1], V = ac[4 * ae + 2], X = ac[4 * ae + 3], I = Y[ae];
					var aa = s[3 * Q],
						ad = s[3 * Q + 1];
					Q = s[3 * Q + 2];
					var N = s[3 * V],
						O = s[3 * V + 1];
					V = s[3 * V + 2];
					var S = s[3 * X],
						W = s[3 * X + 1];
					X = s[3 * X + 2], t.faces.push(new THREE.Face4(x, B, C, F, [new THREE.Vector3(s[3 * L], s[3 * L + 1], s[3 * L + 2]), new THREE.Vector3(aa, ad, Q), new THREE.Vector3(N, O, V), new THREE.Vector3(S, W, X)], null, I))
				}
			}
			var y, J, R, t = this,
				f = 0,
				s = [],
				k = [];
			THREE.Geometry.call(this), THREE.Loader.prototype.initMaterials(t, b, u),
				function (B, C, F) {
					B = new Uint8Array(B, C, 12);
					for (var I = "", x = 0; x < 12; x++) {
						I += String.fromCharCode(B[C + x])
					}
				}(d, f), v = m(d, f + 12), m(d, f + 13), m(d, f + 14), m(d, f + 15), w = m(d, f + 16), z = m(d, f + 17), D = m(d, f + 18), A = m(d, f + 19), K = h(d, f + 20), E = h(d, f + 20 + 4), H = h(d, f + 20 + 8), u = h(d, f + 20 + 12), P = h(d, f + 20 + 16), G = h(d, f + 20 + 20), T = h(d, f + 20 + 24), i = h(d, f + 20 + 28), g = h(d, f + 20 + 32), n = h(d, f + 20 + 36), U = h(d, f + 20 + 40), f += v, R = 4 * w + A, y = u * (v = 3 * w + A), J = P * (v + 3 * z), w = G * (v + 3 * D), A = T * (v + 3 * z + 3 * D), v = i * R, z = g * (R + 4 * z), D = n * (R + 4 * D), f += function (C) {
					var F, I, x, B;
					C = new Float32Array(d, C, 3 * K);
					for (F = 0; F < K; F++) {
						I = C[3 * F], x = C[3 * F + 1], B = C[3 * F + 2], t.vertices.push(new THREE.Vector3(I, x, B))
					}
					return 3 * K * Float32Array.BYTES_PER_ELEMENT
				}(f), f += function (C) {
					if (E) {
						var F, I, x, B;
						C = new Int8Array(d, C, 3 * E);
						for (F = 0; F < E; F++) {
							I = C[3 * F], x = C[3 * F + 1], B = C[3 * F + 2], s.push(I / 127, x / 127, B / 127)
						}
					}
					return 3 * E * Int8Array.BYTES_PER_ELEMENT
				}(f), f += l(3 * E), D = (z = (v = (A = (w = (J = (y = (f += function (C) {
					if (H) {
						var F, x, B;
						C = new Float32Array(d, C, 2 * H);
						for (F = 0; F < H; F++) {
							x = C[2 * F], B = C[2 * F + 1], k.push(x, B)
						}
					}
					return 2 * H * Float32Array.BYTES_PER_ELEMENT
				}(f)) + y + l(2 * u)) + J + l(2 * P)) + w + l(2 * G)) + A + l(2 * T)) + v + l(2 * i)) + z + l(2 * g)) + D + l(2 * n),
				function (x) {
					if (G) {
						var B = x + G * Uint32Array.BYTES_PER_ELEMENT * 3;
						M(G, x, B + G * Uint32Array.BYTES_PER_ELEMENT * 3), q(G, B)
					}
				}(J),
				function (B) {
					if (T) {
						var C = B + T * Uint32Array.BYTES_PER_ELEMENT * 3,
							x = C + T * Uint32Array.BYTES_PER_ELEMENT * 3;
						r(T, B, C, x + T * Uint32Array.BYTES_PER_ELEMENT * 3), q(T, x)
					}
				}(w),
				function (x) {
					if (n) {
						var B = x + n * Uint32Array.BYTES_PER_ELEMENT * 4;
						o(n, x, B + n * Uint32Array.BYTES_PER_ELEMENT * 4), j(n, B)
					}
				}(z),
				function (B) {
					if (U) {
						var C = B + U * Uint32Array.BYTES_PER_ELEMENT * 4,
							x = C + U * Uint32Array.BYTES_PER_ELEMENT * 4;
						p(U, B, C, x + U * Uint32Array.BYTES_PER_ELEMENT * 4), j(U, x)
					}
				}(D), u && M(u, f, f + u * Uint32Array.BYTES_PER_ELEMENT * 3),
				function (x) {
					if (P) {
						var B = x + P * Uint32Array.BYTES_PER_ELEMENT * 3;
						r(P, x, B, B + P * Uint32Array.BYTES_PER_ELEMENT * 3)
					}
				}(y), i && o(i, A, A + i * Uint32Array.BYTES_PER_ELEMENT * 4),
				function (x) {
					if (g) {
						var B = x + g * Uint32Array.BYTES_PER_ELEMENT * 4;
						p(g, x, B, B + g * Uint32Array.BYTES_PER_ELEMENT * 4)
					}
				}(v), this.computeCentroids(), this.computeFaceNormals(), THREE.Loader.prototype.hasNormals(this) && this.computeTangents()
		};
		e(new((c.prototype = new THREE.Geometry).constructor = c)(a))
	}, THREE.JSONLoader = function (a) {
		THREE.Loader.call(this, a)
	}, THREE.JSONLoader.prototype = new THREE.Loader, THREE.JSONLoader.prototype.constructor = THREE.JSONLoader, THREE.JSONLoader.prototype.load = function (b, c, a) {
		a = a || this.extractUrlBase(b), this.onLoadStart(), this.loadAjaxJSON(this, b, c, a)
	}, THREE.JSONLoader.prototype.loadAjaxJSON = function (e, f, g, a, b) {
		var c = new XMLHttpRequest,
			d = 0;
		c.onreadystatechange = function () {
			if (c.readyState === c.DONE) {
				if (200 === c.status || 0 === c.status) {
					if (c.responseText) {
						var h = JSON.parse(c.responseText);
						e.createModel(h, g, a)
					} else {
						console.warn("THREE.JSONLoader: [" + f + "] seems to be unreachable or file there is empty")
					}
					e.onLoadComplete()
				} else {
					console.error("THREE.JSONLoader: Couldn't load [" + f + "] [" + c.status + "]")
				}
			} else {
				c.readyState === c.LOADING ? b && (0 === d && (d = c.getResponseHeader("Content-Length")), b({
					total: d,
					loaded: c.responseText.length
				})) : c.readyState === c.HEADERS_RECEIVED && (d = c.getResponseHeader("Content-Length"))
			}
		}, c.open("GET", f, !0), c.overrideMimeType && c.overrideMimeType("text/plain; charset=x-user-defined"), c.setRequestHeader("Content-Type", "text/plain"), c.send(null)
	}, THREE.JSONLoader.prototype.createModel = function (d, e, a) {
		var b = new THREE.Geometry,
			c = void 0 !== d.scale ? 1 / d.scale : 1;
		this.initMaterials(b, d.materials, a),
			function (f) {
				var g, h, i, l, j, r, m, p, s, n, t, o, w, E, u = d.faces;
				r = d.vertices;
				var q = d.normals,
					y = d.colors,
					k = 0;
				for (g = 0; g < d.uvs.length; g++) {
					d.uvs[g].length && k++
				}
				for (g = 0; g < k; g++) {
					b.faceUvs[g] = [], b.faceVertexUvs[g] = []
				}
				for (l = 0, j = r.length; l < j;) {
					(m = new THREE.Vector3).x = r[l++] * f, m.y = r[l++] * f, m.z = r[l++] * f, b.vertices.push(m)
				}
				for (l = 0, j = u.length; l < j;) {
					if (r = 1 & (f = u[l++]), i = 2 & f, g = 4 & f, h = 8 & f, p = 16 & f, m = 32 & f, n = 64 & f, f &= 128, r ? ((t = new THREE.Face4).a = u[l++], t.b = u[l++], t.c = u[l++], t.d = u[l++], r = 4) : ((t = new THREE.Face3).a = u[l++], t.b = u[l++], t.c = u[l++], r = 3), i && (i = u[l++], t.materialIndex = i), i = b.faces.length, g) {
						for (g = 0; g < k; g++) {
							E = (o = d.uvs[g])[2 * (s = u[l++])], s = o[2 * s + 1], b.faceUvs[g][i] = new THREE.UV(E, s)
						}
					}
					if (h) {
						for (g = 0; g < k; g++) {
							for (o = d.uvs[g], w = [], h = 0; h < r; h++) {
								E = o[2 * (s = u[l++])], s = o[2 * s + 1], w[h] = new THREE.UV(E, s)
							}
							b.faceVertexUvs[g][i] = w
						}
					}
					if (p && (p = 3 * u[l++], (h = new THREE.Vector3).x = q[p++], h.y = q[p++], h.z = q[p], t.normal = h), m) {
						for (g = 0; g < r; g++) {
							p = 3 * u[l++], (h = new THREE.Vector3).x = q[p++], h.y = q[p++], h.z = q[p], t.vertexNormals.push(h)
						}
					}
					if (n && (m = u[l++], m = new THREE.Color(y[m]), t.color = m), f) {
						for (g = 0; g < r; g++) {
							m = u[l++], m = new THREE.Color(y[m]), t.vertexColors.push(m)
						}
					}
					b.faces.push(t)
				}
			}(c),
			function () {
				var g, f, h, i;
				if (d.skinWeights) {
					for (g = 0, f = d.skinWeights.length; g < f; g += 2) {
						h = d.skinWeights[g], i = d.skinWeights[g + 1], b.skinWeights.push(new THREE.Vector4(h, i, 0, 0))
					}
				}
				if (d.skinIndices) {
					for (g = 0, f = d.skinIndices.length; g < f; g += 2) {
						h = d.skinIndices[g], i = d.skinIndices[g + 1], b.skinIndices.push(new THREE.Vector4(h, i, 0, 0))
					}
				}
				b.bones = d.bones, b.animation = d.animation
			}(),
			function (l) {
				var g, h, j, m, k, i;
				if (void 0 !== d.morphTargets) {
					for (g = 0, h = d.morphTargets.length; g < h; g++) {
						for (b.morphTargets[g] = {}, b.morphTargets[g].name = d.morphTargets[g].name, b.morphTargets[g].vertices = [], k = b.morphTargets[g].vertices, j = 0, m = (i = d.morphTargets[g].vertices).length; j < m; j += 3) {
							var f = new THREE.Vector3;
							f.x = i[j] * l, f.y = i[j + 1] * l, f.z = i[j + 2] * l, k.push(f)
						}
					}
				}
				if (void 0 !== d.morphColors) {
					for (g = 0, h = d.morphColors.length; g < h; g++) {
						for (b.morphColors[g] = {}, b.morphColors[g].name = d.morphColors[g].name, b.morphColors[g].colors = [], m = b.morphColors[g].colors, l = 0, j = (k = d.morphColors[g].colors).length; l < j; l += 3) {
							(i = new THREE.Color(16755200)).setRGB(k[l], k[l + 1], k[l + 2]), m.push(i)
						}
					}
				}
			}(c), b.computeCentroids(), b.computeFaceNormals(), this.hasNormals(b) && b.computeTangents(), e(b)
	}, THREE.SceneLoader = function () {
		this.onLoadStart = function () {}, this.onLoadProgress = function () {}, this.onLoadComplete = function () {}, this.callbackSync = function () {}, this.callbackProgress = function () {}
	}, THREE.SceneLoader.prototype.constructor = THREE.SceneLoader, THREE.SceneLoader.prototype.load = function (c, d) {
		var a = this,
			b = new XMLHttpRequest;
		b.onreadystatechange = function () {
			if (4 == b.readyState) {
				if (200 == b.status || 0 == b.status) {
					var e = JSON.parse(b.responseText);
					a.createScene(e, d, c)
				} else {
					console.error("THREE.SceneLoader: Couldn't load [" + c + "] [" + b.status + "]")
				}
			}
		}, b.open("GET", c, !0), b.overrideMimeType && b.overrideMimeType("text/plain; charset=x-user-defined"), b.setRequestHeader("Content-Type", "text/plain"), b.send(null)
	}, THREE.SceneLoader.prototype.createScene = function (d, e, g) {
		function i(x, B) {
			return "relativeToHTML" == B ? x : u + "/" + x
		}

		function j() {
			var x;
			for (w in f.objects) {
				c.objects[w] || (void 0 !== (K = f.objects[w]).geometry ? (q = c.geometries[K.geometry]) && (x = !1, (x = (s = c.materials[K.materials[0]]) instanceof THREE.ShaderMaterial) && q.computeTangents(), R = K.position, n = K.rotation, h = K.quaternion, a = K.scale, J = K.matrix, (h = 0) == K.materials.length && (s = new THREE.MeshFaceMaterial), 1 < K.materials.length && (s = new THREE.MeshFaceMaterial), (x = new THREE.Mesh(q, s)).name = w, J ? (x.matrixAutoUpdate = !1, x.matrix.set(J[0], J[1], J[2], J[3], J[4], J[5], J[6], J[7], J[8], J[9], J[10], J[11], J[12], J[13], J[14], J[15])) : (x.position.set(R[0], R[1], R[2]), h ? (x.quaternion.set(h[0], h[1], h[2], h[3]), x.useQuaternion = !0) : x.rotation.set(n[0], n[1], n[2]), x.scale.set(a[0], a[1], a[2])), x.visible = K.visible, x.doubleSided = K.doubleSided, x.castShadow = K.castShadow, x.receiveShadow = K.receiveShadow, c.scene.add(x), c.objects[w] = x) : (R = K.position, n = K.rotation, h = K.quaternion, a = K.scale, h = 0, (x = new THREE.Object3D).name = w, x.position.set(R[0], R[1], R[2]), h ? (x.quaternion.set(h[0], h[1], h[2], h[3]), x.useQuaternion = !0) : x.rotation.set(n[0], n[1], n[2]), x.scale.set(a[0], a[1], a[2]), x.visible = void 0 !== K.visible && K.visible, c.scene.add(x), c.objects[w] = x, c.empties[w] = x))
			}
		}

		function k(x) {
			return function (B) {
				c.geometries[x] = B, j(), l -= 1, r.onLoadComplete(), o()
			}
		}

		function m(x) {
			return function (B) {
				c.geometries[x] = B
			}
		}

		function o() {
			r.callbackProgress({
				totalModels: P,
				totalTextures: U,
				loadedModels: P - l,
				loadedTextures: U - p
			}, c), r.onLoadProgress(), 0 == l && 0 == p && e(c)
		}
		var t, C, w, z, D, y, E, K, J, T, H, R, n, h, a, M, b, q, s, G, A, f, v, l, p, P, U, c, r = this,
			u = THREE.Loader.prototype.extractUrlBase(g);
		for (D in f = d, g = new THREE.BinaryLoader, v = new THREE.JSONLoader, p = l = 0, c = {
				scene: new THREE.Scene,
				geometries: {},
				materials: {},
				textures: {},
				objects: {},
				cameras: {},
				lights: {},
				fogs: {},
				empties: {}
			}, f.transform && (d = f.transform.position, T = f.transform.rotation, M = f.transform.scale, d && c.scene.position.set(d[0], d[1], d[2]), T && c.scene.rotation.set(T[0], T[1], T[2]), M && c.scene.scale.set(M[0], M[1], M[2]), (d || T || M) && (c.scene.updateMatrix(), c.scene.updateMatrixWorld())), d = function () {
				p -= 1, o(), r.onLoadComplete()
			}, f.cameras) {
			"perspective" == (M = f.cameras[D]).type ? G = new THREE.PerspectiveCamera(M.fov, M.aspect, M.near, M.far) : "ortho" == M.type && (G = new THREE.OrthographicCamera(M.left, M.right, M.top, M.bottom, M.near, M.far)), R = M.position, T = M.target, M = M.up, G.position.set(R[0], R[1], R[2]), G.target = new THREE.Vector3(T[0], T[1], T[2]), M && G.up.set(M[0], M[1], M[2]), c.cameras[D] = G
		}
		for (z in f.lights) {
			D = void 0 !== (T = f.lights[z]).color ? T.color : 16777215, G = void 0 !== T.intensity ? T.intensity : 1, "directional" == T.type ? (R = T.direction, (H = new THREE.DirectionalLight(D, G)).position.set(R[0], R[1], R[2]), H.position.normalize()) : "point" == T.type ? (R = T.position, H = T.distance, (H = new THREE.PointLight(D, G, H)).position.set(R[0], R[1], R[2])) : "ambient" == T.type && (H = new THREE.AmbientLight(D)), c.scene.add(H), c.lights[z] = H
		}
		for (y in f.fogs) {
			"linear" == (z = f.fogs[y]).type ? A = new THREE.Fog(0, z.near, z.far) : "exp2" == z.type && (A = new THREE.FogExp2(0, z.density)), M = z.color, A.color.setRGB(M[0], M[1], M[2]), c.fogs[y] = A
		}
		for (t in c.cameras && f.defaults.camera && (c.currentCamera = c.cameras[f.defaults.camera]), c.fogs && f.defaults.fog && (c.scene.fog = c.fogs[f.defaults.fog]), M = f.defaults.bgcolor, c.bgColor = new THREE.Color, c.bgColor.setRGB(M[0], M[1], M[2]), c.bgColorAlpha = f.defaults.bgalpha, f.geometries) {
			"bin_mesh" != (y = f.geometries[t]).type && "ascii_mesh" != y.type || (l += 1, r.onLoadStart())
		}
		for (t in P = l, f.geometries) {
			"cube" == (y = f.geometries[t]).type ? (q = new THREE.CubeGeometry(y.width, y.height, y.depth, y.segmentsWidth, y.segmentsHeight, y.segmentsDepth, null, y.flipped, y.sides), c.geometries[t] = q) : "plane" == y.type ? (q = new THREE.PlaneGeometry(y.width, y.height, y.segmentsWidth, y.segmentsHeight), c.geometries[t] = q) : "sphere" == y.type ? (q = new THREE.SphereGeometry(y.radius, y.segmentsWidth, y.segmentsHeight), c.geometries[t] = q) : "cylinder" == y.type ? (q = new THREE.CylinderGeometry(y.topRad, y.botRad, y.height, y.radSegs, y.heightSegs), c.geometries[t] = q) : "torus" == y.type ? (q = new THREE.TorusGeometry(y.radius, y.tube, y.segmentsR, y.segmentsT), c.geometries[t] = q) : "icosahedron" == y.type ? (q = new THREE.IcosahedronGeometry(y.radius, y.subdivisions), c.geometries[t] = q) : "bin_mesh" == y.type ? g.load(i(y.url, f.urlBaseType), k(t)) : "ascii_mesh" == y.type ? v.load(i(y.url, f.urlBaseType), k(t)) : "embedded_mesh" == y.type && ((y = f.embeds[y.id]).metadata = f.metadata, y && v.createModel(y, m(t), ""))
		}
		for (E in f.textures) {
			if ((t = f.textures[E]).url instanceof Array) {
				for (p += t.url.length, y = 0; y < t.url.length; y++) {
					r.onLoadStart()
				}
			} else {
				p += 1, r.onLoadStart()
			}
		}
		for (E in U = p, f.textures) {
			if (null != (t = f.textures[E]).mapping && null != THREE[t.mapping] && (t.mapping = new THREE[t.mapping]), t.url instanceof Array) {
				for (y = [], A = 0; A < t.url.length; A++) {
					y[A] = i(t.url[A], f.urlBaseType)
				}
				y = THREE.ImageUtils.loadTextureCube(y, t.mapping, d)
			} else {
				y = THREE.ImageUtils.loadTexture(i(t.url, f.urlBaseType), t.mapping, d), null != THREE[t.minFilter] && (y.minFilter = THREE[t.minFilter]), null != THREE[t.magFilter] && (y.magFilter = THREE[t.magFilter]), t.repeat && (y.repeat.set(t.repeat[0], t.repeat[1]), 1 != t.repeat[0] && (y.wrapS = THREE.RepeatWrapping), 1 != t.repeat[1] && (y.wrapT = THREE.RepeatWrapping)), t.offset && y.offset.set(t.offset[0], t.offset[1]), t.wrap && (void 0 !== (A = {
					repeat: THREE.RepeatWrapping,
					mirror: THREE.MirroredRepeatWrapping
				})[t.wrap[0]] && (y.wrapS = A[t.wrap[0]]), void 0 !== A[t.wrap[1]] && (y.wrapT = A[t.wrap[1]]))
			}
			c.textures[E] = y
		}
		for (C in f.materials) {
			for (b in (J = f.materials[C]).parameters) {
				"envMap" == b || "map" == b || "lightMap" == b ? J.parameters[b] = c.textures[J.parameters[b]] : "shading" == b ? J.parameters[b] = "flat" == J.parameters[b] ? THREE.FlatShading : THREE.SmoothShading : "blending" == b ? J.parameters[b] = THREE[J.parameters[b]] ? THREE[J.parameters[b]] : THREE.NormalBlending : "combine" == b ? J.parameters[b] = "MixOperation" == J.parameters[b] ? THREE.MixOperation : THREE.MultiplyOperation : "vertexColors" == b && ("face" == J.parameters[b] ? J.parameters[b] = THREE.FaceColors : J.parameters[b] && (J.parameters[b] = THREE.VertexColors))
			}
			void 0 !== J.parameters.opacity && J.parameters.opacity < 1 && (J.parameters.transparent = !0), J.parameters.normalMap ? (E = THREE.ShaderUtils.lib.normal, d = THREE.UniformsUtils.clone(E.uniforms), t = J.parameters.color, y = J.parameters.specular, A = J.parameters.ambient, g = J.parameters.shininess, d.tNormal.texture = c.textures[J.parameters.normalMap], J.parameters.normalMapFactor && (d.uNormalScale.value = J.parameters.normalMapFactor), J.parameters.map && (d.tDiffuse.texture = J.parameters.map, d.enableDiffuse.value = !0), J.parameters.lightMap && (d.tAO.texture = J.parameters.lightMap, d.enableAO.value = !0), J.parameters.specularMap && (d.tSpecular.texture = c.textures[J.parameters.specularMap], d.enableSpecular.value = !0), d.uDiffuseColor.value.setHex(t), d.uSpecularColor.value.setHex(y), d.uAmbientColor.value.setHex(A), d.uShininess.value = g, J.parameters.opacity && (d.uOpacity.value = J.parameters.opacity), s = new THREE.ShaderMaterial({
				fragmentShader: E.fragmentShader,
				vertexShader: E.vertexShader,
				uniforms: d,
				lights: !0,
				fog: !0
			})) : s = new THREE[J.type](J.parameters), c.materials[C] = s
		}
		j(), r.callbackSync(c), o()
	}, THREE.Material = function (a) {
		a = a || {}, this.id = THREE.MaterialCount++, this.name = "", this.opacity = void 0 !== a.opacity ? a.opacity : 1, this.transparent = void 0 !== a.transparent && a.transparent, this.blending = void 0 !== a.blending ? a.blending : THREE.NormalBlending, this.blendSrc = void 0 !== a.blendSrc ? a.blendSrc : THREE.SrcAlphaFactor, this.blendDst = void 0 !== a.blendDst ? a.blendDst : THREE.OneMinusSrcAlphaFactor, this.blendEquation = void 0 !== a.blendEquation ? a.blendEquation : THREE.AddEquation, this.depthTest = void 0 === a.depthTest || a.depthTest, this.depthWrite = void 0 === a.depthWrite || a.depthWrite, this.polygonOffset = void 0 !== a.polygonOffset && a.polygonOffset, this.polygonOffsetFactor = void 0 !== a.polygonOffsetFactor ? a.polygonOffsetFactor : 0, this.polygonOffsetUnits = void 0 !== a.polygonOffsetUnits ? a.polygonOffsetUnits : 0, this.alphaTest = void 0 !== a.alphaTest ? a.alphaTest : 0, this.overdraw = void 0 !== a.overdraw && a.overdraw, this.needsUpdate = this.visible = !0
	}, THREE.MaterialCount = 0, THREE.NoShading = 0, THREE.FlatShading = 1, THREE.SmoothShading = 2, THREE.NoColors = 0, THREE.FaceColors = 1, THREE.VertexColors = 2, THREE.NoBlending = 0, THREE.NormalBlending = 1, THREE.AdditiveBlending = 2, THREE.SubtractiveBlending = 3, THREE.MultiplyBlending = 4, THREE.AdditiveAlphaBlending = 5, THREE.CustomBlending = 6, THREE.AddEquation = 100, THREE.SubtractEquation = 101, THREE.ReverseSubtractEquation = 102, THREE.ZeroFactor = 200, THREE.OneFactor = 201, THREE.SrcColorFactor = 202, THREE.OneMinusSrcColorFactor = 203, THREE.SrcAlphaFactor = 204, THREE.OneMinusSrcAlphaFactor = 205, THREE.DstAlphaFactor = 206, THREE.OneMinusDstAlphaFactor = 207, THREE.DstColorFactor = 208, THREE.OneMinusDstColorFactor = 209, THREE.SrcAlphaSaturateFactor = 210, THREE.LineBasicMaterial = function (a) {
		THREE.Material.call(this, a), a = a || {}, this.color = void 0 !== a.color ? new THREE.Color(a.color) : new THREE.Color(16777215), this.linewidth = void 0 !== a.linewidth ? a.linewidth : 1, this.linecap = void 0 !== a.linecap ? a.linecap : "round", this.linejoin = void 0 !== a.linejoin ? a.linejoin : "round", this.vertexColors = !!a.vertexColors && a.vertexColors, this.fog = void 0 === a.fog || a.fog
	}, THREE.LineBasicMaterial.prototype = new THREE.Material, THREE.LineBasicMaterial.prototype.constructor = THREE.LineBasicMaterial, THREE.MeshBasicMaterial = function (a) {
		THREE.Material.call(this, a), a = a || {}, this.color = void 0 !== a.color ? new THREE.Color(a.color) : new THREE.Color(16777215), this.map = void 0 !== a.map ? a.map : null, this.lightMap = void 0 !== a.lightMap ? a.lightMap : null, this.envMap = void 0 !== a.envMap ? a.envMap : null, this.combine = void 0 !== a.combine ? a.combine : THREE.MultiplyOperation, this.reflectivity = void 0 !== a.reflectivity ? a.reflectivity : 1, this.refractionRatio = void 0 !== a.refractionRatio ? a.refractionRatio : 0.98, this.fog = void 0 === a.fog || a.fog, this.shading = void 0 !== a.shading ? a.shading : THREE.SmoothShading, this.wireframe = void 0 !== a.wireframe && a.wireframe, this.wireframeLinewidth = void 0 !== a.wireframeLinewidth ? a.wireframeLinewidth : 1, this.wireframeLinecap = void 0 !== a.wireframeLinecap ? a.wireframeLinecap : "round", this.wireframeLinejoin = void 0 !== a.wireframeLinejoin ? a.wireframeLinejoin : "round", this.vertexColors = void 0 !== a.vertexColors ? a.vertexColors : THREE.NoColors, this.skinning = void 0 !== a.skinning && a.skinning, this.morphTargets = void 0 !== a.morphTargets && a.morphTargets
	}, THREE.MeshBasicMaterial.prototype = new THREE.Material, THREE.MeshBasicMaterial.prototype.constructor = THREE.MeshBasicMaterial, THREE.MeshLambertMaterial = function (a) {
		THREE.Material.call(this, a), a = a || {}, this.color = void 0 !== a.color ? new THREE.Color(a.color) : new THREE.Color(16777215), this.ambient = void 0 !== a.ambient ? new THREE.Color(a.ambient) : new THREE.Color(16777215), this.emissive = void 0 !== a.emissive ? new THREE.Color(a.emissive) : new THREE.Color(0), this.wrapAround = void 0 !== a.wrapAround && a.wrapAround, this.wrapRGB = new THREE.Vector3(1, 1, 1), this.map = void 0 !== a.map ? a.map : null, this.lightMap = void 0 !== a.lightMap ? a.lightMap : null, this.envMap = void 0 !== a.envMap ? a.envMap : null, this.combine = void 0 !== a.combine ? a.combine : THREE.MultiplyOperation, this.reflectivity = void 0 !== a.reflectivity ? a.reflectivity : 1, this.refractionRatio = void 0 !== a.refractionRatio ? a.refractionRatio : 0.98, this.fog = void 0 === a.fog || a.fog, this.shading = void 0 !== a.shading ? a.shading : THREE.SmoothShading, this.wireframe = void 0 !== a.wireframe && a.wireframe, this.wireframeLinewidth = void 0 !== a.wireframeLinewidth ? a.wireframeLinewidth : 1, this.wireframeLinecap = void 0 !== a.wireframeLinecap ? a.wireframeLinecap : "round", this.wireframeLinejoin = void 0 !== a.wireframeLinejoin ? a.wireframeLinejoin : "round", this.vertexColors = void 0 !== a.vertexColors ? a.vertexColors : THREE.NoColors, this.skinning = void 0 !== a.skinning && a.skinning, this.morphTargets = void 0 !== a.morphTargets && a.morphTargets, this.morphNormals = void 0 !== a.morphNormals && a.morphNormals
	}, THREE.MeshLambertMaterial.prototype = new THREE.Material, THREE.MeshLambertMaterial.prototype.constructor = THREE.MeshLambertMaterial, THREE.MeshPhongMaterial = function (a) {
		THREE.Material.call(this, a), a = a || {}, this.color = void 0 !== a.color ? new THREE.Color(a.color) : new THREE.Color(16777215), this.ambient = void 0 !== a.ambient ? new THREE.Color(a.ambient) : new THREE.Color(16777215), this.emissive = void 0 !== a.emissive ? new THREE.Color(a.emissive) : new THREE.Color(0), this.specular = void 0 !== a.specular ? new THREE.Color(a.specular) : new THREE.Color(1118481), this.shininess = void 0 !== a.shininess ? a.shininess : 30, this.metal = void 0 !== a.metal && a.metal, this.perPixel = void 0 !== a.perPixel && a.perPixel, this.wrapAround = void 0 !== a.wrapAround && a.wrapAround, this.wrapRGB = new THREE.Vector3(1, 1, 1), this.map = void 0 !== a.map ? a.map : null, this.lightMap = void 0 !== a.lightMap ? a.lightMap : null, this.envMap = void 0 !== a.envMap ? a.envMap : null, this.combine = void 0 !== a.combine ? a.combine : THREE.MultiplyOperation, this.reflectivity = void 0 !== a.reflectivity ? a.reflectivity : 1, this.refractionRatio = void 0 !== a.refractionRatio ? a.refractionRatio : 0.98, this.fog = void 0 === a.fog || a.fog, this.shading = void 0 !== a.shading ? a.shading : THREE.SmoothShading, this.wireframe = void 0 !== a.wireframe && a.wireframe, this.wireframeLinewidth = void 0 !== a.wireframeLinewidth ? a.wireframeLinewidth : 1, this.wireframeLinecap = void 0 !== a.wireframeLinecap ? a.wireframeLinecap : "round", this.wireframeLinejoin = void 0 !== a.wireframeLinejoin ? a.wireframeLinejoin : "round", this.vertexColors = void 0 !== a.vertexColors ? a.vertexColors : THREE.NoColors, this.skinning = void 0 !== a.skinning && a.skinning, this.morphTargets = void 0 !== a.morphTargets && a.morphTargets, this.morphNormals = void 0 !== a.morphNormals && a.morphNormals
	}, THREE.MeshPhongMaterial.prototype = new THREE.Material, THREE.MeshPhongMaterial.prototype.constructor = THREE.MeshPhongMaterial, THREE.MeshDepthMaterial = function (a) {
		THREE.Material.call(this, a), a = a || {}, this.shading = void 0 !== a.shading ? a.shading : THREE.SmoothShading, this.wireframe = void 0 !== a.wireframe && a.wireframe, this.wireframeLinewidth = void 0 !== a.wireframeLinewidth ? a.wireframeLinewidth : 1
	}, THREE.MeshDepthMaterial.prototype = new THREE.Material, THREE.MeshDepthMaterial.prototype.constructor = THREE.MeshDepthMaterial, THREE.MeshNormalMaterial = function (a) {
		THREE.Material.call(this, a), a = a || {}, this.shading = a.shading ? a.shading : THREE.FlatShading, this.wireframe = !!a.wireframe && a.wireframe, this.wireframeLinewidth = a.wireframeLinewidth ? a.wireframeLinewidth : 1
	}, THREE.MeshNormalMaterial.prototype = new THREE.Material, THREE.MeshNormalMaterial.prototype.constructor = THREE.MeshNormalMaterial, THREE.MeshFaceMaterial = function () {}, THREE.ParticleBasicMaterial = function (a) {
		THREE.Material.call(this, a), a = a || {}, this.color = void 0 !== a.color ? new THREE.Color(a.color) : new THREE.Color(16777215), this.map = void 0 !== a.map ? a.map : null, this.size = void 0 !== a.size ? a.size : 1, this.sizeAttenuation = void 0 === a.sizeAttenuation || a.sizeAttenuation, this.vertexColors = void 0 !== a.vertexColors && a.vertexColors, this.fog = void 0 === a.fog || a.fog
	}, THREE.ParticleBasicMaterial.prototype = new THREE.Material, THREE.ParticleBasicMaterial.prototype.constructor = THREE.ParticleBasicMaterial, THREE.ParticleCanvasMaterial = function (a) {
		THREE.Material.call(this, a), a = a || {}, this.color = void 0 !== a.color ? new THREE.Color(a.color) : new THREE.Color(16777215), this.program = void 0 !== a.program ? a.program : function () {}
	}, THREE.ParticleCanvasMaterial.prototype = new THREE.Material, THREE.ParticleCanvasMaterial.prototype.constructor = THREE.ParticleCanvasMaterial, THREE.ParticleDOMMaterial = function (a) {
		THREE.Material.call(this), this.domElement = a
	}, THREE.ShaderMaterial = function (a) {
		THREE.Material.call(this, a), a = a || {}, this.fragmentShader = void 0 !== a.fragmentShader ? a.fragmentShader : "void main() {}", this.vertexShader = void 0 !== a.vertexShader ? a.vertexShader : "void main() {}", this.uniforms = void 0 !== a.uniforms ? a.uniforms : {}, this.attributes = a.attributes, this.shading = void 0 !== a.shading ? a.shading : THREE.SmoothShading, this.wireframe = void 0 !== a.wireframe && a.wireframe, this.wireframeLinewidth = void 0 !== a.wireframeLinewidth ? a.wireframeLinewidth : 1, this.fog = void 0 !== a.fog && a.fog, this.lights = void 0 !== a.lights && a.lights, this.vertexColors = void 0 !== a.vertexColors ? a.vertexColors : THREE.NoColors, this.skinning = void 0 !== a.skinning && a.skinning, this.morphTargets = void 0 !== a.morphTargets && a.morphTargets, this.morphNormals = void 0 !== a.morphNormals && a.morphNormals
	}, THREE.ShaderMaterial.prototype = new THREE.Material, THREE.ShaderMaterial.prototype.constructor = THREE.ShaderMaterial, THREE.Texture = function (d, e, f, g, h, a, b, c) {
		this.id = THREE.TextureCount++, this.image = d, this.mapping = void 0 !== e ? e : new THREE.UVMapping, this.wrapS = void 0 !== f ? f : THREE.ClampToEdgeWrapping, this.wrapT = void 0 !== g ? g : THREE.ClampToEdgeWrapping, this.magFilter = void 0 !== h ? h : THREE.LinearFilter, this.minFilter = void 0 !== a ? a : THREE.LinearMipMapLinearFilter, this.format = void 0 !== b ? b : THREE.RGBAFormat, this.type = void 0 !== c ? c : THREE.UnsignedByteType, this.offset = new THREE.Vector2(0, 0), this.repeat = new THREE.Vector2(1, 1), this.generateMipmaps = !0, this.needsUpdate = this.premultiplyAlpha = !1, this.onUpdate = null
	}, THREE.Texture.prototype = {
		constructor: THREE.Texture,
		clone: function () {
			var a = new THREE.Texture(this.image, this.mapping, this.wrapS, this.wrapT, this.magFilter, this.minFilter, this.format, this.type);
			return a.offset.copy(this.offset), a.repeat.copy(this.repeat), a
		}
	}, THREE.TextureCount = 0, THREE.MultiplyOperation = 0, THREE.MixOperation = 1, THREE.UVMapping = function () {}, THREE.CubeReflectionMapping = function () {}, THREE.CubeRefractionMapping = function () {}, THREE.SphericalReflectionMapping = function () {}, THREE.SphericalRefractionMapping = function () {}, THREE.RepeatWrapping = 0, THREE.ClampToEdgeWrapping = 1, THREE.MirroredRepeatWrapping = 2, THREE.NearestFilter = 3, THREE.NearestMipMapNearestFilter = 4, THREE.NearestMipMapLinearFilter = 5, THREE.LinearFilter = 6, THREE.LinearMipMapNearestFilter = 7, THREE.LinearMipMapLinearFilter = 8, THREE.ByteType = 9, THREE.UnsignedByteType = 10, THREE.ShortType = 11, THREE.UnsignedShortType = 12, THREE.IntType = 13, THREE.UnsignedIntType = 14, THREE.FloatType = 15, THREE.AlphaFormat = 16, THREE.RGBFormat = 17, THREE.RGBAFormat = 18, THREE.LuminanceFormat = 19, THREE.LuminanceAlphaFormat = 20, THREE.DataTexture = function (j, l, a, b, c, d, e, f, g, h) {
		THREE.Texture.call(this, null, d, e, f, g, h, b, c), this.image = {
			data: j,
			width: l,
			height: a
		}
	}, THREE.DataTexture.prototype = new THREE.Texture, THREE.DataTexture.prototype.constructor = THREE.DataTexture, THREE.DataTexture.prototype.clone = function () {
		var a = new THREE.DataTexture(this.image.data, this.image.width, this.image.height, this.format, this.type, this.mapping, this.wrapS, this.wrapT, this.magFilter, this.minFilter);
		return a.offset.copy(this.offset), a.repeat.copy(this.repeat), a
	}, THREE.Particle = function (a) {
		THREE.Object3D.call(this), this.material = a
	}, THREE.Particle.prototype = new THREE.Object3D, THREE.Particle.prototype.constructor = THREE.Particle, THREE.ParticleSystem = function (a, b) {
		THREE.Object3D.call(this), this.geometry = a, this.material = void 0 !== b ? b : new THREE.ParticleBasicMaterial({
			color: 16777215 * Math.random()
		}), this.sortParticles = !1, this.geometry && (this.geometry.boundingSphere || this.geometry.computeBoundingSphere(), this.boundRadius = a.boundingSphere.radius), this.frustumCulled = !1
	}, THREE.ParticleSystem.prototype = new THREE.Object3D, THREE.ParticleSystem.prototype.constructor = THREE.ParticleSystem, THREE.Line = function (b, c, a) {
		THREE.Object3D.call(this), this.geometry = b, this.material = void 0 !== c ? c : new THREE.LineBasicMaterial({
			color: 16777215 * Math.random()
		}), this.type = void 0 !== a ? a : THREE.LineStrip, this.geometry && (this.geometry.boundingSphere || this.geometry.computeBoundingSphere())
	}, THREE.LineStrip = 0, THREE.LinePieces = 1, THREE.Line.prototype = new THREE.Object3D, THREE.Line.prototype.constructor = THREE.Line, THREE.Mesh = function (b, c) {
		if (THREE.Object3D.call(this), this.geometry = b, this.material = void 0 !== c ? c : new THREE.MeshBasicMaterial({
				color: 16777215 * Math.random(),
				wireframe: !0
			}), this.geometry && (this.geometry.boundingSphere || this.geometry.computeBoundingSphere(), this.boundRadius = b.boundingSphere.radius, this.geometry.morphTargets.length)) {
			this.morphTargetBase = -1, this.morphTargetForcedOrder = [], this.morphTargetInfluences = [], this.morphTargetDictionary = {};
			for (var a = 0; a < this.geometry.morphTargets.length; a++) {
				this.morphTargetInfluences.push(0), this.morphTargetDictionary[this.geometry.morphTargets[a].name] = a
			}
		}
	}, THREE.Mesh.prototype = new THREE.Object3D, THREE.Mesh.prototype.constructor = THREE.Mesh, THREE.Mesh.prototype.supr = THREE.Object3D.prototype, THREE.Mesh.prototype.getMorphTargetIndexByName = function (a) {
		return void 0 !== this.morphTargetDictionary[a] ? this.morphTargetDictionary[a] : (console.log("THREE.Mesh.getMorphTargetIndexByName: morph target " + a + " does not exist. Returning 0."), 0)
	}, THREE.Bone = function (a) {
		THREE.Object3D.call(this), this.skin = a, this.skinMatrix = new THREE.Matrix4
	}, THREE.Bone.prototype = new THREE.Object3D, THREE.Bone.prototype.constructor = THREE.Bone, THREE.Bone.prototype.supr = THREE.Object3D.prototype, THREE.Bone.prototype.update = function (c, d) {
		this.matrixAutoUpdate && (d |= this.updateMatrix()), (d || this.matrixWorldNeedsUpdate) && (c ? this.skinMatrix.multiply(c, this.matrix) : this.skinMatrix.copy(this.matrix), d = !(this.matrixWorldNeedsUpdate = !1));
		var a, b = this.children.length;
		for (a = 0; a < b; a++) {
			this.children[a].update(this.skinMatrix, d)
		}
	}, THREE.SkinnedMesh = function (d, e) {
		var f, g, h, a, b, c;
		if (THREE.Mesh.call(this, d, e), this.identityMatrix = new THREE.Matrix4, this.bones = [], this.boneMatrices = [], void 0 !== this.geometry.bones) {
			for (f = 0; f < this.geometry.bones.length; f++) {
				a = (h = this.geometry.bones[f]).pos, b = h.rotq, c = h.scl, (g = this.addBone()).name = h.name, g.position.set(a[0], a[1], a[2]), g.quaternion.set(b[0], b[1], b[2], b[3]), g.useQuaternion = !0, void 0 !== c ? g.scale.set(c[0], c[1], c[2]) : g.scale.set(1, 1, 1)
			}
			for (f = 0; f < this.bones.length; f++) {
				h = this.geometry.bones[f], g = this.bones[f], -1 === h.parent ? this.add(g) : this.bones[h.parent].add(g)
			}
			this.boneMatrices = new Float32Array(16 * this.bones.length), this.pose()
		}
	}, THREE.SkinnedMesh.prototype = new THREE.Mesh, THREE.SkinnedMesh.prototype.constructor = THREE.SkinnedMesh, THREE.SkinnedMesh.prototype.addBone = function (a) {
		return void 0 === a && (a = new THREE.Bone(this)), this.bones.push(a), a
	}, THREE.SkinnedMesh.prototype.updateMatrixWorld = function (c) {
		this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || c) && (this.parent ? this.matrixWorld.multiply(this.parent.matrixWorld, this.matrix) : this.matrixWorld.copy(this.matrix), this.matrixWorldNeedsUpdate = !1);
		c = 0;
		for (var d = this.children.length; c < d; c++) {
			(a = this.children[c]) instanceof THREE.Bone ? a.update(this.identityMatrix, !1) : a.updateMatrixWorld(!0)
		}
		d = this.bones.length;
		var a = this.bones,
			b = this.boneMatrices;
		for (c = 0; c < d; c++) {
			a[c].skinMatrix.flattenToArrayOffset(b, 16 * c)
		}
	}, THREE.SkinnedMesh.prototype.pose = function () {
		this.updateMatrixWorld(!0);
		for (var e, f = [], a = 0; a < this.bones.length; a++) {
			e = this.bones[a], (b = new THREE.Matrix4).getInverse(e.skinMatrix), f.push(b), e.skinMatrix.flattenToArrayOffset(this.boneMatrices, 16 * a)
		}
		if (void 0 === this.geometry.skinVerticesA) {
			for (this.geometry.skinVerticesA = [], this.geometry.skinVerticesB = [], e = 0; e < this.geometry.skinIndices.length; e++) {
				a = this.geometry.vertices[e];
				var c = this.geometry.skinIndices[e].x,
					d = this.geometry.skinIndices[e].y,
					b = new THREE.Vector3(a.x, a.y, a.z);
				this.geometry.skinVerticesA.push(f[c].multiplyVector3(b)), b = new THREE.Vector3(a.x, a.y, a.z), this.geometry.skinVerticesB.push(f[d].multiplyVector3(b)), this.geometry.skinWeights[e].x + this.geometry.skinWeights[e].y !== 1 && (a = 0.5 * (1 - (this.geometry.skinWeights[e].x + this.geometry.skinWeights[e].y)), this.geometry.skinWeights[e].x = this.geometry.skinWeights[e].x + a, this.geometry.skinWeights[e].y = this.geometry.skinWeights[e].y + a)
			}
		}
	}, THREE.MorphAnimMesh = function (a, b) {
		THREE.Mesh.call(this, a, b), this.duration = 1000, this.mirroredLoop = !1, this.currentKeyframe = this.lastKeyframe = this.time = 0, this.direction = 1, this.directionBackwards = !1, this.setFrameRange(0, this.geometry.morphTargets.length - 1)
	}, THREE.MorphAnimMesh.prototype = new THREE.Mesh, THREE.MorphAnimMesh.prototype.constructor = THREE.MorphAnimMesh, THREE.MorphAnimMesh.prototype.setFrameRange = function (a, b) {
		this.startKeyframe = a, this.endKeyframe = b, this.length = this.endKeyframe - this.startKeyframe + 1
	}, THREE.MorphAnimMesh.prototype.setDirectionForward = function () {
		this.direction = 1, this.directionBackwards = !1
	}, THREE.MorphAnimMesh.prototype.setDirectionBackward = function () {
		this.direction = -1, this.directionBackwards = !0
	}, THREE.MorphAnimMesh.prototype.parseAnimations = function () {
		var d = this.geometry;
		d.animations || (d.animations = {});
		for (var e, f = d.animations, g = /([a-z]+)(\d+)/, h = 0, a = d.morphTargets.length; h < a; h++) {
			var b = d.morphTargets[h].name.match(g);
			if (b && 1 < b.length) {
				f[b = b[1]] || (f[b] = {
					start: 1 / 0,
					end: -1 / 0
				});
				var c = f[b];
				h < c.start && (c.start = h), h > c.end && (c.end = h), e || (e = b)
			}
		}
		d.firstAnimation = e
	}, THREE.MorphAnimMesh.prototype.setAnimationLabel = function (b, c, a) {
		this.geometry.animations || (this.geometry.animations = {}), this.geometry.animations[b] = {
			start: c,
			end: a
		}
	}, THREE.MorphAnimMesh.prototype.playAnimation = function (b, c) {
		var a = this.geometry.animations[b];
		a ? (this.setFrameRange(a.start, a.end), this.duration = (a.end - a.start) / c * 1000, this.time = 0) : console.warn("animation[" + b + "] undefined")
	}, THREE.MorphAnimMesh.prototype.updateAnimation = function (a) {
		var b = this.duration / this.length;
		this.time = this.time + this.direction * a, this.mirroredLoop ? (this.time > this.duration || this.time < 0) && (this.direction = -1 * this.direction, this.time > this.duration && (this.time = this.duration, this.directionBackwards = !0), this.time < 0 && (this.time = 0, this.directionBackwards = !1)) : (this.time = this.time % this.duration, this.time < 0 && (this.time = this.time + this.duration)), (a = this.startKeyframe + THREE.Math.clamp(Math.floor(this.time / b), 0, this.length - 1)) !== this.currentKeyframe && (this.morphTargetInfluences[this.lastKeyframe] = 0, this.morphTargetInfluences[this.currentKeyframe] = 1, this.morphTargetInfluences[a] = 0, this.lastKeyframe = this.currentKeyframe, this.currentKeyframe = a), b = this.time % b / b, this.directionBackwards && (b = 1 - b), this.morphTargetInfluences[this.currentKeyframe] = b, this.morphTargetInfluences[this.lastKeyframe] = 1 - b
	}, THREE.Ribbon = function (a, b) {
		THREE.Object3D.call(this), this.geometry = a, this.material = b
	}, THREE.Ribbon.prototype = new THREE.Object3D, THREE.Ribbon.prototype.constructor = THREE.Ribbon, THREE.LOD = function () {
		THREE.Object3D.call(this), this.LODs = []
	}, THREE.LOD.prototype = new THREE.Object3D, THREE.LOD.prototype.constructor = THREE.LOD, THREE.LOD.prototype.supr = THREE.Object3D.prototype, THREE.LOD.prototype.addLevel = function (b, c) {
		void 0 === c && (c = 0);
		c = Math.abs(c);
		for (var a = 0; a < this.LODs.length && !(c < this.LODs[a].visibleAtDistance); a++) {}
		this.LODs.splice(a, 0, {
			visibleAtDistance: c,
			object3D: b
		}), this.add(b)
	}, THREE.LOD.prototype.update = function (a) {
		if (1 < this.LODs.length) {
			a.matrixWorldInverse.getInverse(a.matrixWorld), a = -((a = a.matrixWorldInverse).elements[2] * this.matrixWorld.elements[12] + a.elements[6] * this.matrixWorld.elements[13] + a.elements[10] * this.matrixWorld.elements[14] + a.elements[14]), this.LODs[0].object3D.visible = !0;
			for (var b = 1; b < this.LODs.length && a >= this.LODs[b].visibleAtDistance; b++) {
				this.LODs[b - 1].object3D.visible = !1, this.LODs[b].object3D.visible = !0
			}
			for (; b < this.LODs.length; b++) {
				this.LODs[b].object3D.visible = !1
			}
		}
	}, THREE.Sprite = function (a) {
		THREE.Object3D.call(this), this.color = void 0 !== a.color ? new THREE.Color(a.color) : new THREE.Color(16777215), this.map = void 0 !== a.map ? a.map : new THREE.Texture, this.blending = void 0 !== a.blending ? a.blending : THREE.NormalBlending, this.blendSrc = void 0 !== a.blendSrc ? a.blendSrc : THREE.SrcAlphaFactor, this.blendDst = void 0 !== a.blendDst ? a.blendDst : THREE.OneMinusSrcAlphaFactor, this.blendEquation = void 0 !== a.blendEquation ? a.blendEquation : THREE.AddEquation, this.useScreenCoordinates = void 0 === a.useScreenCoordinates || a.useScreenCoordinates, this.mergeWith3D = void 0 !== a.mergeWith3D ? a.mergeWith3D : !this.useScreenCoordinates, this.affectedByDistance = void 0 !== a.affectedByDistance ? a.affectedByDistance : !this.useScreenCoordinates, this.scaleByViewport = void 0 !== a.scaleByViewport ? a.scaleByViewport : !this.affectedByDistance, this.alignment = a.alignment instanceof THREE.Vector2 ? a.alignment : THREE.SpriteAlignment.center, this.rotation3d = this.rotation, this.rotation = 0, this.opacity = 1, this.uvOffset = new THREE.Vector2(0, 0), this.uvScale = new THREE.Vector2(1, 1)
	}, THREE.Sprite.prototype = new THREE.Object3D, THREE.Sprite.prototype.constructor = THREE.Sprite, THREE.Sprite.prototype.updateMatrix = function () {
		this.matrix.setPosition(this.position), this.rotation3d.set(0, 0, this.rotation), this.matrix.setRotationFromEuler(this.rotation3d), 1 === this.scale.x && 1 === this.scale.y || (this.matrix.scale(this.scale), this.boundRadiusScale = Math.max(this.scale.x, this.scale.y)), this.matrixWorldNeedsUpdate = !0
	}, THREE.SpriteAlignment = {}, THREE.SpriteAlignment.topLeft = new THREE.Vector2(1, -1), THREE.SpriteAlignment.topCenter = new THREE.Vector2(0, -1), THREE.SpriteAlignment.topRight = new THREE.Vector2(-1, -1), THREE.SpriteAlignment.centerLeft = new THREE.Vector2(1, 0), THREE.SpriteAlignment.center = new THREE.Vector2(0, 0), THREE.SpriteAlignment.centerRight = new THREE.Vector2(-1, 0), THREE.SpriteAlignment.bottomLeft = new THREE.Vector2(1, 1), THREE.SpriteAlignment.bottomCenter = new THREE.Vector2(0, 1), THREE.SpriteAlignment.bottomRight = new THREE.Vector2(-1, 1), THREE.Scene = function () {
		THREE.Object3D.call(this), this.overrideMaterial = this.fog = null, this.matrixAutoUpdate = !1, this.__objects = [], this.__lights = [], this.__objectsAdded = [], this.__objectsRemoved = []
	}, THREE.Scene.prototype = new THREE.Object3D, THREE.Scene.prototype.constructor = THREE.Scene, THREE.Scene.prototype.__addObject = function (a) {
		if (a instanceof THREE.Light) {
			-1 === this.__lights.indexOf(a) && this.__lights.push(a)
		} else {
			if (!(a instanceof THREE.Camera || a instanceof THREE.Bone) && -1 === this.__objects.indexOf(a)) {
				this.__objects.push(a), this.__objectsAdded.push(a);
				var b = this.__objectsRemoved.indexOf(a); - 1 !== b && this.__objectsRemoved.splice(b, 1)
			}
		}
		for (b = 0; b < a.children.length; b++) {
			this.__addObject(a.children[b])
		}
	}, THREE.Scene.prototype.__removeObject = function (a) {
		if (a instanceof THREE.Light) {
			var b = this.__lights.indexOf(a); - 1 !== b && this.__lights.splice(b, 1)
		} else {
			a instanceof THREE.Camera || -1 !== (b = this.__objects.indexOf(a)) && (this.__objects.splice(b, 1), this.__objectsRemoved.push(a), -1 !== (b = this.__objectsAdded.indexOf(a)) && this.__objectsAdded.splice(b, 1))
		}
		for (b = 0; b < a.children.length; b++) {
			this.__removeObject(a.children[b])
		}
	}, THREE.Fog = function (b, c, a) {
		this.color = new THREE.Color(b), this.near = void 0 !== c ? c : 1, this.far = void 0 !== a ? a : 1000
	}, THREE.FogExp2 = function (a, b) {
		this.color = new THREE.Color(a), this.density = void 0 !== b ? b : 0.00025
	}, THREE.DOMRenderer = function () {
		var g, h, a, b, e, f = new THREE.Projector;
		e = function (d) {
			for (var i = document.documentElement, c = 0; c < d.length; c++) {
				if ("string" == typeof i.style[d[c]]) {
					return d[c]
				}
			}
			return null
		}(["transform", "MozTransform", "WebkitTransform", "msTransform", "OTransform"]), this.domElement = document.createElement("div"), this.setSize = function (c, d) {
			a = c / 2, b = d / 2
		}, this.render = function (j, i) {
			var c, m, d, l, n, k;
			for (g = f.projectScene(j, i), c = 0, m = (h = g.elements).length; c < m; c++) {
				(d = h[c]) instanceof THREE.RenderableParticle && d.material instanceof THREE.ParticleDOMMaterial && (l = d.material.domElement, n = d.x * a + a - (l.offsetWidth >> 1), k = d.y * b + b - (l.offsetHeight >> 1), l.style.left = n + "px", l.style.top = k + "px", l.style.zIndex = Math.abs(Math.floor((1 - d.z) * i.far / i.near)), e && (l.style[e] = "scale(" + d.scale.x * a + "," + d.scale.y * b + ")"))
			}
		}
	}, THREE.CanvasRenderer = function (an) {
		function ao(x) {
			G != x && (z.globalAlpha = G = x)
		}

		function ap(x) {
			if (O != x) {
				switch (x) {
					case THREE.NormalBlending:
						z.globalCompositeOperation = "source-over";
						break;
					case THREE.AdditiveBlending:
						z.globalCompositeOperation = "lighter"
				}
				O = x
			}
		}

		function aq(x) {
			F != x && (z.strokeStyle = F = x)
		}

		function at(x) {
			K != x && (z.fillStyle = K = x)
		}
		console.log("THREE.CanvasRenderer", THREE.REVISION);
		an = an || {};
		var av, aw, t, C, y, A, D, J, aY, ab, ad, ba, ae, U, r, aj, ak, a0, al, T, n, i, p, e, h, o, k, c, g, ay, m, ac, aa, s, q, b, aX, d, az, au = this,
			v = new THREE.Projector,
			u = void 0 !== an.canvas ? an.canvas : document.createElement("canvas"),
			z = u.getContext("2d"),
			E = new THREE.Color(0),
			H = 0,
			G = 1,
			O = 0,
			F = null,
			K = null,
			Y = null,
			a = null,
			P = null,
			ai = new THREE.RenderableVertex,
			ag = new THREE.RenderableVertex,
			af = new THREE.Color,
			ah = new THREE.Color,
			am = new THREE.Color,
			l = new THREE.Color,
			Z = new THREE.Color,
			f = [],
			R = [],
			M = new THREE.Rectangle,
			ax = new THREE.Rectangle,
			w = new THREE.Rectangle,
			aZ = !1,
			aW = new THREE.Color,
			j = new THREE.Color,
			Q = new THREE.Color,
			ar = new THREE.Vector3;
		an = 16;
		(s = document.createElement("canvas")).width = s.height = 2, (q = s.getContext("2d")).fillStyle = "rgba(0,0,0,1)", q.fillRect(0, 0, 2, 2), b = q.getImageData(0, 0, 2, 2), aX = b.data, (d = document.createElement("canvas")).width = d.height = an, (az = d.getContext("2d")).translate(-an / 2, -an / 2), az.scale(an, an), an--, this.domElement = u, this.sortElements = this.sortObjects = this.autoClear = !0, this.info = {
			render: {
				vertices: 0,
				faces: 0
			}
		}, this.setSize = function (x, B) {
			C = x, y = B, A = Math.floor(C / 2), D = Math.floor(y / 2), u.width = C, u.height = y, M.set(-A, -D, A, D), ax.set(-A, -D, A, D), G = 1, O = 0, P = a = Y = K = F = null
		}, this.setClearColor = function (x, B) {
			E.copy(x), H = void 0 !== B ? B : 1, ax.set(-A, -D, A, D)
		}, this.setClearColorHex = function (x, B) {
			E.setHex(x), H = void 0 !== B ? B : 1, ax.set(-A, -D, A, D)
		}, this.clear = function () {
			z.setTransform(1, 0, 0, -1, A, D), ax.isEmpty() || (ax.minSelf(M), ax.inflate(2), H < 1 && z.clearRect(Math.floor(ax.getX()), Math.floor(ax.getY()), Math.floor(ax.getWidth()), Math.floor(ax.getHeight())), 0 < H && (ap(THREE.NormalBlending), ao(1), at("rgba(" + Math.floor(255 * E.r) + "," + Math.floor(255 * E.g) + "," + Math.floor(255 * E.b) + "," + H + ")"), z.fillRect(Math.floor(ax.getX()), Math.floor(ax.getY()), Math.floor(ax.getWidth()), Math.floor(ax.getHeight()))), ax.empty())
		}, this.render = function (L, W) {
			function B(aR, aS, aP, aQ) {
				var aT, aU, aV, aN, aM, aO;
				for (aT = 0, aU = aR.length; aT < aU; aT++) {
					aN = (aV = aR[aT]).color, aV instanceof THREE.DirectionalLight ? (aM = aV.matrixWorld.getPosition(), (aO = aP.dot(aM)) <= 0 || (aO *= aV.intensity, aQ.r = aQ.r + aN.r * aO, aQ.g = aQ.g + aN.g * aO, aQ.b = aQ.b + aN.b * aO)) : aV instanceof THREE.PointLight && (aM = aV.matrixWorld.getPosition(), (aO = aP.dot(ar.sub(aM, aS).normalize())) <= 0 || 0 != (aO *= 0 == aV.distance ? 1 : 1 - Math.min(aS.distanceTo(aM) / aV.distance, 1)) && (aO *= aV.intensity, aQ.r = aQ.r + aN.r * aO, aQ.g = aQ.g + aN.g * aO, aQ.b = aQ.b + aN.b * aO))
				}
			}

			function V(aQ, aR, aO) {
				var aS, aP, aT, aU, aM, aN;
				ao(aO.opacity), ap(aO.blending), aO instanceof THREE.ParticleBasicMaterial ? aO.map && (aM = (aU = aO.map.image).width >> 1, aN = aU.height >> 1, aS = (aO = aR.scale.x * A) * aM, aP = (aT = aR.scale.y * D) * aN, w.set(aQ.x - aS, aQ.y - aP, aQ.x + aS, aQ.y + aP), M.intersects(w) && (z.save(), z.translate(aQ.x, aQ.y), z.rotate(-aR.rotation), z.scale(aO, -aT), z.translate(-aM, -aN), z.drawImage(aU, 0, 0), z.restore())) : aO instanceof THREE.ParticleCanvasMaterial && (aS = aR.scale.x * A, aP = aR.scale.y * D, w.set(aQ.x - aS, aQ.y - aP, aQ.x + aS, aQ.y + aP), M.intersects(w) && (aq(aO.color.getContextStyle()), at(aO.color.getContextStyle()), z.save(), z.translate(aQ.x, aQ.y), z.rotate(-aR.rotation), z.scale(aS, aP), aO.program(z), z.restore()))
			}

			function X(aM, aN, aO, aP) {
				ao(aP.opacity), ap(aP.blending), z.beginPath(), z.moveTo(aM.positionScreen.x, aM.positionScreen.y), z.lineTo(aN.positionScreen.x, aN.positionScreen.y), z.closePath(), aP instanceof THREE.LineBasicMaterial && (aM = aP.linewidth, Y != aM && (z.lineWidth = Y = aM), aM = aP.linecap, a != aM && (z.lineCap = a = aM), aM = aP.linejoin, P != aM && (z.lineJoin = P = aM), aq(aP.color.getContextStyle()), z.stroke(), w.inflate(2 * aP.linewidth))
			}

			function aA(aR, aM, aO, aP, aQ, aS, aN, aT) {
				au.info.render.vertices = au.info.render.vertices + 3, au.info.render.faces++, ao(aT.opacity), ap(aT.blending), ba = aR.positionScreen.x, ae = aR.positionScreen.y, U = aM.positionScreen.x, r = aM.positionScreen.y, aj = aO.positionScreen.x, ak = aO.positionScreen.y, aD(ba, ae, U, r, aj, ak), aT instanceof THREE.MeshBasicMaterial ? aT.map ? aT.map.mapping instanceof THREE.UVMapping && (k = aN.uvs[0], S(ba, ae, U, r, aj, ak, k[aP].u, k[aP].v, k[aQ].u, k[aQ].v, k[aS].u, k[aS].v, aT.map)) : aT.envMap ? aT.envMap.mapping instanceof THREE.SphericalReflectionMapping && (aR = W.matrixWorldInverse, ar.copy(aN.vertexNormalsWorld[aP]), c = 0.5 * (ar.x * aR.elements[0] + ar.y * aR.elements[4] + ar.z * aR.elements[8]) + 0.5, g = 0.5 * -(ar.x * aR.elements[1] + ar.y * aR.elements[5] + ar.z * aR.elements[9]) + 0.5, ar.copy(aN.vertexNormalsWorld[aQ]), ay = 0.5 * (ar.x * aR.elements[0] + ar.y * aR.elements[4] + ar.z * aR.elements[8]) + 0.5, m = 0.5 * -(ar.x * aR.elements[1] + ar.y * aR.elements[5] + ar.z * aR.elements[9]) + 0.5, ar.copy(aN.vertexNormalsWorld[aS]), ac = 0.5 * (ar.x * aR.elements[0] + ar.y * aR.elements[4] + ar.z * aR.elements[8]) + 0.5, aa = 0.5 * -(ar.x * aR.elements[1] + ar.y * aR.elements[5] + ar.z * aR.elements[9]) + 0.5, S(ba, ae, U, r, aj, ak, c, g, ay, m, ac, aa, aT.envMap)) : aT.wireframe ? aK(aT.color, aT.wireframeLinewidth, aT.wireframeLinecap, aT.wireframeLinejoin) : aG(aT.color) : aT instanceof THREE.MeshLambertMaterial ? aZ ? aT.wireframe || aT.shading != THREE.SmoothShading || 3 != aN.vertexNormalsWorld.length ? (af.r = aW.r, af.g = aW.g, af.b = aW.b, B(t, aN.centroidWorld, aN.normalWorld, af), af.r = Math.max(0, Math.min(aT.color.r * af.r, 1)), af.g = Math.max(0, Math.min(aT.color.g * af.g, 1)), af.b = Math.max(0, Math.min(aT.color.b * af.b, 1)), aT.wireframe ? aK(af, aT.wireframeLinewidth, aT.wireframeLinecap, aT.wireframeLinejoin) : aG(af)) : (ah.r = am.r = l.r = aW.r, ah.g = am.g = l.g = aW.g, ah.b = am.b = l.b = aW.b, B(t, aN.v1.positionWorld, aN.vertexNormalsWorld[0], ah), B(t, aN.v2.positionWorld, aN.vertexNormalsWorld[1], am), B(t, aN.v3.positionWorld, aN.vertexNormalsWorld[2], l), ah.r = Math.max(0, Math.min(aT.color.r * ah.r, 1)), ah.g = Math.max(0, Math.min(aT.color.g * ah.g, 1)), ah.b = Math.max(0, Math.min(aT.color.b * ah.b, 1)), am.r = Math.max(0, Math.min(aT.color.r * am.r, 1)), am.g = Math.max(0, Math.min(aT.color.g * am.g, 1)), am.b = Math.max(0, Math.min(aT.color.b * am.b, 1)), l.r = Math.max(0, Math.min(aT.color.r * l.r, 1)), l.g = Math.max(0, Math.min(aT.color.g * l.g, 1)), l.b = Math.max(0, Math.min(aT.color.b * l.b, 1)), Z.r = 0.5 * (am.r + l.r), Z.g = 0.5 * (am.g + l.g), Z.b = 0.5 * (am.b + l.b), o = x(ah, am, l, Z), I(ba, ae, U, r, aj, ak, 0, 0, 1, 0, 0, 1, o)) : aT.wireframe ? aK(aT.color, aT.wireframeLinewidth, aT.wireframeLinecap, aT.wireframeLinejoin) : aG(aT.color) : aT instanceof THREE.MeshDepthMaterial ? (e = W.near, h = W.far, ah.r = ah.g = ah.b = 1 - N(aR.positionScreen.z, e, h), am.r = am.g = am.b = 1 - N(aM.positionScreen.z, e, h), l.r = l.g = l.b = 1 - N(aO.positionScreen.z, e, h), Z.r = 0.5 * (am.r + l.r), Z.g = 0.5 * (am.g + l.g), Z.b = 0.5 * (am.b + l.b), o = x(ah, am, l, Z), I(ba, ae, U, r, aj, ak, 0, 0, 1, 0, 0, 1, o)) : aT instanceof THREE.MeshNormalMaterial && (af.r = aH(aN.normalWorld.x), af.g = aH(aN.normalWorld.y), af.b = aH(aN.normalWorld.z), aT.wireframe ? aK(af, aT.wireframeLinewidth, aT.wireframeLinecap, aT.wireframeLinejoin) : aG(af))
			}

			function aB(aR, aP, aQ, aS, aT, aU, aN, aM, aO) {
				au.info.render.vertices = au.info.render.vertices + 4, au.info.render.faces++, ao(aM.opacity), ap(aM.blending), aM.map || aM.envMap ? (aA(aR, aP, aS, 0, 1, 3, aN, aM), aA(aT, aQ, aU, 1, 2, 3, aN, aM)) : (ba = aR.positionScreen.x, ae = aR.positionScreen.y, U = aP.positionScreen.x, r = aP.positionScreen.y, aj = aQ.positionScreen.x, ak = aQ.positionScreen.y, a0 = aS.positionScreen.x, al = aS.positionScreen.y, T = aT.positionScreen.x, n = aT.positionScreen.y, i = aU.positionScreen.x, p = aU.positionScreen.y, aM instanceof THREE.MeshBasicMaterial ? (aF(ba, ae, U, r, aj, ak, a0, al), aM.wireframe ? aK(aM.color, aM.wireframeLinewidth, aM.wireframeLinecap, aM.wireframeLinejoin) : aG(aM.color)) : aM instanceof THREE.MeshLambertMaterial ? aZ ? aM.wireframe || aM.shading != THREE.SmoothShading || 4 != aN.vertexNormalsWorld.length ? (af.r = aW.r, af.g = aW.g, af.b = aW.b, B(t, aN.centroidWorld, aN.normalWorld, af), af.r = Math.max(0, Math.min(aM.color.r * af.r, 1)), af.g = Math.max(0, Math.min(aM.color.g * af.g, 1)), af.b = Math.max(0, Math.min(aM.color.b * af.b, 1)), aF(ba, ae, U, r, aj, ak, a0, al), aM.wireframe ? aK(af, aM.wireframeLinewidth, aM.wireframeLinecap, aM.wireframeLinejoin) : aG(af)) : (ah.r = am.r = l.r = Z.r = aW.r, ah.g = am.g = l.g = Z.g = aW.g, ah.b = am.b = l.b = Z.b = aW.b, B(t, aN.v1.positionWorld, aN.vertexNormalsWorld[0], ah), B(t, aN.v2.positionWorld, aN.vertexNormalsWorld[1], am), B(t, aN.v4.positionWorld, aN.vertexNormalsWorld[3], l), B(t, aN.v3.positionWorld, aN.vertexNormalsWorld[2], Z), ah.r = Math.max(0, Math.min(aM.color.r * ah.r, 1)), ah.g = Math.max(0, Math.min(aM.color.g * ah.g, 1)), ah.b = Math.max(0, Math.min(aM.color.b * ah.b, 1)), am.r = Math.max(0, Math.min(aM.color.r * am.r, 1)), am.g = Math.max(0, Math.min(aM.color.g * am.g, 1)), am.b = Math.max(0, Math.min(aM.color.b * am.b, 1)), l.r = Math.max(0, Math.min(aM.color.r * l.r, 1)), l.g = Math.max(0, Math.min(aM.color.g * l.g, 1)), l.b = Math.max(0, Math.min(aM.color.b * l.b, 1)), Z.r = Math.max(0, Math.min(aM.color.r * Z.r, 1)), Z.g = Math.max(0, Math.min(aM.color.g * Z.g, 1)), Z.b = Math.max(0, Math.min(aM.color.b * Z.b, 1)), o = x(ah, am, l, Z), aD(ba, ae, U, r, a0, al), I(ba, ae, U, r, a0, al, 0, 0, 1, 0, 0, 1, o), aD(T, n, aj, ak, i, p), I(T, n, aj, ak, i, p, 1, 0, 1, 1, 0, 1, o)) : (aF(ba, ae, U, r, aj, ak, a0, al), aM.wireframe ? aK(aM.color, aM.wireframeLinewidth, aM.wireframeLinecap, aM.wireframeLinejoin) : aG(aM.color)) : aM instanceof THREE.MeshNormalMaterial ? (af.r = aH(aN.normalWorld.x), af.g = aH(aN.normalWorld.y), af.b = aH(aN.normalWorld.z), aF(ba, ae, U, r, aj, ak, a0, al), aM.wireframe ? aK(af, aM.wireframeLinewidth, aM.wireframeLinecap, aM.wireframeLinejoin) : aG(af)) : aM instanceof THREE.MeshDepthMaterial && (e = W.near, h = W.far, ah.r = ah.g = ah.b = 1 - N(aR.positionScreen.z, e, h), am.r = am.g = am.b = 1 - N(aP.positionScreen.z, e, h), l.r = l.g = l.b = 1 - N(aS.positionScreen.z, e, h), Z.r = Z.g = Z.b = 1 - N(aQ.positionScreen.z, e, h), o = x(ah, am, l, Z), aD(ba, ae, U, r, a0, al), I(ba, ae, U, r, a0, al, 0, 0, 1, 0, 0, 1, o), aD(T, n, aj, ak, i, p), I(T, n, aj, ak, i, p, 1, 0, 1, 1, 0, 1, o)))
			}

			function aD(aR, aM, aN, aO, aP, aQ) {
				z.beginPath(), z.moveTo(aR, aM), z.lineTo(aN, aO), z.lineTo(aP, aQ), z.lineTo(aR, aM), z.closePath()
			}

			function aF(aS, aN, aT, aM, aO, aP, aQ, aR) {
				z.beginPath(), z.moveTo(aS, aN), z.lineTo(aT, aM), z.lineTo(aO, aP), z.lineTo(aQ, aR), z.lineTo(aS, aN), z.closePath()
			}

			function aK(aP, aM, aN, aO) {
				Y != aM && (z.lineWidth = Y = aM), a != aN && (z.lineCap = a = aN), P != aO && (z.lineJoin = P = aO), aq(aP.getContextStyle()), z.stroke(), w.inflate(2 * aM)
			}

			function aG(aM) {
				at(aM.getContextStyle()), z.fill()
			}

			function S(aM, aN, aO, aP, aQ, aR, aT, aS, aV, a1, a3, a5, a2) {
				if (0 != a2.image.width) {
					if (1 == a2.needsUpdate || null == f[a2.id]) {
						var aU = a2.wrapS == THREE.RepeatWrapping,
							a4 = a2.wrapT == THREE.RepeatWrapping;
						f[a2.id] = z.createPattern(a2.image, aU && a4 ? "repeat" : aU && !a4 ? "repeat-x" : !aU && a4 ? "repeat-y" : "no-repeat"), a2.needsUpdate = !1
					}
					at(f[a2.id]);
					aU = a2.offset.x / a2.repeat.x, a4 = a2.offset.y / a2.repeat.y;
					var a6 = a2.image.width * a2.repeat.x,
						a7 = a2.image.height * a2.repeat.y;
					aO = aO - aM, aP = aP - aN, aQ = aQ - aM, aR = aR - aN;
					0 == (aU = (aV = (aV + aU) * a6 - (aT = (aT + aU) * a6)) * (a5 = (a5 + a4) * a7 - (aS = (aS + a4) * a7)) - (a3 = (a3 + aU) * a6 - aT) * (a1 = (a1 + a4) * a7 - aS)) ? (void 0 === R[a2.id] && ((aN = document.createElement("canvas")).width = a2.image.width, aN.height = a2.image.height, (aN = aN.getContext("2d")).drawImage(a2.image, 0, 0), R[a2.id] = aN.getImageData(0, 0, a2.image.width, a2.image.height).data), aN = R[a2.id], aT = 4 * (Math.floor(aT) + Math.floor(aS) * a2.image.width), af.setRGB(aN[aT] / 255, aN[aT + 1] / 255, aN[aT + 2] / 255), aG(af)) : (aM = aM - (a2 = (a5 * aO - a1 * aQ) * (aU = 1 / aU)) * aT - (aO = (aV * aQ - a3 * aO) * aU) * aS, aT = aN - (a1 = (a5 * aP - a1 * aR) * aU) * aT - (aP = (aV * aR - a3 * aP) * aU) * aS, z.save(), z.transform(a2, a1, aO, aP, aM, aT), z.fill(), z.restore())
				}
			}

			function I(aN, aO, aP, aQ, aR, aT, aU, a3, a1, aS, aV, a2, a4) {
				var aM, a5;
				aM = a4.width - 1, aN = aN - (aM = ((a2 = a2 * (a5 = a4.height - 1) - (a3 *= a5)) * (aP -= aN) - (aS = aS * a5 - a3) * (aR -= aN)) * (a5 = 1 / ((a1 = a1 * aM - (aU *= aM)) * a2 - (aV = aV * aM - aU) * aS))) * aU - (aP = (a1 * aR - aV * aP) * a5) * a3, aO = aO - (aS = (a2 * (aQ -= aO) - aS * (aT -= aO)) * a5) * aU - (aQ = (a1 * aT - aV * aQ) * a5) * a3, z.save(), z.transform(aM, aS, aP, aQ, aN, aO), z.clip(), z.drawImage(a4, 0, 0), z.restore()
			}

			function x(aO, aQ, aR, aT) {
				var aV = ~~(255 * aO.r),
					aP = ~~(255 * aO.g),
					aS = (aO = ~~(255 * aO.b), ~~(255 * aQ.r)),
					a1 = ~~(255 * aQ.g),
					aU = (aQ = ~~(255 * aQ.b), ~~(255 * aR.r)),
					a2 = ~~(255 * aR.g),
					aM = (aR = ~~(255 * aR.b), ~~(255 * aT.r)),
					aN = ~~(255 * aT.g);
				aT = ~~(255 * aT.b);
				return aX[0] = aV < 0 ? 0 : 255 < aV ? 255 : aV, aX[1] = aP < 0 ? 0 : 255 < aP ? 255 : aP, aX[2] = aO < 0 ? 0 : 255 < aO ? 255 : aO, aX[4] = aS < 0 ? 0 : 255 < aS ? 255 : aS, aX[5] = a1 < 0 ? 0 : 255 < a1 ? 255 : a1, aX[6] = aQ < 0 ? 0 : 255 < aQ ? 255 : aQ, aX[8] = aU < 0 ? 0 : 255 < aU ? 255 : aU, aX[9] = a2 < 0 ? 0 : 255 < a2 ? 255 : a2, aX[10] = aR < 0 ? 0 : 255 < aR ? 255 : aR, aX[12] = aM < 0 ? 0 : 255 < aM ? 255 : aM, aX[13] = aN < 0 ? 0 : 255 < aN ? 255 : aN, aX[14] = aT < 0 ? 0 : 255 < aT ? 255 : aT, q.putImageData(b, 0, 0), az.drawImage(s, 0, 0), d
			}

			function N(aO, aM, aN) {
				return (aO = (aO - aM) / (aN - aM)) * aO * (3 - 2 * aO)
			}

			function aH(aM) {
				return (aM = 0.5 * (aM + 1)) < 0 ? 0 : 1 < aM ? 1 : aM
			}

			function aC(aQ, aM) {
				var aN = aM.x - aQ.x,
					aO = aM.y - aQ.y,
					aP = aN * aN + aO * aO;
				0 != aP && (aN *= aP = 1 / Math.sqrt(aP), aO *= aP, aM.x = aM.x + aN, aM.y = aM.y + aO, aQ.x = aQ.x - aN, aQ.y = aQ.y - aO)
			}
			var aL, aJ, aE, aI;
			for (this.autoClear ? this.clear() : z.setTransform(1, 0, 0, -1, A, D), au.info.render.vertices = 0, au.info.render.faces = 0, av = v.projectScene(L, W, this.sortElements), aw = av.elements, t = av.lights, (aZ = 0 < t.length) && function (aQ) {
					var aM, aN, aO, aP;
					for (aW.setRGB(0, 0, 0), j.setRGB(0, 0, 0), Q.setRGB(0, 0, 0), aM = 0, aN = aQ.length; aM < aN; aM++) {
						aP = (aO = aQ[aM]).color, aO instanceof THREE.AmbientLight ? (aW.r = aW.r + aP.r, aW.g = aW.g + aP.g, aW.b = aW.b + aP.b) : aO instanceof THREE.DirectionalLight ? (j.r = j.r + aP.r, j.g = j.g + aP.g, j.b = j.b + aP.b) : aO instanceof THREE.PointLight && (Q.r = Q.r + aP.r, Q.g = Q.g + aP.g, Q.b = Q.b + aP.b)
					}
				}(t), aL = 0, aJ = aw.length; aL < aJ; aL++) {
				void 0 !== (aI = (aI = (aE = aw[aL]).material) instanceof THREE.MeshFaceMaterial ? aE.faceMaterial : aI) && !1 !== aI.visible && (w.empty(), aE instanceof THREE.RenderableParticle ? ((J = aE).x = J.x * A, J.y = J.y * D, V(J, aE, aI)) : aE instanceof THREE.RenderableLine ? (J = aE.v1, aY = aE.v2, J.positionScreen.x = J.positionScreen.x * A, J.positionScreen.y = J.positionScreen.y * D, aY.positionScreen.x = aY.positionScreen.x * A, aY.positionScreen.y = aY.positionScreen.y * D, w.addPoint(J.positionScreen.x, J.positionScreen.y), w.addPoint(aY.positionScreen.x, aY.positionScreen.y), M.intersects(w) && X(J, aY, 0, aI)) : aE instanceof THREE.RenderableFace3 ? (J = aE.v1, aY = aE.v2, ab = aE.v3, J.positionScreen.x = J.positionScreen.x * A, J.positionScreen.y = J.positionScreen.y * D, aY.positionScreen.x = aY.positionScreen.x * A, aY.positionScreen.y = aY.positionScreen.y * D, ab.positionScreen.x = ab.positionScreen.x * A, ab.positionScreen.y = ab.positionScreen.y * D, aI.overdraw && (aC(J.positionScreen, aY.positionScreen), aC(aY.positionScreen, ab.positionScreen), aC(ab.positionScreen, J.positionScreen)), w.add3Points(J.positionScreen.x, J.positionScreen.y, aY.positionScreen.x, aY.positionScreen.y, ab.positionScreen.x, ab.positionScreen.y), M.intersects(w) && aA(J, aY, ab, 0, 1, 2, aE, aI)) : aE instanceof THREE.RenderableFace4 && (J = aE.v1, aY = aE.v2, ab = aE.v3, ad = aE.v4, J.positionScreen.x = J.positionScreen.x * A, J.positionScreen.y = J.positionScreen.y * D, aY.positionScreen.x = aY.positionScreen.x * A, aY.positionScreen.y = aY.positionScreen.y * D, ab.positionScreen.x = ab.positionScreen.x * A, ab.positionScreen.y = ab.positionScreen.y * D, ad.positionScreen.x = ad.positionScreen.x * A, ad.positionScreen.y = ad.positionScreen.y * D, ai.positionScreen.copy(aY.positionScreen), ag.positionScreen.copy(ad.positionScreen), aI.overdraw && (aC(J.positionScreen, aY.positionScreen), aC(aY.positionScreen, ad.positionScreen), aC(ad.positionScreen, J.positionScreen), aC(ab.positionScreen, ai.positionScreen), aC(ab.positionScreen, ag.positionScreen)), w.addPoint(J.positionScreen.x, J.positionScreen.y), w.addPoint(aY.positionScreen.x, aY.positionScreen.y), w.addPoint(ab.positionScreen.x, ab.positionScreen.y), w.addPoint(ad.positionScreen.x, ad.positionScreen.y), M.intersects(w) && aB(J, aY, ab, ad, ai, ag, aE, aI)), ax.addRectangle(w))
			}
			z.setTransform(1, 0, 0, 1, 0, 0)
		}
	}, THREE.ShaderChunk = {
		fog_pars_fragment: "#ifdef USE_FOG\nuniform vec3 fogColor;\n#ifdef FOG_EXP2\nuniform float fogDensity;\n#else\nuniform float fogNear;\nuniform float fogFar;\n#endif\n#endif",
		fog_fragment: "#ifdef USE_FOG\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n#ifdef FOG_EXP2\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n#else\nfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n#endif\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n#endif",
		envmap_pars_fragment: "#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float reflectivity;\nuniform samplerCube envMap;\nuniform float flipEnvMap;\nuniform int combine;\n#endif",
		envmap_fragment: "#ifdef USE_ENVMAP\n#ifdef DOUBLE_SIDED\nfloat flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );\nvec4 cubeColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * vReflect.x, vReflect.yz ) );\n#else\nvec4 cubeColor = textureCube( envMap, vec3( flipEnvMap * vReflect.x, vReflect.yz ) );\n#endif\n#ifdef GAMMA_INPUT\ncubeColor.xyz *= cubeColor.xyz;\n#endif\nif ( combine == 1 ) {\ngl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, reflectivity );\n} else {\ngl_FragColor.xyz = gl_FragColor.xyz * cubeColor.xyz;\n}\n#endif",
		envmap_pars_vertex: "#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float refractionRatio;\nuniform bool useRefract;\n#endif",
		envmap_vertex: "#ifdef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvec3 nWorld = mat3( objectMatrix[ 0 ].xyz, objectMatrix[ 1 ].xyz, objectMatrix[ 2 ].xyz ) * normal;\nif ( useRefract ) {\nvReflect = refract( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ), refractionRatio );\n} else {\nvReflect = reflect( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ) );\n}\n#endif",
		map_particle_pars_fragment: "#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
		map_particle_fragment: "#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, gl_PointCoord );\n#endif",
		map_pars_vertex: "#ifdef USE_MAP\nvarying vec2 vUv;\nuniform vec4 offsetRepeat;\n#endif",
		map_pars_fragment: "#ifdef USE_MAP\nvarying vec2 vUv;\nuniform sampler2D map;\n#endif",
		map_vertex: "#ifdef USE_MAP\nvUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n#endif",
		map_fragment: "#ifdef USE_MAP\n#ifdef GAMMA_INPUT\nvec4 texelColor = texture2D( map, vUv );\ntexelColor.xyz *= texelColor.xyz;\ngl_FragColor = gl_FragColor * texelColor;\n#else\ngl_FragColor = gl_FragColor * texture2D( map, vUv );\n#endif\n#endif",
		lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\nuniform sampler2D lightMap;\n#endif",
		lightmap_pars_vertex: "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\n#endif",
		lightmap_fragment: "#ifdef USE_LIGHTMAP\ngl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );\n#endif",
		lightmap_vertex: "#ifdef USE_LIGHTMAP\nvUv2 = uv2;\n#endif",
		lights_lambert_pars_vertex: "uniform vec3 ambient;\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngle[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif",
		lights_lambert_vertex: "vLightFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\nvLightBack = vec3( 0.0 );\n#endif\ntransformedNormal = normalize( transformedNormal );\n#if MAX_DIR_LIGHTS > 0\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( transformedNormal, dirVector );\nvec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 directionalLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 directionalLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\ndirectionalLightWeighting = mix( directionalLightWeighting, directionalLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\ndirectionalLightWeightingBack = mix( directionalLightWeightingBack, directionalLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += directionalLightColor[ i ] * directionalLightWeighting;\n#ifdef DOUBLE_SIDED\nvLightBack += directionalLightColor[ i ] * directionalLightWeightingBack;\n#endif\n}\n#endif\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nfloat dotProduct = dot( transformedNormal, lVector );\nvec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 pointLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 pointLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 pointLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\npointLightWeighting = mix( pointLightWeighting, pointLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\npointLightWeightingBack = mix( pointLightWeightingBack, pointLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += pointLightColor[ i ] * pointLightWeighting * lDistance;\n#ifdef DOUBLE_SIDED\nvLightBack += pointLightColor[ i ] * pointLightWeightingBack * lDistance;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nfor( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nlVector = normalize( lVector );\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - mPosition.xyz ) );\nif ( spotEffect > spotLightAngle[ i ] ) {\nspotEffect = pow( spotEffect, spotLightExponent[ i ] );\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nfloat dotProduct = dot( transformedNormal, lVector );\nvec3 spotLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 spotLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 spotLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 spotLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\nspotLightWeighting = mix( spotLightWeighting, spotLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\nspotLightWeightingBack = mix( spotLightWeightingBack, spotLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += spotLightColor[ i ] * spotLightWeighting * lDistance * spotEffect;\n#ifdef DOUBLE_SIDED\nvLightBack += spotLightColor[ i ] * spotLightWeightingBack * lDistance * spotEffect;\n#endif\n}\n}\n#endif\nvLightFront = vLightFront * diffuse + ambient * ambientLightColor + emissive;\n#ifdef DOUBLE_SIDED\nvLightBack = vLightBack * diffuse + ambient * ambientLightColor + emissive;\n#endif",
		lights_phong_pars_vertex: "#ifndef PHONG_PER_PIXEL\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\nvarying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0\nvarying vec3 vWorldPosition;\n#endif",
		lights_phong_vertex: "#ifndef PHONG_PER_PIXEL\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nvPointLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nfor( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nvSpotLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0\nvWorldPosition = mPosition.xyz;\n#endif",
		lights_phong_pars_fragment: "uniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n#ifdef PHONG_PER_PIXEL\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#else\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngle[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n#ifdef PHONG_PER_PIXEL\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n#else\nvarying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];\n#endif\nvarying vec3 vWorldPosition;\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",
		lights_phong_fragment: "vec3 normal = normalize( vNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#ifdef DOUBLE_SIDED\nnormal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n#endif\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse  = vec3( 0.0 );\nvec3 pointSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n#ifdef PHONG_PER_PIXEL\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz + vViewPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\n#else\nvec3 lVector = normalize( vPointLight[ i ].xyz );\nfloat lDistance = vPointLight[ i ].w;\n#endif\nfloat dotProduct = dot( normal, lVector );\n#ifdef WRAP_AROUND\nfloat pointDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n#else\nfloat pointDiffuseWeight = max( dotProduct, 0.0 );\n#endif\npointDiffuse  += diffuse * pointLightColor[ i ] * pointDiffuseWeight * lDistance;\nvec3 pointHalfVector = normalize( lVector + viewPosition );\nfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\nfloat pointSpecularWeight = max( pow( pointDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, pointHalfVector ), 5.0 );\npointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance * specularNormalization;\n#else\npointSpecular += specular * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nvec3 spotDiffuse  = vec3( 0.0 );\nvec3 spotSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n#ifdef PHONG_PER_PIXEL\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz + vViewPosition.xyz;\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\n#else\nvec3 lVector = normalize( vSpotLight[ i ].xyz );\nfloat lDistance = vSpotLight[ i ].w;\n#endif\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\nif ( spotEffect > spotLightAngle[ i ] ) {\nspotEffect = pow( spotEffect, spotLightExponent[ i ] );\nfloat dotProduct = dot( normal, lVector );\n#ifdef WRAP_AROUND\nfloat spotDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat spotDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n#else\nfloat spotDiffuseWeight = max( dotProduct, 0.0 );\n#endif\nspotDiffuse += diffuse * spotLightColor[ i ] * spotDiffuseWeight * lDistance * spotEffect;\nvec3 spotHalfVector = normalize( lVector + viewPosition );\nfloat spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\nfloat spotSpecularWeight = max( pow( spotDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, spotHalfVector ), 5.0 );\nspotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * specularNormalization * spotEffect;\n#else\nspotSpecular += specular * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * spotEffect;\n#endif\n}\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec3 dirDiffuse  = vec3( 0.0 );\nvec3 dirSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( normal, dirVector );\n#ifdef WRAP_AROUND\nfloat dirDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );\n#else\nfloat dirDiffuseWeight = max( dotProduct, 0.0 );\n#endif\ndirDiffuse  += diffuse * directionalLightColor[ i ] * dirDiffuseWeight;\nvec3 dirHalfVector = normalize( dirVector + viewPosition );\nfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\nfloat dirSpecularWeight = max( pow( dirDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );\ndirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n#else\ndirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight;\n#endif\n}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\n#if MAX_SPOT_LIGHTS > 0\ntotalDiffuse += spotDiffuse;\ntotalSpecular += spotSpecular;\n#endif\n#ifdef METAL\ngl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient + totalSpecular );\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient ) + totalSpecular;\n#endif",
		color_pars_fragment: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
		color_fragment: "#ifdef USE_COLOR\ngl_FragColor = gl_FragColor * vec4( vColor, opacity );\n#endif",
		color_pars_vertex: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
		color_vertex: "#ifdef USE_COLOR\n#ifdef GAMMA_INPUT\nvColor = color * color;\n#else\nvColor = color;\n#endif\n#endif",
		skinning_pars_vertex: "#ifdef USE_SKINNING\nuniform mat4 boneGlobalMatrices[ MAX_BONES ];\n#endif",
		skinning_vertex: "#ifdef USE_SKINNING\ngl_Position  = ( boneGlobalMatrices[ int( skinIndex.x ) ] * skinVertexA ) * skinWeight.x;\ngl_Position += ( boneGlobalMatrices[ int( skinIndex.y ) ] * skinVertexB ) * skinWeight.y;\ngl_Position  = projectionMatrix * modelViewMatrix * gl_Position;\n#endif",
		morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\n#ifndef USE_MORPHNORMALS\nuniform float morphTargetInfluences[ 8 ];\n#else\nuniform float morphTargetInfluences[ 4 ];\n#endif\n#endif",
		morphtarget_vertex: "#ifdef USE_MORPHTARGETS\nvec3 morphed = vec3( 0.0 );\nmorphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\nmorphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\nmorphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\nmorphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n#ifndef USE_MORPHNORMALS\nmorphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\nmorphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\nmorphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\nmorphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n#endif\nmorphed += position;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( morphed, 1.0 );\n#endif",
		default_vertex: "#ifndef USE_MORPHTARGETS\n#ifndef USE_SKINNING\ngl_Position = projectionMatrix * mvPosition;\n#endif\n#endif",
		morphnormal_vertex: "#ifdef USE_MORPHNORMALS\nvec3 morphedNormal = vec3( 0.0 );\nmorphedNormal +=  ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\nmorphedNormal +=  ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\nmorphedNormal +=  ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\nmorphedNormal +=  ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\nmorphedNormal += normal;\nvec3 transformedNormal = normalMatrix * morphedNormal;\n#else\nvec3 transformedNormal = normalMatrix * normal;\n#endif",
		shadowmap_pars_fragment: "#ifdef USE_SHADOWMAP\nuniform sampler2D shadowMap[ MAX_SHADOWS ];\nuniform vec2 shadowMapSize[ MAX_SHADOWS ];\nuniform float shadowDarkness[ MAX_SHADOWS ];\nuniform float shadowBias[ MAX_SHADOWS ];\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nfloat unpackDepth( const in vec4 rgba_depth ) {\nconst vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\nfloat depth = dot( rgba_depth, bit_shift );\nreturn depth;\n}\n#endif",
		shadowmap_fragment: "#ifdef USE_SHADOWMAP\n#ifdef SHADOWMAP_DEBUG\nvec3 frustumColors[3];\nfrustumColors[0] = vec3( 1.0, 0.5, 0.0 );\nfrustumColors[1] = vec3( 0.0, 1.0, 0.8 );\nfrustumColors[2] = vec3( 0.0, 0.5, 1.0 );\n#endif\n#ifdef SHADOWMAP_CASCADE\nint inFrustumCount = 0;\n#endif\nfloat fDepth;\nvec3 shadowColor = vec3( 1.0 );\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;\nbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\nbool inFrustum = all( inFrustumVec );\n#ifdef SHADOWMAP_CASCADE\ninFrustumCount += int( inFrustum );\nbvec3 frustumTestVec = bvec3( inFrustum, inFrustumCount == 1, shadowCoord.z <= 1.0 );\n#else\nbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n#endif\nbool frustumTest = all( frustumTestVec );\nif ( frustumTest ) {\nshadowCoord.z += shadowBias[ i ];\n#ifdef SHADOWMAP_SOFT\nfloat shadow = 0.0;\nconst float shadowDelta = 1.0 / 9.0;\nfloat xPixelOffset = 1.0 / shadowMapSize[ i ].x;\nfloat yPixelOffset = 1.0 / shadowMapSize[ i ].y;\nfloat dx0 = -1.25 * xPixelOffset;\nfloat dy0 = -1.25 * yPixelOffset;\nfloat dx1 = 1.25 * xPixelOffset;\nfloat dy1 = 1.25 * yPixelOffset;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nshadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n#else\nvec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );\nfloat fDepth = unpackDepth( rgbaDepth );\nif ( fDepth < shadowCoord.z )\nshadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );\n#endif\n}\n#ifdef SHADOWMAP_DEBUG\n#ifdef SHADOWMAP_CASCADE\nif ( inFrustum && inFrustumCount == 1 ) gl_FragColor.xyz *= frustumColors[ i ];\n#else\nif ( inFrustum ) gl_FragColor.xyz *= frustumColors[ i ];\n#endif\n#endif\n}\n#ifdef GAMMA_OUTPUT\nshadowColor *= shadowColor;\n#endif\ngl_FragColor.xyz = gl_FragColor.xyz * shadowColor;\n#endif",
		shadowmap_pars_vertex: "#ifdef USE_SHADOWMAP\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nuniform mat4 shadowMatrix[ MAX_SHADOWS ];\n#endif",
		shadowmap_vertex: "#ifdef USE_SHADOWMAP\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\n#ifdef USE_MORPHTARGETS\nvShadowCoord[ i ] = shadowMatrix[ i ] * objectMatrix * vec4( morphed, 1.0 );\n#else\nvShadowCoord[ i ] = shadowMatrix[ i ] * objectMatrix * vec4( position, 1.0 );\n#endif\n}\n#endif",
		alphatest_fragment: "#ifdef ALPHATEST\nif ( gl_FragColor.a < ALPHATEST ) discard;\n#endif",
		linear_to_gamma_fragment: "#ifdef GAMMA_OUTPUT\ngl_FragColor.xyz = sqrt( gl_FragColor.xyz );\n#endif"
	}, THREE.UniformsUtils = {
		merge: function (d) {
			var e, a, b, c = {};
			for (e = 0; e < d.length; e++) {
				for (a in b = this.clone(d[e])) {
					c[a] = b[a]
				}
			}
			return c
		},
		clone: function (d) {
			var e, a, b, c = {};
			for (e in d) {
				for (a in c[e] = {}, d[e]) {
					b = d[e][a], c[e][a] = b instanceof THREE.Color || b instanceof THREE.Vector2 || b instanceof THREE.Vector3 || b instanceof THREE.Vector4 || b instanceof THREE.Matrix4 || b instanceof THREE.Texture ? b.clone() : b instanceof Array ? b.slice() : b
				}
			}
			return c
		}
	}, THREE.UniformsLib = {
		common: {
			diffuse: {
				type: "c",
				value: new THREE.Color(15658734)
			},
			opacity: {
				type: "f",
				value: 1
			},
			map: {
				type: "t",
				value: 0,
				texture: null
			},
			offsetRepeat: {
				type: "v4",
				value: new THREE.Vector4(0, 0, 1, 1)
			},
			lightMap: {
				type: "t",
				value: 2,
				texture: null
			},
			envMap: {
				type: "t",
				value: 1,
				texture: null
			},
			flipEnvMap: {
				type: "f",
				value: -1
			},
			useRefract: {
				type: "i",
				value: 0
			},
			reflectivity: {
				type: "f",
				value: 1
			},
			refractionRatio: {
				type: "f",
				value: 0.98
			},
			combine: {
				type: "i",
				value: 0
			},
			morphTargetInfluences: {
				type: "f",
				value: 0
			}
		},
		fog: {
			fogDensity: {
				type: "f",
				value: 0.00025
			},
			fogNear: {
				type: "f",
				value: 1
			},
			fogFar: {
				type: "f",
				value: 2000
			},
			fogColor: {
				type: "c",
				value: new THREE.Color(16777215)
			}
		},
		lights: {
			ambientLightColor: {
				type: "fv",
				value: []
			},
			directionalLightDirection: {
				type: "fv",
				value: []
			},
			directionalLightColor: {
				type: "fv",
				value: []
			},
			pointLightColor: {
				type: "fv",
				value: []
			},
			pointLightPosition: {
				type: "fv",
				value: []
			},
			pointLightDistance: {
				type: "fv1",
				value: []
			},
			spotLightColor: {
				type: "fv",
				value: []
			},
			spotLightPosition: {
				type: "fv",
				value: []
			},
			spotLightDirection: {
				type: "fv",
				value: []
			},
			spotLightDistance: {
				type: "fv1",
				value: []
			},
			spotLightAngle: {
				type: "fv1",
				value: []
			},
			spotLightExponent: {
				type: "fv1",
				value: []
			}
		},
		particle: {
			psColor: {
				type: "c",
				value: new THREE.Color(15658734)
			},
			opacity: {
				type: "f",
				value: 1
			},
			size: {
				type: "f",
				value: 1
			},
			scale: {
				type: "f",
				value: 1
			},
			map: {
				type: "t",
				value: 0,
				texture: null
			},
			fogDensity: {
				type: "f",
				value: 0.00025
			},
			fogNear: {
				type: "f",
				value: 1
			},
			fogFar: {
				type: "f",
				value: 2000
			},
			fogColor: {
				type: "c",
				value: new THREE.Color(16777215)
			}
		},
		shadowmap: {
			shadowMap: {
				type: "tv",
				value: 6,
				texture: []
			},
			shadowMapSize: {
				type: "v2v",
				value: []
			},
			shadowBias: {
				type: "fv1",
				value: []
			},
			shadowDarkness: {
				type: "fv1",
				value: []
			},
			shadowMatrix: {
				type: "m4v",
				value: []
			}
		}
	}, THREE.ShaderLib = {
		depth: {
			uniforms: {
				mNear: {
					type: "f",
					value: 1
				},
				mFar: {
					type: "f",
					value: 2000
				},
				opacity: {
					type: "f",
					value: 1
				}
			},
			vertexShader: "void main() {\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
			fragmentShader: "uniform float mNear;\nuniform float mFar;\nuniform float opacity;\nvoid main() {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat color = 1.0 - smoothstep( mNear, mFar, depth );\ngl_FragColor = vec4( vec3( color ), opacity );\n}"
		},
		normal: {
			uniforms: {
				opacity: {
					type: "f",
					value: 1
				}
			},
			vertexShader: "varying vec3 vNormal;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvNormal = normalMatrix * normal;\ngl_Position = projectionMatrix * mvPosition;\n}",
			fragmentShader: "uniform float opacity;\nvarying vec3 vNormal;\nvoid main() {\ngl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );\n}"
		},
		basic: {
			uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, THREE.UniformsLib.shadowmap]),
			vertexShader: [THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
			fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, "void main() {\ngl_FragColor = vec4( diffuse, opacity );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n")
		},
		lambert: {
			uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap, {
				ambient: {
					type: "c",
					value: new THREE.Color(16777215)
				},
				emissive: {
					type: "c",
					value: new THREE.Color(0)
				},
				wrapRGB: {
					type: "v3",
					value: new THREE.Vector3(1, 1, 1)
				}
			}]),
			vertexShader: ["varying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif", THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_lambert_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.morphnormal_vertex, "#ifndef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\n#endif", THREE.ShaderChunk.lights_lambert_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
			fragmentShader: ["uniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, "void main() {\ngl_FragColor = vec4( vec3 ( 1.0 ), opacity );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.alphatest_fragment, "#ifdef DOUBLE_SIDED\nif ( gl_FrontFacing )\ngl_FragColor.xyz *= vLightFront;\nelse\ngl_FragColor.xyz *= vLightBack;\n#else\ngl_FragColor.xyz *= vLightFront;\n#endif", THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n")
		},
		phong: {
			uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap, {
				ambient: {
					type: "c",
					value: new THREE.Color(16777215)
				},
				emissive: {
					type: "c",
					value: new THREE.Color(0)
				},
				specular: {
					type: "c",
					value: new THREE.Color(1118481)
				},
				shininess: {
					type: "f",
					value: 30
				},
				wrapRGB: {
					type: "v3",
					value: new THREE.Vector3(1, 1, 1)
				}
			}]),
			vertexShader: ["varying vec3 vViewPosition;\nvarying vec3 vNormal;", THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_phong_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.color_vertex, "#ifndef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\n#endif\nvViewPosition = -mvPosition.xyz;", THREE.ShaderChunk.morphnormal_vertex, "vNormal = transformedNormal;", THREE.ShaderChunk.lights_phong_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
			fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;\nuniform vec3 ambient;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.lights_phong_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, "void main() {\ngl_FragColor = vec4( vec3 ( 1.0 ), opacity );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.lights_phong_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n")
		},
		particle_basic: {
			uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.particle, THREE.UniformsLib.shadowmap]),
			vertexShader: ["uniform float size;\nuniform float scale;", THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {", THREE.ShaderChunk.color_vertex, "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n#ifdef USE_SIZEATTENUATION\ngl_PointSize = size * ( scale / length( mvPosition.xyz ) );\n#else\ngl_PointSize = size;\n#endif\ngl_Position = projectionMatrix * mvPosition;", THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
			fragmentShader: ["uniform vec3 psColor;\nuniform float opacity;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_particle_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, "void main() {\ngl_FragColor = vec4( psColor, opacity );", THREE.ShaderChunk.map_particle_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n")
		},
		depthRGBA: {
			uniforms: {},
			vertexShader: [THREE.ShaderChunk.morphtarget_pars_vertex, "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, "}"].join("\n"),
			fragmentShader: "vec4 pack_depth( const in float depth ) {\nconst vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );\nconst vec4 bit_mask  = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );\nvec4 res = fract( depth * bit_shift );\nres -= res.xxyz * bit_mask;\nreturn res;\n}\nvoid main() {\ngl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );\n}"
		}
	}, THREE.WebGLRenderer = function (aq) {
		function ar(N, S) {
			var V = N.vertices.length,
				x = S.material;
			if (x.attributes) {
				for (var B in void 0 === N.__webglCustomAttributesList && (N.__webglCustomAttributesList = []), x.attributes) {
					var I = x.attributes[B];
					if (!I.__webglInitialized || I.createUniqueBuffers) {
						I.__webglInitialized = !0;
						var L = 1;
						"v2" === I.type ? L = 2 : "v3" === I.type ? L = 3 : "v4" === I.type ? L = 4 : "c" === I.type && (L = 3), I.size = L, I.array = new Float32Array(V * L), I.buffer = az.createBuffer(), I.buffer.belongsToAttribute = B, I.needsUpdate = !0
					}
					N.__webglCustomAttributesList.push(I)
				}
			}
		}

		function at(x, B) {
			return !x.material || x.material instanceof THREE.MeshFaceMaterial ? 0 <= B.materialIndex ? x.geometry.materials[B.materialIndex] : void 0 : x.material
		}

		function au(x) {
			return !(x instanceof THREE.MeshBasicMaterial && !x.envMap || x instanceof THREE.MeshDepthMaterial) && (x && void 0 !== x.shading && x.shading === THREE.SmoothShading ? THREE.SmoothShading : THREE.FlatShading)
		}

		function av(x) {
			return !!(x.map || x.lightMap || x instanceof THREE.ShaderMaterial)
		}

		function aw(aA, aC, aE) {
			var aG, B, I, L, S = aA.vertices;
			L = S.length;
			var V = aA.colors,
				W = V.length,
				X = aA.__vertexArray,
				aB = aA.__colorArray,
				aD = aA.__sortArray,
				x = aA.verticesNeedUpdate,
				aF = aA.colorsNeedUpdate,
				N = aA.__webglCustomAttributesList;
			if (aE.sortParticles) {
				for (U.copy(h), U.multiplySelf(aE.matrixWorld), aG = 0; aG < L; aG++) {
					B = S[aG], u.copy(B), U.multiplyVector3(u), aD[aG] = [u.z, aG]
				}
				for (aD.sort(function (aH, aI) {
						return aI[0] - aH[0]
					}), aG = 0; aG < L; aG++) {
					B = S[aD[aG][1]], X[I = 3 * aG] = B.x, X[I + 1] = B.y, X[I + 2] = B.z
				}
				for (aG = 0; aG < W; aG++) {
					I = 3 * aG, B = V[aD[aG][1]], aB[I] = B.r, aB[I + 1] = B.g, aB[I + 2] = B.b
				}
				if (N) {
					for (V = 0, W = N.length; V < W; V++) {
						if (void 0 === (S = N[V]).boundTo || "vertices" === S.boundTo) {
							if (I = 0, B = S.value.length, 1 === S.size) {
								for (aG = 0; aG < B; aG++) {
									L = aD[aG][1], S.array[aG] = S.value[L]
								}
							} else {
								if (2 === S.size) {
									for (aG = 0; aG < B; aG++) {
										L = aD[aG][1], L = S.value[L], S.array[I] = L.x, S.array[I + 1] = L.y, I += 2
									}
								} else {
									if (3 === S.size) {
										if ("c" === S.type) {
											for (aG = 0; aG < B; aG++) {
												L = aD[aG][1], L = S.value[L], S.array[I] = L.r, S.array[I + 1] = L.g, S.array[I + 2] = L.b, I += 3
											}
										} else {
											for (aG = 0; aG < B; aG++) {
												L = aD[aG][1], L = S.value[L], S.array[I] = L.x, S.array[I + 1] = L.y, S.array[I + 2] = L.z, I += 3
											}
										}
									} else {
										if (4 === S.size) {
											for (aG = 0; aG < B; aG++) {
												L = aD[aG][1], L = S.value[L], S.array[I] = L.x, S.array[I + 1] = L.y, S.array[I + 2] = L.z, S.array[I + 3] = L.w, I += 4
											}
										}
									}
								}
							}
						}
					}
				}
			} else {
				if (x) {
					for (aG = 0; aG < L; aG++) {
						B = S[aG], X[I = 3 * aG] = B.x, X[I + 1] = B.y, X[I + 2] = B.z
					}
				}
				if (aF) {
					for (aG = 0; aG < W; aG++) {
						B = V[aG], aB[I = 3 * aG] = B.r, aB[I + 1] = B.g, aB[I + 2] = B.b
					}
				}
				if (N) {
					for (V = 0, W = N.length; V < W; V++) {
						if ((S = N[V]).needsUpdate && (void 0 === S.boundTo || "vertices" === S.boundTo)) {
							if (B = S.value.length, I = 0, 1 === S.size) {
								for (aG = 0; aG < B; aG++) {
									S.array[aG] = S.value[aG]
								}
							} else {
								if (2 === S.size) {
									for (aG = 0; aG < B; aG++) {
										L = S.value[aG], S.array[I] = L.x, S.array[I + 1] = L.y, I += 2
									}
								} else {
									if (3 === S.size) {
										if ("c" === S.type) {
											for (aG = 0; aG < B; aG++) {
												L = S.value[aG], S.array[I] = L.r, S.array[I + 1] = L.g, S.array[I + 2] = L.b, I += 3
											}
										} else {
											for (aG = 0; aG < B; aG++) {
												L = S.value[aG], S.array[I] = L.x, S.array[I + 1] = L.y, S.array[I + 2] = L.z, I += 3
											}
										}
									} else {
										if (4 === S.size) {
											for (aG = 0; aG < B; aG++) {
												L = S.value[aG], S.array[I] = L.x, S.array[I + 1] = L.y, S.array[I + 2] = L.z, S.array[I + 3] = L.w, I += 4
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if ((x || aE.sortParticles) && (az.bindBuffer(az.ARRAY_BUFFER, aA.__webglVertexBuffer), az.bufferData(az.ARRAY_BUFFER, X, aC)), (aF || aE.sortParticles) && (az.bindBuffer(az.ARRAY_BUFFER, aA.__webglColorBuffer), az.bufferData(az.ARRAY_BUFFER, aB, aC)), N) {
				for (V = 0, W = N.length; V < W; V++) {
					((S = N[V]).needsUpdate || aE.sortParticles) && (az.bindBuffer(az.ARRAY_BUFFER, S.buffer), az.bufferData(az.ARRAY_BUFFER, S.array, aC))
				}
			}
		}

		function ax(x, B) {
			return B.z - x.z
		}

		function ay(L, N, x) {
			if (L.length) {
				for (var B = 0, I = L.length; B < I; B++) {
					ap = g = null, o = q = D = aj = d = P = H = -1, ao = !0, L[B].render(N, x, F, k), ap = g = null, o = q = D = aj = d = P = H = -1, ao = !0
				}
			}
		}

		function J(N, V, W, X, aA, aB, aC, aD) {
			var x, B, I, L;
			V ? (B = N.length - 1, L = V = -1) : (B = 0, V = N.length, L = 1);
			for (var S = B; S !== V; S += L) {
				if ((x = N[S]).render) {
					if (B = x.object, I = x.buffer, aD) {
						x = aD
					} else {
						if (!(x = x[W])) {
							continue
						}
						aC && s.setBlending(x.blending, x.blendEquation, x.blendSrc, x.blendDst), s.setDepthTest(x.depthTest), s.setDepthWrite(x.depthWrite), ac(x.polygonOffset, x.polygonOffsetFactor, x.polygonOffsetUnits)
					}
					s.setObjectFaces(B), I instanceof THREE.BufferGeometry ? s.renderBufferDirect(X, aA, aB, x, I, B) : s.renderBuffer(X, aA, aB, x, I, B)
				}
			}
		}

		function M(W, X, aA, aB, x, B, I) {
			for (var L, N, S = 0, V = W.length; S < V; S++) {
				if ((N = (L = W[S]).object).visible) {
					if (I) {
						L = I
					} else {
						if (!(L = L[X])) {
							continue
						}
						B && s.setBlending(L.blending, L.blendEquation, L.blendSrc, L.blendDst), s.setDepthTest(L.depthTest), s.setDepthWrite(L.depthWrite), ac(L.polygonOffset, L.polygonOffsetFactor, L.polygonOffsetUnits)
					}
					s.renderImmediateObject(aA, aB, x, L, N)
				}
			}
		}

		function K(B, I, x) {
			B.push({
				buffer: I,
				object: x,
				opaque: null,
				transparent: null
			})
		}

		function T(x) {
			for (var B in x.attributes) {
				if (x.attributes[B].needsUpdate) {
					return !0
				}
			}
			return !1
		}

		function O(x) {
			for (var B in x.attributes) {
				x.attributes[B].needsUpdate = !1
			}
		}

		function R(B, I) {
			for (var x = B.length - 1; 0 <= x; x--) {
				B[x].object === I && B.splice(x, 1)
			}
		}

		function Y(B, I) {
			for (var x = B.length - 1; 0 <= x; x--) {
				B[x] === I && B.splice(x, 1)
			}
		}

		function Q(aR, aS, aT, aV, aW) {
			if (aV.program && !aV.needsUpdate || (s.initMaterial(aV, aS, aT, aW), aV.needsUpdate = !1), aV.morphTargets && !aW.__webglMorphTargetInfluences) {
				aW.__webglMorphTargetInfluences = new Float32Array(s.maxMorphTargets);
				for (var aX = 0, x = s.maxMorphTargets; aX < x; aX++) {
					aW.__webglMorphTargetInfluences[aX] = 0
				}
			}
			var B = !1,
				I = (x = (aX = aV.program).uniforms, aV.uniforms);
			if (aX !== g && (az.useProgram(aX), g = aX, B = !0), aV.id !== o && (o = aV.id, B = !0), (B || aR !== ap) && (az.uniformMatrix4fv(x.projectionMatrix, !1, aR._projectionMatrixArray), aR !== ap && (ap = aR)), B) {
				if (aT && aV.fog && (I.fogColor.value = aT.color, aT instanceof THREE.Fog ? (I.fogNear.value = aT.near, I.fogFar.value = aT.far) : aT instanceof THREE.FogExp2 && (I.fogDensity.value = aT.density)), aV instanceof THREE.MeshPhongMaterial || aV instanceof THREE.MeshLambertMaterial || aV.lights) {
					if (ao) {
						var N, aC, aA, aF, V = 0,
							W = 0,
							X = 0,
							aH = a,
							aK = aH.directional.colors,
							L = aH.directional.positions,
							S = aH.point.colors,
							aE = aH.point.positions,
							aG = aH.point.distances,
							aM = aH.spot.colors,
							aD = aH.spot.positions,
							aI = aH.spot.distances,
							aU = aH.spot.directions,
							aB = aH.spot.angles,
							aJ = aH.spot.exponents,
							aN = 0,
							aQ = 0,
							aO = 0,
							aL = aF = 0;
						for (aT = aL = 0, B = aS.length; aT < B; aT++) {
							(N = aS[aT]).onlyShadow || (aC = N.color, aA = N.intensity, aF = N.distance, N instanceof THREE.AmbientLight ? s.gammaInput ? (V += aC.r * aC.r, W += aC.g * aC.g, X += aC.b * aC.b) : (V += aC.r, W += aC.g, X += aC.b) : N instanceof THREE.DirectionalLight ? (aF = 3 * aN, s.gammaInput ? (aK[aF] = aC.r * aC.r * aA * aA, aK[aF + 1] = aC.g * aC.g * aA * aA, aK[aF + 2] = aC.b * aC.b * aA * aA) : (aK[aF] = aC.r * aA, aK[aF + 1] = aC.g * aA, aK[aF + 2] = aC.b * aA), j.copy(N.matrixWorld.getPosition()), j.subSelf(N.target.matrixWorld.getPosition()), j.normalize(), L[aF] = j.x, L[aF + 1] = j.y, L[aF + 2] = j.z, aN += 1) : N instanceof THREE.PointLight ? (aL = 3 * aQ, s.gammaInput ? (S[aL] = aC.r * aC.r * aA * aA, S[aL + 1] = aC.g * aC.g * aA * aA, S[aL + 2] = aC.b * aC.b * aA * aA) : (S[aL] = aC.r * aA, S[aL + 1] = aC.g * aA, S[aL + 2] = aC.b * aA), aC = N.matrixWorld.getPosition(), aE[aL] = aC.x, aE[aL + 1] = aC.y, aE[aL + 2] = aC.z, aG[aQ] = aF, aQ += 1) : N instanceof THREE.SpotLight && (aL = 3 * aO, s.gammaInput ? (aM[aL] = aC.r * aC.r * aA * aA, aM[aL + 1] = aC.g * aC.g * aA * aA, aM[aL + 2] = aC.b * aC.b * aA * aA) : (aM[aL] = aC.r * aA, aM[aL + 1] = aC.g * aA, aM[aL + 2] = aC.b * aA), aC = N.matrixWorld.getPosition(), aD[aL] = aC.x, aD[aL + 1] = aC.y, aD[aL + 2] = aC.z, aI[aO] = aF, j.copy(aC), j.subSelf(N.target.matrixWorld.getPosition()), j.normalize(), aU[aL] = j.x, aU[aL + 1] = j.y, aU[aL + 2] = j.z, aB[aO] = Math.cos(N.angle), aJ[aO] = N.exponent, aO += 1))
						}
						for (aT = 3 * aN, B = aK.length; aT < B; aT++) {
							aK[aT] = 0
						}
						for (aT = 3 * aQ, B = S.length; aT < B; aT++) {
							S[aT] = 0
						}
						for (aT = 3 * aO, B = aM.length; aT < B; aT++) {
							aM[aT] = 0
						}
						aH.directional.length = aN, aH.point.length = aQ, aH.spot.length = aO, aH.ambient[0] = V, aH.ambient[1] = W, aH.ambient[2] = X, ao = !1
					}
					aT = a, I.ambientLightColor.value = aT.ambient, I.directionalLightColor.value = aT.directional.colors, I.directionalLightDirection.value = aT.directional.positions, I.pointLightColor.value = aT.point.colors, I.pointLightPosition.value = aT.point.positions, I.pointLightDistance.value = aT.point.distances, I.spotLightColor.value = aT.spot.colors, I.spotLightPosition.value = aT.spot.positions, I.spotLightDistance.value = aT.spot.distances, I.spotLightDirection.value = aT.spot.directions, I.spotLightAngle.value = aT.spot.angles, I.spotLightExponent.value = aT.spot.exponents
				}
				if ((aV instanceof THREE.MeshBasicMaterial || aV instanceof THREE.MeshLambertMaterial || aV instanceof THREE.MeshPhongMaterial) && (I.opacity.value = aV.opacity, s.gammaInput ? I.diffuse.value.copyGammaToLinear(aV.color) : I.diffuse.value = aV.color, (I.map.texture = aV.map) && I.offsetRepeat.value.set(aV.map.offset.x, aV.map.offset.y, aV.map.repeat.x, aV.map.repeat.y), I.lightMap.texture = aV.lightMap, I.envMap.texture = aV.envMap, I.flipEnvMap.value = aV.envMap instanceof THREE.WebGLRenderTargetCube ? 1 : -1, I.reflectivity.value = aV.reflectivity, I.refractionRatio.value = aV.refractionRatio, I.combine.value = aV.combine, I.useRefract.value = aV.envMap && aV.envMap.mapping instanceof THREE.CubeRefractionMapping), aV instanceof THREE.LineBasicMaterial ? (I.diffuse.value = aV.color, I.opacity.value = aV.opacity) : aV instanceof THREE.ParticleBasicMaterial ? (I.psColor.value = aV.color, I.opacity.value = aV.opacity, I.size.value = aV.size, I.scale.value = p.height / 2, I.map.texture = aV.map) : aV instanceof THREE.MeshPhongMaterial ? (I.shininess.value = aV.shininess, s.gammaInput ? (I.ambient.value.copyGammaToLinear(aV.ambient), I.emissive.value.copyGammaToLinear(aV.emissive), I.specular.value.copyGammaToLinear(aV.specular)) : (I.ambient.value = aV.ambient, I.emissive.value = aV.emissive, I.specular.value = aV.specular), aV.wrapAround && I.wrapRGB.value.copy(aV.wrapRGB)) : aV instanceof THREE.MeshLambertMaterial ? (s.gammaInput ? (I.ambient.value.copyGammaToLinear(aV.ambient), I.emissive.value.copyGammaToLinear(aV.emissive)) : (I.ambient.value = aV.ambient, I.emissive.value = aV.emissive), aV.wrapAround && I.wrapRGB.value.copy(aV.wrapRGB)) : aV instanceof THREE.MeshDepthMaterial ? (I.mNear.value = aR.near, I.mFar.value = aR.far, I.opacity.value = aV.opacity) : aV instanceof THREE.MeshNormalMaterial && (I.opacity.value = aV.opacity), aW.receiveShadow && !aV._shadowPass && I.shadowMatrix) {
					for (B = aT = 0, N = aS.length; B < N; B++) {
						(V = aS[B]).castShadow && (V instanceof THREE.SpotLight || V instanceof THREE.DirectionalLight && !V.shadowCascade) && (I.shadowMap.texture[aT] = V.shadowMap, I.shadowMapSize.value[aT] = V.shadowMapSize, I.shadowMatrix.value[aT] = V.shadowMatrix, I.shadowDarkness.value[aT] = V.shadowDarkness, I.shadowBias.value[aT] = V.shadowBias, aT++)
					}
				}
				for (I = 0, aT = (aS = aV.uniformsList).length; I < aT; I++) {
					if (V = aX.uniforms[aS[I][1]]) {
						switch (W = (B = aS[I][0]).type, N = B.value, W) {
							case "i":
								az.uniform1i(V, N);
								break;
							case "f":
								az.uniform1f(V, N);
								break;
							case "v2":
								az.uniform2f(V, N.x, N.y);
								break;
							case "v3":
								az.uniform3f(V, N.x, N.y, N.z);
								break;
							case "v4":
								az.uniform4f(V, N.x, N.y, N.z, N.w);
								break;
							case "c":
								az.uniform3f(V, N.r, N.g, N.b);
								break;
							case "fv1":
								az.uniform1fv(V, N);
								break;
							case "fv":
								az.uniform3fv(V, N);
								break;
							case "v2v":
								for (B._array || (B._array = new Float32Array(2 * N.length)), W = 0, X = N.length; W < X; W++) {
									aH = 2 * W, B._array[aH] = N[W].x, B._array[aH + 1] = N[W].y
								}
								az.uniform2fv(V, B._array);
								break;
							case "v3v":
								for (B._array || (B._array = new Float32Array(3 * N.length)), W = 0, X = N.length; W < X; W++) {
									aH = 3 * W, B._array[aH] = N[W].x, B._array[aH + 1] = N[W].y, B._array[aH + 2] = N[W].z
								}
								az.uniform3fv(V, B._array);
								break;
							case "v4v":
								for (B._array || (B._array = new Float32Array(4 * N.length)), W = 0, X = N.length; W < X; W++) {
									aH = 4 * W, B._array[aH] = N[W].x, B._array[aH + 1] = N[W].y, B._array[aH + 2] = N[W].z, B._array[aH + 3] = N[W].w
								}
								az.uniform4fv(V, B._array);
								break;
							case "m4":
								B._array || (B._array = new Float32Array(16)), N.flattenToArray(B._array), az.uniformMatrix4fv(V, !1, B._array);
								break;
							case "m4v":
								for (B._array || (B._array = new Float32Array(16 * N.length)), W = 0, X = N.length; W < X; W++) {
									N[W].flattenToArrayOffset(B._array, 16 * W)
								}
								az.uniformMatrix4fv(V, !1, B._array);
								break;
							case "t":
								if (az.uniform1i(V, N), !(V = B.texture)) {
									continue
								}
								if (V.image instanceof Array && 6 === V.image.length) {
									if (6 === (B = V).image.length) {
										if (B.needsUpdate) {
											for (B.image.__webglTextureCube || (B.image.__webglTextureCube = az.createTexture()), az.activeTexture(az.TEXTURE0 + N), az.bindTexture(az.TEXTURE_CUBE_MAP, B.image.__webglTextureCube), N = [], V = 0; V < 6; V++) {
												W = N, X = V, s.autoScaleCubemaps ? (aH = B.image[V], L = ak, aH.width <= L && aH.height <= L || (S = Math.max(aH.width, aH.height), aK = Math.floor(aH.width * L / S), L = Math.floor(aH.height * L / S), (S = document.createElement("canvas")).width = aK, S.height = L, S.getContext("2d").drawImage(aH, 0, 0, aH.width, aH.height, 0, 0, aK, L), aH = S)) : aH = B.image[V], W[X] = aH
											}
											for (W = 0 == ((V = N[0]).width & V.width - 1) && 0 == (V.height & V.height - 1), X = t(B.format), aH = t(B.type), ag(az.TEXTURE_CUBE_MAP, B, W), V = 0; V < 6; V++) {
												az.texImage2D(az.TEXTURE_CUBE_MAP_POSITIVE_X + V, 0, X, X, aH, N[V])
											}
											B.generateMipmaps && W && az.generateMipmap(az.TEXTURE_CUBE_MAP), B.needsUpdate = !1, B.onUpdate && B.onUpdate()
										} else {
											az.activeTexture(az.TEXTURE0 + N), az.bindTexture(az.TEXTURE_CUBE_MAP, B.image.__webglTextureCube)
										}
									}
								} else {
									V instanceof THREE.WebGLRenderTargetCube ? (B = V, az.activeTexture(az.TEXTURE0 + N), az.bindTexture(az.TEXTURE_CUBE_MAP, B.__webglTexture)) : s.setTexture(V, N)
								}
								break;
							case "tv":
								if (!B._array) {
									for (B._array = [], W = 0, X = B.texture.length; W < X; W++) {
										B._array[W] = N + W
									}
								}
								for (az.uniform1iv(V, B._array), W = 0, X = B.texture.length; W < X; W++) {
									(V = B.texture[W]) && s.setTexture(V, B._array[W])
								}
						}
					}
				}(aV instanceof THREE.ShaderMaterial || aV instanceof THREE.MeshPhongMaterial || aV.envMap) && null !== x.cameraPosition && (aS = aR.matrixWorld.getPosition(), az.uniform3f(x.cameraPosition, aS.x, aS.y, aS.z)), (aV instanceof THREE.MeshPhongMaterial || aV instanceof THREE.MeshLambertMaterial || aV instanceof THREE.ShaderMaterial || aV.skinning) && null !== x.viewMatrix && az.uniformMatrix4fv(x.viewMatrix, !1, aR._viewMatrixArray), aV.skinning && az.uniformMatrix4fv(x.boneGlobalMatrices, !1, aW.boneMatrices)
			}
			return az.uniformMatrix4fv(x.modelViewMatrix, !1, aW._modelViewMatrix.elements), x.normalMatrix && az.uniformMatrix3fv(x.normalMatrix, !1, aW._normalMatrix.elements), null !== x.objectMatrix && az.uniformMatrix4fv(x.objectMatrix, !1, aW.matrixWorld.elements), aX
		}

		function Z(x, B) {
			x._modelViewMatrix.multiply(B.matrixWorldInverse, x.matrixWorld), x._normalMatrix.getInverse(x._modelViewMatrix), x._normalMatrix.transpose()
		}

		function ac(B, I, x) {
			y !== B && (B ? az.enable(az.POLYGON_OFFSET_FILL) : az.disable(az.POLYGON_OFFSET_FILL), y = B), !B || C === I && aP === x || (az.polygonOffset(I, x), C = I, aP = x)
		}

		function ab(B, I) {
			var x;
			return "fragment" === B ? x = az.createShader(az.FRAGMENT_SHADER) : "vertex" === B && (x = az.createShader(az.VERTEX_SHADER)), az.shaderSource(x, I), az.compileShader(x), az.getShaderParameter(x, az.COMPILE_STATUS) ? x : (console.error(az.getShaderInfoLog(x)), console.error(I), null)
		}

		function ag(B, I, x) {
			x ? (az.texParameteri(B, az.TEXTURE_WRAP_S, t(I.wrapS)), az.texParameteri(B, az.TEXTURE_WRAP_T, t(I.wrapT)), az.texParameteri(B, az.TEXTURE_MAG_FILTER, t(I.magFilter)), az.texParameteri(B, az.TEXTURE_MIN_FILTER, t(I.minFilter))) : (az.texParameteri(B, az.TEXTURE_WRAP_S, az.CLAMP_TO_EDGE), az.texParameteri(B, az.TEXTURE_WRAP_T, az.CLAMP_TO_EDGE), az.texParameteri(B, az.TEXTURE_MAG_FILTER, af(I.magFilter)), az.texParameteri(B, az.TEXTURE_MIN_FILTER, af(I.minFilter)))
		}

		function aa(x, B) {
			az.bindRenderbuffer(az.RENDERBUFFER, x), B.depthBuffer && !B.stencilBuffer ? (az.renderbufferStorage(az.RENDERBUFFER, az.DEPTH_COMPONENT16, B.width, B.height), az.framebufferRenderbuffer(az.FRAMEBUFFER, az.DEPTH_ATTACHMENT, az.RENDERBUFFER, x)) : B.depthBuffer && B.stencilBuffer ? (az.renderbufferStorage(az.RENDERBUFFER, az.DEPTH_STENCIL, B.width, B.height), az.framebufferRenderbuffer(az.FRAMEBUFFER, az.DEPTH_STENCIL_ATTACHMENT, az.RENDERBUFFER, x)) : az.renderbufferStorage(az.RENDERBUFFER, az.RGBA4, B.width, B.height)
		}

		function af(x) {
			switch (x) {
				case THREE.NearestFilter:
				case THREE.NearestMipMapNearestFilter:
				case THREE.NearestMipMapLinearFilter:
					return az.NEAREST;
				default:
					return az.LINEAR
			}
		}

		function t(x) {
			switch (x) {
				case THREE.RepeatWrapping:
					return az.REPEAT;
				case THREE.ClampToEdgeWrapping:
					return az.CLAMP_TO_EDGE;
				case THREE.MirroredRepeatWrapping:
					return az.MIRRORED_REPEAT;
				case THREE.NearestFilter:
					return az.NEAREST;
				case THREE.NearestMipMapNearestFilter:
					return az.NEAREST_MIPMAP_NEAREST;
				case THREE.NearestMipMapLinearFilter:
					return az.NEAREST_MIPMAP_LINEAR;
				case THREE.LinearFilter:
					return az.LINEAR;
				case THREE.LinearMipMapNearestFilter:
					return az.LINEAR_MIPMAP_NEAREST;
				case THREE.LinearMipMapLinearFilter:
					return az.LINEAR_MIPMAP_LINEAR;
				case THREE.ByteType:
					return az.BYTE;
				case THREE.UnsignedByteType:
					return az.UNSIGNED_BYTE;
				case THREE.ShortType:
					return az.SHORT;
				case THREE.UnsignedShortType:
					return az.UNSIGNED_SHORT;
				case THREE.IntType:
					return az.INT;
				case THREE.UnsignedIntType:
					return az.UNSIGNED_INT;
				case THREE.FloatType:
					return az.FLOAT;
				case THREE.AlphaFormat:
					return az.ALPHA;
				case THREE.RGBFormat:
					return az.RGB;
				case THREE.RGBAFormat:
					return az.RGBA;
				case THREE.LuminanceFormat:
					return az.LUMINANCE;
				case THREE.LuminanceAlphaFormat:
					return az.LUMINANCE_ALPHA;
				case THREE.AddEquation:
					return az.FUNC_ADD;
				case THREE.SubtractEquation:
					return az.FUNC_SUBTRACT;
				case THREE.ReverseSubtractEquation:
					return az.FUNC_REVERSE_SUBTRACT;
				case THREE.ZeroFactor:
					return az.ZERO;
				case THREE.OneFactor:
					return az.ONE;
				case THREE.SrcColorFactor:
					return az.SRC_COLOR;
				case THREE.OneMinusSrcColorFactor:
					return az.ONE_MINUS_SRC_COLOR;
				case THREE.SrcAlphaFactor:
					return az.SRC_ALPHA;
				case THREE.OneMinusSrcAlphaFactor:
					return az.ONE_MINUS_SRC_ALPHA;
				case THREE.DstAlphaFactor:
					return az.DST_ALPHA;
				case THREE.OneMinusDstAlphaFactor:
					return az.ONE_MINUS_DST_ALPHA;
				case THREE.DstColorFactor:
					return az.DST_COLOR;
				case THREE.OneMinusDstColorFactor:
					return az.ONE_MINUS_DST_COLOR;
				case THREE.SrcAlphaSaturateFactor:
					return az.SRC_ALPHA_SATURATE
			}
			return 0
		}
		var p = void 0 !== (aq = aq || {}).canvas ? aq.canvas : document.createElement("canvas"),
			ai = void 0 !== aq.precision ? aq.precision : "highp",
			ad = void 0 === aq.alpha || aq.alpha,
			l = void 0 === aq.premultipliedAlpha || aq.premultipliedAlpha,
			w = void 0 !== aq.antialias && aq.antialias,
			z = void 0 === aq.stencil || aq.stencil,
			c = void 0 !== aq.preserveDrawingBuffer && aq.preserveDrawingBuffer,
			G = void 0 !== aq.clearColor ? new THREE.Color(aq.clearColor) : new THREE.Color(0),
			n = void 0 !== aq.clearAlpha ? aq.clearAlpha : 0,
			A = void 0 !== aq.maxLights ? aq.maxLights : 4;
		this.domElement = p, this.context = null, this.autoUpdateScene = this.autoUpdateObjects = this.sortObjects = this.autoClearStencil = this.autoClearDepth = this.autoClearColor = this.autoClear = !0, this.shadowMapEnabled = this.physicallyBasedShading = this.gammaOutput = this.gammaInput = !1, this.shadowMapCullFrontFaces = this.shadowMapSoft = this.shadowMapAutoUpdate = !0, this.shadowMapCascade = this.shadowMapDebug = !1, this.maxMorphTargets = 8, this.maxMorphNormals = 4, this.autoScaleCubemaps = !0, this.renderPluginsPre = [], this.renderPluginsPost = [], this.info = {
			memory: {
				programs: 0,
				geometries: 0,
				textures: 0
			},
			render: {
				calls: 0,
				vertices: 0,
				faces: 0,
				points: 0
			}
		};
		var az, s = this,
			e = [],
			g = null,
			m = null,
			o = -1,
			q = null,
			ap = null,
			al = 0,
			aj = -1,
			D = -1,
			H = -1,
			r = -1,
			am = -1,
			v = -1,
			P = -1,
			d = -1,
			y = null,
			C = null,
			aP = null,
			b = null,
			f = 0,
			ah = 0,
			i = 0,
			E = 0,
			F = 0,
			k = 0,
			an = new THREE.Frustum,
			h = new THREE.Matrix4,
			U = new THREE.Matrix4,
			u = new THREE.Vector4,
			j = new THREE.Vector3,
			ao = !0,
			a = {
				ambient: [0, 0, 0],
				directional: {
					length: 0,
					colors: [],
					positions: []
				},
				point: {
					length: 0,
					colors: [],
					positions: [],
					distances: []
				},
				spot: {
					length: 0,
					colors: [],
					positions: [],
					distances: [],
					directions: [],
					angles: [],
					exponents: []
				}
			};
		(az = function () {
			var x;
			try {
				if (!(x = p.getContext("experimental-webgl", {
						alpha: ad,
						premultipliedAlpha: l,
						antialias: w,
						stencil: z,
						preserveDrawingBuffer: c
					}))) {
					throw "Error creating WebGL context."
				}
			} catch (B) {
				console.error(B)
			}
			return x.getExtension("OES_texture_float") || console.log("THREE.WebGLRenderer: Float textures not supported."), x
		}()).clearColor(0, 0, 0, 1), az.clearDepth(1), az.clearStencil(0), az.enable(az.DEPTH_TEST), az.depthFunc(az.LEQUAL), az.frontFace(az.CCW), az.cullFace(az.BACK), az.enable(az.CULL_FACE), az.enable(az.BLEND), az.blendEquation(az.FUNC_ADD), az.blendFunc(az.SRC_ALPHA, az.ONE_MINUS_SRC_ALPHA), az.clearColor(G.r, G.g, G.b, n);
		var ae = (this.context = az).getParameter(az.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
		az.getParameter(az.MAX_TEXTURE_SIZE);
		var ak = az.getParameter(az.MAX_CUBE_MAP_TEXTURE_SIZE);
		this.getContext = function () {
			return az
		}, this.supportsVertexTextures = function () {
			return 0 < ae
		}, this.setSize = function (x, B) {
			p.width = x, p.height = B, this.setViewport(0, 0, p.width, p.height)
		}, this.setViewport = function (I, L, x, B) {
			f = I, ah = L, i = x, E = B, az.viewport(f, ah, i, E)
		}, this.setScissor = function (I, L, x, B) {
			az.scissor(I, L, x, B)
		}, this.enableScissorTest = function (x) {
			x ? az.enable(az.SCISSOR_TEST) : az.disable(az.SCISSOR_TEST)
		}, this.setClearColorHex = function (x, B) {
			G.setHex(x), n = B, az.clearColor(G.r, G.g, G.b, n)
		}, this.setClearColor = function (x, B) {
			G.copy(x), n = B, az.clearColor(G.r, G.g, G.b, n)
		}, this.getClearColor = function () {
			return G
		}, this.getClearAlpha = function () {
			return n
		}, this.clear = function (I, L, x) {
			var B = 0;
			(void 0 === I || I) && (B |= az.COLOR_BUFFER_BIT), (void 0 === L || L) && (B |= az.DEPTH_BUFFER_BIT), (void 0 === x || x) && (B |= az.STENCIL_BUFFER_BIT), az.clear(B)
		}, this.clearTarget = function (I, L, x, B) {
			this.setRenderTarget(I), this.clear(L, x, B)
		}, this.addPostPlugin = function (x) {
			x.init(this), this.renderPluginsPost.push(x)
		}, this.addPrePlugin = function (x) {
			x.init(this), this.renderPluginsPre.push(x)
		}, this.deallocateObject = function (L) {
			if (L.__webglInit) {
				if (L.__webglInit = !1, delete L._modelViewMatrix, delete L._normalMatrix, delete L._normalMatrixArray, delete L._modelViewMatrixArray, delete L._objectMatrixArray, L instanceof THREE.Mesh) {
					for (var N in L.geometry.geometryGroups) {
						var x = L.geometry.geometryGroups[N];
						az.deleteBuffer(x.__webglVertexBuffer), az.deleteBuffer(x.__webglNormalBuffer), az.deleteBuffer(x.__webglTangentBuffer), az.deleteBuffer(x.__webglColorBuffer), az.deleteBuffer(x.__webglUVBuffer), az.deleteBuffer(x.__webglUV2Buffer), az.deleteBuffer(x.__webglSkinVertexABuffer), az.deleteBuffer(x.__webglSkinVertexBBuffer), az.deleteBuffer(x.__webglSkinIndicesBuffer), az.deleteBuffer(x.__webglSkinWeightsBuffer), az.deleteBuffer(x.__webglFaceBuffer), az.deleteBuffer(x.__webglLineBuffer);
						var B = void 0,
							I = void 0;
						if (x.numMorphTargets) {
							for (B = 0, I = x.numMorphTargets; B < I; B++) {
								az.deleteBuffer(x.__webglMorphTargetsBuffers[B])
							}
						}
						if (x.numMorphNormals) {
							for (B = 0, I = x.numMorphNormals; B < I; B++) {
								az.deleteBuffer(x.__webglMorphNormalsBuffers[B])
							}
						}
						if (x.__webglCustomAttributesList) {
							for (B in B = void 0, x.__webglCustomAttributesList) {
								az.deleteBuffer(x.__webglCustomAttributesList[B].buffer)
							}
						}
						s.info.memory.geometries--
					}
				} else {
					L instanceof THREE.Ribbon ? (L = L.geometry, az.deleteBuffer(L.__webglVertexBuffer), az.deleteBuffer(L.__webglColorBuffer), s.info.memory.geometries--) : L instanceof THREE.Line ? (L = L.geometry, az.deleteBuffer(L.__webglVertexBuffer), az.deleteBuffer(L.__webglColorBuffer), s.info.memory.geometries--) : L instanceof THREE.ParticleSystem && (L = L.geometry, az.deleteBuffer(L.__webglVertexBuffer), az.deleteBuffer(L.__webglColorBuffer), s.info.memory.geometries--)
				}
			}
		}, this.deallocateTexture = function (x) {
			x.__webglInit && (x.__webglInit = !1, az.deleteTexture(x.__webglTexture), s.info.memory.textures--)
		}, this.deallocateRenderTarget = function (x) {
			if (x && x.__webglTexture) {
				if (az.deleteTexture(x.__webglTexture), x instanceof THREE.WebGLRenderTargetCube) {
					for (var B = 0; B < 6; B++) {
						az.deleteFramebuffer(x.__webglFramebuffer[B]), az.deleteRenderbuffer(x.__webglRenderbuffer[B])
					}
				} else {
					az.deleteFramebuffer(x.__webglFramebuffer), az.deleteRenderbuffer(x.__webglRenderbuffer)
				}
			}
		}, this.updateShadowMap = function (x, B) {
			o = q = d = P = H = -1, ao = !(g = null), D = aj = -1, this.shadowMapPlugin.update(x, B)
		}, this.renderBufferImmediate = function (W, X, aA) {
			if (W.__webglVertexBuffer || (W.__webglVertexBuffer = az.createBuffer()), W.__webglNormalBuffer || (W.__webglNormalBuffer = az.createBuffer()), W.hasPos && (az.bindBuffer(az.ARRAY_BUFFER, W.__webglVertexBuffer), az.bufferData(az.ARRAY_BUFFER, W.positionArray, az.DYNAMIC_DRAW), az.enableVertexAttribArray(X.attributes.position), az.vertexAttribPointer(X.attributes.position, 3, az.FLOAT, !1, 0, 0)), W.hasNormal) {
				if (az.bindBuffer(az.ARRAY_BUFFER, W.__webglNormalBuffer), aA === THREE.FlatShading) {
					var aB, x, B, I, L, N, S, V = 3 * W.count;
					for (S = 0; S < V; S += 9) {
						aB = (aA = W.normalArray)[S], x = aA[S + 1], B = aA[S + 2], I = aA[S + 3], L = aA[S + 4], N = aA[S + 5], aB = (aB + I + aA[S + 6]) / 3, x = (x + L + aA[S + 7]) / 3, B = (B + N + aA[S + 8]) / 3, aA[S] = aB, aA[S + 1] = x, aA[S + 2] = B, aA[S + 3] = aB, aA[S + 4] = x, aA[S + 5] = B, aA[S + 6] = aB, aA[S + 7] = x, aA[S + 8] = B
					}
				}
				az.bufferData(az.ARRAY_BUFFER, W.normalArray, az.DYNAMIC_DRAW), az.enableVertexAttribArray(X.attributes.normal), az.vertexAttribPointer(X.attributes.normal, 3, az.FLOAT, !1, 0, 0)
			}
			az.drawArrays(az.TRIANGLES, 0, W.count), W.count = 0
		}, this.renderBufferDirect = function (N, S, x, B, I, L) {
			if (!1 !== B.visible && (N = (x = Q(N, S, x, B, L)).attributes, S = !1, (B = 16777215 * I.id + 2 * x.id + (B.wireframe ? 1 : 0)) !== q && (q = B, S = !0), L instanceof THREE.Mesh)) {
				for (B = 0, x = (L = I.offsets).length; B < x; ++B) {
					S && (az.bindBuffer(az.ARRAY_BUFFER, I.vertexPositionBuffer), az.vertexAttribPointer(N.position, I.vertexPositionBuffer.itemSize, az.FLOAT, !1, 0, 12 * L[B].index), 0 <= N.normal && I.vertexNormalBuffer && (az.bindBuffer(az.ARRAY_BUFFER, I.vertexNormalBuffer), az.vertexAttribPointer(N.normal, I.vertexNormalBuffer.itemSize, az.FLOAT, !1, 0, 12 * L[B].index)), 0 <= N.uv && I.vertexUvBuffer && (I.vertexUvBuffer ? (az.bindBuffer(az.ARRAY_BUFFER, I.vertexUvBuffer), az.vertexAttribPointer(N.uv, I.vertexUvBuffer.itemSize, az.FLOAT, !1, 0, 8 * L[B].index), az.enableVertexAttribArray(N.uv)) : az.disableVertexAttribArray(N.uv)), 0 <= N.color && I.vertexColorBuffer && (az.bindBuffer(az.ARRAY_BUFFER, I.vertexColorBuffer), az.vertexAttribPointer(N.color, I.vertexColorBuffer.itemSize, az.FLOAT, !1, 0, 16 * L[B].index)), az.bindBuffer(az.ELEMENT_ARRAY_BUFFER, I.vertexIndexBuffer)), az.drawElements(az.TRIANGLES, L[B].count, az.UNSIGNED_SHORT, 2 * L[B].start), s.info.render.calls++, s.info.render.vertices = s.info.render.vertices + L[B].count, s.info.render.faces = s.info.render.faces + L[B].count / 3
				}
			}
		}, this.renderBuffer = function (L, V, W, X, aA, aB) {
			if (!1 !== X.visible) {
				var aC, aD;
				V = (W = Q(L, V, W, X, aB)).attributes, L = !1;
				if ((W = 16777215 * aA.id + 2 * W.id + (X.wireframe ? 1 : 0)) !== q && (q = W, L = !0), !X.morphTargets && 0 <= V.position) {
					L && (az.bindBuffer(az.ARRAY_BUFFER, aA.__webglVertexBuffer), az.vertexAttribPointer(V.position, 3, az.FLOAT, !1, 0, 0))
				} else {
					if (aB.morphTargetBase) {
						if (W = X.program.attributes, -1 !== aB.morphTargetBase ? (az.bindBuffer(az.ARRAY_BUFFER, aA.__webglMorphTargetsBuffers[aB.morphTargetBase]), az.vertexAttribPointer(W.position, 3, az.FLOAT, !1, 0, 0)) : 0 <= W.position && (az.bindBuffer(az.ARRAY_BUFFER, aA.__webglVertexBuffer), az.vertexAttribPointer(W.position, 3, az.FLOAT, !1, 0, 0)), aB.morphTargetForcedOrder.length) {
							aC = 0;
							var x = aB.morphTargetForcedOrder;
							for (aD = aB.morphTargetInfluences; aC < X.numSupportedMorphTargets && aC < x.length;) {
								az.bindBuffer(az.ARRAY_BUFFER, aA.__webglMorphTargetsBuffers[x[aC]]), az.vertexAttribPointer(W["morphTarget" + aC], 3, az.FLOAT, !1, 0, 0), X.morphNormals && (az.bindBuffer(az.ARRAY_BUFFER, aA.__webglMorphNormalsBuffers[x[aC]]), az.vertexAttribPointer(W["morphNormal" + aC], 3, az.FLOAT, !1, 0, 0)), aB.__webglMorphTargetInfluences[aC] = aD[x[aC]], aC++
							}
						} else {
							x = [];
							var N, B = -1,
								I = 0,
								S = (aD = aB.morphTargetInfluences).length;
							for (aC = 0, -1 !== aB.morphTargetBase && (x[aB.morphTargetBase] = !0); aC < X.numSupportedMorphTargets;) {
								for (N = 0; N < S; N++) {
									!x[N] && aD[N] > B && (B = aD[I = N])
								}
								az.bindBuffer(az.ARRAY_BUFFER, aA.__webglMorphTargetsBuffers[I]), az.vertexAttribPointer(W["morphTarget" + aC], 3, az.FLOAT, !1, 0, 0), X.morphNormals && (az.bindBuffer(az.ARRAY_BUFFER, aA.__webglMorphNormalsBuffers[I]), az.vertexAttribPointer(W["morphNormal" + aC], 3, az.FLOAT, !1, 0, 0)), aB.__webglMorphTargetInfluences[aC] = B, B = -(x[I] = 1), aC++
							}
						}
						null !== X.program.uniforms.morphTargetInfluences && az.uniform1fv(X.program.uniforms.morphTargetInfluences, aB.__webglMorphTargetInfluences)
					}
				}
				if (L) {
					if (aA.__webglCustomAttributesList) {
						for (aC = 0, aD = aA.__webglCustomAttributesList.length; aC < aD; aC++) {
							0 <= V[(W = aA.__webglCustomAttributesList[aC]).buffer.belongsToAttribute] && (az.bindBuffer(az.ARRAY_BUFFER, W.buffer), az.vertexAttribPointer(V[W.buffer.belongsToAttribute], W.size, az.FLOAT, !1, 0, 0))
						}
					}
					0 <= V.color && (az.bindBuffer(az.ARRAY_BUFFER, aA.__webglColorBuffer), az.vertexAttribPointer(V.color, 3, az.FLOAT, !1, 0, 0)), 0 <= V.normal && (az.bindBuffer(az.ARRAY_BUFFER, aA.__webglNormalBuffer), az.vertexAttribPointer(V.normal, 3, az.FLOAT, !1, 0, 0)), 0 <= V.tangent && (az.bindBuffer(az.ARRAY_BUFFER, aA.__webglTangentBuffer), az.vertexAttribPointer(V.tangent, 4, az.FLOAT, !1, 0, 0)), 0 <= V.uv && (aA.__webglUVBuffer ? (az.bindBuffer(az.ARRAY_BUFFER, aA.__webglUVBuffer), az.vertexAttribPointer(V.uv, 2, az.FLOAT, !1, 0, 0), az.enableVertexAttribArray(V.uv)) : az.disableVertexAttribArray(V.uv)), 0 <= V.uv2 && (aA.__webglUV2Buffer ? (az.bindBuffer(az.ARRAY_BUFFER, aA.__webglUV2Buffer), az.vertexAttribPointer(V.uv2, 2, az.FLOAT, !1, 0, 0), az.enableVertexAttribArray(V.uv2)) : az.disableVertexAttribArray(V.uv2)), X.skinning && 0 <= V.skinVertexA && 0 <= V.skinVertexB && 0 <= V.skinIndex && 0 <= V.skinWeight && (az.bindBuffer(az.ARRAY_BUFFER, aA.__webglSkinVertexABuffer), az.vertexAttribPointer(V.skinVertexA, 4, az.FLOAT, !1, 0, 0), az.bindBuffer(az.ARRAY_BUFFER, aA.__webglSkinVertexBBuffer), az.vertexAttribPointer(V.skinVertexB, 4, az.FLOAT, !1, 0, 0), az.bindBuffer(az.ARRAY_BUFFER, aA.__webglSkinIndicesBuffer), az.vertexAttribPointer(V.skinIndex, 4, az.FLOAT, !1, 0, 0), az.bindBuffer(az.ARRAY_BUFFER, aA.__webglSkinWeightsBuffer), az.vertexAttribPointer(V.skinWeight, 4, az.FLOAT, !1, 0, 0))
				}
				aB instanceof THREE.Mesh ? (X.wireframe ? ((X = X.wireframeLinewidth) !== b && (az.lineWidth(X), b = X), L && az.bindBuffer(az.ELEMENT_ARRAY_BUFFER, aA.__webglLineBuffer), az.drawElements(az.LINES, aA.__webglLineCount, az.UNSIGNED_SHORT, 0)) : (L && az.bindBuffer(az.ELEMENT_ARRAY_BUFFER, aA.__webglFaceBuffer), az.drawElements(az.TRIANGLES, aA.__webglFaceCount, az.UNSIGNED_SHORT, 0)), s.info.render.calls++, s.info.render.vertices = s.info.render.vertices + aA.__webglFaceCount, s.info.render.faces = s.info.render.faces + aA.__webglFaceCount / 3) : aB instanceof THREE.Line ? (aB = aB.type === THREE.LineStrip ? az.LINE_STRIP : az.LINES, (X = X.linewidth) !== b && (az.lineWidth(X), b = X), az.drawArrays(aB, 0, aA.__webglLineCount), s.info.render.calls++) : aB instanceof THREE.ParticleSystem ? (az.drawArrays(az.POINTS, 0, aA.__webglParticleCount), s.info.render.calls++, s.info.render.points = s.info.render.points + aA.__webglParticleCount) : aB instanceof THREE.Ribbon && (az.drawArrays(az.TRIANGLE_STRIP, 0, aA.__webglVertexCount), s.info.render.calls++)
			}
		}, this.render = function (L, aA, aB, aC) {
			var aD, aE, B, N, S = L.__lights,
				W = L.fog;
			for (o = -1, ao = !0, void 0 === aA.parent && (console.warn("DEPRECATED: Camera hasn't been added to a Scene. Adding it..."), L.add(aA)), this.autoUpdateScene && L.updateMatrixWorld(), aA._viewMatrixArray || (aA._viewMatrixArray = new Float32Array(16)), aA._projectionMatrixArray || (aA._projectionMatrixArray = new Float32Array(16)), aA.matrixWorldInverse.getInverse(aA.matrixWorld), aA.matrixWorldInverse.flattenToArray(aA._viewMatrixArray), aA.projectionMatrix.flattenToArray(aA._projectionMatrixArray), h.multiply(aA.projectionMatrix, aA.matrixWorldInverse), an.setFromMatrix(h), this.autoUpdateObjects && this.initWebGLObjects(L), ay(this.renderPluginsPre, L, aA), s.info.render.calls = 0, s.info.render.vertices = 0, s.info.render.faces = 0, s.info.render.points = 0, this.setRenderTarget(aB), (this.autoClear || aC) && this.clear(this.autoClearColor, this.autoClearDepth, this.autoClearStencil), aC = 0, aD = (N = L.__webglObjects).length; aC < aD; aC++) {
				if (B = (aE = N[aC]).object, aE.render = !1, B.visible && (!(B instanceof THREE.Mesh || B instanceof THREE.ParticleSystem) || !B.frustumCulled || an.contains(B))) {
					Z(B, aA);
					var V = aE,
						X = V.object,
						x = V.buffer,
						I = void 0;
					I = I = void 0;
					(I = X.material) instanceof THREE.MeshFaceMaterial ? 0 <= (I = x.materialIndex) && ((I = X.geometry.materials[I]).transparent ? (V.transparent = I, V.opaque = null) : (V.opaque = I, V.transparent = null)) : I && (I.transparent ? (V.transparent = I, V.opaque = null) : (V.opaque = I, V.transparent = null)), aE.render = !0, this.sortObjects && (B.renderDepth ? aE.z = B.renderDepth : (u.copy(B.matrixWorld.getPosition()), h.multiplyVector3(u), aE.z = u.z))
				}
			}
			for (this.sortObjects && N.sort(ax), aC = 0, aD = (N = L.__webglObjectsImmediate).length; aC < aD; aC++) {
				(B = (aE = N[aC]).object).visible && (Z(B, aA), (B = aE.object.material).transparent ? (aE.transparent = B, aE.opaque = null) : (aE.opaque = B, aE.transparent = null))
			}
			L.overrideMaterial ? (aC = L.overrideMaterial, this.setBlending(aC.blending, aC.blendEquation, aC.blendSrc, aC.blendDst), this.setDepthTest(aC.depthTest), this.setDepthWrite(aC.depthWrite), ac(aC.polygonOffset, aC.polygonOffsetFactor, aC.polygonOffsetUnits), J(L.__webglObjects, !1, "", aA, S, W, !0, aC), M(L.__webglObjectsImmediate, "", aA, S, W, !1, aC)) : (this.setBlending(THREE.NormalBlending), J(L.__webglObjects, !0, "opaque", aA, S, W, !1), M(L.__webglObjectsImmediate, "opaque", aA, S, W, !1), J(L.__webglObjects, !1, "transparent", aA, S, W, !0), M(L.__webglObjectsImmediate, "transparent", aA, S, W, !0)), ay(this.renderPluginsPost, L, aA), aB && aB.generateMipmaps && aB.minFilter !== THREE.NearestFilter && aB.minFilter !== THREE.LinearFilter && (aB instanceof THREE.WebGLRenderTargetCube ? (az.bindTexture(az.TEXTURE_CUBE_MAP, aB.__webglTexture), az.generateMipmap(az.TEXTURE_CUBE_MAP), az.bindTexture(az.TEXTURE_CUBE_MAP, null)) : (az.bindTexture(az.TEXTURE_2D, aB.__webglTexture), az.generateMipmap(az.TEXTURE_2D), az.bindTexture(az.TEXTURE_2D, null))), this.setDepthTest(!0), this.setDepthWrite(!0)
		}, this.renderImmediateObject = function (N, S, x, B, I) {
			var L = Q(N, S, x, B, I);
			q = -1, s.setObjectFaces(I), I.immediateRenderCallback ? I.immediateRenderCallback(L, az, an) : I.render(function (V) {
				s.renderBufferImmediate(V, L, B.shading)
			})
		}, this.initWebGLObjects = function (a5) {
			for (a5.__webglObjects || (a5.__webglObjects = [], a5.__webglObjectsImmediate = [], a5.__webglSprites = [], a5.__webglFlares = []); a5.__objectsAdded.length;) {
				var a8 = a5.__objectsAdded[0],
					a9 = a5,
					ge = void 0,
					gg = void 0,
					gi = void 0;
				if (!a8.__webglInit) {
					if (a8.__webglInit = !0, a8._modelViewMatrix = new THREE.Matrix4, a8._normalMatrix = new THREE.Matrix3, a8 instanceof THREE.Mesh) {
						if ((gg = a8.geometry) instanceof THREE.Geometry) {
							if (void 0 === gg.geometryGroups) {
								var fb, go = gg,
									gr = void 0,
									fd = void 0,
									fh = void 0,
									fi = void 0,
									fr = void 0,
									fq = void 0,
									cc = {},
									er = go.morphTargets.length,
									es = go.morphNormals.length;
								for (go.geometryGroups = {}, gr = 0, fb = go.faces.length; gr < fb; gr++) {
									void 0 === cc[fr = void 0 !== (fh = (fd = go.faces[gr]).materialIndex) ? fh : -1] && (cc[fr] = {
										hash: fr,
										counter: 0
									}), fq = cc[fr].hash + "_" + cc[fr].counter, void 0 === go.geometryGroups[fq] && (go.geometryGroups[fq] = {
										faces3: [],
										faces4: [],
										materialIndex: fh,
										vertices: 0,
										numMorphTargets: er,
										numMorphNormals: es
									}), fi = fd instanceof THREE.Face3 ? 3 : 4, 65535 < go.geometryGroups[fq].vertices + fi && (cc[fr].counter = cc[fr].counter + 1, fq = cc[fr].hash + "_" + cc[fr].counter, void 0 === go.geometryGroups[fq] && (go.geometryGroups[fq] = {
										faces3: [],
										faces4: [],
										materialIndex: fh,
										vertices: 0,
										numMorphTargets: er,
										numMorphNormals: es
									})), fd instanceof THREE.Face3 ? go.geometryGroups[fq].faces3.push(gr) : go.geometryGroups[fq].faces4.push(gr), go.geometryGroups[fq].vertices = go.geometryGroups[fq].vertices + fi
								}
								go.geometryGroupsList = [];
								var eu = void 0;
								for (eu in go.geometryGroups) {
									go.geometryGroups[eu].id = al++, go.geometryGroupsList.push(go.geometryGroups[eu])
								}
							}
							for (ge in gg.geometryGroups) {
								if (!(gi = gg.geometryGroups[ge]).__webglVertexBuffer) {
									var ex = gi;
									ex.__webglVertexBuffer = az.createBuffer(), ex.__webglNormalBuffer = az.createBuffer(), ex.__webglTangentBuffer = az.createBuffer(), ex.__webglColorBuffer = az.createBuffer(), ex.__webglUVBuffer = az.createBuffer(), ex.__webglUV2Buffer = az.createBuffer(), ex.__webglSkinVertexABuffer = az.createBuffer(), ex.__webglSkinVertexBBuffer = az.createBuffer(), ex.__webglSkinIndicesBuffer = az.createBuffer(), ex.__webglSkinWeightsBuffer = az.createBuffer(), ex.__webglFaceBuffer = az.createBuffer(), ex.__webglLineBuffer = az.createBuffer();
									var eC = void 0,
										eN = void 0;
									if (ex.numMorphTargets) {
										for (ex.__webglMorphTargetsBuffers = [], eC = 0, eN = ex.numMorphTargets; eC < eN; eC++) {
											ex.__webglMorphTargetsBuffers.push(az.createBuffer())
										}
									}
									if (ex.numMorphNormals) {
										for (ex.__webglMorphNormalsBuffers = [], eC = 0, eN = ex.numMorphNormals; eC < eN; eC++) {
											ex.__webglMorphNormalsBuffers.push(az.createBuffer())
										}
									}
									s.info.memory.geometries++;
									var e1 = gi,
										eL = a8,
										eY = eL.geometry,
										eT = e1.faces3,
										aJ = e1.faces4,
										e0 = 3 * eT.length + 4 * aJ.length,
										aX = 1 * eT.length + 2 * aJ.length,
										aW = 3 * eT.length + 4 * aJ.length,
										e2 = at(eL, e1),
										aQ = av(e2),
										bc = au(e2),
										gD = !!e2.vertexColors && e2.vertexColors;
									e1.__vertexArray = new Float32Array(3 * e0), bc && (e1.__normalArray = new Float32Array(3 * e0)), eY.hasTangents && (e1.__tangentArray = new Float32Array(4 * e0)), gD && (e1.__colorArray = new Float32Array(3 * e0)), aQ && ((0 < eY.faceUvs.length || 0 < eY.faceVertexUvs.length) && (e1.__uvArray = new Float32Array(2 * e0)), (1 < eY.faceUvs.length || 1 < eY.faceVertexUvs.length) && (e1.__uv2Array = new Float32Array(2 * e0))), eL.geometry.skinWeights.length && eL.geometry.skinIndices.length && (e1.__skinVertexAArray = new Float32Array(4 * e0), e1.__skinVertexBArray = new Float32Array(4 * e0), e1.__skinIndexArray = new Float32Array(4 * e0), e1.__skinWeightArray = new Float32Array(4 * e0)), e1.__faceArray = new Uint16Array(3 * aX), e1.__lineArray = new Uint16Array(2 * aW);
									var aS = void 0,
										gp = void 0;
									if (e1.numMorphTargets) {
										for (e1.__morphTargetsArrays = [], aS = 0, gp = e1.numMorphTargets; aS < gp; aS++) {
											e1.__morphTargetsArrays.push(new Float32Array(3 * e0))
										}
									}
									if (e1.numMorphNormals) {
										for (e1.__morphNormalsArrays = [], aS = 0, gp = e1.numMorphNormals; aS < gp; aS++) {
											e1.__morphNormalsArrays.push(new Float32Array(3 * e0))
										}
									}
									if (e1.__webglFaceCount = 3 * aX, e1.__webglLineCount = 2 * aW, e2.attributes) {
										void 0 === e1.__webglCustomAttributesList && (e1.__webglCustomAttributesList = []);
										var fQ = void 0;
										for (fQ in e2.attributes) {
											var fB, ew = e2.attributes[fQ],
												aK = {};
											for (fB in ew) {
												aK[fB] = ew[fB]
											}
											if (!aK.__webglInitialized || aK.createUniqueBuffers) {
												aK.__webglInitialized = !0;
												var f4 = 1;
												"v2" === aK.type ? f4 = 2 : "v3" === aK.type ? f4 = 3 : "v4" === aK.type ? f4 = 4 : "c" === aK.type && (f4 = 3), aK.size = f4, aK.array = new Float32Array(e0 * f4), aK.buffer = az.createBuffer(), aK.buffer.belongsToAttribute = fQ, ew.needsUpdate = !0, aK.__original = ew
											}
											e1.__webglCustomAttributesList.push(aK)
										}
									}
									e1.__inittedArrays = !0, gg.verticesNeedUpdate = !0, gg.morphTargetsNeedUpdate = !0, gg.elementsNeedUpdate = !0, gg.uvsNeedUpdate = !0, gg.normalsNeedUpdate = !0, gg.tangetsNeedUpdate = !0, gg.colorsNeedUpdate = !0
								}
							}
						}
					} else {
						if (a8 instanceof THREE.Ribbon) {
							if (!(gg = a8.geometry).__webglVertexBuffer) {
								var eZ = gg;
								eZ.__webglVertexBuffer = az.createBuffer(), eZ.__webglColorBuffer = az.createBuffer(), s.info.memory.geometries++;
								var aY = gg,
									eQ = aY.vertices.length;
								aY.__vertexArray = new Float32Array(3 * eQ), aY.__colorArray = new Float32Array(3 * eQ), aY.__webglVertexCount = eQ, gg.verticesNeedUpdate = !0, gg.colorsNeedUpdate = !0
							}
						} else {
							if (a8 instanceof THREE.Line) {
								if (!(gg = a8.geometry).__webglVertexBuffer) {
									var gR = gg;
									gR.__webglVertexBuffer = az.createBuffer(), gR.__webglColorBuffer = az.createBuffer(), s.info.memory.geometries++;
									var gM = gg,
										W = a8,
										gl = gM.vertices.length;
									gM.__vertexArray = new Float32Array(3 * gl), gM.__colorArray = new Float32Array(3 * gl), gM.__webglLineCount = gl, ar(gM, W), gg.verticesNeedUpdate = !0, gg.colorsNeedUpdate = !0
								}
							} else {
								if (a8 instanceof THREE.ParticleSystem && !(gg = a8.geometry).__webglVertexBuffer) {
									var bb = gg;
									bb.__webglVertexBuffer = az.createBuffer(), bb.__webglColorBuffer = az.createBuffer(), s.info.geometries++;
									var fg = gg,
										fH = a8,
										e9 = fg.vertices.length;
									fg.__vertexArray = new Float32Array(3 * e9), fg.__colorArray = new Float32Array(3 * e9), fg.__sortArray = [], fg.__webglParticleCount = e9, ar(fg, fH), gg.verticesNeedUpdate = !0, gg.colorsNeedUpdate = !0
								}
							}
						}
					}
				}
				if (!a8.__webglActive) {
					if (a8 instanceof THREE.Mesh) {
						if ((gg = a8.geometry) instanceof THREE.BufferGeometry) {
							K(a9.__webglObjects, gg, a8)
						} else {
							for (ge in gg.geometryGroups) {
								gi = gg.geometryGroups[ge], K(a9.__webglObjects, gi, a8)
							}
						}
					} else {
						a8 instanceof THREE.Ribbon || a8 instanceof THREE.Line || a8 instanceof THREE.ParticleSystem ? (gg = a8.geometry, K(a9.__webglObjects, gg, a8)) : a8 instanceof THREE.ImmediateRenderObject || a8.immediateRenderCallback ? a9.__webglObjectsImmediate.push({
							object: a8,
							opaque: null,
							transparent: null
						}) : a8 instanceof THREE.Sprite ? a9.__webglSprites.push(a8) : a8 instanceof THREE.LensFlare && a9.__webglFlares.push(a8)
					}
					a8.__webglActive = !0
				}
				a5.__objectsAdded.splice(0, 1)
			}
			for (; a5.__objectsRemoved.length;) {
				var eB = a5.__objectsRemoved[0],
					gQ = a5;
				eB instanceof THREE.Mesh || eB instanceof THREE.ParticleSystem || eB instanceof THREE.Ribbon || eB instanceof THREE.Line ? R(gQ.__webglObjects, eB) : eB instanceof THREE.Sprite ? Y(gQ.__webglSprites, eB) : eB instanceof THREE.LensFlare ? Y(gQ.__webglFlares, eB) : (eB instanceof THREE.ImmediateRenderObject || eB.immediateRenderCallback) && R(gQ.__webglObjectsImmediate, eB), eB.__webglActive = !1, a5.__objectsRemoved.splice(0, 1)
			}
			for (var gE = 0, f6 = a5.__webglObjects.length; gE < f6; gE++) {
				var fv = a5.__webglObjects[gE].object,
					gP = fv.geometry,
					gq = void 0,
					gF = void 0,
					aN = void 0;
				if (fv instanceof THREE.Mesh) {
					if (gP instanceof THREE.BufferGeometry) {
						gP.verticesNeedUpdate = !1, gP.elementsNeedUpdate = !1, gP.uvsNeedUpdate = !1, gP.normalsNeedUpdate = !1, gP.colorsNeedUpdate = !1
					} else {
						for (var gu = 0, fF = gP.geometryGroupsList.length; gu < fF; gu++) {
							if (gF = (aN = at(fv, gq = gP.geometryGroupsList[gu])).attributes && T(aN), gP.verticesNeedUpdate || gP.morphTargetsNeedUpdate || gP.elementsNeedUpdate || gP.uvsNeedUpdate || gP.normalsNeedUpdate || gP.colorsNeedUpdate || gP.tangetsNeedUpdate || gF) {
								var a6 = gq,
									a2 = fv,
									fU = az.DYNAMIC_DRAW,
									fE = !gP.dynamic,
									eF = aN;
								if (a6.__inittedArrays) {
									var gc = au(eF),
										aC = !!eF.vertexColors && eF.vertexColors,
										fR = av(eF),
										fG = gc === THREE.SmoothShading,
										eJ = void 0,
										aO = void 0,
										eD = void 0,
										eW = void 0,
										fx = void 0,
										gj = void 0,
										fZ = void 0,
										eK = void 0,
										eE = void 0,
										f1 = void 0,
										x = void 0,
										aT = void 0,
										aU = void 0,
										aV = void 0,
										aD = void 0,
										aE = void 0,
										fw = void 0,
										aZ = void 0,
										f3 = void 0,
										fy = void 0,
										f2 = void 0,
										et = void 0,
										ev = void 0,
										gK = void 0,
										gd = void 0,
										gx = void 0,
										gL = void 0,
										fc = void 0,
										fM = void 0,
										eV = void 0,
										gf = void 0,
										V = void 0,
										aM = void 0,
										eO = void 0,
										gy = void 0,
										gA = void 0,
										fj = void 0,
										fS = void 0,
										N = void 0,
										e5 = void 0,
										aA = void 0,
										fk = void 0,
										aI = void 0,
										fs = void 0,
										cd = void 0,
										e6 = void 0,
										aF = void 0,
										fz = void 0,
										fC = void 0,
										eM = void 0,
										gt = void 0,
										gG = void 0,
										gn = void 0,
										I = void 0,
										fK = 0,
										eG = 0,
										aG = 0,
										fI = 0,
										a7 = 0,
										a0 = 0,
										ft = 0,
										gh = 0,
										S = 0,
										eR = 0,
										ez = 0,
										dd = 0,
										db = void 0,
										f5 = a6.__vertexArray,
										fe = a6.__uvArray,
										fN = a6.__uv2Array,
										fO = a6.__normalArray,
										f0 = a6.__tangentArray,
										B = a6.__colorArray,
										ed = a6.__skinVertexAArray,
										gJ = a6.__skinVertexBArray,
										gb = a6.__skinIndexArray,
										gw = a6.__skinWeightArray,
										fp = a6.__morphTargetsArrays,
										aR = a6.__morphNormalsArrays,
										gs = a6.__webglCustomAttributesList,
										fn = void 0,
										f8 = a6.__faceArray,
										eU = a6.__lineArray,
										gz = a2.geometry,
										f7 = gz.elementsNeedUpdate,
										f9 = gz.uvsNeedUpdate,
										ey = gz.normalsNeedUpdate,
										gN = gz.tangetsNeedUpdate,
										gk = gz.colorsNeedUpdate,
										gB = gz.morphTargetsNeedUpdate,
										ga = gz.vertices,
										fY = a6.faces3,
										e8 = a6.faces4,
										aL = gz.faces,
										fX = gz.faceVertexUvs[0],
										ec = gz.faceVertexUvs[1],
										fP = gz.skinVerticesA,
										cb = gz.skinVerticesB,
										eI = gz.skinIndices,
										fW = gz.skinWeights,
										dc = gz.morphTargets,
										ca = gz.morphNormals;
									if (gz.verticesNeedUpdate) {
										for (eJ = 0, aO = fY.length; eJ < aO; eJ++) {
											aT = ga[(eW = aL[fY[eJ]]).a], aU = ga[eW.b], aV = ga[eW.c], f5[eG] = aT.x, f5[eG + 1] = aT.y, f5[eG + 2] = aT.z, f5[eG + 3] = aU.x, f5[eG + 4] = aU.y, f5[eG + 5] = aU.z, f5[eG + 6] = aV.x, f5[eG + 7] = aV.y, f5[eG + 8] = aV.z, eG += 9
										}
										for (eJ = 0, aO = e8.length; eJ < aO; eJ++) {
											aT = ga[(eW = aL[e8[eJ]]).a], aU = ga[eW.b], aV = ga[eW.c], aD = ga[eW.d], f5[eG] = aT.x, f5[eG + 1] = aT.y, f5[eG + 2] = aT.z, f5[eG + 3] = aU.x, f5[eG + 4] = aU.y, f5[eG + 5] = aU.z, f5[eG + 6] = aV.x, f5[eG + 7] = aV.y, f5[eG + 8] = aV.z, f5[eG + 9] = aD.x, f5[eG + 10] = aD.y, f5[eG + 11] = aD.z, eG += 12
										}
										az.bindBuffer(az.ARRAY_BUFFER, a6.__webglVertexBuffer), az.bufferData(az.ARRAY_BUFFER, f5, fU)
									}
									if (gB) {
										for (fC = 0, eM = dc.length; fC < eM; fC++) {
											for (eJ = ez = 0, aO = fY.length; eJ < aO; eJ++) {
												eW = aL[gn = fY[eJ]], aT = dc[fC].vertices[eW.a], aU = dc[fC].vertices[eW.b], aV = dc[fC].vertices[eW.c], (gt = fp[fC])[ez] = aT.x, gt[ez + 1] = aT.y, gt[ez + 2] = aT.z, gt[ez + 3] = aU.x, gt[ez + 4] = aU.y, gt[ez + 5] = aU.z, gt[ez + 6] = aV.x, gt[ez + 7] = aV.y, gt[ez + 8] = aV.z, eF.morphNormals && (fG ? (fy = (I = ca[fC].vertexNormals[gn]).a, f2 = I.b, et = I.c) : et = f2 = fy = ca[fC].faceNormals[gn], (gG = aR[fC])[ez] = fy.x, gG[ez + 1] = fy.y, gG[ez + 2] = fy.z, gG[ez + 3] = f2.x, gG[ez + 4] = f2.y, gG[ez + 5] = f2.z, gG[ez + 6] = et.x, gG[ez + 7] = et.y, gG[ez + 8] = et.z), ez += 9
											}
											for (eJ = 0, aO = e8.length; eJ < aO; eJ++) {
												eW = aL[gn = e8[eJ]], aT = dc[fC].vertices[eW.a], aU = dc[fC].vertices[eW.b], aV = dc[fC].vertices[eW.c], aD = dc[fC].vertices[eW.d], (gt = fp[fC])[ez] = aT.x, gt[ez + 1] = aT.y, gt[ez + 2] = aT.z, gt[ez + 3] = aU.x, gt[ez + 4] = aU.y, gt[ez + 5] = aU.z, gt[ez + 6] = aV.x, gt[ez + 7] = aV.y, gt[ez + 8] = aV.z, gt[ez + 9] = aD.x, gt[ez + 10] = aD.y, gt[ez + 11] = aD.z, eF.morphNormals && (fG ? (fy = (I = ca[fC].vertexNormals[gn]).a, f2 = I.b, et = I.c, ev = I.d) : ev = et = f2 = fy = ca[fC].faceNormals[gn], (gG = aR[fC])[ez] = fy.x, gG[ez + 1] = fy.y, gG[ez + 2] = fy.z, gG[ez + 3] = f2.x, gG[ez + 4] = f2.y, gG[ez + 5] = f2.z, gG[ez + 6] = et.x, gG[ez + 7] = et.y, gG[ez + 8] = et.z, gG[ez + 9] = ev.x, gG[ez + 10] = ev.y, gG[ez + 11] = ev.z), ez += 12
											}
											az.bindBuffer(az.ARRAY_BUFFER, a6.__webglMorphTargetsBuffers[fC]), az.bufferData(az.ARRAY_BUFFER, fp[fC], fU), eF.morphNormals && (az.bindBuffer(az.ARRAY_BUFFER, a6.__webglMorphNormalsBuffers[fC]), az.bufferData(az.ARRAY_BUFFER, aR[fC], fU))
										}
									}
									if (fW.length) {
										for (eJ = 0, aO = fY.length; eJ < aO; eJ++) {
											fc = fW[(eW = aL[fY[eJ]]).a], fM = fW[eW.b], eV = fW[eW.c], gw[eR] = fc.x, gw[eR + 1] = fc.y, gw[eR + 2] = fc.z, gw[eR + 3] = fc.w, gw[eR + 4] = fM.x, gw[eR + 5] = fM.y, gw[eR + 6] = fM.z, gw[eR + 7] = fM.w, gw[eR + 8] = eV.x, gw[eR + 9] = eV.y, gw[eR + 10] = eV.z, gw[eR + 11] = eV.w, V = eI[eW.a], aM = eI[eW.b], eO = eI[eW.c], gb[eR] = V.x, gb[eR + 1] = V.y, gb[eR + 2] = V.z, gb[eR + 3] = V.w, gb[eR + 4] = aM.x, gb[eR + 5] = aM.y, gb[eR + 6] = aM.z, gb[eR + 7] = aM.w, gb[eR + 8] = eO.x, gb[eR + 9] = eO.y, gb[eR + 10] = eO.z, gb[eR + 11] = eO.w, gA = fP[eW.a], fj = fP[eW.b], fS = fP[eW.c], ed[eR] = gA.x, ed[eR + 1] = gA.y, ed[eR + 2] = gA.z, ed[eR + 3] = 1, ed[eR + 4] = fj.x, ed[eR + 5] = fj.y, ed[eR + 6] = fj.z, ed[eR + 7] = 1, ed[eR + 8] = fS.x, ed[eR + 9] = fS.y, ed[eR + 10] = fS.z, ed[eR + 11] = 1, e5 = cb[eW.a], aA = cb[eW.b], fk = cb[eW.c], gJ[eR] = e5.x, gJ[eR + 1] = e5.y, gJ[eR + 2] = e5.z, gJ[eR + 3] = 1, gJ[eR + 4] = aA.x, gJ[eR + 5] = aA.y, gJ[eR + 6] = aA.z, gJ[eR + 7] = 1, gJ[eR + 8] = fk.x, gJ[eR + 9] = fk.y, gJ[eR + 10] = fk.z, gJ[eR + 11] = 1, eR += 12
										}
										for (eJ = 0, aO = e8.length; eJ < aO; eJ++) {
											fc = fW[(eW = aL[e8[eJ]]).a], fM = fW[eW.b], eV = fW[eW.c], gf = fW[eW.d], gw[eR] = fc.x, gw[eR + 1] = fc.y, gw[eR + 2] = fc.z, gw[eR + 3] = fc.w, gw[eR + 4] = fM.x, gw[eR + 5] = fM.y, gw[eR + 6] = fM.z, gw[eR + 7] = fM.w, gw[eR + 8] = eV.x, gw[eR + 9] = eV.y, gw[eR + 10] = eV.z, gw[eR + 11] = eV.w, gw[eR + 12] = gf.x, gw[eR + 13] = gf.y, gw[eR + 14] = gf.z, gw[eR + 15] = gf.w, V = eI[eW.a], aM = eI[eW.b], eO = eI[eW.c], gy = eI[eW.d], gb[eR] = V.x, gb[eR + 1] = V.y, gb[eR + 2] = V.z, gb[eR + 3] = V.w, gb[eR + 4] = aM.x, gb[eR + 5] = aM.y, gb[eR + 6] = aM.z, gb[eR + 7] = aM.w, gb[eR + 8] = eO.x, gb[eR + 9] = eO.y, gb[eR + 10] = eO.z, gb[eR + 11] = eO.w, gb[eR + 12] = gy.x, gb[eR + 13] = gy.y, gb[eR + 14] = gy.z, gb[eR + 15] = gy.w, gA = fP[eW.a], fj = fP[eW.b], fS = fP[eW.c], N = fP[eW.d], ed[eR] = gA.x, ed[eR + 1] = gA.y, ed[eR + 2] = gA.z, ed[eR + 3] = 1, ed[eR + 4] = fj.x, ed[eR + 5] = fj.y, ed[eR + 6] = fj.z, ed[eR + 7] = 1, ed[eR + 8] = fS.x, ed[eR + 9] = fS.y, ed[eR + 10] = fS.z, ed[eR + 11] = 1, ed[eR + 12] = N.x, ed[eR + 13] = N.y, ed[eR + 14] = N.z, ed[eR + 15] = 1, e5 = cb[eW.a], aA = cb[eW.b], fk = cb[eW.c], aI = cb[eW.d], gJ[eR] = e5.x, gJ[eR + 1] = e5.y, gJ[eR + 2] = e5.z, gJ[eR + 3] = 1, gJ[eR + 4] = aA.x, gJ[eR + 5] = aA.y, gJ[eR + 6] = aA.z, gJ[eR + 7] = 1, gJ[eR + 8] = fk.x, gJ[eR + 9] = fk.y, gJ[eR + 10] = fk.z, gJ[eR + 11] = 1, gJ[eR + 12] = aI.x, gJ[eR + 13] = aI.y, gJ[eR + 14] = aI.z, gJ[eR + 15] = 1, eR += 16
										}
										0 < eR && (az.bindBuffer(az.ARRAY_BUFFER, a6.__webglSkinVertexABuffer), az.bufferData(az.ARRAY_BUFFER, ed, fU), az.bindBuffer(az.ARRAY_BUFFER, a6.__webglSkinVertexBBuffer), az.bufferData(az.ARRAY_BUFFER, gJ, fU), az.bindBuffer(az.ARRAY_BUFFER, a6.__webglSkinIndicesBuffer), az.bufferData(az.ARRAY_BUFFER, gb, fU), az.bindBuffer(az.ARRAY_BUFFER, a6.__webglSkinWeightsBuffer), az.bufferData(az.ARRAY_BUFFER, gw, fU))
									}
									if (gk && aC) {
										for (eJ = 0, aO = fY.length; eJ < aO; eJ++) {
											fZ = (eW = aL[fY[eJ]]).vertexColors, eK = eW.color, 3 === fZ.length && aC === THREE.VertexColors ? (gK = fZ[0], gd = fZ[1], gx = fZ[2]) : gx = gd = gK = eK, B[S] = gK.r, B[S + 1] = gK.g, B[S + 2] = gK.b, B[S + 3] = gd.r, B[S + 4] = gd.g, B[S + 5] = gd.b, B[S + 6] = gx.r, B[S + 7] = gx.g, B[S + 8] = gx.b, S += 9
										}
										for (eJ = 0, aO = e8.length; eJ < aO; eJ++) {
											fZ = (eW = aL[e8[eJ]]).vertexColors, eK = eW.color, 4 === fZ.length && aC === THREE.VertexColors ? (gK = fZ[0], gd = fZ[1], gx = fZ[2], gL = fZ[3]) : gL = gx = gd = gK = eK, B[S] = gK.r, B[S + 1] = gK.g, B[S + 2] = gK.b, B[S + 3] = gd.r, B[S + 4] = gd.g, B[S + 5] = gd.b, B[S + 6] = gx.r, B[S + 7] = gx.g, B[S + 8] = gx.b, B[S + 9] = gL.r, B[S + 10] = gL.g, B[S + 11] = gL.b, S += 12
										}
										0 < S && (az.bindBuffer(az.ARRAY_BUFFER, a6.__webglColorBuffer), az.bufferData(az.ARRAY_BUFFER, B, fU))
									}
									if (gN && gz.hasTangents) {
										for (eJ = 0, aO = fY.length; eJ < aO; eJ++) {
											aE = (eE = (eW = aL[fY[eJ]]).vertexTangents)[0], fw = eE[1], aZ = eE[2], f0[ft] = aE.x, f0[ft + 1] = aE.y, f0[ft + 2] = aE.z, f0[ft + 3] = aE.w, f0[ft + 4] = fw.x, f0[ft + 5] = fw.y, f0[ft + 6] = fw.z, f0[ft + 7] = fw.w, f0[ft + 8] = aZ.x, f0[ft + 9] = aZ.y, f0[ft + 10] = aZ.z, f0[ft + 11] = aZ.w, ft += 12
										}
										for (eJ = 0, aO = e8.length; eJ < aO; eJ++) {
											aE = (eE = (eW = aL[e8[eJ]]).vertexTangents)[0], fw = eE[1], aZ = eE[2], f3 = eE[3], f0[ft] = aE.x, f0[ft + 1] = aE.y, f0[ft + 2] = aE.z, f0[ft + 3] = aE.w, f0[ft + 4] = fw.x, f0[ft + 5] = fw.y, f0[ft + 6] = fw.z, f0[ft + 7] = fw.w, f0[ft + 8] = aZ.x, f0[ft + 9] = aZ.y, f0[ft + 10] = aZ.z, f0[ft + 11] = aZ.w, f0[ft + 12] = f3.x, f0[ft + 13] = f3.y, f0[ft + 14] = f3.z, f0[ft + 15] = f3.w, ft += 16
										}
										az.bindBuffer(az.ARRAY_BUFFER, a6.__webglTangentBuffer), az.bufferData(az.ARRAY_BUFFER, f0, fU)
									}
									if (ey && gc) {
										for (eJ = 0, aO = fY.length; eJ < aO; eJ++) {
											if (fx = (eW = aL[fY[eJ]]).vertexNormals, gj = eW.normal, 3 === fx.length && fG) {
												for (fs = 0; fs < 3; fs++) {
													e6 = fx[fs], fO[a0] = e6.x, fO[a0 + 1] = e6.y, fO[a0 + 2] = e6.z, a0 += 3
												}
											} else {
												for (fs = 0; fs < 3; fs++) {
													fO[a0] = gj.x, fO[a0 + 1] = gj.y, fO[a0 + 2] = gj.z, a0 += 3
												}
											}
										}
										for (eJ = 0, aO = e8.length; eJ < aO; eJ++) {
											if (fx = (eW = aL[e8[eJ]]).vertexNormals, gj = eW.normal, 4 === fx.length && fG) {
												for (fs = 0; fs < 4; fs++) {
													e6 = fx[fs], fO[a0] = e6.x, fO[a0 + 1] = e6.y, fO[a0 + 2] = e6.z, a0 += 3
												}
											} else {
												for (fs = 0; fs < 4; fs++) {
													fO[a0] = gj.x, fO[a0 + 1] = gj.y, fO[a0 + 2] = gj.z, a0 += 3
												}
											}
										}
										az.bindBuffer(az.ARRAY_BUFFER, a6.__webglNormalBuffer), az.bufferData(az.ARRAY_BUFFER, fO, fU)
									}
									if (f9 && fX && fR) {
										for (eJ = 0, aO = fY.length; eJ < aO; eJ++) {
											if (eW = aL[eD = fY[eJ]], void 0 !== (f1 = fX[eD])) {
												for (fs = 0; fs < 3; fs++) {
													aF = f1[fs], fe[aG] = aF.u, fe[aG + 1] = aF.v, aG += 2
												}
											}
										}
										for (eJ = 0, aO = e8.length; eJ < aO; eJ++) {
											if (eW = aL[eD = e8[eJ]], void 0 !== (f1 = fX[eD])) {
												for (fs = 0; fs < 4; fs++) {
													aF = f1[fs], fe[aG] = aF.u, fe[aG + 1] = aF.v, aG += 2
												}
											}
										}
										0 < aG && (az.bindBuffer(az.ARRAY_BUFFER, a6.__webglUVBuffer), az.bufferData(az.ARRAY_BUFFER, fe, fU))
									}
									if (f9 && ec && fR) {
										for (eJ = 0, aO = fY.length; eJ < aO; eJ++) {
											if (eW = aL[eD = fY[eJ]], void 0 !== (x = ec[eD])) {
												for (fs = 0; fs < 3; fs++) {
													fz = x[fs], fN[fI] = fz.u, fN[fI + 1] = fz.v, fI += 2
												}
											}
										}
										for (eJ = 0, aO = e8.length; eJ < aO; eJ++) {
											if (eW = aL[eD = e8[eJ]], void 0 !== (x = ec[eD])) {
												for (fs = 0; fs < 4; fs++) {
													fz = x[fs], fN[fI] = fz.u, fN[fI + 1] = fz.v, fI += 2
												}
											}
										}
										0 < fI && (az.bindBuffer(az.ARRAY_BUFFER, a6.__webglUV2Buffer), az.bufferData(az.ARRAY_BUFFER, fN, fU))
									}
									if (f7) {
										for (eJ = 0, aO = fY.length; eJ < aO; eJ++) {
											eW = aL[fY[eJ]], f8[a7] = fK, f8[a7 + 1] = fK + 1, f8[a7 + 2] = fK + 2, a7 += 3, eU[gh] = fK, eU[gh + 1] = fK + 1, eU[gh + 2] = fK, eU[gh + 3] = fK + 2, eU[gh + 4] = fK + 1, eU[gh + 5] = fK + 2, gh += 6, fK += 3
										}
										for (eJ = 0, aO = e8.length; eJ < aO; eJ++) {
											eW = aL[e8[eJ]], f8[a7] = fK, f8[a7 + 1] = fK + 1, f8[a7 + 2] = fK + 3, f8[a7 + 3] = fK + 1, f8[a7 + 4] = fK + 2, f8[a7 + 5] = fK + 3, a7 += 6, eU[gh] = fK, eU[gh + 1] = fK + 1, eU[gh + 2] = fK, eU[gh + 3] = fK + 3, eU[gh + 4] = fK + 1, eU[gh + 5] = fK + 2, eU[gh + 6] = fK + 2, eU[gh + 7] = fK + 3, gh += 8, fK += 4
										}
										az.bindBuffer(az.ELEMENT_ARRAY_BUFFER, a6.__webglFaceBuffer), az.bufferData(az.ELEMENT_ARRAY_BUFFER, f8, fU), az.bindBuffer(az.ELEMENT_ARRAY_BUFFER, a6.__webglLineBuffer), az.bufferData(az.ELEMENT_ARRAY_BUFFER, eU, fU)
									}
									if (gs) {
										for (fs = 0, cd = gs.length; fs < cd; fs++) {
											if ((fn = gs[fs]).__original.needsUpdate) {
												if (dd = 0, 1 === fn.size) {
													if (void 0 === fn.boundTo || "vertices" === fn.boundTo) {
														for (eJ = 0, aO = fY.length; eJ < aO; eJ++) {
															eW = aL[fY[eJ]], fn.array[dd] = fn.value[eW.a], fn.array[dd + 1] = fn.value[eW.b], fn.array[dd + 2] = fn.value[eW.c], dd += 3
														}
														for (eJ = 0, aO = e8.length; eJ < aO; eJ++) {
															eW = aL[e8[eJ]], fn.array[dd] = fn.value[eW.a], fn.array[dd + 1] = fn.value[eW.b], fn.array[dd + 2] = fn.value[eW.c], fn.array[dd + 3] = fn.value[eW.d], dd += 4
														}
													} else {
														if ("faces" === fn.boundTo) {
															for (eJ = 0, aO = fY.length; eJ < aO; eJ++) {
																db = fn.value[fY[eJ]], fn.array[dd] = db, fn.array[dd + 1] = db, fn.array[dd + 2] = db, dd += 3
															}
															for (eJ = 0, aO = e8.length; eJ < aO; eJ++) {
																db = fn.value[e8[eJ]], fn.array[dd] = db, fn.array[dd + 1] = db, fn.array[dd + 2] = db, fn.array[dd + 3] = db, dd += 4
															}
														}
													}
												} else {
													if (2 === fn.size) {
														if (void 0 === fn.boundTo || "vertices" === fn.boundTo) {
															for (eJ = 0, aO = fY.length; eJ < aO; eJ++) {
																eW = aL[fY[eJ]], aT = fn.value[eW.a], aU = fn.value[eW.b], aV = fn.value[eW.c], fn.array[dd] = aT.x, fn.array[dd + 1] = aT.y, fn.array[dd + 2] = aU.x, fn.array[dd + 3] = aU.y, fn.array[dd + 4] = aV.x, fn.array[dd + 5] = aV.y, dd += 6
															}
															for (eJ = 0, aO = e8.length; eJ < aO; eJ++) {
																eW = aL[e8[eJ]], aT = fn.value[eW.a], aU = fn.value[eW.b], aV = fn.value[eW.c], aD = fn.value[eW.d], fn.array[dd] = aT.x, fn.array[dd + 1] = aT.y, fn.array[dd + 2] = aU.x, fn.array[dd + 3] = aU.y, fn.array[dd + 4] = aV.x, fn.array[dd + 5] = aV.y, fn.array[dd + 6] = aD.x, fn.array[dd + 7] = aD.y, dd += 8
															}
														} else {
															if ("faces" === fn.boundTo) {
																for (eJ = 0, aO = fY.length; eJ < aO; eJ++) {
																	aV = aU = aT = db = fn.value[fY[eJ]], fn.array[dd] = aT.x, fn.array[dd + 1] = aT.y, fn.array[dd + 2] = aU.x, fn.array[dd + 3] = aU.y, fn.array[dd + 4] = aV.x, fn.array[dd + 5] = aV.y, dd += 6
																}
																for (eJ = 0, aO = e8.length; eJ < aO; eJ++) {
																	aD = aV = aU = aT = db = fn.value[e8[eJ]], fn.array[dd] = aT.x, fn.array[dd + 1] = aT.y, fn.array[dd + 2] = aU.x, fn.array[dd + 3] = aU.y, fn.array[dd + 4] = aV.x, fn.array[dd + 5] = aV.y, fn.array[dd + 6] = aD.x, fn.array[dd + 7] = aD.y, dd += 8
																}
															}
														}
													} else {
														if (3 === fn.size) {
															var fL;
															if (fL = "c" === fn.type ? ["r", "g", "b"] : ["x", "y", "z"], void 0 === fn.boundTo || "vertices" === fn.boundTo) {
																for (eJ = 0, aO = fY.length; eJ < aO; eJ++) {
																	eW = aL[fY[eJ]], aT = fn.value[eW.a], aU = fn.value[eW.b], aV = fn.value[eW.c], fn.array[dd] = aT[fL[0]], fn.array[dd + 1] = aT[fL[1]], fn.array[dd + 2] = aT[fL[2]], fn.array[dd + 3] = aU[fL[0]], fn.array[dd + 4] = aU[fL[1]], fn.array[dd + 5] = aU[fL[2]], fn.array[dd + 6] = aV[fL[0]], fn.array[dd + 7] = aV[fL[1]], fn.array[dd + 8] = aV[fL[2]], dd += 9
																}
																for (eJ = 0, aO = e8.length; eJ < aO; eJ++) {
																	eW = aL[e8[eJ]], aT = fn.value[eW.a], aU = fn.value[eW.b], aV = fn.value[eW.c], aD = fn.value[eW.d], fn.array[dd] = aT[fL[0]], fn.array[dd + 1] = aT[fL[1]], fn.array[dd + 2] = aT[fL[2]], fn.array[dd + 3] = aU[fL[0]], fn.array[dd + 4] = aU[fL[1]], fn.array[dd + 5] = aU[fL[2]], fn.array[dd + 6] = aV[fL[0]], fn.array[dd + 7] = aV[fL[1]], fn.array[dd + 8] = aV[fL[2]], fn.array[dd + 9] = aD[fL[0]], fn.array[dd + 10] = aD[fL[1]], fn.array[dd + 11] = aD[fL[2]], dd += 12
																}
															} else {
																if ("faces" === fn.boundTo) {
																	for (eJ = 0, aO = fY.length; eJ < aO; eJ++) {
																		aV = aU = aT = db = fn.value[fY[eJ]], fn.array[dd] = aT[fL[0]], fn.array[dd + 1] = aT[fL[1]], fn.array[dd + 2] = aT[fL[2]], fn.array[dd + 3] = aU[fL[0]], fn.array[dd + 4] = aU[fL[1]], fn.array[dd + 5] = aU[fL[2]], fn.array[dd + 6] = aV[fL[0]], fn.array[dd + 7] = aV[fL[1]], fn.array[dd + 8] = aV[fL[2]], dd += 9
																	}
																	for (eJ = 0, aO = e8.length; eJ < aO; eJ++) {
																		aD = aV = aU = aT = db = fn.value[e8[eJ]], fn.array[dd] = aT[fL[0]], fn.array[dd + 1] = aT[fL[1]], fn.array[dd + 2] = aT[fL[2]], fn.array[dd + 3] = aU[fL[0]], fn.array[dd + 4] = aU[fL[1]], fn.array[dd + 5] = aU[fL[2]], fn.array[dd + 6] = aV[fL[0]], fn.array[dd + 7] = aV[fL[1]], fn.array[dd + 8] = aV[fL[2]], fn.array[dd + 9] = aD[fL[0]], fn.array[dd + 10] = aD[fL[1]], fn.array[dd + 11] = aD[fL[2]], dd += 12
																	}
																}
															}
														} else {
															if (4 === fn.size) {
																if (void 0 === fn.boundTo || "vertices" === fn.boundTo) {
																	for (eJ = 0, aO = fY.length; eJ < aO; eJ++) {
																		eW = aL[fY[eJ]], aT = fn.value[eW.a], aU = fn.value[eW.b], aV = fn.value[eW.c], fn.array[dd] = aT.x, fn.array[dd + 1] = aT.y, fn.array[dd + 2] = aT.z, fn.array[dd + 3] = aT.w, fn.array[dd + 4] = aU.x, fn.array[dd + 5] = aU.y, fn.array[dd + 6] = aU.z, fn.array[dd + 7] = aU.w, fn.array[dd + 8] = aV.x, fn.array[dd + 9] = aV.y, fn.array[dd + 10] = aV.z, fn.array[dd + 11] = aV.w, dd += 12
																	}
																	for (eJ = 0, aO = e8.length; eJ < aO; eJ++) {
																		eW = aL[e8[eJ]], aT = fn.value[eW.a], aU = fn.value[eW.b], aV = fn.value[eW.c], aD = fn.value[eW.d], fn.array[dd] = aT.x, fn.array[dd + 1] = aT.y, fn.array[dd + 2] = aT.z, fn.array[dd + 3] = aT.w, fn.array[dd + 4] = aU.x, fn.array[dd + 5] = aU.y, fn.array[dd + 6] = aU.z, fn.array[dd + 7] = aU.w, fn.array[dd + 8] = aV.x, fn.array[dd + 9] = aV.y, fn.array[dd + 10] = aV.z, fn.array[dd + 11] = aV.w, fn.array[dd + 12] = aD.x, fn.array[dd + 13] = aD.y, fn.array[dd + 14] = aD.z, fn.array[dd + 15] = aD.w, dd += 16
																	}
																} else {
																	if ("faces" === fn.boundTo) {
																		for (eJ = 0, aO = fY.length; eJ < aO; eJ++) {
																			aV = aU = aT = db = fn.value[fY[eJ]], fn.array[dd] = aT.x, fn.array[dd + 1] = aT.y, fn.array[dd + 2] = aT.z, fn.array[dd + 3] = aT.w, fn.array[dd + 4] = aU.x, fn.array[dd + 5] = aU.y, fn.array[dd + 6] = aU.z, fn.array[dd + 7] = aU.w, fn.array[dd + 8] = aV.x, fn.array[dd + 9] = aV.y, fn.array[dd + 10] = aV.z, fn.array[dd + 11] = aV.w, dd += 12
																		}
																		for (eJ = 0, aO = e8.length; eJ < aO; eJ++) {
																			aD = aV = aU = aT = db = fn.value[e8[eJ]], fn.array[dd] = aT.x, fn.array[dd + 1] = aT.y, fn.array[dd + 2] = aT.z, fn.array[dd + 3] = aT.w, fn.array[dd + 4] = aU.x, fn.array[dd + 5] = aU.y, fn.array[dd + 6] = aU.z, fn.array[dd + 7] = aU.w, fn.array[dd + 8] = aV.x, fn.array[dd + 9] = aV.y, fn.array[dd + 10] = aV.z, fn.array[dd + 11] = aV.w, fn.array[dd + 12] = aD.x, fn.array[dd + 13] = aD.y, fn.array[dd + 14] = aD.z, fn.array[dd + 15] = aD.w, dd += 16
																		}
																	}
																}
															}
														}
													}
												}
												az.bindBuffer(az.ARRAY_BUFFER, fn.buffer), az.bufferData(az.ARRAY_BUFFER, fn.array, fU)
											}
										}
									}
									fE && (delete a6.__inittedArrays, delete a6.__colorArray, delete a6.__normalArray, delete a6.__tangentArray, delete a6.__uvArray, delete a6.__uv2Array, delete a6.__faceArray, delete a6.__vertexArray, delete a6.__lineArray, delete a6.__skinVertexAArray, delete a6.__skinVertexBArray, delete a6.__skinIndexArray, delete a6.__skinWeightArray)
								}
							}
						}
						gP.verticesNeedUpdate = !1, gP.morphTargetsNeedUpdate = !1, gP.elementsNeedUpdate = !1, gP.uvsNeedUpdate = !1, gP.normalsNeedUpdate = !1, gP.colorsNeedUpdate = !1, gP.tangetsNeedUpdate = !1, aN.attributes && O(aN)
					}
				} else {
					if (fv instanceof THREE.Ribbon) {
						if (gP.verticesNeedUpdate || gP.colorsNeedUpdate) {
							var eX = gP,
								gv = az.DYNAMIC_DRAW,
								e4 = void 0,
								X = void 0,
								a4 = void 0,
								da = void 0,
								fJ = void 0,
								gH = eX.vertices,
								fD = eX.colors,
								fm = gH.length,
								fT = fD.length,
								ba = eX.__vertexArray,
								eA = eX.__colorArray,
								e7 = eX.colorsNeedUpdate;
							if (eX.verticesNeedUpdate) {
								for (e4 = 0; e4 < fm; e4++) {
									a4 = gH[e4], ba[da = 3 * e4] = a4.x, ba[da + 1] = a4.y, ba[da + 2] = a4.z
								}
								az.bindBuffer(az.ARRAY_BUFFER, eX.__webglVertexBuffer), az.bufferData(az.ARRAY_BUFFER, ba, gv)
							}
							if (e7) {
								for (X = 0; X < fT; X++) {
									fJ = fD[X], eA[da = 3 * X] = fJ.r, eA[da + 1] = fJ.g, eA[da + 2] = fJ.b
								}
								az.bindBuffer(az.ARRAY_BUFFER, eX.__webglColorBuffer), az.bufferData(az.ARRAY_BUFFER, eA, gv)
							}
						}
						gP.verticesNeedUpdate = !1, gP.colorsNeedUpdate = !1
					} else {
						if (fv instanceof THREE.Line) {
							if (gF = (aN = at(fv, gq)).attributes && T(aN), gP.verticesNeedUpdate || gP.colorsNeedUpdate || gF) {
								var a3 = gP,
									gI = az.DYNAMIC_DRAW,
									ff = void 0,
									eP = void 0,
									gO = void 0,
									fa = void 0,
									gm = void 0,
									eH = a3.vertices,
									L = a3.colors,
									aB = eH.length,
									fl = L.length,
									gC = a3.__vertexArray,
									fo = a3.__colorArray,
									eS = a3.colorsNeedUpdate,
									ea = a3.__webglCustomAttributesList,
									fV = void 0,
									aH = void 0,
									fA = void 0,
									a1 = void 0,
									e3 = void 0,
									fu = void 0;
								if (a3.verticesNeedUpdate) {
									for (ff = 0; ff < aB; ff++) {
										gO = eH[ff], gC[fa = 3 * ff] = gO.x, gC[fa + 1] = gO.y, gC[fa + 2] = gO.z
									}
									az.bindBuffer(az.ARRAY_BUFFER, a3.__webglVertexBuffer), az.bufferData(az.ARRAY_BUFFER, gC, gI)
								}
								if (eS) {
									for (eP = 0; eP < fl; eP++) {
										gm = L[eP], fo[fa = 3 * eP] = gm.r, fo[fa + 1] = gm.g, fo[fa + 2] = gm.b
									}
									az.bindBuffer(az.ARRAY_BUFFER, a3.__webglColorBuffer), az.bufferData(az.ARRAY_BUFFER, fo, gI)
								}
								if (ea) {
									for (fV = 0, aH = ea.length; fV < aH; fV++) {
										if ((fu = ea[fV]).needsUpdate && (void 0 === fu.boundTo || "vertices" === fu.boundTo)) {
											if (fa = 0, a1 = fu.value.length, 1 === fu.size) {
												for (fA = 0; fA < a1; fA++) {
													fu.array[fA] = fu.value[fA]
												}
											} else {
												if (2 === fu.size) {
													for (fA = 0; fA < a1; fA++) {
														e3 = fu.value[fA], fu.array[fa] = e3.x, fu.array[fa + 1] = e3.y, fa += 2
													}
												} else {
													if (3 === fu.size) {
														if ("c" === fu.type) {
															for (fA = 0; fA < a1; fA++) {
																e3 = fu.value[fA], fu.array[fa] = e3.r, fu.array[fa + 1] = e3.g, fu.array[fa + 2] = e3.b, fa += 3
															}
														} else {
															for (fA = 0; fA < a1; fA++) {
																e3 = fu.value[fA], fu.array[fa] = e3.x, fu.array[fa + 1] = e3.y, fu.array[fa + 2] = e3.z, fa += 3
															}
														}
													} else {
														if (4 === fu.size) {
															for (fA = 0; fA < a1; fA++) {
																e3 = fu.value[fA], fu.array[fa] = e3.x, fu.array[fa + 1] = e3.y, fu.array[fa + 2] = e3.z, fu.array[fa + 3] = e3.w, fa += 4
															}
														}
													}
												}
											}
											az.bindBuffer(az.ARRAY_BUFFER, fu.buffer), az.bufferData(az.ARRAY_BUFFER, fu.array, gI)
										}
									}
								}
							}
							gP.verticesNeedUpdate = !1, gP.colorsNeedUpdate = !1, aN.attributes && O(aN)
						} else {
							fv instanceof THREE.ParticleSystem && (gF = (aN = at(fv, gq)).attributes && T(aN), (gP.verticesNeedUpdate || gP.colorsNeedUpdate || fv.sortParticles || gF) && aw(gP, az.DYNAMIC_DRAW, fv), gP.verticesNeedUpdate = !1, gP.colorsNeedUpdate = !1, aN.attributes && O(aN))
						}
					}
				}
			}
		}, this.initMaterial = function (x, B, I, N) {
			var V, X, aB, aF, aG, aH, L, S;
			if (x instanceof THREE.MeshDepthMaterial ? aB = "depth" : x instanceof THREE.MeshNormalMaterial ? aB = "normal" : x instanceof THREE.MeshBasicMaterial ? aB = "basic" : x instanceof THREE.MeshLambertMaterial ? aB = "lambert" : x instanceof THREE.MeshPhongMaterial ? aB = "phong" : x instanceof THREE.LineBasicMaterial ? aB = "basic" : x instanceof THREE.ParticleBasicMaterial && (aB = "particle_basic"), aB) {
				var aD = THREE.ShaderLib[aB];
				x.uniforms = THREE.UniformsUtils.clone(aD.uniforms), x.vertexShader = aD.vertexShader, x.fragmentShader = aD.fragmentShader
			}
			for (aF = L = S = aD = 0, aG = B.length; aF < aG; aF++) {
				(aH = B[aF]).onlyShadow || (aH instanceof THREE.DirectionalLight && L++, aH instanceof THREE.PointLight && S++, aH instanceof THREE.SpotLight && aD++)
			}
			S + aD + L <= A ? (aG = L, aH = S, L = aD) : (aG = Math.ceil(A * L / (S + L)), L = aH = A - aG);
			var aA = 0;
			aD = 0;
			for (S = B.length; aD < S; aD++) {
				(aF = B[aD]).castShadow && (aF instanceof THREE.SpotLight && aA++, aF instanceof THREE.DirectionalLight && !aF.shadowCascade && aA++)
			}
			var aC, W = 50;
			void 0 !== N && N instanceof THREE.SkinnedMesh && (W = N.bones.length);
			x: {
				S = x.fragmentShader,
				aF = x.vertexShader;
				var aE;aD = x.uniforms,
				B = x.attributes,
				I = {
					map: !!x.map,
					envMap: !!x.envMap,
					lightMap: !!x.lightMap,
					vertexColors: x.vertexColors,
					fog: I,
					useFog: x.fog,
					sizeAttenuation: x.sizeAttenuation,
					skinning: x.skinning,
					maxBones: W,
					morphTargets: x.morphTargets,
					morphNormals: x.morphNormals,
					maxMorphTargets: this.maxMorphTargets,
					maxMorphNormals: this.maxMorphNormals,
					maxDirLights: aG,
					maxPointLights: aH,
					maxSpotLights: L,
					maxShadows: aA,
					shadowMapEnabled: this.shadowMapEnabled && N.receiveShadow,
					shadowMapSoft: this.shadowMapSoft,
					shadowMapDebug: this.shadowMapDebug,
					shadowMapCascade: this.shadowMapCascade,
					alphaTest: x.alphaTest,
					metal: x.metal,
					perPixel: x.perPixel,
					wrapAround: x.wrapAround,
					doubleSided: N && N.doubleSided
				},
				N = [];
				for (aE in aB ? N.push(aB) : (N.push(S), N.push(aF)), I) {
					N.push(aE), N.push(I[aE])
				}
				for (aB = N.join(), aE = 0, N = e.length; aE < N; aE++) {
					if (e[aE].code === aB) {
						aC = e[aE].program;
						break x
					}
				}
				aE = az.createProgram(),
				N = ["precision " + ai + " float;", 0 < ae ? "#define VERTEX_TEXTURES" : "", s.gammaInput ? "#define GAMMA_INPUT" : "", s.gammaOutput ? "#define GAMMA_OUTPUT" : "", s.physicallyBasedShading ? "#define PHYSICALLY_BASED_SHADING" : "", "#define MAX_DIR_LIGHTS " + I.maxDirLights, "#define MAX_POINT_LIGHTS " + I.maxPointLights, "#define MAX_SPOT_LIGHTS " + I.maxSpotLights, "#define MAX_SHADOWS " + I.maxShadows, "#define MAX_BONES " + I.maxBones, I.map ? "#define USE_MAP" : "", I.envMap ? "#define USE_ENVMAP" : "", I.lightMap ? "#define USE_LIGHTMAP" : "", I.vertexColors ? "#define USE_COLOR" : "", I.skinning ? "#define USE_SKINNING" : "", I.morphTargets ? "#define USE_MORPHTARGETS" : "", I.morphNormals ? "#define USE_MORPHNORMALS" : "", I.perPixel ? "#define PHONG_PER_PIXEL" : "", I.wrapAround ? "#define WRAP_AROUND" : "", I.doubleSided ? "#define DOUBLE_SIDED" : "", I.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", I.shadowMapSoft ? "#define SHADOWMAP_SOFT" : "", I.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "", I.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "", I.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", "uniform mat4 objectMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\n#ifdef USE_COLOR\nattribute vec3 color;\n#endif\n#ifdef USE_MORPHTARGETS\nattribute vec3 morphTarget0;\nattribute vec3 morphTarget1;\nattribute vec3 morphTarget2;\nattribute vec3 morphTarget3;\n#ifdef USE_MORPHNORMALS\nattribute vec3 morphNormal0;\nattribute vec3 morphNormal1;\nattribute vec3 morphNormal2;\nattribute vec3 morphNormal3;\n#else\nattribute vec3 morphTarget4;\nattribute vec3 morphTarget5;\nattribute vec3 morphTarget6;\nattribute vec3 morphTarget7;\n#endif\n#endif\n#ifdef USE_SKINNING\nattribute vec4 skinVertexA;\nattribute vec4 skinVertexB;\nattribute vec4 skinIndex;\nattribute vec4 skinWeight;\n#endif\n"].join("\n"),
				aG = ["precision " + ai + " float;", "#define MAX_DIR_LIGHTS " + I.maxDirLights, "#define MAX_POINT_LIGHTS " + I.maxPointLights, "#define MAX_SPOT_LIGHTS " + I.maxSpotLights, "#define MAX_SHADOWS " + I.maxShadows, I.alphaTest ? "#define ALPHATEST " + I.alphaTest : "", s.gammaInput ? "#define GAMMA_INPUT" : "", s.gammaOutput ? "#define GAMMA_OUTPUT" : "", s.physicallyBasedShading ? "#define PHYSICALLY_BASED_SHADING" : "", I.useFog && I.fog ? "#define USE_FOG" : "", I.useFog && I.fog instanceof THREE.FogExp2 ? "#define FOG_EXP2" : "", I.map ? "#define USE_MAP" : "", I.envMap ? "#define USE_ENVMAP" : "", I.lightMap ? "#define USE_LIGHTMAP" : "", I.vertexColors ? "#define USE_COLOR" : "", I.metal ? "#define METAL" : "", I.perPixel ? "#define PHONG_PER_PIXEL" : "", I.wrapAround ? "#define WRAP_AROUND" : "", I.doubleSided ? "#define DOUBLE_SIDED" : "", I.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", I.shadowMapSoft ? "#define SHADOWMAP_SOFT" : "", I.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "", I.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "", "uniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\n"].join("\n"),
				az.attachShader(aE, ab("fragment", aG + S)),
				az.attachShader(aE, ab("vertex", N + aF)),
				az.linkProgram(aE),
				az.getProgramParameter(aE, az.LINK_STATUS) || console.error("Could not initialise shader\nVALIDATE_STATUS: " + az.getProgramParameter(aE, az.VALIDATE_STATUS) + ", gl error [" + az.getError() + "]"),
				aE.uniforms = {},
				aE.attributes = {};
				var aI;N = ["viewMatrix", "modelViewMatrix", "projectionMatrix", "normalMatrix", "objectMatrix", "cameraPosition", "boneGlobalMatrices", "morphTargetInfluences"];
				for (aI in aD) {
					N.push(aI)
				}
				for (aI = N, N = 0, aD = aI.length; N < aD; N++) {
					S = aI[N], aE.uniforms[S] = az.getUniformLocation(aE, S)
				}
				for (N = ["position", "normal", "uv", "uv2", "tangent", "color", "skinVertexA", "skinVertexB", "skinIndex", "skinWeight"], aI = 0; aI < I.maxMorphTargets; aI++) {
					N.push("morphTarget" + aI)
				}
				for (aI = 0; aI < I.maxMorphNormals; aI++) {
					N.push("morphNormal" + aI)
				}
				for (aC in B) {
					N.push(aC)
				}
				for (aI = 0, B = (aC = N).length; aI < B; aI++) {
					I = aC[aI], aE.attributes[I] = az.getAttribLocation(aE, I)
				}
				aE.id = e.length,
				e.push({
					program: aE,
					code: aB
				}),
				s.info.memory.programs = e.length,
				aC = aE
			}
			if (x.program = aC, 0 <= (aC = x.program.attributes).position && az.enableVertexAttribArray(aC.position), 0 <= aC.color && az.enableVertexAttribArray(aC.color), 0 <= aC.normal && az.enableVertexAttribArray(aC.normal), 0 <= aC.tangent && az.enableVertexAttribArray(aC.tangent), x.skinning && 0 <= aC.skinVertexA && 0 <= aC.skinVertexB && 0 <= aC.skinIndex && 0 <= aC.skinWeight && (az.enableVertexAttribArray(aC.skinVertexA), az.enableVertexAttribArray(aC.skinVertexB), az.enableVertexAttribArray(aC.skinIndex), az.enableVertexAttribArray(aC.skinWeight)), x.attributes) {
				for (X in x.attributes) {
					void 0 !== aC[X] && 0 <= aC[X] && az.enableVertexAttribArray(aC[X])
				}
			}
			if (x.morphTargets) {
				for (aE = "morphTarget", X = x.numSupportedMorphTargets = 0; X < this.maxMorphTargets; X++) {
					0 <= aC[aI = aE + X] && (az.enableVertexAttribArray(aC[aI]), x.numSupportedMorphTargets++)
				}
			}
			if (x.morphNormals) {
				for (aE = "morphNormal", X = x.numSupportedMorphNormals = 0; X < this.maxMorphNormals; X++) {
					0 <= aC[aI = aE + X] && (az.enableVertexAttribArray(aC[aI]), x.numSupportedMorphNormals++)
				}
			}
			for (V in x.uniformsList = [], x.uniforms) {
				x.uniformsList.push([x.uniforms[V], V])
			}
		}, this.setFaceCulling = function (x, B) {
			x ? (B && "ccw" !== B ? az.frontFace(az.CW) : az.frontFace(az.CCW), "back" === x ? az.cullFace(az.BACK) : "front" === x ? az.cullFace(az.FRONT) : az.cullFace(az.FRONT_AND_BACK), az.enable(az.CULL_FACE)) : az.disable(az.CULL_FACE)
		}, this.setObjectFaces = function (x) {
			aj !== x.doubleSided && (x.doubleSided ? az.disable(az.CULL_FACE) : az.enable(az.CULL_FACE), aj = x.doubleSided), D !== x.flipSided && (x.flipSided ? az.frontFace(az.CW) : az.frontFace(az.CCW), D = x.flipSided)
		}, this.setDepthTest = function (x) {
			P !== x && (x ? az.enable(az.DEPTH_TEST) : az.disable(az.DEPTH_TEST), P = x)
		}, this.setDepthWrite = function (x) {
			d !== x && (az.depthMask(x), d = x)
		}, this.setBlending = function (I, L, x, B) {
			if (I !== H) {
				switch (I) {
					case THREE.NoBlending:
						az.disable(az.BLEND);
						break;
					case THREE.AdditiveBlending:
						az.enable(az.BLEND), az.blendEquation(az.FUNC_ADD), az.blendFunc(az.SRC_ALPHA, az.ONE);
						break;
					case THREE.SubtractiveBlending:
						az.enable(az.BLEND), az.blendEquation(az.FUNC_ADD), az.blendFunc(az.ZERO, az.ONE_MINUS_SRC_COLOR);
						break;
					case THREE.MultiplyBlending:
						az.enable(az.BLEND), az.blendEquation(az.FUNC_ADD), az.blendFunc(az.ZERO, az.SRC_COLOR);
						break;
					case THREE.CustomBlending:
						az.enable(az.BLEND);
						break;
					default:
						az.enable(az.BLEND), az.blendEquationSeparate(az.FUNC_ADD, az.FUNC_ADD), az.blendFuncSeparate(az.SRC_ALPHA, az.ONE_MINUS_SRC_ALPHA, az.ONE, az.ONE_MINUS_SRC_ALPHA)
				}
				H = I
			}
			I === THREE.CustomBlending ? (L !== r && (az.blendEquation(t(L)), r = L), x === am && B === v || (az.blendFunc(t(x), t(B)), am = x, v = B)) : v = am = r = null
		}, this.setTexture = function (N, S) {
			if (N.needsUpdate) {
				N.__webglInit || (N.__webglInit = !0, N.__webglTexture = az.createTexture(), s.info.memory.textures++), az.activeTexture(az.TEXTURE0 + S), az.bindTexture(az.TEXTURE_2D, N.__webglTexture), az.pixelStorei(az.UNPACK_PREMULTIPLY_ALPHA_WEBGL, N.premultiplyAlpha);
				var x = N.image,
					B = 0 == (x.width & x.width - 1) && 0 == (x.height & x.height - 1),
					I = t(N.format),
					L = t(N.type);
				ag(az.TEXTURE_2D, N, B), N instanceof THREE.DataTexture ? az.texImage2D(az.TEXTURE_2D, 0, I, x.width, x.height, 0, I, L, x.data) : az.texImage2D(az.TEXTURE_2D, 0, I, I, L, N.image), N.generateMipmaps && B && az.generateMipmap(az.TEXTURE_2D), N.needsUpdate = !1, N.onUpdate && N.onUpdate()
			} else {
				az.activeTexture(az.TEXTURE0 + S), az.bindTexture(az.TEXTURE_2D, N.__webglTexture)
			}
		}, this.setRenderTarget = function (L) {
			var N = L instanceof THREE.WebGLRenderTargetCube;
			if (L && !L.__webglFramebuffer) {
				void 0 === L.depthBuffer && (L.depthBuffer = !0), void 0 === L.stencilBuffer && (L.stencilBuffer = !0), L.__webglTexture = az.createTexture();
				var S = 0 == (L.width & L.width - 1) && 0 == (L.height & L.height - 1),
					V = t(L.format),
					W = t(L.type);
				if (N) {
					L.__webglFramebuffer = [], L.__webglRenderbuffer = [], az.bindTexture(az.TEXTURE_CUBE_MAP, L.__webglTexture), ag(az.TEXTURE_CUBE_MAP, L, S);
					for (var x = 0; x < 6; x++) {
						L.__webglFramebuffer[x] = az.createFramebuffer(), L.__webglRenderbuffer[x] = az.createRenderbuffer(), az.texImage2D(az.TEXTURE_CUBE_MAP_POSITIVE_X + x, 0, V, L.width, L.height, 0, V, W, null);
						var B = L,
							I = az.TEXTURE_CUBE_MAP_POSITIVE_X + x;
						az.bindFramebuffer(az.FRAMEBUFFER, L.__webglFramebuffer[x]), az.framebufferTexture2D(az.FRAMEBUFFER, az.COLOR_ATTACHMENT0, I, B.__webglTexture, 0), aa(L.__webglRenderbuffer[x], L)
					}
					S && az.generateMipmap(az.TEXTURE_CUBE_MAP)
				} else {
					L.__webglFramebuffer = az.createFramebuffer(), L.__webglRenderbuffer = az.createRenderbuffer(), az.bindTexture(az.TEXTURE_2D, L.__webglTexture), ag(az.TEXTURE_2D, L, S), az.texImage2D(az.TEXTURE_2D, 0, V, L.width, L.height, 0, V, W, null), V = az.TEXTURE_2D, az.bindFramebuffer(az.FRAMEBUFFER, L.__webglFramebuffer), az.framebufferTexture2D(az.FRAMEBUFFER, az.COLOR_ATTACHMENT0, V, L.__webglTexture, 0), aa(L.__webglRenderbuffer, L), S && az.generateMipmap(az.TEXTURE_2D)
				}
				N ? az.bindTexture(az.TEXTURE_CUBE_MAP, null) : az.bindTexture(az.TEXTURE_2D, null), az.bindRenderbuffer(az.RENDERBUFFER, null), az.bindFramebuffer(az.FRAMEBUFFER, null)
			}
			L ? (N = N ? L.__webglFramebuffer[L.activeCubeFace] : L.__webglFramebuffer, S = L.width, L = L.height, W = V = 0) : (N = null, S = i, L = E, V = f, W = ah), N !== m && (az.bindFramebuffer(az.FRAMEBUFFER, N), az.viewport(V, W, S, L), m = N), F = S, k = L
		}, this.shadowMapPlugin = new THREE.ShadowMapPlugin, this.addPrePlugin(this.shadowMapPlugin), this.addPostPlugin(new THREE.SpritePlugin), this.addPostPlugin(new THREE.LensFlarePlugin)
	}, THREE.WebGLRenderTarget = function (b, c, a) {
		this.width = b, this.height = c, a = a || {}, this.wrapS = void 0 !== a.wrapS ? a.wrapS : THREE.ClampToEdgeWrapping, this.wrapT = void 0 !== a.wrapT ? a.wrapT : THREE.ClampToEdgeWrapping, this.magFilter = void 0 !== a.magFilter ? a.magFilter : THREE.LinearFilter, this.minFilter = void 0 !== a.minFilter ? a.minFilter : THREE.LinearMipMapLinearFilter, this.offset = new THREE.Vector2(0, 0), this.repeat = new THREE.Vector2(1, 1), this.format = void 0 !== a.format ? a.format : THREE.RGBAFormat, this.type = void 0 !== a.type ? a.type : THREE.UnsignedByteType, this.depthBuffer = void 0 === a.depthBuffer || a.depthBuffer, this.stencilBuffer = void 0 === a.stencilBuffer || a.stencilBuffer, this.generateMipmaps = !0
	}, THREE.WebGLRenderTarget.prototype.clone = function () {
		var a = new THREE.WebGLRenderTarget(this.width, this.height);
		return a.wrapS = this.wrapS, a.wrapT = this.wrapT, a.magFilter = this.magFilter, a.minFilter = this.minFilter, a.offset.copy(this.offset), a.repeat.copy(this.repeat), a.format = this.format, a.type = this.type, a.depthBuffer = this.depthBuffer, a.stencilBuffer = this.stencilBuffer, a
	}, THREE.WebGLRenderTargetCube = function (b, c, a) {
		THREE.WebGLRenderTarget.call(this, b, c, a), this.activeCubeFace = 0
	}, THREE.WebGLRenderTargetCube.prototype = new THREE.WebGLRenderTarget, THREE.WebGLRenderTargetCube.prototype.constructor = THREE.WebGLRenderTargetCube, THREE.RenderableVertex = function () {
		this.positionWorld = new THREE.Vector3, this.positionScreen = new THREE.Vector4, this.visible = !0
	}, THREE.RenderableVertex.prototype.copy = function (a) {
		this.positionWorld.copy(a.positionWorld), this.positionScreen.copy(a.positionScreen)
	}, THREE.RenderableFace3 = function () {
		this.v1 = new THREE.RenderableVertex, this.v2 = new THREE.RenderableVertex, this.v3 = new THREE.RenderableVertex, this.centroidWorld = new THREE.Vector3, this.centroidScreen = new THREE.Vector3, this.normalWorld = new THREE.Vector3, this.vertexNormalsWorld = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3], this.faceMaterial = this.material = null, this.uvs = [
			[]
		], this.z = null
	}, THREE.RenderableFace4 = function () {
		this.v1 = new THREE.RenderableVertex, this.v2 = new THREE.RenderableVertex, this.v3 = new THREE.RenderableVertex, this.v4 = new THREE.RenderableVertex, this.centroidWorld = new THREE.Vector3, this.centroidScreen = new THREE.Vector3, this.normalWorld = new THREE.Vector3, this.vertexNormalsWorld = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3], this.faceMaterial = this.material = null, this.uvs = [
			[]
		], this.z = null
	}, THREE.RenderableObject = function () {
		this.z = this.object = null
	}, THREE.RenderableParticle = function () {
		this.rotation = this.z = this.y = this.x = null, this.scale = new THREE.Vector2, this.material = null
	}, THREE.RenderableLine = function () {
		this.z = null, this.v1 = new THREE.RenderableVertex, this.v2 = new THREE.RenderableVertex, this.material = null
	}, THREE.ColorUtils = {
		adjustHSV: function (d, e, a, b) {
			var c = THREE.ColorUtils.__hsv;
			THREE.ColorUtils.rgbToHsv(d, c), c.h = THREE.Math.clamp(c.h + e, 0, 1), c.s = THREE.Math.clamp(c.s + a, 0, 1), c.v = THREE.Math.clamp(c.v + b, 0, 1), d.setHSV(c.h, c.s, c.v)
		},
		rgbToHsv: function (d, e) {
			var f = d.r,
				g = d.g,
				h = d.b,
				a = Math.max(Math.max(f, g), h);
			if ((b = Math.min(Math.min(f, g), h)) === a) {
				b = f = 0
			} else {
				var c = a - b,
					b = c / a;
				(f = (f === a ? (g - h) / c : g === a ? 2 + (h - f) / c : 4 + (f - g) / c) / 6) < 0 && (f += 1), 1 < f && (f -= 1)
			}
			return void 0 === e && (e = {
				h: 0,
				s: 0,
				v: 0
			}), e.h = f, e.s = b, e.v = a, e
		}
	}, THREE.ColorUtils.__hsv = {
		h: 0,
		s: 0,
		v: 0
	}, THREE.WebGLRenderer && (THREE.ShaderUtils = {
		lib: {
			fresnel: {
				uniforms: {
					mRefractionRatio: {
						type: "f",
						value: 1.02
					},
					mFresnelBias: {
						type: "f",
						value: 0.1
					},
					mFresnelPower: {
						type: "f",
						value: 2
					},
					mFresnelScale: {
						type: "f",
						value: 1
					},
					tCube: {
						type: "t",
						value: 1,
						texture: null
					}
				},
				fragmentShader: "uniform samplerCube tCube;\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\nvoid main() {\nvec4 reflectedColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\nvec4 refractedColor = vec4( 1.0, 1.0, 1.0, 1.0 );\nrefractedColor.r = textureCube( tCube, vec3( -vRefract[0].x, vRefract[0].yz ) ).r;\nrefractedColor.g = textureCube( tCube, vec3( -vRefract[1].x, vRefract[1].yz ) ).g;\nrefractedColor.b = textureCube( tCube, vec3( -vRefract[2].x, vRefract[2].yz ) ).b;\nrefractedColor.a = 1.0;\ngl_FragColor = mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );\n}",
				vertexShader: "uniform float mRefractionRatio;\nuniform float mFresnelBias;\nuniform float mFresnelScale;\nuniform float mFresnelPower;\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvec3 nWorld = normalize ( mat3( objectMatrix[0].xyz, objectMatrix[1].xyz, objectMatrix[2].xyz ) * normal );\nvec3 I = mPosition.xyz - cameraPosition;\nvReflect = reflect( I, nWorld );\nvRefract[0] = refract( normalize( I ), nWorld, mRefractionRatio );\nvRefract[1] = refract( normalize( I ), nWorld, mRefractionRatio * 0.99 );\nvRefract[2] = refract( normalize( I ), nWorld, mRefractionRatio * 0.98 );\nvReflectionFactor = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( I ), nWorld ), mFresnelPower );\ngl_Position = projectionMatrix * mvPosition;\n}"
			},
			normal: {
				uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap, {
					enableAO: {
						type: "i",
						value: 0
					},
					enableDiffuse: {
						type: "i",
						value: 0
					},
					enableSpecular: {
						type: "i",
						value: 0
					},
					enableReflection: {
						type: "i",
						value: 0
					},
					tDiffuse: {
						type: "t",
						value: 0,
						texture: null
					},
					tCube: {
						type: "t",
						value: 1,
						texture: null
					},
					tNormal: {
						type: "t",
						value: 2,
						texture: null
					},
					tSpecular: {
						type: "t",
						value: 3,
						texture: null
					},
					tAO: {
						type: "t",
						value: 4,
						texture: null
					},
					tDisplacement: {
						type: "t",
						value: 5,
						texture: null
					},
					uNormalScale: {
						type: "f",
						value: 1
					},
					uDisplacementBias: {
						type: "f",
						value: 0
					},
					uDisplacementScale: {
						type: "f",
						value: 1
					},
					uDiffuseColor: {
						type: "c",
						value: new THREE.Color(16777215)
					},
					uSpecularColor: {
						type: "c",
						value: new THREE.Color(1118481)
					},
					uAmbientColor: {
						type: "c",
						value: new THREE.Color(16777215)
					},
					uShininess: {
						type: "f",
						value: 30
					},
					uOpacity: {
						type: "f",
						value: 1
					},
					uReflectivity: {
						type: "f",
						value: 0.5
					},
					uOffset: {
						type: "v2",
						value: new THREE.Vector2(0, 0)
					},
					uRepeat: {
						type: "v2",
						value: new THREE.Vector2(1, 1)
					},
					wrapRGB: {
						type: "v3",
						value: new THREE.Vector3(1, 1, 1)
					}
				}]),
				fragmentShader: ["uniform vec3 uAmbientColor;\nuniform vec3 uDiffuseColor;\nuniform vec3 uSpecularColor;\nuniform float uShininess;\nuniform float uOpacity;\nuniform bool enableDiffuse;\nuniform bool enableSpecular;\nuniform bool enableAO;\nuniform bool enableReflection;\nuniform sampler2D tDiffuse;\nuniform sampler2D tNormal;\nuniform sampler2D tSpecular;\nuniform sampler2D tAO;\nuniform samplerCube tCube;\nuniform float uNormalScale;\nuniform float uReflectivity;\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif\nvarying vec3 vViewPosition;", THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, "void main() {\ngl_FragColor = vec4( vec3( 1.0 ), uOpacity );\nvec3 specularTex = vec3( 1.0 );\nvec3 normalTex = texture2D( tNormal, vUv ).xyz * 2.0 - 1.0;\nnormalTex.xy *= uNormalScale;\nnormalTex = normalize( normalTex );\nif( enableDiffuse ) {\n#ifdef GAMMA_INPUT\nvec4 texelColor = texture2D( tDiffuse, vUv );\ntexelColor.xyz *= texelColor.xyz;\ngl_FragColor = gl_FragColor * texelColor;\n#else\ngl_FragColor = gl_FragColor * texture2D( tDiffuse, vUv );\n#endif\n}\nif( enableAO ) {\n#ifdef GAMMA_INPUT\nvec4 aoColor = texture2D( tAO, vUv );\naoColor.xyz *= aoColor.xyz;\ngl_FragColor.xyz = gl_FragColor.xyz * aoColor.xyz;\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * texture2D( tAO, vUv ).xyz;\n#endif\n}\nif( enableSpecular )\nspecularTex = texture2D( tSpecular, vUv ).xyz;\nmat3 tsb = mat3( normalize( vTangent ), normalize( vBinormal ), normalize( vNormal ) );\nvec3 finalNormal = tsb * normalTex;\nvec3 normal = normalize( finalNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse = vec3( 0.0 );\nvec3 pointSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec3 pointVector = normalize( vPointLight[ i ].xyz );\nfloat pointDistance = vPointLight[ i ].w;\n#ifdef WRAP_AROUND\nfloat pointDiffuseWeightFull = max( dot( normal, pointVector ), 0.0 );\nfloat pointDiffuseWeightHalf = max( 0.5 * dot( normal, pointVector ) + 0.5, 0.0 );\nvec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n#else\nfloat pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\n#endif\npointDiffuse += pointDistance * pointLightColor[ i ] * uDiffuseColor * pointDiffuseWeight;\nvec3 pointHalfVector = normalize( pointVector + viewPosition );\nfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\nfloat pointSpecularWeight = specularTex.r * max( pow( pointDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( pointVector, pointHalfVector ), 5.0 );\npointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * pointDistance * specularNormalization;\n#else\npointSpecular += pointDistance * pointLightColor[ i ] * uSpecularColor * pointSpecularWeight * pointDiffuseWeight;\n#endif\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec3 dirDiffuse = vec3( 0.0 );\nvec3 dirSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\n#ifdef WRAP_AROUND\nfloat directionalLightWeightingFull = max( dot( normal, dirVector ), 0.0 );\nfloat directionalLightWeightingHalf = max( 0.5 * dot( normal, dirVector ) + 0.5, 0.0 );\nvec3 dirDiffuseWeight = mix( vec3( directionalLightWeightingFull ), vec3( directionalLightWeightingHalf ), wrapRGB );\n#else\nfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\n#endif\ndirDiffuse += directionalLightColor[ i ] * uDiffuseColor * dirDiffuseWeight;\nvec3 dirHalfVector = normalize( dirVector + viewPosition );\nfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\nfloat dirSpecularWeight = specularTex.r * max( pow( dirDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );\ndirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n#else\ndirSpecular += directionalLightColor[ i ] * uSpecularColor * dirSpecularWeight * dirDiffuseWeight;\n#endif\n}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\ngl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * uAmbientColor) + totalSpecular;\nif ( enableReflection ) {\nvec3 wPos = cameraPosition - vViewPosition;\nvec3 vReflect = reflect( normalize( wPos ), normal );\nvec4 cubeColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\n#ifdef GAMMA_INPUT\ncubeColor.xyz *= cubeColor.xyz;\n#endif\ngl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularTex.r * uReflectivity );\n}", THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n"),
				vertexShader: ["attribute vec4 tangent;\nuniform vec2 uOffset;\nuniform vec2 uRepeat;\n#ifdef VERTEX_TEXTURES\nuniform sampler2D tDisplacement;\nuniform float uDisplacementScale;\nuniform float uDisplacementBias;\n#endif\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\nvarying vec3 vViewPosition;", THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvViewPosition = -mvPosition.xyz;\nvNormal = normalMatrix * normal;\nvTangent = normalMatrix * tangent.xyz;\nvBinormal = cross( vNormal, vTangent ) * tangent.w;\nvUv = uv * uRepeat + uOffset;\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nvPointLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#ifdef VERTEX_TEXTURES\nvec3 dv = texture2D( tDisplacement, uv ).xyz;\nfloat df = uDisplacementScale * dv.x + uDisplacementBias;\nvec4 displacedPosition = vec4( normalize( vNormal.xyz ) * df, 0.0 ) + mvPosition;\ngl_Position = projectionMatrix * displacedPosition;\n#else\ngl_Position = projectionMatrix * mvPosition;\n#endif", THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n")
			},
			cube: {
				uniforms: {
					tCube: {
						type: "t",
						value: 1,
						texture: null
					},
					tFlip: {
						type: "f",
						value: -1
					}
				},
				vertexShader: "varying vec3 vViewPosition;\nvoid main() {\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvViewPosition = cameraPosition - mPosition.xyz;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
				fragmentShader: "uniform samplerCube tCube;\nuniform float tFlip;\nvarying vec3 vViewPosition;\nvoid main() {\nvec3 wPos = cameraPosition - vViewPosition;\ngl_FragColor = textureCube( tCube, vec3( tFlip * wPos.x, wPos.yz ) );\n}"
			}
		}
	}), THREE.BufferGeometry = function () {
		this.id = THREE.GeometryCount++, this.vertexColorArray = this.vertexUvArray = this.vertexNormalArray = this.vertexPositionArray = this.vertexIndexArray = this.vertexColorBuffer = this.vertexUvBuffer = this.vertexNormalBuffer = this.vertexPositionBuffer = this.vertexIndexBuffer = null, this.dynamic = !1, this.boundingSphere = this.boundingBox = null, this.morphTargets = []
	}, THREE.BufferGeometry.prototype = {
		constructor: THREE.BufferGeometry,
		computeBoundingBox: function () {},
		computeBoundingSphere: function () {}
	}, THREE.Curve = function () {}, THREE.Curve.prototype.getPoint = function () {
		return console.log("Warning, getPoint() not implemented!"), null
	}, THREE.Curve.prototype.getPointAt = function (a) {
		return this.getPoint(this.getUtoTmapping(a))
	}, THREE.Curve.prototype.getPoints = function (b) {
		b || (b = 5);
		var c, a = [];
		for (c = 0; c <= b; c++) {
			a.push(this.getPoint(c / b))
		}
		return a
	}, THREE.Curve.prototype.getSpacedPoints = function (b) {
		b || (b = 5);
		var c, a = [];
		for (c = 0; c <= b; c++) {
			a.push(this.getPointAt(c / b))
		}
		return a
	}, THREE.Curve.prototype.getLength = function () {
		var a = this.getLengths();
		return a[a.length - 1]
	}, THREE.Curve.prototype.getLengths = function (e) {
		if (e || (e = this.__arcLengthDivisions ? this.__arcLengthDivisions : 200), this.cacheArcLengths && this.cacheArcLengths.length == e + 1 && !this.needsUpdate) {
			return this.cacheArcLengths
		}
		this.needsUpdate = !1;
		var a, c, f = [],
			b = this.getPoint(0),
			d = 0;
		for (f.push(0), c = 1; c <= e; c++) {
			d += (a = this.getPoint(c / e)).distanceTo(b), f.push(d), b = a
		}
		return this.cacheArcLengths = f
	}, THREE.Curve.prototype.updateArcLengths = function () {
		this.needsUpdate = !0, this.getLengths()
	}, THREE.Curve.prototype.getUtoTmapping = function (a, b) {
		var f, c = this.getLengths(),
			d = 0,
			e = c.length;
		f = b || a * c[e - 1];
		for (var j, g = 0, h = e - 1; g <= h;) {
			if ((j = c[d = Math.floor(g + (h - g) / 2)] - f) < 0) {
				g = d + 1
			} else {
				if (!(0 < j)) {
					h = d;
					break
				}
				h = d - 1
			}
		}
		return c[d = h] == f ? d / (e - 1) : (d + (f - (g = c[d])) / (c[d + 1] - g)) / (e - 1)
	}, THREE.Curve.prototype.getNormalVector = function (a) {
		return a = this.getTangent(a), new THREE.Vector2(-a.y, a.x)
	}, THREE.Curve.prototype.getTangent = function (a) {
		var b = a - 0.0001;
		return b < 0 && (b = 0), 1 < (a = a + 0.0001) && (a = 1), b = this.getPoint(b), this.getPoint(a).clone().subSelf(b).normalize()
	}, THREE.Curve.prototype.getTangentAt = function (a) {
		return this.getTangent(this.getUtoTmapping(a))
	}, THREE.LineCurve = function (a, b) {
		this.v1 = a, this.v2 = b
	}, THREE.LineCurve.prototype = new THREE.Curve, THREE.LineCurve.prototype.constructor = THREE.LineCurve, THREE.LineCurve.prototype.getPoint = function (a) {
		var b = this.v2.clone().subSelf(this.v1);
		return b.multiplyScalar(a).addSelf(this.v1), b
	}, THREE.LineCurve.prototype.getPointAt = function (a) {
		return this.getPoint(a)
	}, THREE.LineCurve.prototype.getTangent = function () {
		return this.v2.clone().subSelf(this.v1).normalize()
	}, THREE.QuadraticBezierCurve = function (b, c, a) {
		this.v0 = b, this.v1 = c, this.v2 = a
	}, THREE.QuadraticBezierCurve.prototype = new THREE.Curve, THREE.QuadraticBezierCurve.prototype.constructor = THREE.QuadraticBezierCurve, THREE.QuadraticBezierCurve.prototype.getPoint = function (a) {
		var b;
		return b = THREE.Shape.Utils.b2(a, this.v0.x, this.v1.x, this.v2.x), a = THREE.Shape.Utils.b2(a, this.v0.y, this.v1.y, this.v2.y), new THREE.Vector2(b, a)
	}, THREE.QuadraticBezierCurve.prototype.getTangent = function (a) {
		var b;
		return b = THREE.Curve.Utils.tangentQuadraticBezier(a, this.v0.x, this.v1.x, this.v2.x), a = THREE.Curve.Utils.tangentQuadraticBezier(a, this.v0.y, this.v1.y, this.v2.y), (b = new THREE.Vector2(b, a)).normalize(), b
	}, THREE.CubicBezierCurve = function (c, d, a, b) {
		this.v0 = c, this.v1 = d, this.v2 = a, this.v3 = b
	}, THREE.CubicBezierCurve.prototype = new THREE.Curve, THREE.CubicBezierCurve.prototype.constructor = THREE.CubicBezierCurve, THREE.CubicBezierCurve.prototype.getPoint = function (a) {
		var b;
		return b = THREE.Shape.Utils.b3(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x), a = THREE.Shape.Utils.b3(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y), new THREE.Vector2(b, a)
	}, THREE.CubicBezierCurve.prototype.getTangent = function (a) {
		var b;
		return b = THREE.Curve.Utils.tangentCubicBezier(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x), a = THREE.Curve.Utils.tangentCubicBezier(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y), (b = new THREE.Vector2(b, a)).normalize(), b
	}, THREE.SplineCurve = function (a) {
		this.points = null == a ? [] : a
	}, THREE.SplineCurve.prototype = new THREE.Curve, THREE.SplineCurve.prototype.constructor = THREE.SplineCurve, THREE.SplineCurve.prototype.getPoint = function (d) {
		var c, e = new THREE.Vector2,
			a = [],
			b = this.points;
		return c = (b.length - 1) * d, c -= d = Math.floor(c), a[0] = 0 == d ? d : d - 1, a[1] = d, a[2] = d > b.length - 2 ? b.length - 1 : d + 1, a[3] = d > b.length - 3 ? b.length - 1 : d + 2, e.x = THREE.Curve.Utils.interpolate(b[a[0]].x, b[a[1]].x, b[a[2]].x, b[a[3]].x, c), e.y = THREE.Curve.Utils.interpolate(b[a[0]].y, b[a[1]].y, b[a[2]].y, b[a[3]].y, c), e
	}, THREE.ArcCurve = function (e, f, a, b, c, d) {
		this.aX = e, this.aY = f, this.aRadius = a, this.aStartAngle = b, this.aEndAngle = c, this.aClockwise = d
	}, THREE.ArcCurve.prototype = new THREE.Curve, THREE.ArcCurve.prototype.constructor = THREE.ArcCurve, THREE.ArcCurve.prototype.getPoint = function (a) {
		var b = this.aEndAngle - this.aStartAngle;
		return this.aClockwise || (a = 1 - a), b = this.aStartAngle + a * b, a = this.aX + this.aRadius * Math.cos(b), b = this.aY + this.aRadius * Math.sin(b), new THREE.Vector2(a, b)
	}, THREE.Curve.Utils = {
		tangentQuadraticBezier: function (c, d, a, b) {
			return 2 * (1 - c) * (a - d) + 2 * c * (b - a)
		},
		tangentCubicBezier: function (d, e, a, b, c) {
			return -3 * e * (1 - d) * (1 - d) + 3 * a * (1 - d) * (1 - d) - 6 * d * a * (1 - d) + 6 * d * b * (1 - d) - 3 * d * d * b + 3 * d * d * c
		},
		tangentSpline: function (a) {
			return 6 * a * a - 6 * a + (3 * a * a - 4 * a + 1) + (-6 * a * a + 6 * a) + (3 * a * a - 2 * a)
		},
		interpolate: function (e, f, a, b, c) {
			var d = c * c;
			return (2 * f - 2 * a + (e = 0.5 * (a - e)) + (b = 0.5 * (b - f))) * c * d + (-3 * f + 3 * a - 2 * e - b) * d + e * c + f
		}
	}, THREE.Curve.create = function (a, b) {
		return a.prototype = new THREE.Curve, (a.prototype.constructor = a).prototype.getPoint = b, a
	}, THREE.LineCurve3 = THREE.Curve.create(function (a, b) {
		this.v1 = a, this.v2 = b
	}, function (a) {
		var b = new THREE.Vector3;
		return b.sub(this.v2, this.v1), b.multiplyScalar(a), b.addSelf(this.v1), b
	}), THREE.QuadraticBezierCurve3 = THREE.Curve.create(function (b, c, a) {
		this.v0 = b, this.v1 = c, this.v2 = a
	}, function (b) {
		var c, a;
		return c = THREE.Shape.Utils.b2(b, this.v0.x, this.v1.x, this.v2.x), a = THREE.Shape.Utils.b2(b, this.v0.y, this.v1.y, this.v2.y), b = THREE.Shape.Utils.b2(b, this.v0.z, this.v1.z, this.v2.z), new THREE.Vector3(c, a, b)
	}), THREE.CubicBezierCurve3 = THREE.Curve.create(function (c, d, a, b) {
		this.v0 = c, this.v1 = d, this.v2 = a, this.v3 = b
	}, function (b) {
		var c, a;
		return c = THREE.Shape.Utils.b3(b, this.v0.x, this.v1.x, this.v2.x, this.v3.x), a = THREE.Shape.Utils.b3(b, this.v0.y, this.v1.y, this.v2.y, this.v3.y), b = THREE.Shape.Utils.b3(b, this.v0.z, this.v1.z, this.v2.z, this.v3.z), new THREE.Vector3(c, a, b)
	}), THREE.SplineCurve3 = THREE.Curve.create(function (a) {
		this.points = null == a ? [] : a
	}, function (e) {
		var b, f = new THREE.Vector3,
			g = [],
			a = this.points;
		e = (a.length - 1) * e;
		e -= b = Math.floor(e), g[0] = 0 == b ? b : b - 1, g[1] = b, g[2] = b > a.length - 2 ? a.length - 1 : b + 1, g[3] = b > a.length - 3 ? a.length - 1 : b + 2, b = a[g[0]];
		var c = a[g[1]],
			d = a[g[2]];
		g = a[g[3]];
		return f.x = THREE.Curve.Utils.interpolate(b.x, c.x, d.x, g.x, e), f.y = THREE.Curve.Utils.interpolate(b.y, c.y, d.y, g.y, e), f.z = THREE.Curve.Utils.interpolate(b.z, c.z, d.z, g.z, e), f
	}), THREE.ClosedSplineCurve3 = THREE.Curve.create(function (a) {
		this.points = null == a ? [] : a
	}, function (d) {
		var c, e = new THREE.Vector3,
			a = [],
			b = this.points;
		return c = (b.length - 0) * d, c -= d = Math.floor(c), d += 0 < d ? 0 : (Math.floor(Math.abs(d) / b.length) + 1) * b.length, a[0] = (d - 1) % b.length, a[1] = d % b.length, a[2] = (d + 1) % b.length, a[3] = (d + 2) % b.length, e.x = THREE.Curve.Utils.interpolate(b[a[0]].x, b[a[1]].x, b[a[2]].x, b[a[3]].x, c), e.y = THREE.Curve.Utils.interpolate(b[a[0]].y, b[a[1]].y, b[a[2]].y, b[a[3]].y, c), e.z = THREE.Curve.Utils.interpolate(b[a[0]].z, b[a[1]].z, b[a[2]].z, b[a[3]].z, c), e
	}), THREE.CurvePath = function () {
		this.curves = [], this.bends = [], this.autoClose = !1
	}, THREE.CurvePath.prototype = new THREE.Curve, THREE.CurvePath.prototype.constructor = THREE.CurvePath, THREE.CurvePath.prototype.add = function (a) {
		this.curves.push(a)
	}, THREE.CurvePath.prototype.checkConnection = function () {}, THREE.CurvePath.prototype.closePath = function () {
		var a = this.curves[0].getPoint(0),
			b = this.curves[this.curves.length - 1].getPoint(1);
		a.equals(b) || this.curves.push(new THREE.LineCurve(b, a))
	}, THREE.CurvePath.prototype.getPoint = function (b) {
		var c = b * this.getLength(),
			a = this.getCurveLengths();
		for (b = 0; b < a.length;) {
			if (a[b] >= c) {
				return c = 1 - (c = a[b] - c) / (b = this.curves[b]).getLength(), b.getPointAt(c)
			}
			b++
		}
		return null
	}, THREE.CurvePath.prototype.getLength = function () {
		var a = this.getCurveLengths();
		return a[a.length - 1]
	}, THREE.CurvePath.prototype.getCurveLengths = function () {
		if (this.cacheLengths && this.cacheLengths.length == this.curves.length) {
			return this.cacheLengths
		}
		var a, c = [],
			d = 0,
			b = this.curves.length;
		for (a = 0; a < b; a++) {
			d += this.curves[a].getLength(), c.push(d)
		}
		return this.cacheLengths = c
	}, THREE.CurvePath.prototype.getBoundingBox = function () {
		var b, c, d, e, f, g, h, j, a = this.getPoints();
		for (b = c = Number.NEGATIVE_INFINITY, d = e = Number.POSITIVE_INFINITY, j = new THREE.Vector2, g = 0, h = a.length; g < h; g++) {
			(f = a[g]).x > b ? b = f.x : f.x < d && (d = f.x), f.y > c ? c = f.y : f.y < c && (e = f.y), j.addSelf(f.x, f.y)
		}
		return {
			minX: d,
			minY: e,
			maxX: b,
			maxY: c,
			centroid: j.divideScalar(h)
		}
	}, THREE.CurvePath.prototype.createPointsGeometry = function (a) {
		return this.createGeometry(this.getPoints(a, !0))
	}, THREE.CurvePath.prototype.createSpacedPointsGeometry = function (a) {
		return this.createGeometry(this.getSpacedPoints(a, !0))
	}, THREE.CurvePath.prototype.createGeometry = function (b) {
		for (var c = new THREE.Geometry, a = 0; a < b.length; a++) {
			c.vertices.push(new THREE.Vector3(b[a].x, b[a].y, 0))
		}
		return c
	}, THREE.CurvePath.prototype.addWrapPath = function (a) {
		this.bends.push(a)
	}, THREE.CurvePath.prototype.getTransformedPoints = function (d, e) {
		var b, c, a = this.getPoints(d);
		for (e || (e = this.bends), b = 0, c = e.length; b < c; b++) {
			a = this.getWrapPoints(a, e[b])
		}
		return a
	}, THREE.CurvePath.prototype.getTransformedSpacedPoints = function (d, e) {
		var b, c, a = this.getSpacedPoints(d);
		for (e || (e = this.bends), b = 0, c = e.length; b < c; b++) {
			a = this.getWrapPoints(a, e[b])
		}
		return a
	}, THREE.CurvePath.prototype.getWrapPoints = function (a, b) {
		var d, e, f, g, h, j, c = this.getBoundingBox();
		for (d = 0, e = a.length; d < e; d++) {
			g = (f = a[d]).x, h = f.y, j = g / c.maxX, j = b.getUtoTmapping(j, g), g = b.getPoint(j), h = b.getNormalVector(j).multiplyScalar(h), f.x = g.x + h.x, f.y = g.y + h.y
		}
		return a
	}, THREE.EventTarget = function () {
		var a = {};
		this.addEventListener = function (b, c) {
			null == a[b] && (a[b] = []), -1 === a[b].indexOf(c) && a[b].push(c)
		}, this.dispatchEvent = function (b) {
			for (var c in a[b.type]) {
				a[b.type][c](b)
			}
		}, this.removeEventListener = function (b, c) {
			var d = a[b].indexOf(c); - 1 !== d && a[b].splice(d, 1)
		}
	}, THREE.Gyroscope = function () {
		THREE.Object3D.call(this)
	}, THREE.Gyroscope.prototype = new THREE.Object3D, THREE.Gyroscope.prototype.constructor = THREE.Gyroscope, THREE.Gyroscope.prototype.updateMatrixWorld = function (b) {
		this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || b) && (this.parent ? (this.matrixWorld.multiply(this.parent.matrixWorld, this.matrix), this.matrixWorld.decompose(this.translationWorld, this.rotationWorld, this.scaleWorld), this.matrix.decompose(this.translationObject, this.rotationObject, this.scaleObject), this.matrixWorld.compose(this.translationWorld, this.rotationObject, this.scaleWorld)) : this.matrixWorld.copy(this.matrix), b = !(this.matrixWorldNeedsUpdate = !1));
		for (var c = 0, a = this.children.length; c < a; c++) {
			this.children[c].updateMatrixWorld(b)
		}
	}, THREE.Gyroscope.prototype.translationWorld = new THREE.Vector3, THREE.Gyroscope.prototype.translationObject = new THREE.Vector3, THREE.Gyroscope.prototype.rotationWorld = new THREE.Quaternion, THREE.Gyroscope.prototype.rotationObject = new THREE.Quaternion, THREE.Gyroscope.prototype.scaleWorld = new THREE.Vector3, THREE.Gyroscope.prototype.scaleObject = new THREE.Vector3, THREE.Path = function (a) {
		THREE.CurvePath.call(this), this.actions = [], a && this.fromPoints(a)
	}, THREE.Path.prototype = new THREE.CurvePath, THREE.Path.prototype.constructor = THREE.Path, THREE.PathActions = {
		MOVE_TO: "moveTo",
		LINE_TO: "lineTo",
		QUADRATIC_CURVE_TO: "quadraticCurveTo",
		BEZIER_CURVE_TO: "bezierCurveTo",
		CSPLINE_THRU: "splineThru",
		ARC: "arc"
	}, THREE.Path.prototype.fromPoints = function (b) {
		this.moveTo(b[0].x, b[0].y);
		for (var c = 1, a = b.length; c < a; c++) {
			this.lineTo(b[c].x, b[c].y)
		}
	}, THREE.Path.prototype.moveTo = function (b, c) {
		var a = Array.prototype.slice.call(arguments);
		this.actions.push({
			action: THREE.PathActions.MOVE_TO,
			args: a
		})
	}, THREE.Path.prototype.lineTo = function (c, d) {
		var a = Array.prototype.slice.call(arguments),
			b = this.actions[this.actions.length - 1].args;
		this.curves.push(new THREE.LineCurve(new THREE.Vector2(b[b.length - 2], b[b.length - 1]), new THREE.Vector2(c, d))), this.actions.push({
			action: THREE.PathActions.LINE_TO,
			args: a
		})
	}, THREE.Path.prototype.quadraticCurveTo = function (e, f, a, b) {
		var c = Array.prototype.slice.call(arguments),
			d = this.actions[this.actions.length - 1].args;
		this.curves.push(new THREE.QuadraticBezierCurve(new THREE.Vector2(d[d.length - 2], d[d.length - 1]), new THREE.Vector2(e, f), new THREE.Vector2(a, b))), this.actions.push({
			action: THREE.PathActions.QUADRATIC_CURVE_TO,
			args: c
		})
	}, THREE.Path.prototype.bezierCurveTo = function (d, e, f, g, h, a) {
		var b = Array.prototype.slice.call(arguments),
			c = this.actions[this.actions.length - 1].args;
		this.curves.push(new THREE.CubicBezierCurve(new THREE.Vector2(c[c.length - 2], c[c.length - 1]), new THREE.Vector2(d, e), new THREE.Vector2(f, g), new THREE.Vector2(h, a))), this.actions.push({
			action: THREE.PathActions.BEZIER_CURVE_TO,
			args: b
		})
	}, THREE.Path.prototype.splineThru = function (b) {
		var c = Array.prototype.slice.call(arguments),
			a = this.actions[this.actions.length - 1].args;
		a = [new THREE.Vector2(a[a.length - 2], a[a.length - 1])];
		Array.prototype.push.apply(a, b), this.curves.push(new THREE.SplineCurve(a)), this.actions.push({
			action: THREE.PathActions.CSPLINE_THRU,
			args: c
		})
	}, THREE.Path.prototype.arc = function (d, e, f, g, h, a) {
		var b = Array.prototype.slice.call(arguments),
			c = this.actions[this.actions.length - 1];
		c = new THREE.ArcCurve(c.x + d, c.y + e, f, g, h, a);
		this.curves.push(c), c = c.getPoint(a ? 1 : 0), b.push(c.x), b.push(c.y), this.actions.push({
			action: THREE.PathActions.ARC,
			args: b
		})
	}, THREE.Path.prototype.absarc = function (d, e, f, g, h, a) {
		var b = Array.prototype.slice.call(arguments),
			c = new THREE.ArcCurve(d, e, f, g, h, a);
		this.curves.push(c), c = c.getPoint(a ? 1 : 0), b.push(c.x), b.push(c.y), this.actions.push({
			action: THREE.PathActions.ARC,
			args: b
		})
	}, THREE.Path.prototype.getSpacedPoints = function (b) {
		b || (b = 40);
		for (var c = [], a = 0; a < b; a++) {
			c.push(this.getPoint(a / b))
		}
		return c
	}, THREE.Path.prototype.getPoints = function (o, q) {
		if (this.useSpacedPoints) {
			return console.log("tata"), this.getSpacedPoints(o, q)
		}
		o = o || 12;
		var c, d, e, g, h, j, l, k, b, m, p, f, n, a = [];
		for (c = 0, d = this.actions.length; c < d; c++) {
			switch (g = (e = this.actions[c]).action, e = e.args, g) {
				case THREE.PathActions.MOVE_TO:
				case THREE.PathActions.LINE_TO:
					a.push(new THREE.Vector2(e[0], e[1]));
					break;
				case THREE.PathActions.QUADRATIC_CURVE_TO:
					for (h = e[2], j = e[3], b = e[0], m = e[1], 0 < a.length ? (p = (g = a[a.length - 1]).x, f = g.y) : (p = (g = this.actions[c - 1].args)[g.length - 2], f = g[g.length - 1]), e = 1; e <= o; e++) {
						n = e / o, g = THREE.Shape.Utils.b2(n, p, b, h), n = THREE.Shape.Utils.b2(n, f, m, j), a.push(new THREE.Vector2(g, n))
					}
					break;
				case THREE.PathActions.BEZIER_CURVE_TO:
					for (h = e[4], j = e[5], b = e[0], m = e[1], l = e[2], k = e[3], 0 < a.length ? (p = (g = a[a.length - 1]).x, f = g.y) : (p = (g = this.actions[c - 1].args)[g.length - 2], f = g[g.length - 1]), e = 1; e <= o; e++) {
						n = e / o, g = THREE.Shape.Utils.b3(n, p, b, l, h), n = THREE.Shape.Utils.b3(n, f, m, k, j), a.push(new THREE.Vector2(g, n))
					}
					break;
				case THREE.PathActions.CSPLINE_THRU:
					for (g = this.actions[c - 1].args, n = [new THREE.Vector2(g[g.length - 2], g[g.length - 1])], g = o * e[0].length, n = n.concat(e[0]), n = new THREE.SplineCurve(n), e = 1; e <= g; e++) {
						a.push(n.getPointAt(e / g))
					}
					break;
				case THREE.PathActions.ARC:
					for (h = e[0], j = e[1], l = e[2], b = e[3], m = !!e[5], k = e[4] - b, p = 2 * o, e = 1; e <= p; e++) {
						n = e / p, m || (n = 1 - n), n = b + n * k, g = h + l * Math.cos(n), n = j + l * Math.sin(n), a.push(new THREE.Vector2(g, n))
					}
			}
		}
		return c = a[a.length - 1], Math.abs(c.x - a[0].x) < 1e-10 && Math.abs(c.y - a[0].y) < 1e-10 && a.splice(a.length - 1, 1), q && a.push(a[0]), a
	}, THREE.Path.prototype.transform = function (a, b) {
		return this.getBoundingBox(), this.getWrapPoints(this.getPoints(b), a)
	}, THREE.Path.prototype.nltransform = function (g, h, j, k, l, p) {
		var b, c, e, d, f, a = this.getPoints();
		for (b = 0, c = a.length; b < c; b++) {
			d = (e = a[b]).x, f = e.y, e.x = g * d + h * f + j, e.y = k * f + l * d + p
		}
		return a
	}, THREE.Path.prototype.debug = function (d) {
		var e = this.getBoundingBox();
		d || ((d = document.createElement("canvas")).setAttribute("width", e.maxX + 100), d.setAttribute("height", e.maxY + 100), document.body.appendChild(d)), (e = d.getContext("2d")).fillStyle = "white", e.fillRect(0, 0, d.width, d.height), e.strokeStyle = "black", e.beginPath();
		var a, b, c;
		d = 0;
		for (a = this.actions.length; d < a; d++) {
			c = (b = this.actions[d]).args, (b = b.action) != THREE.PathActions.CSPLINE_THRU && e[b].apply(e, c)
		}
		for (e.stroke(), e.closePath(), e.strokeStyle = "red", d = 0, a = (b = this.getPoints()).length; d < a; d++) {
			c = b[d], e.beginPath(), e.arc(c.x, c.y, 1.5, 0, 2 * Math.PI, !1), e.stroke(), e.closePath()
		}
	}, THREE.Path.prototype.toShapes = function () {
		var e, f, g, a, d, b = [],
			c = new THREE.Path;
		for (e = 0, f = this.actions.length; e < f; e++) {
			a = (g = this.actions[e]).args, (g = g.action) == THREE.PathActions.MOVE_TO && 0 != c.actions.length && (b.push(c), c = new THREE.Path), c[g].apply(c, a)
		}
		if (0 != c.actions.length && b.push(c), 0 == b.length) {
			return []
		}
		if (a = [], e = !THREE.Shape.Utils.isClockWise(b[0].getPoints()), 1 == b.length) {
			return c = b[0], (d = new THREE.Shape).actions = c.actions, d.curves = c.curves, a.push(d), a
		}
		if (e) {
			for (d = new THREE.Shape, e = 0, f = b.length; e < f; e++) {
				c = b[e], THREE.Shape.Utils.isClockWise(c.getPoints()) ? (d.actions = c.actions, d.curves = c.curves, a.push(d), d = new THREE.Shape) : d.holes.push(c)
			}
		} else {
			for (e = 0, f = b.length; e < f; e++) {
				c = b[e], THREE.Shape.Utils.isClockWise(c.getPoints()) ? (d && a.push(d), (d = new THREE.Shape).actions = c.actions, d.curves = c.curves) : d.holes.push(c)
			}
			a.push(d)
		}
		return a
	}, THREE.Shape = function () {
		THREE.Path.apply(this, arguments), this.holes = []
	}, THREE.Shape.prototype = new THREE.Path, THREE.Shape.prototype.constructor = THREE.Path, THREE.Shape.prototype.extrude = function (a) {
		return new THREE.ExtrudeGeometry(this, a)
	}, THREE.Shape.prototype.getPointsHoles = function (c) {
		var d, a = this.holes.length,
			b = [];
		for (d = 0; d < a; d++) {
			b[d] = this.holes[d].getTransformedPoints(c, this.bends)
		}
		return b
	}, THREE.Shape.prototype.getSpacedPointsHoles = function (c) {
		var d, a = this.holes.length,
			b = [];
		for (d = 0; d < a; d++) {
			b[d] = this.holes[d].getTransformedSpacedPoints(c, this.bends)
		}
		return b
	}, THREE.Shape.prototype.extractAllPoints = function (a) {
		return {
			shape: this.getTransformedPoints(a),
			holes: this.getPointsHoles(a)
		}
	}, THREE.Shape.prototype.extractPoints = function (a) {
		return this.useSpacedPoints ? this.extractAllSpacedPoints(a) : this.extractAllPoints(a)
	}, THREE.Shape.prototype.extractAllSpacedPoints = function (a) {
		return {
			shape: this.getTransformedSpacedPoints(a),
			holes: this.getSpacedPointsHoles(a)
		}
	}, THREE.Shape.Utils = {
		removeHoles: function (l, n) {
			var a, b, c, d, f, h, g, p, j, m, o = l.concat(),
				r = o.concat(),
				q = [];
			for (f = 0; f < n.length; f++) {
				for (h = n[f], Array.prototype.push.apply(r, h), b = Number.POSITIVE_INFINITY, a = 0; a < h.length; a++) {
					for (j = h[a], m = [], p = 0; p < o.length; p++) {
						g = o[p], g = j.distanceToSquared(g), m.push(g), g < b && (b = g, c = a, d = p)
					}
				}
				a = 0 <= d - 1 ? d - 1 : o.length - 1, b = 0 <= c - 1 ? c - 1 : h.length - 1;
				var k = [h[c], o[d], o[a]];
				p = THREE.FontUtils.Triangulate.area(k);
				var e = [h[c], h[b], o[d]];
				j = THREE.FontUtils.Triangulate.area(e), m = d, g = c, c += -1, (d += 1) < 0 && (d += o.length), d %= o.length, c < 0 && (c += h.length), c %= h.length, a = 0 <= d - 1 ? d - 1 : o.length - 1, b = 0 <= c - 1 ? c - 1 : h.length - 1, k = [h[c], o[d], o[a]], k = THREE.FontUtils.Triangulate.area(k), e = [h[c], h[b], o[d]], k + (e = THREE.FontUtils.Triangulate.area(e)) < p + j && (c = g, (d = m) < 0 && (d += o.length), d %= o.length, c < 0 && (c += h.length), c %= h.length, a = 0 <= d - 1 ? d - 1 : o.length - 1, b = 0 <= c - 1 ? c - 1 : h.length - 1), p = o.slice(0, d), j = o.slice(d), m = h.slice(c), g = h.slice(0, c), b = [h[c], h[b], o[d]], q.push([h[c], o[d], o[a]]), q.push(b), o = p.concat(m).concat(g).concat(j)
			}
			return {
				shape: o,
				isolatedPts: q,
				allpoints: r
			}
		},
		triangulateShape: function (j, l) {
			var d, e, f, g, b = (a = THREE.Shape.Utils.removeHoles(j, l)).allpoints,
				c = a.isolatedPts,
				a = THREE.FontUtils.Triangulate(a.shape, !1),
				h = {};
			for (d = 0, e = b.length; d < e; d++) {
				void 0 !== h[g = b[d].x + ":" + b[d].y] && console.log("Duplicate point", g), h[g] = d
			}
			for (d = 0, e = a.length; d < e; d++) {
				for (f = a[d], b = 0; b < 3; b++) {
					void 0 !== (g = h[g = f[b].x + ":" + f[b].y]) && (f[b] = g)
				}
			}
			for (d = 0, e = c.length; d < e; d++) {
				for (f = c[d], b = 0; b < 3; b++) {
					void 0 !== (g = h[g = f[b].x + ":" + f[b].y]) && (f[b] = g)
				}
			}
			return a.concat(c)
		},
		isClockWise: function (a) {
			return THREE.FontUtils.Triangulate.area(a) < 0
		},
		b2p0: function (b, c) {
			var a = 1 - b;
			return a * a * c
		},
		b2p1: function (a, b) {
			return 2 * (1 - a) * a * b
		},
		b2p2: function (a, b) {
			return a * a * b
		},
		b2: function (c, d, a, b) {
			return this.b2p0(c, d) + this.b2p1(c, a) + this.b2p2(c, b)
		},
		b3p0: function (b, c) {
			var a = 1 - b;
			return a * a * a * c
		},
		b3p1: function (b, c) {
			var a = 1 - b;
			return 3 * a * a * b * c
		},
		b3p2: function (a, b) {
			return 3 * (1 - a) * a * a * b
		},
		b3p3: function (a, b) {
			return a * a * a * b
		},
		b3: function (d, e, a, b, c) {
			return this.b3p0(d, e) + this.b3p1(d, a) + this.b3p2(d, b) + this.b3p3(d, c)
		}
	}, THREE.TextPath = function (a, b) {
		THREE.Path.call(this), this.parameters = b || {}, this.set(a)
	}, THREE.TextPath.prototype.set = function (e, f) {
		f = f || this.parameters, this.text = e;
		var a = void 0 !== f.curveSegments ? f.curveSegments : 4,
			b = void 0 !== f.font ? f.font : "helvetiker",
			c = void 0 !== f.weight ? f.weight : "normal",
			d = void 0 !== f.style ? f.style : "normal";
		THREE.FontUtils.size = void 0 !== f.size ? f.size : 100, THREE.FontUtils.divisions = a, THREE.FontUtils.face = b, THREE.FontUtils.weight = c, THREE.FontUtils.style = d
	}, THREE.TextPath.prototype.toShapes = function () {
		for (var c = THREE.FontUtils.drawText(this.text).paths, d = [], a = 0, b = c.length; a < b; a++) {
			Array.prototype.push.apply(d, c[a].toShapes())
		}
		return d
	}, THREE.AnimationHandler = function () {
		var c = [],
			d = {},
			a = {
				update: function (e) {
					for (var f = 0; f < c.length; f++) {
						c[f].update(e)
					}
				},
				addToUpdate: function (e) {
					-1 === c.indexOf(e) && c.push(e)
				},
				removeFromUpdate: function (e) {
					-1 !== (e = c.indexOf(e)) && c.splice(e, 1)
				},
				add: function (g) {
					if (void 0 !== d[g.name] && console.log("THREE.AnimationHandler.add: Warning! " + g.name + " already exists in library. Overwriting."), !0 !== (d[g.name] = g).initialized) {
						for (var h = 0; h < g.hierarchy.length; h++) {
							for (var j = 0; j < g.hierarchy[h].keys.length; j++) {
								if (g.hierarchy[h].keys[j].time < 0 && (g.hierarchy[h].keys[j].time = 0), void 0 !== g.hierarchy[h].keys[j].rot && !(g.hierarchy[h].keys[j].rot instanceof THREE.Quaternion)) {
									var k = g.hierarchy[h].keys[j].rot;
									g.hierarchy[h].keys[j].rot = new THREE.Quaternion(k[0], k[1], k[2], k[3])
								}
							}
							if (g.hierarchy[h].keys.length && void 0 !== g.hierarchy[h].keys[0].morphTargets) {
								for (k = {}, j = 0; j < g.hierarchy[h].keys.length; j++) {
									for (var l = 0; l < g.hierarchy[h].keys[j].morphTargets.length; l++) {
										var f = g.hierarchy[h].keys[j].morphTargets[l];
										k[f] = -1
									}
								}
								for (g.hierarchy[h].usedMorphTargets = k, j = 0; j < g.hierarchy[h].keys.length; j++) {
									var e = {};
									for (f in k) {
										for (l = 0; l < g.hierarchy[h].keys[j].morphTargets.length; l++) {
											if (g.hierarchy[h].keys[j].morphTargets[l] === f) {
												e[f] = g.hierarchy[h].keys[j].morphTargetsInfluences[l];
												break
											}
										}
										l === g.hierarchy[h].keys[j].morphTargets.length && (e[f] = 0)
									}
									g.hierarchy[h].keys[j].morphTargetsInfluences = e
								}
							}
							for (j = 1; j < g.hierarchy[h].keys.length; j++) {
								g.hierarchy[h].keys[j].time === g.hierarchy[h].keys[j - 1].time && (g.hierarchy[h].keys.splice(j, 1), j--)
							}
							for (j = 0; j < g.hierarchy[h].keys.length; j++) {
								g.hierarchy[h].keys[j].index = j
							}
						}
						for (j = parseInt(g.length * g.fps, 10), g.JIT = {}, g.JIT.hierarchy = [], h = 0; h < g.hierarchy.length; h++) {
							g.JIT.hierarchy.push(Array(j))
						}
						g.initialized = !0
					}
				},
				get: function (e) {
					if ("string" == typeof e) {
						return d[e] ? d[e] : (console.log("THREE.AnimationHandler.get: Couldn't find animation " + e), null)
					}
				},
				parse: function (f) {
					var g = [];
					if (f instanceof THREE.SkinnedMesh) {
						for (var e = 0; e < f.bones.length; e++) {
							g.push(f.bones[e])
						}
					} else {
						b(f, g)
					}
					return g
				}
			},
			b = function (f, g) {
				g.push(f);
				for (var e = 0; e < f.children.length; e++) {
					b(f.children[e], g)
				}
			};
		return a.LINEAR = 0, a.CATMULLROM = 1, a.CATMULLROM_FORWARD = 2, a
	}(), THREE.Animation = function (c, d, a, b) {
		this.root = c, this.data = THREE.AnimationHandler.get(d), this.hierarchy = THREE.AnimationHandler.parse(c), this.currentTime = 0, this.timeScale = 1, this.isPlaying = !1, this.loop = this.isPaused = !0, this.interpolationType = void 0 !== a ? a : THREE.AnimationHandler.LINEAR, this.JITCompile = void 0 === b || b, this.points = [], this.target = new THREE.Vector3
	}, THREE.Animation.prototype.play = function (e, f) {
		if (!this.isPlaying) {
			this.isPlaying = !0, this.loop = void 0 === e || e, this.currentTime = void 0 !== f ? f : 0;
			var a, c, b = this.hierarchy.length;
			for (a = 0; a < b; a++) {
				c = this.hierarchy[a], this.interpolationType !== THREE.AnimationHandler.CATMULLROM_FORWARD && (c.useQuaternion = !0), c.matrixAutoUpdate = !0, void 0 === c.animationCache && (c.animationCache = {}, c.animationCache.prevKey = {
					pos: 0,
					rot: 0,
					scl: 0
				}, c.animationCache.nextKey = {
					pos: 0,
					rot: 0,
					scl: 0
				}, c.animationCache.originalMatrix = c instanceof THREE.Bone ? c.skinMatrix : c.matrix);
				var d = c.animationCache.prevKey;
				c = c.animationCache.nextKey, d.pos = this.data.hierarchy[a].keys[0], d.rot = this.data.hierarchy[a].keys[0], d.scl = this.data.hierarchy[a].keys[0], c.pos = this.getNextKeyWith("pos", a, 1), c.rot = this.getNextKeyWith("rot", a, 1), c.scl = this.getNextKeyWith("scl", a, 1)
			}
			this.update(0)
		}
		this.isPaused = !1, THREE.AnimationHandler.addToUpdate(this)
	}, THREE.Animation.prototype.pause = function () {
		this.isPaused ? THREE.AnimationHandler.addToUpdate(this) : THREE.AnimationHandler.removeFromUpdate(this), this.isPaused = !this.isPaused
	}, THREE.Animation.prototype.stop = function () {
		this.isPaused = this.isPlaying = !1, THREE.AnimationHandler.removeFromUpdate(this);
		for (var a = 0; a < this.hierarchy.length; a++) {
			void 0 !== this.hierarchy[a].animationCache && (this.hierarchy[a] instanceof THREE.Bone ? this.hierarchy[a].skinMatrix = this.hierarchy[a].animationCache.originalMatrix : this.hierarchy[a].matrix = this.hierarchy[a].animationCache.originalMatrix, delete this.hierarchy[a].animationCache)
		}
	}, THREE.Animation.prototype.update = function (o) {
		if (this.isPlaying) {
			var b, c, d, e, g, h, j, l, a, m, q = ["pos", "rot", "scl"],
				k = this.data.JIT.hierarchy;
			m = this.currentTime = this.currentTime + o * this.timeScale, a = this.currentTime = this.currentTime % this.data.length, l = parseInt(Math.min(a * this.data.fps, this.data.length * this.data.fps), 10);
			for (var p = 0, f = this.hierarchy.length; p < f; p++) {
				if (j = (o = this.hierarchy[p]).animationCache, this.JITCompile && void 0 !== k[p][l]) {
					o instanceof THREE.Bone ? (o.skinMatrix = k[p][l], o.matrixAutoUpdate = !1, o.matrixWorldNeedsUpdate = !1) : (o.matrix = k[p][l], o.matrixAutoUpdate = !1, o.matrixWorldNeedsUpdate = !0)
				} else {
					this.JITCompile && (o instanceof THREE.Bone ? o.skinMatrix = o.animationCache.originalMatrix : o.matrix = o.animationCache.originalMatrix);
					for (var n = 0; n < 3; n++) {
						if (b = q[n], g = j.prevKey[b], (h = j.nextKey[b]).time <= m) {
							if (a < m) {
								if (!this.loop) {
									return void this.stop()
								}
								for (g = this.data.hierarchy[p].keys[0], h = this.getNextKeyWith(b, p, 1); h.time < a;) {
									g = h, h = this.getNextKeyWith(b, p, h.index + 1)
								}
							} else {
								for (; g = h, (h = this.getNextKeyWith(b, p, h.index + 1)).time < a;) {}
							}
							j.prevKey[b] = g, j.nextKey[b] = h
						}
						o.matrixAutoUpdate = !0, o.matrixWorldNeedsUpdate = !0, c = (a - g.time) / (h.time - g.time), d = g[b], e = h[b], (c < 0 || 1 < c) && (console.log("THREE.Animation.update: Warning! Scale out of bounds:" + c + " on bone " + p), c = c < 0 ? 0 : 1), "pos" === b ? (b = o.position, this.interpolationType === THREE.AnimationHandler.LINEAR ? (b.x = d[0] + (e[0] - d[0]) * c, b.y = d[1] + (e[1] - d[1]) * c, b.z = d[2] + (e[2] - d[2]) * c) : this.interpolationType !== THREE.AnimationHandler.CATMULLROM && this.interpolationType !== THREE.AnimationHandler.CATMULLROM_FORWARD || (this.points[0] = this.getPrevKeyWith("pos", p, g.index - 1).pos, this.points[1] = d, this.points[2] = e, this.points[3] = this.getNextKeyWith("pos", p, h.index + 1).pos, c = 0.33 * c + 0.33, d = this.interpolateCatmullRom(this.points, c), b.x = d[0], b.y = d[1], b.z = d[2], this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD && (c = this.interpolateCatmullRom(this.points, 1.01 * c), this.target.set(c[0], c[1], c[2]), this.target.subSelf(b), this.target.y = 0, this.target.normalize(), c = Math.atan2(this.target.x, this.target.z), o.rotation.set(0, c, 0)))) : "rot" === b ? THREE.Quaternion.slerp(d, e, o.quaternion, c) : "scl" === b && ((b = o.scale).x = d[0] + (e[0] - d[0]) * c, b.y = d[1] + (e[1] - d[1]) * c, b.z = d[2] + (e[2] - d[2]) * c)
					}
				}
			}
			if (this.JITCompile && void 0 === k[0][l]) {
				for (this.hierarchy[0].updateMatrixWorld(!0), p = 0; p < this.hierarchy.length; p++) {
					k[p][l] = this.hierarchy[p] instanceof THREE.Bone ? this.hierarchy[p].skinMatrix.clone() : this.hierarchy[p].matrix.clone()
				}
			}
		}
	}, THREE.Animation.prototype.interpolateCatmullRom = function (j, l) {
		var c, d, e, f, g, h, a = [],
			b = [];
		return c = (j.length - 1) * l, c -= d = Math.floor(c), a[0] = 0 === d ? d : d - 1, a[1] = d, a[2] = d > j.length - 2 ? d : d + 1, a[3] = d > j.length - 3 ? d : d + 2, d = j[a[0]], f = j[a[1]], g = j[a[2]], h = j[a[3]], e = c * (a = c * c), b[0] = this.interpolate(d[0], f[0], g[0], h[0], c, a, e), b[1] = this.interpolate(d[1], f[1], g[1], h[1], c, a, e), b[2] = this.interpolate(d[2], f[2], g[2], h[2], c, a, e), b
	}, THREE.Animation.prototype.interpolate = function (e, f, g, a, b, c, d) {
		return (2 * (f - g) + (e = 0.5 * (g - e)) + (a = 0.5 * (a - f))) * d + (-3 * (f - g) - 2 * e - a) * c + e * b + f
	}, THREE.Animation.prototype.getNextKeyWith = function (c, d, a) {
		var b = this.data.hierarchy[d].keys;
		for (a = this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ? a < b.length - 1 ? a : b.length - 1 : a % b.length; a < b.length; a++) {
			if (void 0 !== b[a][c]) {
				return b[a]
			}
		}
		return this.data.hierarchy[d].keys[0]
	}, THREE.Animation.prototype.getPrevKeyWith = function (c, d, a) {
		var b = this.data.hierarchy[d].keys;
		for (a = this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ? 0 < a ? a : 0 : 0 <= a ? a : a + b.length; 0 <= a; a--) {
			if (void 0 !== b[a][c]) {
				return b[a]
			}
		}
		return this.data.hierarchy[d].keys[b.length - 1]
	}, THREE.KeyFrameAnimation = function (e, f, g) {
		for (this.root = e, this.data = THREE.AnimationHandler.get(f), this.hierarchy = THREE.AnimationHandler.parse(e), this.currentTime = 0, this.timeScale = 0.001, this.isPlaying = !1, this.loop = this.isPaused = !0, this.JITCompile = void 0 === g || g, e = 0, f = this.hierarchy.length; e < f; e++) {
			g = this.data.hierarchy[e].sids;
			var a = this.hierarchy[e];
			if (this.data.hierarchy[e].keys.length && g) {
				for (var b = 0; b < g.length; b++) {
					var c = g[b],
						d = this.getNextKeyWith(c, e, 0);
					d && d.apply(c)
				}
				a.matrixAutoUpdate = !1, this.data.hierarchy[e].node.updateMatrix(), a.matrixWorldNeedsUpdate = !0
			}
		}
	}, THREE.KeyFrameAnimation.prototype.play = function (e, f) {
		if (!this.isPlaying) {
			this.isPlaying = !0, this.loop = void 0 === e || e, this.currentTime = void 0 !== f ? f : 0, this.startTimeMs = f, this.startTime = 10000000, this.endTime = -this.startTime;
			var a, c, d, b = this.hierarchy.length;
			for (a = 0; a < b; a++) {
				c = this.hierarchy[a], d = this.data.hierarchy[a], c.useQuaternion = !0, void 0 === d.animationCache && (d.animationCache = {}, d.animationCache.prevKey = null, d.animationCache.nextKey = null, d.animationCache.originalMatrix = c instanceof THREE.Bone ? c.skinMatrix : c.matrix), (c = this.data.hierarchy[a].keys).length && (d.animationCache.prevKey = c[0], d.animationCache.nextKey = c[1], this.startTime = Math.min(c[0].time, this.startTime), this.endTime = Math.max(c[c.length - 1].time, this.endTime))
			}
			this.update(0)
		}
		this.isPaused = !1, THREE.AnimationHandler.addToUpdate(this)
	}, THREE.KeyFrameAnimation.prototype.pause = function () {
		this.isPaused ? THREE.AnimationHandler.addToUpdate(this) : THREE.AnimationHandler.removeFromUpdate(this), this.isPaused = !this.isPaused
	}, THREE.KeyFrameAnimation.prototype.stop = function () {
		this.isPaused = this.isPlaying = !1, THREE.AnimationHandler.removeFromUpdate(this);
		for (var c = 0; c < this.data.hierarchy.length; c++) {
			var d = this.hierarchy[c],
				a = this.data.hierarchy[c];
			if (void 0 !== a.animationCache) {
				var b = a.animationCache.originalMatrix;
				d instanceof THREE.Bone ? (b.copy(d.skinMatrix), d.skinMatrix = b) : (b.copy(d.matrix), d.matrix = b), delete a.animationCache
			}
		}
	}, THREE.KeyFrameAnimation.prototype.update = function (f) {
		if (this.isPlaying) {
			var g, h, j, k, m, p, a, l = this.data.JIT.hierarchy;
			if (p = this.currentTime = this.currentTime + f * this.timeScale, (m = this.currentTime = this.currentTime % this.data.length) < this.startTimeMs && (m = this.currentTime = this.startTimeMs + m), k = parseInt(Math.min(m * this.data.fps, this.data.length * this.data.fps), 10), (a = m < p) && !this.loop) {
				f = 0;
				for (var c = this.hierarchy.length; f < c; f++) {
					var b = this.data.hierarchy[f].keys;
					l = this.data.hierarchy[f].sids;
					if (j = b.length - 1, k = this.hierarchy[f], b.length) {
						for (b = 0; b < l.length; b++) {
							m = l[b], (p = this.getPrevKeyWith(m, f, j)) && p.apply(m)
						}
						this.data.hierarchy[f].node.updateMatrix(), k.matrixWorldNeedsUpdate = !0
					}
				}
				this.stop()
			} else {
				if (!(m < this.startTime)) {
					for (f = 0, c = this.hierarchy.length; f < c; f++) {
						j = this.hierarchy[f];
						b = (g = this.data.hierarchy[f]).keys;
						var e = g.animationCache;
						if (this.JITCompile && void 0 !== l[f][k]) {
							j instanceof THREE.Bone ? (j.skinMatrix = l[f][k], j.matrixWorldNeedsUpdate = !1) : (j.matrix = l[f][k], j.matrixWorldNeedsUpdate = !0)
						} else {
							if (b.length) {
								if (this.JITCompile && e && (j instanceof THREE.Bone ? j.skinMatrix = e.originalMatrix : j.matrix = e.originalMatrix), g = e.prevKey, h = e.nextKey, g && h) {
									if (h.time <= p) {
										if (a && this.loop) {
											for (g = b[0], h = b[1]; h.time < m;) {
												h = b[(g = h).index + 1]
											}
										} else {
											if (!a) {
												for (var d = b.length - 1; h.time < m && h.index !== d;) {
													h = b[(g = h).index + 1]
												}
											}
										}
										e.prevKey = g, e.nextKey = h
									}
									h.time >= m ? g.interpolate(h, m) : g.interpolate(h, h.time)
								}
								this.data.hierarchy[f].node.updateMatrix(), j.matrixWorldNeedsUpdate = !0
							}
						}
					}
					if (this.JITCompile && void 0 === l[0][k]) {
						for (this.hierarchy[0].updateMatrixWorld(!0), f = 0; f < this.hierarchy.length; f++) {
							l[f][k] = this.hierarchy[f] instanceof THREE.Bone ? this.hierarchy[f].skinMatrix.clone() : this.hierarchy[f].matrix.clone()
						}
					}
				}
			}
		}
	}, THREE.KeyFrameAnimation.prototype.getNextKeyWith = function (b, c, a) {
		for (a %= (c = this.data.hierarchy[c].keys).length; a < c.length; a++) {
			if (c[a].hasTarget(b)) {
				return c[a]
			}
		}
		return c[0]
	}, THREE.KeyFrameAnimation.prototype.getPrevKeyWith = function (b, c, a) {
		for (c = this.data.hierarchy[c].keys, a = 0 <= a ? a : a + c.length; 0 <= a; a--) {
			if (c[a].hasTarget(b)) {
				return c[a]
			}
		}
		return c[c.length - 1]
	}, THREE.CubeCamera = function (a, b, c) {
		THREE.Object3D.call(this);
		var d = new THREE.PerspectiveCamera(90, 1, a, b);
		d.up.set(0, -1, 0), d.lookAt(new THREE.Vector3(1, 0, 0)), this.add(d);
		var e = new THREE.PerspectiveCamera(90, 1, a, b);
		e.up.set(0, -1, 0), e.lookAt(new THREE.Vector3(-1, 0, 0)), this.add(e);
		var f = new THREE.PerspectiveCamera(90, 1, a, b);
		f.up.set(0, 0, 1), f.lookAt(new THREE.Vector3(0, 1, 0)), this.add(f);
		var g = new THREE.PerspectiveCamera(90, 1, a, b);
		g.up.set(0, 0, -1), g.lookAt(new THREE.Vector3(0, -1, 0)), this.add(g);
		var h = new THREE.PerspectiveCamera(90, 1, a, b);
		h.up.set(0, -1, 0), h.lookAt(new THREE.Vector3(0, 0, 1)), this.add(h);
		var j = new THREE.PerspectiveCamera(90, 1, a, b);
		j.up.set(0, -1, 0), j.lookAt(new THREE.Vector3(0, 0, -1)), this.add(j), this.renderTarget = new THREE.WebGLRenderTargetCube(c, c, {
			format: THREE.RGBFormat,
			magFilter: THREE.LinearFilter,
			minFilter: THREE.LinearFilter
		}), this.updateCubeMap = function (k, l) {
			var i = this.renderTarget,
				m = i.generateMipmaps;
			i.generateMipmaps = !1, i.activeCubeFace = 0, k.render(l, d, i), i.activeCubeFace = 1, k.render(l, e, i), i.activeCubeFace = 2, k.render(l, f, i), i.activeCubeFace = 3, k.render(l, g, i), i.activeCubeFace = 4, k.render(l, h, i), i.generateMipmaps = m, i.activeCubeFace = 5, k.render(l, j, i)
		}
	}, THREE.CubeCamera.prototype = new THREE.Object3D, THREE.CubeCamera.prototype.constructor = THREE.CubeCamera, THREE.CombinedCamera = function (e, f, g, a, b, c, d) {
		THREE.Camera.call(this), this.fov = g, this.left = -e / 2, this.right = e / 2, this.top = f / 2, this.bottom = -f / 2, this.cameraO = new THREE.OrthographicCamera(e / -2, e / 2, f / 2, f / -2, c, d), this.cameraP = new THREE.PerspectiveCamera(g, e / f, a, b), this.zoom = 1, this.toPerspective()
	}, THREE.CombinedCamera.prototype = new THREE.Camera, THREE.CombinedCamera.prototype.constructor = THREE.CombinedCamera, THREE.CombinedCamera.prototype.toPerspective = function () {
		this.near = this.cameraP.near, this.far = this.cameraP.far, this.cameraP.fov = this.fov / this.zoom, this.cameraP.updateProjectionMatrix(), this.projectionMatrix = this.cameraP.projectionMatrix, this.inPersepectiveMode = !0, this.inOrthographicMode = !1
	}, THREE.CombinedCamera.prototype.toOrthographic = function () {
		var a = this.cameraP.aspect,
			b = (this.cameraP.near + this.cameraP.far) / 2;
		a = 2 * (b = Math.tan(this.fov / 2) * b) * a / 2, b /= this.zoom, a /= this.zoom;
		this.cameraO.left = -a, this.cameraO.right = a, this.cameraO.top = b, this.cameraO.bottom = -b, this.cameraO.updateProjectionMatrix(), this.near = this.cameraO.near, this.far = this.cameraO.far, this.projectionMatrix = this.cameraO.projectionMatrix, this.inPersepectiveMode = !1, this.inOrthographicMode = !0
	}, THREE.CombinedCamera.prototype.setSize = function (a, b) {
		this.cameraP.aspect = a / b, this.left = -a / 2, this.right = a / 2, this.top = b / 2, this.bottom = -b / 2
	}, THREE.CombinedCamera.prototype.setFov = function (a) {
		this.fov = a, this.inPersepectiveMode ? this.toPerspective() : this.toOrthographic()
	}, THREE.CombinedCamera.prototype.updateProjectionMatrix = function () {
		this.inPersepectiveMode ? this.toPerspective() : (this.toPerspective(), this.toOrthographic())
	}, THREE.CombinedCamera.prototype.setLens = function (b, c) {
		var a = 2 * Math.atan((void 0 !== c ? c : 24) / (2 * b)) * (180 / Math.PI);
		return this.setFov(a), a
	}, THREE.CombinedCamera.prototype.setZoom = function (a) {
		this.zoom = a, this.inPersepectiveMode ? this.toPerspective() : this.toOrthographic()
	}, THREE.CombinedCamera.prototype.toFrontView = function () {
		this.rotation.x = 0, this.rotation.y = 0, this.rotation.z = 0, this.rotationAutoUpdate = !1
	}, THREE.CombinedCamera.prototype.toBackView = function () {
		this.rotation.x = 0, this.rotation.y = Math.PI, this.rotation.z = 0, this.rotationAutoUpdate = !1
	}, THREE.CombinedCamera.prototype.toLeftView = function () {
		this.rotation.x = 0, this.rotation.y = -Math.PI / 2, this.rotation.z = 0, this.rotationAutoUpdate = !1
	}, THREE.CombinedCamera.prototype.toRightView = function () {
		this.rotation.x = 0, this.rotation.y = Math.PI / 2, this.rotation.z = 0, this.rotationAutoUpdate = !1
	}, THREE.CombinedCamera.prototype.toTopView = function () {
		this.rotation.x = -Math.PI / 2, this.rotation.y = 0, this.rotation.z = 0, this.rotationAutoUpdate = !1
	}, THREE.CombinedCamera.prototype.toBottomView = function () {
		this.rotation.x = Math.PI / 2, this.rotation.y = 0, this.rotation.z = 0, this.rotationAutoUpdate = !1
	}, THREE.CubeGeometry = function (a, b, c, e, f, g, j, l) {
		function n(J, K, L, M, N, s, v, w) {
			var x, A = e || 1,
				z = f || 1,
				B = N / 2,
				C = s / 2,
				E = q.vertices.length;
			"x" === J && "y" === K || "y" === J && "x" === K ? x = "z" : "x" === J && "z" === K || "z" === J && "x" === K ? (x = "y", z = g || 1) : ("z" === J && "y" === K || "y" === J && "z" === K) && (x = "x", A = g || 1);
			var i = A + 1,
				F = z + 1,
				H = N / A,
				D = s / z,
				I = new THREE.Vector3;
			for (I[x] = 0 < v ? 1 : -1, N = 0; N < F; N++) {
				for (s = 0; s < i; s++) {
					var G = new THREE.Vector3;
					G[J] = (s * H - B) * L, G[K] = (N * D - C) * M, G[x] = v, q.vertices.push(G)
				}
			}
			for (N = 0; N < z; N++) {
				for (s = 0; s < A; s++) {
					(J = new THREE.Face4(s + i * N + E, s + i * (N + 1) + E, s + 1 + i * (N + 1) + E, s + 1 + i * N + E)).normal.copy(I), J.vertexNormals.push(I.clone(), I.clone(), I.clone(), I.clone()), J.materialIndex = w, q.faces.push(J), q.faceVertexUvs[0].push([new THREE.UV(s / A, N / z), new THREE.UV(s / A, (N + 1) / z), new THREE.UV((s + 1) / A, (N + 1) / z), new THREE.UV((s + 1) / A, N / z)])
				}
			}
		}
		THREE.Geometry.call(this);
		var u, h, t, k, p, m, q = this,
			o = a / 2,
			d = b / 2,
			r = c / 2;
		if (void 0 !== j) {
			if (j instanceof Array) {
				this.materials = j
			} else {
				for (this.materials = [], u = 0; u < 6; u++) {
					this.materials.push(j)
				}
			}
			u = 0, k = 1, h = 2, p = 3, t = 4, m = 5
		} else {
			this.materials = []
		}
		if (this.sides = {
				px: !0,
				nx: !0,
				py: !0,
				ny: !0,
				pz: !0,
				nz: !0
			}, null != l) {
			for (var y in l) {
				void 0 !== this.sides[y] && (this.sides[y] = l[y])
			}
		}
		this.sides.px && n("z", "y", -1, -1, c, b, o, u), this.sides.nx && n("z", "y", 1, -1, c, b, -o, k), this.sides.py && n("x", "z", 1, 1, a, c, d, h), this.sides.ny && n("x", "z", 1, -1, a, c, -d, p), this.sides.pz && n("x", "y", 1, -1, a, b, r, t), this.sides.nz && n("x", "y", -1, -1, a, b, -r, m), this.computeCentroids(), this.mergeVertices()
	}, THREE.CubeGeometry.prototype = new THREE.Geometry, THREE.CubeGeometry.prototype.constructor = THREE.CubeGeometry, THREE.CylinderGeometry = function (a, b, c, d, e, f) {
		THREE.Geometry.call(this);
		a = void 0 !== a ? a : 20, b = void 0 !== b ? b : 20;
		var h, j, g = (c = void 0 !== c ? c : 100) / 2,
			l = (d = d || 8, e = e || 1, []),
			k = [];
		for (j = 0; j <= e; j++) {
			var p = [],
				m = [],
				r = (o = j / e) * (b - a) + a;
			for (h = 0; h <= d; h++) {
				var n = h / d;
				(t = new THREE.Vector3).x = r * Math.sin(n * Math.PI * 2), t.y = -o * c + g, t.z = r * Math.cos(n * Math.PI * 2), this.vertices.push(t), p.push(this.vertices.length - 1), m.push(new THREE.UV(n, o))
			}
			l.push(p), k.push(m)
		}
		for (c = (b - a) / c, h = 0; h < d; h++) {
			for (0 !== a ? (p = this.vertices[l[0][h]].clone(), m = this.vertices[l[0][h + 1]].clone()) : (p = this.vertices[l[1][h]].clone(), m = this.vertices[l[1][h + 1]].clone()), p.setY(Math.sqrt(p.x * p.x + p.z * p.z) * c).normalize(), m.setY(Math.sqrt(m.x * m.x + m.z * m.z) * c).normalize(), j = 0; j < e; j++) {
				var o = l[j][h],
					t = (r = l[j + 1][h], n = l[j + 1][h + 1], l[j][h + 1]),
					z = p.clone(),
					w = p.clone(),
					s = m.clone(),
					u = m.clone(),
					E = k[j][h].clone(),
					q = k[j + 1][h].clone(),
					y = k[j + 1][h + 1].clone(),
					H = k[j][h + 1].clone();
				this.faces.push(new THREE.Face4(o, r, n, t, [z, w, s, u])), this.faceVertexUvs[0].push([E, q, y, H])
			}
		}
		if (!f && 0 < a) {
			for (this.vertices.push(new THREE.Vector3(0, g, 0)), h = 0; h < d; h++) {
				o = l[0][h], r = l[0][h + 1], n = this.vertices.length - 1, z = new THREE.Vector3(0, 1, 0), w = new THREE.Vector3(0, 1, 0), s = new THREE.Vector3(0, 1, 0), E = k[0][h].clone(), q = k[0][h + 1].clone(), y = new THREE.UV(q.u, 0), this.faces.push(new THREE.Face3(o, r, n, [z, w, s])), this.faceVertexUvs[0].push([E, q, y])
			}
		}
		if (!f && 0 < b) {
			for (this.vertices.push(new THREE.Vector3(0, -g, 0)), h = 0; h < d; h++) {
				o = l[j][h + 1], r = l[j][h], n = this.vertices.length - 1, z = new THREE.Vector3(0, -1, 0), w = new THREE.Vector3(0, -1, 0), s = new THREE.Vector3(0, -1, 0), E = k[j][h + 1].clone(), q = k[j][h].clone(), y = new THREE.UV(q.u, 1), this.faces.push(new THREE.Face3(o, r, n, [z, w, s])), this.faceVertexUvs[0].push([E, q, y])
			}
		}
		this.computeCentroids(), this.computeFaceNormals()
	}, THREE.CylinderGeometry.prototype = new THREE.Geometry, THREE.CylinderGeometry.prototype.constructor = THREE.CylinderGeometry, THREE.ExtrudeGeometry = function (a, b) {
		void 0 !== a && (THREE.Geometry.call(this), a = a instanceof Array ? a : [a], this.shapebb = a[a.length - 1].getBoundingBox(), this.addShapeList(a, b), this.computeCentroids(), this.computeFaceNormals())
	}, THREE.ExtrudeGeometry.prototype = new THREE.Geometry, THREE.ExtrudeGeometry.prototype.constructor = THREE.ExtrudeGeometry, THREE.ExtrudeGeometry.prototype.addShapeList = function (c, d) {
		for (var a = c.length, b = 0; b < a; b++) {
			this.addShape(c[b], d)
		}
	}, THREE.ExtrudeGeometry.prototype.addShape = function (O, P) {
		function R(B, I, x) {
			return I || console.log("die"), I.clone().multiplyScalar(x).addSelf(B)
		}

		function T(x, B, I) {
			var L = THREE.ExtrudeGeometry.__v1,
				N = THREE.ExtrudeGeometry.__v2,
				Q = THREE.ExtrudeGeometry.__v3,
				S = THREE.ExtrudeGeometry.__v4,
				V = THREE.ExtrudeGeometry.__v5,
				W = THREE.ExtrudeGeometry.__v6;
			return L.set(x.x - B.x, x.y - B.y), N.set(x.x - I.x, x.y - I.y), L = L.normalize(), N = N.normalize(), Q.set(-L.y, L.x), S.set(N.y, -N.x), V.copy(x).addSelf(Q), W.copy(x).addSelf(S), V.equals(W) ? S.clone() : (V.copy(B).addSelf(Q), W.copy(I).addSelf(S), Q = L.dot(S), S = W.subSelf(V).dot(S), 0 === Q && (console.log("Either infinite or no solutions!"), 0 === S ? console.log("Its finite solutions.") : console.log("Too bad, no solutions.")), (S /= Q) < 0 ? (B = Math.atan2(B.y - x.y, B.x - x.x), (x = Math.atan2(I.y - x.y, I.x - x.x)) < B && (x += 2 * Math.PI), I = (B + x) / 2, x = -Math.cos(I), I = -Math.sin(I), new THREE.Vector2(x, I)) : L.multiplyScalar(S).addSelf(V).subSelf(x).clone())
		}

		function U(B, N) {
			var Q, W;
			for (K = B.length; 0 <= --K;) {
				(W = (Q = K) - 1) < 0 && (W = B.length - 1);
				var X = 0,
					Z = i + 2 * e;
				for (X = 0; X < Z; X++) {
					var S = B,
						L = X,
						V = Z,
						x = (x = N + Q + (ad = y * X)) + d,
						ad = (ad = N + W + ad) + d,
						I = (I = N + W + (ae = y * (X + 1))) + d,
						ae = (ae = N + Q + ae) + d;
					E.faces.push(new THREE.Face4(x, ad, I, ae, null, null, s)), x = k.generateSideWallUV(E, O, S, P, x, ad, I, ae, L, V), E.faceVertexUvs[0].push(x)
				}
			}
		}

		function Y(B, I, x) {
			E.vertices.push(new THREE.Vector3(B, I, x))
		}

		function aa(I, L, x, B) {
			I += d, L += d, x += d, E.faces.push(new THREE.Face3(I, L, x, null, null, u)), I = B ? k.generateBottomUV(E, O, P, I, L, x) : k.generateTopUV(E, O, P, I, L, x), E.faceVertexUvs[0].push(I)
		}
		var j, z, q, w, a, ab = void 0 !== P.amount ? P.amount : 100,
			c = void 0 !== P.bevelThickness ? P.bevelThickness : 6,
			g = void 0 !== P.bevelSize ? P.bevelSize : c - 2,
			e = void 0 !== P.bevelSegments ? P.bevelSegments : 3,
			m = void 0 === P.bevelEnabled || P.bevelEnabled,
			i = void 0 !== P.steps ? P.steps : 1,
			l = P.bendPath,
			o = P.extrudePath,
			p = !1,
			u = P.material,
			s = P.extrudeMaterial;
		o && (j = o.getSpacedPoints(i), m = !(p = !0), z = new THREE.TubeGeometry.FrenetFrames(o, i, !1), q = new THREE.Vector3, w = new THREE.Vector3, a = new THREE.Vector3), m || (g = c = e = 0);
		var J, A, v, E = this,
			d = this.vertices.length;
		l && O.addWrapPath(l);
		l = (o = O.extractPoints()).shape;
		var f = o.holes;
		if (o = !THREE.Shape.Utils.isClockWise(l)) {
			for (l = l.reverse(), A = 0, v = f.length; A < v; A++) {
				J = f[A], THREE.Shape.Utils.isClockWise(J) && (f[A] = J.reverse())
			}
			o = !1
		}
		var r = THREE.Shape.Utils.triangulateShape(l, f),
			n = l;
		for (A = 0, v = f.length; A < v; A++) {
			J = f[A], l = l.concat(J)
		}
		var G, h, M, b, t, F, y = l.length,
			H = r.length,
			K = (o = [], 0);
		for (G = (M = n.length) - 1, h = K + 1; K < M; K++, G++, h++) {
			G === M && (G = 0), h === M && (h = 0), o[K] = T(n[K], n[G], n[h])
		}
		var D, ac = [],
			C = o.concat();
		for (A = 0, v = f.length; A < v; A++) {
			for (J = f[A], D = [], K = 0, G = (M = J.length) - 1, h = K + 1; K < M; K++, G++, h++) {
				G === M && (G = 0), h === M && (h = 0), D[K] = T(J[K], J[G], J[h])
			}
			ac.push(D), C = C.concat(D)
		}
		for (G = 0; G < e; G++) {
			for (b = c * (1 - (M = G / e)), h = g * Math.sin(M * Math.PI / 2), K = 0, M = n.length; K < M; K++) {
				Y((t = R(n[K], o[K], h)).x, t.y, -b)
			}
			for (A = 0, v = f.length; A < v; A++) {
				for (J = f[A], D = ac[A], K = 0, M = J.length; K < M; K++) {
					Y((t = R(J[K], D[K], h)).x, t.y, -b)
				}
			}
		}
		for (h = g, K = 0; K < y; K++) {
			t = m ? R(l[K], C[K], h) : l[K], p ? (w.copy(z.normals[0]).multiplyScalar(t.x), q.copy(z.binormals[0]).multiplyScalar(t.y), a.copy(j[0]).addSelf(w).addSelf(q), Y(a.x, a.y, a.z)) : Y(t.x, t.y, 0)
		}
		for (M = 1; M <= i; M++) {
			for (K = 0; K < y; K++) {
				t = m ? R(l[K], C[K], h) : l[K], p ? (w.copy(z.normals[M]).multiplyScalar(t.x), q.copy(z.binormals[M]).multiplyScalar(t.y), a.copy(j[M]).addSelf(w).addSelf(q), Y(a.x, a.y, a.z)) : Y(t.x, t.y, ab / i * M)
			}
		}
		for (G = e - 1; 0 <= G; G--) {
			for (b = c * (1 - (M = G / e)), h = g * Math.sin(M * Math.PI / 2), K = 0, M = n.length; K < M; K++) {
				Y((t = R(n[K], o[K], h)).x, t.y, ab + b)
			}
			for (A = 0, v = f.length; A < v; A++) {
				for (J = f[A], D = ac[A], K = 0, M = J.length; K < M; K++) {
					t = R(J[K], D[K], h), p ? Y(t.x, t.y + j[i - 1].y, j[i - 1].x + b) : Y(t.x, t.y, ab + b)
				}
			}
		}
		var k = THREE.ExtrudeGeometry.WorldUVGenerator;
		! function () {
			if (m) {
				var x;
				for (x = 0 * y, K = 0; K < H; K++) {
					aa((F = r[K])[2] + x, F[1] + x, F[0] + x, !0)
				}
				for (x = i + 2 * e, x *= y, K = 0; K < H; K++) {
					aa((F = r[K])[0] + x, F[1] + x, F[2] + x, !1)
				}
			} else {
				for (K = 0; K < H; K++) {
					aa((F = r[K])[2], F[1], F[0], !0)
				}
				for (K = 0; K < H; K++) {
					aa((F = r[K])[0] + y * i, F[1] + y * i, F[2] + y * i, !1)
				}
			}
		}(),
		function () {
			var x = 0;
			for (U(n, x), x += n.length, A = 0, v = f.length; A < v; A++) {
				U(J = f[A], x), x += J.length
			}
		}()
	}, THREE.ExtrudeGeometry.WorldUVGenerator = {
		generateTopUV: function (e, f, a, b, c, d) {
			return f = e.vertices[c].x, c = e.vertices[c].y, a = e.vertices[d].x, d = e.vertices[d].y, [new THREE.UV(e.vertices[b].x, 1 - e.vertices[b].y), new THREE.UV(f, 1 - c), new THREE.UV(a, 1 - d)]
		},
		generateBottomUV: function (e, f, a, b, c, d) {
			return this.generateTopUV(e, f, a, b, c, d)
		},
		generateSideWallUV: function (f, g, h, j, k, l, m, p) {
			g = f.vertices[k].x, h = f.vertices[k].y, k = f.vertices[k].z, j = f.vertices[l].x;
			var a = f.vertices[l].y,
				c = (l = f.vertices[l].z, f.vertices[m].x),
				b = f.vertices[m].y,
				e = (m = f.vertices[m].z, f.vertices[p].x),
				d = f.vertices[p].y;
			f = f.vertices[p].z;
			return Math.abs(h - a) < 0.01 ? [new THREE.UV(g, k), new THREE.UV(j, l), new THREE.UV(c, m), new THREE.UV(e, f)] : [new THREE.UV(h, k), new THREE.UV(a, l), new THREE.UV(b, m), new THREE.UV(d, f)]
		}
	}, THREE.ExtrudeGeometry.__v1 = new THREE.Vector2, THREE.ExtrudeGeometry.__v2 = new THREE.Vector2, THREE.ExtrudeGeometry.__v3 = new THREE.Vector2, THREE.ExtrudeGeometry.__v4 = new THREE.Vector2, THREE.ExtrudeGeometry.__v5 = new THREE.Vector2, THREE.ExtrudeGeometry.__v6 = new THREE.Vector2, THREE.LatheGeometry = function (e, f, g) {
		THREE.Geometry.call(this);
		f = f || 12, g = g || 2 * Math.PI;
		for (var a = [], b = (new THREE.Matrix4).makeRotationZ(g / f), c = 0; c < e.length; c++) {
			a[c] = e[c].clone(), this.vertices.push(a[c])
		}
		var d = f + 1;
		for (g = 0; g < d; g++) {
			for (c = 0; c < a.length; c++) {
				a[c] = b.multiplyVector3(a[c].clone()), this.vertices.push(a[c])
			}
		}
		for (g = 0; g < f; g++) {
			for (a = 0, b = e.length; a < b - 1; a++) {
				this.faces.push(new THREE.Face4(g * b + a, (g + 1) % d * b + a, (g + 1) % d * b + (a + 1) % b, g * b + (a + 1) % b)), this.faceVertexUvs[0].push([new THREE.UV(1 - g / f, a / b), new THREE.UV(1 - (g + 1) / f, a / b), new THREE.UV(1 - (g + 1) / f, (a + 1) / b), new THREE.UV(1 - g / f, (a + 1) / b)])
			}
		}
		this.computeCentroids(), this.computeFaceNormals(), this.computeVertexNormals()
	}, THREE.LatheGeometry.prototype = new THREE.Geometry, THREE.LatheGeometry.prototype.constructor = THREE.LatheGeometry, THREE.PlaneGeometry = function (h, j, k, l) {
		THREE.Geometry.call(this);
		var a = h / 2,
			b = j / 2,
			c = (k = k || 1) + 1,
			d = (l = l || 1) + 1,
			e = h / k,
			g = j / l,
			f = new THREE.Vector3(0, 1, 0);
		for (h = 0; h < d; h++) {
			for (j = 0; j < c; j++) {
				this.vertices.push(new THREE.Vector3(j * e - a, 0, h * g - b))
			}
		}
		for (h = 0; h < l; h++) {
			for (j = 0; j < k; j++) {
				(a = new THREE.Face4(j + c * h, j + c * (h + 1), j + 1 + c * (h + 1), j + 1 + c * h)).normal.copy(f), a.vertexNormals.push(f.clone(), f.clone(), f.clone(), f.clone()), this.faces.push(a), this.faceVertexUvs[0].push([new THREE.UV(j / k, h / l), new THREE.UV(j / k, (h + 1) / l), new THREE.UV((j + 1) / k, (h + 1) / l), new THREE.UV((j + 1) / k, h / l)])
			}
		}
		this.computeCentroids()
	}, THREE.PlaneGeometry.prototype = new THREE.Geometry, THREE.PlaneGeometry.prototype.constructor = THREE.PlaneGeometry, THREE.SphereGeometry = function (a, b, d, f, h, k, m) {
		THREE.Geometry.call(this);
		a = a || 50, f = void 0 !== f ? f : 0, h = void 0 !== h ? h : 2 * Math.PI, k = void 0 !== k ? k : 0, m = void 0 !== m ? m : Math.PI, b = Math.max(3, Math.floor(b) || 8), d = Math.max(2, Math.floor(d) || 6);
		var n, p, r = [],
			q = [];
		for (p = 0; p <= d; p++) {
			var g = [],
				t = [];
			for (n = 0; n <= b; n++) {
				var e = n / b,
					j = p / d;
				(c = new THREE.Vector3).x = -a * Math.cos(f + e * h) * Math.sin(k + j * m), c.y = a * Math.cos(k + j * m), c.z = a * Math.sin(f + e * h) * Math.sin(k + j * m), this.vertices.push(c), g.push(this.vertices.length - 1), t.push(new THREE.UV(e, j))
			}
			r.push(g), q.push(t)
		}
		for (p = 0; p < d; p++) {
			for (n = 0; n < b; n++) {
				f = r[p][n + 1], h = r[p][n], k = r[p + 1][n], m = r[p + 1][n + 1], g = this.vertices[f].clone().normalize(), t = this.vertices[h].clone().normalize(), e = this.vertices[k].clone().normalize(), j = this.vertices[m].clone().normalize();
				var c = q[p][n + 1].clone(),
					l = q[p][n].clone(),
					u = q[p + 1][n].clone(),
					o = q[p + 1][n + 1].clone();
				Math.abs(this.vertices[f].y) == a ? (this.faces.push(new THREE.Face3(f, k, m, [g, e, j])), this.faceVertexUvs[0].push([c, u, o])) : Math.abs(this.vertices[k].y) == a ? (this.faces.push(new THREE.Face3(f, h, k, [g, t, e])), this.faceVertexUvs[0].push([c, l, u])) : (this.faces.push(new THREE.Face4(f, h, k, m, [g, t, e, j])), this.faceVertexUvs[0].push([c, l, u, o]))
			}
		}
		this.computeCentroids(), this.computeFaceNormals(), this.boundingSphere = {
			radius: a
		}
	}, THREE.SphereGeometry.prototype = new THREE.Geometry, THREE.SphereGeometry.prototype.constructor = THREE.SphereGeometry, THREE.TextGeometry = function (c, d) {
		var a = new THREE.TextPath(c, d).toShapes();
		if (d.amount = void 0 !== d.height ? d.height : 50, void 0 === d.bevelThickness && (d.bevelThickness = 10), void 0 === d.bevelSize && (d.bevelSize = 8), void 0 === d.bevelEnabled && (d.bevelEnabled = !1), d.bend) {
			var b = a[a.length - 1].getBoundingBox().maxX;
			d.bendPath = new THREE.QuadraticBezierCurve(new THREE.Vector2(0, 0), new THREE.Vector2(b / 2, 120), new THREE.Vector2(b, 0))
		}
		THREE.ExtrudeGeometry.call(this, a, d)
	}, THREE.TextGeometry.prototype = new THREE.ExtrudeGeometry, THREE.TextGeometry.prototype.constructor = THREE.TextGeometry, THREE.FontUtils = {
		faces: {},
		face: "helvetiker",
		weight: "normal",
		style: "normal",
		size: 150,
		divisions: 10,
		getFace: function () {
			return this.faces[this.face][this.weight][this.style]
		},
		loadFace: function (a) {
			var b = a.familyName.toLowerCase();
			return this.faces[b] = this.faces[b] || {}, this.faces[b][a.cssFontWeight] = this.faces[b][a.cssFontWeight] || {}, this.faces[b][a.cssFontWeight][a.cssFontStyle] = a, this.faces[b][a.cssFontWeight][a.cssFontStyle] = a
		},
		drawText: function (d) {
			var e = this.getFace(),
				f = this.size / e.resolution,
				g = 0,
				h = ("" + d).split(""),
				a = h.length,
				b = [];
			for (d = 0; d < a; d++) {
				var c = new THREE.Path;
				g = g + (c = this.extractGlyphPoints(h[d], e, f, g, c)).offset;
				b.push(c.path)
			}
			return {
				paths: b,
				offset: g / 2
			}
		},
		extractGlyphPoints: function (a, b, c, d, f) {
			var j, m, n, q, o, e, r, u, h, t, k, g = [],
				p = b.glyphs[a] || b.glyphs["?"];
			if (p) {
				if (p.o) {
					for (q = (b = p._cachedOutline || (p._cachedOutline = p.o.split(" "))).length, a = 0; a < q;) {
						switch (n = b[a++]) {
							case "m":
								n = b[a++] * c + d, o = b[a++] * c, g.push(new THREE.Vector2(n, o)), f.moveTo(n, o);
								break;
							case "l":
								n = b[a++] * c + d, o = b[a++] * c, g.push(new THREE.Vector2(n, o)), f.lineTo(n, o);
								break;
							case "q":
								if (n = b[a++] * c + d, o = b[a++] * c, u = b[a++] * c + d, h = b[a++] * c, f.quadraticCurveTo(u, h, n, o), j = g[g.length - 1]) {
									for (e = j.x, r = j.y, j = 1, m = this.divisions; j <= m; j++) {
										var l = j / m,
											y = THREE.Shape.Utils.b2(l, e, u, n);
										l = THREE.Shape.Utils.b2(l, r, h, o);
										g.push(new THREE.Vector2(y, l))
									}
								}
								break;
							case "b":
								if (n = b[a++] * c + d, o = b[a++] * c, u = b[a++] * c + d, h = b[a++] * -c, t = b[a++] * c + d, k = b[a++] * -c, f.bezierCurveTo(n, o, u, h, t, k), j = g[g.length - 1]) {
									for (e = j.x, r = j.y, j = 1, m = this.divisions; j <= m; j++) {
										l = j / m, y = THREE.Shape.Utils.b3(l, e, u, t, n), l = THREE.Shape.Utils.b3(l, r, h, k, o), g.push(new THREE.Vector2(y, l))
									}
								}
						}
					}
				}
				return {
					offset: p.ha * c,
					points: g,
					path: f
				}
			}
		}
	},
	function (a) {
		var b = function (f) {
			for (var g = f.length, c = 0, d = g - 1, e = 0; e < g; d = e++) {
				c += f[d].x * f[e].y - f[e].x * f[d].y
			}
			return 0.5 * c
		};
		a.Triangulate = function (E, H) {
			var R = E.length;
			if (R < 3) {
				return null
			}
			var f, h, g, c = [],
				d = [],
				e = [];
			if (0 < b(E)) {
				for (h = 0; h < R; h++) {
					d[h] = h
				}
			} else {
				for (h = 0; h < R; h++) {
					d[h] = R - 1 - h
				}
			}
			var m = 2 * R;
			for (h = R - 1; 2 < R;) {
				if (m-- <= 0) {
					console.log("Warning, unable to triangulate polygon!");
					break
				}
				var j;
				R <= (f = h) && (f = 0), R <= (h = f + 1) && (h = 0), R <= (g = h + 1) && (g = 0);
				E: {
					var l = f,
						o = h,
						k = g,
						p = R,
						v = d,
						s = void 0,
						A = void 0,
						w = void 0,
						n = void 0,
						u = (j = E)[v[l]].x,
						q = j[v[l]].y,
						y = j[v[o]].x,
						z = j[v[o]].y,
						t = j[v[k]].x;
					if ((y - u) * ((A = j[v[k]].y) - q) - (z - q) * (t - u) < 1e-10) {
						j = !1
					} else {
						for (s = 0; s < p; s++) {
							if (s != l && s != o && s != k) {
								w = j[v[s]].x;
								var D = void 0,
									r = void 0;
								D = r = void 0, r = (r = y - u) * ((n = j[v[s]].y) - q) - (z - q) * (w - u), D = (D = u - t) * (n - A) - (q - A) * (w - t);
								if (0 <= (t - y) * (n - z) - (A - z) * (w - y) && 0 <= D && 0 <= r) {
									j = !1;
									break E
								}
							}
						}
						j = !0
					}
				}
				if (j) {
					for (c.push([E[d[f]], E[d[h]], E[d[g]]]), e.push([d[f], d[h], d[g]]), g = (f = h) + 1; g < R; f++, g++) {
						d[f] = d[g]
					}
					m = 2 * --R
				}
			}
			return H ? e : c
		}, a.Triangulate.area = b
	}(THREE.FontUtils), self._typeface_js = {
		faces: THREE.FontUtils.faces,
		loadFace: THREE.FontUtils.loadFace
	}, THREE.TorusGeometry = function (a, b, c, d, e) {
		for (THREE.Geometry.call(this), this.radius = a || 100, this.tube = b || 40, this.segmentsR = c || 8, this.segmentsT = d || 6, this.arc = e || 2 * Math.PI, e = new THREE.Vector3, a = [], b = [], c = 0; c <= this.segmentsR; c++) {
			for (d = 0; d <= this.segmentsT; d++) {
				var f = d / this.segmentsT * this.arc,
					g = c / this.segmentsR * Math.PI * 2;
				e.x = this.radius * Math.cos(f), e.y = this.radius * Math.sin(f), (h = new THREE.Vector3).x = (this.radius + this.tube * Math.cos(g)) * Math.cos(f), h.y = (this.radius + this.tube * Math.cos(g)) * Math.sin(f), h.z = this.tube * Math.sin(g), this.vertices.push(h), a.push(new THREE.UV(d / this.segmentsT, 1 - c / this.segmentsR)), b.push(h.clone().subSelf(e).normalize())
			}
		}
		for (c = 1; c <= this.segmentsR; c++) {
			for (d = 1; d <= this.segmentsT; d++) {
				e = (this.segmentsT + 1) * c + d - 1, f = (this.segmentsT + 1) * (c - 1) + d - 1, g = (this.segmentsT + 1) * (c - 1) + d;
				var h = (this.segmentsT + 1) * c + d,
					j = new THREE.Face4(e, f, g, h, [b[e], b[f], b[g], b[h]]);
				j.normal.addSelf(b[e]), j.normal.addSelf(b[f]), j.normal.addSelf(b[g]), j.normal.addSelf(b[h]), j.normal.normalize(), this.faces.push(j), this.faceVertexUvs[0].push([a[e].clone(), a[f].clone(), a[g].clone(), a[h].clone()])
			}
		}
		this.computeCentroids()
	}, THREE.TorusGeometry.prototype = new THREE.Geometry, THREE.TorusGeometry.prototype.constructor = THREE.TorusGeometry, THREE.TorusKnotGeometry = function (h, j, k, l, a, b, c) {
		function d(p, q, r, i, n, m) {
			var o = Math.cos(p);
			return Math.cos(q), q = Math.sin(p), p *= r / i, o *= n * (2 + (r = Math.cos(p))) * 0.5, q = n * (2 + r) * q * 0.5, n = m * n * Math.sin(p) * 0.5, new THREE.Vector3(o, q, n)
		}
		for (THREE.Geometry.call(this), this.radius = h || 200, this.tube = j || 40, this.segmentsR = k || 64, this.segmentsT = l || 8, this.p = a || 2, this.q = b || 3, this.heightScale = c || 1, this.grid = Array(this.segmentsR), k = new THREE.Vector3, l = new THREE.Vector3, a = new THREE.Vector3, h = 0; h < this.segmentsR; ++h) {
			for (this.grid[h] = Array(this.segmentsT), j = 0; j < this.segmentsT; ++j) {
				b = d(e = h / this.segmentsR * 2 * this.p * Math.PI, c = j / this.segmentsT * 2 * Math.PI, this.q, this.p, this.radius, this.heightScale);
				var e = d(e + 0.01, c, this.q, this.p, this.radius, this.heightScale);
				k.sub(e, b), l.add(e, b), a.cross(k, l), l.cross(a, k), a.normalize(), l.normalize(), e = -this.tube * Math.cos(c), c = this.tube * Math.sin(c), b.x = b.x + (e * l.x + c * a.x), b.y = b.y + (e * l.y + c * a.y), b.z = b.z + (e * l.z + c * a.z), this.grid[h][j] = this.vertices.push(new THREE.Vector3(b.x, b.y, b.z)) - 1
			}
		}
		for (h = 0; h < this.segmentsR; ++h) {
			for (j = 0; j < this.segmentsT; ++j) {
				a = (h + 1) % this.segmentsR, b = (j + 1) % this.segmentsT, k = this.grid[h][j], l = this.grid[a][j], a = this.grid[a][b], b = this.grid[h][b], c = new THREE.UV(h / this.segmentsR, j / this.segmentsT), e = new THREE.UV((h + 1) / this.segmentsR, j / this.segmentsT);
				var g = new THREE.UV((h + 1) / this.segmentsR, (j + 1) / this.segmentsT),
					f = new THREE.UV(h / this.segmentsR, (j + 1) / this.segmentsT);
				this.faces.push(new THREE.Face4(k, l, a, b)), this.faceVertexUvs[0].push([c, e, g, f])
			}
		}
		this.computeCentroids(), this.computeFaceNormals(), this.computeVertexNormals()
	}, THREE.TorusKnotGeometry.prototype = new THREE.Geometry, THREE.TorusKnotGeometry.prototype.constructor = THREE.TorusKnotGeometry, THREE.TubeGeometry = function (b, c, d, e, h, j) {
		THREE.Geometry.call(this), this.path = b, this.segments = c || 64, this.radius = d || 1, this.segmentsRadius = e || 8, this.closed = h || !1, j && (this.debug = new THREE.Object3D), this.grid = [];
		j = this.segments + 1;
		var k, l, m, p, o, q, a, g, f = new THREE.Vector3;
		for (q = (c = new THREE.TubeGeometry.FrenetFrames(b, c, h)).tangents, a = c.normals, g = c.binormals, this.tangents = q, this.normals = a, this.binormals = g, c = 0; c < j; c++) {
			for (this.grid[c] = [], e = c / (j - 1), o = b.getPointAt(e), e = q[c], k = a[c], l = g[c], this.debug && (this.debug.add(new THREE.ArrowHelper(e, o, d, 255)), this.debug.add(new THREE.ArrowHelper(k, o, d, 16711680)), this.debug.add(new THREE.ArrowHelper(l, o, d, 65280))), e = 0; e < this.segmentsRadius; e++) {
				m = e / this.segmentsRadius * 2 * Math.PI, p = -this.radius * Math.cos(m), m = this.radius * Math.sin(m), f.copy(o), f.x = f.x + (p * k.x + m * l.x), f.y = f.y + (p * k.y + m * l.y), f.z = f.z + (p * k.z + m * l.z), this.grid[c][e] = this.vertices.push(new THREE.Vector3(f.x, f.y, f.z)) - 1
			}
		}
		for (c = 0; c < this.segments; c++) {
			for (e = 0; e < this.segmentsRadius; e++) {
				j = h ? (c + 1) % this.segments : c + 1, f = (e + 1) % this.segmentsRadius, b = this.grid[c][e], d = this.grid[j][e], j = this.grid[j][f], f = this.grid[c][f], q = new THREE.UV(c / this.segments, e / this.segmentsRadius), a = new THREE.UV((c + 1) / this.segments, e / this.segmentsRadius), g = new THREE.UV((c + 1) / this.segments, (e + 1) / this.segmentsRadius), k = new THREE.UV(c / this.segments, (e + 1) / this.segmentsRadius), this.faces.push(new THREE.Face4(b, d, j, f)), this.faceVertexUvs[0].push([q, a, g, k])
			}
		}
		this.computeCentroids(), this.computeFaceNormals(), this.computeVertexNormals()
	}, THREE.TubeGeometry.prototype = new THREE.Geometry, THREE.TubeGeometry.prototype.constructor = THREE.TubeGeometry, THREE.TubeGeometry.FrenetFrames = function (g, h, j) {
		new THREE.Vector3;
		var k = new THREE.Vector3;
		new THREE.Vector3;
		var e, d, f, l = [],
			p = [],
			a = [],
			b = new THREE.Vector3,
			c = new THREE.Matrix4;
		h += 1;
		for (this.tangents = l, this.normals = p, this.binormals = a, e = 0; e < h; e++) {
			d = e / (h - 1), l[e] = g.getTangentAt(d), l[e].normalize()
		}
		for (p[0] = new THREE.Vector3, a[0] = new THREE.Vector3, g = Number.MAX_VALUE, e = Math.abs(l[0].x), d = Math.abs(l[0].y), f = Math.abs(l[0].z), e <= g && (g = e, k.set(1, 0, 0)), d <= g && (g = d, k.set(0, 1, 0)), f <= g && k.set(0, 0, 1), b.cross(l[0], k).normalize(), p[0].cross(l[0], b), a[0].cross(l[0], p[0]), e = 1; e < h; e++) {
			p[e] = p[e - 1].clone(), a[e] = a[e - 1].clone(), b.cross(l[e - 1], l[e]), 0.0001 < b.length() && (b.normalize(), k = Math.acos(l[e - 1].dot(l[e])), c.makeRotationAxis(b, k).multiplyVector3(p[e])), a[e].cross(l[e], p[e])
		}
		if (j) {
			for (k = Math.acos(p[0].dot(p[h - 1])), k /= h - 1, 0 < l[0].dot(b.cross(p[0], p[h - 1])) && (k = -k), e = 1; e < h; e++) {
				c.makeRotationAxis(l[e], k * e).multiplyVector3(p[e]), a[e].cross(l[e], p[e])
			}
		}
	}, THREE.PolyhedronGeometry = function (g, h, j, k) {
		function l(m) {
			var n = m.normalize().clone();
			n.index = c.vertices.push(n) - 1;
			var i = Math.atan2(m.z, -m.x) / 2 / Math.PI + 0.5;
			m = Math.atan2(-m.y, Math.sqrt(m.x * m.x + m.z * m.z)) / Math.PI + 0.5;
			return n.uv = new THREE.UV(i, m), n
		}

		function p(n, o, i, m) {
			m < 1 ? ((m = new THREE.Face3(n.index, o.index, i.index, [n.clone(), o.clone(), i.clone()])).centroid.addSelf(n).addSelf(o).addSelf(i).divideScalar(3), m.normal = m.centroid.clone().normalize(), c.faces.push(m), m = Math.atan2(m.centroid.z, -m.centroid.x), c.faceVertexUvs[0].push([b(n.uv, n, m), b(o.uv, o, m), b(i.uv, i, m)])) : (m -= 1, p(n, a(n, o), a(n, i), m), p(a(n, o), o, a(o, i), m), p(a(n, i), a(o, i), i, m), p(a(n, o), a(o, i), a(n, i), m))
		}

		function a(m, n) {
			f[m.index] || (f[m.index] = []), f[n.index] || (f[n.index] = []);
			var i = f[m.index][n.index];
			return void 0 === i && (f[m.index][n.index] = f[n.index][m.index] = i = l((new THREE.Vector3).add(m, n).divideScalar(2))), i
		}

		function b(m, n, i) {
			return i < 0 && 1 === m.u && (m = new THREE.UV(m.u - 1, m.v)), 0 === n.x && 0 === n.z && (m = new THREE.UV(i / 2 / Math.PI + 0.5, m.v)), m
		}
		THREE.Geometry.call(this);
		j = j || 1, k = k || 0;
		for (var c = this, e = 0, d = g.length; e < d; e++) {
			l(new THREE.Vector3(g[e][0], g[e][1], g[e][2]))
		}
		var f = [];
		for (g = this.vertices, e = 0, d = h.length; e < d; e++) {
			p(g[h[e][0]], g[h[e][1]], g[h[e][2]], k)
		}
		for (this.mergeVertices(), e = 0, d = this.vertices.length; e < d; e++) {
			this.vertices[e].multiplyScalar(j)
		}
		this.computeCentroids(), this.boundingSphere = {
			radius: j
		}
	}, THREE.PolyhedronGeometry.prototype = new THREE.Geometry, THREE.PolyhedronGeometry.prototype.constructor = THREE.PolyhedronGeometry, THREE.IcosahedronGeometry = function (b, c) {
		var a = (1 + Math.sqrt(5)) / 2;
		THREE.PolyhedronGeometry.call(this, [
			[-1, a, 0],
			[1, a, 0],
			[-1, -a, 0],
			[1, -a, 0],
			[0, -1, a],
			[0, 1, a],
			[0, -1, -a],
			[0, 1, -a],
			[a, 0, -1],
			[a, 0, 1],
			[-a, 0, -1],
			[-a, 0, 1]
		], [
			[0, 11, 5],
			[0, 5, 1],
			[0, 1, 7],
			[0, 7, 10],
			[0, 10, 11],
			[1, 5, 9],
			[5, 11, 4],
			[11, 10, 2],
			[10, 7, 6],
			[7, 1, 8],
			[3, 9, 4],
			[3, 4, 2],
			[3, 2, 6],
			[3, 6, 8],
			[3, 8, 9],
			[4, 9, 5],
			[2, 4, 11],
			[6, 2, 10],
			[8, 6, 7],
			[9, 8, 1]
		], b, c)
	}, THREE.IcosahedronGeometry.prototype = new THREE.Geometry, THREE.IcosahedronGeometry.prototype.constructor = THREE.IcosahedronGeometry, THREE.OctahedronGeometry = function (a, b) {
		THREE.PolyhedronGeometry.call(this, [
			[1, 0, 0],
			[-1, 0, 0],
			[0, 1, 0],
			[0, -1, 0],
			[0, 0, 1],
			[0, 0, -1]
		], [
			[0, 2, 4],
			[0, 4, 3],
			[0, 3, 5],
			[0, 5, 2],
			[1, 2, 5],
			[1, 5, 3],
			[1, 3, 4],
			[1, 4, 2]
		], a, b)
	}, THREE.OctahedronGeometry.prototype = new THREE.Geometry, THREE.OctahedronGeometry.prototype.constructor = THREE.OctahedronGeometry, THREE.TetrahedronGeometry = function (a, b) {
		THREE.PolyhedronGeometry.call(this, [
			[1, 1, 1],
			[-1, -1, 1],
			[-1, 1, -1],
			[1, -1, -1]
		], [
			[2, 1, 0],
			[0, 3, 2],
			[1, 3, 0],
			[2, 3, 1]
		], a, b)
	}, THREE.TetrahedronGeometry.prototype = new THREE.Geometry, THREE.TetrahedronGeometry.prototype.constructor = THREE.TetrahedronGeometry, THREE.ParametricGeometry = function (o, q, b, c) {
		THREE.Geometry.call(this);
		var h, j, l, k, m, p, f, n, d = this.vertices,
			e = this.faces,
			g = this.faceVertexUvs[0],
			a = (c = void 0 !== c && c, q + 1);
		for (h = 0; h <= b; h++) {
			for (k = h / b, j = 0; j <= q; j++) {
				l = o(l = j / q, k), d.push(l)
			}
		}
		for (h = 0; h < b; h++) {
			for (j = 0; j < q; j++) {
				d = (o = h * a + j) + 1, l = (k = (h + 1) * a + j) + 1, m = new THREE.UV(h / q, j / b), p = new THREE.UV(h / q, (j + 1) / b), f = new THREE.UV((h + 1) / q, j / b), n = new THREE.UV((h + 1) / q, (j + 1) / b), c ? (e.push(new THREE.Face3(o, d, k)), e.push(new THREE.Face3(d, l, k)), g.push([m, p, f]), g.push([p, n, f])) : (e.push(new THREE.Face4(o, d, l, k)), g.push([m, p, f, n]))
			}
		}
		this.computeCentroids(), this.computeFaceNormals(), this.computeVertexNormals()
	}, THREE.ParametricGeometry.prototype = new THREE.Geometry, THREE.ParametricGeometry.prototype.constructor = THREE.ParametricGeometry, THREE.AxisHelper = function () {
		THREE.Object3D.call(this);
		var b = new THREE.Geometry;
		b.vertices.push(new THREE.Vector3), b.vertices.push(new THREE.Vector3(0, 100, 0));
		var a, c = new THREE.CylinderGeometry(0, 5, 25, 5, 1);
		(a = new THREE.Line(b, new THREE.LineBasicMaterial({
			color: 16711680
		}))).rotation.z = -Math.PI / 2, this.add(a), (a = new THREE.Mesh(c, new THREE.MeshBasicMaterial({
			color: 16711680
		}))).position.x = 100, a.rotation.z = -Math.PI / 2, this.add(a), a = new THREE.Line(b, new THREE.LineBasicMaterial({
			color: 65280
		})), this.add(a), (a = new THREE.Mesh(c, new THREE.MeshBasicMaterial({
			color: 65280
		}))).position.y = 100, this.add(a), (a = new THREE.Line(b, new THREE.LineBasicMaterial({
			color: 255
		}))).rotation.x = Math.PI / 2, this.add(a), (a = new THREE.Mesh(c, new THREE.MeshBasicMaterial({
			color: 255
		}))).position.z = 100, a.rotation.x = Math.PI / 2, this.add(a)
	}, THREE.AxisHelper.prototype = new THREE.Object3D, THREE.AxisHelper.prototype.constructor = THREE.AxisHelper, THREE.ArrowHelper = function (d, e, a, b) {
		THREE.Object3D.call(this), void 0 === b && (b = 16776960), void 0 === a && (a = 20);
		var c = new THREE.Geometry;
		c.vertices.push(new THREE.Vector3(0, 0, 0)), c.vertices.push(new THREE.Vector3(0, 1, 0)), this.line = new THREE.Line(c, new THREE.LineBasicMaterial({
			color: b
		})), this.add(this.line), c = new THREE.CylinderGeometry(0, 0.05, 0.25, 5, 1), this.cone = new THREE.Mesh(c, new THREE.MeshBasicMaterial({
			color: b
		})), this.cone.position.set(0, 1, 0), this.add(this.cone), e instanceof THREE.Vector3 && (this.position = e), this.setDirection(d), this.setLength(a)
	}, THREE.ArrowHelper.prototype = new THREE.Object3D, THREE.ArrowHelper.prototype.constructor = THREE.ArrowHelper, THREE.ArrowHelper.prototype.setDirection = function (a) {
		var b = new THREE.Vector3(0, 1, 0).crossSelf(a);
		a = Math.acos(new THREE.Vector3(0, 1, 0).dot(a.clone().normalize()));
		this.matrix = (new THREE.Matrix4).makeRotationAxis(b.normalize(), a), this.rotation.getRotationFromMatrix(this.matrix, this.scale)
	}, THREE.ArrowHelper.prototype.setLength = function (a) {
		this.scale.set(a, a, a)
	}, THREE.ArrowHelper.prototype.setColor = function (a) {
		this.line.material.color.setHex(a), this.cone.material.color.setHex(a)
	}, THREE.CameraHelper = function (c) {
		function d(f, g, e) {
			a(f, e), a(g, e)
		}

		function a(e, f) {
			b.lineGeometry.vertices.push(new THREE.Vector3), b.lineGeometry.colors.push(new THREE.Color(f)), void 0 === b.pointMap[e] && (b.pointMap[e] = []), b.pointMap[e].push(b.lineGeometry.vertices.length - 1)
		}
		THREE.Object3D.call(this);
		var b = this;
		this.lineGeometry = new THREE.Geometry, this.lineMaterial = new THREE.LineBasicMaterial({
			color: 16777215,
			vertexColors: THREE.FaceColors
		}), this.pointMap = {}, d("n1", "n2", 16755200), d("n2", "n4", 16755200), d("n4", "n3", 16755200), d("n3", "n1", 16755200), d("f1", "f2", 16755200), d("f2", "f4", 16755200), d("f4", "f3", 16755200), d("f3", "f1", 16755200), d("n1", "f1", 16755200), d("n2", "f2", 16755200), d("n3", "f3", 16755200), d("n4", "f4", 16755200), d("p", "n1", 16711680), d("p", "n2", 16711680), d("p", "n3", 16711680), d("p", "n4", 16711680), d("u1", "u2", 43775), d("u2", "u3", 43775), d("u3", "u1", 43775), d("c", "t", 16777215), d("p", "c", 3355443), d("cn1", "cn2", 3355443), d("cn3", "cn4", 3355443), d("cf1", "cf2", 3355443), d("cf3", "cf4", 3355443), this.camera = c, this.update(c), this.lines = new THREE.Line(this.lineGeometry, this.lineMaterial, THREE.LinePieces), this.add(this.lines)
	}, THREE.CameraHelper.prototype = new THREE.Object3D, THREE.CameraHelper.prototype.constructor = THREE.CameraHelper, THREE.CameraHelper.prototype.update = function () {
		function a(c, d, e, f) {
			if (THREE.CameraHelper.__v.set(d, e, f), THREE.CameraHelper.__projector.unprojectVector(THREE.CameraHelper.__v, THREE.CameraHelper.__c), void 0 !== (c = b.pointMap[c])) {
				for (d = 0, e = c.length; d < e; d++) {
					b.lineGeometry.vertices[c[d]].copy(THREE.CameraHelper.__v)
				}
			}
		}
		var b = this;
		THREE.CameraHelper.__c.projectionMatrix.copy(this.camera.projectionMatrix), a("c", 0, 0, -1), a("t", 0, 0, 1), a("n1", -1, -1, -1), a("n2", 1, -1, -1), a("n3", -1, 1, -1), a("n4", 1, 1, -1), a("f1", -1, -1, 1), a("f2", 1, -1, 1), a("f3", -1, 1, 1), a("f4", 1, 1, 1), a("u1", 0.7, 1.1, -1), a("u2", -0.7, 1.1, -1), a("u3", 0, 2, -1), a("cf1", -1, 0, 1), a("cf2", 1, 0, 1), a("cf3", 0, -1, 1), a("cf4", 0, 1, 1), a("cn1", -1, 0, -1), a("cn2", 1, 0, -1), a("cn3", 0, -1, -1), a("cn4", 0, 1, -1), this.lineGeometry.verticesNeedUpdate = !0
	}, THREE.CameraHelper.__projector = new THREE.Projector, THREE.CameraHelper.__v = new THREE.Vector3, THREE.CameraHelper.__c = new THREE.Camera, THREE.SubdivisionModifier = function (a) {
		this.subdivisions = void 0 === a ? 1 : a, this.useOldVertexColors = !1, this.supportUVs = !0, this.debug = !1
	}, THREE.SubdivisionModifier.prototype.constructor = THREE.SubdivisionModifier, THREE.SubdivisionModifier.prototype.modify = function (a) {
		for (var b = this.subdivisions; 0 < b--;) {
			this.smooth(a)
		}
	}, THREE.SubdivisionModifier.prototype.smooth = function (d) {
		function e() {
			w.debug && console.log.apply(console, arguments)
		}

		function g() {
			console && console.log.apply(console, arguments)
		}

		function i(B, N, Q, S, V, W, X) {
			var Y = new THREE.Face4(B, N, Q, S, null, V.color, V.material);
			if (w.useOldVertexColors) {
				Y.vertexColors = [];
				for (var x, F, I, L = 0; L < 4; L++) {
					I = W[L], (x = new THREE.Color).setRGB(0, 0, 0);
					for (var O = 0; O < I.length; O++) {
						F = V.vertexColors[I[O] - 1], x.r = x.r + F.r, x.g = x.g + F.g, x.b = x.b + F.b
					}
					x.r = x.r / I.length, x.g = x.g / I.length, x.b = x.b / I.length, Y.vertexColors[L] = x
				}
			}
			t.push(Y), w.supportUVs && ((V = [k(B, ""), k(N, X), k(Q, X), k(S, X)])[0] ? V[1] ? V[2] ? V[3] ? C.push(V) : e("d :( ", S + ":" + X) : e("c :( ", Q + ":" + X) : e("b :( ", N + ":" + X) : e("a :( ", B + ":" + X))
		}

		function j(x, B) {
			return Math.min(x, B) + "_" + Math.max(x, B)
		}

		function k(x, B) {
			var F = x + ":" + B,
				I = J[F];
			return I || (T <= x && x < T + D.length ? e("face pt") : e("edge pt"), g("warning, UV not found for", F), null)
		}

		function m(F, I, x) {
			var B = F + ":" + I;
			B in J ? g("dup vertexNo", F, "oldFaceNo", I, "value", x, "key", B, J[B]) : J[B] = x
		}

		function o(x, B) {
			void 0 === G[x] && (G[x] = []), G[x].push(B)
		}

		function r(B, F, x) {
			void 0 === A[B] && (A[B] = {}), A[B][F] = x
		}
		var H, R, n, h, a, b, u = [],
			t = [],
			C = [],
			w = this,
			z = d.vertices,
			D = d.faces,
			y = (u = z.concat(), []),
			E = {},
			K = {},
			J = {},
			T = z.length,
			P = d.faceVertexUvs[0];
		if (e("originalFaces, uvs, originalVerticesLength", D.length, P.length, T), w.supportUVs) {
			for (H = 0, R = P.length; H < R; H++) {
				for (n = 0, h = P[H].length; n < h; n++) {
					m(b = D[H]["abcd".charAt(n)], H, P[H][n])
				}
			}
		}
		for (a in 0 == P.length && (w.supportUVs = !1), H = 0, J) {
			H++
		}
		for (H || (w.supportUVs = !1, e("no uvs")), e("-- Original Faces + Vertices UVs completed", J, "vs", P.length), H = 0, R = D.length; H < R; H++) {
			a = D[H], y.push(a.centroid), u.push(a.centroid), w.supportUVs && (P = new THREE.UV, a instanceof THREE.Face3 ? (P.u = k(a.a, H).u + k(a.b, H).u + k(a.c, H).u, P.v = k(a.a, H).v + k(a.b, H).v + k(a.c, H).v, P.u = P.u / 3, P.v = P.v / 3) : a instanceof THREE.Face4 && (P.u = k(a.a, H).u + k(a.b, H).u + k(a.c, H).u + k(a.d, H).u, P.v = k(a.a, H).v + k(a.b, H).v + k(a.c, H).v + k(a.d, H).v, P.u = P.u / 4, P.v = P.v / 4), m(T + H, "", P))
		}
		e("-- added UVs for new Faces", J), R = function (L) {
			function N(O, Q) {
				void 0 === I[O] && (I[O] = []), I[O].push(Q)
			}
			var x, B, F, I = {};
			for (x = 0, B = L.faces.length; x < B; x++) {
				(F = L.faces[x]) instanceof THREE.Face3 ? (N(j(F.a, F.b), x), N(j(F.b, F.c), x), N(j(F.c, F.a), x)) : F instanceof THREE.Face4 && (N(j(F.a, F.b), x), N(j(F.b, F.c), x), N(j(F.c, F.d), x), N(j(F.d, F.a), x))
			}
			return I
		}(d), b = 0;
		var q, s, f, v, G = {},
			A = {};
		for (H in R) {
			for (P = R[H], o(s = (q = H.split("_"))[0], [s, q = q[1]]), o(q, [s, q]), n = 0, h = P.length; n < h; n++) {
				r(s, a = P[n], H), r(q, a, H)
			}
			P.length < 2 && (K[H] = !0)
		}
		for (H in e("vertexEdgeMap", G, "vertexFaceMap", A), R) {
			a = (P = R[H])[0], h = P[1], s = (q = H.split("_"))[0], q = q[1], P = new THREE.Vector3, K[H] ? (P.addSelf(z[s]), P.addSelf(z[q]), P.multiplyScalar(0.5)) : (P.addSelf(y[a]), P.addSelf(y[h]), P.addSelf(z[s]), P.addSelf(z[q]), P.multiplyScalar(0.25)), E[H] = T + D.length + b, u.push(P), b++, w.supportUVs && ((P = new THREE.UV).u = k(s, a).u + k(q, a).u, P.v = k(s, a).v + k(q, a).v, P.u = P.u / 2, P.v = P.v / 2, m(E[H], a, P), K[H] || ((P = new THREE.UV).u = k(s, h).u + k(q, h).u, P.v = k(s, h).v + k(q, h).v, P.u = P.u / 2, P.v = P.v / 2, m(E[H], h, P)))
		}
		e("-- Step 2 done"), h = ["123", "12", "2", "23"], q = ["123", "23", "3", "31"];
		var l = ["123", "31", "1", "12"],
			p = ["1234", "12", "2", "23"],
			M = ["1234", "23", "3", "34"],
			U = ["1234", "34", "4", "41"],
			c = ["1234", "41", "1", "12"];
		for (H = 0, R = y.length; H < R; H++) {
			a = D[H], P = T + H, a instanceof THREE.Face3 ? (b = j(a.a, a.b), s = j(a.b, a.c), f = j(a.c, a.a), i(P, E[b], a.b, E[s], a, h, H), i(P, E[s], a.c, E[f], a, q, H), i(P, E[f], a.a, E[b], a, l, H)) : a instanceof THREE.Face4 ? (b = j(a.a, a.b), s = j(a.b, a.c), f = j(a.c, a.d), v = j(a.d, a.a), i(P, E[b], a.b, E[s], a, p, H), i(P, E[s], a.c, E[f], a, M, H), i(P, E[f], a.d, E[v], a, U, H), i(P, E[v], a.a, E[b], a, c, H)) : e("face should be a face!", a)
		}
		for (E = new THREE.Vector3, a = new THREE.Vector3, H = 0, R = z.length; H < R; H++) {
			if (void 0 !== G[H]) {
				for (n in E.set(0, 0, 0), a.set(0, 0, 0), s = new THREE.Vector3(0, 0, 0), P = 0, A[H]) {
					E.addSelf(y[n]), P++
				}
				for (h = 0, b = G[H].length, n = 0; n < b; n++) {
					K[j(G[H][n][0], G[H][n][1])] && h++
				}
				if (2 != h) {
					for (E.divideScalar(P), n = 0; n < b; n++) {
						P = z[(P = G[H][n])[0]].clone().addSelf(z[P[1]]).divideScalar(2), a.addSelf(P)
					}
					a.divideScalar(b), s.addSelf(z[H]), s.multiplyScalar(b - 3), s.addSelf(E), s.addSelf(a.multiplyScalar(2)), s.divideScalar(b), u[H] = s
				}
			}
		}
		d.vertices = u, d.faces = t, d.faceVertexUvs[0] = C, delete d.__tmpVertices, d.computeCentroids(), d.computeFaceNormals(), d.computeVertexNormals()
	}, THREE.ImmediateRenderObject = function () {
		THREE.Object3D.call(this), this.render = function () {}
	}, THREE.ImmediateRenderObject.prototype = new THREE.Object3D, THREE.ImmediateRenderObject.prototype.constructor = THREE.ImmediateRenderObject, THREE.LensFlare = function (d, e, a, b, c) {
		THREE.Object3D.call(this), this.lensFlares = [], this.positionScreen = new THREE.Vector3, (this.customUpdateCallback = void 0) !== d && this.add(d, e, a, b, c)
	}, THREE.LensFlare.prototype = new THREE.Object3D, THREE.LensFlare.prototype.constructor = THREE.LensFlare, THREE.LensFlare.prototype.supr = THREE.Object3D.prototype, THREE.LensFlare.prototype.add = function (e, f, a, b, c, d) {
		void 0 === f && (f = -1), void 0 === a && (a = 0), void 0 === d && (d = 1), void 0 === c && (c = new THREE.Color(16777215)), void 0 === b && (b = THREE.NormalBlending), a = Math.min(a, Math.max(0, a)), this.lensFlares.push({
			texture: e,
			size: f,
			distance: a,
			x: 0,
			y: 0,
			z: 0,
			scale: 1,
			rotation: 1,
			opacity: d,
			color: c,
			blending: b
		})
	}, THREE.LensFlare.prototype.updateLensFlares = function () {
		var d, a, e = this.lensFlares.length,
			b = 2 * -this.positionScreen.x,
			c = 2 * -this.positionScreen.y;
		for (d = 0; d < e; d++) {
			(a = this.lensFlares[d]).x = this.positionScreen.x + b * a.distance, a.y = this.positionScreen.y + c * a.distance, a.wantedRotation = a.x * Math.PI * 0.25, a.rotation = a.rotation + 0.25 * (a.wantedRotation - a.rotation)
		}
	}, THREE.LensFlarePlugin = function () {
		function c(i) {
			var n = d.createProgram(),
				q = d.createShader(d.FRAGMENT_SHADER),
				r = d.createShader(d.VERTEX_SHADER);
			return d.shaderSource(q, i.fragmentShader), d.shaderSource(r, i.vertexShader), d.compileShader(q), d.compileShader(r), d.attachShader(n, q), d.attachShader(n, r), d.linkProgram(n), n
		}
		var d, g, h, j, k, l, m, o, a, p, f, b, e;
		this.init = function (i) {
			d = i.context, g = i, h = new Float32Array(16), j = new Uint16Array(6), i = 0, h[i++] = -1, h[i++] = -1, h[i++] = 0, h[i++] = 0, h[i++] = 1, h[i++] = -1, h[i++] = 1, h[i++] = 0, h[i++] = 1, h[i++] = 1, h[i++] = 1, h[i++] = 1, h[i++] = -1, h[i++] = 1, h[i++] = 0, h[i++] = 1, i = 0, j[i++] = 0, j[i++] = 1, j[i++] = 2, j[i++] = 0, j[i++] = 2, j[i++] = 3, k = d.createBuffer(), l = d.createBuffer(), d.bindBuffer(d.ARRAY_BUFFER, k), d.bufferData(d.ARRAY_BUFFER, h, d.STATIC_DRAW), d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, l), d.bufferData(d.ELEMENT_ARRAY_BUFFER, j, d.STATIC_DRAW), m = d.createTexture(), o = d.createTexture(), d.bindTexture(d.TEXTURE_2D, m), d.texImage2D(d.TEXTURE_2D, 0, d.RGB, 16, 16, 0, d.RGB, d.UNSIGNED_BYTE, null), d.texParameteri(d.TEXTURE_2D, d.TEXTURE_WRAP_S, d.CLAMP_TO_EDGE), d.texParameteri(d.TEXTURE_2D, d.TEXTURE_WRAP_T, d.CLAMP_TO_EDGE), d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MAG_FILTER, d.NEAREST), d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MIN_FILTER, d.NEAREST), d.bindTexture(d.TEXTURE_2D, o), d.texImage2D(d.TEXTURE_2D, 0, d.RGBA, 16, 16, 0, d.RGBA, d.UNSIGNED_BYTE, null), d.texParameteri(d.TEXTURE_2D, d.TEXTURE_WRAP_S, d.CLAMP_TO_EDGE), d.texParameteri(d.TEXTURE_2D, d.TEXTURE_WRAP_T, d.CLAMP_TO_EDGE), d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MAG_FILTER, d.NEAREST), d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MIN_FILTER, d.NEAREST), d.getParameter(d.MAX_VERTEX_TEXTURE_IMAGE_UNITS) <= 0 ? (a = !1, p = c(THREE.ShaderFlares.lensFlare)) : (a = !0, p = c(THREE.ShaderFlares.lensFlareVertexTexture)), b = {}, e = !1
		}, this.render = function (i, n, q, w) {
			var u = (i = i.__webglFlares).length;
			if (u) {
				var E, K, J, s, H, A = new THREE.Vector3,
					t = w / q,
					y = 0.5 * q,
					z = 0.5 * w,
					v = 16 / w,
					D = new THREE.Vector2(v * t, v),
					x = new THREE.Vector3(1, 1, 0),
					r = new THREE.Vector2(1, 1),
					B = b;
				v = f;
				for (d.useProgram(p), e || (d.enableVertexAttribArray(f.vertex), d.enableVertexAttribArray(f.uv), e = !0), d.uniform1i(B.occlusionMap, 0), d.uniform1i(B.map, 1), d.bindBuffer(d.ARRAY_BUFFER, k), d.vertexAttribPointer(v.vertex, 2, d.FLOAT, !1, 16, 0), d.vertexAttribPointer(v.uv, 2, d.FLOAT, !1, 16, 8), d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, l), d.disable(d.CULL_FACE), d.depthMask(!1), E = 0; E < u; E++) {
					if (v = 16 / w, D.set(v * t, v), s = i[E], A.set(s.matrixWorld.elements[12], s.matrixWorld.elements[13], s.matrixWorld.elements[14]), n.matrixWorldInverse.multiplyVector3(A), n.projectionMatrix.multiplyVector3(A), x.copy(A), r.x = x.x * y + y, r.y = x.y * z + z, a || 0 < r.x && r.x < q && 0 < r.y && r.y < w) {
						for (d.activeTexture(d.TEXTURE1), d.bindTexture(d.TEXTURE_2D, m), d.copyTexImage2D(d.TEXTURE_2D, 0, d.RGB, r.x - 8, r.y - 8, 16, 16, 0), d.uniform1i(B.renderType, 0), d.uniform2f(B.scale, D.x, D.y), d.uniform3f(B.screenPosition, x.x, x.y, x.z), d.disable(d.BLEND), d.enable(d.DEPTH_TEST), d.drawElements(d.TRIANGLES, 6, d.UNSIGNED_SHORT, 0), d.activeTexture(d.TEXTURE0), d.bindTexture(d.TEXTURE_2D, o), d.copyTexImage2D(d.TEXTURE_2D, 0, d.RGBA, r.x - 8, r.y - 8, 16, 16, 0), d.uniform1i(B.renderType, 1), d.disable(d.DEPTH_TEST), d.activeTexture(d.TEXTURE1), d.bindTexture(d.TEXTURE_2D, m), d.drawElements(d.TRIANGLES, 6, d.UNSIGNED_SHORT, 0), s.positionScreen.copy(x), s.customUpdateCallback ? s.customUpdateCallback(s) : s.updateLensFlares(), d.uniform1i(B.renderType, 2), d.enable(d.BLEND), K = 0, J = s.lensFlares.length; K < J; K++) {
							0.001 < (H = s.lensFlares[K]).opacity && 0.001 < H.scale && (x.x = H.x, x.y = H.y, x.z = H.z, v = H.size * H.scale / w, D.x = v * t, D.y = v, d.uniform3f(B.screenPosition, x.x, x.y, x.z), d.uniform2f(B.scale, D.x, D.y), d.uniform1f(B.rotation, H.rotation), d.uniform1f(B.opacity, H.opacity), d.uniform3f(B.color, H.color.r, H.color.g, H.color.b), g.setBlending(H.blending, H.blendEquation, H.blendSrc, H.blendDst), g.setTexture(H.texture, 1), d.drawElements(d.TRIANGLES, 6, d.UNSIGNED_SHORT, 0))
						}
					}
				}
				d.enable(d.CULL_FACE), d.enable(d.DEPTH_TEST), d.depthMask(!0)
			}
		}
	}, THREE.ShadowMapPlugin = function () {
		var d, e, f, g, h = new THREE.Frustum,
			a = new THREE.Matrix4,
			b = new THREE.Vector3,
			c = new THREE.Vector3;
		this.init = function (i) {
			d = i.context, e = i;
			i = THREE.ShaderLib.depthRGBA;
			var j = THREE.UniformsUtils.clone(i.uniforms);
			f = new THREE.ShaderMaterial({
				fragmentShader: i.fragmentShader,
				vertexShader: i.vertexShader,
				uniforms: j
			}), g = new THREE.ShaderMaterial({
				fragmentShader: i.fragmentShader,
				vertexShader: i.vertexShader,
				uniforms: j,
				morphTargets: !0
			}), f._shadowPass = !0, g._shadowPass = !0
		}, this.render = function (i, j) {
			e.shadowMapEnabled && e.shadowMapAutoUpdate && this.update(i, j)
		}, this.update = function (w, m) {
			var l, r, n, p, s, o, u, k, j, t = [];
			for (p = 0, d.clearColor(1, 1, 1, 1), d.disable(d.BLEND), d.enable(d.CULL_FACE), e.shadowMapCullFrontFaces ? d.cullFace(d.FRONT) : d.cullFace(d.BACK), e.setDepthTest(!0), l = 0, r = w.__lights.length; l < r; l++) {
				if ((n = w.__lights[l]).castShadow) {
					if (n instanceof THREE.DirectionalLight && n.shadowCascade) {
						for (s = 0; s < n.shadowCascadeCount; s++) {
							var i;
							if (n.shadowCascadeArray[s]) {
								i = n.shadowCascadeArray[s]
							} else {
								j = n, u = s, (i = new THREE.DirectionalLight).isVirtual = !0, i.onlyShadow = !0, i.castShadow = !0, i.shadowCameraNear = j.shadowCameraNear, i.shadowCameraFar = j.shadowCameraFar, i.shadowCameraLeft = j.shadowCameraLeft, i.shadowCameraRight = j.shadowCameraRight, i.shadowCameraBottom = j.shadowCameraBottom, i.shadowCameraTop = j.shadowCameraTop, i.shadowCameraVisible = j.shadowCameraVisible, i.shadowDarkness = j.shadowDarkness, i.shadowBias = j.shadowCascadeBias[u], i.shadowMapWidth = j.shadowCascadeWidth[u], i.shadowMapHeight = j.shadowCascadeHeight[u], i.pointsWorld = [], i.pointsFrustum = [], k = i.pointsWorld, o = i.pointsFrustum;
								for (var q = 0; q < 8; q++) {
									k[q] = new THREE.Vector3, o[q] = new THREE.Vector3
								}
								k = j.shadowCascadeNearZ[u], j = j.shadowCascadeFarZ[u], o[0].set(-1, -1, k), o[1].set(1, -1, k), o[2].set(-1, 1, k), o[3].set(1, 1, k), o[4].set(-1, -1, j), o[5].set(1, -1, j), o[6].set(-1, 1, j), o[7].set(1, 1, j), i.originalCamera = m, (o = new THREE.Gyroscope).position = n.shadowCascadeOffset, o.add(i), o.add(i.target), m.add(o), n.shadowCascadeArray[s] = i, console.log("Created virtualLight", i)
							}
							k = s, (j = (u = n).shadowCascadeArray[k]).position.copy(u.position), j.target.position.copy(u.target.position), j.lookAt(j.target), j.shadowCameraVisible = u.shadowCameraVisible, j.shadowDarkness = u.shadowDarkness, j.shadowBias = u.shadowCascadeBias[k], o = u.shadowCascadeNearZ[k], u = u.shadowCascadeFarZ[k], (j = j.pointsFrustum)[0].z = o, j[1].z = o, j[2].z = o, j[3].z = o, j[4].z = u, j[5].z = u, j[6].z = u, j[7].z = u, t[p] = i, p++
						}
					} else {
						t[p] = n, p++
					}
				}
			}
			for (l = 0, r = t.length; l < r; l++) {
				if ((n = t[l]).shadowMap || (n.shadowMap = new THREE.WebGLRenderTarget(n.shadowMapWidth, n.shadowMapHeight, {
						minFilter: THREE.LinearFilter,
						magFilter: THREE.LinearFilter,
						format: THREE.RGBAFormat
					}), n.shadowMapSize = new THREE.Vector2(n.shadowMapWidth, n.shadowMapHeight), n.shadowMatrix = new THREE.Matrix4), !n.shadowCamera) {
					if (n instanceof THREE.SpotLight) {
						n.shadowCamera = new THREE.PerspectiveCamera(n.shadowCameraFov, n.shadowMapWidth / n.shadowMapHeight, n.shadowCameraNear, n.shadowCameraFar)
					} else {
						if (!(n instanceof THREE.DirectionalLight)) {
							console.error("Unsupported light type for shadow");
							continue
						}
						n.shadowCamera = new THREE.OrthographicCamera(n.shadowCameraLeft, n.shadowCameraRight, n.shadowCameraTop, n.shadowCameraBottom, n.shadowCameraNear, n.shadowCameraFar)
					}
					w.add(n.shadowCamera), e.autoUpdateScene && w.updateMatrixWorld()
				}
				if (n.shadowCameraVisible && !n.cameraHelper && (n.cameraHelper = new THREE.CameraHelper(n.shadowCamera), n.shadowCamera.add(n.cameraHelper)), n.isVirtual && i.originalCamera == m) {
					for (s = m, p = n.shadowCamera, o = n.pointsFrustum, j = n.pointsWorld, b.set(1 / 0, 1 / 0, 1 / 0), c.set(-1 / 0, -1 / 0, -1 / 0), u = 0; u < 8; u++) {
						(k = j[u]).copy(o[u]), THREE.ShadowMapPlugin.__projector.unprojectVector(k, s), p.matrixWorldInverse.multiplyVector3(k), k.x < b.x && (b.x = k.x), k.x > c.x && (c.x = k.x), k.y < b.y && (b.y = k.y), k.y > c.y && (c.y = k.y), k.z < b.z && (b.z = k.z), k.z > c.z && (c.z = k.z)
					}
					p.left = b.x, p.right = c.x, p.top = c.y, p.bottom = b.y, p.updateProjectionMatrix()
				}
				for (p = n.shadowMap, o = n.shadowMatrix, (s = n.shadowCamera).position.copy(n.matrixWorld.getPosition()), s.lookAt(n.target.matrixWorld.getPosition()), s.updateMatrixWorld(), s.matrixWorldInverse.getInverse(s.matrixWorld), n.cameraHelper && (n.cameraHelper.lines.visible = n.shadowCameraVisible), n.shadowCameraVisible && n.cameraHelper.update(), o.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1), o.multiplySelf(s.projectionMatrix), o.multiplySelf(s.matrixWorldInverse), s._viewMatrixArray || (s._viewMatrixArray = new Float32Array(16)), s._projectionMatrixArray || (s._projectionMatrixArray = new Float32Array(16)), s.matrixWorldInverse.flattenToArray(s._viewMatrixArray), s.projectionMatrix.flattenToArray(s._projectionMatrixArray), a.multiply(s.projectionMatrix, s.matrixWorldInverse), h.setFromMatrix(a), e.setRenderTarget(p), e.clear(), n = 0, p = (j = w.__webglObjects).length; n < p; n++) {
					o = (u = j[n]).object, u.render = !1, !o.visible || !o.castShadow || o instanceof THREE.Mesh && o.frustumCulled && !h.contains(o) || (o._modelViewMatrix.multiply(s.matrixWorldInverse, o.matrixWorld), u.render = !0)
				}
				for (n = 0, p = j.length; n < p; n++) {
					(u = j[n]).render && (o = u.object, u = u.buffer, k = o.customDepthMaterial ? o.customDepthMaterial : o.geometry.morphTargets.length ? g : f, u instanceof THREE.BufferGeometry ? e.renderBufferDirect(s, w.__lights, null, k, u, o) : e.renderBuffer(s, w.__lights, null, k, u, o))
				}
				for (n = 0, p = (j = w.__webglObjectsImmediate).length; n < p; n++) {
					(o = (u = j[n]).object).visible && o.castShadow && (o._modelViewMatrix.multiply(s.matrixWorldInverse, o.matrixWorld), e.renderImmediateObject(s, w.__lights, null, f, o))
				}
			}
			l = e.getClearColor(), r = e.getClearAlpha(), d.clearColor(l.r, l.g, l.b, r), d.enable(d.BLEND), e.shadowMapCullFrontFaces && d.cullFace(d.BACK)
		}
	}, THREE.ShadowMapPlugin.__projector = new THREE.Projector, THREE.SpritePlugin = function () {
		function h(i, m) {
			return m.z - i.z
		}
		var j, k, l, a, b, c, d, e, g, f;
		this.init = function (o) {
			j = o.context, k = o, l = new Float32Array(16), a = new Uint16Array(6), o = 0, l[o++] = -1, l[o++] = -1, l[o++] = 0, l[o++] = 1, l[o++] = 1, l[o++] = -1, l[o++] = 1, l[o++] = 1, l[o++] = 1, l[o++] = 1, l[o++] = 1, l[o++] = 0, l[o++] = -1, l[o++] = 1, l[o++] = 0, o = l[o++] = 0, a[o++] = 0, a[o++] = 1, a[o++] = 2, a[o++] = 0, a[o++] = 2, a[o++] = 3, b = j.createBuffer(), c = j.createBuffer(), j.bindBuffer(j.ARRAY_BUFFER, b), j.bufferData(j.ARRAY_BUFFER, l, j.STATIC_DRAW), j.bindBuffer(j.ELEMENT_ARRAY_BUFFER, c), j.bufferData(j.ELEMENT_ARRAY_BUFFER, a, j.STATIC_DRAW);
			o = THREE.ShaderSprite.sprite;
			var i = j.createProgram(),
				m = j.createShader(j.FRAGMENT_SHADER),
				n = j.createShader(j.VERTEX_SHADER);
			j.shaderSource(m, o.fragmentShader), j.shaderSource(n, o.vertexShader), j.compileShader(m), j.compileShader(n), j.attachShader(i, m), j.attachShader(i, n), j.linkProgram(i), d = i, g = {}, (e = {}).position = j.getAttribLocation(d, "position"), e.uv = j.getAttribLocation(d, "uv"), g.uvOffset = j.getUniformLocation(d, "uvOffset"), g.uvScale = j.getUniformLocation(d, "uvScale"), g.rotation = j.getUniformLocation(d, "rotation"), g.scale = j.getUniformLocation(d, "scale"), g.alignment = j.getUniformLocation(d, "alignment"), g.color = j.getUniformLocation(d, "color"), g.map = j.getUniformLocation(d, "map"), g.opacity = j.getUniformLocation(d, "opacity"), g.useScreenCoordinates = j.getUniformLocation(d, "useScreenCoordinates"), g.affectedByDistance = j.getUniformLocation(d, "affectedByDistance"), g.screenPosition = j.getUniformLocation(d, "screenPosition"), g.modelViewMatrix = j.getUniformLocation(d, "modelViewMatrix"), g.projectionMatrix = j.getUniformLocation(d, "projectionMatrix"), f = !1
		}, this.render = function (p, q, s, u) {
			var r = (p = p.__webglSprites).length;
			if (r) {
				var v = e,
					w = g,
					t = u / s,
					o = (s = 0.5 * s, 0.5 * u),
					i = !0;
				j.useProgram(d), f || (j.enableVertexAttribArray(v.position), j.enableVertexAttribArray(v.uv), f = !0), j.disable(j.CULL_FACE), j.enable(j.BLEND), j.depthMask(!0), j.bindBuffer(j.ARRAY_BUFFER, b), j.vertexAttribPointer(v.position, 2, j.FLOAT, !1, 16, 0), j.vertexAttribPointer(v.uv, 2, j.FLOAT, !1, 16, 8), j.bindBuffer(j.ELEMENT_ARRAY_BUFFER, c), j.uniformMatrix4fv(w.projectionMatrix, !1, q._projectionMatrixArray), j.activeTexture(j.TEXTURE0), j.uniform1i(w.map, 0);
				var n, m = [];
				for (v = 0; v < r; v++) {
					(n = p[v]).visible && 0 !== n.opacity && (n.useScreenCoordinates ? n.z = -n.position.z : (n._modelViewMatrix.multiply(q.matrixWorldInverse, n.matrixWorld), n.z = -n._modelViewMatrix.elements[14]))
				}
				for (p.sort(h), v = 0; v < r; v++) {
					(n = p[v]).visible && 0 !== n.opacity && n.map && n.map.image && n.map.image.width && (n.useScreenCoordinates ? (j.uniform1i(w.useScreenCoordinates, 1), j.uniform3f(w.screenPosition, (n.position.x - s) / s, (o - n.position.y) / o, Math.max(0, Math.min(1, n.position.z)))) : (j.uniform1i(w.useScreenCoordinates, 0), j.uniform1i(w.affectedByDistance, n.affectedByDistance ? 1 : 0), j.uniformMatrix4fv(w.modelViewMatrix, !1, n._modelViewMatrix.elements)), q = n.map.image.width / (n.scaleByViewport ? u : 1), m[0] = q * t * n.scale.x, m[1] = q * n.scale.y, j.uniform2f(w.uvScale, n.uvScale.x, n.uvScale.y), j.uniform2f(w.uvOffset, n.uvOffset.x, n.uvOffset.y), j.uniform2f(w.alignment, n.alignment.x, n.alignment.y), j.uniform1f(w.opacity, n.opacity), j.uniform3f(w.color, n.color.r, n.color.g, n.color.b), j.uniform1f(w.rotation, n.rotation), j.uniform2fv(w.scale, m), n.mergeWith3D && !i ? (j.enable(j.DEPTH_TEST), i = !0) : !n.mergeWith3D && i && (j.disable(j.DEPTH_TEST), i = !1), k.setBlending(n.blending, n.blendEquation, n.blendSrc, n.blendDst), k.setTexture(n.map, 0), j.drawElements(j.TRIANGLES, 6, j.UNSIGNED_SHORT, 0))
				}
				j.enable(j.CULL_FACE), j.enable(j.DEPTH_TEST), j.depthMask(!0)
			}
		}
	}, THREE.DepthPassPlugin = function () {
		this.enabled = !1, this.renderTarget = null;
		var e, f, a, b, c = new THREE.Frustum,
			d = new THREE.Matrix4;
		this.init = function (g) {
			e = g.context, f = g;
			g = THREE.ShaderLib.depthRGBA;
			var h = THREE.UniformsUtils.clone(g.uniforms);
			a = new THREE.ShaderMaterial({
				fragmentShader: g.fragmentShader,
				vertexShader: g.vertexShader,
				uniforms: h
			}), b = new THREE.ShaderMaterial({
				fragmentShader: g.fragmentShader,
				vertexShader: g.vertexShader,
				uniforms: h,
				morphTargets: !0
			}), a._shadowPass = !0, b._shadowPass = !0
		}, this.render = function (g, h) {
			this.enabled && this.update(g, h)
		}, this.update = function (j, k) {
			var l, g, o, m, h, i;
			for (e.clearColor(1, 1, 1, 1), e.disable(e.BLEND), f.setDepthTest(!0), f.autoUpdateScene && j.updateMatrixWorld(), k._viewMatrixArray || (k._viewMatrixArray = new Float32Array(16)), k._projectionMatrixArray || (k._projectionMatrixArray = new Float32Array(16)), k.matrixWorldInverse.getInverse(k.matrixWorld), k.matrixWorldInverse.flattenToArray(k._viewMatrixArray), k.projectionMatrix.flattenToArray(k._projectionMatrixArray), d.multiply(k.projectionMatrix, k.matrixWorldInverse), c.setFromMatrix(d), f.setRenderTarget(this.renderTarget), f.clear(), l = 0, g = (i = j.__webglObjects).length; l < g; l++) {
				h = (o = i[l]).object, o.render = !1, !h.visible || h instanceof THREE.Mesh && h.frustumCulled && !c.contains(h) || (h._modelViewMatrix.multiply(k.matrixWorldInverse, h.matrixWorld), o.render = !0)
			}
			for (l = 0, g = i.length; l < g; l++) {
				(o = i[l]).render && (h = o.object, o = o.buffer, f.setObjectFaces(h), m = h.customDepthMaterial ? h.customDepthMaterial : h.geometry.morphTargets.length ? b : a, o instanceof THREE.BufferGeometry ? f.renderBufferDirect(k, j.__lights, null, m, o, h) : f.renderBuffer(k, j.__lights, null, m, o, h))
			}
			for (l = 0, g = (i = j.__webglObjectsImmediate).length; l < g; l++) {
				(h = (o = i[l]).object).visible && h.castShadow && (h._modelViewMatrix.multiply(k.matrixWorldInverse, h.matrixWorld), f.renderImmediateObject(k, j.__lights, null, a, h))
			}
			l = f.getClearColor(), g = f.getClearAlpha(), e.clearColor(l.r, l.g, l.b, g), e.enable(e.BLEND)
		}
	}, THREE.ShaderFlares = {
		lensFlareVertexTexture: {
			vertexShader: "uniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nuniform int renderType;\nuniform sampler2D occlusionMap;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\nvec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.1, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.5 ) );\nvVisibility = (       visibility.r / 9.0 ) *\n( 1.0 - visibility.g / 9.0 ) *\n(       visibility.b / 9.0 ) *\n( 1.0 - visibility.a / 9.0 );\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
			fragmentShader: "precision mediump float;\nuniform sampler2D map;\nuniform float opacity;\nuniform int renderType;\nuniform vec3 color;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * vVisibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"
		},
		lensFlare: {
			vertexShader: "uniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nuniform int renderType;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
			fragmentShader: "precision mediump float;\nuniform sampler2D map;\nuniform sampler2D occlusionMap;\nuniform float opacity;\nuniform int renderType;\nuniform vec3 color;\nvarying vec2 vUV;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nfloat visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 ) ).a +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 ) ).a +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 ) ).a +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 ) ).a;\nvisibility = ( 1.0 - visibility / 4.0 );\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * visibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"
		}
	}, THREE.ShaderSprite = {
		sprite: {
			vertexShader: "uniform int useScreenCoordinates;\nuniform int affectedByDistance;\nuniform vec3 screenPosition;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float rotation;\nuniform vec2 scale;\nuniform vec2 alignment;\nuniform vec2 uvOffset;\nuniform vec2 uvScale;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uvOffset + uv * uvScale;\nvec2 alignedPosition = position + alignment;\nvec2 rotatedPosition;\nrotatedPosition.x = ( cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y ) * scale.x;\nrotatedPosition.y = ( sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y ) * scale.y;\nvec4 finalPosition;\nif( useScreenCoordinates != 0 ) {\nfinalPosition = vec4( screenPosition.xy + rotatedPosition, screenPosition.z, 1.0 );\n} else {\nfinalPosition = projectionMatrix * modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\nfinalPosition.xy += rotatedPosition * ( affectedByDistance == 1 ? 1.0 : finalPosition.z );\n}\ngl_Position = finalPosition;\n}",
			fragmentShader: "precision mediump float;\nuniform vec3 color;\nuniform sampler2D map;\nuniform float opacity;\nvarying vec2 vUV;\nvoid main() {\nvec4 texture = texture2D( map, vUV );\ngl_FragColor = vec4( color * texture.xyz, texture.a * opacity );\n}"
		}
	};
var senpai_IAM_NOT_KYSY = function (au) {
	var aL = 64,
		aN = 32,
		aR = 1,
		aV = 64,
		aZ = 32,
		a1 = 1;
	window.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (a) {
		window.setTimeout(a, 1000 / 60)
	};
	var a3 = (function () {
			var a = document.createElement("div");
			a.innerHTML = "\x3c!--[if IE]><i></i><![endif]--\x3e", a.getElementsByTagName("i").length
		}(), !!document.createElement("canvas").getContext("experimental-webgl") || !!document.createElement("canvas").getContext("webgl")),
		bv = document.querySelector("#senpaiskin");
	var bw = aL,
		bx = 1 / aL,
		aP = 1 / aN,
		aU = document.createElement("canvas"),
		a0 = aU.getContext("2d");
	aU.width = 8 * aL, aU.height = 8 * aN;
	var a7 = document.createElement("canvas"),
		ba = a7.getContext("2d");
	a7.width = aL, a7.height = aN;
	var at = document.createElement("canvas"),
		aw = at.getContext("2d");
	at.width = aL, at.height = aN;
	var ay = !1,
		az = !0,
		bg = !1,
		bi = !1,
		bl = function (a, b) {
			var c = new THREE.MeshBasicMaterial({
				map: new THREE.Texture(a, new THREE.UVMapping, THREE.ClampToEdgeWrapping, THREE.ClampToEdgeWrapping, THREE.NearestFilter, THREE.NearestFilter, b ? THREE.RGBAFormat : THREE.RGBFormat),
				transparent: b
			});
			return c.map.needsUpdate = !0, c
		},
		bn = function (j, a, c, e, f, g, h) {
			h || (h = 0);
			var i = j.geometry.faceVertexUvs[0][a],
				b = c,
				d = e;
			i[(0 + h) % 4].u = b * bx, i[(0 + h) % 4].v = d * aP, i[(1 + h) % 4].u = b * bx, i[(1 + h) % 4].v = d * aP + g * aP, i[(2 + h) % 4].u = b * bx + f * bx, i[(2 + h) % 4].v = d * aP + g * aP, i[(3 + h) % 4].u = b * bx + f * bx, i[(3 + h) % 4].v = d * aP
		},
		bo = bl(a7, !1),
		by = bl(a7, !0),
		bz = bl(at, !1),
		bA = new THREE.PerspectiveCamera(35, 0.8, 1, 1000);
	bA.position.z = 48;
	var aD = new THREE.Scene;
	aD.add(bA);
	for (var aF = new THREE.Object3D, aH = new THREE.Object3D, aK = new THREE.CubeGeometry(4, 12, 4), aQ = 0; aQ < 8; aQ += 1) {
		aK.vertices[aQ].y -= 6
	}
	var aX = new THREE.Mesh(aK, bo);
	aX.position.z = -2, aX.position.y = -6, bn(aX, 0, 8 * aR, 20 * aR, -4 * aR, 12 * aR), bn(aX, 1, 16 * aR, 20 * aR, -4 * aR, 12 * aR), bn(aX, 2, 4 * aR, 16 * aR, 4 * aR, 4 * aR, 3), bn(aX, 3, 8 * aR, 16 * aR, 4 * aR, 4 * aR, 1), bn(aX, 4, 12 * aR, 20 * aR, -4 * aR, 12 * aR), bn(aX, 5, 4 * aR, 20 * aR, -4 * aR, 12 * aR);
	var a2 = new THREE.CubeGeometry(4, 12, 4);
	for (aQ = 0; aQ < 8; aQ += 1) {
		a2.vertices[aQ].y -= 6
	}
	var a5 = new THREE.Mesh(a2, bo);
	a5.position.z = 2, a5.position.y = -6, bn(a5, 0, 4 * aR, 20 * aR, 4 * aR, 12 * aR), bn(a5, 1, 12 * aR, 20 * aR, 4 * aR, 12 * aR), bn(a5, 2, 8 * aR, 16 * aR, -4 * aR, 4 * aR, 3), bn(a5, 3, 12 * aR, 16 * aR, -4 * aR, 4 * aR, 1), bn(a5, 4, 0 * aR, 20 * aR, 4 * aR, 12 * aR), bn(a5, 5, 8 * aR, 20 * aR, 4 * aR, 12 * aR);
	var a6 = new THREE.CubeGeometry(4, 12, 8),
		a9 = new THREE.Mesh(a6, bo);
	bn(a9, 0, 20 * aR, 20 * aR, 8 * aR, 12 * aR), bn(a9, 1, 32 * aR, 20 * aR, 8 * aR, 12 * aR), bn(a9, 2, 20 * aR, 16 * aR, 8 * aR, 4 * aR, 1), bn(a9, 3, 28 * aR, 16 * aR, 8 * aR, 4 * aR, 3), bn(a9, 4, 16 * aR, 20 * aR, 4 * aR, 12 * aR), bn(a9, 5, 28 * aR, 20 * aR, 4 * aR, 12 * aR), aH.add(a9);
	var bb = new THREE.CubeGeometry(4, 12, 4);
	for (aQ = 0; aQ < 8; aQ += 1) {
		bb.vertices[aQ].y -= 4
	}
	var bc = new THREE.Mesh(bb, bo);
	bc.position.z = -6, bc.position.y = 4, bc.rotation.x = Math.PI / 32, bn(bc, 0, 48 * aR, 20 * aR, -4 * aR, 12 * aR), bn(bc, 1, 56 * aR, 20 * aR, -4 * aR, 12 * aR), bn(bc, 2, 48 * aR, 16 * aR, -4 * aR, 4 * aR, 1), bn(bc, 3, 52 * aR, 20 * aR, -4 * aR, -4 * aR, 3), bn(bc, 4, 52 * aR, 20 * aR, -4 * aR, 12 * aR), bn(bc, 5, 44 * aR, 20 * aR, -4 * aR, 12 * aR), aH.add(bc);
	var bd = new THREE.CubeGeometry(4, 12, 4);
	for (aQ = 0; aQ < 8; aQ += 1) {
		bd.vertices[aQ].y -= 4
	}
	var bp = new THREE.Mesh(bd, bo);
	bp.position.z = 6, bp.position.y = 4, bp.rotation.x = -Math.PI / 32, bn(bp, 0, 44 * aR, 20 * aR, 4 * aR, 12 * aR), bn(bp, 1, 52 * aR, 20 * aR, 4 * aR, 12 * aR), bn(bp, 2, 44 * aR, 16 * aR, 4 * aR, 4 * aR, 1), bn(bp, 3, 48 * aR, 20 * aR, 4 * aR, -4 * aR, 3), bn(bp, 4, 40 * aR, 20 * aR, 4 * aR, 12 * aR), bn(bp, 5, 48 * aR, 20 * aR, 4 * aR, 12 * aR), aH.add(bp);
	var bq = new THREE.CubeGeometry(8, 8, 8),
		br = new THREE.Mesh(bq, bo);
	br.position.y = 2, bn(br, 0, 8 * aR, 8 * aR, 8 * aR, 8 * aR), bn(br, 1, 24 * aR, 8 * aR, 8 * aR, 8 * aR), bn(br, 2, 8 * aR, 0 * aR, 8 * aR, 8 * aR, 1), bn(br, 3, 16 * aR, 0 * aR, 8 * aR, 8 * aR, 3), bn(br, 4, 0 * aR, 8 * aR, 8 * aR, 8 * aR), bn(br, 5, 16 * aR, 8 * aR, 8 * aR, 8 * aR), aF.add(br);
	var bs = new THREE.Object3D,
		bt = new THREE.CubeGeometry(1, 6.75, 6.75),
		bu = new THREE.Mesh(bt, bo),
		aA = new THREE.Mesh(bt, bo);
	bu.position.y = 7.625, aA.position.y = 7.625, bu.position.z = -5.625, aA.position.z = 5.625, bn(bu, 0, 25, 1, 6, 6), bn(bu, 1, 32, 1, 6, 6), bn(bu, 2, 25, 0, 6, 1, 1), bn(bu, 3, 31, 0, 6, 1, 1), bn(bu, 4, 24, 1, 1, 6), bn(bu, 5, 31, 1, 1, 6), bs.add(bu), bs.add(aA), aF.position.y = 8;
	var aB = new THREE.Object3D,
		aC = new THREE.CubeGeometry(1, 16, 10),
		aE = new THREE.Mesh(aC, bz);
	aE.position.y = -8, aE.visible = !1, bn(aE, 0, 1 * a1, 1 * a1, 10 * a1, 16 * a1), bn(aE, 1, 12 * a1, 1 * a1, 10 * a1, 16 * a1), bn(aE, 2, 1 * a1, 0 * a1, 10 * a1, 1 * a1), bn(aE, 3, 11 * a1, 0 * a1, 10 * a1, 1 * a1, 1), bn(aE, 4, 0 * a1, 1 * a1, 1 * a1, 16 * a1), bn(aE, 5, 11 * a1, 1 * a1, 1 * a1, 16 * a1), aB.rotation.y = Math.PI, aB.position.x = -2, aB.position.y = 6, aB.add(aE);
	var aG = new THREE.Object3D;
	aG.add(aX), aG.add(a5), aG.add(aH), aG.add(aF), aG.add(aB), aG.position.y = 6;
	var aJ = new THREE.Object3D;
	aJ.add(aG), aD.add(aJ);
	var aI = 0,
		aM = 0.1,
		aT = 0,
		aY = 0,
		a4 = au || 0,
		a8 = !1,
		av = Date.now(),
		ax = function () {
			requestAnimFrame(ax, be.domElement);
			var a = (Date.now() - av) / 1000;
			a8 ? a4 = aI : (bi || (aM *= 0.97), ay && (a4 += 2)), 500 < aM ? aM = 500 : aM < -500 && (aM = -500), bA.position.x = -Math.cos(a4 / 120 + Math.PI / 0.9), bA.position.z = -Math.sin(a4 / 120 + Math.PI / 0.9), bA.position.y = aM / 150 * 1.5 + 0.2, bw = bj(bw, 20, 300), bA.position.setLength(bw), bA.lookAt(new THREE.Vector3(0, 0, 0)), bg || (0.01, aF.rotation.y = Math.sin(1.5 * a) / 5, aF.rotation.z = Math.sin(a) / 6, (bc.rotation.z = -Math.sin(3 * a) / 2, bc.rotation.x = (Math.cos(3 * a) + Math.PI / 2) / 30, bp.rotation.z = Math.sin(3 * a) / 2, bp.rotation.x = -(Math.cos(3 * a) + Math.PI / 2) / 30, aX.rotation.z = Math.sin(3 * a) / 3, a5.rotation.z = -Math.sin(3 * a) / 3, aB.rotation.z = Math.sin(2 * a) / 15 + Math.PI / 15, aJ.position.y = -3)), be.render(aD, bA)
		};
	if (a3) {
		var be = new THREE.WebGLRenderer({
			antialias: !0,
			preserveDrawingBuffer: !0
		})
	} else {
		be = new THREE.CanvasRenderer({
			antialias: !0,
			preserveDrawingBuffer: !0
		})
	}
	var bf = be.domElement;
	be.setSize(240, 300), bv.appendChild(bf);
	var bh = function (a) {
		a.preventDefault(), a8 && (aI = a.pageX - bf.offsetLeft - aT, aM = a.pageY - bf.offsetTop - aY)
	};
	var bj = function (a, b, c) {
		return Math.max(b, Math.min(c, a))
	};
	bv.addEventListener("mousewheel", function (a, b) {
		a.preventDefault(), 0 < b ? bw -= 2.75 * (null != window.opera ? -1 : 1) : b < 0 && (bw += 2.75 * (null != window.opera ? -1 : 1))
	}, !1), bf.addEventListener("mousedown", function (a) {
		a.preventDefault(), aT = a.pageX - bf.offsetLeft - a4, aY = a.pageY - bf.offsetTop - aM, a8 = !0, bh(a)
	}, !1), addEventListener("mouseup", function (a) {
		if (a.which != 4) {
			a.preventDefault()
		}
		a8 = !1
	}, !1), bf.addEventListener("mousemove", bh, !1), bf.addEventListener("mouseout", function () {
		!1
	}, !1), ax();
    var bk = new Image;
    bk.crossOrigin = "Anonymous";
    bk.setAttribute('crossOrigin', 'Anonymous');
	bk.onload = function () {
		ba.clearRect(0, 0, aL, aN), ba.drawImage(bk, 0, 0)
	};
    var bm = new Image;
    bm.crossOrigin = "Anonymous";
    bm.setAttribute('crossOrigin', 'Anonymous');
	bm.onload = function () {
		var b = bm.width;
		aN = (aL = b) / 2, aR = aL / 64, a7.width = aL, a7.height = aN, ba.clearRect(0, 0, aL, aN), ba.drawImage(bm, 0, 0);
		var f = ba.getImageData(0, 0, aL, aN),
			h = f.data;
		a0.clearRect(0, 0, aU.width, aU.height), a0.save();
		for (var i = !0, a = [40, 0], c = 4 * (a[0] + a[1] * aL), d = function (k, j) {
				return h[4 * (k + j * aL) + 0] !== h[c + 0] || h[4 * (k + j * aL) + 1] !== h[c + 1] || h[4 * (k + j * aL) + 2] !== h[c + 2] || h[4 * (k + j * aL) + 3] !== h[c + 3]
			}, e = aN; e < aL; e += 1) {
			for (var g = 8; g < 16; g += 1) {
				if (d(e, g)) {
					i = !1;
					break
				}
			}
			if (!i) {
				break
			}
		}
		if (!i) {
			for (e = 40; e < 56; e += 1) {
				for (g = 0; g < 8; g += 1) {
					if (d(e, g)) {
						i = !1;
						break
					}
				}
				if (!i) {
					break
				}
			}
		}
		for (e = 0; e < aL; e += 1) {
			for (g = 0; g < aN; g += 1) {
				i && (aN <= e && e < aL && 8 <= g && g < 16 || 40 <= e && e < 56 && 0 <= g && g < 8) && (h[4 * (e + g * aL) + 3] = 0), a0.fillStyle = "rgba(" + h[4 * (e + g * aL) + 0] + ", " + h[4 * (e + g * aL) + 1] + ", " + h[4 * (e + g * aL) + 2] + ", " + h[4 * (e + g * aL) + 3] / 255 + ")", a0.fillRect(8 * e, 8 * g, 8, 8)
			}
		}
		a0.restore(), ba.putImageData(f, 0, 0), bo.map.needsUpdate = !0, by.map.needsUpdate = !0
	};
	var aO = new Image;
	aO.onload = function () {
		var a = aO.width;
		aZ = (aV = a) / 2, a1 = aV / 64, at.width = aV, at.height = aZ, aw.clearRect(0, 0, aV, aZ), aw.drawImage(aO, 0, 0), bz.map.needsUpdate = !0, aE.visible = !0
	}, aO.onerror = function () {
		aE.visible = !1
	};
	var aS = function (a) {
			if (0 < a.length) {
				var b = a[0];
				if ("image/png" === b.type) {
					var c = new FileReader;
					c.onload = function () {
						var d = new Image;
						d.onload = function () {
							1 == document.getElementById("mod").value ? bm.src = d.src : aO.src = d.src
						}, d.onerror = function () {
							alert("Error: Not an image or unknown file format")
						}, d.src = this.result
					}, c.readAsDataURL(b)
				} else {
					alert("Error: This is not a PNG image!")
				}
			}
		},
		aW = document.getElementById("userfile");
	return bf.addEventListener("dragenter", function (a) {
		a.stopPropagation(), a.preventDefault(), bf.className = "dragenter"
	}, !1), bf.addEventListener("dragleave", function (a) {
		a.stopPropagation(), a.preventDefault(), bf.className = ""
	}, !1), bf.addEventListener("dragover", function (a) {
		a.stopPropagation(), a.preventDefault()
	}, !1), bf.addEventListener("drop", function (a) {
		a.stopPropagation(), a.preventDefault(), bf.className = "";
		var b = a.dataTransfer.files;
		userfiles && (aW.files = b), aS(b)
	}, !1), aW && aW.addEventListener("change", function () {
		var a = this.files;
		aS(a)
	}, !1), {
		setEars: function (a) {
			a ? (aF.add(bs), bu.visible = aA.visible = !0) : aF.remove(bs)
		},
		getBase64: function () {
			return be.domElement.toDataURL()
		},
		changeSkin: function (imageObject) {
			bm.src = imageObject.src;
			bm.crossOrigin = "Anonymous";
			bm.setAttribute('crossOrigin', 'Anonymous');
		},
		changeCape: function (a) {
            aO.src = a
            aO.crossOrigin = "Anonymous"; 
            aO.setAttribute('crossOrigin', 'Anonymous');
		},
		toggleCape: function (a) {
			bm ? (aB.remove(a), bm = !1) : (aB.add(a), bm = !0)
		},
		toggleCameraY: function () {
			bi = !bi
		}
	}
};