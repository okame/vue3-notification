import { defineComponent as $, openBlock as a, createBlock as T, TransitionGroup as S, withCtx as v, renderSlot as A, createElementBlock as f, normalizeStyle as h, resolveDynamicComponent as B, Fragment as H, renderList as M, normalizeClass as D, createElementVNode as C, createCommentVNode as R } from "vue";
function V(t) {
  return { all: t = t || /* @__PURE__ */ new Map(), on: function(e, i) {
    var o = t.get(e);
    o ? o.push(i) : t.set(e, [i]);
  }, off: function(e, i) {
    var o = t.get(e);
    o && (i ? o.splice(o.indexOf(i) >>> 0, 1) : t.set(e, []));
  }, emit: function(e, i) {
    var o = t.get(e);
    o && o.slice().map(function(s) {
      s(i);
    }), (o = t.get("*")) && o.slice().map(function(s) {
      s(e, i);
    });
  } };
}
const c = V(), k = /* @__PURE__ */ new Map(), N = {
  x: ["left", "center", "right"],
  y: ["top", "bottom"]
}, W = ((t) => () => t++)(0), Y = (t) => typeof t != "string" ? [] : t.split(/\s+/gi).filter((e) => e), j = (t) => {
  typeof t == "string" && (t = Y(t));
  let e = null, i = null;
  return t.forEach((o) => {
    N.y.indexOf(o) !== -1 && (i = o), N.x.indexOf(o) !== -1 && (e = o);
  }), { x: e, y: i };
};
class G {
  constructor(e, i, o) {
    this.remaining = i, this.callback = e, this.notifyItem = o, this.resume();
  }
  pause() {
    clearTimeout(this.notifyItem.timer), this.remaining -= Date.now() - this.start;
  }
  resume() {
    this.start = Date.now(), clearTimeout(this.notifyItem.timer), this.notifyItem.timer = setTimeout(this.callback, this.remaining);
  }
}
const y = {
  position: ["top", "right"],
  cssAnimation: "vn-fade",
  velocityAnimation: {
    enter: (t) => ({
      height: [t.clientHeight, 0],
      opacity: [1, 0]
    }),
    leave: {
      height: 0,
      opacity: [0, 1]
    }
  }
}, z = $({
  name: "velocity-group",
  emits: ["after-leave", "leave", "enter"],
  methods: {
    enter(t, e) {
      this.$emit("enter", t, e);
    },
    leave(t, e) {
      this.$emit("leave", t, e);
    },
    afterLeave() {
      this.$emit("after-leave");
    }
  }
}), b = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [o, s] of e)
    i[o] = s;
  return i;
};
function F(t, e, i, o, s, u) {
  return a(), T(S, {
    tag: "span",
    css: !1,
    onEnter: t.enter,
    onLeave: t.leave,
    onAfterLeave: t.afterLeave
  }, {
    default: v(() => [
      A(t.$slots, "default")
    ]),
    _: 3
  }, 8, ["onEnter", "onLeave", "onAfterLeave"]);
}
const P = /* @__PURE__ */ b(z, [["render", F]]), q = $({
  name: "css-group",
  inheritAttrs: !1,
  props: {
    name: { type: String, required: !0 }
  }
});
function J(t, e, i, o, s, u) {
  return a(), T(S, {
    tag: "span",
    name: t.name
  }, {
    default: v(() => [
      A(t.$slots, "default")
    ]),
    _: 3
  }, 8, ["name"]);
}
const K = /* @__PURE__ */ b(q, [["render", J]]), g = "[-+]?[0-9]*.?[0-9]+", I = [
  {
    name: "px",
    regexp: new RegExp(`^${g}px$`)
  },
  {
    name: "%",
    regexp: new RegExp(`^${g}%$`)
  },
  /**
   * Fallback option
   * If no suffix specified, assigning "px"
   */
  {
    name: "px",
    regexp: new RegExp(`^${g}$`)
  }
], Q = (t) => {
  if (t === "auto")
    return {
      type: t,
      value: 0
    };
  for (let e = 0; e < I.length; e++) {
    const i = I[e];
    if (i.regexp.test(t))
      return {
        type: i.name,
        value: parseFloat(t)
      };
  }
  return {
    type: "",
    value: t
  };
}, U = (t) => {
  switch (typeof t) {
    case "number":
      return { type: "px", value: t };
    case "string":
      return Q(t);
    default:
      return { type: "", value: t };
  }
}, d = {
  IDLE: 0,
  DESTROYED: 2
}, X = $({
  name: "notifications",
  components: {
    VelocityGroup: P,
    CssGroup: K
  },
  props: {
    group: {
      type: String,
      default: ""
    },
    width: {
      type: [Number, String],
      default: 300
    },
    reverse: {
      type: Boolean,
      default: !1
    },
    position: {
      type: [String, Array],
      default: y.position
    },
    classes: {
      type: String,
      default: "vue-notification"
    },
    animationType: {
      type: String,
      default: "css"
    },
    animation: {
      type: Object,
      default: y.velocityAnimation
    },
    animationName: {
      type: String,
      default: y.cssAnimation
    },
    speed: {
      type: Number,
      default: 300
    },
    /* Todo */
    cooldown: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 3e3
    },
    delay: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 1 / 0
    },
    ignoreDuplicates: {
      type: Boolean,
      default: !1
    },
    closeOnClick: {
      type: Boolean,
      default: !0
    },
    pauseOnHover: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["click", "destroy", "start"],
  data() {
    return {
      list: [],
      velocity: k.get("velocity"),
      timerControl: null
    };
  },
  computed: {
    actualWidth() {
      return U(this.width);
    },
    isVA() {
      return this.animationType === "velocity";
    },
    componentName() {
      return this.isVA ? "velocity-group" : "css-group";
    },
    styles() {
      const { x: t, y: e } = j(this.position), i = this.actualWidth.value, o = this.actualWidth.type, s = {
        width: i + o
      };
      return e && (s[e] = "0px"), t && (t === "center" ? s.left = `calc(50% - ${+i / 2}${o})` : s[t] = "0px"), s;
    },
    active() {
      return this.list.filter((t) => t.state !== d.DESTROYED);
    },
    botToTop() {
      return this.styles.hasOwnProperty("bottom");
    }
  },
  mounted() {
    c.on("add", this.addItem), c.on("close", this.closeItem), c.on("closeAll", this.closeItemAll);
  },
  methods: {
    destroyIfNecessary(t) {
      this.$emit("click", t), this.closeOnClick && this.destroy(t);
    },
    pauseTimeout() {
      var t;
      this.pauseOnHover && ((t = this.timerControl) == null || t.pause());
    },
    resumeTimeout() {
      var t;
      this.pauseOnHover && ((t = this.timerControl) == null || t.resume());
    },
    addItem(t = {}) {
      if (t.group || (t.group = ""), t.data || (t.data = {}), this.group !== t.group)
        return;
      if (t.clean || t.clear) {
        this.destroyAll();
        return;
      }
      const e = typeof t.duration == "number" ? t.duration : this.duration, i = typeof t.speed == "number" ? t.speed : this.speed, o = typeof t.ignoreDuplicates == "boolean" ? t.ignoreDuplicates : this.ignoreDuplicates, { title: s, text: u, type: n, data: l, id: w, color: L, backgroundColor: O } = t, r = {
        id: w || W(),
        title: s,
        text: u,
        type: n,
        state: d.IDLE,
        speed: i,
        length: e + 2 * i,
        data: l,
        color: L,
        backgroundColor: O
      };
      e >= 0 && (this.timerControl = new G(() => this.destroy(r), r.length, r));
      const x = this.reverse ? !this.botToTop : this.botToTop;
      let p = -1;
      const _ = this.active.some((E) => E.title === t.title && E.text === t.text);
      (!o || !_) && (x ? (this.list.push(r), this.$emit("start", r), this.active.length > this.max && (p = 0)) : (this.list.unshift(r), this.$emit("start", r), this.active.length > this.max && (p = this.active.length - 1)), p !== -1 && this.destroy(this.active[p]));
    },
    closeItem(t) {
      this.destroyById(t);
    },
    closeItemAll() {
      this.list.forEach((t) => this.destroy(t));
    },
    notifyClass(t) {
      return [
        "vue-notification-template",
        this.classes,
        t.type || ""
      ];
    },
    notifyWrapperStyle(t) {
      return this.isVA ? void 0 : { transition: `all ${t.speed}ms` };
    },
    notifyBodyStyle(t) {
      return {
        color: t.color,
        backgroundColor: t.backgroundColor
      };
    },
    destroy(t) {
      clearTimeout(t.timer), t.state = d.DESTROYED, this.clean(), this.$emit("destroy", t);
    },
    destroyById(t) {
      const e = this.list.find((i) => i.id === t);
      e && this.destroy(e);
    },
    destroyAll() {
      this.active.forEach(this.destroy);
    },
    getAnimation(t, e) {
      var o;
      const i = (o = this.animation) == null ? void 0 : o[t];
      return typeof i == "function" ? i.call(this, e) : i;
    },
    enter(t, e) {
      if (!this.isVA)
        return;
      const i = this.getAnimation("enter", t);
      this.velocity(t, i, {
        duration: this.speed,
        complete: e
      });
    },
    leave(t, e) {
      if (!this.isVA)
        return;
      const i = this.getAnimation("leave", t);
      this.velocity(t, i, {
        duration: this.speed,
        complete: e
      });
    },
    clean() {
      this.list = this.list.filter((t) => t.state !== d.DESTROYED);
    }
  }
});
const Z = ["data-id"], tt = ["onClick"], et = ["innerHTML"], it = ["innerHTML"];
function ot(t, e, i, o, s, u) {
  return a(), f("div", {
    class: "vue-notification-group",
    style: h(t.styles)
  }, [
    (a(), T(B(t.componentName), {
      name: t.animationName,
      onEnter: t.enter,
      onLeave: t.leave,
      onAfterLeave: t.clean
    }, {
      default: v(() => [
        (a(!0), f(H, null, M(t.active, (n) => (a(), f("div", {
          key: n.id,
          class: "vue-notification-wrapper",
          style: h(t.notifyWrapperStyle(n)),
          "data-id": n.id,
          onMouseenter: e[0] || (e[0] = (...l) => t.pauseTimeout && t.pauseTimeout(...l)),
          onMouseleave: e[1] || (e[1] = (...l) => t.resumeTimeout && t.resumeTimeout(...l))
        }, [
          A(t.$slots, "body", {
            class: D([t.classes, n.type]),
            item: n,
            close: () => t.destroy(n)
          }, () => [
            C("div", {
              class: D(t.notifyClass(n)),
              style: h(t.notifyBodyStyle(n)),
              onClick: (l) => t.destroyIfNecessary(n)
            }, [
              n.title ? (a(), f("div", {
                key: 0,
                class: "notification-title",
                innerHTML: n.title
              }, null, 8, et)) : R("", !0),
              C("div", {
                class: "notification-content",
                innerHTML: n.text
              }, null, 8, it)
            ], 14, tt)
          ])
        ], 44, Z))), 128))
      ]),
      _: 3
    }, 40, ["name", "onEnter", "onLeave", "onAfterLeave"]))
  ], 4);
}
const st = /* @__PURE__ */ b(X, [["render", ot]]), m = (t) => {
  typeof t == "string" && (t = { title: "", text: t }), typeof t == "object" && c.emit("add", t);
};
m.close = (t) => {
  c.emit("close", t);
};
m.closeAll = () => {
  c.emit("closeAll");
};
const lt = () => ({ notify: m });
function nt(t, e = {}) {
  Object.entries(e).forEach((o) => k.set(...o));
  const i = e.name || "notify";
  t.config.globalProperties["$" + i] = m, t.component(e.componentName || "Notifications", st);
}
const ct = {
  install: nt
};
export {
  ct as default,
  m as notify,
  lt as useNotification
};
(function(){var o;"use strict";try{if(typeof document!="undefined"){var e=document.createElement("style");e.nonce=(o=document.head.querySelector("meta[property=csp-nonce]"))==null?void 0:o.content,e.appendChild(document.createTextNode(".vue-notification-group{display:block;position:fixed;z-index:5000}.vue-notification-wrapper{display:block;overflow:hidden;width:100%;margin:0;padding:0}.notification-title{font-weight:600}.vue-notification-template{display:block;box-sizing:border-box;background:white;text-align:left}.vue-notification{display:block;box-sizing:border-box;text-align:left;font-size:12px;padding:10px;margin:0 5px 5px;color:#fff;background:#44A4FC;border-left:5px solid #187FE7}.vue-notification.warn{background:#ffb648;border-left-color:#f48a06}.vue-notification.error{background:#E54D42;border-left-color:#b82e24}.vue-notification.success{background:#68CD86;border-left-color:#42a85f}.vn-fade-enter-active,.vn-fade-leave-active,.vn-fade-move{transition:all .5s}.vn-fade-enter-from,.vn-fade-leave-to{opacity:0}")),document.head.appendChild(e)}}catch(i){console.error("vite-plugin-css-injected-by-js",i)}})();
