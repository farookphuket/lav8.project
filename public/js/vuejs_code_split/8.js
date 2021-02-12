(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/Tagform.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Admin/Tagform.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  data: function data() {
    return {
      tags: [],
      tag: '',
      tagId: '',
      old_tag_page: '',
      moment: moment,
      page_label: '',
      links: [],
      res_status: '',
      show_preview: ''
    };
  },
  mounted: function mounted() {
    this.show_preview = false;
    this.tagId = 0;
    this.getTags();
  },
  methods: {
    setForm: function setForm() {
      this.show_preview = true;
    },
    resetForm: function resetForm() {
      this.show_preview = false;
      this.tag = '';
      this.tagId = 0;
      this.res_status = '';
    },
    makeTag: function makeTag(id) {
      var _this = this;

      var url = "/admin/tags";

      if (id !== 0) {
        url = "/admin/tags/".concat(id);
        axios.put(url, {
          tag: this.tag,
          tagId: this.tagId
        }).then(function (res) {
          _this.res_status = res.data.msg;
          setTimeout(function () {
            _this.resetForm();

            _this.getTags();

            _this.setForm();
          }, 2500);
        });
      } else {
        axios.post(url, {
          tag: this.tag
        }).then(function (res) {
          _this.res_status = res.data.msg;
          setTimeout(function () {
            _this.getTags();

            _this.resetForm();

            _this.setForm();
          }, 2500);
        })["catch"](function (err) {
          _this.res_status = "<span class=\"alert alert-danger\">\n                            Error! check the input! \n                            ".concat(err.response.data.message, "</span>");

          _this.$refs.tag.focus();
        });
      }
    },
    setActive: function setActive(label) {
      var st = "";

      if (label == true) {
        st = 'active';
      } //console.log(label);


      return st;
    },
    getTags: function getTags(pageUrl) {
      var _this2 = this;

      this.res_status = '';
      var url = '';

      if (pageUrl) {
        url = pageUrl;
        this.$cookies.set("old_tag_page", url);
      } else {
        this.old_tag_page = this.$cookies.get("old_tag_page");

        if (this.old_tag_page === null) {
          url = '/admin/getTags';
        } else {
          url = this.old_tag_page;
        }
      }

      axios.get(url).then(function (res) {
        _this2.tags = res.data.tags;
        _this2.links = res.data.tags.links;
      });
    },
    editTag: function editTag(id) {
      var _this3 = this;

      var url = "/admin/tags/".concat(id, "/edit");
      axios.get(url).then(function (res) {
        _this3.tag = res.data.tag.tag_name;
        _this3.tagId = res.data.tag.id;

        _this3.$refs.tag.focus(); //console.log(this.tag);

      });
    },
    delTag: function delTag(id) {
      var _this4 = this;

      var url = "/admin/tags/".concat(id);
      axios["delete"](url).then(function (res) {
        _this4.res_status = res.data.msg;
        setTimeout(function () {
          _this4.setForm();

          _this4.getTags();
        }, 2500);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/Tags.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Admin/Tags.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Tagform_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tagform.vue */ "./resources/js/pages/Admin/Tagform.vue");
//
//
//
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
  props: ["tags"],
  components: {
    Tagform: _Tagform_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      tagData: []
    };
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/Tagform.vue?vue&type=style&index=0&id=27de7a76&scoped=true&lang=css&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--5-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--5-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Admin/Tagform.vue?vue&type=style&index=0&id=27de7a76&scoped=true&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.card-body[data-v-27de7a76]{\n    margin-top:1em;\n}\n.pagination ul[data-v-27de7a76],li[data-v-27de7a76]{\n    margin-top:2em;\n}\n.pagination a[data-v-27de7a76]{\n    padding:8px 16px;\n}\n.pagination .active[data-v-27de7a76]{\n  font-size:25px;\n  font-weight:bold;\n  color:red;\n}\n.pagination span[data-v-27de7a76]{\n    color:blue;\n    font-weight:bold;\n    background-color:#e7e7e7;\n    font-size:18px;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/Tagform.vue?vue&type=style&index=0&id=27de7a76&scoped=true&lang=css&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--5-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--5-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Admin/Tagform.vue?vue&type=style&index=0&id=27de7a76&scoped=true&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--5-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--5-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./Tagform.vue?vue&type=style&index=0&id=27de7a76&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/Tagform.vue?vue&type=style&index=0&id=27de7a76&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/Tagform.vue?vue&type=template&id=27de7a76&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Admin/Tagform.vue?vue&type=template&id=27de7a76&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************/
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
    { staticClass: "col-lg-12" },
    [
      _c("form", { attrs: { action: "" } }, [
        _c("div", { staticClass: "form-group" }, [
          _c("label", { attrs: { for: "" } }),
          _vm._v(" "),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.tag,
                expression: "tag"
              }
            ],
            ref: "tag",
            staticClass: "form-control",
            attrs: { type: "text", placeholder: "Make new Tag" },
            domProps: { value: _vm.tag },
            on: {
              focus: function($event) {
                return _vm.setForm()
              },
              keypress: function($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                ) {
                  return null
                }
                $event.preventDefault()
                return _vm.makeTag(_vm.tagId)
              },
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.tag = $event.target.value
              }
            }
          })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "float-right" }, [
          _c("p", { domProps: { innerHTML: _vm._s(_vm.res_status) } }, [
            _vm._v(_vm._s(_vm.res_status))
          ])
        ])
      ]),
      _vm._v(" "),
      _vm.show_preview === true && _vm.tag
        ? _c("p", [
            _vm._v("you will manage tag \n    "),
            _c("span", { staticClass: "badge badge-info" }, [
              _vm._v("\n        " + _vm._s(_vm.tag) + "\n    ")
            ]),
            _vm._v("\n        please hit Enter to Save it\n    ")
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm._l(_vm.tags.data, function(tag) {
        return _c(
          "div",
          { staticClass: "card card-body", attrs: { tagId: tag.id } },
          [
            _c("h2", { staticClass: "text-center" }, [
              _vm._v("\n            " + _vm._s(tag.tag_name) + "\n        ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "clearfix" }, [
              _c("div", { staticClass: "float-right" }, [
                _vm._v(
                  "\n                on " +
                    _vm._s(_vm.moment(tag.created_at)) +
                    " ·\n                " +
                    _vm._s(_vm.moment(tag.created_at).fromNow()) +
                    "\n            "
                )
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "btn-group" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-primary",
                  on: {
                    click: function($event) {
                      return _vm.editTag(tag.id)
                    }
                  }
                },
                [_vm._v("edit")]
              ),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "btn btn-danger",
                  on: {
                    click: function($event) {
                      return _vm.delTag(tag.id)
                    }
                  }
                },
                [_vm._v("Delete")]
              )
            ])
          ]
        )
      }),
      _vm._v(" "),
      _c("div", { staticClass: "pagination" }, [
        _c(
          "ul",
          { staticClass: "pagination" },
          [
            _c("li", { staticClass: "page-item" }, [
              _c("span", [
                _vm._v(
                  "\n                    showing " +
                    _vm._s(_vm.tags.from) +
                    " to " +
                    _vm._s(_vm.tags.to) +
                    " \n                    of " +
                    _vm._s(_vm.tags.total) +
                    "\n                "
                )
              ])
            ]),
            _vm._v(" "),
            _vm._l(_vm.links, function(li) {
              return _c(
                "li",
                { staticClass: "page-item", attrs: { pageId: li.label } },
                [
                  li.active !== true && li.url !== null
                    ? _c(
                        "a",
                        {
                          class: { active: _vm.setActive(li.active) },
                          attrs: { href: "#" },
                          domProps: { innerHTML: _vm._s(li.label) },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              return _vm.getTags(li.url)
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n                " +
                              _vm._s(li.label) +
                              "\n                "
                          )
                        ]
                      )
                    : _c(
                        "span",
                        {
                          staticClass: "badge badge-default",
                          domProps: { innerHTML: _vm._s(li.label) }
                        },
                        [
                          _vm._v(
                            "\n                    " +
                              _vm._s(li.label) +
                              "\n                "
                          )
                        ]
                      )
                ]
              )
            }),
            _vm._v(" "),
            _c("li", { staticClass: "page-item" }, [
              _c("span", { staticClass: "badge badge-info" }, [
                _vm._v(
                  "\n                    " +
                    _vm._s(_vm.tags.current_page) +
                    "\n                "
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/Tags.vue?vue&type=template&id=48445cc2&":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Admin/Tags.vue?vue&type=template&id=48445cc2& ***!
  \********************************************************************************************************************************************************************************************************/
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
    { staticClass: "col-lg-12" },
    [
      _c("h1", { staticClass: "text-center" }, [
        _vm._v("\n        Tags module is now on Vue \n    ")
      ]),
      _vm._v(" "),
      _c("tagform")
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

/***/ "./resources/js/pages/Admin/Tagform.vue":
/*!**********************************************!*\
  !*** ./resources/js/pages/Admin/Tagform.vue ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Tagform_vue_vue_type_template_id_27de7a76_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tagform.vue?vue&type=template&id=27de7a76&scoped=true& */ "./resources/js/pages/Admin/Tagform.vue?vue&type=template&id=27de7a76&scoped=true&");
/* harmony import */ var _Tagform_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tagform.vue?vue&type=script&lang=js& */ "./resources/js/pages/Admin/Tagform.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Tagform_vue_vue_type_style_index_0_id_27de7a76_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Tagform.vue?vue&type=style&index=0&id=27de7a76&scoped=true&lang=css& */ "./resources/js/pages/Admin/Tagform.vue?vue&type=style&index=0&id=27de7a76&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Tagform_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Tagform_vue_vue_type_template_id_27de7a76_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Tagform_vue_vue_type_template_id_27de7a76_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "27de7a76",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Admin/Tagform.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Admin/Tagform.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./resources/js/pages/Admin/Tagform.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tagform_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Tagform.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/Tagform.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tagform_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Admin/Tagform.vue?vue&type=style&index=0&id=27de7a76&scoped=true&lang=css&":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/pages/Admin/Tagform.vue?vue&type=style&index=0&id=27de7a76&scoped=true&lang=css& ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_5_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Tagform_vue_vue_type_style_index_0_id_27de7a76_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--5-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--5-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./Tagform.vue?vue&type=style&index=0&id=27de7a76&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/Tagform.vue?vue&type=style&index=0&id=27de7a76&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_5_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Tagform_vue_vue_type_style_index_0_id_27de7a76_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_5_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Tagform_vue_vue_type_style_index_0_id_27de7a76_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_5_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Tagform_vue_vue_type_style_index_0_id_27de7a76_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_5_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Tagform_vue_vue_type_style_index_0_id_27de7a76_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/pages/Admin/Tagform.vue?vue&type=template&id=27de7a76&scoped=true&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/pages/Admin/Tagform.vue?vue&type=template&id=27de7a76&scoped=true& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tagform_vue_vue_type_template_id_27de7a76_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Tagform.vue?vue&type=template&id=27de7a76&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/Tagform.vue?vue&type=template&id=27de7a76&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tagform_vue_vue_type_template_id_27de7a76_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tagform_vue_vue_type_template_id_27de7a76_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/pages/Admin/Tags.vue":
/*!*******************************************!*\
  !*** ./resources/js/pages/Admin/Tags.vue ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Tags_vue_vue_type_template_id_48445cc2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tags.vue?vue&type=template&id=48445cc2& */ "./resources/js/pages/Admin/Tags.vue?vue&type=template&id=48445cc2&");
/* harmony import */ var _Tags_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tags.vue?vue&type=script&lang=js& */ "./resources/js/pages/Admin/Tags.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Tags_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Tags_vue_vue_type_template_id_48445cc2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Tags_vue_vue_type_template_id_48445cc2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Admin/Tags.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Admin/Tags.vue?vue&type=script&lang=js&":
/*!********************************************************************!*\
  !*** ./resources/js/pages/Admin/Tags.vue?vue&type=script&lang=js& ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tags_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Tags.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/Tags.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tags_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Admin/Tags.vue?vue&type=template&id=48445cc2&":
/*!**************************************************************************!*\
  !*** ./resources/js/pages/Admin/Tags.vue?vue&type=template&id=48445cc2& ***!
  \**************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tags_vue_vue_type_template_id_48445cc2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Tags.vue?vue&type=template&id=48445cc2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/Tags.vue?vue&type=template&id=48445cc2&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tags_vue_vue_type_template_id_48445cc2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tags_vue_vue_type_template_id_48445cc2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);