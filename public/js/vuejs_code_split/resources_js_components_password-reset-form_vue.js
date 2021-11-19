"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_password-reset-form_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/password-reset-form.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/password-reset-form.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************/
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "PasswordReset",
  props: ["resettoken"],
  data: function data() {
    return {
      res_status: "",
      passwd: "",
      email: '',
      timeleft: 20,
      theTime: 0,
      msg: '',
      disabled: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.getLastStatus();
    this.theTime = setInterval(function () {
      _this.getLastStatus();

      if (_this.timeleft <= 0) {
        clearInterval(_this.theTime);
        _this.disabled = true;
      }
    }, 39500);
  },
  methods: {
    getLastStatus: function getLastStatus() {
      var _this2 = this;

      var url = "/passwordreset/".concat(this.resettoken);
      axios.get(url).then(function (res) {
        //                   console.log(res.data)
        var re = res.data;
        _this2.msg = re.msg;
        _this2.email = re.email;
        _this2.timeleft = re.timeleft;
      });
    },
    resetMyPassword: function resetMyPassword() {
      var _this3 = this;

      var url = "/update";
      var data = {
        email: this.email,
        passwd: this.passwd
      };
      axios.post(url, data).then(function (res) {
        //                    console.log(res.data)
        _this3.res_status = res.data.msg;

        _this3.$refs["onOk"].show();
      });
    },
    gohome: function gohome() {
      location.href = '/';
    }
  }
});

/***/ }),

/***/ "./resources/js/components/password-reset-form.vue":
/*!*********************************************************!*\
  !*** ./resources/js/components/password-reset-form.vue ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _password_reset_form_vue_vue_type_template_id_2a1188f9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./password-reset-form.vue?vue&type=template&id=2a1188f9& */ "./resources/js/components/password-reset-form.vue?vue&type=template&id=2a1188f9&");
/* harmony import */ var _password_reset_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./password-reset-form.vue?vue&type=script&lang=js& */ "./resources/js/components/password-reset-form.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _password_reset_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _password_reset_form_vue_vue_type_template_id_2a1188f9___WEBPACK_IMPORTED_MODULE_0__.render,
  _password_reset_form_vue_vue_type_template_id_2a1188f9___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/password-reset-form.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/password-reset-form.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/password-reset-form.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_password_reset_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./password-reset-form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/password-reset-form.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_password_reset_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/password-reset-form.vue?vue&type=template&id=2a1188f9&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/password-reset-form.vue?vue&type=template&id=2a1188f9& ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_password_reset_form_vue_vue_type_template_id_2a1188f9___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_password_reset_form_vue_vue_type_template_id_2a1188f9___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_password_reset_form_vue_vue_type_template_id_2a1188f9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./password-reset-form.vue?vue&type=template&id=2a1188f9& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/password-reset-form.vue?vue&type=template&id=2a1188f9&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/password-reset-form.vue?vue&type=template&id=2a1188f9&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/password-reset-form.vue?vue&type=template&id=2a1188f9& ***!
  \*******************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "container" },
    [
      _c("p", { domProps: { innerHTML: _vm._s(_vm.msg) } }, [
        _vm._v("\n    " + _vm._s(_vm.email) + " " + _vm._s(_vm.msg) + "\n    ")
      ]),
      _vm._v(" "),
      _c("form", [
        _c("div", { staticClass: "form-group" }, [
          _c("label", { staticClass: "sr-only", attrs: { for: "passwd" } }, [
            _vm._v("New password")
          ]),
          _vm._v(" "),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.passwd,
                expression: "passwd"
              }
            ],
            ref: "passwd",
            staticClass: "form-control",
            attrs: { type: "password", placeholder: "Enter your new password" },
            domProps: { value: _vm.passwd },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.passwd = $event.target.value
              }
            }
          })
        ]),
        _vm._v(" "),
        _c("p", { staticClass: "pt-4 mb-2" }, [_vm._v(" ")]),
        _vm._v(" "),
        _c("input", {
          staticClass: "btn btn-block btn-outline-info send-btn mb-4",
          attrs: {
            type: "submit",
            disabled: _vm.disabled,
            value: "Reset My Password"
          },
          on: {
            click: function($event) {
              $event.preventDefault()
              return _vm.resetMyPassword.apply(null, arguments)
            }
          }
        }),
        _vm._v(" "),
        _c(
          "a",
          {
            staticClass: "btn btn-outline-primary btn-block  mb-4",
            staticStyle: { color: "blue", "font-weight": "bold" },
            attrs: { href: "/" }
          },
          [_vm._v("\n            Back Home\n        ")]
        )
      ]),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          ref: "onOk",
          attrs: { title: "server Said :", centered: "", "ok-only": "" },
          on: { ok: _vm.gohome }
        },
        [
          _c(
            "div",
            {
              staticClass: "container",
              domProps: { innerHTML: _vm._s(_vm.res_status) }
            },
            [_vm._v("\n            " + _vm._s(_vm.res_status) + "\n        ")]
          )
        ]
      )
    ],
    1
  )
}
var staticRenderFns = []
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