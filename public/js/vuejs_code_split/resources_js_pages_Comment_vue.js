"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_Comment_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Comment.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Comment.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "PubComment",
  props: ["post_id"],
  data: function data() {
    return {
      comments: '',
      objNum: 0,
      res_status: '',
      isShow: false
    };
  },
  mounted: function mounted() {
    this.getPostComments();
  },
  methods: {
    getPostComments: function getPostComments(page) {
      var _this = this;

      var url = ''; // we have to kill some cookies

      this.checkPage();
      this.$cookies.set("cur_post_id", this.post_id);

      if (page) {
        url = page + "&post_id=" + this.post_id;
        this.$cookies.set("pcomment_old_page", url);
      }

      url = this.$cookies.get("pcomment_old_page");

      if (!url) {
        url = "/getPostComments?post_id=".concat(this.post_id);
      }

      axios.get(url).then(function (res) {
        _this.comments = res.data.comments;
        _this.objNum = Object.keys(_this.comments.data).length; //console.log(Object.keys(this.comments.data).length)

        if (Object.keys(_this.comments.data).length >= 2) {
          _this.isShow = true;
        }
      })["catch"](function (err) {
        var ob = Object.values(err);
        _this.res_status = "<span class=\"alert alert-danger\">\n                        ".concat(ob.join(), "</span>");
      });
    },
    checkPage: function checkPage() {
      if (parseInt(this.$cookies.get("cur_post_id")) != this.post_id) {
        this.$cookies.set("pcomment_old_page", "");
      }
    }
  }
});

/***/ }),

/***/ "./resources/js/pages/Comment.vue":
/*!****************************************!*\
  !*** ./resources/js/pages/Comment.vue ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Comment_vue_vue_type_template_id_7a17bf66___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Comment.vue?vue&type=template&id=7a17bf66& */ "./resources/js/pages/Comment.vue?vue&type=template&id=7a17bf66&");
/* harmony import */ var _Comment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Comment.vue?vue&type=script&lang=js& */ "./resources/js/pages/Comment.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Comment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Comment_vue_vue_type_template_id_7a17bf66___WEBPACK_IMPORTED_MODULE_0__.render,
  _Comment_vue_vue_type_template_id_7a17bf66___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Comment.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Comment.vue?vue&type=script&lang=js&":
/*!*****************************************************************!*\
  !*** ./resources/js/pages/Comment.vue?vue&type=script&lang=js& ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Comment.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Comment.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Comment.vue?vue&type=template&id=7a17bf66&":
/*!***********************************************************************!*\
  !*** ./resources/js/pages/Comment.vue?vue&type=template&id=7a17bf66& ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_template_id_7a17bf66___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_template_id_7a17bf66___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_template_id_7a17bf66___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Comment.vue?vue&type=template&id=7a17bf66& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Comment.vue?vue&type=template&id=7a17bf66&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Comment.vue?vue&type=template&id=7a17bf66&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Comment.vue?vue&type=template&id=7a17bf66& ***!
  \**************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _vm.objNum == 0
        ? _c("div", { staticClass: "card-body" }, [
            _c("div", { staticClass: "container" }, [
              _c("h2", { staticClass: "text-center" }, [
                _vm._v("There is no comment yet!")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "row" }, [
                _vm._m(0),
                _vm._v(" "),
                _c("div", { staticClass: "col-lg-4" }, [_c("login-form")], 1)
              ])
            ])
          ])
        : _vm._l(_vm.comments.data, function(co) {
            return _c(
              "div",
              { staticClass: "card", staticStyle: { "margin-top": "1em" } },
              [
                _c("div", { staticClass: "card-header" }, [
                  _c("h3", { staticClass: "text-center card-title" }, [
                    _vm._v(_vm._s(co.comment_title))
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "card-body" }, [
                  _c(
                    "div",
                    { domProps: { innerHTML: _vm._s(co.comment_body) } },
                    [_vm._v(_vm._s(co.comment_body))]
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "card-footer" }, [
                  _c("div", { staticClass: "row" }, [
                    _c("div", { staticClass: "col-md-10" }, [
                      _c("span", [_vm._v(_vm._s(co.created_at))])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "col-md-2" }, [
                      _c(
                        "span",
                        { staticClass: "float-right" },
                        [
                          _c("b-icon", { attrs: { icon: "person" } }),
                          _vm._v(" "),
                          _c("a", { attrs: { href: "", title: co.ip } }, [
                            _vm._v(
                              "\n                            " +
                                _vm._s(co.name) +
                                "\n                        "
                            )
                          ])
                        ],
                        1
                      )
                    ])
                  ])
                ])
              ]
            )
          }),
      _vm._v(" "),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.isShow,
              expression: "isShow"
            }
          ],
          staticStyle: { "margin-top": "2em" }
        },
        [
          _c("div", { staticClass: "nav-scroller py-1 mb-2" }, [
            _c("nav", { staticClass: "nav d-flex justify-content-center" }, [
              _c(
                "ul",
                { staticClass: "pagination flex-wrap" },
                [
                  _c("li", { staticClass: "page-item disabled" }, [
                    _c("div", { staticClass: "page-link" }, [
                      _vm._v(
                        "\n                                    showing from " +
                          _vm._s(_vm.comments.from) +
                          "\n                                    to "
                      ),
                      _c("span", [_vm._v(_vm._s(_vm.comments.to))]),
                      _vm._v(" of\n                                    "),
                      _c("span", [_vm._v(_vm._s(_vm.comments.total))])
                    ])
                  ]),
                  _vm._v(" "),
                  _vm._l(_vm.comments.links, function(li) {
                    return _c("li", { staticClass: "page-item" }, [
                      !li.active && li.url != null
                        ? _c(
                            "a",
                            {
                              staticClass: "page-link p-2",
                              attrs: { href: "" },
                              domProps: { innerHTML: _vm._s(li.label) },
                              on: {
                                click: function($event) {
                                  $event.preventDefault()
                                  return _vm.getPostComments(li.url)
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                                    " +
                                  _vm._s(li.label) +
                                  "\n                                "
                              )
                            ]
                          )
                        : _c(
                            "span",
                            {
                              staticClass: "page-link active",
                              domProps: { innerHTML: _vm._s(li.label) }
                            },
                            [
                              _vm._v(
                                "\n                                    " +
                                  _vm._s(li.label) +
                                  "\n                                "
                              )
                            ]
                          )
                    ])
                  }),
                  _vm._v(" "),
                  _c("li", { staticClass: "page-item active" }, [
                    _c(
                      "span",
                      { staticClass: "page-link " },
                      [
                        _c("b-icon", { attrs: { icon: "book-half" } }),
                        _vm._v(
                          "\n                                    " +
                            _vm._s(_vm.comments.current_page) +
                            "\n                                "
                        )
                      ],
                      1
                    )
                  ])
                ],
                2
              )
            ])
          ])
        ]
      ),
      _vm._v(" "),
      _c("span", { domProps: { innerHTML: _vm._s(_vm.res_status) } }, [
        _vm._v(_vm._s(_vm.res_status))
      ])
    ],
    2
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-lg-8" }, [
      _c("p", [
        _vm._v(
          "\n                            be the first to give this post comment?\n                        "
        )
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ normalizeComponent)
/* harmony export */ });
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


/***/ })

}]);