(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[21],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/password-reset-form.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/password-reset-form.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "PassReset",
  props: ['email'],
  email: '',
  uniqueId: '',
  timeout: '',
  data: function data() {
    return {
      show: '',
      form: {
        passwd: ''
      },
      ip: [],
      timeout: [],
      uniqueId: []
    };
  },
  mounted: function mounted() {
    this.init();
  },
  methods: {
    sendClick: function sendClick() {
      var _this = this;

      //console.log(window.timeout);
      var url2 = '/update';
      axios.post(url2, {
        passwd: this.$refs.passwd.value,
        email: window.email
      }).then(function (response) {
        _this.show = response.data.msg;
        setTimeout(function () {
          location.href = '/login';
        }, 5500);
      }, function (error) {
        console.log(error.response.data.message);
        _this.show = "<span class=\"badge badge-danger\">\n                        Error  ".concat(error.response.data.message, "!\n                        </span>");
      });
    },
    getMyInfo: function getMyInfo() {
      var _this2 = this;

      axios.get('/getmyresetinfo').then(function (response) {
        _this2.ip = response.data.ip;
      });
    },
    init: function init() {
      this.uniqueId = window.resettoken;
      this.timeout = window.timeout;

      if (this.timeout <= 0) {
        alert("Sorry but your link has been expired!");
        window.location.href = "/";
      } else {
        this.getMyInfo();
        this.getReloadPage();
      }
    },
    getReloadPage: function getReloadPage() {
      var myTime = setInterval(function () {//location.reload();
      }, 35000);

      if (this.timeout <= 1) {
        clearInterval(myTime);
        myTime = 0;
        alert("Your time for reset password is out now\n\n                this page will be expire sonn");
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/password-reset-form.vue?vue&type=template&id=2a1188f9&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/password-reset-form.vue?vue&type=template&id=2a1188f9& ***!
  \**********************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "container" }, [
    _vm._m(0),
    _vm._v(" "),
    _c("form", [
      _c("div", { staticClass: "form-group" }, [
        _c("label", { staticClass: "sr-only", attrs: { for: "passwd" } }, [
          _vm._v("New password")
        ]),
        _vm._v(" "),
        _c("input", {
          ref: "passwd",
          staticClass: "form-control",
          attrs: {
            type: "password",
            name: "passwd",
            placeholder: "Enter your new password"
          }
        })
      ]),
      _vm._v(" "),
      _c(
        "p",
        {
          staticStyle: { margin: "1.5em" },
          domProps: { innerHTML: _vm._s(_vm.show) }
        },
        [_vm._v(_vm._s(_vm.show))]
      ),
      _vm._v(" "),
      _c("input", {
        staticClass: "btn btn-block btn-info send-btn mb-4",
        attrs: {
          name: "send",
          id: "send",
          type: "submit",
          value: "Reset My Password now DUDE"
        },
        on: {
          click: function($event) {
            $event.preventDefault()
            return _vm.sendClick()
          }
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
        [_vm._v("\n            Back Home\n        ")]
      )
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", [
      _vm._v(
        "\n        dear friend please enter your new password before the time out \n        "
      ),
      _c("b", [_vm._v("please note")]),
      _vm._v(" that this page will be expire soon .\n    ")
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

/***/ "./resources/js/components/password-reset-form.vue":
/*!*********************************************************!*\
  !*** ./resources/js/components/password-reset-form.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _password_reset_form_vue_vue_type_template_id_2a1188f9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./password-reset-form.vue?vue&type=template&id=2a1188f9& */ "./resources/js/components/password-reset-form.vue?vue&type=template&id=2a1188f9&");
/* harmony import */ var _password_reset_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./password-reset-form.vue?vue&type=script&lang=js& */ "./resources/js/components/password-reset-form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _password_reset_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _password_reset_form_vue_vue_type_template_id_2a1188f9___WEBPACK_IMPORTED_MODULE_0__["render"],
  _password_reset_form_vue_vue_type_template_id_2a1188f9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/password-reset-form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/password-reset-form.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/password-reset-form.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_password_reset_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./password-reset-form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/password-reset-form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_password_reset_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/password-reset-form.vue?vue&type=template&id=2a1188f9&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/password-reset-form.vue?vue&type=template&id=2a1188f9& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_password_reset_form_vue_vue_type_template_id_2a1188f9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./password-reset-form.vue?vue&type=template&id=2a1188f9& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/password-reset-form.vue?vue&type=template&id=2a1188f9&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_password_reset_form_vue_vue_type_template_id_2a1188f9___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_password_reset_form_vue_vue_type_template_id_2a1188f9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);