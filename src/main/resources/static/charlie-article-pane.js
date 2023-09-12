function xn(e, t) {
  const n = /* @__PURE__ */ Object.create(null), r = e.split(",");
  for (let o = 0; o < r.length; o++)
    n[r[o]] = !0;
  return t ? (o) => !!n[o.toLowerCase()] : (o) => !!n[o];
}
const J = {}, et = [], xe = () => {
}, ko = () => !1, So = /^on[^a-z]/, Bt = (e) => So.test(e), En = (e) => e.startsWith("onUpdate:"), ee = Object.assign, Cn = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, To = Object.prototype.hasOwnProperty, L = (e, t) => To.call(e, t), k = Array.isArray, tt = (e) => zt(e) === "[object Map]", Pr = (e) => zt(e) === "[object Set]", R = (e) => typeof e == "function", te = (e) => typeof e == "string", On = (e) => typeof e == "symbol", W = (e) => e !== null && typeof e == "object", Rr = (e) => W(e) && R(e.then) && R(e.catch), Ir = Object.prototype.toString, zt = (e) => Ir.call(e), Mo = (e) => zt(e).slice(8, -1), Nr = (e) => zt(e) === "[object Object]", An = (e) => te(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Rt = /* @__PURE__ */ xn(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Xt = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Po = /-(\w)/g, de = Xt((e) => e.replace(Po, (t, n) => n ? n.toUpperCase() : "")), Ro = /\B([A-Z])/g, we = Xt(
  (e) => e.replace(Ro, "-$1").toLowerCase()
), Jt = Xt(
  (e) => e.charAt(0).toUpperCase() + e.slice(1)
), en = Xt(
  (e) => e ? `on${Jt(e)}` : ""
), _t = (e, t) => !Object.is(e, t), tn = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, Lt = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, Io = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Gn = (e) => {
  const t = te(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let Zn;
const an = () => Zn || (Zn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function kn(e) {
  if (k(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], o = te(r) ? Lo(r) : kn(r);
      if (o)
        for (const s in o)
          t[s] = o[s];
    }
    return t;
  } else {
    if (te(e))
      return e;
    if (W(e))
      return e;
  }
}
const No = /;(?![^(]*\))/g, Ho = /:([^]+)/, Do = /\/\*[^]*?\*\//g;
function Lo(e) {
  const t = {};
  return e.replace(Do, "").split(No).forEach((n) => {
    if (n) {
      const r = n.split(Ho);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function gt(e) {
  let t = "";
  if (te(e))
    t = e;
  else if (k(e))
    for (let n = 0; n < e.length; n++) {
      const r = gt(e[n]);
      r && (t += r + " ");
    }
  else if (W(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const jo = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Fo = /* @__PURE__ */ xn(jo);
function Hr(e) {
  return !!e || e === "";
}
const Ot = (e) => te(e) ? e : e == null ? "" : k(e) || W(e) && (e.toString === Ir || !R(e.toString)) ? JSON.stringify(e, Dr, 2) : String(e), Dr = (e, t) => t && t.__v_isRef ? Dr(e, t.value) : tt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce((n, [r, o]) => (n[`${r} =>`] = o, n), {})
} : Pr(t) ? {
  [`Set(${t.size})`]: [...t.values()]
} : W(t) && !k(t) && !Nr(t) ? String(t) : t;
let ge;
class Uo {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = ge, !t && ge && (this.index = (ge.scopes || (ge.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = ge;
      try {
        return ge = this, t();
      } finally {
        ge = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ge = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    ge = this.parent;
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
function Vo(e, t = ge) {
  t && t.active && t.effects.push(e);
}
function Bo() {
  return ge;
}
const Sn = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, Lr = (e) => (e.w & Fe) > 0, jr = (e) => (e.n & Fe) > 0, zo = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= Fe;
}, Xo = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let r = 0; r < t.length; r++) {
      const o = t[r];
      Lr(o) && !jr(o) ? o.delete(e) : t[n++] = o, o.w &= ~Fe, o.n &= ~Fe;
    }
    t.length = n;
  }
}, cn = /* @__PURE__ */ new WeakMap();
let pt = 0, Fe = 1;
const un = 30;
let ve;
const Ke = Symbol(""), fn = Symbol("");
class Tn {
  constructor(t, n = null, r) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Vo(this, r);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = ve, n = Le;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = ve, ve = this, Le = !0, Fe = 1 << ++pt, pt <= un ? zo(this) : Qn(this), this.fn();
    } finally {
      pt <= un && Xo(this), Fe = 1 << --pt, ve = this.parent, Le = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    ve === this ? this.deferStop = !0 : this.active && (Qn(this), this.onStop && this.onStop(), this.active = !1);
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
let Le = !0;
const Fr = [];
function lt() {
  Fr.push(Le), Le = !1;
}
function at() {
  const e = Fr.pop();
  Le = e === void 0 ? !0 : e;
}
function ue(e, t, n) {
  if (Le && ve) {
    let r = cn.get(e);
    r || cn.set(e, r = /* @__PURE__ */ new Map());
    let o = r.get(n);
    o || r.set(n, o = Sn()), Ur(o);
  }
}
function Ur(e, t) {
  let n = !1;
  pt <= un ? jr(e) || (e.n |= Fe, n = !Lr(e)) : n = !e.has(ve), n && (e.add(ve), ve.deps.push(e));
}
function Ie(e, t, n, r, o, s) {
  const i = cn.get(e);
  if (!i)
    return;
  let l = [];
  if (t === "clear")
    l = [...i.values()];
  else if (n === "length" && k(e)) {
    const c = Number(r);
    i.forEach((f, d) => {
      (d === "length" || d >= c) && l.push(f);
    });
  } else
    switch (n !== void 0 && l.push(i.get(n)), t) {
      case "add":
        k(e) ? An(n) && l.push(i.get("length")) : (l.push(i.get(Ke)), tt(e) && l.push(i.get(fn)));
        break;
      case "delete":
        k(e) || (l.push(i.get(Ke)), tt(e) && l.push(i.get(fn)));
        break;
      case "set":
        tt(e) && l.push(i.get(Ke));
        break;
    }
  if (l.length === 1)
    l[0] && pn(l[0]);
  else {
    const c = [];
    for (const f of l)
      f && c.push(...f);
    pn(Sn(c));
  }
}
function pn(e, t) {
  const n = k(e) ? e : [...e];
  for (const r of n)
    r.computed && er(r);
  for (const r of n)
    r.computed || er(r);
}
function er(e, t) {
  (e !== ve || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const Jo = /* @__PURE__ */ xn("__proto__,__v_isRef,__isVue"), Vr = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(On)
), Ko = /* @__PURE__ */ Mn(), Wo = /* @__PURE__ */ Mn(!1, !0), $o = /* @__PURE__ */ Mn(!0), tr = /* @__PURE__ */ qo();
function qo() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const r = F(this);
      for (let s = 0, i = this.length; s < i; s++)
        ue(r, "get", s + "");
      const o = r[t](...n);
      return o === -1 || o === !1 ? r[t](...n.map(F)) : o;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      lt();
      const r = F(this)[t].apply(this, n);
      return at(), r;
    };
  }), e;
}
function Yo(e) {
  const t = F(this);
  return ue(t, "has", e), t.hasOwnProperty(e);
}
function Mn(e = !1, t = !1) {
  return function(r, o, s) {
    if (o === "__v_isReactive")
      return !e;
    if (o === "__v_isReadonly")
      return e;
    if (o === "__v_isShallow")
      return t;
    if (o === "__v_raw" && s === (e ? t ? ps : Kr : t ? Jr : Xr).get(r))
      return r;
    const i = k(r);
    if (!e) {
      if (i && L(tr, o))
        return Reflect.get(tr, o, s);
      if (o === "hasOwnProperty")
        return Yo;
    }
    const l = Reflect.get(r, o, s);
    return (On(o) ? Vr.has(o) : Jo(o)) || (e || ue(r, "get", o), t) ? l : ie(l) ? i && An(o) ? l : l.value : W(l) ? e ? Wr(l) : In(l) : l;
  };
}
const Go = /* @__PURE__ */ Br(), Zo = /* @__PURE__ */ Br(!0);
function Br(e = !1) {
  return function(n, r, o, s) {
    let i = n[r];
    if (ot(i) && ie(i) && !ie(o))
      return !1;
    if (!e && (!jt(o) && !ot(o) && (i = F(i), o = F(o)), !k(n) && ie(i) && !ie(o)))
      return i.value = o, !0;
    const l = k(n) && An(r) ? Number(r) < n.length : L(n, r), c = Reflect.set(n, r, o, s);
    return n === F(s) && (l ? _t(o, i) && Ie(n, "set", r, o) : Ie(n, "add", r, o)), c;
  };
}
function Qo(e, t) {
  const n = L(e, t);
  e[t];
  const r = Reflect.deleteProperty(e, t);
  return r && n && Ie(e, "delete", t, void 0), r;
}
function es(e, t) {
  const n = Reflect.has(e, t);
  return (!On(t) || !Vr.has(t)) && ue(e, "has", t), n;
}
function ts(e) {
  return ue(e, "iterate", k(e) ? "length" : Ke), Reflect.ownKeys(e);
}
const zr = {
  get: Ko,
  set: Go,
  deleteProperty: Qo,
  has: es,
  ownKeys: ts
}, ns = {
  get: $o,
  set(e, t) {
    return !0;
  },
  deleteProperty(e, t) {
    return !0;
  }
}, rs = /* @__PURE__ */ ee(
  {},
  zr,
  {
    get: Wo,
    set: Zo
  }
), Pn = (e) => e, Kt = (e) => Reflect.getPrototypeOf(e);
function At(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const o = F(e), s = F(t);
  n || (t !== s && ue(o, "get", t), ue(o, "get", s));
  const { has: i } = Kt(o), l = r ? Pn : n ? Hn : bt;
  if (i.call(o, t))
    return l(e.get(t));
  if (i.call(o, s))
    return l(e.get(s));
  e !== o && e.get(t);
}
function kt(e, t = !1) {
  const n = this.__v_raw, r = F(n), o = F(e);
  return t || (e !== o && ue(r, "has", e), ue(r, "has", o)), e === o ? n.has(e) : n.has(e) || n.has(o);
}
function St(e, t = !1) {
  return e = e.__v_raw, !t && ue(F(e), "iterate", Ke), Reflect.get(e, "size", e);
}
function nr(e) {
  e = F(e);
  const t = F(this);
  return Kt(t).has.call(t, e) || (t.add(e), Ie(t, "add", e, e)), this;
}
function rr(e, t) {
  t = F(t);
  const n = F(this), { has: r, get: o } = Kt(n);
  let s = r.call(n, e);
  s || (e = F(e), s = r.call(n, e));
  const i = o.call(n, e);
  return n.set(e, t), s ? _t(t, i) && Ie(n, "set", e, t) : Ie(n, "add", e, t), this;
}
function or(e) {
  const t = F(this), { has: n, get: r } = Kt(t);
  let o = n.call(t, e);
  o || (e = F(e), o = n.call(t, e)), r && r.call(t, e);
  const s = t.delete(e);
  return o && Ie(t, "delete", e, void 0), s;
}
function sr() {
  const e = F(this), t = e.size !== 0, n = e.clear();
  return t && Ie(e, "clear", void 0, void 0), n;
}
function Tt(e, t) {
  return function(r, o) {
    const s = this, i = s.__v_raw, l = F(i), c = t ? Pn : e ? Hn : bt;
    return !e && ue(l, "iterate", Ke), i.forEach((f, d) => r.call(o, c(f), c(d), s));
  };
}
function Mt(e, t, n) {
  return function(...r) {
    const o = this.__v_raw, s = F(o), i = tt(s), l = e === "entries" || e === Symbol.iterator && i, c = e === "keys" && i, f = o[e](...r), d = n ? Pn : t ? Hn : bt;
    return !t && ue(
      s,
      "iterate",
      c ? fn : Ke
    ), {
      // iterator protocol
      next() {
        const { value: v, done: b } = f.next();
        return b ? { value: v, done: b } : {
          value: l ? [d(v[0]), d(v[1])] : d(v),
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
function os() {
  const e = {
    get(s) {
      return At(this, s);
    },
    get size() {
      return St(this);
    },
    has: kt,
    add: nr,
    set: rr,
    delete: or,
    clear: sr,
    forEach: Tt(!1, !1)
  }, t = {
    get(s) {
      return At(this, s, !1, !0);
    },
    get size() {
      return St(this);
    },
    has: kt,
    add: nr,
    set: rr,
    delete: or,
    clear: sr,
    forEach: Tt(!1, !0)
  }, n = {
    get(s) {
      return At(this, s, !0);
    },
    get size() {
      return St(this, !0);
    },
    has(s) {
      return kt.call(this, s, !0);
    },
    add: He("add"),
    set: He("set"),
    delete: He("delete"),
    clear: He("clear"),
    forEach: Tt(!0, !1)
  }, r = {
    get(s) {
      return At(this, s, !0, !0);
    },
    get size() {
      return St(this, !0);
    },
    has(s) {
      return kt.call(this, s, !0);
    },
    add: He("add"),
    set: He("set"),
    delete: He("delete"),
    clear: He("clear"),
    forEach: Tt(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
    e[s] = Mt(
      s,
      !1,
      !1
    ), n[s] = Mt(
      s,
      !0,
      !1
    ), t[s] = Mt(
      s,
      !1,
      !0
    ), r[s] = Mt(
      s,
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
  ss,
  is,
  ls,
  as
] = /* @__PURE__ */ os();
function Rn(e, t) {
  const n = t ? e ? as : ls : e ? is : ss;
  return (r, o, s) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(
    L(n, o) && o in r ? n : r,
    o,
    s
  );
}
const cs = {
  get: /* @__PURE__ */ Rn(!1, !1)
}, us = {
  get: /* @__PURE__ */ Rn(!1, !0)
}, fs = {
  get: /* @__PURE__ */ Rn(!0, !1)
}, Xr = /* @__PURE__ */ new WeakMap(), Jr = /* @__PURE__ */ new WeakMap(), Kr = /* @__PURE__ */ new WeakMap(), ps = /* @__PURE__ */ new WeakMap();
function ds(e) {
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
function hs(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : ds(Mo(e));
}
function In(e) {
  return ot(e) ? e : Nn(
    e,
    !1,
    zr,
    cs,
    Xr
  );
}
function ms(e) {
  return Nn(
    e,
    !1,
    rs,
    us,
    Jr
  );
}
function Wr(e) {
  return Nn(
    e,
    !0,
    ns,
    fs,
    Kr
  );
}
function Nn(e, t, n, r, o) {
  if (!W(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const s = o.get(e);
  if (s)
    return s;
  const i = hs(e);
  if (i === 0)
    return e;
  const l = new Proxy(
    e,
    i === 2 ? r : n
  );
  return o.set(e, l), l;
}
function nt(e) {
  return ot(e) ? nt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function ot(e) {
  return !!(e && e.__v_isReadonly);
}
function jt(e) {
  return !!(e && e.__v_isShallow);
}
function $r(e) {
  return nt(e) || ot(e);
}
function F(e) {
  const t = e && e.__v_raw;
  return t ? F(t) : e;
}
function qr(e) {
  return Lt(e, "__v_skip", !0), e;
}
const bt = (e) => W(e) ? In(e) : e, Hn = (e) => W(e) ? Wr(e) : e;
function Yr(e) {
  Le && ve && (e = F(e), Ur(e.dep || (e.dep = Sn())));
}
function Gr(e, t) {
  e = F(e);
  const n = e.dep;
  n && pn(n);
}
function ie(e) {
  return !!(e && e.__v_isRef === !0);
}
function ir(e) {
  return _s(e, !1);
}
function _s(e, t) {
  return ie(e) ? e : new gs(e, t);
}
class gs {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : F(t), this._value = n ? t : bt(t);
  }
  get value() {
    return Yr(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || jt(t) || ot(t);
    t = n ? t : F(t), _t(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : bt(t), Gr(this));
  }
}
function bs(e) {
  return ie(e) ? e.value : e;
}
const ws = {
  get: (e, t, n) => bs(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return ie(o) && !ie(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function Zr(e) {
  return nt(e) ? e : new Proxy(e, ws);
}
class vs {
  constructor(t, n, r, o) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new Tn(t, () => {
      this._dirty || (this._dirty = !0, Gr(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !o, this.__v_isReadonly = r;
  }
  get value() {
    const t = F(this);
    return Yr(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
function ys(e, t, n = !1) {
  let r, o;
  const s = R(e);
  return s ? (r = e, o = xe) : (r = e.get, o = e.set), new vs(r, o, s || !o, n);
}
function je(e, t, n, r) {
  let o;
  try {
    o = r ? e(...r) : e();
  } catch (s) {
    Wt(s, t, n);
  }
  return o;
}
function Ee(e, t, n, r) {
  if (R(e)) {
    const s = je(e, t, n, r);
    return s && Rr(s) && s.catch((i) => {
      Wt(i, t, n);
    }), s;
  }
  const o = [];
  for (let s = 0; s < e.length; s++)
    o.push(Ee(e[s], t, n, r));
  return o;
}
function Wt(e, t, n, r = !0) {
  const o = t ? t.vnode : null;
  if (t) {
    let s = t.parent;
    const i = t.proxy, l = n;
    for (; s; ) {
      const f = s.ec;
      if (f) {
        for (let d = 0; d < f.length; d++)
          if (f[d](e, i, l) === !1)
            return;
      }
      s = s.parent;
    }
    const c = t.appContext.config.errorHandler;
    if (c) {
      je(
        c,
        null,
        10,
        [e, i, l]
      );
      return;
    }
  }
  xs(e, n, o, r);
}
function xs(e, t, n, r = !0) {
  console.error(e);
}
let wt = !1, dn = !1;
const se = [];
let Te = 0;
const rt = [];
let Pe = null, Xe = 0;
const Qr = /* @__PURE__ */ Promise.resolve();
let Dn = null;
function eo(e) {
  const t = Dn || Qr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Es(e) {
  let t = Te + 1, n = se.length;
  for (; t < n; ) {
    const r = t + n >>> 1;
    vt(se[r]) < e ? t = r + 1 : n = r;
  }
  return t;
}
function Ln(e) {
  (!se.length || !se.includes(
    e,
    wt && e.allowRecurse ? Te + 1 : Te
  )) && (e.id == null ? se.push(e) : se.splice(Es(e.id), 0, e), to());
}
function to() {
  !wt && !dn && (dn = !0, Dn = Qr.then(ro));
}
function Cs(e) {
  const t = se.indexOf(e);
  t > Te && se.splice(t, 1);
}
function Os(e) {
  k(e) ? rt.push(...e) : (!Pe || !Pe.includes(
    e,
    e.allowRecurse ? Xe + 1 : Xe
  )) && rt.push(e), to();
}
function lr(e, t = wt ? Te + 1 : 0) {
  for (; t < se.length; t++) {
    const n = se[t];
    n && n.pre && (se.splice(t, 1), t--, n());
  }
}
function no(e) {
  if (rt.length) {
    const t = [...new Set(rt)];
    if (rt.length = 0, Pe) {
      Pe.push(...t);
      return;
    }
    for (Pe = t, Pe.sort((n, r) => vt(n) - vt(r)), Xe = 0; Xe < Pe.length; Xe++)
      Pe[Xe]();
    Pe = null, Xe = 0;
  }
}
const vt = (e) => e.id == null ? 1 / 0 : e.id, As = (e, t) => {
  const n = vt(e) - vt(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function ro(e) {
  dn = !1, wt = !0, se.sort(As);
  const t = xe;
  try {
    for (Te = 0; Te < se.length; Te++) {
      const n = se[Te];
      n && n.active !== !1 && je(n, null, 14);
    }
  } finally {
    Te = 0, se.length = 0, no(), wt = !1, Dn = null, (se.length || rt.length) && ro();
  }
}
function ks(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const r = e.vnode.props || J;
  let o = n;
  const s = t.startsWith("update:"), i = s && t.slice(7);
  if (i && i in r) {
    const d = `${i === "modelValue" ? "model" : i}Modifiers`, { number: v, trim: b } = r[d] || J;
    b && (o = n.map((C) => te(C) ? C.trim() : C)), v && (o = n.map(Io));
  }
  let l, c = r[l = en(t)] || // also try camelCase event handler (#2249)
  r[l = en(de(t))];
  !c && s && (c = r[l = en(we(t))]), c && Ee(
    c,
    e,
    6,
    o
  );
  const f = r[l + "Once"];
  if (f) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, Ee(
      f,
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
  const s = e.emits;
  let i = {}, l = !1;
  if (!R(e)) {
    const c = (f) => {
      const d = oo(f, t, !0);
      d && (l = !0, ee(i, d));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !s && !l ? (W(e) && r.set(e, null), null) : (k(s) ? s.forEach((c) => i[c] = null) : ee(i, s), W(e) && r.set(e, i), i);
}
function $t(e, t) {
  return !e || !Bt(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), L(e, t[0].toLowerCase() + t.slice(1)) || L(e, we(t)) || L(e, t));
}
let me = null, so = null;
function Ft(e) {
  const t = me;
  return me = e, so = e && e.type.__scopeId || null, t;
}
function Ss(e, t = me, n) {
  if (!t || e._n)
    return e;
  const r = (...o) => {
    r._d && br(-1);
    const s = Ft(t);
    let i;
    try {
      i = e(...o);
    } finally {
      Ft(s), r._d && br(1);
    }
    return i;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function nn(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: o,
    props: s,
    propsOptions: [i],
    slots: l,
    attrs: c,
    emit: f,
    render: d,
    renderCache: v,
    data: b,
    setupState: C,
    ctx: H,
    inheritAttrs: I
  } = e;
  let $, Y;
  const G = Ft(e);
  try {
    if (n.shapeFlag & 4) {
      const M = o || r;
      $ = Se(
        d.call(
          M,
          M,
          v,
          s,
          C,
          b,
          H
        )
      ), Y = c;
    } else {
      const M = t;
      $ = Se(
        M.length > 1 ? M(
          s,
          { attrs: c, slots: l, emit: f }
        ) : M(
          s,
          null
          /* we know it doesn't need it */
        )
      ), Y = t.props ? c : Ts(c);
    }
  } catch (M) {
    mt.length = 0, Wt(M, e, 1), $ = Ce($e);
  }
  let Z = $;
  if (Y && I !== !1) {
    const M = Object.keys(Y), { shapeFlag: he } = Z;
    M.length && he & 7 && (i && M.some(En) && (Y = Ms(
      Y,
      i
    )), Z = st(Z, Y));
  }
  return n.dirs && (Z = st(Z), Z.dirs = Z.dirs ? Z.dirs.concat(n.dirs) : n.dirs), n.transition && (Z.transition = n.transition), $ = Z, Ft(G), $;
}
const Ts = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Bt(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Ms = (e, t) => {
  const n = {};
  for (const r in e)
    (!En(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
};
function Ps(e, t, n) {
  const { props: r, children: o, component: s } = e, { props: i, children: l, patchFlag: c } = t, f = s.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return r ? ar(r, i, f) : !!i;
    if (c & 8) {
      const d = t.dynamicProps;
      for (let v = 0; v < d.length; v++) {
        const b = d[v];
        if (i[b] !== r[b] && !$t(f, b))
          return !0;
      }
    }
  } else
    return (o || l) && (!l || !l.$stable) ? !0 : r === i ? !1 : r ? i ? ar(r, i, f) : !0 : !!i;
  return !1;
}
function ar(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < r.length; o++) {
    const s = r[o];
    if (t[s] !== e[s] && !$t(n, s))
      return !0;
  }
  return !1;
}
function Rs({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; )
    (e = t.vnode).el = n, t = t.parent;
}
const Is = (e) => e.__isSuspense;
function Ns(e, t) {
  t && t.pendingBranch ? k(e) ? t.effects.push(...e) : t.effects.push(e) : Os(e);
}
function Hs(e, t) {
  return jn(
    e,
    null,
    { flush: "post" }
  );
}
const Pt = {};
function rn(e, t, n) {
  return jn(e, t, n);
}
function jn(e, t, { immediate: n, deep: r, flush: o, onTrack: s, onTrigger: i } = J) {
  var l;
  const c = Bo() === ((l = re) == null ? void 0 : l.scope) ? re : null;
  let f, d = !1, v = !1;
  if (ie(e) ? (f = () => e.value, d = jt(e)) : nt(e) ? (f = () => e, r = !0) : k(e) ? (v = !0, d = e.some((M) => nt(M) || jt(M)), f = () => e.map((M) => {
    if (ie(M))
      return M.value;
    if (nt(M))
      return Qe(M);
    if (R(M))
      return je(M, c, 2);
  })) : R(e) ? t ? f = () => je(e, c, 2) : f = () => {
    if (!(c && c.isUnmounted))
      return b && b(), Ee(
        e,
        c,
        3,
        [C]
      );
  } : f = xe, t && r) {
    const M = f;
    f = () => Qe(M());
  }
  let b, C = (M) => {
    b = G.onStop = () => {
      je(M, c, 4);
    };
  }, H;
  if (xt)
    if (C = xe, t ? n && Ee(t, c, 3, [
      f(),
      v ? [] : void 0,
      C
    ]) : f(), o === "sync") {
      const M = Hi();
      H = M.__watcherHandles || (M.__watcherHandles = []);
    } else
      return xe;
  let I = v ? new Array(e.length).fill(Pt) : Pt;
  const $ = () => {
    if (G.active)
      if (t) {
        const M = G.run();
        (r || d || (v ? M.some(
          (he, V) => _t(he, I[V])
        ) : _t(M, I))) && (b && b(), Ee(t, c, 3, [
          M,
          // pass undefined as the old value when it's changed for the first time
          I === Pt ? void 0 : v && I[0] === Pt ? [] : I,
          C
        ]), I = M);
      } else
        G.run();
  };
  $.allowRecurse = !!t;
  let Y;
  o === "sync" ? Y = $ : o === "post" ? Y = () => ce($, c && c.suspense) : ($.pre = !0, c && ($.id = c.uid), Y = () => Ln($));
  const G = new Tn(f, Y);
  t ? n ? $() : I = G.run() : o === "post" ? ce(
    G.run.bind(G),
    c && c.suspense
  ) : G.run();
  const Z = () => {
    G.stop(), c && c.scope && Cn(c.scope.effects, G);
  };
  return H && H.push(Z), Z;
}
function Ds(e, t, n) {
  const r = this.proxy, o = te(e) ? e.includes(".") ? io(r, e) : () => r[e] : e.bind(r, r);
  let s;
  R(t) ? s = t : (s = t.handler, n = t);
  const i = re;
  it(this);
  const l = jn(o, s.bind(r), n);
  return i ? it(i) : We(), l;
}
function io(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++)
      r = r[n[o]];
    return r;
  };
}
function Qe(e, t) {
  if (!W(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), ie(e))
    Qe(e.value, t);
  else if (k(e))
    for (let n = 0; n < e.length; n++)
      Qe(e[n], t);
  else if (Pr(e) || tt(e))
    e.forEach((n) => {
      Qe(n, t);
    });
  else if (Nr(e))
    for (const n in e)
      Qe(e[n], t);
  return e;
}
function Be(e, t, n, r) {
  const o = e.dirs, s = t && t.dirs;
  for (let i = 0; i < o.length; i++) {
    const l = o[i];
    s && (l.oldValue = s[i].value);
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
  return R(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => ee({ name: e.name }, t, { setup: e }))()
  ) : e;
}
const It = (e) => !!e.type.__asyncLoader, ao = (e) => e.type.__isKeepAlive;
function Ls(e, t) {
  co(e, "a", t);
}
function js(e, t) {
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
  if (qt(t, r, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      ao(o.parent.vnode) && Fs(r, t, n, o), o = o.parent;
  }
}
function Fs(e, t, n, r) {
  const o = qt(
    t,
    e,
    r,
    !0
    /* prepend */
  );
  Fn(() => {
    Cn(r[t], o);
  }, n);
}
function qt(e, t, n = re, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...i) => {
      if (n.isUnmounted)
        return;
      lt(), it(n);
      const l = Ee(t, n, e, i);
      return We(), at(), l;
    });
    return r ? o.unshift(s) : o.push(s), s;
  }
}
const Ne = (e) => (t, n = re) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!xt || e === "sp") && qt(e, (...r) => t(...r), n)
), Us = Ne("bm"), uo = Ne("m"), Vs = Ne("bu"), Bs = Ne("u"), zs = Ne("bum"), Fn = Ne("um"), Xs = Ne("sp"), Js = Ne(
  "rtg"
), Ks = Ne(
  "rtc"
);
function Ws(e, t = re) {
  qt("ec", e, t);
}
const fo = "components";
function $s(e, t) {
  return Ys(fo, e, !0, t) || e;
}
const qs = Symbol.for("v-ndc");
function Ys(e, t, n = !0, r = !1) {
  const o = me || re;
  if (o) {
    const s = o.type;
    if (e === fo) {
      const l = Pi(
        s,
        !1
        /* do not include inferred name to avoid breaking existing code */
      );
      if (l && (l === t || l === de(t) || l === Jt(de(t))))
        return s;
    }
    const i = (
      // local registration
      // check instance[type] first which is resolved for options API
      cr(o[e] || s[e], t) || // global registration
      cr(o.appContext[e], t)
    );
    return !i && r ? s : i;
  }
}
function cr(e, t) {
  return e && (e[t] || e[de(t)] || e[Jt(de(t))]);
}
function Gs(e, t, n, r) {
  let o;
  const s = n && n[r];
  if (k(e) || te(e)) {
    o = new Array(e.length);
    for (let i = 0, l = e.length; i < l; i++)
      o[i] = t(e[i], i, void 0, s && s[i]);
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let i = 0; i < e; i++)
      o[i] = t(i + 1, i, void 0, s && s[i]);
  } else if (W(e))
    if (e[Symbol.iterator])
      o = Array.from(
        e,
        (i, l) => t(i, l, void 0, s && s[l])
      );
    else {
      const i = Object.keys(e);
      o = new Array(i.length);
      for (let l = 0, c = i.length; l < c; l++) {
        const f = i[l];
        o[l] = t(e[f], f, l, s && s[l]);
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
    $options: (e) => Un(e),
    $forceUpdate: (e) => e.f || (e.f = () => Ln(e.update)),
    $nextTick: (e) => e.n || (e.n = eo.bind(e.proxy)),
    $watch: (e) => Ds.bind(e)
  })
), on = (e, t) => e !== J && !e.__isScriptSetup && L(e, t), Zs = {
  get({ _: e }, t) {
    const { ctx: n, setupState: r, data: o, props: s, accessCache: i, type: l, appContext: c } = e;
    let f;
    if (t[0] !== "$") {
      const C = i[t];
      if (C !== void 0)
        switch (C) {
          case 1:
            return r[t];
          case 2:
            return o[t];
          case 4:
            return n[t];
          case 3:
            return s[t];
        }
      else {
        if (on(r, t))
          return i[t] = 1, r[t];
        if (o !== J && L(o, t))
          return i[t] = 2, o[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (f = e.propsOptions[0]) && L(f, t)
        )
          return i[t] = 3, s[t];
        if (n !== J && L(n, t))
          return i[t] = 4, n[t];
        mn && (i[t] = 0);
      }
    }
    const d = ht[t];
    let v, b;
    if (d)
      return t === "$attrs" && ue(e, "get", t), d(e);
    if (
      // css module (injected by vue-loader)
      (v = l.__cssModules) && (v = v[t])
    )
      return v;
    if (n !== J && L(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      b = c.config.globalProperties, L(b, t)
    )
      return b[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: o, ctx: s } = e;
    return on(o, t) ? (o[t] = n, !0) : r !== J && L(r, t) ? (r[t] = n, !0) : L(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (s[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, propsOptions: s }
  }, i) {
    let l;
    return !!n[i] || e !== J && L(e, i) || on(t, i) || (l = s[0]) && L(l, i) || L(r, i) || L(ht, i) || L(o.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : L(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function ur(e) {
  return k(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let mn = !0;
function Qs(e) {
  const t = Un(e), n = e.proxy, r = e.ctx;
  mn = !1, t.beforeCreate && fr(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: s,
    methods: i,
    watch: l,
    provide: c,
    inject: f,
    // lifecycle
    created: d,
    beforeMount: v,
    mounted: b,
    beforeUpdate: C,
    updated: H,
    activated: I,
    deactivated: $,
    beforeDestroy: Y,
    beforeUnmount: G,
    destroyed: Z,
    unmounted: M,
    render: he,
    renderTracked: V,
    renderTriggered: X,
    errorCaptured: P,
    serverPrefetch: N,
    // public API
    expose: S,
    inheritAttrs: le,
    // assets
    components: oe,
    directives: fe,
    filters: ne
  } = t;
  if (f && ei(f, r, null), i)
    for (const q in i) {
      const B = i[q];
      R(B) && (r[q] = B.bind(n));
    }
  if (o) {
    const q = o.call(n, n);
    W(q) && (e.data = In(q));
  }
  if (mn = !0, s)
    for (const q in s) {
      const B = s[q], Ue = R(B) ? B.bind(n, n) : R(B.get) ? B.get.bind(n, n) : xe, Et = !R(B) && R(B.set) ? B.set.bind(n) : xe, Ve = Ii({
        get: Ue,
        set: Et
      });
      Object.defineProperty(r, q, {
        enumerable: !0,
        configurable: !0,
        get: () => Ve.value,
        set: (Oe) => Ve.value = Oe
      });
    }
  if (l)
    for (const q in l)
      po(l[q], r, n, q);
  if (c) {
    const q = R(c) ? c.call(n) : c;
    Reflect.ownKeys(q).forEach((B) => {
      ii(B, q[B]);
    });
  }
  d && fr(d, e, "c");
  function K(q, B) {
    k(B) ? B.forEach((Ue) => q(Ue.bind(n))) : B && q(B.bind(n));
  }
  if (K(Us, v), K(uo, b), K(Vs, C), K(Bs, H), K(Ls, I), K(js, $), K(Ws, P), K(Ks, V), K(Js, X), K(zs, G), K(Fn, M), K(Xs, N), k(S))
    if (S.length) {
      const q = e.exposed || (e.exposed = {});
      S.forEach((B) => {
        Object.defineProperty(q, B, {
          get: () => n[B],
          set: (Ue) => n[B] = Ue
        });
      });
    } else
      e.exposed || (e.exposed = {});
  he && e.render === xe && (e.render = he), le != null && (e.inheritAttrs = le), oe && (e.components = oe), fe && (e.directives = fe);
}
function ei(e, t, n = xe) {
  k(e) && (e = _n(e));
  for (const r in e) {
    const o = e[r];
    let s;
    W(o) ? "default" in o ? s = Nt(
      o.from || r,
      o.default,
      !0
      /* treat default function as factory */
    ) : s = Nt(o.from || r) : s = Nt(o), ie(s) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (i) => s.value = i
    }) : t[r] = s;
  }
}
function fr(e, t, n) {
  Ee(
    k(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function po(e, t, n, r) {
  const o = r.includes(".") ? io(n, r) : () => n[r];
  if (te(e)) {
    const s = t[e];
    R(s) && rn(o, s);
  } else if (R(e))
    rn(o, e.bind(n));
  else if (W(e))
    if (k(e))
      e.forEach((s) => po(s, t, n, r));
    else {
      const s = R(e.handler) ? e.handler.bind(n) : t[e.handler];
      R(s) && rn(o, s, e);
    }
}
function Un(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: o,
    optionsCache: s,
    config: { optionMergeStrategies: i }
  } = e.appContext, l = s.get(t);
  let c;
  return l ? c = l : !o.length && !n && !r ? c = t : (c = {}, o.length && o.forEach(
    (f) => Ut(c, f, i, !0)
  ), Ut(c, t, i)), W(t) && s.set(t, c), c;
}
function Ut(e, t, n, r = !1) {
  const { mixins: o, extends: s } = t;
  s && Ut(e, s, n, !0), o && o.forEach(
    (i) => Ut(e, i, n, !0)
  );
  for (const i in t)
    if (!(r && i === "expose")) {
      const l = ti[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const ti = {
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
  watch: ri,
  // provide / inject
  provide: pr,
  inject: ni
};
function pr(e, t) {
  return t ? e ? function() {
    return ee(
      R(e) ? e.call(this, this) : e,
      R(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function ni(e, t) {
  return dt(_n(e), _n(t));
}
function _n(e) {
  if (k(e)) {
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
  return e ? k(e) && k(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ee(
    /* @__PURE__ */ Object.create(null),
    ur(e),
    ur(t ?? {})
  ) : t;
}
function ri(e, t) {
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
      isNativeTag: ko,
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
let oi = 0;
function si(e, t) {
  return function(r, o = null) {
    R(r) || (r = ee({}, r)), o != null && !W(o) && (o = null);
    const s = ho(), i = /* @__PURE__ */ new Set();
    let l = !1;
    const c = s.app = {
      _uid: oi++,
      _component: r,
      _props: o,
      _container: null,
      _context: s,
      _instance: null,
      version: Di,
      get config() {
        return s.config;
      },
      set config(f) {
      },
      use(f, ...d) {
        return i.has(f) || (f && R(f.install) ? (i.add(f), f.install(c, ...d)) : R(f) && (i.add(f), f(c, ...d))), c;
      },
      mixin(f) {
        return s.mixins.includes(f) || s.mixins.push(f), c;
      },
      component(f, d) {
        return d ? (s.components[f] = d, c) : s.components[f];
      },
      directive(f, d) {
        return d ? (s.directives[f] = d, c) : s.directives[f];
      },
      mount(f, d, v) {
        if (!l) {
          const b = Ce(
            r,
            o
          );
          return b.appContext = s, d && t ? t(b, f) : e(b, f, v), l = !0, c._container = f, f.__vue_app__ = c, Xn(b.component) || b.component.proxy;
        }
      },
      unmount() {
        l && (e(null, c._container), delete c._container.__vue_app__);
      },
      provide(f, d) {
        return s.provides[f] = d, c;
      },
      runWithContext(f) {
        Vt = c;
        try {
          return f();
        } finally {
          Vt = null;
        }
      }
    };
    return c;
  };
}
let Vt = null;
function ii(e, t) {
  if (re) {
    let n = re.provides;
    const r = re.parent && re.parent.provides;
    r === n && (n = re.provides = Object.create(r)), n[e] = t;
  }
}
function Nt(e, t, n = !1) {
  const r = re || me;
  if (r || Vt) {
    const o = r ? r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : Vt._context.provides;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && R(t) ? t.call(r && r.proxy) : t;
  }
}
function li(e, t, n, r = !1) {
  const o = {}, s = {};
  Lt(s, Gt, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), mo(e, t, o, s);
  for (const i in e.propsOptions[0])
    i in o || (o[i] = void 0);
  n ? e.props = r ? o : ms(o) : e.type.props ? e.props = o : e.props = s, e.attrs = s;
}
function ai(e, t, n, r) {
  const {
    props: o,
    attrs: s,
    vnode: { patchFlag: i }
  } = e, l = F(o), [c] = e.propsOptions;
  let f = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (r || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const d = e.vnode.dynamicProps;
      for (let v = 0; v < d.length; v++) {
        let b = d[v];
        if ($t(e.emitsOptions, b))
          continue;
        const C = t[b];
        if (c)
          if (L(s, b))
            C !== s[b] && (s[b] = C, f = !0);
          else {
            const H = de(b);
            o[H] = gn(
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
          C !== s[b] && (s[b] = C, f = !0);
      }
    }
  } else {
    mo(e, t, o, s) && (f = !0);
    let d;
    for (const v in l)
      (!t || // for camelCase
      !L(t, v) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((d = we(v)) === v || !L(t, d))) && (c ? n && // for camelCase
      (n[v] !== void 0 || // for kebab-case
      n[d] !== void 0) && (o[v] = gn(
        c,
        l,
        v,
        void 0,
        e,
        !0
        /* isAbsent */
      )) : delete o[v]);
    if (s !== l)
      for (const v in s)
        (!t || !L(t, v)) && (delete s[v], f = !0);
  }
  f && Ie(e, "set", "$attrs");
}
function mo(e, t, n, r) {
  const [o, s] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let c in t) {
      if (Rt(c))
        continue;
      const f = t[c];
      let d;
      o && L(o, d = de(c)) ? !s || !s.includes(d) ? n[d] = f : (l || (l = {}))[d] = f : $t(e.emitsOptions, c) || (!(c in r) || f !== r[c]) && (r[c] = f, i = !0);
    }
  if (s) {
    const c = F(n), f = l || J;
    for (let d = 0; d < s.length; d++) {
      const v = s[d];
      n[v] = gn(
        o,
        c,
        v,
        f[v],
        e,
        !L(f, v)
      );
    }
  }
  return i;
}
function gn(e, t, n, r, o, s) {
  const i = e[n];
  if (i != null) {
    const l = L(i, "default");
    if (l && r === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && R(c)) {
        const { propsDefaults: f } = o;
        n in f ? r = f[n] : (it(o), r = f[n] = c.call(
          null,
          t
        ), We());
      } else
        r = c;
    }
    i[
      0
      /* shouldCast */
    ] && (s && !l ? r = !1 : i[
      1
      /* shouldCastTrue */
    ] && (r === "" || r === we(n)) && (r = !0));
  }
  return r;
}
function _o(e, t, n = !1) {
  const r = t.propsCache, o = r.get(e);
  if (o)
    return o;
  const s = e.props, i = {}, l = [];
  let c = !1;
  if (!R(e)) {
    const d = (v) => {
      c = !0;
      const [b, C] = _o(v, t, !0);
      ee(i, b), C && l.push(...C);
    };
    !n && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  if (!s && !c)
    return W(e) && r.set(e, et), et;
  if (k(s))
    for (let d = 0; d < s.length; d++) {
      const v = de(s[d]);
      hr(v) && (i[v] = J);
    }
  else if (s)
    for (const d in s) {
      const v = de(d);
      if (hr(v)) {
        const b = s[d], C = i[v] = k(b) || R(b) ? { type: b } : ee({}, b);
        if (C) {
          const H = gr(Boolean, C.type), I = gr(String, C.type);
          C[
            0
            /* shouldCast */
          ] = H > -1, C[
            1
            /* shouldCastTrue */
          ] = I < 0 || H < I, (H > -1 || L(C, "default")) && l.push(v);
        }
      }
    }
  const f = [i, l];
  return W(e) && r.set(e, f), f;
}
function hr(e) {
  return e[0] !== "$";
}
function mr(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function _r(e, t) {
  return mr(e) === mr(t);
}
function gr(e, t) {
  return k(t) ? t.findIndex((n) => _r(n, e)) : R(t) && _r(t, e) ? 0 : -1;
}
const go = (e) => e[0] === "_" || e === "$stable", Vn = (e) => k(e) ? e.map(Se) : [Se(e)], ci = (e, t, n) => {
  if (t._n)
    return t;
  const r = Ss((...o) => Vn(t(...o)), n);
  return r._c = !1, r;
}, bo = (e, t, n) => {
  const r = e._ctx;
  for (const o in e) {
    if (go(o))
      continue;
    const s = e[o];
    if (R(s))
      t[o] = ci(o, s, r);
    else if (s != null) {
      const i = Vn(s);
      t[o] = () => i;
    }
  }
}, wo = (e, t) => {
  const n = Vn(t);
  e.slots.default = () => n;
}, ui = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = F(t), Lt(t, "_", n)) : bo(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && wo(e, t);
  Lt(e.slots, Gt, 1);
}, fi = (e, t, n) => {
  const { vnode: r, slots: o } = e;
  let s = !0, i = J;
  if (r.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? s = !1 : (ee(o, t), !n && l === 1 && delete o._) : (s = !t.$stable, bo(t, o)), i = t;
  } else
    t && (wo(e, t), i = { default: 1 });
  if (s)
    for (const l in o)
      !go(l) && !(l in i) && delete o[l];
};
function bn(e, t, n, r, o = !1) {
  if (k(e)) {
    e.forEach(
      (b, C) => bn(
        b,
        t && (k(t) ? t[C] : t),
        n,
        r,
        o
      )
    );
    return;
  }
  if (It(r) && !o)
    return;
  const s = r.shapeFlag & 4 ? Xn(r.component) || r.component.proxy : r.el, i = o ? null : s, { i: l, r: c } = e, f = t && t.r, d = l.refs === J ? l.refs = {} : l.refs, v = l.setupState;
  if (f != null && f !== c && (te(f) ? (d[f] = null, L(v, f) && (v[f] = null)) : ie(f) && (f.value = null)), R(c))
    je(c, l, 12, [i, d]);
  else {
    const b = te(c), C = ie(c);
    if (b || C) {
      const H = () => {
        if (e.f) {
          const I = b ? L(v, c) ? v[c] : d[c] : c.value;
          o ? k(I) && Cn(I, s) : k(I) ? I.includes(s) || I.push(s) : b ? (d[c] = [s], L(v, c) && (v[c] = d[c])) : (c.value = [s], e.k && (d[e.k] = c.value));
        } else
          b ? (d[c] = i, L(v, c) && (v[c] = i)) : C && (c.value = i, e.k && (d[e.k] = i));
      };
      i ? (H.id = -1, ce(H, n)) : H();
    }
  }
}
const ce = Ns;
function pi(e) {
  return di(e);
}
function di(e, t) {
  const n = an();
  n.__VUE__ = !0;
  const {
    insert: r,
    remove: o,
    patchProp: s,
    createElement: i,
    createText: l,
    createComment: c,
    setText: f,
    setElementText: d,
    parentNode: v,
    nextSibling: b,
    setScopeId: C = xe,
    insertStaticContent: H
  } = e, I = (a, u, p, m = null, h = null, w = null, x = !1, g = null, y = !!u.dynamicChildren) => {
    if (a === u)
      return;
    a && !ft(a, u) && (m = Ct(a), Oe(a, h, w, !0), a = null), u.patchFlag === -2 && (y = !1, u.dynamicChildren = null);
    const { type: _, ref: O, shapeFlag: E } = u;
    switch (_) {
      case Yt:
        $(a, u, p, m);
        break;
      case $e:
        Y(a, u, p, m);
        break;
      case Ht:
        a == null && G(u, p, m, x);
        break;
      case be:
        oe(
          a,
          u,
          p,
          m,
          h,
          w,
          x,
          g,
          y
        );
        break;
      default:
        E & 1 ? he(
          a,
          u,
          p,
          m,
          h,
          w,
          x,
          g,
          y
        ) : E & 6 ? fe(
          a,
          u,
          p,
          m,
          h,
          w,
          x,
          g,
          y
        ) : (E & 64 || E & 128) && _.process(
          a,
          u,
          p,
          m,
          h,
          w,
          x,
          g,
          y,
          qe
        );
    }
    O != null && h && bn(O, a && a.ref, w, u || a, !u);
  }, $ = (a, u, p, m) => {
    if (a == null)
      r(
        u.el = l(u.children),
        p,
        m
      );
    else {
      const h = u.el = a.el;
      u.children !== a.children && f(h, u.children);
    }
  }, Y = (a, u, p, m) => {
    a == null ? r(
      u.el = c(u.children || ""),
      p,
      m
    ) : u.el = a.el;
  }, G = (a, u, p, m) => {
    [a.el, a.anchor] = H(
      a.children,
      u,
      p,
      m,
      a.el,
      a.anchor
    );
  }, Z = ({ el: a, anchor: u }, p, m) => {
    let h;
    for (; a && a !== u; )
      h = b(a), r(a, p, m), a = h;
    r(u, p, m);
  }, M = ({ el: a, anchor: u }) => {
    let p;
    for (; a && a !== u; )
      p = b(a), o(a), a = p;
    o(u);
  }, he = (a, u, p, m, h, w, x, g, y) => {
    x = x || u.type === "svg", a == null ? V(
      u,
      p,
      m,
      h,
      w,
      x,
      g,
      y
    ) : N(
      a,
      u,
      h,
      w,
      x,
      g,
      y
    );
  }, V = (a, u, p, m, h, w, x, g) => {
    let y, _;
    const { type: O, props: E, shapeFlag: A, transition: T, dirs: D } = a;
    if (y = a.el = i(
      a.type,
      w,
      E && E.is,
      E
    ), A & 8 ? d(y, a.children) : A & 16 && P(
      a.children,
      y,
      null,
      m,
      h,
      w && O !== "foreignObject",
      x,
      g
    ), D && Be(a, null, m, "created"), X(y, a, a.scopeId, x, m), E) {
      for (const U in E)
        U !== "value" && !Rt(U) && s(
          y,
          U,
          null,
          E[U],
          w,
          a.children,
          m,
          h,
          Me
        );
      "value" in E && s(y, "value", null, E.value), (_ = E.onVnodeBeforeMount) && ke(_, m, a);
    }
    D && Be(a, null, m, "beforeMount");
    const z = (!h || h && !h.pendingBranch) && T && !T.persisted;
    z && T.beforeEnter(y), r(y, u, p), ((_ = E && E.onVnodeMounted) || z || D) && ce(() => {
      _ && ke(_, m, a), z && T.enter(y), D && Be(a, null, m, "mounted");
    }, h);
  }, X = (a, u, p, m, h) => {
    if (p && C(a, p), m)
      for (let w = 0; w < m.length; w++)
        C(a, m[w]);
    if (h) {
      let w = h.subTree;
      if (u === w) {
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
  }, P = (a, u, p, m, h, w, x, g, y = 0) => {
    for (let _ = y; _ < a.length; _++) {
      const O = a[_] = g ? De(a[_]) : Se(a[_]);
      I(
        null,
        O,
        u,
        p,
        m,
        h,
        w,
        x,
        g
      );
    }
  }, N = (a, u, p, m, h, w, x) => {
    const g = u.el = a.el;
    let { patchFlag: y, dynamicChildren: _, dirs: O } = u;
    y |= a.patchFlag & 16;
    const E = a.props || J, A = u.props || J;
    let T;
    p && ze(p, !1), (T = A.onVnodeBeforeUpdate) && ke(T, p, u, a), O && Be(u, a, p, "beforeUpdate"), p && ze(p, !0);
    const D = h && u.type !== "foreignObject";
    if (_ ? S(
      a.dynamicChildren,
      _,
      g,
      p,
      m,
      D,
      w
    ) : x || B(
      a,
      u,
      g,
      null,
      p,
      m,
      D,
      w,
      !1
    ), y > 0) {
      if (y & 16)
        le(
          g,
          u,
          E,
          A,
          p,
          m,
          h
        );
      else if (y & 2 && E.class !== A.class && s(g, "class", null, A.class, h), y & 4 && s(g, "style", E.style, A.style, h), y & 8) {
        const z = u.dynamicProps;
        for (let U = 0; U < z.length; U++) {
          const Q = z[U], _e = E[Q], Ye = A[Q];
          (Ye !== _e || Q === "value") && s(
            g,
            Q,
            _e,
            Ye,
            h,
            a.children,
            p,
            m,
            Me
          );
        }
      }
      y & 1 && a.children !== u.children && d(g, u.children);
    } else
      !x && _ == null && le(
        g,
        u,
        E,
        A,
        p,
        m,
        h
      );
    ((T = A.onVnodeUpdated) || O) && ce(() => {
      T && ke(T, p, u, a), O && Be(u, a, p, "updated");
    }, m);
  }, S = (a, u, p, m, h, w, x) => {
    for (let g = 0; g < u.length; g++) {
      const y = a[g], _ = u[g], O = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        y.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (y.type === be || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !ft(y, _) || // - In the case of a component, it could contain anything.
        y.shapeFlag & 70) ? v(y.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          p
        )
      );
      I(
        y,
        _,
        O,
        null,
        m,
        h,
        w,
        x,
        !0
      );
    }
  }, le = (a, u, p, m, h, w, x) => {
    if (p !== m) {
      if (p !== J)
        for (const g in p)
          !Rt(g) && !(g in m) && s(
            a,
            g,
            p[g],
            null,
            x,
            u.children,
            h,
            w,
            Me
          );
      for (const g in m) {
        if (Rt(g))
          continue;
        const y = m[g], _ = p[g];
        y !== _ && g !== "value" && s(
          a,
          g,
          _,
          y,
          x,
          u.children,
          h,
          w,
          Me
        );
      }
      "value" in m && s(a, "value", p.value, m.value);
    }
  }, oe = (a, u, p, m, h, w, x, g, y) => {
    const _ = u.el = a ? a.el : l(""), O = u.anchor = a ? a.anchor : l("");
    let { patchFlag: E, dynamicChildren: A, slotScopeIds: T } = u;
    T && (g = g ? g.concat(T) : T), a == null ? (r(_, p, m), r(O, p, m), P(
      u.children,
      p,
      O,
      h,
      w,
      x,
      g,
      y
    )) : E > 0 && E & 64 && A && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    a.dynamicChildren ? (S(
      a.dynamicChildren,
      A,
      p,
      h,
      w,
      x,
      g
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (u.key != null || h && u === h.subTree) && vo(
      a,
      u,
      !0
      /* shallow */
    )) : B(
      a,
      u,
      p,
      O,
      h,
      w,
      x,
      g,
      y
    );
  }, fe = (a, u, p, m, h, w, x, g, y) => {
    u.slotScopeIds = g, a == null ? u.shapeFlag & 512 ? h.ctx.activate(
      u,
      p,
      m,
      x,
      y
    ) : ne(
      u,
      p,
      m,
      h,
      w,
      x,
      y
    ) : j(a, u, y);
  }, ne = (a, u, p, m, h, w, x) => {
    const g = a.component = Oi(
      a,
      m,
      h
    );
    if (ao(a) && (g.ctx.renderer = qe), ki(g), g.asyncDep) {
      if (h && h.registerDep(g, K), !a.el) {
        const y = g.subTree = Ce($e);
        Y(null, y, u, p);
      }
      return;
    }
    K(
      g,
      a,
      u,
      p,
      h,
      w,
      x
    );
  }, j = (a, u, p) => {
    const m = u.component = a.component;
    if (Ps(a, u, p))
      if (m.asyncDep && !m.asyncResolved) {
        q(m, u, p);
        return;
      } else
        m.next = u, Cs(m.update), m.update();
    else
      u.el = a.el, m.vnode = u;
  }, K = (a, u, p, m, h, w, x) => {
    const g = () => {
      if (a.isMounted) {
        let { next: O, bu: E, u: A, parent: T, vnode: D } = a, z = O, U;
        ze(a, !1), O ? (O.el = D.el, q(a, O, x)) : O = D, E && tn(E), (U = O.props && O.props.onVnodeBeforeUpdate) && ke(U, T, O, D), ze(a, !0);
        const Q = nn(a), _e = a.subTree;
        a.subTree = Q, I(
          _e,
          Q,
          // parent may have changed if it's in a teleport
          v(_e.el),
          // anchor may have changed if it's in a fragment
          Ct(_e),
          a,
          h,
          w
        ), O.el = Q.el, z === null && Rs(a, Q.el), A && ce(A, h), (U = O.props && O.props.onVnodeUpdated) && ce(
          () => ke(U, T, O, D),
          h
        );
      } else {
        let O;
        const { el: E, props: A } = u, { bm: T, m: D, parent: z } = a, U = It(u);
        if (ze(a, !1), T && tn(T), !U && (O = A && A.onVnodeBeforeMount) && ke(O, z, u), ze(a, !0), E && Qt) {
          const Q = () => {
            a.subTree = nn(a), Qt(
              E,
              a.subTree,
              a,
              h,
              null
            );
          };
          U ? u.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !a.isUnmounted && Q()
          ) : Q();
        } else {
          const Q = a.subTree = nn(a);
          I(
            null,
            Q,
            p,
            m,
            a,
            h,
            w
          ), u.el = Q.el;
        }
        if (D && ce(D, h), !U && (O = A && A.onVnodeMounted)) {
          const Q = u;
          ce(
            () => ke(O, z, Q),
            h
          );
        }
        (u.shapeFlag & 256 || z && It(z.vnode) && z.vnode.shapeFlag & 256) && a.a && ce(a.a, h), a.isMounted = !0, u = p = m = null;
      }
    }, y = a.effect = new Tn(
      g,
      () => Ln(_),
      a.scope
      // track it in component's effect scope
    ), _ = a.update = () => y.run();
    _.id = a.uid, ze(a, !0), _();
  }, q = (a, u, p) => {
    u.component = a;
    const m = a.vnode.props;
    a.vnode = u, a.next = null, ai(a, u.props, m, p), fi(a, u.children, p), lt(), lr(), at();
  }, B = (a, u, p, m, h, w, x, g, y = !1) => {
    const _ = a && a.children, O = a ? a.shapeFlag : 0, E = u.children, { patchFlag: A, shapeFlag: T } = u;
    if (A > 0) {
      if (A & 128) {
        Et(
          _,
          E,
          p,
          m,
          h,
          w,
          x,
          g,
          y
        );
        return;
      } else if (A & 256) {
        Ue(
          _,
          E,
          p,
          m,
          h,
          w,
          x,
          g,
          y
        );
        return;
      }
    }
    T & 8 ? (O & 16 && Me(_, h, w), E !== _ && d(p, E)) : O & 16 ? T & 16 ? Et(
      _,
      E,
      p,
      m,
      h,
      w,
      x,
      g,
      y
    ) : Me(_, h, w, !0) : (O & 8 && d(p, ""), T & 16 && P(
      E,
      p,
      m,
      h,
      w,
      x,
      g,
      y
    ));
  }, Ue = (a, u, p, m, h, w, x, g, y) => {
    a = a || et, u = u || et;
    const _ = a.length, O = u.length, E = Math.min(_, O);
    let A;
    for (A = 0; A < E; A++) {
      const T = u[A] = y ? De(u[A]) : Se(u[A]);
      I(
        a[A],
        T,
        p,
        null,
        h,
        w,
        x,
        g,
        y
      );
    }
    _ > O ? Me(
      a,
      h,
      w,
      !0,
      !1,
      E
    ) : P(
      u,
      p,
      m,
      h,
      w,
      x,
      g,
      y,
      E
    );
  }, Et = (a, u, p, m, h, w, x, g, y) => {
    let _ = 0;
    const O = u.length;
    let E = a.length - 1, A = O - 1;
    for (; _ <= E && _ <= A; ) {
      const T = a[_], D = u[_] = y ? De(u[_]) : Se(u[_]);
      if (ft(T, D))
        I(
          T,
          D,
          p,
          null,
          h,
          w,
          x,
          g,
          y
        );
      else
        break;
      _++;
    }
    for (; _ <= E && _ <= A; ) {
      const T = a[E], D = u[A] = y ? De(u[A]) : Se(u[A]);
      if (ft(T, D))
        I(
          T,
          D,
          p,
          null,
          h,
          w,
          x,
          g,
          y
        );
      else
        break;
      E--, A--;
    }
    if (_ > E) {
      if (_ <= A) {
        const T = A + 1, D = T < O ? u[T].el : m;
        for (; _ <= A; )
          I(
            null,
            u[_] = y ? De(u[_]) : Se(u[_]),
            p,
            D,
            h,
            w,
            x,
            g,
            y
          ), _++;
      }
    } else if (_ > A)
      for (; _ <= E; )
        Oe(a[_], h, w, !0), _++;
    else {
      const T = _, D = _, z = /* @__PURE__ */ new Map();
      for (_ = D; _ <= A; _++) {
        const pe = u[_] = y ? De(u[_]) : Se(u[_]);
        pe.key != null && z.set(pe.key, _);
      }
      let U, Q = 0;
      const _e = A - D + 1;
      let Ye = !1, $n = 0;
      const ct = new Array(_e);
      for (_ = 0; _ < _e; _++)
        ct[_] = 0;
      for (_ = T; _ <= E; _++) {
        const pe = a[_];
        if (Q >= _e) {
          Oe(pe, h, w, !0);
          continue;
        }
        let Ae;
        if (pe.key != null)
          Ae = z.get(pe.key);
        else
          for (U = D; U <= A; U++)
            if (ct[U - D] === 0 && ft(pe, u[U])) {
              Ae = U;
              break;
            }
        Ae === void 0 ? Oe(pe, h, w, !0) : (ct[Ae - D] = _ + 1, Ae >= $n ? $n = Ae : Ye = !0, I(
          pe,
          u[Ae],
          p,
          null,
          h,
          w,
          x,
          g,
          y
        ), Q++);
      }
      const qn = Ye ? hi(ct) : et;
      for (U = qn.length - 1, _ = _e - 1; _ >= 0; _--) {
        const pe = D + _, Ae = u[pe], Yn = pe + 1 < O ? u[pe + 1].el : m;
        ct[_] === 0 ? I(
          null,
          Ae,
          p,
          Yn,
          h,
          w,
          x,
          g,
          y
        ) : Ye && (U < 0 || _ !== qn[U] ? Ve(Ae, p, Yn, 2) : U--);
      }
    }
  }, Ve = (a, u, p, m, h = null) => {
    const { el: w, type: x, transition: g, children: y, shapeFlag: _ } = a;
    if (_ & 6) {
      Ve(a.component.subTree, u, p, m);
      return;
    }
    if (_ & 128) {
      a.suspense.move(u, p, m);
      return;
    }
    if (_ & 64) {
      x.move(a, u, p, qe);
      return;
    }
    if (x === be) {
      r(w, u, p);
      for (let E = 0; E < y.length; E++)
        Ve(y[E], u, p, m);
      r(a.anchor, u, p);
      return;
    }
    if (x === Ht) {
      Z(a, u, p);
      return;
    }
    if (m !== 2 && _ & 1 && g)
      if (m === 0)
        g.beforeEnter(w), r(w, u, p), ce(() => g.enter(w), h);
      else {
        const { leave: E, delayLeave: A, afterLeave: T } = g, D = () => r(w, u, p), z = () => {
          E(w, () => {
            D(), T && T();
          });
        };
        A ? A(w, D, z) : z();
      }
    else
      r(w, u, p);
  }, Oe = (a, u, p, m = !1, h = !1) => {
    const {
      type: w,
      props: x,
      ref: g,
      children: y,
      dynamicChildren: _,
      shapeFlag: O,
      patchFlag: E,
      dirs: A
    } = a;
    if (g != null && bn(g, null, p, a, !0), O & 256) {
      u.ctx.deactivate(a);
      return;
    }
    const T = O & 1 && A, D = !It(a);
    let z;
    if (D && (z = x && x.onVnodeBeforeUnmount) && ke(z, u, a), O & 6)
      Ao(a.component, p, m);
    else {
      if (O & 128) {
        a.suspense.unmount(p, m);
        return;
      }
      T && Be(a, null, u, "beforeUnmount"), O & 64 ? a.type.remove(
        a,
        u,
        p,
        h,
        qe,
        m
      ) : _ && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (w !== be || E > 0 && E & 64) ? Me(
        _,
        u,
        p,
        !1,
        !0
      ) : (w === be && E & 384 || !h && O & 16) && Me(y, u, p), m && Kn(a);
    }
    (D && (z = x && x.onVnodeUnmounted) || T) && ce(() => {
      z && ke(z, u, a), T && Be(a, null, u, "unmounted");
    }, p);
  }, Kn = (a) => {
    const { type: u, el: p, anchor: m, transition: h } = a;
    if (u === be) {
      Oo(p, m);
      return;
    }
    if (u === Ht) {
      M(a);
      return;
    }
    const w = () => {
      o(p), h && !h.persisted && h.afterLeave && h.afterLeave();
    };
    if (a.shapeFlag & 1 && h && !h.persisted) {
      const { leave: x, delayLeave: g } = h, y = () => x(p, w);
      g ? g(a.el, w, y) : y();
    } else
      w();
  }, Oo = (a, u) => {
    let p;
    for (; a !== u; )
      p = b(a), o(a), a = p;
    o(u);
  }, Ao = (a, u, p) => {
    const { bum: m, scope: h, update: w, subTree: x, um: g } = a;
    m && tn(m), h.stop(), w && (w.active = !1, Oe(x, a, u, p)), g && ce(g, u), ce(() => {
      a.isUnmounted = !0;
    }, u), u && u.pendingBranch && !u.isUnmounted && a.asyncDep && !a.asyncResolved && a.suspenseId === u.pendingId && (u.deps--, u.deps === 0 && u.resolve());
  }, Me = (a, u, p, m = !1, h = !1, w = 0) => {
    for (let x = w; x < a.length; x++)
      Oe(a[x], u, p, m, h);
  }, Ct = (a) => a.shapeFlag & 6 ? Ct(a.component.subTree) : a.shapeFlag & 128 ? a.suspense.next() : b(a.anchor || a.el), Wn = (a, u, p) => {
    a == null ? u._vnode && Oe(u._vnode, null, null, !0) : I(u._vnode || null, a, u, null, null, null, p), lr(), no(), u._vnode = a;
  }, qe = {
    p: I,
    um: Oe,
    m: Ve,
    r: Kn,
    mt: ne,
    mc: P,
    pc: B,
    pbc: S,
    n: Ct,
    o: e
  };
  let Zt, Qt;
  return t && ([Zt, Qt] = t(
    qe
  )), {
    render: Wn,
    hydrate: Zt,
    createApp: si(Wn, Zt)
  };
}
function ze({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function vo(e, t, n = !1) {
  const r = e.children, o = t.children;
  if (k(r) && k(o))
    for (let s = 0; s < r.length; s++) {
      const i = r[s];
      let l = o[s];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = o[s] = De(o[s]), l.el = i.el), n || vo(i, l)), l.type === Yt && (l.el = i.el);
    }
}
function hi(e) {
  const t = e.slice(), n = [0];
  let r, o, s, i, l;
  const c = e.length;
  for (r = 0; r < c; r++) {
    const f = e[r];
    if (f !== 0) {
      if (o = n[n.length - 1], e[o] < f) {
        t[r] = o, n.push(r);
        continue;
      }
      for (s = 0, i = n.length - 1; s < i; )
        l = s + i >> 1, e[n[l]] < f ? s = l + 1 : i = l;
      f < e[n[s]] && (s > 0 && (t[r] = n[s - 1]), n[s] = r);
    }
  }
  for (s = n.length, i = n[s - 1]; s-- > 0; )
    n[s] = i, i = t[i];
  return n;
}
const mi = (e) => e.__isTeleport, be = Symbol.for("v-fgt"), Yt = Symbol.for("v-txt"), $e = Symbol.for("v-cmt"), Ht = Symbol.for("v-stc"), mt = [];
let ye = null;
function Ze(e = !1) {
  mt.push(ye = e ? null : []);
}
function _i() {
  mt.pop(), ye = mt[mt.length - 1] || null;
}
let yt = 1;
function br(e) {
  yt += e;
}
function yo(e) {
  return e.dynamicChildren = yt > 0 ? ye || et : null, _i(), yt > 0 && ye && ye.push(e), e;
}
function ut(e, t, n, r, o, s) {
  return yo(
    Re(
      e,
      t,
      n,
      r,
      o,
      s,
      !0
      /* isBlock */
    )
  );
}
function gi(e, t, n, r, o) {
  return yo(
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
function bi(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function ft(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Gt = "__vInternal", xo = ({ key: e }) => e ?? null, Dt = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? te(e) || ie(e) || R(e) ? { i: me, r: e, k: t, f: !!n } : e : null);
function Re(e, t = null, n = null, r = 0, o = null, s = e === be ? 0 : 1, i = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && xo(t),
    ref: t && Dt(t),
    scopeId: so,
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
    shapeFlag: s,
    patchFlag: r,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: me
  };
  return l ? (Bn(c, n), s & 128 && e.normalize(c)) : n && (c.shapeFlag |= te(n) ? 8 : 16), yt > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  ye && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && ye.push(c), c;
}
const Ce = wi;
function wi(e, t = null, n = null, r = 0, o = null, s = !1) {
  if ((!e || e === qs) && (e = $e), bi(e)) {
    const l = st(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Bn(l, n), yt > 0 && !s && ye && (l.shapeFlag & 6 ? ye[ye.indexOf(e)] = l : ye.push(l)), l.patchFlag |= -2, l;
  }
  if (Ri(e) && (e = e.__vccOpts), t) {
    t = vi(t);
    let { class: l, style: c } = t;
    l && !te(l) && (t.class = gt(l)), W(c) && ($r(c) && !k(c) && (c = ee({}, c)), t.style = kn(c));
  }
  const i = te(e) ? 1 : Is(e) ? 128 : mi(e) ? 64 : W(e) ? 4 : R(e) ? 2 : 0;
  return Re(
    e,
    t,
    n,
    r,
    o,
    i,
    s,
    !0
  );
}
function vi(e) {
  return e ? $r(e) || Gt in e ? ee({}, e) : e : null;
}
function st(e, t, n = !1) {
  const { props: r, ref: o, patchFlag: s, children: i } = e, l = t ? xi(r || {}, t) : r;
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
      n && o ? k(o) ? o.concat(Dt(t)) : [o, Dt(t)] : Dt(t)
    ) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== be ? s === -1 ? 16 : s | 16 : s,
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
    ssContent: e.ssContent && st(e.ssContent),
    ssFallback: e.ssFallback && st(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function yi(e = " ", t = 0) {
  return Ce(Yt, null, e, t);
}
function wr(e = "", t = !1) {
  return t ? (Ze(), gi($e, null, e)) : Ce($e, null, e);
}
function Se(e) {
  return e == null || typeof e == "boolean" ? Ce($e) : k(e) ? Ce(
    be,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? De(e) : Ce(Yt, null, String(e));
}
function De(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : st(e);
}
function Bn(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (k(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Bn(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !(Gt in t) ? t._ctx = me : o === 3 && me && (me.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    R(t) ? (t = { default: t, _ctx: me }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [yi(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function xi(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = gt([t.class, r.class]));
      else if (o === "style")
        t.style = kn([t.style, r.style]);
      else if (Bt(o)) {
        const s = t[o], i = r[o];
        i && s !== i && !(k(s) && s.includes(i)) && (t[o] = s ? [].concat(s, i) : i);
      } else
        o !== "" && (t[o] = r[o]);
  }
  return t;
}
function ke(e, t, n, r = null) {
  Ee(e, t, 7, [
    n,
    r
  ]);
}
const Ei = ho();
let Ci = 0;
function Oi(e, t, n) {
  const r = e.type, o = (t ? t.appContext : e.appContext) || Ei, s = {
    uid: Ci++,
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
    scope: new Uo(
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
    propsOptions: _o(r, o),
    emitsOptions: oo(r, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: J,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: J,
    data: J,
    props: J,
    attrs: J,
    slots: J,
    refs: J,
    setupState: J,
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
  return s.ctx = { _: s }, s.root = t ? t.root : s, s.emit = ks.bind(null, s), e.ce && e.ce(s), s;
}
let re = null;
const Ai = () => re || me;
let zn, Ge, vr = "__VUE_INSTANCE_SETTERS__";
(Ge = an()[vr]) || (Ge = an()[vr] = []), Ge.push((e) => re = e), zn = (e) => {
  Ge.length > 1 ? Ge.forEach((t) => t(e)) : Ge[0](e);
};
const it = (e) => {
  zn(e), e.scope.on();
}, We = () => {
  re && re.scope.off(), zn(null);
};
function Eo(e) {
  return e.vnode.shapeFlag & 4;
}
let xt = !1;
function ki(e, t = !1) {
  xt = t;
  const { props: n, children: r } = e.vnode, o = Eo(e);
  li(e, n, o, t), ui(e, r);
  const s = o ? Si(e, t) : void 0;
  return xt = !1, s;
}
function Si(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = qr(new Proxy(e.ctx, Zs));
  const { setup: r } = n;
  if (r) {
    const o = e.setupContext = r.length > 1 ? Mi(e) : null;
    it(e), lt();
    const s = je(
      r,
      e,
      0,
      [e.props, o]
    );
    if (at(), We(), Rr(s)) {
      if (s.then(We, We), t)
        return s.then((i) => {
          yr(e, i, t);
        }).catch((i) => {
          Wt(i, e, 0);
        });
      e.asyncDep = s;
    } else
      yr(e, s, t);
  } else
    Co(e, t);
}
function yr(e, t, n) {
  R(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : W(t) && (e.setupState = Zr(t)), Co(e, n);
}
let xr;
function Co(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && xr && !r.render) {
      const o = r.template || Un(e).template;
      if (o) {
        const { isCustomElement: s, compilerOptions: i } = e.appContext.config, { delimiters: l, compilerOptions: c } = r, f = ee(
          ee(
            {
              isCustomElement: s,
              delimiters: l
            },
            i
          ),
          c
        );
        r.render = xr(o, f);
      }
    }
    e.render = r.render || xe;
  }
  it(e), lt(), Qs(e), at(), We();
}
function Ti(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(
    e.attrs,
    {
      get(t, n) {
        return ue(e, "get", "$attrs"), t[n];
      }
    }
  ));
}
function Mi(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return Ti(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Xn(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Zr(qr(e.exposed)), {
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
function Pi(e, t = !0) {
  return R(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Ri(e) {
  return R(e) && "__vccOpts" in e;
}
const Ii = (e, t) => ys(e, t, xt), Ni = Symbol.for("v-scx"), Hi = () => Nt(Ni), Di = "3.3.4", Li = "http://www.w3.org/2000/svg", Je = typeof document < "u" ? document : null, Er = Je && /* @__PURE__ */ Je.createElement("template"), ji = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const o = t ? Je.createElementNS(Li, e) : Je.createElement(e, n ? { is: n } : void 0);
    return e === "select" && r && r.multiple != null && o.setAttribute("multiple", r.multiple), o;
  },
  createText: (e) => Je.createTextNode(e),
  createComment: (e) => Je.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Je.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, r, o, s) {
    const i = n ? n.previousSibling : t.lastChild;
    if (o && (o === s || o.nextSibling))
      for (; t.insertBefore(o.cloneNode(!0), n), !(o === s || !(o = o.nextSibling)); )
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
      i ? i.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
};
function Fi(e, t, n) {
  const r = e._vtc;
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
function Ui(e, t, n) {
  const r = e.style, o = te(n);
  if (n && !o) {
    if (t && !te(t))
      for (const s in t)
        n[s] == null && wn(r, s, "");
    for (const s in n)
      wn(r, s, n[s]);
  } else {
    const s = r.display;
    o ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (r.display = s);
  }
}
const Cr = /\s*!important$/;
function wn(e, t, n) {
  if (k(n))
    n.forEach((r) => wn(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const r = Vi(e, t);
    Cr.test(n) ? e.setProperty(
      we(r),
      n.replace(Cr, ""),
      "important"
    ) : e[r] = n;
  }
}
const Or = ["Webkit", "Moz", "ms"], sn = {};
function Vi(e, t) {
  const n = sn[t];
  if (n)
    return n;
  let r = de(t);
  if (r !== "filter" && r in e)
    return sn[t] = r;
  r = Jt(r);
  for (let o = 0; o < Or.length; o++) {
    const s = Or[o] + r;
    if (s in e)
      return sn[t] = s;
  }
  return t;
}
const Ar = "http://www.w3.org/1999/xlink";
function Bi(e, t, n, r, o) {
  if (r && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(Ar, t.slice(6, t.length)) : e.setAttributeNS(Ar, t, n);
  else {
    const s = Fo(t);
    n == null || s && !Hr(n) ? e.removeAttribute(t) : e.setAttribute(t, s ? "" : n);
  }
}
function zi(e, t, n, r, o, s, i) {
  if (t === "innerHTML" || t === "textContent") {
    r && i(r, o, s), e[t] = n ?? "";
    return;
  }
  const l = e.tagName;
  if (t === "value" && l !== "PROGRESS" && // custom elements may use _value internally
  !l.includes("-")) {
    e._value = n;
    const f = l === "OPTION" ? e.getAttribute("value") : e.value, d = n ?? "";
    f !== d && (e.value = d), n == null && e.removeAttribute(t);
    return;
  }
  let c = !1;
  if (n === "" || n == null) {
    const f = typeof e[t];
    f === "boolean" ? n = Hr(n) : n == null && f === "string" ? (n = "", c = !0) : f === "number" && (n = 0, c = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  c && e.removeAttribute(t);
}
function Xi(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function Ji(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
function Ki(e, t, n, r, o = null) {
  const s = e._vei || (e._vei = {}), i = s[t];
  if (r && i)
    i.value = r;
  else {
    const [l, c] = Wi(t);
    if (r) {
      const f = s[t] = Yi(r, o);
      Xi(e, l, f, c);
    } else
      i && (Ji(e, l, i, c), s[t] = void 0);
  }
}
const kr = /(?:Once|Passive|Capture)$/;
function Wi(e) {
  let t;
  if (kr.test(e)) {
    t = {};
    let r;
    for (; r = e.match(kr); )
      e = e.slice(0, e.length - r[0].length), t[r[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : we(e.slice(2)), t];
}
let ln = 0;
const $i = /* @__PURE__ */ Promise.resolve(), qi = () => ln || ($i.then(() => ln = 0), ln = Date.now());
function Yi(e, t) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    Ee(
      Gi(r, n.value),
      t,
      5,
      [r]
    );
  };
  return n.value = e, n.attached = qi(), n;
}
function Gi(e, t) {
  if (k(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((r) => (o) => !o._stopped && r && r(o));
  } else
    return t;
}
const Sr = /^on[a-z]/, Zi = (e, t, n, r, o = !1, s, i, l, c) => {
  t === "class" ? Fi(e, r, o) : t === "style" ? Ui(e, n, r) : Bt(t) ? En(t) || Ki(e, t, n, r, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Qi(e, t, r, o)) ? zi(
    e,
    t,
    r,
    s,
    i,
    l,
    c
  ) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Bi(e, t, r, o));
};
function Qi(e, t, n, r) {
  return r ? !!(t === "innerHTML" || t === "textContent" || t in e && Sr.test(t) && R(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || Sr.test(t) && te(n) ? !1 : t in e;
}
function el(e, t) {
  const n = lo(e);
  class r extends Jn {
    constructor(s) {
      super(n, s, t);
    }
  }
  return r.def = n, r;
}
const tl = typeof HTMLElement < "u" ? HTMLElement : class {
};
class Jn extends tl {
  constructor(t, n = {}, r) {
    super(), this._def = t, this._props = n, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this.shadowRoot && r ? r(this._createVNode(), this.shadowRoot) : (this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, eo(() => {
      this._connected || (Mr(null, this.shadowRoot), this._instance = null);
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
      const { props: s, styles: i } = r;
      let l;
      if (s && !k(s))
        for (const c in s) {
          const f = s[c];
          (f === Number || f && f.type === Number) && (c in this._props && (this._props[c] = Gn(this._props[c])), (l || (l = /* @__PURE__ */ Object.create(null)))[de(c)] = !0);
        }
      this._numberProps = l, o && this._resolveProps(r), this._applyStyles(i), this._update();
    }, n = this._def.__asyncLoader;
    n ? n().then((r) => t(r, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: n } = t, r = k(n) ? n : Object.keys(n || {});
    for (const o of Object.keys(this))
      o[0] !== "_" && r.includes(o) && this._setProp(o, this[o], !0, !1);
    for (const o of r.map(de))
      Object.defineProperty(this, o, {
        get() {
          return this._getProp(o);
        },
        set(s) {
          this._setProp(o, s);
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
    Mr(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const t = Ce(this._def, ee({}, this._props));
    return this._instance || (t.ce = (n) => {
      this._instance = n, n.isCE = !0;
      const r = (s, i) => {
        this.dispatchEvent(
          new CustomEvent(s, {
            detail: i
          })
        );
      };
      n.emit = (s, ...i) => {
        r(s, i), we(s) !== s && r(we(s), i);
      };
      let o = this;
      for (; o = o && (o.parentNode || o.host); )
        if (o instanceof Jn) {
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
  const t = Ai();
  if (!t)
    return;
  const n = t.ut = (o = e(t.proxy)) => {
    Array.from(
      document.querySelectorAll(`[data-v-owner="${t.uid}"]`)
    ).forEach((s) => yn(s, o));
  }, r = () => {
    const o = e(t.proxy);
    vn(t.subTree, o), n(o);
  };
  Hs(r), uo(() => {
    const o = new MutationObserver(r);
    o.observe(t.subTree.el.parentNode, { childList: !0 }), Fn(() => o.disconnect());
  });
}
function vn(e, t) {
  if (e.shapeFlag & 128) {
    const n = e.suspense;
    e = n.activeBranch, n.pendingBranch && !n.isHydrating && n.effects.push(() => {
      vn(n.activeBranch, t);
    });
  }
  for (; e.component; )
    e = e.component.subTree;
  if (e.shapeFlag & 1 && e.el)
    yn(e.el, t);
  else if (e.type === be)
    e.children.forEach((n) => vn(n, t));
  else if (e.type === Ht) {
    let { el: n, anchor: r } = e;
    for (; n && (yn(n, t), n !== r); )
      n = n.nextSibling;
  }
}
function yn(e, t) {
  if (e.nodeType === 1) {
    const n = e.style;
    for (const r in t)
      n.setProperty(`--${r}`, t[r]);
  }
}
const rl = /* @__PURE__ */ ee({ patchProp: Zi }, ji);
let Tr;
function ol() {
  return Tr || (Tr = pi(rl));
}
const Mr = (...e) => {
  ol().render(...e);
};
var sl = { exports: {} };
(function(e, t) {
  (function(n, r, o, s, i) {
    if ("customElements" in o)
      i();
    else {
      if (o.AWAITING_WEB_COMPONENTS_POLYFILL)
        return void o.AWAITING_WEB_COMPONENTS_POLYFILL.then(i);
      var l = o.AWAITING_WEB_COMPONENTS_POLYFILL = d();
      l.then(i);
      var c = o.WEB_COMPONENTS_POLYFILL || "//cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.0.2/webcomponents-bundle.js", f = o.ES6_CORE_POLYFILL || "//cdnjs.cloudflare.com/ajax/libs/core-js/2.5.3/core.min.js";
      "Promise" in o ? v(c).then(function() {
        l.isDone = !0, l.exec();
      }) : v(f).then(function() {
        v(c).then(function() {
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
    function v(b) {
      var C = d(), H = s.createElement("script");
      return H.type = "text/javascript", H.readyState ? H.onreadystatechange = function() {
        H.readyState != "loaded" && H.readyState != "complete" || (H.onreadystatechange = null, C.isDone = !0, C.exec());
      } : H.onload = function() {
        C.isDone = !0, C.exec();
      }, H.src = b, s.getElementsByTagName("head")[0].appendChild(H), H.then = C.then, H;
    }
  })(0, 0, window, document, function() {
    var n;
    n = function() {
      return function(r) {
        var o = {};
        function s(i) {
          if (o[i])
            return o[i].exports;
          var l = o[i] = { i, l: !1, exports: {} };
          return r[i].call(l.exports, l, l.exports, s), l.l = !0, l.exports;
        }
        return s.m = r, s.c = o, s.d = function(i, l, c) {
          s.o(i, l) || Object.defineProperty(i, l, { enumerable: !0, get: c });
        }, s.r = function(i) {
          typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(i, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(i, "__esModule", { value: !0 });
        }, s.t = function(i, l) {
          if (1 & l && (i = s(i)), 8 & l || 4 & l && typeof i == "object" && i && i.__esModule)
            return i;
          var c = /* @__PURE__ */ Object.create(null);
          if (s.r(c), Object.defineProperty(c, "default", { enumerable: !0, value: i }), 2 & l && typeof i != "string")
            for (var f in i)
              s.d(c, f, (function(d) {
                return i[d];
              }).bind(null, f));
          return c;
        }, s.n = function(i) {
          var l = i && i.__esModule ? function() {
            return i.default;
          } : function() {
            return i;
          };
          return s.d(l, "a", l), l;
        }, s.o = function(i, l) {
          return Object.prototype.hasOwnProperty.call(i, l);
        }, s.p = "", s(s.s = 5);
      }([function(r, o) {
        r.exports = function(s) {
          var i = [];
          return i.toString = function() {
            return this.map(function(l) {
              var c = function(f, d) {
                var v, b = f[1] || "", C = f[3];
                if (!C)
                  return b;
                if (d && typeof btoa == "function") {
                  var H = (v = C, "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(v)))) + " */"), I = C.sources.map(function($) {
                    return "/*# sourceURL=" + C.sourceRoot + $ + " */";
                  });
                  return [b].concat(I).concat([H]).join(`
`);
                }
                return [b].join(`
`);
              }(l, s);
              return l[2] ? "@media " + l[2] + "{" + c + "}" : c;
            }).join("");
          }, i.i = function(l, c) {
            typeof l == "string" && (l = [[null, l, ""]]);
            for (var f = {}, d = 0; d < this.length; d++) {
              var v = this[d][0];
              typeof v == "number" && (f[v] = !0);
            }
            for (d = 0; d < l.length; d++) {
              var b = l[d];
              typeof b[0] == "number" && f[b[0]] || (c && !b[2] ? b[2] = c : c && (b[2] = "(" + b[2] + ") and (" + c + ")"), i.push(b));
            }
          }, i;
        };
      }, function(r, o, s) {
        var i = s(3);
        r.exports = typeof i == "string" ? i : i.toString();
      }, function(r, o, s) {
        var i = s(4);
        r.exports = typeof i == "string" ? i : i.toString();
      }, function(r, o, s) {
        (r.exports = s(0)(!1)).push([r.i, "@-webkit-keyframes spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}@keyframes spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}@-webkit-keyframes burst{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}90%{-webkit-transform:scale(1.5);transform:scale(1.5);opacity:0}}@keyframes burst{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}90%{-webkit-transform:scale(1.5);transform:scale(1.5);opacity:0}}@-webkit-keyframes flashing{0%{opacity:1}45%{opacity:0}90%{opacity:1}}@keyframes flashing{0%{opacity:1}45%{opacity:0}90%{opacity:1}}@-webkit-keyframes fade-left{0%{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}75%{-webkit-transform:translateX(-20px);transform:translateX(-20px);opacity:0}}@keyframes fade-left{0%{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}75%{-webkit-transform:translateX(-20px);transform:translateX(-20px);opacity:0}}@-webkit-keyframes fade-right{0%{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}75%{-webkit-transform:translateX(20px);transform:translateX(20px);opacity:0}}@keyframes fade-right{0%{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}75%{-webkit-transform:translateX(20px);transform:translateX(20px);opacity:0}}@-webkit-keyframes fade-up{0%{-webkit-transform:translateY(0);transform:translateY(0);opacity:1}75%{-webkit-transform:translateY(-20px);transform:translateY(-20px);opacity:0}}@keyframes fade-up{0%{-webkit-transform:translateY(0);transform:translateY(0);opacity:1}75%{-webkit-transform:translateY(-20px);transform:translateY(-20px);opacity:0}}@-webkit-keyframes fade-down{0%{-webkit-transform:translateY(0);transform:translateY(0);opacity:1}75%{-webkit-transform:translateY(20px);transform:translateY(20px);opacity:0}}@keyframes fade-down{0%{-webkit-transform:translateY(0);transform:translateY(0);opacity:1}75%{-webkit-transform:translateY(20px);transform:translateY(20px);opacity:0}}@-webkit-keyframes tada{0%{-webkit-transform:scaleX(1);transform:scaleX(1)}10%,20%{-webkit-transform:scale3d(.95,.95,.95) rotate(-10deg);transform:scale3d(.95,.95,.95) rotate(-10deg)}30%,50%,70%,90%{-webkit-transform:scaleX(1) rotate(10deg);transform:scaleX(1) rotate(10deg)}40%,60%,80%{-webkit-transform:scaleX(1) rotate(-10deg);transform:scaleX(1) rotate(-10deg)}to{-webkit-transform:scaleX(1);transform:scaleX(1)}}@keyframes tada{0%{-webkit-transform:scaleX(1);transform:scaleX(1)}10%,20%{-webkit-transform:scale3d(.95,.95,.95) rotate(-10deg);transform:scale3d(.95,.95,.95) rotate(-10deg)}30%,50%,70%,90%{-webkit-transform:scaleX(1) rotate(10deg);transform:scaleX(1) rotate(10deg)}40%,60%,80%{-webkit-transform:rotate(-10deg);transform:rotate(-10deg)}to{-webkit-transform:scaleX(1);transform:scaleX(1)}}.bx-spin,.bx-spin-hover:hover{-webkit-animation:spin 2s linear infinite;animation:spin 2s linear infinite}.bx-tada,.bx-tada-hover:hover{-webkit-animation:tada 1.5s ease infinite;animation:tada 1.5s ease infinite}.bx-flashing,.bx-flashing-hover:hover{-webkit-animation:flashing 1.5s infinite linear;animation:flashing 1.5s infinite linear}.bx-burst,.bx-burst-hover:hover{-webkit-animation:burst 1.5s infinite linear;animation:burst 1.5s infinite linear}.bx-fade-up,.bx-fade-up-hover:hover{-webkit-animation:fade-up 1.5s infinite linear;animation:fade-up 1.5s infinite linear}.bx-fade-down,.bx-fade-down-hover:hover{-webkit-animation:fade-down 1.5s infinite linear;animation:fade-down 1.5s infinite linear}.bx-fade-left,.bx-fade-left-hover:hover{-webkit-animation:fade-left 1.5s infinite linear;animation:fade-left 1.5s infinite linear}.bx-fade-right,.bx-fade-right-hover:hover{-webkit-animation:fade-right 1.5s infinite linear;animation:fade-right 1.5s infinite linear}", ""]);
      }, function(r, o, s) {
        (r.exports = s(0)(!1)).push([r.i, '.bx-rotate-90{transform:rotate(90deg);-ms-filter:"progid:DXImageTransform.Microsoft.BasicImage(rotation=1)"}.bx-rotate-180{transform:rotate(180deg);-ms-filter:"progid:DXImageTransform.Microsoft.BasicImage(rotation=2)"}.bx-rotate-270{transform:rotate(270deg);-ms-filter:"progid:DXImageTransform.Microsoft.BasicImage(rotation=3)"}.bx-flip-horizontal{transform:scaleX(-1);-ms-filter:"progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)"}.bx-flip-vertical{transform:scaleY(-1);-ms-filter:"progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)"}', ""]);
      }, function(r, o, s) {
        s.r(o), s.d(o, "BoxIconElement", function() {
          return he;
        });
        var i, l, c, f, d = s(1), v = s.n(d), b = s(2), C = s.n(b), H = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(V) {
          return typeof V;
        } : function(V) {
          return V && typeof Symbol == "function" && V.constructor === Symbol && V !== Symbol.prototype ? "symbol" : typeof V;
        }, I = function() {
          function V(X, P) {
            for (var N = 0; N < P.length; N++) {
              var S = P[N];
              S.enumerable = S.enumerable || !1, S.configurable = !0, "value" in S && (S.writable = !0), Object.defineProperty(X, S.key, S);
            }
          }
          return function(X, P, N) {
            return P && V(X.prototype, P), N && V(X, N), X;
          };
        }(), $ = (l = (i = Object).getPrototypeOf || function(V) {
          return V.__proto__;
        }, c = i.setPrototypeOf || function(V, X) {
          return V.__proto__ = X, V;
        }, f = (typeof Reflect > "u" ? "undefined" : H(Reflect)) === "object" ? Reflect.construct : function(V, X, P) {
          var N, S = [null];
          return S.push.apply(S, X), N = V.bind.apply(V, S), c(new N(), P.prototype);
        }, function(V) {
          var X = l(V);
          return c(V, c(function() {
            return f(X, arguments, l(this).constructor);
          }, X));
        }), Y = window, G = {}, Z = document.createElement("template"), M = function() {
          return !!Y.ShadyCSS;
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
` + v.a + `
` + C.a + `
</style>
<div id="icon"></div>`;
        var he = $(function(V) {
          function X() {
            (function(N, S) {
              if (!(N instanceof S))
                throw new TypeError("Cannot call a class as a function");
            })(this, X);
            var P = function(N, S) {
              if (!N)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !S || typeof S != "object" && typeof S != "function" ? N : S;
            }(this, (X.__proto__ || Object.getPrototypeOf(X)).call(this));
            return P.$ui = P.attachShadow({ mode: "open" }), P.$ui.appendChild(P.ownerDocument.importNode(Z.content, !0)), M() && Y.ShadyCSS.styleElement(P), P._state = { $iconHolder: P.$ui.getElementById("icon"), type: P.getAttribute("type") }, P;
          }
          return function(P, N) {
            if (typeof N != "function" && N !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof N);
            P.prototype = Object.create(N && N.prototype, { constructor: { value: P, enumerable: !1, writable: !0, configurable: !0 } }), N && (Object.setPrototypeOf ? Object.setPrototypeOf(P, N) : P.__proto__ = N);
          }(X, HTMLElement), I(X, null, [{ key: "getIconSvg", value: function(P, N) {
            var S = this.cdnUrl + "/regular/bx-" + P + ".svg";
            return N === "solid" ? S = this.cdnUrl + "/solid/bxs-" + P + ".svg" : N === "logo" && (S = this.cdnUrl + "/logos/bxl-" + P + ".svg"), S && G[S] || (G[S] = new Promise(function(le, oe) {
              var fe = new XMLHttpRequest();
              fe.addEventListener("load", function() {
                this.status < 200 || this.status >= 300 ? oe(new Error(this.status + " " + this.responseText)) : le(this.responseText);
              }), fe.onerror = oe, fe.onabort = oe, fe.open("GET", S), fe.send();
            })), G[S];
          } }, { key: "define", value: function(P) {
            P = P || this.tagName, M() && Y.ShadyCSS.prepareTemplate(Z, P), customElements.define(P, this);
          } }, { key: "cdnUrl", get: function() {
            return "//unpkg.com/boxicons@2.1.4/svg";
          } }, { key: "tagName", get: function() {
            return "box-icon";
          } }, { key: "observedAttributes", get: function() {
            return ["type", "name", "color", "size", "rotate", "flip", "animation", "border", "pull"];
          } }]), I(X, [{ key: "attributeChangedCallback", value: function(P, N, S) {
            var le = this._state.$iconHolder;
            switch (P) {
              case "type":
                (function(oe, fe, ne) {
                  var j = oe._state;
                  j.$iconHolder.textContent = "", j.type && (j.type = null), j.type = !ne || ne !== "solid" && ne !== "logo" ? "regular" : ne, j.currentName !== void 0 && oe.constructor.getIconSvg(j.currentName, j.type).then(function(K) {
                    j.type === ne && (j.$iconHolder.innerHTML = K);
                  }).catch(function(K) {
                    console.error("Failed to load icon: " + j.currentName + `
` + K);
                  });
                })(this, 0, S);
                break;
              case "name":
                (function(oe, fe, ne) {
                  var j = oe._state;
                  j.currentName = ne, j.$iconHolder.textContent = "", ne && j.type !== void 0 && oe.constructor.getIconSvg(ne, j.type).then(function(K) {
                    j.currentName === ne && (j.$iconHolder.innerHTML = K);
                  }).catch(function(K) {
                    console.error("Failed to load icon: " + ne + `
` + K);
                  });
                })(this, 0, S);
                break;
              case "color":
                le.style.fill = S || "";
                break;
              case "size":
                (function(oe, fe, ne) {
                  var j = oe._state;
                  j.size && (j.$iconHolder.style.width = j.$iconHolder.style.height = "", j.size = j.sizeType = null), ne && !/^(xs|sm|md|lg)$/.test(j.size) && (j.size = ne.trim(), j.$iconHolder.style.width = j.$iconHolder.style.height = j.size);
                })(this, 0, S);
                break;
              case "rotate":
                N && le.classList.remove("bx-rotate-" + N), S && le.classList.add("bx-rotate-" + S);
                break;
              case "flip":
                N && le.classList.remove("bx-flip-" + N), S && le.classList.add("bx-flip-" + S);
                break;
              case "animation":
                N && le.classList.remove("bx-" + N), S && le.classList.add("bx-" + S);
            }
          } }, { key: "connectedCallback", value: function() {
            M() && Y.ShadyCSS.styleElement(this);
          } }]), X;
        }());
        o.default = he, he.define();
      }]);
    }, e.exports = n();
  });
})(sl);
const il = { class: "font-bold text-lg px-6 py-4 title" }, ll = {
  key: 0,
  class: "btn mx-6 mb-4 p-2 rounded relative"
}, al = { class: "flex flex-row justify-between p-4 tips-content" }, cl = { class: "text-sm" }, ul = ["src"], fl = { class: "text-xs pt-1" }, pl = { class: "flex justify-center items-center" }, dl = { class: "ml-1 text-xs" }, hl = /* @__PURE__ */ lo({
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
      "6204b65e": r.value.borderColor,
      "7d9e6158": r.value.bgColor,
      "1313ce44": r.value.titleTextColor,
      "7259e040": r.value.btnTextColor,
      c2a2dcd0: r.value.tipsTextColor,
      "2cc2ea00": r.value.tipsBgColor,
      "04c1c2a8": r.value.btnBgColor
    }));
    const n = ir([]);
    n.value = JSON.parse(t.items);
    const r = ir({
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
    return r.value = JSON.parse(t.cardStyle), (o, s) => {
      const i = $s("box-icon");
      return Ze(), ut("div", {
        class: gt(["justify-center items-center tip-card rounded", r.value.cardBorderAlign])
      }, [
        Re("p", il, Ot(o.info), 1),
        o.showBtn ? (Ze(), ut("button", ll, [
          n.value.length > 0 ? (Ze(), ut("div", {
            key: 0,
            class: gt([n.value.length > 0 ? "cursor-pointer " + r.value.tipsDirection : "cursor-default", "tips rounded"])
          }, [
            Re("div", al, [
              (Ze(!0), ut(be, null, Gs(n.value, (l) => (Ze(), ut("div", {
                key: l.name,
                class: "flex flex-col justify-center items-center text-center px-2"
              }, [
                Re("span", cl, Ot(l.name), 1),
                Re("img", {
                  class: "icon",
                  src: l.image
                }, null, 8, ul),
                Re("span", fl, Ot(l.desc), 1)
              ]))), 128))
            ])
          ], 2)) : wr("", !0),
          Re("div", pl, [
            Ce(i, {
              name: o.btnIcon,
              class: "btn-icon",
              color: r.value.btnTextColor
            }, null, 8, ["name", "color"]),
            Re("span", dl, Ot(o.btnName), 1)
          ])
        ])) : wr("", !0)
      ], 2);
    };
  }
}), ml = `*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: ""}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.absolute{position:absolute}.relative{position:relative}.mx-6{margin-left:1.5rem;margin-right:1.5rem}.mb-4{margin-bottom:1rem}.ml-1{margin-left:.25rem}.flex{display:flex}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.cursor-default{cursor:default}.cursor-pointer{cursor:pointer}.flex-row{flex-direction:row}.flex-col{flex-direction:column}.items-center{align-items:center}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.rounded{border-radius:.25rem}.border{border-width:1px}.p-2{padding:.5rem}.p-4{padding:1rem}.px-2{padding-left:.5rem;padding-right:.5rem}.px-6{padding-left:1.5rem;padding-right:1.5rem}.py-4{padding-top:1rem;padding-bottom:1rem}.pt-1{padding-top:.25rem}.text-center{text-align:center}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xs{font-size:.75rem;line-height:1rem}.font-bold{font-weight:700}.drop-shadow{--tw-drop-shadow: drop-shadow(0 1px 2px rgb(0 0 0 / .1)) drop-shadow(0 1px 1px rgb(0 0 0 / .06));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.tip-card{--border-color: var(--6204b65e);--bg-color: var(--7d9e6158);--title-text-color: var(--1313ce44);--btn-text-color: var(--7259e040);--tips-text-color: var(--c2a2dcd0);--tips-bg-color: var(--2cc2ea00);--btn-bg-color: var(--04c1c2a8);position:relative;background-color:var(--bg-color)}.tip-card:before{content:"";height:100%;width:.25rem;position:absolute;background-color:var(--btn-bg-color)}.tip-card.left:before{left:0}.tip-card.right:before{right:0}.title{color:var(--title-text-color)}.tips{position:absolute;display:none;z-index:10;background-color:var(--tips-bg-color);border:1px solid var(--border-color);filter:drop-shadow(1px 1px 1px var(--border-color));transition:all .3s;color:var(--tips-text-color)}.tips.left{right:calc(100% + .5rem);bottom:calc(100% - 2rem)}.tips.right{left:calc(100% + .5rem);bottom:calc(100% - 2rem)}.tips.mid{left:50%;transform:translate(-50%);bottom:calc(100% + 10px)}.tips .icon{width:10rem;max-width:inherit;height:10rem;margin-top:.25rem}.tips-content{position:relative}.tips-content:before{content:"";position:absolute;width:.5rem;height:.5rem;background:var(--tips-bg-color);border-radius:1px}.tips.mid>.tips-content:before{left:50%;transform:rotate(45deg);bottom:-.25rem;border-bottom:1px solid var(--border-color);border-right:1px solid var(--border-color)}.tips.left>.tips-content:before{right:-.25rem;bottom:.5rem;transform:rotate(45deg);border-top:1px solid var(--border-color);border-right:1px solid var(--border-color)}.tips.right>.tips-content:before{left:-.25rem;bottom:.5rem;transform:rotate(45deg);border-bottom:1px solid var(--border-color);border-left:1px solid var(--border-color)}.btn{height:auto;background-color:var(--btn-bg-color);color:var(--btn-text-color)}.btn:hover .tips{display:flex}.btn-icon{width:14px}
`, _l = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, o] of t)
    n[r] = o;
  return n;
}, gl = /* @__PURE__ */ _l(hl, [["styles", [ml]]]), bl = el(gl);
customElements.define("charlie-article-panel", bl);
