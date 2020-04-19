(window.__LOADABLE_LOADED_CHUNKS__ = window.__LOADABLE_LOADED_CHUNKS__ || []).push([[5], {
    206: function (e, t, r) {
    }, 213: function (e, t, r) {
        "use strict";
        r.r(t), r.d(t, "default", function () {
            return l
        });
        var b = r(0), y = r.n(b), p = y.a.createContext({}), O = function () {
            var e = Object(b.useContext)(p).username;
            return y.a.createElement("div", {className: "messages"}, y.a.createElement("h1", null, "Messages hahaha"), y.a.createElement("p", null, "1 message for ", e), y.a.createElement("p", {className: "message"}, "useContext is awesome!"))
        };

        function o(e, t) {
            return function (e) {
                if (Array.isArray(e)) return e
            }(e) || function (e, t) {
                if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e))) return;
                var r = [], n = !0, o = !1, u = void 0;
                try {
                    for (var a, c = e[Symbol.iterator](); !(n = (a = c.next()).done) && (r.push(a.value), !t || r.length !== t); n = !0) ;
                } catch (e) {
                    o = !0, u = e
                } finally {
                    try {
                        n || null == c.return || c.return()
                    } finally {
                        if (o) throw u
                    }
                }
                return r
            }(e, t) || function (e, t) {
                if (!e) return;
                if ("string" == typeof e) return n(e, t);
                var r = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === r && e.constructor && (r = e.constructor.name);
                if ("Map" === r || "Set" === r) return Array.from(r);
                if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return n(e, t)
            }(e, t) || function () {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }

        function n(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
            return n
        }

        var u = 0, d = function (e) {
            var t = o(Object(b.useState)(e), 2), r = t[0], n = t[1];
            return Object(b.useEffect)(function () {
                n("变化次数".concat(++u))
            }, [e]), y.a.createElement("p", null, r)
        };
        r(206);

        function v(e, t) {
            return function (e) {
                if (Array.isArray(e)) return e
            }(e) || function (e, t) {
                if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e))) return;
                var r = [], n = !0, o = !1, u = void 0;
                try {
                    for (var a, c = e[Symbol.iterator](); !(n = (a = c.next()).done) && (r.push(a.value), !t || r.length !== t); n = !0) ;
                } catch (e) {
                    o = !0, u = e
                } finally {
                    try {
                        n || null == c.return || c.return()
                    } finally {
                        if (o) throw u
                    }
                }
                return r
            }(e, t) || function (e, t) {
                if (!e) return;
                if ("string" == typeof e) return a(e, t);
                var r = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === r && e.constructor && (r = e.constructor.name);
                if ("Map" === r || "Set" === r) return Array.from(r);
                if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return a(e, t)
            }(e, t) || function () {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }

        function a(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
            return n
        }

        function c(t, e) {
            var r = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(t);
                e && (n = n.filter(function (e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable
                })), r.push.apply(r, n)
            }
            return r
        }

        function i(e, t, r) {
            return t in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r, e
        }

        var h = function (e, t) {
            switch (t.type) {
                case"countUp":
                    return function (t) {
                        for (var e = 1; e < arguments.length; e++) {
                            var r = null != arguments[e] ? arguments[e] : {};
                            e % 2 ? c(Object(r), !0).forEach(function (e) {
                                i(t, e, r[e])
                            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : c(Object(r)).forEach(function (e) {
                                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e))
                            })
                        }
                        return t
                    }({}, e, {num: e.num + 1});
                default:
                    return e
            }
        };

        function l() {
            var e = v(Object(b.useReducer)(h, {num: 0}), 2), t = e[0], r = e[1], n = v(Object(b.useState)(0), 2),
                o = n[0], u = n[1], a = v(Object(b.useState)("hahaha"), 2), c = a[0], i = a[1], l = Object(b.useRef)(o);
            Object(b.useEffect)(function () {
                l.current = o, setTimeout(function () {
                }, 2e3)
            }), Object(b.useEffect)(function () {
                return function () {
                    0
                }
            }, []);
            var f = v(Object(b.useState)(0), 2), s = f[0], m = f[1];
            return y.a.createElement(p.Provider, {value: {username: "superawesome"}}, y.a.createElement(O, null), y.a.createElement("p", {className: "p-text"}, "You clicked ", o, " times"), y.a.createElement("button", {
                onClick: function () {
                    return u(o + 1)
                }
            }, "点击我"), d(c), y.a.createElement("div", {
                onClick: function () {
                    return i(c + "wocao")
                }
            }, "点击我改变title"), y.a.createElement("p", null, "number：", s), y.a.createElement("div", {
                onClick: function () {
                    return r({type: "countUp"})
                }
            }, "useReducer ", t.num), y.a.createElement("button", {
                onClick: function () {
                    return m(s + 1)
                }
            }, "+"), y.a.createElement("button", {
                onClick: function () {
                    setTimeout(function () {
                        alert(s)
                    }, 3e3)
                }
            }, "打印目前的按钮状态"))
        }
    }
}]);
