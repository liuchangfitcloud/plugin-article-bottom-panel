function xn(e, t) {
  const n = /* @__PURE__ */ Object.create(null), r = e.split(",");
  for (let o = 0; o < r.length; o++)
    n[r[o]] = !0;
  return t ? (o) => !!n[o.toLowerCase()] : (o) => !!n[o];
}
const V = {}, et = [], xe = () => {
}, To = () => !1, Mo = /^on[^a-z]/, Jt = (e) => Mo.test(e), En = (e) => e.startsWith("onUpdate:"), ee = Object.assign, Cn = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Ao = Object.prototype.hasOwnProperty, j = (e, t) => Ao.call(e, t), T = Array.isArray, tt = (e) => zt(e) === "[object Map]", Ir = (e) => zt(e) === "[object Set]", N = (e) => typeof e == "function", te = (e) => typeof e == "string", On = (e) => typeof e == "symbol", $ = (e) => e !== null && typeof e == "object", Nr = (e) => $(e) && N(e.then) && N(e.catch), Sr = Object.prototype.toString, zt = (e) => Sr.call(e), Po = (e) => zt(e).slice(8, -1), Lr = (e) => zt(e) === "[object Object]", kn = (e) => te(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Nt = /* @__PURE__ */ xn(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Xt = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Io = /-(\w)/g, de = Xt((e) => e.replace(Io, (t, n) => n ? n.toUpperCase() : "")), No = /\B([A-Z])/g, we = Xt(
  (e) => e.replace(No, "-$1").toLowerCase()
), Vt = Xt(
  (e) => e.charAt(0).toUpperCase() + e.slice(1)
), en = Xt(
  (e) => e ? `on${Vt(e)}` : ""
), gt = (e, t) => !Object.is(e, t), tn = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, jt = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, So = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Gn = (e) => {
  const t = te(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let Zn;
const an = () => Zn || (Zn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Tn(e) {
  if (T(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], o = te(r) ? jo(r) : Tn(r);
      if (o)
        for (const i in o)
          t[i] = o[i];
    }
    return t;
  } else {
    if (te(e))
      return e;
    if ($(e))
      return e;
  }
}
const Lo = /;(?![^(]*\))/g, Ho = /:([^]+)/, Ro = /\/\*[^]*?\*\//g;
function jo(e) {
  const t = {};
  return e.replace(Ro, "").split(Lo).forEach((n) => {
    if (n) {
      const r = n.split(Ho);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function _t(e) {
  let t = "";
  if (te(e))
    t = e;
  else if (T(e))
    for (let n = 0; n < e.length; n++) {
      const r = _t(e[n]);
      r && (t += r + " ");
    }
  else if ($(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Do = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Uo = /* @__PURE__ */ xn(Do);
function Hr(e) {
  return !!e || e === "";
}
const Ot = (e) => te(e) ? e : e == null ? "" : T(e) || $(e) && (e.toString === Sr || !N(e.toString)) ? JSON.stringify(e, Rr, 2) : String(e), Rr = (e, t) => t && t.__v_isRef ? Rr(e, t.value) : tt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce((n, [r, o]) => (n[`${r} =>`] = o, n), {})
} : Ir(t) ? {
  [`Set(${t.size})`]: [...t.values()]
} : $(t) && !T(t) && !Lr(t) ? String(t) : t;
let _e;
class Fo {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = _e, !t && _e && (this.index = (_e.scopes || (_e.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = _e;
      try {
        return _e = this, t();
      } finally {
        _e = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    _e = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    _e = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++)
        this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++)
        this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++)
          this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop();
        o && o !== this && (this.parent.scopes[this.index] = o, o.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function Bo(e, t = _e) {
  t && t.active && t.effects.push(e);
}
function Jo() {
  return _e;
}
const Mn = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, jr = (e) => (e.w & Ue) > 0, Dr = (e) => (e.n & Ue) > 0, zo = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= Ue;
}, Xo = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let r = 0; r < t.length; r++) {
      const o = t[r];
      jr(o) && !Dr(o) ? o.delete(e) : t[n++] = o, o.w &= ~Ue, o.n &= ~Ue;
    }
    t.length = n;
  }
}, cn = /* @__PURE__ */ new WeakMap();
let pt = 0, Ue = 1;
const fn = 30;
let ye;
const We = Symbol(""), un = Symbol("");
class An {
  constructor(t, n = null, r) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Bo(this, r);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = ye, n = je;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = ye, ye = this, je = !0, Ue = 1 << ++pt, pt <= fn ? zo(this) : Qn(this), this.fn();
    } finally {
      pt <= fn && Xo(this), Ue = 1 << --pt, ye = this.parent, je = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    ye === this ? this.deferStop = !0 : this.active && (Qn(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Qn(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let je = !0;
const Ur = [];
function lt() {
  Ur.push(je), je = !1;
}
function at() {
  const e = Ur.pop();
  je = e === void 0 ? !0 : e;
}
function fe(e, t, n) {
  if (je && ye) {
    let r = cn.get(e);
    r || cn.set(e, r = /* @__PURE__ */ new Map());
    let o = r.get(n);
    o || r.set(n, o = Mn()), Fr(o);
  }
}
function Fr(e, t) {
  let n = !1;
  pt <= fn ? Dr(e) || (e.n |= Ue, n = !jr(e)) : n = !e.has(ye), n && (e.add(ye), ye.deps.push(e));
}
function Se(e, t, n, r, o, i) {
  const s = cn.get(e);
  if (!s)
    return;
  let l = [];
  if (t === "clear")
    l = [...s.values()];
  else if (n === "length" && T(e)) {
    const c = Number(r);
    s.forEach((u, d) => {
      (d === "length" || d >= c) && l.push(u);
    });
  } else
    switch (n !== void 0 && l.push(s.get(n)), t) {
      case "add":
        T(e) ? kn(n) && l.push(s.get("length")) : (l.push(s.get(We)), tt(e) && l.push(s.get(un)));
        break;
      case "delete":
        T(e) || (l.push(s.get(We)), tt(e) && l.push(s.get(un)));
        break;
      case "set":
        tt(e) && l.push(s.get(We));
        break;
    }
  if (l.length === 1)
    l[0] && pn(l[0]);
  else {
    const c = [];
    for (const u of l)
      u && c.push(...u);
    pn(Mn(c));
  }
}
function pn(e, t) {
  const n = T(e) ? e : [...e];
  for (const r of n)
    r.computed && er(r);
  for (const r of n)
    r.computed || er(r);
}
function er(e, t) {
  (e !== ye || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const Vo = /* @__PURE__ */ xn("__proto__,__v_isRef,__isVue"), Br = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(On)
), Wo = /* @__PURE__ */ Pn(), $o = /* @__PURE__ */ Pn(!1, !0), Yo = /* @__PURE__ */ Pn(!0), tr = /* @__PURE__ */ Ko();
function Ko() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const r = U(this);
      for (let i = 0, s = this.length; i < s; i++)
        fe(r, "get", i + "");
      const o = r[t](...n);
      return o === -1 || o === !1 ? r[t](...n.map(U)) : o;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      lt();
      const r = U(this)[t].apply(this, n);
      return at(), r;
    };
  }), e;
}
function qo(e) {
  const t = U(this);
  return fe(t, "has", e), t.hasOwnProperty(e);
}
function Pn(e = !1, t = !1) {
  return function(r, o, i) {
    if (o === "__v_isReactive")
      return !e;
    if (o === "__v_isReadonly")
      return e;
    if (o === "__v_isShallow")
      return t;
    if (o === "__v_raw" && i === (e ? t ? pi : Wr : t ? Vr : Xr).get(r))
      return r;
    const s = T(r);
    if (!e) {
      if (s && j(tr, o))
        return Reflect.get(tr, o, i);
      if (o === "hasOwnProperty")
        return qo;
    }
    const l = Reflect.get(r, o, i);
    return (On(o) ? Br.has(o) : Vo(o)) || (e || fe(r, "get", o), t) ? l : se(l) ? s && kn(o) ? l : l.value : $(l) ? e ? $r(l) : Sn(l) : l;
  };
}
const Go = /* @__PURE__ */ Jr(), Zo = /* @__PURE__ */ Jr(!0);
function Jr(e = !1) {
  return function(n, r, o, i) {
    let s = n[r];
    if (ot(s) && se(s) && !se(o))
      return !1;
    if (!e && (!Dt(o) && !ot(o) && (s = U(s), o = U(o)), !T(n) && se(s) && !se(o)))
      return s.value = o, !0;
    const l = T(n) && kn(r) ? Number(r) < n.length : j(n, r), c = Reflect.set(n, r, o, i);
    return n === U(i) && (l ? gt(o, s) && Se(n, "set", r, o) : Se(n, "add", r, o)), c;
  };
}
function Qo(e, t) {
  const n = j(e, t);
  e[t];
  const r = Reflect.deleteProperty(e, t);
  return r && n && Se(e, "delete", t, void 0), r;
}
function ei(e, t) {
  const n = Reflect.has(e, t);
  return (!On(t) || !Br.has(t)) && fe(e, "has", t), n;
}
function ti(e) {
  return fe(e, "iterate", T(e) ? "length" : We), Reflect.ownKeys(e);
}
const zr = {
  get: Wo,
  set: Go,
  deleteProperty: Qo,
  has: ei,
  ownKeys: ti
}, ni = {
  get: Yo,
  set(e, t) {
    return !0;
  },
  deleteProperty(e, t) {
    return !0;
  }
}, ri = /* @__PURE__ */ ee(
  {},
  zr,
  {
    get: $o,
    set: Zo
  }
), In = (e) => e, Wt = (e) => Reflect.getPrototypeOf(e);
function kt(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const o = U(e), i = U(t);
  n || (t !== i && fe(o, "get", t), fe(o, "get", i));
  const { has: s } = Wt(o), l = r ? In : n ? Hn : bt;
  if (s.call(o, t))
    return l(e.get(t));
  if (s.call(o, i))
    return l(e.get(i));
  e !== o && e.get(t);
}
function Tt(e, t = !1) {
  const n = this.__v_raw, r = U(n), o = U(e);
  return t || (e !== o && fe(r, "has", e), fe(r, "has", o)), e === o ? n.has(e) : n.has(e) || n.has(o);
}
function Mt(e, t = !1) {
  return e = e.__v_raw, !t && fe(U(e), "iterate", We), Reflect.get(e, "size", e);
}
function nr(e) {
  e = U(e);
  const t = U(this);
  return Wt(t).has.call(t, e) || (t.add(e), Se(t, "add", e, e)), this;
}
function rr(e, t) {
  t = U(t);
  const n = U(this), { has: r, get: o } = Wt(n);
  let i = r.call(n, e);
  i || (e = U(e), i = r.call(n, e));
  const s = o.call(n, e);
  return n.set(e, t), i ? gt(t, s) && Se(n, "set", e, t) : Se(n, "add", e, t), this;
}
function or(e) {
  const t = U(this), { has: n, get: r } = Wt(t);
  let o = n.call(t, e);
  o || (e = U(e), o = n.call(t, e)), r && r.call(t, e);
  const i = t.delete(e);
  return o && Se(t, "delete", e, void 0), i;
}
function ir() {
  const e = U(this), t = e.size !== 0, n = e.clear();
  return t && Se(e, "clear", void 0, void 0), n;
}
function At(e, t) {
  return function(r, o) {
    const i = this, s = i.__v_raw, l = U(s), c = t ? In : e ? Hn : bt;
    return !e && fe(l, "iterate", We), s.forEach((u, d) => r.call(o, c(u), c(d), i));
  };
}
function Pt(e, t, n) {
  return function(...r) {
    const o = this.__v_raw, i = U(o), s = tt(i), l = e === "entries" || e === Symbol.iterator && s, c = e === "keys" && s, u = o[e](...r), d = n ? In : t ? Hn : bt;
    return !t && fe(
      i,
      "iterate",
      c ? un : We
    ), {
      // iterator protocol
      next() {
        const { value: y, done: b } = u.next();
        return b ? { value: y, done: b } : {
          value: l ? [d(y[0]), d(y[1])] : d(y),
          done: b
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function He(e) {
  return function(...t) {
    return e === "delete" ? !1 : this;
  };
}
function oi() {
  const e = {
    get(i) {
      return kt(this, i);
    },
    get size() {
      return Mt(this);
    },
    has: Tt,
    add: nr,
    set: rr,
    delete: or,
    clear: ir,
    forEach: At(!1, !1)
  }, t = {
    get(i) {
      return kt(this, i, !1, !0);
    },
    get size() {
      return Mt(this);
    },
    has: Tt,
    add: nr,
    set: rr,
    delete: or,
    clear: ir,
    forEach: At(!1, !0)
  }, n = {
    get(i) {
      return kt(this, i, !0);
    },
    get size() {
      return Mt(this, !0);
    },
    has(i) {
      return Tt.call(this, i, !0);
    },
    add: He("add"),
    set: He("set"),
    delete: He("delete"),
    clear: He("clear"),
    forEach: At(!0, !1)
  }, r = {
    get(i) {
      return kt(this, i, !0, !0);
    },
    get size() {
      return Mt(this, !0);
    },
    has(i) {
      return Tt.call(this, i, !0);
    },
    add: He("add"),
    set: He("set"),
    delete: He("delete"),
    clear: He("clear"),
    forEach: At(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
    e[i] = Pt(
      i,
      !1,
      !1
    ), n[i] = Pt(
      i,
      !0,
      !1
    ), t[i] = Pt(
      i,
      !1,
      !0
    ), r[i] = Pt(
      i,
      !0,
      !0
    );
  }), [
    e,
    n,
    t,
    r
  ];
}
const [
  ii,
  si,
  li,
  ai
] = /* @__PURE__ */ oi();
function Nn(e, t) {
  const n = t ? e ? ai : li : e ? si : ii;
  return (r, o, i) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(
    j(n, o) && o in r ? n : r,
    o,
    i
  );
}
const ci = {
  get: /* @__PURE__ */ Nn(!1, !1)
}, fi = {
  get: /* @__PURE__ */ Nn(!1, !0)
}, ui = {
  get: /* @__PURE__ */ Nn(!0, !1)
}, Xr = /* @__PURE__ */ new WeakMap(), Vr = /* @__PURE__ */ new WeakMap(), Wr = /* @__PURE__ */ new WeakMap(), pi = /* @__PURE__ */ new WeakMap();
function di(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function hi(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : di(Po(e));
}
function Sn(e) {
  return ot(e) ? e : Ln(
    e,
    !1,
    zr,
    ci,
    Xr
  );
}
function mi(e) {
  return Ln(
    e,
    !1,
    ri,
    fi,
    Vr
  );
}
function $r(e) {
  return Ln(
    e,
    !0,
    ni,
    ui,
    Wr
  );
}
function Ln(e, t, n, r, o) {
  if (!$(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const i = o.get(e);
  if (i)
    return i;
  const s = hi(e);
  if (s === 0)
    return e;
  const l = new Proxy(
    e,
    s === 2 ? r : n
  );
  return o.set(e, l), l;
}
function nt(e) {
  return ot(e) ? nt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function ot(e) {
  return !!(e && e.__v_isReadonly);
}
function Dt(e) {
  return !!(e && e.__v_isShallow);
}
function Yr(e) {
  return nt(e) || ot(e);
}
function U(e) {
  const t = e && e.__v_raw;
  return t ? U(t) : e;
}
function Kr(e) {
  return jt(e, "__v_skip", !0), e;
}
const bt = (e) => $(e) ? Sn(e) : e, Hn = (e) => $(e) ? $r(e) : e;
function qr(e) {
  je && ye && (e = U(e), Fr(e.dep || (e.dep = Mn())));
}
function Gr(e, t) {
  e = U(e);
  const n = e.dep;
  n && pn(n);
}
function se(e) {
  return !!(e && e.__v_isRef === !0);
}
function sr(e) {
  return gi(e, !1);
}
function gi(e, t) {
  return se(e) ? e : new _i(e, t);
}
class _i {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : U(t), this._value = n ? t : bt(t);
  }
  get value() {
    return qr(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Dt(t) || ot(t);
    t = n ? t : U(t), gt(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : bt(t), Gr(this));
  }
}
function bi(e) {
  return se(e) ? e.value : e;
}
const wi = {
  get: (e, t, n) => bi(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return se(o) && !se(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function Zr(e) {
  return nt(e) ? e : new Proxy(e, wi);
}
class yi {
  constructor(t, n, r, o) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new An(t, () => {
      this._dirty || (this._dirty = !0, Gr(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !o, this.__v_isReadonly = r;
  }
  get value() {
    const t = U(this);
    return qr(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
function vi(e, t, n = !1) {
  let r, o;
  const i = N(e);
  return i ? (r = e, o = xe) : (r = e.get, o = e.set), new yi(r, o, i || !o, n);
}
function De(e, t, n, r) {
  let o;
  try {
    o = r ? e(...r) : e();
  } catch (i) {
    $t(i, t, n);
  }
  return o;
}
function Ee(e, t, n, r) {
  if (N(e)) {
    const i = De(e, t, n, r);
    return i && Nr(i) && i.catch((s) => {
      $t(s, t, n);
    }), i;
  }
  const o = [];
  for (let i = 0; i < e.length; i++)
    o.push(Ee(e[i], t, n, r));
  return o;
}
function $t(e, t, n, r = !0) {
  const o = t ? t.vnode : null;
  if (t) {
    let i = t.parent;
    const s = t.proxy, l = n;
    for (; i; ) {
      const u = i.ec;
      if (u) {
        for (let d = 0; d < u.length; d++)
          if (u[d](e, s, l) === !1)
            return;
      }
      i = i.parent;
    }
    const c = t.appContext.config.errorHandler;
    if (c) {
      De(
        c,
        null,
        10,
        [e, s, l]
      );
      return;
    }
  }
  xi(e, n, o, r);
}
function xi(e, t, n, r = !0) {
  console.error(e);
}
let wt = !1, dn = !1;
const ie = [];
let Ae = 0;
const rt = [];
let Ie = null, Xe = 0;
const Qr = /* @__PURE__ */ Promise.resolve();
let Rn = null;
function eo(e) {
  const t = Rn || Qr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ei(e) {
  let t = Ae + 1, n = ie.length;
  for (; t < n; ) {
    const r = t + n >>> 1;
    yt(ie[r]) < e ? t = r + 1 : n = r;
  }
  return t;
}
function jn(e) {
  (!ie.length || !ie.includes(
    e,
    wt && e.allowRecurse ? Ae + 1 : Ae
  )) && (e.id == null ? ie.push(e) : ie.splice(Ei(e.id), 0, e), to());
}
function to() {
  !wt && !dn && (dn = !0, Rn = Qr.then(ro));
}
function Ci(e) {
  const t = ie.indexOf(e);
  t > Ae && ie.splice(t, 1);
}
function Oi(e) {
  T(e) ? rt.push(...e) : (!Ie || !Ie.includes(
    e,
    e.allowRecurse ? Xe + 1 : Xe
  )) && rt.push(e), to();
}
function lr(e, t = wt ? Ae + 1 : 0) {
  for (; t < ie.length; t++) {
    const n = ie[t];
    n && n.pre && (ie.splice(t, 1), t--, n());
  }
}
function no(e) {
  if (rt.length) {
    const t = [...new Set(rt)];
    if (rt.length = 0, Ie) {
      Ie.push(...t);
      return;
    }
    for (Ie = t, Ie.sort((n, r) => yt(n) - yt(r)), Xe = 0; Xe < Ie.length; Xe++)
      Ie[Xe]();
    Ie = null, Xe = 0;
  }
}
const yt = (e) => e.id == null ? 1 / 0 : e.id, ki = (e, t) => {
  const n = yt(e) - yt(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function ro(e) {
  dn = !1, wt = !0, ie.sort(ki);
  const t = xe;
  try {
    for (Ae = 0; Ae < ie.length; Ae++) {
      const n = ie[Ae];
      n && n.active !== !1 && De(n, null, 14);
    }
  } finally {
    Ae = 0, ie.length = 0, no(), wt = !1, Rn = null, (ie.length || rt.length) && ro();
  }
}
function Ti(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const r = e.vnode.props || V;
  let o = n;
  const i = t.startsWith("update:"), s = i && t.slice(7);
  if (s && s in r) {
    const d = `${s === "modelValue" ? "model" : s}Modifiers`, { number: y, trim: b } = r[d] || V;
    b && (o = n.map((C) => te(C) ? C.trim() : C)), y && (o = n.map(So));
  }
  let l, c = r[l = en(t)] || // also try camelCase event handler (#2249)
  r[l = en(de(t))];
  !c && i && (c = r[l = en(we(t))]), c && Ee(
    c,
    e,
    6,
    o
  );
  const u = r[l + "Once"];
  if (u) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, Ee(
      u,
      e,
      6,
      o
    );
  }
}
function oo(e, t, n = !1) {
  const r = t.emitsCache, o = r.get(e);
  if (o !== void 0)
    return o;
  const i = e.emits;
  let s = {}, l = !1;
  if (!N(e)) {
    const c = (u) => {
      const d = oo(u, t, !0);
      d && (l = !0, ee(s, d));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !i && !l ? ($(e) && r.set(e, null), null) : (T(i) ? i.forEach((c) => s[c] = null) : ee(s, i), $(e) && r.set(e, s), s);
}
function Yt(e, t) {
  return !e || !Jt(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), j(e, t[0].toLowerCase() + t.slice(1)) || j(e, we(t)) || j(e, t));
}
let me = null, io = null;
function Ut(e) {
  const t = me;
  return me = e, io = e && e.type.__scopeId || null, t;
}
function Mi(e, t = me, n) {
  if (!t || e._n)
    return e;
  const r = (...o) => {
    r._d && br(-1);
    const i = Ut(t);
    let s;
    try {
      s = e(...o);
    } finally {
      Ut(i), r._d && br(1);
    }
    return s;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function nn(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: o,
    props: i,
    propsOptions: [s],
    slots: l,
    attrs: c,
    emit: u,
    render: d,
    renderCache: y,
    data: b,
    setupState: C,
    ctx: H,
    inheritAttrs: S
  } = e;
  let Y, q;
  const G = Ut(e);
  try {
    if (n.shapeFlag & 4) {
      const P = o || r;
      Y = Me(
        d.call(
          P,
          P,
          y,
          i,
          C,
          b,
          H
        )
      ), q = c;
    } else {
      const P = t;
      Y = Me(
        P.length > 1 ? P(
          i,
          { attrs: c, slots: l, emit: u }
        ) : P(
          i,
          null
          /* we know it doesn't need it */
        )
      ), q = t.props ? c : Ai(c);
    }
  } catch (P) {
    mt.length = 0, $t(P, e, 1), Y = Ce(Ye);
  }
  let Z = Y;
  if (q && S !== !1) {
    const P = Object.keys(q), { shapeFlag: he } = Z;
    P.length && he & 7 && (s && P.some(En) && (q = Pi(
      q,
      s
    )), Z = it(Z, q));
  }
  return n.dirs && (Z = it(Z), Z.dirs = Z.dirs ? Z.dirs.concat(n.dirs) : n.dirs), n.transition && (Z.transition = n.transition), Y = Z, Ut(G), Y;
}
const Ai = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Jt(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Pi = (e, t) => {
  const n = {};
  for (const r in e)
    (!En(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
};
function Ii(e, t, n) {
  const { props: r, children: o, component: i } = e, { props: s, children: l, patchFlag: c } = t, u = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return r ? ar(r, s, u) : !!s;
    if (c & 8) {
      const d = t.dynamicProps;
      for (let y = 0; y < d.length; y++) {
        const b = d[y];
        if (s[b] !== r[b] && !Yt(u, b))
          return !0;
      }
    }
  } else
    return (o || l) && (!l || !l.$stable) ? !0 : r === s ? !1 : r ? s ? ar(r, s, u) : !0 : !!s;
  return !1;
}
function ar(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < r.length; o++) {
    const i = r[o];
    if (t[i] !== e[i] && !Yt(n, i))
      return !0;
  }
  return !1;
}
function Ni({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; )
    (e = t.vnode).el = n, t = t.parent;
}
const Si = (e) => e.__isSuspense;
function Li(e, t) {
  t && t.pendingBranch ? T(e) ? t.effects.push(...e) : t.effects.push(e) : Oi(e);
}
function Hi(e, t) {
  return Dn(
    e,
    null,
    { flush: "post" }
  );
}
const It = {};
function rn(e, t, n) {
  return Dn(e, t, n);
}
function Dn(e, t, { immediate: n, deep: r, flush: o, onTrack: i, onTrigger: s } = V) {
  var l;
  const c = Jo() === ((l = re) == null ? void 0 : l.scope) ? re : null;
  let u, d = !1, y = !1;
  if (se(e) ? (u = () => e.value, d = Dt(e)) : nt(e) ? (u = () => e, r = !0) : T(e) ? (y = !0, d = e.some((P) => nt(P) || Dt(P)), u = () => e.map((P) => {
    if (se(P))
      return P.value;
    if (nt(P))
      return Qe(P);
    if (N(P))
      return De(P, c, 2);
  })) : N(e) ? t ? u = () => De(e, c, 2) : u = () => {
    if (!(c && c.isUnmounted))
      return b && b(), Ee(
        e,
        c,
        3,
        [C]
      );
  } : u = xe, t && r) {
    const P = u;
    u = () => Qe(P());
  }
  let b, C = (P) => {
    b = G.onStop = () => {
      De(P, c, 4);
    };
  }, H;
  if (xt)
    if (C = xe, t ? n && Ee(t, c, 3, [
      u(),
      y ? [] : void 0,
      C
    ]) : u(), o === "sync") {
      const P = Hs();
      H = P.__watcherHandles || (P.__watcherHandles = []);
    } else
      return xe;
  let S = y ? new Array(e.length).fill(It) : It;
  const Y = () => {
    if (G.active)
      if (t) {
        const P = G.run();
        (r || d || (y ? P.some(
          (he, B) => gt(he, S[B])
        ) : gt(P, S))) && (b && b(), Ee(t, c, 3, [
          P,
          // pass undefined as the old value when it's changed for the first time
          S === It ? void 0 : y && S[0] === It ? [] : S,
          C
        ]), S = P);
      } else
        G.run();
  };
  Y.allowRecurse = !!t;
  let q;
  o === "sync" ? q = Y : o === "post" ? q = () => ce(Y, c && c.suspense) : (Y.pre = !0, c && (Y.id = c.uid), q = () => jn(Y));
  const G = new An(u, q);
  t ? n ? Y() : S = G.run() : o === "post" ? ce(
    G.run.bind(G),
    c && c.suspense
  ) : G.run();
  const Z = () => {
    G.stop(), c && c.scope && Cn(c.scope.effects, G);
  };
  return H && H.push(Z), Z;
}
function Ri(e, t, n) {
  const r = this.proxy, o = te(e) ? e.includes(".") ? so(r, e) : () => r[e] : e.bind(r, r);
  let i;
  N(t) ? i = t : (i = t.handler, n = t);
  const s = re;
  st(this);
  const l = Dn(o, i.bind(r), n);
  return s ? st(s) : $e(), l;
}
function so(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++)
      r = r[n[o]];
    return r;
  };
}
function Qe(e, t) {
  if (!$(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), se(e))
    Qe(e.value, t);
  else if (T(e))
    for (let n = 0; n < e.length; n++)
      Qe(e[n], t);
  else if (Ir(e) || tt(e))
    e.forEach((n) => {
      Qe(n, t);
    });
  else if (Lr(e))
    for (const n in e)
      Qe(e[n], t);
  return e;
}
function Je(e, t, n, r) {
  const o = e.dirs, i = t && t.dirs;
  for (let s = 0; s < o.length; s++) {
    const l = o[s];
    i && (l.oldValue = i[s].value);
    let c = l.dir[r];
    c && (lt(), Ee(c, n, 8, [
      e.el,
      l,
      e,
      t
    ]), at());
  }
}
function lo(e, t) {
  return N(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => ee({ name: e.name }, t, { setup: e }))()
  ) : e;
}
const St = (e) => !!e.type.__asyncLoader, ao = (e) => e.type.__isKeepAlive;
function ji(e, t) {
  co(e, "a", t);
}
function Di(e, t) {
  co(e, "da", t);
}
function co(e, t, n = re) {
  const r = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (Kt(t, r, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      ao(o.parent.vnode) && Ui(r, t, n, o), o = o.parent;
  }
}
function Ui(e, t, n, r) {
  const o = Kt(
    t,
    e,
    r,
    !0
    /* prepend */
  );
  Un(() => {
    Cn(r[t], o);
  }, n);
}
function Kt(e, t, n = re, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...s) => {
      if (n.isUnmounted)
        return;
      lt(), st(n);
      const l = Ee(t, n, e, s);
      return $e(), at(), l;
    });
    return r ? o.unshift(i) : o.push(i), i;
  }
}
const Le = (e) => (t, n = re) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!xt || e === "sp") && Kt(e, (...r) => t(...r), n)
), Fi = Le("bm"), fo = Le("m"), Bi = Le("bu"), Ji = Le("u"), zi = Le("bum"), Un = Le("um"), Xi = Le("sp"), Vi = Le(
  "rtg"
), Wi = Le(
  "rtc"
);
function $i(e, t = re) {
  Kt("ec", e, t);
}
const uo = "components";
function Yi(e, t) {
  return qi(uo, e, !0, t) || e;
}
const Ki = Symbol.for("v-ndc");
function qi(e, t, n = !0, r = !1) {
  const o = me || re;
  if (o) {
    const i = o.type;
    if (e === uo) {
      const l = Is(
        i,
        !1
        /* do not include inferred name to avoid breaking existing code */
      );
      if (l && (l === t || l === de(t) || l === Vt(de(t))))
        return i;
    }
    const s = (
      // local registration
      // check instance[type] first which is resolved for options API
      cr(o[e] || i[e], t) || // global registration
      cr(o.appContext[e], t)
    );
    return !s && r ? i : s;
  }
}
function cr(e, t) {
  return e && (e[t] || e[de(t)] || e[Vt(de(t))]);
}
function Gi(e, t, n, r) {
  let o;
  const i = n && n[r];
  if (T(e) || te(e)) {
    o = new Array(e.length);
    for (let s = 0, l = e.length; s < l; s++)
      o[s] = t(e[s], s, void 0, i && i[s]);
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let s = 0; s < e; s++)
      o[s] = t(s + 1, s, void 0, i && i[s]);
  } else if ($(e))
    if (e[Symbol.iterator])
      o = Array.from(
        e,
        (s, l) => t(s, l, void 0, i && i[l])
      );
    else {
      const s = Object.keys(e);
      o = new Array(s.length);
      for (let l = 0, c = s.length; l < c; l++) {
        const u = s[l];
        o[l] = t(e[u], u, l, i && i[l]);
      }
    }
  else
    o = [];
  return n && (n[r] = o), o;
}
const hn = (e) => e ? Eo(e) ? Xn(e) || e.proxy : hn(e.parent) : null, ht = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ ee(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => hn(e.parent),
    $root: (e) => hn(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Fn(e),
    $forceUpdate: (e) => e.f || (e.f = () => jn(e.update)),
    $nextTick: (e) => e.n || (e.n = eo.bind(e.proxy)),
    $watch: (e) => Ri.bind(e)
  })
), on = (e, t) => e !== V && !e.__isScriptSetup && j(e, t), Zi = {
  get({ _: e }, t) {
    const { ctx: n, setupState: r, data: o, props: i, accessCache: s, type: l, appContext: c } = e;
    let u;
    if (t[0] !== "$") {
      const C = s[t];
      if (C !== void 0)
        switch (C) {
          case 1:
            return r[t];
          case 2:
            return o[t];
          case 4:
            return n[t];
          case 3:
            return i[t];
        }
      else {
        if (on(r, t))
          return s[t] = 1, r[t];
        if (o !== V && j(o, t))
          return s[t] = 2, o[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = e.propsOptions[0]) && j(u, t)
        )
          return s[t] = 3, i[t];
        if (n !== V && j(n, t))
          return s[t] = 4, n[t];
        mn && (s[t] = 0);
      }
    }
    const d = ht[t];
    let y, b;
    if (d)
      return t === "$attrs" && fe(e, "get", t), d(e);
    if (
      // css module (injected by vue-loader)
      (y = l.__cssModules) && (y = y[t])
    )
      return y;
    if (n !== V && j(n, t))
      return s[t] = 4, n[t];
    if (
      // global properties
      b = c.config.globalProperties, j(b, t)
    )
      return b[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: o, ctx: i } = e;
    return on(o, t) ? (o[t] = n, !0) : r !== V && j(r, t) ? (r[t] = n, !0) : j(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, propsOptions: i }
  }, s) {
    let l;
    return !!n[s] || e !== V && j(e, s) || on(t, s) || (l = i[0]) && j(l, s) || j(r, s) || j(ht, s) || j(o.config.globalProperties, s);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : j(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function fr(e) {
  return T(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let mn = !0;
function Qi(e) {
  const t = Fn(e), n = e.proxy, r = e.ctx;
  mn = !1, t.beforeCreate && ur(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: i,
    methods: s,
    watch: l,
    provide: c,
    inject: u,
    // lifecycle
    created: d,
    beforeMount: y,
    mounted: b,
    beforeUpdate: C,
    updated: H,
    activated: S,
    deactivated: Y,
    beforeDestroy: q,
    beforeUnmount: G,
    destroyed: Z,
    unmounted: P,
    render: he,
    renderTracked: B,
    renderTriggered: X,
    errorCaptured: I,
    serverPrefetch: L,
    // public API
    expose: M,
    inheritAttrs: le,
    // assets
    components: oe,
    directives: ue,
    filters: ne
  } = t;
  if (u && es(u, r, null), s)
    for (const K in s) {
      const J = s[K];
      N(J) && (r[K] = J.bind(n));
    }
  if (o) {
    const K = o.call(n, n);
    $(K) && (e.data = Sn(K));
  }
  if (mn = !0, i)
    for (const K in i) {
      const J = i[K], Fe = N(J) ? J.bind(n, n) : N(J.get) ? J.get.bind(n, n) : xe, Et = !N(J) && N(J.set) ? J.set.bind(n) : xe, Be = Ss({
        get: Fe,
        set: Et
      });
      Object.defineProperty(r, K, {
        enumerable: !0,
        configurable: !0,
        get: () => Be.value,
        set: (Oe) => Be.value = Oe
      });
    }
  if (l)
    for (const K in l)
      po(l[K], r, n, K);
  if (c) {
    const K = N(c) ? c.call(n) : c;
    Reflect.ownKeys(K).forEach((J) => {
      ss(J, K[J]);
    });
  }
  d && ur(d, e, "c");
  function W(K, J) {
    T(J) ? J.forEach((Fe) => K(Fe.bind(n))) : J && K(J.bind(n));
  }
  if (W(Fi, y), W(fo, b), W(Bi, C), W(Ji, H), W(ji, S), W(Di, Y), W($i, I), W(Wi, B), W(Vi, X), W(zi, G), W(Un, P), W(Xi, L), T(M))
    if (M.length) {
      const K = e.exposed || (e.exposed = {});
      M.forEach((J) => {
        Object.defineProperty(K, J, {
          get: () => n[J],
          set: (Fe) => n[J] = Fe
        });
      });
    } else
      e.exposed || (e.exposed = {});
  he && e.render === xe && (e.render = he), le != null && (e.inheritAttrs = le), oe && (e.components = oe), ue && (e.directives = ue);
}
function es(e, t, n = xe) {
  T(e) && (e = gn(e));
  for (const r in e) {
    const o = e[r];
    let i;
    $(o) ? "default" in o ? i = Lt(
      o.from || r,
      o.default,
      !0
      /* treat default function as factory */
    ) : i = Lt(o.from || r) : i = Lt(o), se(i) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (s) => i.value = s
    }) : t[r] = i;
  }
}
function ur(e, t, n) {
  Ee(
    T(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function po(e, t, n, r) {
  const o = r.includes(".") ? so(n, r) : () => n[r];
  if (te(e)) {
    const i = t[e];
    N(i) && rn(o, i);
  } else if (N(e))
    rn(o, e.bind(n));
  else if ($(e))
    if (T(e))
      e.forEach((i) => po(i, t, n, r));
    else {
      const i = N(e.handler) ? e.handler.bind(n) : t[e.handler];
      N(i) && rn(o, i, e);
    }
}
function Fn(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: o,
    optionsCache: i,
    config: { optionMergeStrategies: s }
  } = e.appContext, l = i.get(t);
  let c;
  return l ? c = l : !o.length && !n && !r ? c = t : (c = {}, o.length && o.forEach(
    (u) => Ft(c, u, s, !0)
  ), Ft(c, t, s)), $(t) && i.set(t, c), c;
}
function Ft(e, t, n, r = !1) {
  const { mixins: o, extends: i } = t;
  i && Ft(e, i, n, !0), o && o.forEach(
    (s) => Ft(e, s, n, !0)
  );
  for (const s in t)
    if (!(r && s === "expose")) {
      const l = ts[s] || n && n[s];
      e[s] = l ? l(e[s], t[s]) : t[s];
    }
  return e;
}
const ts = {
  data: pr,
  props: dr,
  emits: dr,
  // objects
  methods: dt,
  computed: dt,
  // lifecycle
  beforeCreate: ae,
  created: ae,
  beforeMount: ae,
  mounted: ae,
  beforeUpdate: ae,
  updated: ae,
  beforeDestroy: ae,
  beforeUnmount: ae,
  destroyed: ae,
  unmounted: ae,
  activated: ae,
  deactivated: ae,
  errorCaptured: ae,
  serverPrefetch: ae,
  // assets
  components: dt,
  directives: dt,
  // watch
  watch: rs,
  // provide / inject
  provide: pr,
  inject: ns
};
function pr(e, t) {
  return t ? e ? function() {
    return ee(
      N(e) ? e.call(this, this) : e,
      N(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function ns(e, t) {
  return dt(gn(e), gn(t));
}
function gn(e) {
  if (T(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function ae(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function dt(e, t) {
  return e ? ee(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function dr(e, t) {
  return e ? T(e) && T(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ee(
    /* @__PURE__ */ Object.create(null),
    fr(e),
    fr(t ?? {})
  ) : t;
}
function rs(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = ee(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = ae(e[r], t[r]);
  return n;
}
function ho() {
  return {
    app: null,
    config: {
      isNativeTag: To,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let os = 0;
function is(e, t) {
  return function(r, o = null) {
    N(r) || (r = ee({}, r)), o != null && !$(o) && (o = null);
    const i = ho(), s = /* @__PURE__ */ new Set();
    let l = !1;
    const c = i.app = {
      _uid: os++,
      _component: r,
      _props: o,
      _container: null,
      _context: i,
      _instance: null,
      version: Rs,
      get config() {
        return i.config;
      },
      set config(u) {
      },
      use(u, ...d) {
        return s.has(u) || (u && N(u.install) ? (s.add(u), u.install(c, ...d)) : N(u) && (s.add(u), u(c, ...d))), c;
      },
      mixin(u) {
        return i.mixins.includes(u) || i.mixins.push(u), c;
      },
      component(u, d) {
        return d ? (i.components[u] = d, c) : i.components[u];
      },
      directive(u, d) {
        return d ? (i.directives[u] = d, c) : i.directives[u];
      },
      mount(u, d, y) {
        if (!l) {
          const b = Ce(
            r,
            o
          );
          return b.appContext = i, d && t ? t(b, u) : e(b, u, y), l = !0, c._container = u, u.__vue_app__ = c, Xn(b.component) || b.component.proxy;
        }
      },
      unmount() {
        l && (e(null, c._container), delete c._container.__vue_app__);
      },
      provide(u, d) {
        return i.provides[u] = d, c;
      },
      runWithContext(u) {
        Bt = c;
        try {
          return u();
        } finally {
          Bt = null;
        }
      }
    };
    return c;
  };
}
let Bt = null;
function ss(e, t) {
  if (re) {
    let n = re.provides;
    const r = re.parent && re.parent.provides;
    r === n && (n = re.provides = Object.create(r)), n[e] = t;
  }
}
function Lt(e, t, n = !1) {
  const r = re || me;
  if (r || Bt) {
    const o = r ? r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : Bt._context.provides;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && N(t) ? t.call(r && r.proxy) : t;
  }
}
function ls(e, t, n, r = !1) {
  const o = {}, i = {};
  jt(i, Gt, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), mo(e, t, o, i);
  for (const s in e.propsOptions[0])
    s in o || (o[s] = void 0);
  n ? e.props = r ? o : mi(o) : e.type.props ? e.props = o : e.props = i, e.attrs = i;
}
function as(e, t, n, r) {
  const {
    props: o,
    attrs: i,
    vnode: { patchFlag: s }
  } = e, l = U(o), [c] = e.propsOptions;
  let u = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (r || s > 0) && !(s & 16)
  ) {
    if (s & 8) {
      const d = e.vnode.dynamicProps;
      for (let y = 0; y < d.length; y++) {
        let b = d[y];
        if (Yt(e.emitsOptions, b))
          continue;
        const C = t[b];
        if (c)
          if (j(i, b))
            C !== i[b] && (i[b] = C, u = !0);
          else {
            const H = de(b);
            o[H] = _n(
              c,
              l,
              H,
              C,
              e,
              !1
              /* isAbsent */
            );
          }
        else
          C !== i[b] && (i[b] = C, u = !0);
      }
    }
  } else {
    mo(e, t, o, i) && (u = !0);
    let d;
    for (const y in l)
      (!t || // for camelCase
      !j(t, y) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((d = we(y)) === y || !j(t, d))) && (c ? n && // for camelCase
      (n[y] !== void 0 || // for kebab-case
      n[d] !== void 0) && (o[y] = _n(
        c,
        l,
        y,
        void 0,
        e,
        !0
        /* isAbsent */
      )) : delete o[y]);
    if (i !== l)
      for (const y in i)
        (!t || !j(t, y)) && (delete i[y], u = !0);
  }
  u && Se(e, "set", "$attrs");
}
function mo(e, t, n, r) {
  const [o, i] = e.propsOptions;
  let s = !1, l;
  if (t)
    for (let c in t) {
      if (Nt(c))
        continue;
      const u = t[c];
      let d;
      o && j(o, d = de(c)) ? !i || !i.includes(d) ? n[d] = u : (l || (l = {}))[d] = u : Yt(e.emitsOptions, c) || (!(c in r) || u !== r[c]) && (r[c] = u, s = !0);
    }
  if (i) {
    const c = U(n), u = l || V;
    for (let d = 0; d < i.length; d++) {
      const y = i[d];
      n[y] = _n(
        o,
        c,
        y,
        u[y],
        e,
        !j(u, y)
      );
    }
  }
  return s;
}
function _n(e, t, n, r, o, i) {
  const s = e[n];
  if (s != null) {
    const l = j(s, "default");
    if (l && r === void 0) {
      const c = s.default;
      if (s.type !== Function && !s.skipFactory && N(c)) {
        const { propsDefaults: u } = o;
        n in u ? r = u[n] : (st(o), r = u[n] = c.call(
          null,
          t
        ), $e());
      } else
        r = c;
    }
    s[
      0
      /* shouldCast */
    ] && (i && !l ? r = !1 : s[
      1
      /* shouldCastTrue */
    ] && (r === "" || r === we(n)) && (r = !0));
  }
  return r;
}
function go(e, t, n = !1) {
  const r = t.propsCache, o = r.get(e);
  if (o)
    return o;
  const i = e.props, s = {}, l = [];
  let c = !1;
  if (!N(e)) {
    const d = (y) => {
      c = !0;
      const [b, C] = go(y, t, !0);
      ee(s, b), C && l.push(...C);
    };
    !n && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  if (!i && !c)
    return $(e) && r.set(e, et), et;
  if (T(i))
    for (let d = 0; d < i.length; d++) {
      const y = de(i[d]);
      hr(y) && (s[y] = V);
    }
  else if (i)
    for (const d in i) {
      const y = de(d);
      if (hr(y)) {
        const b = i[d], C = s[y] = T(b) || N(b) ? { type: b } : ee({}, b);
        if (C) {
          const H = _r(Boolean, C.type), S = _r(String, C.type);
          C[
            0
            /* shouldCast */
          ] = H > -1, C[
            1
            /* shouldCastTrue */
          ] = S < 0 || H < S, (H > -1 || j(C, "default")) && l.push(y);
        }
      }
    }
  const u = [s, l];
  return $(e) && r.set(e, u), u;
}
function hr(e) {
  return e[0] !== "$";
}
function mr(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function gr(e, t) {
  return mr(e) === mr(t);
}
function _r(e, t) {
  return T(t) ? t.findIndex((n) => gr(n, e)) : N(t) && gr(t, e) ? 0 : -1;
}
const _o = (e) => e[0] === "_" || e === "$stable", Bn = (e) => T(e) ? e.map(Me) : [Me(e)], cs = (e, t, n) => {
  if (t._n)
    return t;
  const r = Mi((...o) => Bn(t(...o)), n);
  return r._c = !1, r;
}, bo = (e, t, n) => {
  const r = e._ctx;
  for (const o in e) {
    if (_o(o))
      continue;
    const i = e[o];
    if (N(i))
      t[o] = cs(o, i, r);
    else if (i != null) {
      const s = Bn(i);
      t[o] = () => s;
    }
  }
}, wo = (e, t) => {
  const n = Bn(t);
  e.slots.default = () => n;
}, fs = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = U(t), jt(t, "_", n)) : bo(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && wo(e, t);
  jt(e.slots, Gt, 1);
}, us = (e, t, n) => {
  const { vnode: r, slots: o } = e;
  let i = !0, s = V;
  if (r.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? i = !1 : (ee(o, t), !n && l === 1 && delete o._) : (i = !t.$stable, bo(t, o)), s = t;
  } else
    t && (wo(e, t), s = { default: 1 });
  if (i)
    for (const l in o)
      !_o(l) && !(l in s) && delete o[l];
};
function bn(e, t, n, r, o = !1) {
  if (T(e)) {
    e.forEach(
      (b, C) => bn(
        b,
        t && (T(t) ? t[C] : t),
        n,
        r,
        o
      )
    );
    return;
  }
  if (St(r) && !o)
    return;
  const i = r.shapeFlag & 4 ? Xn(r.component) || r.component.proxy : r.el, s = o ? null : i, { i: l, r: c } = e, u = t && t.r, d = l.refs === V ? l.refs = {} : l.refs, y = l.setupState;
  if (u != null && u !== c && (te(u) ? (d[u] = null, j(y, u) && (y[u] = null)) : se(u) && (u.value = null)), N(c))
    De(c, l, 12, [s, d]);
  else {
    const b = te(c), C = se(c);
    if (b || C) {
      const H = () => {
        if (e.f) {
          const S = b ? j(y, c) ? y[c] : d[c] : c.value;
          o ? T(S) && Cn(S, i) : T(S) ? S.includes(i) || S.push(i) : b ? (d[c] = [i], j(y, c) && (y[c] = d[c])) : (c.value = [i], e.k && (d[e.k] = c.value));
        } else
          b ? (d[c] = s, j(y, c) && (y[c] = s)) : C && (c.value = s, e.k && (d[e.k] = s));
      };
      s ? (H.id = -1, ce(H, n)) : H();
    }
  }
}
const ce = Li;
function ps(e) {
  return ds(e);
}
function ds(e, t) {
  const n = an();
  n.__VUE__ = !0;
  const {
    insert: r,
    remove: o,
    patchProp: i,
    createElement: s,
    createText: l,
    createComment: c,
    setText: u,
    setElementText: d,
    parentNode: y,
    nextSibling: b,
    setScopeId: C = xe,
    insertStaticContent: H
  } = e, S = (a, f, p, m = null, h = null, w = null, x = !1, _ = null, v = !!f.dynamicChildren) => {
    if (a === f)
      return;
    a && !ut(a, f) && (m = Ct(a), Oe(a, h, w, !0), a = null), f.patchFlag === -2 && (v = !1, f.dynamicChildren = null);
    const { type: g, ref: O, shapeFlag: E } = f;
    switch (g) {
      case qt:
        Y(a, f, p, m);
        break;
      case Ye:
        q(a, f, p, m);
        break;
      case Ht:
        a == null && G(f, p, m, x);
        break;
      case be:
        oe(
          a,
          f,
          p,
          m,
          h,
          w,
          x,
          _,
          v
        );
        break;
      default:
        E & 1 ? he(
          a,
          f,
          p,
          m,
          h,
          w,
          x,
          _,
          v
        ) : E & 6 ? ue(
          a,
          f,
          p,
          m,
          h,
          w,
          x,
          _,
          v
        ) : (E & 64 || E & 128) && g.process(
          a,
          f,
          p,
          m,
          h,
          w,
          x,
          _,
          v,
          Ke
        );
    }
    O != null && h && bn(O, a && a.ref, w, f || a, !f);
  }, Y = (a, f, p, m) => {
    if (a == null)
      r(
        f.el = l(f.children),
        p,
        m
      );
    else {
      const h = f.el = a.el;
      f.children !== a.children && u(h, f.children);
    }
  }, q = (a, f, p, m) => {
    a == null ? r(
      f.el = c(f.children || ""),
      p,
      m
    ) : f.el = a.el;
  }, G = (a, f, p, m) => {
    [a.el, a.anchor] = H(
      a.children,
      f,
      p,
      m,
      a.el,
      a.anchor
    );
  }, Z = ({ el: a, anchor: f }, p, m) => {
    let h;
    for (; a && a !== f; )
      h = b(a), r(a, p, m), a = h;
    r(f, p, m);
  }, P = ({ el: a, anchor: f }) => {
    let p;
    for (; a && a !== f; )
      p = b(a), o(a), a = p;
    o(f);
  }, he = (a, f, p, m, h, w, x, _, v) => {
    x = x || f.type === "svg", a == null ? B(
      f,
      p,
      m,
      h,
      w,
      x,
      _,
      v
    ) : L(
      a,
      f,
      h,
      w,
      x,
      _,
      v
    );
  }, B = (a, f, p, m, h, w, x, _) => {
    let v, g;
    const { type: O, props: E, shapeFlag: k, transition: A, dirs: R } = a;
    if (v = a.el = s(
      a.type,
      w,
      E && E.is,
      E
    ), k & 8 ? d(v, a.children) : k & 16 && I(
      a.children,
      v,
      null,
      m,
      h,
      w && O !== "foreignObject",
      x,
      _
    ), R && Je(a, null, m, "created"), X(v, a, a.scopeId, x, m), E) {
      for (const F in E)
        F !== "value" && !Nt(F) && i(
          v,
          F,
          null,
          E[F],
          w,
          a.children,
          m,
          h,
          Pe
        );
      "value" in E && i(v, "value", null, E.value), (g = E.onVnodeBeforeMount) && Te(g, m, a);
    }
    R && Je(a, null, m, "beforeMount");
    const z = (!h || h && !h.pendingBranch) && A && !A.persisted;
    z && A.beforeEnter(v), r(v, f, p), ((g = E && E.onVnodeMounted) || z || R) && ce(() => {
      g && Te(g, m, a), z && A.enter(v), R && Je(a, null, m, "mounted");
    }, h);
  }, X = (a, f, p, m, h) => {
    if (p && C(a, p), m)
      for (let w = 0; w < m.length; w++)
        C(a, m[w]);
    if (h) {
      let w = h.subTree;
      if (f === w) {
        const x = h.vnode;
        X(
          a,
          x,
          x.scopeId,
          x.slotScopeIds,
          h.parent
        );
      }
    }
  }, I = (a, f, p, m, h, w, x, _, v = 0) => {
    for (let g = v; g < a.length; g++) {
      const O = a[g] = _ ? Re(a[g]) : Me(a[g]);
      S(
        null,
        O,
        f,
        p,
        m,
        h,
        w,
        x,
        _
      );
    }
  }, L = (a, f, p, m, h, w, x) => {
    const _ = f.el = a.el;
    let { patchFlag: v, dynamicChildren: g, dirs: O } = f;
    v |= a.patchFlag & 16;
    const E = a.props || V, k = f.props || V;
    let A;
    p && ze(p, !1), (A = k.onVnodeBeforeUpdate) && Te(A, p, f, a), O && Je(f, a, p, "beforeUpdate"), p && ze(p, !0);
    const R = h && f.type !== "foreignObject";
    if (g ? M(
      a.dynamicChildren,
      g,
      _,
      p,
      m,
      R,
      w
    ) : x || J(
      a,
      f,
      _,
      null,
      p,
      m,
      R,
      w,
      !1
    ), v > 0) {
      if (v & 16)
        le(
          _,
          f,
          E,
          k,
          p,
          m,
          h
        );
      else if (v & 2 && E.class !== k.class && i(_, "class", null, k.class, h), v & 4 && i(_, "style", E.style, k.style, h), v & 8) {
        const z = f.dynamicProps;
        for (let F = 0; F < z.length; F++) {
          const Q = z[F], ge = E[Q], qe = k[Q];
          (qe !== ge || Q === "value") && i(
            _,
            Q,
            ge,
            qe,
            h,
            a.children,
            p,
            m,
            Pe
          );
        }
      }
      v & 1 && a.children !== f.children && d(_, f.children);
    } else
      !x && g == null && le(
        _,
        f,
        E,
        k,
        p,
        m,
        h
      );
    ((A = k.onVnodeUpdated) || O) && ce(() => {
      A && Te(A, p, f, a), O && Je(f, a, p, "updated");
    }, m);
  }, M = (a, f, p, m, h, w, x) => {
    for (let _ = 0; _ < f.length; _++) {
      const v = a[_], g = f[_], O = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        v.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (v.type === be || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !ut(v, g) || // - In the case of a component, it could contain anything.
        v.shapeFlag & 70) ? y(v.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          p
        )
      );
      S(
        v,
        g,
        O,
        null,
        m,
        h,
        w,
        x,
        !0
      );
    }
  }, le = (a, f, p, m, h, w, x) => {
    if (p !== m) {
      if (p !== V)
        for (const _ in p)
          !Nt(_) && !(_ in m) && i(
            a,
            _,
            p[_],
            null,
            x,
            f.children,
            h,
            w,
            Pe
          );
      for (const _ in m) {
        if (Nt(_))
          continue;
        const v = m[_], g = p[_];
        v !== g && _ !== "value" && i(
          a,
          _,
          g,
          v,
          x,
          f.children,
          h,
          w,
          Pe
        );
      }
      "value" in m && i(a, "value", p.value, m.value);
    }
  }, oe = (a, f, p, m, h, w, x, _, v) => {
    const g = f.el = a ? a.el : l(""), O = f.anchor = a ? a.anchor : l("");
    let { patchFlag: E, dynamicChildren: k, slotScopeIds: A } = f;
    A && (_ = _ ? _.concat(A) : A), a == null ? (r(g, p, m), r(O, p, m), I(
      f.children,
      p,
      O,
      h,
      w,
      x,
      _,
      v
    )) : E > 0 && E & 64 && k && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    a.dynamicChildren ? (M(
      a.dynamicChildren,
      k,
      p,
      h,
      w,
      x,
      _
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (f.key != null || h && f === h.subTree) && yo(
      a,
      f,
      !0
      /* shallow */
    )) : J(
      a,
      f,
      p,
      O,
      h,
      w,
      x,
      _,
      v
    );
  }, ue = (a, f, p, m, h, w, x, _, v) => {
    f.slotScopeIds = _, a == null ? f.shapeFlag & 512 ? h.ctx.activate(
      f,
      p,
      m,
      x,
      v
    ) : ne(
      f,
      p,
      m,
      h,
      w,
      x,
      v
    ) : D(a, f, v);
  }, ne = (a, f, p, m, h, w, x) => {
    const _ = a.component = Os(
      a,
      m,
      h
    );
    if (ao(a) && (_.ctx.renderer = Ke), Ts(_), _.asyncDep) {
      if (h && h.registerDep(_, W), !a.el) {
        const v = _.subTree = Ce(Ye);
        q(null, v, f, p);
      }
      return;
    }
    W(
      _,
      a,
      f,
      p,
      h,
      w,
      x
    );
  }, D = (a, f, p) => {
    const m = f.component = a.component;
    if (Ii(a, f, p))
      if (m.asyncDep && !m.asyncResolved) {
        K(m, f, p);
        return;
      } else
        m.next = f, Ci(m.update), m.update();
    else
      f.el = a.el, m.vnode = f;
  }, W = (a, f, p, m, h, w, x) => {
    const _ = () => {
      if (a.isMounted) {
        let { next: O, bu: E, u: k, parent: A, vnode: R } = a, z = O, F;
        ze(a, !1), O ? (O.el = R.el, K(a, O, x)) : O = R, E && tn(E), (F = O.props && O.props.onVnodeBeforeUpdate) && Te(F, A, O, R), ze(a, !0);
        const Q = nn(a), ge = a.subTree;
        a.subTree = Q, S(
          ge,
          Q,
          // parent may have changed if it's in a teleport
          y(ge.el),
          // anchor may have changed if it's in a fragment
          Ct(ge),
          a,
          h,
          w
        ), O.el = Q.el, z === null && Ni(a, Q.el), k && ce(k, h), (F = O.props && O.props.onVnodeUpdated) && ce(
          () => Te(F, A, O, R),
          h
        );
      } else {
        let O;
        const { el: E, props: k } = f, { bm: A, m: R, parent: z } = a, F = St(f);
        if (ze(a, !1), A && tn(A), !F && (O = k && k.onVnodeBeforeMount) && Te(O, z, f), ze(a, !0), E && Qt) {
          const Q = () => {
            a.subTree = nn(a), Qt(
              E,
              a.subTree,
              a,
              h,
              null
            );
          };
          F ? f.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !a.isUnmounted && Q()
          ) : Q();
        } else {
          const Q = a.subTree = nn(a);
          S(
            null,
            Q,
            p,
            m,
            a,
            h,
            w
          ), f.el = Q.el;
        }
        if (R && ce(R, h), !F && (O = k && k.onVnodeMounted)) {
          const Q = f;
          ce(
            () => Te(O, z, Q),
            h
          );
        }
        (f.shapeFlag & 256 || z && St(z.vnode) && z.vnode.shapeFlag & 256) && a.a && ce(a.a, h), a.isMounted = !0, f = p = m = null;
      }
    }, v = a.effect = new An(
      _,
      () => jn(g),
      a.scope
      // track it in component's effect scope
    ), g = a.update = () => v.run();
    g.id = a.uid, ze(a, !0), g();
  }, K = (a, f, p) => {
    f.component = a;
    const m = a.vnode.props;
    a.vnode = f, a.next = null, as(a, f.props, m, p), us(a, f.children, p), lt(), lr(), at();
  }, J = (a, f, p, m, h, w, x, _, v = !1) => {
    const g = a && a.children, O = a ? a.shapeFlag : 0, E = f.children, { patchFlag: k, shapeFlag: A } = f;
    if (k > 0) {
      if (k & 128) {
        Et(
          g,
          E,
          p,
          m,
          h,
          w,
          x,
          _,
          v
        );
        return;
      } else if (k & 256) {
        Fe(
          g,
          E,
          p,
          m,
          h,
          w,
          x,
          _,
          v
        );
        return;
      }
    }
    A & 8 ? (O & 16 && Pe(g, h, w), E !== g && d(p, E)) : O & 16 ? A & 16 ? Et(
      g,
      E,
      p,
      m,
      h,
      w,
      x,
      _,
      v
    ) : Pe(g, h, w, !0) : (O & 8 && d(p, ""), A & 16 && I(
      E,
      p,
      m,
      h,
      w,
      x,
      _,
      v
    ));
  }, Fe = (a, f, p, m, h, w, x, _, v) => {
    a = a || et, f = f || et;
    const g = a.length, O = f.length, E = Math.min(g, O);
    let k;
    for (k = 0; k < E; k++) {
      const A = f[k] = v ? Re(f[k]) : Me(f[k]);
      S(
        a[k],
        A,
        p,
        null,
        h,
        w,
        x,
        _,
        v
      );
    }
    g > O ? Pe(
      a,
      h,
      w,
      !0,
      !1,
      E
    ) : I(
      f,
      p,
      m,
      h,
      w,
      x,
      _,
      v,
      E
    );
  }, Et = (a, f, p, m, h, w, x, _, v) => {
    let g = 0;
    const O = f.length;
    let E = a.length - 1, k = O - 1;
    for (; g <= E && g <= k; ) {
      const A = a[g], R = f[g] = v ? Re(f[g]) : Me(f[g]);
      if (ut(A, R))
        S(
          A,
          R,
          p,
          null,
          h,
          w,
          x,
          _,
          v
        );
      else
        break;
      g++;
    }
    for (; g <= E && g <= k; ) {
      const A = a[E], R = f[k] = v ? Re(f[k]) : Me(f[k]);
      if (ut(A, R))
        S(
          A,
          R,
          p,
          null,
          h,
          w,
          x,
          _,
          v
        );
      else
        break;
      E--, k--;
    }
    if (g > E) {
      if (g <= k) {
        const A = k + 1, R = A < O ? f[A].el : m;
        for (; g <= k; )
          S(
            null,
            f[g] = v ? Re(f[g]) : Me(f[g]),
            p,
            R,
            h,
            w,
            x,
            _,
            v
          ), g++;
      }
    } else if (g > k)
      for (; g <= E; )
        Oe(a[g], h, w, !0), g++;
    else {
      const A = g, R = g, z = /* @__PURE__ */ new Map();
      for (g = R; g <= k; g++) {
        const pe = f[g] = v ? Re(f[g]) : Me(f[g]);
        pe.key != null && z.set(pe.key, g);
      }
      let F, Q = 0;
      const ge = k - R + 1;
      let qe = !1, Yn = 0;
      const ct = new Array(ge);
      for (g = 0; g < ge; g++)
        ct[g] = 0;
      for (g = A; g <= E; g++) {
        const pe = a[g];
        if (Q >= ge) {
          Oe(pe, h, w, !0);
          continue;
        }
        let ke;
        if (pe.key != null)
          ke = z.get(pe.key);
        else
          for (F = R; F <= k; F++)
            if (ct[F - R] === 0 && ut(pe, f[F])) {
              ke = F;
              break;
            }
        ke === void 0 ? Oe(pe, h, w, !0) : (ct[ke - R] = g + 1, ke >= Yn ? Yn = ke : qe = !0, S(
          pe,
          f[ke],
          p,
          null,
          h,
          w,
          x,
          _,
          v
        ), Q++);
      }
      const Kn = qe ? hs(ct) : et;
      for (F = Kn.length - 1, g = ge - 1; g >= 0; g--) {
        const pe = R + g, ke = f[pe], qn = pe + 1 < O ? f[pe + 1].el : m;
        ct[g] === 0 ? S(
          null,
          ke,
          p,
          qn,
          h,
          w,
          x,
          _,
          v
        ) : qe && (F < 0 || g !== Kn[F] ? Be(ke, p, qn, 2) : F--);
      }
    }
  }, Be = (a, f, p, m, h = null) => {
    const { el: w, type: x, transition: _, children: v, shapeFlag: g } = a;
    if (g & 6) {
      Be(a.component.subTree, f, p, m);
      return;
    }
    if (g & 128) {
      a.suspense.move(f, p, m);
      return;
    }
    if (g & 64) {
      x.move(a, f, p, Ke);
      return;
    }
    if (x === be) {
      r(w, f, p);
      for (let E = 0; E < v.length; E++)
        Be(v[E], f, p, m);
      r(a.anchor, f, p);
      return;
    }
    if (x === Ht) {
      Z(a, f, p);
      return;
    }
    if (m !== 2 && g & 1 && _)
      if (m === 0)
        _.beforeEnter(w), r(w, f, p), ce(() => _.enter(w), h);
      else {
        const { leave: E, delayLeave: k, afterLeave: A } = _, R = () => r(w, f, p), z = () => {
          E(w, () => {
            R(), A && A();
          });
        };
        k ? k(w, R, z) : z();
      }
    else
      r(w, f, p);
  }, Oe = (a, f, p, m = !1, h = !1) => {
    const {
      type: w,
      props: x,
      ref: _,
      children: v,
      dynamicChildren: g,
      shapeFlag: O,
      patchFlag: E,
      dirs: k
    } = a;
    if (_ != null && bn(_, null, p, a, !0), O & 256) {
      f.ctx.deactivate(a);
      return;
    }
    const A = O & 1 && k, R = !St(a);
    let z;
    if (R && (z = x && x.onVnodeBeforeUnmount) && Te(z, f, a), O & 6)
      ko(a.component, p, m);
    else {
      if (O & 128) {
        a.suspense.unmount(p, m);
        return;
      }
      A && Je(a, null, f, "beforeUnmount"), O & 64 ? a.type.remove(
        a,
        f,
        p,
        h,
        Ke,
        m
      ) : g && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (w !== be || E > 0 && E & 64) ? Pe(
        g,
        f,
        p,
        !1,
        !0
      ) : (w === be && E & 384 || !h && O & 16) && Pe(v, f, p), m && Wn(a);
    }
    (R && (z = x && x.onVnodeUnmounted) || A) && ce(() => {
      z && Te(z, f, a), A && Je(a, null, f, "unmounted");
    }, p);
  }, Wn = (a) => {
    const { type: f, el: p, anchor: m, transition: h } = a;
    if (f === be) {
      Oo(p, m);
      return;
    }
    if (f === Ht) {
      P(a);
      return;
    }
    const w = () => {
      o(p), h && !h.persisted && h.afterLeave && h.afterLeave();
    };
    if (a.shapeFlag & 1 && h && !h.persisted) {
      const { leave: x, delayLeave: _ } = h, v = () => x(p, w);
      _ ? _(a.el, w, v) : v();
    } else
      w();
  }, Oo = (a, f) => {
    let p;
    for (; a !== f; )
      p = b(a), o(a), a = p;
    o(f);
  }, ko = (a, f, p) => {
    const { bum: m, scope: h, update: w, subTree: x, um: _ } = a;
    m && tn(m), h.stop(), w && (w.active = !1, Oe(x, a, f, p)), _ && ce(_, f), ce(() => {
      a.isUnmounted = !0;
    }, f), f && f.pendingBranch && !f.isUnmounted && a.asyncDep && !a.asyncResolved && a.suspenseId === f.pendingId && (f.deps--, f.deps === 0 && f.resolve());
  }, Pe = (a, f, p, m = !1, h = !1, w = 0) => {
    for (let x = w; x < a.length; x++)
      Oe(a[x], f, p, m, h);
  }, Ct = (a) => a.shapeFlag & 6 ? Ct(a.component.subTree) : a.shapeFlag & 128 ? a.suspense.next() : b(a.anchor || a.el), $n = (a, f, p) => {
    a == null ? f._vnode && Oe(f._vnode, null, null, !0) : S(f._vnode || null, a, f, null, null, null, p), lr(), no(), f._vnode = a;
  }, Ke = {
    p: S,
    um: Oe,
    m: Be,
    r: Wn,
    mt: ne,
    mc: I,
    pc: J,
    pbc: M,
    n: Ct,
    o: e
  };
  let Zt, Qt;
  return t && ([Zt, Qt] = t(
    Ke
  )), {
    render: $n,
    hydrate: Zt,
    createApp: is($n, Zt)
  };
}
function ze({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function yo(e, t, n = !1) {
  const r = e.children, o = t.children;
  if (T(r) && T(o))
    for (let i = 0; i < r.length; i++) {
      const s = r[i];
      let l = o[i];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = o[i] = Re(o[i]), l.el = s.el), n || yo(s, l)), l.type === qt && (l.el = s.el);
    }
}
function hs(e) {
  const t = e.slice(), n = [0];
  let r, o, i, s, l;
  const c = e.length;
  for (r = 0; r < c; r++) {
    const u = e[r];
    if (u !== 0) {
      if (o = n[n.length - 1], e[o] < u) {
        t[r] = o, n.push(r);
        continue;
      }
      for (i = 0, s = n.length - 1; i < s; )
        l = i + s >> 1, e[n[l]] < u ? i = l + 1 : s = l;
      u < e[n[i]] && (i > 0 && (t[r] = n[i - 1]), n[i] = r);
    }
  }
  for (i = n.length, s = n[i - 1]; i-- > 0; )
    n[i] = s, s = t[s];
  return n;
}
const ms = (e) => e.__isTeleport, be = Symbol.for("v-fgt"), qt = Symbol.for("v-txt"), Ye = Symbol.for("v-cmt"), Ht = Symbol.for("v-stc"), mt = [];
let ve = null;
function Ze(e = !1) {
  mt.push(ve = e ? null : []);
}
function gs() {
  mt.pop(), ve = mt[mt.length - 1] || null;
}
let vt = 1;
function br(e) {
  vt += e;
}
function vo(e) {
  return e.dynamicChildren = vt > 0 ? ve || et : null, gs(), vt > 0 && ve && ve.push(e), e;
}
function ft(e, t, n, r, o, i) {
  return vo(
    Ne(
      e,
      t,
      n,
      r,
      o,
      i,
      !0
      /* isBlock */
    )
  );
}
function _s(e, t, n, r, o) {
  return vo(
    Ce(
      e,
      t,
      n,
      r,
      o,
      !0
      /* isBlock: prevent a block from tracking itself */
    )
  );
}
function bs(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function ut(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Gt = "__vInternal", xo = ({ key: e }) => e ?? null, Rt = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? te(e) || se(e) || N(e) ? { i: me, r: e, k: t, f: !!n } : e : null);
function Ne(e, t = null, n = null, r = 0, o = null, i = e === be ? 0 : 1, s = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && xo(t),
    ref: t && Rt(t),
    scopeId: io,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: r,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: me
  };
  return l ? (Jn(c, n), i & 128 && e.normalize(c)) : n && (c.shapeFlag |= te(n) ? 8 : 16), vt > 0 && // avoid a block node from tracking itself
  !s && // has current parent block
  ve && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && ve.push(c), c;
}
const Ce = ws;
function ws(e, t = null, n = null, r = 0, o = null, i = !1) {
  if ((!e || e === Ki) && (e = Ye), bs(e)) {
    const l = it(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Jn(l, n), vt > 0 && !i && ve && (l.shapeFlag & 6 ? ve[ve.indexOf(e)] = l : ve.push(l)), l.patchFlag |= -2, l;
  }
  if (Ns(e) && (e = e.__vccOpts), t) {
    t = ys(t);
    let { class: l, style: c } = t;
    l && !te(l) && (t.class = _t(l)), $(c) && (Yr(c) && !T(c) && (c = ee({}, c)), t.style = Tn(c));
  }
  const s = te(e) ? 1 : Si(e) ? 128 : ms(e) ? 64 : $(e) ? 4 : N(e) ? 2 : 0;
  return Ne(
    e,
    t,
    n,
    r,
    o,
    s,
    i,
    !0
  );
}
function ys(e) {
  return e ? Yr(e) || Gt in e ? ee({}, e) : e : null;
}
function it(e, t, n = !1) {
  const { props: r, ref: o, patchFlag: i, children: s } = e, l = t ? xs(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && xo(l),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? T(o) ? o.concat(Rt(t)) : [o, Rt(t)] : Rt(t)
    ) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: s,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== be ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && it(e.ssContent),
    ssFallback: e.ssFallback && it(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function vs(e = " ", t = 0) {
  return Ce(qt, null, e, t);
}
function wr(e = "", t = !1) {
  return t ? (Ze(), _s(Ye, null, e)) : Ce(Ye, null, e);
}
function Me(e) {
  return e == null || typeof e == "boolean" ? Ce(Ye) : T(e) ? Ce(
    be,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? Re(e) : Ce(qt, null, String(e));
}
function Re(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : it(e);
}
function Jn(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (T(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Jn(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !(Gt in t) ? t._ctx = me : o === 3 && me && (me.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    N(t) ? (t = { default: t, _ctx: me }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [vs(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function xs(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = _t([t.class, r.class]));
      else if (o === "style")
        t.style = Tn([t.style, r.style]);
      else if (Jt(o)) {
        const i = t[o], s = r[o];
        s && i !== s && !(T(i) && i.includes(s)) && (t[o] = i ? [].concat(i, s) : s);
      } else
        o !== "" && (t[o] = r[o]);
  }
  return t;
}
function Te(e, t, n, r = null) {
  Ee(e, t, 7, [
    n,
    r
  ]);
}
const Es = ho();
let Cs = 0;
function Os(e, t, n) {
  const r = e.type, o = (t ? t.appContext : e.appContext) || Es, i = {
    uid: Cs++,
    vnode: e,
    type: r,
    parent: t,
    appContext: o,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new Fo(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(o.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: go(r, o),
    emitsOptions: oo(r, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: V,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: V,
    data: V,
    props: V,
    attrs: V,
    slots: V,
    refs: V,
    setupState: V,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = Ti.bind(null, i), e.ce && e.ce(i), i;
}
let re = null;
const ks = () => re || me;
let zn, Ge, yr = "__VUE_INSTANCE_SETTERS__";
(Ge = an()[yr]) || (Ge = an()[yr] = []), Ge.push((e) => re = e), zn = (e) => {
  Ge.length > 1 ? Ge.forEach((t) => t(e)) : Ge[0](e);
};
const st = (e) => {
  zn(e), e.scope.on();
}, $e = () => {
  re && re.scope.off(), zn(null);
};
function Eo(e) {
  return e.vnode.shapeFlag & 4;
}
let xt = !1;
function Ts(e, t = !1) {
  xt = t;
  const { props: n, children: r } = e.vnode, o = Eo(e);
  ls(e, n, o, t), fs(e, r);
  const i = o ? Ms(e, t) : void 0;
  return xt = !1, i;
}
function Ms(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = Kr(new Proxy(e.ctx, Zi));
  const { setup: r } = n;
  if (r) {
    const o = e.setupContext = r.length > 1 ? Ps(e) : null;
    st(e), lt();
    const i = De(
      r,
      e,
      0,
      [e.props, o]
    );
    if (at(), $e(), Nr(i)) {
      if (i.then($e, $e), t)
        return i.then((s) => {
          vr(e, s, t);
        }).catch((s) => {
          $t(s, e, 0);
        });
      e.asyncDep = i;
    } else
      vr(e, i, t);
  } else
    Co(e, t);
}
function vr(e, t, n) {
  N(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : $(t) && (e.setupState = Zr(t)), Co(e, n);
}
let xr;
function Co(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && xr && !r.render) {
      const o = r.template || Fn(e).template;
      if (o) {
        const { isCustomElement: i, compilerOptions: s } = e.appContext.config, { delimiters: l, compilerOptions: c } = r, u = ee(
          ee(
            {
              isCustomElement: i,
              delimiters: l
            },
            s
          ),
          c
        );
        r.render = xr(o, u);
      }
    }
    e.render = r.render || xe;
  }
  st(e), lt(), Qi(e), at(), $e();
}
function As(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(
    e.attrs,
    {
      get(t, n) {
        return fe(e, "get", "$attrs"), t[n];
      }
    }
  ));
}
function Ps(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return As(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Xn(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Zr(Kr(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in ht)
          return ht[n](e);
      },
      has(t, n) {
        return n in t || n in ht;
      }
    }));
}
function Is(e, t = !0) {
  return N(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Ns(e) {
  return N(e) && "__vccOpts" in e;
}
const Ss = (e, t) => vi(e, t, xt), Ls = Symbol.for("v-scx"), Hs = () => Lt(Ls), Rs = "3.3.4", js = "http://www.w3.org/2000/svg", Ve = typeof document < "u" ? document : null, Er = Ve && /* @__PURE__ */ Ve.createElement("template"), Ds = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const o = t ? Ve.createElementNS(js, e) : Ve.createElement(e, n ? { is: n } : void 0);
    return e === "select" && r && r.multiple != null && o.setAttribute("multiple", r.multiple), o;
  },
  createText: (e) => Ve.createTextNode(e),
  createComment: (e) => Ve.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Ve.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, r, o, i) {
    const s = n ? n.previousSibling : t.lastChild;
    if (o && (o === i || o.nextSibling))
      for (; t.insertBefore(o.cloneNode(!0), n), !(o === i || !(o = o.nextSibling)); )
        ;
    else {
      Er.innerHTML = r ? `<svg>${e}</svg>` : e;
      const l = Er.content;
      if (r) {
        const c = l.firstChild;
        for (; c.firstChild; )
          l.appendChild(c.firstChild);
        l.removeChild(c);
      }
      t.insertBefore(l, n);
    }
    return [
      // first
      s ? s.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
};
function Us(e, t, n) {
  const r = e._vtc;
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
function Fs(e, t, n) {
  const r = e.style, o = te(n);
  if (n && !o) {
    if (t && !te(t))
      for (const i in t)
        n[i] == null && wn(r, i, "");
    for (const i in n)
      wn(r, i, n[i]);
  } else {
    const i = r.display;
    o ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (r.display = i);
  }
}
const Cr = /\s*!important$/;
function wn(e, t, n) {
  if (T(n))
    n.forEach((r) => wn(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const r = Bs(e, t);
    Cr.test(n) ? e.setProperty(
      we(r),
      n.replace(Cr, ""),
      "important"
    ) : e[r] = n;
  }
}
const Or = ["Webkit", "Moz", "ms"], sn = {};
function Bs(e, t) {
  const n = sn[t];
  if (n)
    return n;
  let r = de(t);
  if (r !== "filter" && r in e)
    return sn[t] = r;
  r = Vt(r);
  for (let o = 0; o < Or.length; o++) {
    const i = Or[o] + r;
    if (i in e)
      return sn[t] = i;
  }
  return t;
}
const kr = "http://www.w3.org/1999/xlink";
function Js(e, t, n, r, o) {
  if (r && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(kr, t.slice(6, t.length)) : e.setAttributeNS(kr, t, n);
  else {
    const i = Uo(t);
    n == null || i && !Hr(n) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : n);
  }
}
function zs(e, t, n, r, o, i, s) {
  if (t === "innerHTML" || t === "textContent") {
    r && s(r, o, i), e[t] = n ?? "";
    return;
  }
  const l = e.tagName;
  if (t === "value" && l !== "PROGRESS" && // custom elements may use _value internally
  !l.includes("-")) {
    e._value = n;
    const u = l === "OPTION" ? e.getAttribute("value") : e.value, d = n ?? "";
    u !== d && (e.value = d), n == null && e.removeAttribute(t);
    return;
  }
  let c = !1;
  if (n === "" || n == null) {
    const u = typeof e[t];
    u === "boolean" ? n = Hr(n) : n == null && u === "string" ? (n = "", c = !0) : u === "number" && (n = 0, c = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  c && e.removeAttribute(t);
}
function Xs(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function Vs(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
function Ws(e, t, n, r, o = null) {
  const i = e._vei || (e._vei = {}), s = i[t];
  if (r && s)
    s.value = r;
  else {
    const [l, c] = $s(t);
    if (r) {
      const u = i[t] = qs(r, o);
      Xs(e, l, u, c);
    } else
      s && (Vs(e, l, s, c), i[t] = void 0);
  }
}
const Tr = /(?:Once|Passive|Capture)$/;
function $s(e) {
  let t;
  if (Tr.test(e)) {
    t = {};
    let r;
    for (; r = e.match(Tr); )
      e = e.slice(0, e.length - r[0].length), t[r[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : we(e.slice(2)), t];
}
let ln = 0;
const Ys = /* @__PURE__ */ Promise.resolve(), Ks = () => ln || (Ys.then(() => ln = 0), ln = Date.now());
function qs(e, t) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    Ee(
      Gs(r, n.value),
      t,
      5,
      [r]
    );
  };
  return n.value = e, n.attached = Ks(), n;
}
function Gs(e, t) {
  if (T(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((r) => (o) => !o._stopped && r && r(o));
  } else
    return t;
}
const Mr = /^on[a-z]/, Zs = (e, t, n, r, o = !1, i, s, l, c) => {
  t === "class" ? Us(e, r, o) : t === "style" ? Fs(e, n, r) : Jt(t) ? En(t) || Ws(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Qs(e, t, r, o)) ? zs(
    e,
    t,
    r,
    i,
    s,
    l,
    c
  ) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Js(e, t, r, o));
};
function Qs(e, t, n, r) {
  return r ? !!(t === "innerHTML" || t === "textContent" || t in e && Mr.test(t) && N(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || Mr.test(t) && te(n) ? !1 : t in e;
}
function el(e, t) {
  const n = lo(e);
  class r extends Vn {
    constructor(i) {
      super(n, i, t);
    }
  }
  return r.def = n, r;
}
const tl = typeof HTMLElement < "u" ? HTMLElement : class {
};
class Vn extends tl {
  constructor(t, n = {}, r) {
    super(), this._def = t, this._props = n, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this.shadowRoot && r ? r(this._createVNode(), this.shadowRoot) : (this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, eo(() => {
      this._connected || (Pr(null, this.shadowRoot), this._instance = null);
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    this._resolved = !0;
    for (let r = 0; r < this.attributes.length; r++)
      this._setAttr(this.attributes[r].name);
    new MutationObserver((r) => {
      for (const o of r)
        this._setAttr(o.attributeName);
    }).observe(this, { attributes: !0 });
    const t = (r, o = !1) => {
      const { props: i, styles: s } = r;
      let l;
      if (i && !T(i))
        for (const c in i) {
          const u = i[c];
          (u === Number || u && u.type === Number) && (c in this._props && (this._props[c] = Gn(this._props[c])), (l || (l = /* @__PURE__ */ Object.create(null)))[de(c)] = !0);
        }
      this._numberProps = l, o && this._resolveProps(r), this._applyStyles(s), this._update();
    }, n = this._def.__asyncLoader;
    n ? n().then((r) => t(r, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: n } = t, r = T(n) ? n : Object.keys(n || {});
    for (const o of Object.keys(this))
      o[0] !== "_" && r.includes(o) && this._setProp(o, this[o], !0, !1);
    for (const o of r.map(de))
      Object.defineProperty(this, o, {
        get() {
          return this._getProp(o);
        },
        set(i) {
          this._setProp(o, i);
        }
      });
  }
  _setAttr(t) {
    let n = this.getAttribute(t);
    const r = de(t);
    this._numberProps && this._numberProps[r] && (n = Gn(n)), this._setProp(r, n, !1);
  }
  /**
   * @internal
   */
  _getProp(t) {
    return this._props[t];
  }
  /**
   * @internal
   */
  _setProp(t, n, r = !0, o = !0) {
    n !== this._props[t] && (this._props[t] = n, o && this._instance && this._update(), r && (n === !0 ? this.setAttribute(we(t), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(we(t), n + "") : n || this.removeAttribute(we(t))));
  }
  _update() {
    Pr(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const t = Ce(this._def, ee({}, this._props));
    return this._instance || (t.ce = (n) => {
      this._instance = n, n.isCE = !0;
      const r = (i, s) => {
        this.dispatchEvent(
          new CustomEvent(i, {
            detail: s
          })
        );
      };
      n.emit = (i, ...s) => {
        r(i, s), we(i) !== i && r(we(i), s);
      };
      let o = this;
      for (; o = o && (o.parentNode || o.host); )
        if (o instanceof Vn) {
          n.parent = o._instance, n.provides = o._instance.provides;
          break;
        }
    }), t;
  }
  _applyStyles(t) {
    t && t.forEach((n) => {
      const r = document.createElement("style");
      r.textContent = n, this.shadowRoot.appendChild(r);
    });
  }
}
function nl(e) {
  const t = ks();
  if (!t)
    return;
  const n = t.ut = (o = e(t.proxy)) => {
    Array.from(
      document.querySelectorAll(`[data-v-owner="${t.uid}"]`)
    ).forEach((i) => vn(i, o));
  }, r = () => {
    const o = e(t.proxy);
    yn(t.subTree, o), n(o);
  };
  Hi(r), fo(() => {
    const o = new MutationObserver(r);
    o.observe(t.subTree.el.parentNode, { childList: !0 }), Un(() => o.disconnect());
  });
}
function yn(e, t) {
  if (e.shapeFlag & 128) {
    const n = e.suspense;
    e = n.activeBranch, n.pendingBranch && !n.isHydrating && n.effects.push(() => {
      yn(n.activeBranch, t);
    });
  }
  for (; e.component; )
    e = e.component.subTree;
  if (e.shapeFlag & 1 && e.el)
    vn(e.el, t);
  else if (e.type === be)
    e.children.forEach((n) => yn(n, t));
  else if (e.type === Ht) {
    let { el: n, anchor: r } = e;
    for (; n && (vn(n, t), n !== r); )
      n = n.nextSibling;
  }
}
function vn(e, t) {
  if (e.nodeType === 1) {
    const n = e.style;
    for (const r in t)
      n.setProperty(`--${r}`, t[r]);
  }
}
const rl = /* @__PURE__ */ ee({ patchProp: Zs }, Ds);
let Ar;
function ol() {
  return Ar || (Ar = ps(rl));
}
const Pr = (...e) => {
  ol().render(...e);
};
var il = { exports: {} };
(function(e, t) {
  (function(n, r, o, i, s) {
    if ("customElements" in o)
      s();
    else {
      if (o.AWAITING_WEB_COMPONENTS_POLYFILL)
        return void o.AWAITING_WEB_COMPONENTS_POLYFILL.then(s);
      var l = o.AWAITING_WEB_COMPONENTS_POLYFILL = d();
      l.then(s);
      var c = o.WEB_COMPONENTS_POLYFILL || "//cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.0.2/webcomponents-bundle.js", u = o.ES6_CORE_POLYFILL || "//cdnjs.cloudflare.com/ajax/libs/core-js/2.5.3/core.min.js";
      "Promise" in o ? y(c).then(function() {
        l.isDone = !0, l.exec();
      }) : y(u).then(function() {
        y(c).then(function() {
          l.isDone = !0, l.exec();
        });
      });
    }
    function d() {
      var b = [];
      return b.isDone = !1, b.exec = function() {
        b.splice(0).forEach(function(C) {
          C();
        });
      }, b.then = function(C) {
        return b.isDone ? C() : b.push(C), b;
      }, b;
    }
    function y(b) {
      var C = d(), H = i.createElement("script");
      return H.type = "text/javascript", H.readyState ? H.onreadystatechange = function() {
        H.readyState != "loaded" && H.readyState != "complete" || (H.onreadystatechange = null, C.isDone = !0, C.exec());
      } : H.onload = function() {
        C.isDone = !0, C.exec();
      }, H.src = b, i.getElementsByTagName("head")[0].appendChild(H), H.then = C.then, H;
    }
  })(0, 0, window, document, function() {
    var n;
    n = function() {
      return function(r) {
        var o = {};
        function i(s) {
          if (o[s])
            return o[s].exports;
          var l = o[s] = { i: s, l: !1, exports: {} };
          return r[s].call(l.exports, l, l.exports, i), l.l = !0, l.exports;
        }
        return i.m = r, i.c = o, i.d = function(s, l, c) {
          i.o(s, l) || Object.defineProperty(s, l, { enumerable: !0, get: c });
        }, i.r = function(s) {
          typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(s, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(s, "__esModule", { value: !0 });
        }, i.t = function(s, l) {
          if (1 & l && (s = i(s)), 8 & l || 4 & l && typeof s == "object" && s && s.__esModule)
            return s;
          var c = /* @__PURE__ */ Object.create(null);
          if (i.r(c), Object.defineProperty(c, "default", { enumerable: !0, value: s }), 2 & l && typeof s != "string")
            for (var u in s)
              i.d(c, u, (function(d) {
                return s[d];
              }).bind(null, u));
          return c;
        }, i.n = function(s) {
          var l = s && s.__esModule ? function() {
            return s.default;
          } : function() {
            return s;
          };
          return i.d(l, "a", l), l;
        }, i.o = function(s, l) {
          return Object.prototype.hasOwnProperty.call(s, l);
        }, i.p = "", i(i.s = 5);
      }([function(r, o) {
        r.exports = function(i) {
          var s = [];
          return s.toString = function() {
            return this.map(function(l) {
              var c = function(u, d) {
                var y, b = u[1] || "", C = u[3];
                if (!C)
                  return b;
                if (d && typeof btoa == "function") {
                  var H = (y = C, "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(y)))) + " */"), S = C.sources.map(function(Y) {
                    return "/*# sourceURL=" + C.sourceRoot + Y + " */";
                  });
                  return [b].concat(S).concat([H]).join(`
`);
                }
                return [b].join(`
`);
              }(l, i);
              return l[2] ? "@media " + l[2] + "{" + c + "}" : c;
            }).join("");
          }, s.i = function(l, c) {
            typeof l == "string" && (l = [[null, l, ""]]);
            for (var u = {}, d = 0; d < this.length; d++) {
              var y = this[d][0];
              typeof y == "number" && (u[y] = !0);
            }
            for (d = 0; d < l.length; d++) {
              var b = l[d];
              typeof b[0] == "number" && u[b[0]] || (c && !b[2] ? b[2] = c : c && (b[2] = "(" + b[2] + ") and (" + c + ")"), s.push(b));
            }
          }, s;
        };
      }, function(r, o, i) {
        var s = i(3);
        r.exports = typeof s == "string" ? s : s.toString();
      }, function(r, o, i) {
        var s = i(4);
        r.exports = typeof s == "string" ? s : s.toString();
      }, function(r, o, i) {
        (r.exports = i(0)(!1)).push([r.i, "@-webkit-keyframes spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}@keyframes spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}@-webkit-keyframes burst{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}90%{-webkit-transform:scale(1.5);transform:scale(1.5);opacity:0}}@keyframes burst{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}90%{-webkit-transform:scale(1.5);transform:scale(1.5);opacity:0}}@-webkit-keyframes flashing{0%{opacity:1}45%{opacity:0}90%{opacity:1}}@keyframes flashing{0%{opacity:1}45%{opacity:0}90%{opacity:1}}@-webkit-keyframes fade-left{0%{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}75%{-webkit-transform:translateX(-20px);transform:translateX(-20px);opacity:0}}@keyframes fade-left{0%{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}75%{-webkit-transform:translateX(-20px);transform:translateX(-20px);opacity:0}}@-webkit-keyframes fade-right{0%{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}75%{-webkit-transform:translateX(20px);transform:translateX(20px);opacity:0}}@keyframes fade-right{0%{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}75%{-webkit-transform:translateX(20px);transform:translateX(20px);opacity:0}}@-webkit-keyframes fade-up{0%{-webkit-transform:translateY(0);transform:translateY(0);opacity:1}75%{-webkit-transform:translateY(-20px);transform:translateY(-20px);opacity:0}}@keyframes fade-up{0%{-webkit-transform:translateY(0);transform:translateY(0);opacity:1}75%{-webkit-transform:translateY(-20px);transform:translateY(-20px);opacity:0}}@-webkit-keyframes fade-down{0%{-webkit-transform:translateY(0);transform:translateY(0);opacity:1}75%{-webkit-transform:translateY(20px);transform:translateY(20px);opacity:0}}@keyframes fade-down{0%{-webkit-transform:translateY(0);transform:translateY(0);opacity:1}75%{-webkit-transform:translateY(20px);transform:translateY(20px);opacity:0}}@-webkit-keyframes tada{0%{-webkit-transform:scaleX(1);transform:scaleX(1)}10%,20%{-webkit-transform:scale3d(.95,.95,.95) rotate(-10deg);transform:scale3d(.95,.95,.95) rotate(-10deg)}30%,50%,70%,90%{-webkit-transform:scaleX(1) rotate(10deg);transform:scaleX(1) rotate(10deg)}40%,60%,80%{-webkit-transform:scaleX(1) rotate(-10deg);transform:scaleX(1) rotate(-10deg)}to{-webkit-transform:scaleX(1);transform:scaleX(1)}}@keyframes tada{0%{-webkit-transform:scaleX(1);transform:scaleX(1)}10%,20%{-webkit-transform:scale3d(.95,.95,.95) rotate(-10deg);transform:scale3d(.95,.95,.95) rotate(-10deg)}30%,50%,70%,90%{-webkit-transform:scaleX(1) rotate(10deg);transform:scaleX(1) rotate(10deg)}40%,60%,80%{-webkit-transform:rotate(-10deg);transform:rotate(-10deg)}to{-webkit-transform:scaleX(1);transform:scaleX(1)}}.bx-spin,.bx-spin-hover:hover{-webkit-animation:spin 2s linear infinite;animation:spin 2s linear infinite}.bx-tada,.bx-tada-hover:hover{-webkit-animation:tada 1.5s ease infinite;animation:tada 1.5s ease infinite}.bx-flashing,.bx-flashing-hover:hover{-webkit-animation:flashing 1.5s infinite linear;animation:flashing 1.5s infinite linear}.bx-burst,.bx-burst-hover:hover{-webkit-animation:burst 1.5s infinite linear;animation:burst 1.5s infinite linear}.bx-fade-up,.bx-fade-up-hover:hover{-webkit-animation:fade-up 1.5s infinite linear;animation:fade-up 1.5s infinite linear}.bx-fade-down,.bx-fade-down-hover:hover{-webkit-animation:fade-down 1.5s infinite linear;animation:fade-down 1.5s infinite linear}.bx-fade-left,.bx-fade-left-hover:hover{-webkit-animation:fade-left 1.5s infinite linear;animation:fade-left 1.5s infinite linear}.bx-fade-right,.bx-fade-right-hover:hover{-webkit-animation:fade-right 1.5s infinite linear;animation:fade-right 1.5s infinite linear}", ""]);
      }, function(r, o, i) {
        (r.exports = i(0)(!1)).push([r.i, '.bx-rotate-90{transform:rotate(90deg);-ms-filter:"progid:DXImageTransform.Microsoft.BasicImage(rotation=1)"}.bx-rotate-180{transform:rotate(180deg);-ms-filter:"progid:DXImageTransform.Microsoft.BasicImage(rotation=2)"}.bx-rotate-270{transform:rotate(270deg);-ms-filter:"progid:DXImageTransform.Microsoft.BasicImage(rotation=3)"}.bx-flip-horizontal{transform:scaleX(-1);-ms-filter:"progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)"}.bx-flip-vertical{transform:scaleY(-1);-ms-filter:"progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)"}', ""]);
      }, function(r, o, i) {
        i.r(o), i.d(o, "BoxIconElement", function() {
          return he;
        });
        var s, l, c, u, d = i(1), y = i.n(d), b = i(2), C = i.n(b), H = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(B) {
          return typeof B;
        } : function(B) {
          return B && typeof Symbol == "function" && B.constructor === Symbol && B !== Symbol.prototype ? "symbol" : typeof B;
        }, S = function() {
          function B(X, I) {
            for (var L = 0; L < I.length; L++) {
              var M = I[L];
              M.enumerable = M.enumerable || !1, M.configurable = !0, "value" in M && (M.writable = !0), Object.defineProperty(X, M.key, M);
            }
          }
          return function(X, I, L) {
            return I && B(X.prototype, I), L && B(X, L), X;
          };
        }(), Y = (l = (s = Object).getPrototypeOf || function(B) {
          return B.__proto__;
        }, c = s.setPrototypeOf || function(B, X) {
          return B.__proto__ = X, B;
        }, u = (typeof Reflect > "u" ? "undefined" : H(Reflect)) === "object" ? Reflect.construct : function(B, X, I) {
          var L, M = [null];
          return M.push.apply(M, X), L = B.bind.apply(B, M), c(new L(), I.prototype);
        }, function(B) {
          var X = l(B);
          return c(B, c(function() {
            return u(X, arguments, l(this).constructor);
          }, X));
        }), q = window, G = {}, Z = document.createElement("template"), P = function() {
          return !!q.ShadyCSS;
        };
        Z.innerHTML = `
<style>
:host {
  display: inline-block;
  font-size: initial;
  box-sizing: border-box;
  width: 24px;
  height: 24px;
}
:host([size=xs]) {
    width: 0.8rem;
    height: 0.8rem;
}
:host([size=sm]) {
    width: 1.55rem;
    height: 1.55rem;
}
:host([size=md]) {
    width: 2.25rem;
    height: 2.25rem;
}
:host([size=lg]) {
    width: 3.0rem;
    height: 3.0rem;
}

:host([size]:not([size=""]):not([size=xs]):not([size=sm]):not([size=md]):not([size=lg])) {
    width: auto;
    height: auto;
}
:host([pull=left]) #icon {
    float: left;
    margin-right: .3em!important;
}
:host([pull=right]) #icon {
    float: right;
    margin-left: .3em!important;
}
:host([border=square]) #icon {
    padding: .25em;
    border: .07em solid rgba(0,0,0,.1);
    border-radius: .25em;
}
:host([border=circle]) #icon {
    padding: .25em;
    border: .07em solid rgba(0,0,0,.1);
    border-radius: 50%;
}
#icon,
svg {
  width: 100%;
  height: 100%;
}
#icon {
    box-sizing: border-box;
} 
` + y.a + `
` + C.a + `
</style>
<div id="icon"></div>`;
        var he = Y(function(B) {
          function X() {
            (function(L, M) {
              if (!(L instanceof M))
                throw new TypeError("Cannot call a class as a function");
            })(this, X);
            var I = function(L, M) {
              if (!L)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !M || typeof M != "object" && typeof M != "function" ? L : M;
            }(this, (X.__proto__ || Object.getPrototypeOf(X)).call(this));
            return I.$ui = I.attachShadow({ mode: "open" }), I.$ui.appendChild(I.ownerDocument.importNode(Z.content, !0)), P() && q.ShadyCSS.styleElement(I), I._state = { $iconHolder: I.$ui.getElementById("icon"), type: I.getAttribute("type") }, I;
          }
          return function(I, L) {
            if (typeof L != "function" && L !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof L);
            I.prototype = Object.create(L && L.prototype, { constructor: { value: I, enumerable: !1, writable: !0, configurable: !0 } }), L && (Object.setPrototypeOf ? Object.setPrototypeOf(I, L) : I.__proto__ = L);
          }(X, HTMLElement), S(X, null, [{ key: "getIconSvg", value: function(I, L) {
            var M = this.cdnUrl + "/regular/bx-" + I + ".svg";
            return L === "solid" ? M = this.cdnUrl + "/solid/bxs-" + I + ".svg" : L === "logo" && (M = this.cdnUrl + "/logos/bxl-" + I + ".svg"), M && G[M] || (G[M] = new Promise(function(le, oe) {
              var ue = new XMLHttpRequest();
              ue.addEventListener("load", function() {
                this.status < 200 || this.status >= 300 ? oe(new Error(this.status + " " + this.responseText)) : le(this.responseText);
              }), ue.onerror = oe, ue.onabort = oe, ue.open("GET", M), ue.send();
            })), G[M];
          } }, { key: "define", value: function(I) {
            I = I || this.tagName, P() && q.ShadyCSS.prepareTemplate(Z, I), customElements.define(I, this);
          } }, { key: "cdnUrl", get: function() {
            return "//unpkg.com/boxicons@2.1.4/svg";
          } }, { key: "tagName", get: function() {
            return "box-icon";
          } }, { key: "observedAttributes", get: function() {
            return ["type", "name", "color", "size", "rotate", "flip", "animation", "border", "pull"];
          } }]), S(X, [{ key: "attributeChangedCallback", value: function(I, L, M) {
            var le = this._state.$iconHolder;
            switch (I) {
              case "type":
                (function(oe, ue, ne) {
                  var D = oe._state;
                  D.$iconHolder.textContent = "", D.type && (D.type = null), D.type = !ne || ne !== "solid" && ne !== "logo" ? "regular" : ne, D.currentName !== void 0 && oe.constructor.getIconSvg(D.currentName, D.type).then(function(W) {
                    D.type === ne && (D.$iconHolder.innerHTML = W);
                  }).catch(function(W) {
                    console.error("Failed to load icon: " + D.currentName + `
` + W);
                  });
                })(this, 0, M);
                break;
              case "name":
                (function(oe, ue, ne) {
                  var D = oe._state;
                  D.currentName = ne, D.$iconHolder.textContent = "", ne && D.type !== void 0 && oe.constructor.getIconSvg(ne, D.type).then(function(W) {
                    D.currentName === ne && (D.$iconHolder.innerHTML = W);
                  }).catch(function(W) {
                    console.error("Failed to load icon: " + ne + `
` + W);
                  });
                })(this, 0, M);
                break;
              case "color":
                le.style.fill = M || "";
                break;
              case "size":
                (function(oe, ue, ne) {
                  var D = oe._state;
                  D.size && (D.$iconHolder.style.width = D.$iconHolder.style.height = "", D.size = D.sizeType = null), ne && !/^(xs|sm|md|lg)$/.test(D.size) && (D.size = ne.trim(), D.$iconHolder.style.width = D.$iconHolder.style.height = D.size);
                })(this, 0, M);
                break;
              case "rotate":
                L && le.classList.remove("bx-rotate-" + L), M && le.classList.add("bx-rotate-" + M);
                break;
              case "flip":
                L && le.classList.remove("bx-flip-" + L), M && le.classList.add("bx-flip-" + M);
                break;
              case "animation":
                L && le.classList.remove("bx-" + L), M && le.classList.add("bx-" + M);
            }
          } }, { key: "connectedCallback", value: function() {
            P() && q.ShadyCSS.styleElement(this);
          } }]), X;
        }());
        o.default = he, he.define();
      }]);
    }, e.exports = n();
  });
})(il);
const sl = { class: "font-bold text-lg px-6 py-4 title" }, ll = {
  key: 0,
  class: "btn mx-6 mb-4 p-2 rounded relative"
}, al = { class: "flex flex-row justify-between p-4 tips-content" }, cl = { class: "text-sm" }, fl = ["src"], ul = { class: "text-xs pt-1" }, pl = { class: "flex justify-center items-center" }, dl = { class: "ml-1 text-xs" }, hl = /* @__PURE__ */ lo({
  __name: "ArticlePanel.ce",
  props: {
    info: { default: "如果觉得我的文章对您有用，请随意赞赏。您的支持将鼓励我继续创作!" },
    btnName: { default: "赞赏支持" },
    showBtn: { type: Boolean, default: !1 },
    btnIcon: { default: "gift" },
    items: { default: "[]" },
    cardStyle: { default: '{"borderColor": "#ccc","bgColor": "#eee","titleTextColor": "#000","btnTextColor": "#fff","btnBgColor": "#e99e60","tipsTextColor": "#111","tipsBgColor": "#fff","cardBorderAlign": "left","tipsDirection": "mid"}' }
  },
  setup(e) {
    const t = e;
    nl((o) => ({
      aa45bc5a: r.value.borderColor,
      "6b38af5a": r.value.bgColor,
      "20afcbfc": r.value.titleTextColor,
      "126a037e": r.value.btnTextColor,
      "00a2d61a": r.value.tipsTextColor,
      "08a26702": r.value.tipsBgColor,
      "1c5d9d66": r.value.btnBgColor
    }));
    const n = sr([]);
    n.value = JSON.parse(t.items);
    const r = sr({
      borderColor: "#ccc",
      bgColor: "#eee",
      titleTextColor: "#000",
      btnTextColor: "#fff",
      btnBgColor: "#e99e60",
      tipsTextColor: "#111",
      tipsBgColor: "#fff",
      cardBorderAlign: "left",
      tipsDirection: "mid"
    });
    return r.value = JSON.parse(t.cardStyle), (o, i) => {
      const s = Yi("box-icon");
      return Ze(), ft("div", {
        class: _t(["justify-center items-center tip-card rounded", r.value.cardBorderAlign])
      }, [
        Ne("p", sl, Ot(o.info), 1),
        o.showBtn ? (Ze(), ft("button", ll, [
          n.value.length > 0 ? (Ze(), ft("div", {
            key: 0,
            class: _t([n.value.length > 0 ? "cursor-pointer " + r.value.tipsDirection : "cursor-default", "tips rounded"])
          }, [
            Ne("div", al, [
              (Ze(!0), ft(be, null, Gi(n.value, (l) => (Ze(), ft("div", {
                key: l.name,
                class: "flex flex-col justify-center items-center text-center px-2"
              }, [
                Ne("span", cl, Ot(l.name), 1),
                Ne("img", {
                  class: "icon",
                  src: l.image
                }, null, 8, fl),
                Ne("span", ul, Ot(l.desc), 1)
              ]))), 128))
            ])
          ], 2)) : wr("", !0),
          Ne("div", pl, [
            Ce(s, {
              name: o.btnIcon,
              class: "btn-icon",
              color: "#ffffff"
            }, null, 8, ["name"]),
            Ne("span", dl, Ot(o.btnName), 1)
          ])
        ])) : wr("", !0)
      ], 2);
    };
  }
}), ml = `*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: ""}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.absolute{position:absolute}.relative{position:relative}.mx-6{margin-left:1.5rem;margin-right:1.5rem}.mb-4{margin-bottom:1rem}.ml-1{margin-left:.25rem}.flex{display:flex}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.cursor-default{cursor:default}.cursor-pointer{cursor:pointer}.flex-row{flex-direction:row}.flex-col{flex-direction:column}.items-center{align-items:center}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.rounded{border-radius:.25rem}.border{border-width:1px}.p-2{padding:.5rem}.p-4{padding:1rem}.px-2{padding-left:.5rem;padding-right:.5rem}.px-6{padding-left:1.5rem;padding-right:1.5rem}.py-4{padding-top:1rem;padding-bottom:1rem}.pt-1{padding-top:.25rem}.text-center{text-align:center}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xs{font-size:.75rem;line-height:1rem}.font-bold{font-weight:700}.drop-shadow{--tw-drop-shadow: drop-shadow(0 1px 2px rgb(0 0 0 / .1)) drop-shadow(0 1px 1px rgb(0 0 0 / .06));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.tip-card{--border-color: var(--aa45bc5a);--bg-color: var(--6b38af5a);--title-text-color: var(--20afcbfc);--btn-text-color: var(--126a037e);--tips-text-color: var(--00a2d61a);--tips-bg-color: var(--08a26702);--btn-bg-color: var(--1c5d9d66);position:relative;background-color:var(--bg-color)}.tip-card:before{content:"";height:100%;width:.25rem;position:absolute;background-color:var(--btn-bg-color)}.tip-card.left:before{left:0}.tip-card.right:before{right:0}.title{color:var(--title-text-color)}.tips{position:absolute;display:none;z-index:10;background-color:var(--tips-bg-color);border:1px solid var(--border-color);filter:drop-shadow(1px 1px 1px var(--border-color));transition:all .3s;color:var(--tips-text-color)}.tips.left{right:calc(100% + .5rem);bottom:calc(100% - 2rem)}.tips.right{left:calc(100% + .5rem);bottom:calc(100% - 2rem)}.tips.mid{left:50%;transform:translate(-50%);bottom:calc(100% + 10px)}.tips .icon{width:10rem;max-width:inherit;height:10rem;margin-top:.25rem}.tips-content{position:relative}.tips-content:before{content:"";position:absolute;width:.5rem;height:.5rem;background:#fff;border-radius:1px}.tips.mid>.tips-content:before{left:50%;transform:rotate(45deg);bottom:-.25rem;border-bottom:1px solid var(--border-color);border-right:1px solid var(--border-color)}.tips.left>.tips-content:before{right:-.25rem;bottom:.5rem;transform:rotate(45deg);border-top:1px solid var(--border-color);border-right:1px solid var(--border-color)}.tips.right>.tips-content:before{left:-.25rem;bottom:.5rem;transform:rotate(45deg);border-bottom:1px solid var(--border-color);border-left:1px solid var(--border-color)}.btn{height:auto;background-color:var(--btn-bg-color);color:var(--btn-text-color)}.btn:hover .tips{display:flex}.btn-icon{width:14px}
`, gl = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, o] of t)
    n[r] = o;
  return n;
}, _l = /* @__PURE__ */ gl(hl, [["styles", [ml]]]), bl = el(_l);
customElements.define("charlie-article-panel", bl);
