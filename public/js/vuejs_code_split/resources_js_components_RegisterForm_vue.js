"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_RegisterForm_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/RegisterForm.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/RegisterForm.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************/
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
  name: "RegisterForm",
  data: function data() {
    return {
      res_status: '',
      rForm: new Form({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      })
    };
  },
  methods: {
    save: function save() {
      var _this = this;

      var url = "/register";
      this.rForm.submit("post", url).then(function (res) {
        _this.res_status = res.msg;
      })["catch"](function (err) {
        var ob = Object.values(err);
        _this.res_status = "<span class=\"alert alert-danger\">\n                        ".concat(ob.join(), "</span>");
      });
      setTimeout(function () {
        _this.res_status = '';
      }, 3200);
    }
  }
});

/***/ }),

/***/ "./resources/js/components/RegisterForm.vue":
/*!**************************************************!*\
  !*** ./resources/js/components/RegisterForm.vue ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _RegisterForm_vue_vue_type_template_id_7942be72___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RegisterForm.vue?vue&type=template&id=7942be72& */ "./resources/js/components/RegisterForm.vue?vue&type=template&id=7942be72&");
/* harmony import */ var _RegisterForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RegisterForm.vue?vue&type=script&lang=js& */ "./resources/js/components/RegisterForm.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _RegisterForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _RegisterForm_vue_vue_type_template_id_7942be72___WEBPACK_IMPORTED_MODULE_0__.render,
  _RegisterForm_vue_vue_type_template_id_7942be72___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/RegisterForm.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/RegisterForm.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/components/RegisterForm.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RegisterForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./RegisterForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/RegisterForm.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RegisterForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/RegisterForm.vue?vue&type=template&id=7942be72&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/RegisterForm.vue?vue&type=template&id=7942be72& ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RegisterForm_vue_vue_type_template_id_7942be72___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RegisterForm_vue_vue_type_template_id_7942be72___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RegisterForm_vue_vue_type_template_id_7942be72___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./RegisterForm.vue?vue&type=template&id=7942be72& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/RegisterForm.vue?vue&type=template&id=7942be72&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/RegisterForm.vue?vue&type=template&id=7942be72&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/RegisterForm.vue?vue&type=template&id=7942be72& ***!
  \************************************************************************************************************************************************************************************************************************/
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
  return _c("div", [
    _c("div", { staticClass: "card-body" }, [
      _c("p", { staticClass: "login-card-description" }, [
        _vm._v("Register a new account")
      ]),
      _vm._v(" "),
      _c(
        "form",
        {
          attrs: { action: "#" },
          on: {
            submit: function($event) {
              $event.preventDefault()
              return _vm.save.apply(null, arguments)
            },
            keydown: function($event) {
              return _vm.rForm.errors.clear($event.target.name)
            }
          }
        },
        [
          _c("div", { staticClass: "form-group" }, [
            _c("label", { staticClass: "sr-only", attrs: { for: "name" } }, [
              _vm._v("Name")
            ]),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.rForm.name,
                  expression: "rForm.name"
                }
              ],
              ref: "name",
              staticClass: "form-control",
              attrs: {
                type: "text",
                name: "name",
                required: "",
                autocomplete: "name",
                autofocus: "",
                placeholder: "Name"
              },
              domProps: { value: _vm.rForm.name },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.rForm, "name", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm.rForm.errors.get("name")
              ? _c("span", {
                  staticClass: "alert alert-danger ",
                  staticStyle: { "margin-top": "1.5em" },
                  domProps: {
                    textContent: _vm._s(_vm.rForm.errors.get("name"))
                  }
                })
              : _vm._e()
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "form-group" }, [
            _c("label", { staticClass: "sr-only", attrs: { for: "email" } }, [
              _vm._v("Email")
            ]),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.rForm.email,
                  expression: "rForm.email"
                }
              ],
              staticClass: "form-control",
              attrs: {
                type: "email",
                name: "email",
                required: "",
                autocomplete: "email",
                placeholder: "Email address"
              },
              domProps: { value: _vm.rForm.email },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.rForm, "email", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm.rForm.errors.get("email")
              ? _c("span", {
                  staticClass: "alert alert-danger ",
                  staticStyle: { "margin-top": "1.5em" },
                  domProps: {
                    textContent: _vm._s(_vm.rForm.errors.get("email"))
                  }
                })
              : _vm._e()
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "form-group mb-4" }, [
            _c(
              "label",
              { staticClass: "sr-only", attrs: { for: "password" } },
              [_vm._v("Password")]
            ),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.rForm.password,
                  expression: "rForm.password"
                }
              ],
              staticClass: "form-control",
              attrs: {
                type: "password",
                name: "password",
                required: "",
                autocomplete: "new-password",
                placeholder: "Password"
              },
              domProps: { value: _vm.rForm.password },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.rForm, "password", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm.rForm.errors.get("password")
              ? _c("span", {
                  staticClass: "alert alert-danger ",
                  staticStyle: { "margin-top": "1.5em" },
                  domProps: {
                    textContent: _vm._s(_vm.rForm.errors.get("password"))
                  }
                })
              : _vm._e()
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "form-group mb-4" }, [
            _c(
              "label",
              { staticClass: "sr-only", attrs: { for: "password" } },
              [_vm._v("Password")]
            ),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.rForm.password_confirmation,
                  expression: "rForm.password_confirmation"
                }
              ],
              staticClass: "form-control",
              attrs: {
                type: "password",
                name: "password_confirmation",
                required: "",
                autocomplete: "new-password",
                placeholder: "Confirm password"
              },
              domProps: { value: _vm.rForm.password_confirmation },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(
                    _vm.rForm,
                    "password_confirmation",
                    $event.target.value
                  )
                }
              }
            }),
            _vm._v(" "),
            _vm.rForm.errors.get("password_confirmation")
              ? _c("span", {
                  staticClass: "alert alert-danger ",
                  staticStyle: { "margin-top": "1.5em" },
                  domProps: {
                    textContent: _vm._s(
                      _vm.rForm.errors.get("password_confirmation")
                    )
                  }
                })
              : _vm._e()
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "form-group mb-4" }, [
            _c("div", { domProps: { innerHTML: _vm._s(_vm.res_status) } }, [
              _vm._v(_vm._s(_vm.res_status))
            ])
          ]),
          _vm._v(" "),
          _c("input", {
            staticClass: "btn btn-block login-btn mb-4",
            attrs: {
              name: "register",
              id: "register",
              type: "submit",
              value: "Register"
            }
          }),
          _vm._v(" "),
          _c(
            "a",
            {
              staticClass: "btn btn-primary btn-block  mb-4",
              staticStyle: { color: "white", "font-weight": "bold" },
              attrs: { href: "/" }
            },
            [_vm._v("\n                Back Home\n            ")]
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "a",
        {
          staticClass: "forgot-password-link",
          attrs: { href: "/forgot-password" }
        },
        [_vm._v("Forgot password?")]
      ),
      _vm._v(" "),
      _vm._m(0),
      _vm._v(" "),
      _vm._m(1)
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", { staticClass: "login-card-footer-text" }, [
      _vm._v("Lost password? \n            "),
      _c(
        "a",
        { staticClass: "text-reset", attrs: { href: "/forgot-password" } },
        [_vm._v("Reset Password")]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("nav", { staticClass: "login-card-footer-nav" }, [
      _c("a", { attrs: { href: "#!" } }, [_vm._v("Terms of use.")]),
      _vm._v(" "),
      _c("a", { attrs: { href: "#!" } }, [_vm._v("Privacy policy")])
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