"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_DonateMe_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/DonateMe.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/DonateMe.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************/
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "DonateMe",
  data: function data() {
    return {
      pic: [],
      pic_name: "",
      pic_img: "",
      pic_id: 0,
      pic_url: ""
    };
  },
  mounted: function mounted() {
    this.picData();
  },
  methods: {
    picData: function picData() {
      this.pic = [{
        id: 1,
        name: "paypal",
        pic: "https://i.ibb.co/sQwHmxg/2021-03-29-paypal.png",
        url: "https://paypal.me/farookphuket?locale.x=th_TH"
      }, {
        id: 2,
        name: "truemoney",
        pic: "https://i.ibb.co/7SdYkn8/Screenshot-2021-0329-204110.jpg",
        url: "https://i.ibb.co/7SdYkn8/Screenshot-2021-0329-204110.jpg"
      }, {
        id: 3,
        name: "scb",
        pic: "https://i.ibb.co/JQ3JKJ6/scb-qrcode-24-3-2021.jpg",
        url: "https://i.ibb.co/JQ3JKJ6/scb-qrcode-24-3-2021.jpg"
      }, {
        id: 4,
        name: "kbank",
        pic: "https://i.ibb.co/LCK020c/k-qrcode-24-3-2021.jpg",
        url: "https://i.ibb.co/LCK020c/k-qrcode-24-3-2021.jpg"
      }, {
        id: 5,
        name: "Krung Thai Next",
        pic: "https://i.ibb.co/dkgFr6T/Screenshot-2021-0329-212207.jpg",
        url: "https://i.ibb.co/dkgFr6T/Screenshot-2021-0329-212207.jpg"
      }];
    },
    showPic: function showPic(id) {
      var _this = this;

      this.pic.forEach(function (val) {
        if (val.id == id) {
          _this.pic_name = val.name;
          _this.pic_img = val.pic;
          _this.pic_id = val.id;
          _this.pic_url = val.url;

          _this.$refs["showPicModal"].show();
        }
      });
    },
    goTo: function goTo(id) {
      this.pic.forEach(function (val) {
        if (val.id == id) {
          window.open(val.url, "_blank");
        }
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/pages/DonateMe.vue":
/*!*****************************************!*\
  !*** ./resources/js/pages/DonateMe.vue ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DonateMe_vue_vue_type_template_id_67ce1920___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DonateMe.vue?vue&type=template&id=67ce1920& */ "./resources/js/pages/DonateMe.vue?vue&type=template&id=67ce1920&");
/* harmony import */ var _DonateMe_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DonateMe.vue?vue&type=script&lang=js& */ "./resources/js/pages/DonateMe.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _DonateMe_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DonateMe_vue_vue_type_template_id_67ce1920___WEBPACK_IMPORTED_MODULE_0__.render,
  _DonateMe_vue_vue_type_template_id_67ce1920___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/DonateMe.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/DonateMe.vue?vue&type=script&lang=js&":
/*!******************************************************************!*\
  !*** ./resources/js/pages/DonateMe.vue?vue&type=script&lang=js& ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DonateMe_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./DonateMe.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/DonateMe.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DonateMe_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/DonateMe.vue?vue&type=template&id=67ce1920&":
/*!************************************************************************!*\
  !*** ./resources/js/pages/DonateMe.vue?vue&type=template&id=67ce1920& ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DonateMe_vue_vue_type_template_id_67ce1920___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DonateMe_vue_vue_type_template_id_67ce1920___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DonateMe_vue_vue_type_template_id_67ce1920___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./DonateMe.vue?vue&type=template&id=67ce1920& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/DonateMe.vue?vue&type=template&id=67ce1920&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/DonateMe.vue?vue&type=template&id=67ce1920&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/DonateMe.vue?vue&type=template&id=67ce1920& ***!
  \***************************************************************************************************************************************************************************************************************/
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
    "section",
    { staticClass: "portfolio", attrs: { id: "portfolio" } },
    [
      _c("div", { staticClass: "container" }, [
        _c(
          "div",
          { staticClass: "row" },
          [
            _vm._m(0),
            _vm._v(" "),
            _vm._l(_vm.pic, function(pi) {
              return _c("div", { staticClass: "col-md-3 mt-2" }, [
                _c(
                  "div",
                  {
                    staticClass: "text-center pt-2",
                    staticStyle: {
                      "min-height": "200px",
                      "max-height": "300px"
                    }
                  },
                  [
                    _c(
                      "a",
                      {
                        attrs: { href: "" },
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            return _vm.showPic(pi.id)
                          }
                        }
                      },
                      [
                        _c("img", {
                          staticClass: "responsive d-block mx-auto",
                          staticStyle: { width: "220px", height: "180px" },
                          attrs: { src: pi.pic }
                        })
                      ]
                    ),
                    _vm._v(" "),
                    _c("p", { staticClass: "text-center pt-2" }, [
                      _c(
                        "a",
                        {
                          staticClass: "btn btn-outline-primary",
                          attrs: { href: "", target: "_blank" },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              return _vm.goTo(pi.id)
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n                        " +
                              _vm._s(pi.name) +
                              "\n                    "
                          )
                        ]
                      )
                    ])
                  ]
                )
              ])
            }),
            _vm._v(" "),
            _c(
              "b-modal",
              {
                ref: "showPicModal",
                attrs: { title: _vm.pic_name, centered: "", "ok-only": "" }
              },
              [
                _c("div", { staticClass: "container" }, [
                  _c("div", { staticClass: "card" }, [
                    _c("img", {
                      staticClass: "card-img-top",
                      attrs: { src: _vm.pic_img, alt: "" }
                    }),
                    _vm._v(" "),
                    _c("div", { staticClass: "card-body" })
                  ])
                ])
              ]
            )
          ],
          2
        )
      ])
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-lg-12" }, [
      _c("div", { staticClass: "section-title" }, [
        _c("h2", { staticClass: "text-center" }, [
          _vm._v("\n                    $ 1 US DOLLAR ONLY\n                ")
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "alert alert-danger" }, [
        _c("h3", { staticClass: "text-center" }, [_vm._v("DO NOT PAY!")]),
        _vm._v(" "),
        _c("p", { staticClass: "mb-2" }, [
          _vm._v(
            "\n                    all of the money that you have paid to any of the way has\n                    shown in the list below will be use to maintain and pay\n                    to a hosting for this website so do not spent a big\n                    amount to this website (if you will I want 1 US DOLLAR from you)\n                    or put any of your personal\n                    information on this website! as we have nothing to do\n                    with your personal info\n                "
          )
        ])
      ]),
      _vm._v(" "),
      _c("p", { staticClass: "text-mute" }, [
        _vm._v(
          "\n                this page is will be the only page about the money on this\n                website.\n            "
        )
      ]),
      _vm._v(" "),
      _c("p", { staticClass: "pt-2 mb-4" }, [
        _vm._v(
          "\n                the below link or picture are the way to support me\n            "
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