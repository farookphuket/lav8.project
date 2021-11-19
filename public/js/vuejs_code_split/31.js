(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[31],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Member/TagWithPostList.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Member/TagWithPostList.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
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
var moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "TagWithPostList",
  props: ["tag_id", "tag_all"],
  data: function data() {
    return {
      postlist: '',
      moment: moment,
      tag_with_content: []
    };
  },
  mounted: function mounted() {
    this.getPostsList();
  },
  methods: {
    getPostsList: function getPostsList(page) {
      var _this = this;

      var url = '';

      if (page) {
        url = page;
        this.$cookies.set("old_taglist_page", url);
      }

      url = this.$cookies.get("old_taglist_page");

      if (!url) {
        url = "/member/getPostsInTagId/".concat(this.tag_id);
      }

      axios.get(url).then(function (res) {
        _this.postlist = res.data.postlist;
      }, function (err) {
        alert('Error ! please try again later');
      });
    },
    goReadPage: function goReadPage(slug) {
      var url = "/member/posts/".concat(slug);
      location.href = url;
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Member/TagWithPostList.vue?vue&type=template&id=5d6157b2&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Member/TagWithPostList.vue?vue&type=template&id=5d6157b2& ***!
  \********************************************************************************************************************************************************************************************************************/
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
  return _c(
    "div",
    { staticClass: "container" },
    [
      _vm._l(_vm.postlist.data, function(po) {
        return _c("article", { staticClass: "post-preview" }, [
          _c(
            "a",
            {
              attrs: { href: "#" },
              on: {
                click: function($event) {
                  $event.preventDefault()
                  return _vm.goReadPage(po.slug)
                }
              }
            },
            [
              _c("h2", { staticClass: "post-title" }, [
                _vm._v(_vm._s(po.post_title))
              ])
            ]
          ),
          _vm._v(" "),
          _c("p", { staticClass: "post-meta" }, [
            _vm._v(
              "Posted by\n      \n    " +
                _vm._s(po.user.name) +
                "\n      \n      on\n      " +
                _vm._s(_vm.moment(po.created_at)) +
                " · \n      "
            ),
            _c(
              "span",
              {
                staticClass: "reading-time",
                attrs: { title: "Estimated read time" }
              },
              [
                _vm._v(
                  "\n        " +
                    _vm._s(_vm.moment(po.created_at).fromNow()) +
                    "\n      "
                )
              ]
            )
          ])
        ])
      }),
      _vm._v(" "),
      _c("div", { staticClass: "pa" }, [
        _c(
          "ul",
          { staticClass: "pagination" },
          [
            _c("li", { staticClass: "page-item" }, [
              _vm._v("\n        showing from \n        "),
              _c("span", [_vm._v(_vm._s(_vm.postlist.from))]),
              _vm._v(" to \n        "),
              _c("span", [
                _vm._v("\n          " + _vm._s(_vm.postlist.to) + " \n        ")
              ]),
              _vm._v(" of \n        "),
              _c("span", [_vm._v(_vm._s(_vm.postlist.total))]),
              _vm._v(" · \n      ")
            ]),
            _vm._v(" "),
            _vm._l(_vm.postlist.links, function(page) {
              return _c("li", { staticClass: "page-item" }, [
                page.active == false && page.url != null
                  ? _c(
                      "a",
                      {
                        attrs: { href: "" },
                        domProps: { innerHTML: _vm._s(page.label) },
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            return _vm.getPostsList(page.url)
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n          " + _vm._s(page.label) + "\n        "
                        )
                      ]
                    )
                  : _c(
                      "span",
                      {
                        staticClass: "active",
                        domProps: { innerHTML: _vm._s(page.label) }
                      },
                      [
                        _vm._v(
                          "\n          " + _vm._s(page.label) + "\n        "
                        )
                      ]
                    ),
                _vm._v(" · \n      ")
              ])
            }),
            _vm._v(" "),
            _c("li", { staticClass: "page-item" }, [
              _c("span", { staticClass: "active" }, [
                _vm._v(
                  "\n          " +
                    _vm._s(_vm.postlist.current_page) +
                    "\n        "
                )
              ])
            ])
          ],
          2
        )
      ])
    ],
    2
  )
}
var staticRenderFns = []
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

/***/ "./resources/js/pages/Member/TagWithPostList.vue":
/*!*******************************************************!*\
  !*** ./resources/js/pages/Member/TagWithPostList.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TagWithPostList_vue_vue_type_template_id_5d6157b2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TagWithPostList.vue?vue&type=template&id=5d6157b2& */ "./resources/js/pages/Member/TagWithPostList.vue?vue&type=template&id=5d6157b2&");
/* harmony import */ var _TagWithPostList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TagWithPostList.vue?vue&type=script&lang=js& */ "./resources/js/pages/Member/TagWithPostList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TagWithPostList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TagWithPostList_vue_vue_type_template_id_5d6157b2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _TagWithPostList_vue_vue_type_template_id_5d6157b2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Member/TagWithPostList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Member/TagWithPostList.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/pages/Member/TagWithPostList.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TagWithPostList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./TagWithPostList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Member/TagWithPostList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TagWithPostList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Member/TagWithPostList.vue?vue&type=template&id=5d6157b2&":
/*!**************************************************************************************!*\
  !*** ./resources/js/pages/Member/TagWithPostList.vue?vue&type=template&id=5d6157b2& ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TagWithPostList_vue_vue_type_template_id_5d6157b2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./TagWithPostList.vue?vue&type=template&id=5d6157b2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Member/TagWithPostList.vue?vue&type=template&id=5d6157b2&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TagWithPostList_vue_vue_type_template_id_5d6157b2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TagWithPostList_vue_vue_type_template_id_5d6157b2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);