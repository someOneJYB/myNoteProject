(window.__LOADABLE_LOADED_CHUNKS__ = window.__LOADABLE_LOADED_CHUNKS__ || []).push([[4], {
    200: function (t, e, n) {
    }, 209: function (t, e, n) {
        "use strict";
        n.r(e), n.d(e, "default", function () {
            return c
        });
        var r = n(0), o = n.n(r), u = n(56);
        n(200);

        function i(t, e) {
            return function (t) {
                if (Array.isArray(t)) return t
            }(t) || function (t, e) {
                if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t))) return;
                var n = [], r = !0, o = !1, u = void 0;
                try {
                    for (var i, a = t[Symbol.iterator](); !(r = (i = a.next()).done) && (n.push(i.value), !e || n.length !== e); r = !0) ;
                } catch (t) {
                    o = !0, u = t
                } finally {
                    try {
                        r || null == a.return || a.return()
                    } finally {
                        if (o) throw u
                    }
                }
                return n
            }(t, e) || function (t, e) {
                if (!t) return;
                if ("string" == typeof t) return a(t, e);
                var n = Object.prototype.toString.call(t).slice(8, -1);
                "Object" === n && t.constructor && (n = t.constructor.name);
                if ("Map" === n || "Set" === n) return Array.from(n);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return a(t, e)
            }(t, e) || function () {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }

        function a(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r
        }

        function c() {
            var t = i(Object(r.useState)({a: 0}), 2), e = t[0], n = t[1];
            return Object(r.useEffect)(function () {
                setTimeout(function () {
                }, 2e3)
            }, [e]), o.a.createElement("div", null, o.a.createElement("p", {className: "text"}, "You clicked ", e.a, " times"), o.a.createElement("button", {
                onClick: function () {
                    return n({a: e.a + 1})
                }
            }, "Click me"), o.a.createElement(u.a, {text: e.a}), o.a.createElement("div", {
                onClick: function () {
                    setTimeout(function () {
                    }, 2e3)
                }
            }, "count 值的变化"))
        }
    }, 56: function (t, e, n) {
        "use strict";
        n.d(e, "a", function () {
            return o
        });
        var r = n(0), u = n.n(r);

        function i(t) {
            return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            } : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function a(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }

        function c(t, e) {
            return (c = Object.setPrototypeOf || function (t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function l(u) {
            return function () {
                var t, e, n, r = f(u);
                if (function () {
                    if ("undefined" == typeof Reflect || !Reflect.construct) return;
                    if (Reflect.construct.sham) return;
                    if ("function" == typeof Proxy) return 1;
                    try {
                        return Date.prototype.toString.call(Reflect.construct(Date, [], function () {
                        })), 1
                    } catch (t) {
                        return
                    }
                }()) {
                    var o = f(this).constructor;
                    t = Reflect.construct(r, arguments, o)
                } else t = r.apply(this, arguments);
                return e = this, !(n = t) || "object" !== i(n) && "function" != typeof n ? function (t) {
                    if (void 0 !== t) return t;
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
                }(e) : n
            }
        }

        function f(t) {
            return (f = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }

        function o(t) {
            return u.a.createElement(s, t)
        }

        var s = function () {
            !function (t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        writable: !0,
                        configurable: !0
                    }
                }), e && c(t, e)
            }(o, u.a.Component);
            var t, e, n, r = l(o);

            function o(t) {
                var e;
                return function (t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, o), (e = r.call(this, t)).state = {a: 1, num: 0, val: 0}, e
            }

            return t = o, n = [{
                key: "getDerivedStateFromProps", value: function () {
                    return null
                }
            }], (e = [{
                key: "componentDidMount", value: function () {
                    var t = this;
                    this.setState({val: this.state.val + 1}), this.setState({val: this.state.val + 1}), setTimeout(function () {
                        t.setState({val: t.state.val + 1}), t.setState({val: t.state.val + 1})
                    }, 0)
                }
            }, {
                key: "componentWillUnmount", value: function () {
                }
            }, {
                key: "componentWillReceiveProps", value: function () {
                }
            }, {
                key: "shouldComponentUpdate", value: function () {
                    return !0
                }
            }, {
                key: "componentWillUpdate", value: function () {
                }
            }, {
                key: "componentDidUpdate", value: function (t) {
                    this.props.num !== t.num && this.setState({a: this.state.a + 1})
                }
            }, {
                key: "render", value: function () {
                    return u.a.createElement("h1", {onClick: this.click}, "hahaha", this.props.text)
                }
            }]) && a(t.prototype, e), n && a(t, n), o
        }()
    }
}]);
