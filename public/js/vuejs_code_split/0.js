(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/VideoSearch.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/VideoSearch.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "VideoSearch",
  data: function data() {
    return {
      search: "",
      videos: [],
      moment: moment
    };
  },
  mounted: function mounted() {},
  methods: {
    searchVideo: function searchVideo() {
      var _this = this;

      var url = "/searchVideo?search=".concat(this.search);
      axios.get(url).then(function (res) {
        _this.videos = res.data.videos;
      });
    },
    openVideo: function openVideo(id) {
      this.$emit("openVideo", id);
    },
    smartTitle: function smartTitle(str, len) {
      return str.length > len ? str.substring(0, len) + "..." : str;
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/VideoSearch.vue?vue&type=template&id=06b4a4ec&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/VideoSearch.vue?vue&type=template&id=06b4a4ec& ***!
  \*********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticClass: "row" },
      [
        _c("div", { staticClass: "container pt-4" }, [
          _vm._m(0),
          _vm._v(" "),
          _c("form", { attrs: { action: "" } }, [
            _c(
              "div",
              { staticClass: "form-group" },
              [
                _c(
                  "b-input-group",
                  [
                    _c(
                      "b-input-group-prepend",
                      { attrs: { "is-text": "" } },
                      [_c("b-icon", { attrs: { icon: "search" } })],
                      1
                    ),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.search,
                          expression: "search"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: { placeholder: "Search video...", type: "text" },
                      domProps: { value: _vm.search },
                      on: {
                        keyup: _vm.searchVideo,
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.search = $event.target.value
                        }
                      }
                    })
                  ],
                  1
                )
              ],
              1
            )
          ])
        ]),
        _vm._v(" "),
        _vm._l(_vm.videos, function(vi) {
          return _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.search,
                  expression: "search"
                }
              ],
              staticClass: "container"
            },
            [
              _c("div", { staticClass: "card" }, [
                _c(
                  "div",
                  {
                    staticClass: "video-container",
                    domProps: { innerHTML: _vm._s(vi.embed) }
                  },
                  [
                    _vm._v(
                      "\n                    " +
                        _vm._s(vi.embed) +
                        "\n                "
                    )
                  ]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "card-body" }, [
                  _c("p", { staticClass: "pt-2 mb-4" }, [
                    _c(
                      "a",
                      {
                        attrs: { href: "" },
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            return _vm.openVideo(vi.id)
                          }
                        }
                      },
                      [
                        _c("b-icon", { attrs: { icon: "info-circle" } }),
                        _vm._v(
                          " \n                            " +
                            _vm._s(vi.title) +
                            "\n                        "
                        )
                      ],
                      1
                    )
                  ]),
                  _vm._v("\n                    ·\n                    "),
                  _c(
                    "span",
                    { staticClass: "badge badge-info" },
                    [
                      _c("b-icon", { attrs: { icon: "person" } }),
                      _vm._v(
                        " \n                        " + _vm._s(vi.user.name)
                      )
                    ],
                    1
                  ),
                  _vm._v("\n                    ·\n                    "),
                  _c(
                    "span",
                    { staticClass: "badge badge-info" },
                    [
                      _c("b-icon", { attrs: { icon: "clock-history" } }),
                      _vm._v(
                        " \n                        " +
                          _vm._s(_vm.moment(vi.created_at).fromNow())
                      )
                    ],
                    1
                  )
                ])
              ])
            ]
          )
        })
      ],
      2
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "section-title" }, [
      _c("h2", [_vm._v("Video")])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./resources/js/pages/VideoSearch.vue":
/*!********************************************!*\
  !*** ./resources/js/pages/VideoSearch.vue ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VideoSearch_vue_vue_type_template_id_06b4a4ec___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VideoSearch.vue?vue&type=template&id=06b4a4ec& */ "./resources/js/pages/VideoSearch.vue?vue&type=template&id=06b4a4ec&");
/* harmony import */ var _VideoSearch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VideoSearch.vue?vue&type=script&lang=js& */ "./resources/js/pages/VideoSearch.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _VideoSearch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _VideoSearch_vue_vue_type_template_id_06b4a4ec___WEBPACK_IMPORTED_MODULE_0__["render"],
  _VideoSearch_vue_vue_type_template_id_06b4a4ec___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/VideoSearch.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/VideoSearch.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./resources/js/pages/VideoSearch.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoSearch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./VideoSearch.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/VideoSearch.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoSearch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/VideoSearch.vue?vue&type=template&id=06b4a4ec&":
/*!***************************************************************************!*\
  !*** ./resources/js/pages/VideoSearch.vue?vue&type=template&id=06b4a4ec& ***!
  \***************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoSearch_vue_vue_type_template_id_06b4a4ec___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./VideoSearch.vue?vue&type=template&id=06b4a4ec& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/VideoSearch.vue?vue&type=template&id=06b4a4ec&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoSearch_vue_vue_type_template_id_06b4a4ec___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoSearch_vue_vue_type_template_id_06b4a4ec___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);