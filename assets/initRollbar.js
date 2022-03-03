export default () => {
 return "var _rollbarConfig = {\n" +
  "    accessToken: 'acacfd8401124fc58b713f81cdfe6eda',\n" +
  "    captureUncaught: true,\n" +
  "    captureUnhandledRejections: true,\n" +
  "    payload: {\n" +
  "      environment: 'production',\n" +
  "    },\n" +
  "  }\n" +
  "// Rollbar Snippet\n" +
  "  !(function (r) {\n" +
  "    function e(n) {\n" +
  "      if (o[n]) return o[n].exports\n" +
  "      var t = (o[n] = {exports: {}, id: n, loaded: !1})\n" +
  "      return r[n].call(t.exports, t, t.exports, e), (t.loaded = !0), t.exports\n" +
  "    }\n" +
  "\n" +
  "    var o = {}\n" +
  "    return (e.m = r), (e.c = o), (e.p = ''), e(0)\n" +
  "  })([\n" +
  "    function (r, e, o) {\n" +
  "      'use strict'\n" +
  "      var n = o(1),\n" +
  "        t = o(4)\n" +
  "      ;(_rollbarConfig = _rollbarConfig || {}),\n" +
  "        (_rollbarConfig.rollbarJsUrl =\n" +
  "          _rollbarConfig.rollbarJsUrl ||\n" +
  "          'https://cdnjs.cloudflare.com/ajax/libs/rollbar.js/2.4.6/rollbar.min.js'),\n" +
  "        (_rollbarConfig.async =\n" +
  "          void 0 === _rollbarConfig.async || _rollbarConfig.async)\n" +
  "      var a = n.setupShim(window, _rollbarConfig),\n" +
  "        l = t(_rollbarConfig)\n" +
  "      ;(window.rollbar = n.Rollbar),\n" +
  "        a.loadFull(window, document, !_rollbarConfig.async, _rollbarConfig, l)\n" +
  "    },\n" +
  "    function (r, e, o) {\n" +
  "      'use strict'\n" +
  "\n" +
  "      function n(r) {\n" +
  "        return function () {\n" +
  "          try {\n" +
  "            return r.apply(this, arguments)\n" +
  "          } catch (r) {\n" +
  "            try {\n" +
  "              console.error('[Rollbar]: Internal error', r)\n" +
  "            } catch (r) {\n" +
  "            }\n" +
  "          }\n" +
  "        }\n" +
  "      }\n" +
  "\n" +
  "      function t(r, e) {\n" +
  "        ;(this.options = r), (this._rollbarOldOnError = null)\n" +
  "        var o = s++\n" +
  "        ;(this.shimId = function () {\n" +
  "          return o\n" +
  "        }),\n" +
  "        'undefined' != typeof window &&\n" +
  "        window._rollbarShims &&\n" +
  "        (window._rollbarShims[o] = {handler: e, messages: []})\n" +
  "      }\n" +
  "\n" +
  "      function a(r, e) {\n" +
  "        if (r) {\n" +
  "          var o = e.globalAlias || 'Rollbar'\n" +
  "          if ('object' == typeof r[o]) return r[o]\n" +
  "            ;\n" +
  "          (r._rollbarShims = {}), (r._rollbarWrappedError = null)\n" +
  "          var t = new p(e)\n" +
  "          return n(function () {\n" +
  "            e.captureUncaught &&\n" +
  "            ((t._rollbarOldOnError = r.onerror),\n" +
  "              i.captureUncaughtExceptions(r, t, !0),\n" +
  "              i.wrapGlobals(r, t, !0)),\n" +
  "            e.captureUnhandledRejections &&\n" +
  "            i.captureUnhandledRejections(r, t, !0)\n" +
  "            var n = e.autoInstrument\n" +
  "            return (\n" +
  "              e.enabled !== !1 &&\n" +
  "              (void 0 === n ||\n" +
  "                n === !0 ||\n" +
  "                ('object' == typeof n && n.network)) &&\n" +
  "              r.addEventListener &&\n" +
  "              (r.addEventListener('load', t.captureLoad.bind(t)),\n" +
  "                r.addEventListener(\n" +
  "                  'DOMContentLoaded',\n" +
  "                  t.captureDomContentLoaded.bind(t)\n" +
  "                )),\n" +
  "                (r[o] = t),\n" +
  "                t\n" +
  "            )\n" +
  "          })()\n" +
  "        }\n" +
  "      }\n" +
  "\n" +
  "      function l(r) {\n" +
  "        return n(function () {\n" +
  "          var e = this,\n" +
  "            o = Array.prototype.slice.call(arguments, 0),\n" +
  "            n = {shim: e, method: r, args: o, ts: new Date()}\n" +
  "          window._rollbarShims[this.shimId()].messages.push(n)\n" +
  "        })\n" +
  "      }\n" +
  "\n" +
  "      var i = o(2),\n" +
  "        s = 0,\n" +
  "        d = o(3),\n" +
  "        c = function (r, e) {\n" +
  "          return new t(r, e)\n" +
  "        },\n" +
  "        p = d.bind(null, c)\n" +
  "      ;(t.prototype.loadFull = function (r, e, o, t, a) {\n" +
  "        var l = function () {\n" +
  "            var e\n" +
  "            if (void 0 === r._rollbarDidLoad) {\n" +
  "              e = new Error('rollbar.js did not load')\n" +
  "              for (var o, n, t, l, i = 0; (o = r._rollbarShims[i++]);)\n" +
  "                for (o = o.messages || []; (n = o.shift());)\n" +
  "                  for (t = n.args || [], i = 0; i < t.length; ++i)\n" +
  "                    if (((l = t[i]), 'function' == typeof l)) {\n" +
  "                      l(e)\n" +
  "                      break\n" +
  "                    }\n" +
  "            }\n" +
  "            'function' == typeof a && a(e)\n" +
  "          },\n" +
  "          i = !1,\n" +
  "          s = e.createElement('script'),\n" +
  "          d = e.getElementsByTagName('script')[0],\n" +
  "          c = d.parentNode\n" +
  "        ;(s.crossOrigin = ''),\n" +
  "          (s.src = t.rollbarJsUrl),\n" +
  "        o || (s.async = !0),\n" +
  "          (s.onload = s.onreadystatechange =\n" +
  "            n(function () {\n" +
  "              if (\n" +
  "                !(\n" +
  "                  i ||\n" +
  "                  (this.readyState &&\n" +
  "                    'loaded' !== this.readyState &&\n" +
  "                    'complete' !== this.readyState)\n" +
  "                )\n" +
  "              ) {\n" +
  "                s.onload = s.onreadystatechange = null\n" +
  "                try {\n" +
  "                  c.removeChild(s)\n" +
  "                } catch (r) {\n" +
  "                }\n" +
  "                ;(i = !0), l()\n" +
  "              }\n" +
  "            })),\n" +
  "          c.insertBefore(s, d)\n" +
  "      }),\n" +
  "        (t.prototype.wrap = function (r, e, o) {\n" +
  "          try {\n" +
  "            var n\n" +
  "            if (\n" +
  "              ((n =\n" +
  "                'function' == typeof e\n" +
  "                  ? e\n" +
  "                  : function () {\n" +
  "                    return e || {}\n" +
  "                  }),\n" +
  "              'function' != typeof r)\n" +
  "            )\n" +
  "              return r\n" +
  "            if (r._isWrap) return r\n" +
  "            if (\n" +
  "              !r._rollbar_wrapped &&\n" +
  "              ((r._rollbar_wrapped = function () {\n" +
  "                o && 'function' == typeof o && o.apply(this, arguments)\n" +
  "                try {\n" +
  "                  return r.apply(this, arguments)\n" +
  "                } catch (o) {\n" +
  "                  var e = o\n" +
  "                  throw (\n" +
  "                    (e &&\n" +
  "                    ('string' == typeof e && (e = new String(e)),\n" +
  "                      (e._rollbarContext = n() || {}),\n" +
  "                      (e._rollbarContext._wrappedSource = r.toString()),\n" +
  "                      (window._rollbarWrappedError = e)),\n" +
  "                      e)\n" +
  "                  )\n" +
  "                }\n" +
  "              }),\n" +
  "                (r._rollbar_wrapped._isWrap = !0),\n" +
  "                r.hasOwnProperty)\n" +
  "            )\n" +
  "              for (var t in r)\n" +
  "                r.hasOwnProperty(t) && (r._rollbar_wrapped[t] = r[t])\n" +
  "            return r._rollbar_wrapped\n" +
  "          } catch (e) {\n" +
  "            return r\n" +
  "          }\n" +
  "        })\n" +
  "      for (\n" +
  "        var u =\n" +
  "            'log,debug,info,warn,warning,error,critical,global,configure,handleUncaughtException,handleUnhandledRejection,captureEvent,captureDomContentLoaded,captureLoad'.split(\n" +
  "              ','\n" +
  "            ),\n" +
  "          f = 0;\n" +
  "        f < u.length;\n" +
  "        ++f\n" +
  "      )\n" +
  "        t.prototype[u[f]] = l(u[f])\n" +
  "      r.exports = {setupShim: a, Rollbar: p}\n" +
  "    },\n" +
  "    function (r, e) {\n" +
  "      'use strict'\n" +
  "\n" +
  "      function o(r, e, o) {\n" +
  "        if (r) {\n" +
  "          var t\n" +
  "          'function' == typeof e._rollbarOldOnError\n" +
  "            ? (t = e._rollbarOldOnError)\n" +
  "            : r.onerror &&\n" +
  "            !r.onerror.belongsToShim &&\n" +
  "            ((t = r.onerror), (e._rollbarOldOnError = t))\n" +
  "          var a = function () {\n" +
  "              var o = Array.prototype.slice.call(arguments, 0)\n" +
  "              n(r, e, t, o)\n" +
  "            }\n" +
  "          ;(a.belongsToShim = o), (r.onerror = a)\n" +
  "        }\n" +
  "      }\n" +
  "\n" +
  "      function n(r, e, o, n) {\n" +
  "        r._rollbarWrappedError &&\n" +
  "        (n[4] || (n[4] = r._rollbarWrappedError),\n" +
  "        n[5] || (n[5] = r._rollbarWrappedError._rollbarContext),\n" +
  "          (r._rollbarWrappedError = null)),\n" +
  "          e.handleUncaughtException.apply(e, n),\n" +
  "        o && o.apply(r, n)\n" +
  "      }\n" +
  "\n" +
  "      function t(r, e, o) {\n" +
  "        if (r) {\n" +
  "          'function' == typeof r._rollbarURH &&\n" +
  "          r._rollbarURH.belongsToShim &&\n" +
  "          r.removeEventListener('unhandledrejection', r._rollbarURH)\n" +
  "          var n = function (r) {\n" +
  "              var o, n, t\n" +
  "              try {\n" +
  "                o = r.reason\n" +
  "              } catch (r) {\n" +
  "                o = void 0\n" +
  "              }\n" +
  "              try {\n" +
  "                n = r.promise\n" +
  "              } catch (r) {\n" +
  "                n = '[unhandledrejection] error getting `promise` from event'\n" +
  "              }\n" +
  "              try {\n" +
  "                ;(t = r.detail), !o && t && ((o = t.reason), (n = t.promise))\n" +
  "              } catch (r) {\n" +
  "                t = '[unhandledrejection] error getting `detail` from event'\n" +
  "              }\n" +
  "              o || (o = '[unhandledrejection] error getting `reason` from event'),\n" +
  "              e &&\n" +
  "              e.handleUnhandledRejection &&\n" +
  "              e.handleUnhandledRejection(o, n)\n" +
  "            }\n" +
  "          ;(n.belongsToShim = o),\n" +
  "            (r._rollbarURH = n),\n" +
  "            r.addEventListener('unhandledrejection', n)\n" +
  "        }\n" +
  "      }\n" +
  "\n" +
  "      function a(r, e, o) {\n" +
  "        if (r) {\n" +
  "          var n,\n" +
  "            t,\n" +
  "            a =\n" +
  "              'EventTarget,Window,Node,ApplicationCache,AudioTrackList,ChannelMergerNode,CryptoOperation,EventSource,FileReader,HTMLUnknownElement,IDBDatabase,IDBRequest,IDBTransaction,KeyOperation,MediaController,MessagePort,ModalWindow,Notification,SVGElementInstance,Screen,TextTrack,TextTrackCue,TextTrackList,WebSocket,WebSocketWorker,Worker,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload'.split(\n" +
  "                ','\n" +
  "              )\n" +
  "          for (n = 0; n < a.length; ++n)\n" +
  "            (t = a[n]), r[t] && r[t].prototype && l(e, r[t].prototype, o)\n" +
  "        }\n" +
  "      }\n" +
  "\n" +
  "      function l(r, e, o) {\n" +
  "        if (e.hasOwnProperty && e.hasOwnProperty('addEventListener')) {\n" +
  "          for (\n" +
  "            var n = e.addEventListener;\n" +
  "            n._rollbarOldAdd && n.belongsToShim;\n" +
  "          )\n" +
  "            n = n._rollbarOldAdd\n" +
  "          var t = function (e, o, t) {\n" +
  "              n.call(this, e, r.wrap(o), t)\n" +
  "            }\n" +
  "          ;(t._rollbarOldAdd = n),\n" +
  "            (t.belongsToShim = o),\n" +
  "            (e.addEventListener = t)\n" +
  "          for (\n" +
  "            var a = e.removeEventListener;\n" +
  "            a._rollbarOldRemove && a.belongsToShim;\n" +
  "          )\n" +
  "            a = a._rollbarOldRemove\n" +
  "          var l = function (r, e, o) {\n" +
  "              a.call(this, r, (e && e._rollbar_wrapped) || e, o)\n" +
  "            }\n" +
  "          ;(l._rollbarOldRemove = a),\n" +
  "            (l.belongsToShim = o),\n" +
  "            (e.removeEventListener = l)\n" +
  "        }\n" +
  "      }\n" +
  "\n" +
  "      r.exports = {\n" +
  "        captureUncaughtExceptions: o,\n" +
  "        captureUnhandledRejections: t,\n" +
  "        wrapGlobals: a,\n" +
  "      }\n" +
  "    },\n" +
  "    function (r, e) {\n" +
  "      'use strict'\n" +
  "\n" +
  "      function o(r, e) {\n" +
  "        ;(this.impl = r(e, this)), (this.options = e), n(o.prototype)\n" +
  "      }\n" +
  "\n" +
  "      function n(r) {\n" +
  "        for (\n" +
  "          var e = function (r) {\n" +
  "              return function () {\n" +
  "                var e = Array.prototype.slice.call(arguments, 0)\n" +
  "                if (this.impl[r]) return this.impl[r].apply(this.impl, e)\n" +
  "              }\n" +
  "            },\n" +
  "            o =\n" +
  "              'log,debug,info,warn,warning,error,critical,global,configure,handleUncaughtException,handleUnhandledRejection,_createItem,wrap,loadFull,shimId,captureEvent,captureDomContentLoaded,captureLoad'.split(\n" +
  "                ','\n" +
  "              ),\n" +
  "            n = 0;\n" +
  "          n < o.length;\n" +
  "          n++\n" +
  "        )\n" +
  "          r[o[n]] = e(o[n])\n" +
  "      }\n" +
  "      ;(o.prototype._swapAndProcessMessages = function (r, e) {\n" +
  "        this.impl = r(this.options)\n" +
  "        for (var o, n, t; (o = e.shift());)\n" +
  "          (n = o.method),\n" +
  "            (t = o.args),\n" +
  "          this[n] &&\n" +
  "          'function' == typeof this[n] &&\n" +
  "          ('captureDomContentLoaded' === n || 'captureLoad' === n\n" +
  "            ? this[n].apply(this, [t[0], o.ts])\n" +
  "            : this[n].apply(this, t))\n" +
  "        return this\n" +
  "      }),\n" +
  "        (r.exports = o)\n" +
  "    },\n" +
  "    function (r, e) {\n" +
  "      'use strict'\n" +
  "      r.exports = function (r) {\n" +
  "        return function (e) {\n" +
  "          if (!e && !window._rollbarInitialized) {\n" +
  "            r = r || {}\n" +
  "            for (\n" +
  "              var o,\n" +
  "                n,\n" +
  "                t = r.globalAlias || 'Rollbar',\n" +
  "                a = window.rollbar,\n" +
  "                l = function (r) {\n" +
  "                  return new a(r)\n" +
  "                },\n" +
  "                i = 0;\n" +
  "              (o = window._rollbarShims[i++]);\n" +
  "            )\n" +
  "              n || (n = o.handler),\n" +
  "                o.handler._swapAndProcessMessages(l, o.messages)\n" +
  "              ;\n" +
  "            (window[t] = n), (window._rollbarInitialized = !0)\n" +
  "          }\n" +
  "        }\n" +
  "      }\n" +
  "    },\n" +
  "  ])\n" +
  "// End Rollbar Snippet"

}