(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/Template.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Admin/Template.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jodit_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jodit-vue */ "./node_modules/jodit-vue/dist/jodit-vue.esm.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  props: ["templates"],
  data: function data() {
    return {
      moment: moment,
      editId: false,
      theHolder: '',
      excerpt: '',
      title: '',
      body: '',
      show_preview: '',
      res_status: '',
      ownerId: '',
      ownerName: ''
    };
  },
  mounted: function mounted() {
    //console.log(this.templates);
    this.show_preview = false;
    this.ownerId = window.ownerId;
    this.ownerName = window.ownerName;
  },
  methods: {
    editTemplate: function editTemplate(id) {
      var _this = this;

      var url = "/admin/templates/".concat(id, "/edit");
      axios.get(url).then(function (res) {
        //console.log(res.data);
        _this.body = res.data.template.body;
        _this.title = res.data.template.title;
        _this.excerpt = res.data.template.excerpt;
        _this.editId = res.data.template.id;

        _this.$refs.title.focus();
      });
    },
    getPreview: function getPreview() {
      this.show_preview = true;
    },
    getActive: function getActive(st) {
      var active = '';

      if (st == true) {
        active = 'active';
      }

      return active;
    },
    saveTemplate: function saveTemplate(id) {
      var _this2 = this;

      var url = '';
      var data = {
        title: this.title,
        excerpt: this.excerpt,
        body: this.body
      };

      if (!id) {
        url = '/admin/templates';
        axios.post(url, data).then(function (res) {
          _this2.res_status = res.data.msg;
        })["catch"](function (err) {
          //console.log(err.response.data.message);
          _this2.res_status = "<span class=\"alert alert-danger\">\n                            ".concat(err.response.data.message, "\n                            please check your input\n                        </span>");
        });
      } else {
        url = "/admin/templates/".concat(id);
        axios.put(url, data).then(function (res) {
          _this2.res_status = res.data.msg;
        })["catch"](function (err) {
          //console.log(err.response.data);
          _this2.res_status = "<span class=\"alert alert-danger\">\n                            ".concat(err.response.data.message, "  Please check your input field!\n                           </span> ");
        });
      }

      setTimeout(function () {
        location.reload();
      }, 2000);
    },
    goToPage: function goToPage(url) {
      location.href = url;
    },
    delTemplate: function delTemplate(id) {
      var _this3 = this;

      var url = "/admin/templates/".concat(id);
      axios["delete"](url).then(function (res) {
        //console.log(res.data.msg);
        _this3.res_status = res.data.msg;
      });
      setTimeout(function () {
        location.reload();
      }, 2000);
    },
    placeholder: function placeholder(what) {
      switch (what) {
        case "excerpt":
          this.theHolder = "Howdy, ".concat(ownerName, " what's in your mind?");
          break;

        case "body":
          this.theHolder = "How to write in here ha ha";
          break;

        default:
          this.theHolder = "please enter ".concat(what, " name his TAT");
          break;
      }

      return this.theHolder;
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/Template.vue?vue&type=style&index=0&id=7c2ba7ba&scoped=true&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--5-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--5-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Admin/Template.vue?vue&type=style&index=0&id=7c2ba7ba&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.show_preview[data-v-7c2ba7ba]{\n    padding-top:2em;\n    padding-bottom:4em;\n}\n.card-body[data-v-7c2ba7ba]{\n    margin-top:1em;\n}\n.show_list .pagination ul[data-v-7c2ba7ba],li[data-v-7c2ba7ba]{\n    display:inline-block;\n}\n.pagination a[data-v-7c2ba7ba]{\n      padding:8px 16px;\n}\n.pagination a[data-v-7c2ba7ba]:hover{\n      padding:8px 16px;\n      border:1px #ff0000 dashed; \n      background-color:black;\n      color:red;\n}\n.pagination .active[data-v-7c2ba7ba]{\n      font-size:25px;\n      font-weight:bold;\n      color:#e7e7e7;\n}\n@media all and(max-width:600px){\n.pagination li[data-v-7c2ba7ba]{\n            display:flex;\n}\n.pagination a[data-v-7c2ba7ba]{\n            padding:1px 8px;\n            color:blue;\n}\n}\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/Template.vue?vue&type=style&index=0&id=7c2ba7ba&scoped=true&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--5-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--5-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Admin/Template.vue?vue&type=style&index=0&id=7c2ba7ba&scoped=true&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--5-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--5-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./Template.vue?vue&type=style&index=0&id=7c2ba7ba&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/Template.vue?vue&type=style&index=0&id=7c2ba7ba&scoped=true&lang=css&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/Template.vue?vue&type=template&id=7c2ba7ba&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Admin/Template.vue?vue&type=template&id=7c2ba7ba&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************/
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
    _c("h1", { staticClass: "text-center" }, [
      _vm._v("new template Admin using Vue")
    ]),
    _vm._v(" "),
    _c("p", [
      _vm._v(
        "\n        this is the template generate customizer in your post.\n    "
      )
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-lg-12" }, [
        _c("form", [
          _c("div", { staticClass: "form-group" }, [
            _c("label", { attrs: { for: "" } }, [_vm._v("title")]),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.title,
                  expression: "title"
                }
              ],
              ref: "title",
              staticClass: "form-control",
              attrs: { id: "", type: "text", placeholder: "Enter title" },
              domProps: { value: _vm.title },
              on: {
                focus: _vm.getPreview,
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.title = $event.target.value
                }
              }
            })
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "form-group" },
            [
              _c("label", { attrs: { for: "" } }, [_vm._v("excerpt")]),
              _vm._v(" "),
              _c("jodit-editor", {
                attrs: {
                  height: "550",
                  placeholder: _vm.placeholder("excerpt")
                },
                model: {
                  value: _vm.excerpt,
                  callback: function($$v) {
                    _vm.excerpt = $$v
                  },
                  expression: "excerpt"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "form-group" },
            [
              _c("label", { attrs: { for: "" } }, [_vm._v("body")]),
              _vm._v(" "),
              _c("jodit-editor", {
                attrs: { height: "550" },
                model: {
                  value: _vm.body,
                  callback: function($$v) {
                    _vm.body = $$v
                  },
                  expression: "body"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c("div", { staticClass: "float-right btn-group" }, [
            _c(
              "button",
              {
                staticClass: "btn btn-primary",
                attrs: { type: "submit" },
                on: {
                  click: function($event) {
                    $event.preventDefault()
                    return _vm.saveTemplate(_vm.editId)
                  }
                }
              },
              [_vm._v("\n                        Save\n                    ")]
            )
          ])
        ]),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "text-center",
            staticStyle: { "margin-top": "2.5em" },
            domProps: { innerHTML: _vm._s(_vm.res_status) }
          },
          [_vm._v(_vm._s(_vm.res_status))]
        )
      ]),
      _vm._v(" "),
      _vm.show_preview === true
        ? _c("div", { staticClass: "card card-body show_preview" }, [
            _c("h1", { staticClass: "text-center" }, [
              _vm._v(_vm._s(_vm.title))
            ]),
            _vm._v(" "),
            _c("ul", { staticClass: "list-group" }, [
              _c("li", { staticClass: "list-group-item" }, [
                _vm._v("\n                    By \n                    "),
                _c("span", { staticClass: "badge badge-warning" }, [
                  _vm._v(
                    "\n                        " +
                      _vm._s(_vm.ownerName) +
                      "\n                    "
                  )
                ])
              ]),
              _vm._v(" "),
              _c("li", { staticClass: "list-group-item" }, [
                _vm._v(
                  "\n                    on " +
                    _vm._s(_vm.moment(new Date().toLocaleString())) +
                    "\n                    ·\n                    " +
                    _vm._s(_vm.moment(new Date().toLocaleString()).fromNow()) +
                    "\n                "
                )
              ])
            ]),
            _vm._v(" "),
            _c("div", { domProps: { innerHTML: _vm._s(_vm.excerpt) } }, [
              _vm._v(_vm._s(_vm.excerpt))
            ]),
            _vm._v(" "),
            _c("div", { domProps: { innerHTML: _vm._s(_vm.body) } }, [
              _vm._v(_vm._s(_vm.body))
            ])
          ])
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "col-lg-12 show_list" },
        [
          _vm._l(_vm.templates.data, function(item) {
            return _c(
              "div",
              { staticClass: "card card-body", attrs: { editId: item.id } },
              [
                _c("h1", { staticClass: "text-center" }, [
                  _vm._v(
                    "\n                    " +
                      _vm._s(item.title) +
                      "  \n                "
                  )
                ]),
                _vm._v(" "),
                _c("ul", { staticClass: "list-group" }, [
                  _c("li", { staticClass: "list-group-item" }, [
                    _vm._v(_vm._s(item.user.name))
                  ]),
                  _vm._v(" "),
                  _c("li", { staticClass: "list-group-item" }, [
                    _vm._v(
                      "\n                        " +
                        _vm._s(_vm.moment(item.created_at)) +
                        "\n                        ·\n                        " +
                        _vm._s(_vm.moment(item.created_at).fromNow()) +
                        "\n                    "
                    )
                  ])
                ]),
                _vm._v(" "),
                _c("div", { domProps: { innerHTML: _vm._s(item.excerpt) } }, [
                  _vm._v(
                    "\n                   " +
                      _vm._s(item.excerpt) +
                      "\n               "
                  )
                ]),
                _vm._v(" "),
                item.user_id === _vm.ownerId
                  ? _c("div", { staticStyle: { "text-align": "left" } }, [
                      _vm._v("\n                   your post\n               ")
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c("div", { staticStyle: { "text-align": "right" } }, [
                  _c("div", { staticClass: "btn-group" }, [
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-primary",
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            return _vm.editTemplate(item.id)
                          }
                        }
                      },
                      [_vm._v("Edit")]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-danger",
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            return _vm.delTemplate(item.id)
                          }
                        }
                      },
                      [_vm._v("Delete")]
                    )
                  ])
                ])
              ]
            )
          }),
          _vm._v(" "),
          _c("div", { staticClass: "pagination" }, [
            _c(
              "ul",
              { staticClass: "pagination justify-content-center" },
              [
                _c("li", { staticClass: "page-item" }, [
                  _vm._v(
                    "\n                        showing " +
                      _vm._s(_vm.templates.from) +
                      " to " +
                      _vm._s(_vm.templates.to) +
                      " of " +
                      _vm._s(_vm.templates.total) +
                      "\n                    "
                  )
                ]),
                _vm._v(" "),
                _vm._l(_vm.templates.links, function(item) {
                  return _c(
                    "li",
                    { staticClass: "page-item", attrs: { pageId: item.label } },
                    [
                      item.active !== true && item.url !== null
                        ? _c(
                            "a",
                            {
                              class: { active: _vm.getActive(item.active) },
                              attrs: { href: "#" },
                              domProps: { innerHTML: _vm._s(item.label) },
                              on: {
                                click: function($event) {
                                  $event.preventDefault()
                                  return _vm.goToPage(item.url)
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                        " +
                                  _vm._s(item.label) +
                                  "\n                        "
                              )
                            ]
                          )
                        : _c(
                            "span",
                            {
                              staticClass: "badge badge-default active",
                              domProps: { innerHTML: _vm._s(item.label) }
                            },
                            [_vm._v(_vm._s(item.label))]
                          )
                    ]
                  )
                }),
                _vm._v(" "),
                _c("li", { staticClass: "list-group-item" }, [
                  _vm._v(
                    "\n                        Page " +
                      _vm._s(_vm.templates.current_page) +
                      "\n                    "
                  )
                ])
              ],
              2
            )
          ])
        ],
        2
      )
    ])
  ])
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

/***/ "./resources/js/pages/Admin/Template.vue":
/*!***********************************************!*\
  !*** ./resources/js/pages/Admin/Template.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Template_vue_vue_type_template_id_7c2ba7ba_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Template.vue?vue&type=template&id=7c2ba7ba&scoped=true& */ "./resources/js/pages/Admin/Template.vue?vue&type=template&id=7c2ba7ba&scoped=true&");
/* harmony import */ var _Template_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Template.vue?vue&type=script&lang=js& */ "./resources/js/pages/Admin/Template.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Template_vue_vue_type_style_index_0_id_7c2ba7ba_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Template.vue?vue&type=style&index=0&id=7c2ba7ba&scoped=true&lang=css& */ "./resources/js/pages/Admin/Template.vue?vue&type=style&index=0&id=7c2ba7ba&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Template_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Template_vue_vue_type_template_id_7c2ba7ba_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Template_vue_vue_type_template_id_7c2ba7ba_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "7c2ba7ba",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Admin/Template.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Admin/Template.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/pages/Admin/Template.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Template_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Template.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/Template.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Template_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Admin/Template.vue?vue&type=style&index=0&id=7c2ba7ba&scoped=true&lang=css&":
/*!********************************************************************************************************!*\
  !*** ./resources/js/pages/Admin/Template.vue?vue&type=style&index=0&id=7c2ba7ba&scoped=true&lang=css& ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_5_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Template_vue_vue_type_style_index_0_id_7c2ba7ba_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--5-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--5-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./Template.vue?vue&type=style&index=0&id=7c2ba7ba&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/Template.vue?vue&type=style&index=0&id=7c2ba7ba&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_5_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Template_vue_vue_type_style_index_0_id_7c2ba7ba_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_5_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Template_vue_vue_type_style_index_0_id_7c2ba7ba_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_5_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Template_vue_vue_type_style_index_0_id_7c2ba7ba_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_5_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Template_vue_vue_type_style_index_0_id_7c2ba7ba_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/pages/Admin/Template.vue?vue&type=template&id=7c2ba7ba&scoped=true&":
/*!******************************************************************************************!*\
  !*** ./resources/js/pages/Admin/Template.vue?vue&type=template&id=7c2ba7ba&scoped=true& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Template_vue_vue_type_template_id_7c2ba7ba_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Template.vue?vue&type=template&id=7c2ba7ba&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/Template.vue?vue&type=template&id=7c2ba7ba&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Template_vue_vue_type_template_id_7c2ba7ba_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Template_vue_vue_type_template_id_7c2ba7ba_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);