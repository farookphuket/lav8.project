(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[15],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/VisitorForm.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Admin/VisitorForm.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "VisitorForm"
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/VisitorList.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Admin/VisitorList.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "VisitorList",
  props: ["visitors"],
  data: function data() {
    return {
      checkForDelete: [],
      totalLeft: 0,
      oldLeft: 0
    };
  },
  watch: {
    "visitors": function visitors(x) {
      this.getFresh();
      this.totalLeft = x.total;
    }
  },
  mounted: function mounted() {//this.getFresh()
  },
  methods: {
    getFresh: function getFresh() {
      this.checkForDelete = [];
    },
    getTotal: function getTotal() {
      this.oldLeft = 0;
      var plus = '';
      var minus = '';

      if (this.checkForDelete.length == +1) {
        minus = this.totalLeft - this.checkForDelete.length;
        this.oldLeft = minus;
      } else {
        plus = this.totalLeft;
        this.oldLeft = plus - this.checkForDelete.length;
      }

      return this.oldLeft;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/Visitors.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Admin/Visitors.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VisitorForm_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VisitorForm.vue */ "./resources/js/pages/Admin/VisitorForm.vue");
/* harmony import */ var _VisitorList_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VisitorList.vue */ "./resources/js/pages/Admin/VisitorList.vue");
//
//
//
//
//
//
//
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
  name: "Avisitor",
  components: {
    VisitorForm: _VisitorForm_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    VisitorList: _VisitorList_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function data() {
    return {
      visitors: [],
      editId: 0,
      res_status: ''
    };
  },
  mounted: function mounted() {
    this.getVisitors();
  },
  methods: {
    getVisitors: function getVisitors(page) {
      var _this = this;

      var url = '';

      if (page) {
        url = page;
        this.$cookies.set("old_visitor_page", url);
      }

      url = this.$cookies.get("old_visitor_page");

      if (!url) {
        url = "/admin/getVisitorList";
      }

      axios.get(url).then(function (res) {
        _this.visitors = res.data.visitors;
      });
    },
    delSelect: function delSelect(id) {
      var _this2 = this;

      var url = "/admin/visitors/".concat(id);
      axios["delete"](url).then(function (res) {
        _this2.res_status = res.data.msg;
      }, function (err) {
        _this2.res_status = err.response.data.message;
      });
      this.$refs["onOk"].show();
    },
    closeBox: function closeBox() {
      this.getVisitors();
    },
    resetVisitor: function resetVisitor(x) {
      var _this3 = this;

      if (confirm("This will be remove all of the record\n \n            are you sure?") == true) {
        var url = "/admin/resetVisitor";
        axios.get(url).then(function (res) {
          _this3.res_status = res.data.msg;
        }, function (err) {
          _this3.res_status = "<span class=\"badge badge-danger\">\n                            ".concat(err.response.data.message, "</span>");
        });

        if (this.$cookies.isKey("old_visitor_page")) {
          this.$cookies.remove("old_visitor_page");
        }

        this.$refs["onOk"].show();
      } else {
        return;
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/VisitorForm.vue?vue&type=template&id=5bc10839&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Admin/VisitorForm.vue?vue&type=template&id=5bc10839& ***!
  \***************************************************************************************************************************************************************************************************************/
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
    _c("div", { staticClass: "clearfix" }, [
      _c("div", { staticClass: "float-right" }, [
        _c(
          "button",
          {
            staticClass: "btn btn-danger",
            on: {
              click: function($event) {
                $event.preventDefault()
                return _vm.$emit("resetVisitor")
              }
            }
          },
          [_vm._v("Delete All")]
        )
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/VisitorList.vue?vue&type=template&id=e08ba1da&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Admin/VisitorList.vue?vue&type=template&id=e08ba1da& ***!
  \***************************************************************************************************************************************************************************************************************/
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
    _c("table", { staticClass: "table table-striped" }, [
      _vm._m(0),
      _vm._v(" "),
      _c(
        "tbody",
        [
          _c("tr", [
            _c("td", { attrs: { colspan: "7" } }, [
              _c("div", { staticClass: "clearfix" }, [
                _c("div", { staticClass: "float-left" }, [
                  _vm._v("\n\n                            Has "),
                  _c("span", { staticClass: "badge badge-info" }, [
                    _vm._v(
                      "\n                                " +
                        _vm._s(_vm.visitors.total) +
                        "\n                            "
                    )
                  ]),
                  _vm._v(" "),
                  _c(
                    "span",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.checkForDelete != 0,
                          expression: "checkForDelete != 0"
                        }
                      ]
                    },
                    [
                      _vm._v(
                        "\n                                ·\n                                item to be remove " +
                          _vm._s(_vm.checkForDelete.length) +
                          "\n                            "
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _vm.checkForDelete != 0
                    ? _c("span", { staticClass: "badge badge-danger" }, [
                        _vm._v(
                          "\n                                 " +
                            _vm._s(_vm.checkForDelete)
                        )
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "span",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.checkForDelete != 0,
                          expression: "checkForDelete != 0"
                        }
                      ]
                    },
                    [
                      _vm._v(
                        "\n                                ·\n                                 " +
                          _vm._s(_vm.oldLeft) +
                          " \n                                 after the operation"
                      )
                    ]
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "float-right" }, [
                  _vm.checkForDelete != 0
                    ? _c(
                        "button",
                        {
                          staticClass: "btn btn-danger",
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              return _vm.$emit("delSelect", _vm.checkForDelete)
                            }
                          }
                        },
                        [_vm._v("delete select")]
                      )
                    : _vm._e()
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _vm._l(_vm.visitors.data, function(li) {
            return _c("tr", [
              _c("td", [_vm._v(_vm._s(li.client_ip) + " ")]),
              _vm._v(" "),
              _c("td", [_vm._v(_vm._s(li.client_browser))]),
              _vm._v(" "),
              _c("td", [_vm._v(_vm._s(li.client_os))]),
              _vm._v(" "),
              _c("td", [_vm._v(_vm._s(li.last_visited_date))]),
              _vm._v(" "),
              _c("td", [_vm._v(_vm._s(li.visited_month))]),
              _vm._v(" "),
              _c("td", [_vm._v(_vm._s(li.visited_year))]),
              _vm._v(" "),
              _c("td", [
                _c("div", { staticClass: "clearfix" }, [
                  _c("div", { staticClass: "float-right" }, [
                    _c("label", { attrs: { for: "" } }, [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.checkForDelete,
                            expression: "checkForDelete"
                          }
                        ],
                        staticClass: "form-control",
                        attrs: {
                          id: "",
                          "true-value": 1,
                          type: "checkbox",
                          name: ""
                        },
                        domProps: {
                          value: li.id,
                          checked: Array.isArray(_vm.checkForDelete)
                            ? _vm._i(_vm.checkForDelete, li.id) > -1
                            : _vm._q(_vm.checkForDelete, 1)
                        },
                        on: {
                          change: [
                            function($event) {
                              var $$a = _vm.checkForDelete,
                                $$el = $event.target,
                                $$c = $$el.checked ? 1 : false
                              if (Array.isArray($$a)) {
                                var $$v = li.id,
                                  $$i = _vm._i($$a, $$v)
                                if ($$el.checked) {
                                  $$i < 0 &&
                                    (_vm.checkForDelete = $$a.concat([$$v]))
                                } else {
                                  $$i > -1 &&
                                    (_vm.checkForDelete = $$a
                                      .slice(0, $$i)
                                      .concat($$a.slice($$i + 1)))
                                }
                              } else {
                                _vm.checkForDelete = $$c
                              }
                            },
                            function($event) {
                              return _vm.getTotal()
                            }
                          ]
                        }
                      }),
                      _vm._v(
                        "\n                                Mark for delete\n                            "
                      )
                    ])
                  ])
                ])
              ])
            ])
          }),
          _vm._v(" "),
          _c("tr", [
            _c("td", { attrs: { colspan: "7" } }, [
              _c("div", { staticClass: "clearfix" }, [
                _c("div", { staticClass: "float-left" }, [
                  _vm._v("\n                            Has "),
                  _c("span", { staticClass: "badge badge-info" }, [
                    _vm._v(
                      "\n                                " +
                        _vm._s(_vm.visitors.total) +
                        "\n                            "
                    )
                  ]),
                  _vm._v(" "),
                  _c(
                    "span",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.checkForDelete != 0,
                          expression: "checkForDelete != 0"
                        }
                      ]
                    },
                    [
                      _vm._v(
                        "\n                                ·\n                                item to be remove " +
                          _vm._s(_vm.checkForDelete.length) +
                          "\n                            "
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _vm.checkForDelete != 0
                    ? _c("span", { staticClass: "badge badge-danger" }, [
                        _vm._v(_vm._s(_vm.checkForDelete))
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "span",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.checkForDelete != 0,
                          expression: "checkForDelete != 0"
                        }
                      ]
                    },
                    [
                      _vm._v(
                        "\n                                ·\n                                 " +
                          _vm._s(_vm.oldLeft) +
                          " \n                               left  after the operation"
                      )
                    ]
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "float-right" }, [
                  _vm.checkForDelete != 0
                    ? _c(
                        "button",
                        {
                          staticClass: "btn btn-danger",
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              return _vm.$emit("delSelect", _vm.checkForDelete)
                            }
                          }
                        },
                        [_vm._v("delete select")]
                      )
                    : _vm._e()
                ])
              ])
            ])
          ])
        ],
        2
      )
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "pa" }, [
      _c(
        "ul",
        { staticClass: "pagination" },
        [
          _c("li", { staticClass: "page-item" }, [
            _vm._v("\n                showing from  \n                "),
            _c("span", [_vm._v(_vm._s(_vm.visitors.from) + " ")]),
            _vm._v(" \n                to "),
            _c("span", [_vm._v(_vm._s(_vm.visitors.to) + " ")]),
            _vm._v(" \n                of "),
            _c("span", [_vm._v(_vm._s(_vm.visitors.total))]),
            _vm._v(" ·\n            ")
          ]),
          _vm._v(" "),
          _vm._l(_vm.visitors.links, function(li) {
            return _c("li", { staticClass: "page-item" }, [
              li.active != true && li.url != null
                ? _c(
                    "a",
                    {
                      attrs: { href: "" },
                      domProps: { innerHTML: _vm._s(li.label) },
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          return _vm.$emit("getVisitors", li.url)
                        }
                      }
                    },
                    [
                      _vm._v(
                        "\n                    " +
                          _vm._s(li.label) +
                          " \n                "
                      )
                    ]
                  )
                : _c(
                    "span",
                    {
                      staticClass: "active",
                      domProps: { innerHTML: _vm._s(li.label) }
                    },
                    [
                      _vm._v(
                        "\n                    " +
                          _vm._s(li.label) +
                          " \n                "
                      )
                    ]
                  )
            ])
          }),
          _vm._v(" "),
          _c("li", { staticClass: "page-item" }, [
            _vm._v("\n               · "),
            _c("span", { staticClass: "active" }, [
              _vm._v(
                "\n                    " +
                  _vm._s(_vm.visitors.current_page) +
                  "\n                "
              )
            ])
          ])
        ],
        2
      )
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("th", [_vm._v("ip")]),
      _vm._v(" "),
      _c("th", [_vm._v("Browser")]),
      _vm._v(" "),
      _c("th", [_vm._v("os")]),
      _vm._v(" "),
      _c("th", [_vm._v("\n                day\n            ")]),
      _vm._v(" "),
      _c("th", [_vm._v("month")]),
      _vm._v(" "),
      _c("th", [_vm._v("year")]),
      _vm._v(" "),
      _c("th", [_vm._v("Manage")])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/Visitors.vue?vue&type=template&id=1c93c824&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Admin/Visitors.vue?vue&type=template&id=1c93c824& ***!
  \************************************************************************************************************************************************************************************************************/
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
    { staticClass: "container-fluid" },
    [
      _c("visitor-form", {
        on: {
          resetVisitor: function($event) {
            return _vm.resetVisitor($event)
          }
        }
      }),
      _vm._v(" "),
      _c("visitor-list", {
        attrs: { visitors: _vm.visitors },
        on: {
          getVisitors: function($event) {
            return _vm.getVisitors($event)
          },
          delSelect: function($event) {
            return _vm.delSelect($event)
          }
        }
      }),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          ref: "onOk",
          attrs: { title: "server response :", "ok-only": "" },
          on: { ok: _vm.closeBox }
        },
        [
          _c("div", { domProps: { innerHTML: _vm._s(_vm.res_status) } }, [
            _vm._v("\n            " + _vm._s(_vm.res_status) + "\n        ")
          ])
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

/***/ "./resources/js/pages/Admin/VisitorForm.vue":
/*!**************************************************!*\
  !*** ./resources/js/pages/Admin/VisitorForm.vue ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VisitorForm_vue_vue_type_template_id_5bc10839___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VisitorForm.vue?vue&type=template&id=5bc10839& */ "./resources/js/pages/Admin/VisitorForm.vue?vue&type=template&id=5bc10839&");
/* harmony import */ var _VisitorForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VisitorForm.vue?vue&type=script&lang=js& */ "./resources/js/pages/Admin/VisitorForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _VisitorForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _VisitorForm_vue_vue_type_template_id_5bc10839___WEBPACK_IMPORTED_MODULE_0__["render"],
  _VisitorForm_vue_vue_type_template_id_5bc10839___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Admin/VisitorForm.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Admin/VisitorForm.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/pages/Admin/VisitorForm.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VisitorForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./VisitorForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/VisitorForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VisitorForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Admin/VisitorForm.vue?vue&type=template&id=5bc10839&":
/*!*********************************************************************************!*\
  !*** ./resources/js/pages/Admin/VisitorForm.vue?vue&type=template&id=5bc10839& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VisitorForm_vue_vue_type_template_id_5bc10839___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./VisitorForm.vue?vue&type=template&id=5bc10839& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/VisitorForm.vue?vue&type=template&id=5bc10839&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VisitorForm_vue_vue_type_template_id_5bc10839___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VisitorForm_vue_vue_type_template_id_5bc10839___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/pages/Admin/VisitorList.vue":
/*!**************************************************!*\
  !*** ./resources/js/pages/Admin/VisitorList.vue ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VisitorList_vue_vue_type_template_id_e08ba1da___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VisitorList.vue?vue&type=template&id=e08ba1da& */ "./resources/js/pages/Admin/VisitorList.vue?vue&type=template&id=e08ba1da&");
/* harmony import */ var _VisitorList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VisitorList.vue?vue&type=script&lang=js& */ "./resources/js/pages/Admin/VisitorList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _VisitorList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _VisitorList_vue_vue_type_template_id_e08ba1da___WEBPACK_IMPORTED_MODULE_0__["render"],
  _VisitorList_vue_vue_type_template_id_e08ba1da___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Admin/VisitorList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Admin/VisitorList.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/pages/Admin/VisitorList.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VisitorList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./VisitorList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/VisitorList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VisitorList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Admin/VisitorList.vue?vue&type=template&id=e08ba1da&":
/*!*********************************************************************************!*\
  !*** ./resources/js/pages/Admin/VisitorList.vue?vue&type=template&id=e08ba1da& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VisitorList_vue_vue_type_template_id_e08ba1da___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./VisitorList.vue?vue&type=template&id=e08ba1da& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/VisitorList.vue?vue&type=template&id=e08ba1da&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VisitorList_vue_vue_type_template_id_e08ba1da___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VisitorList_vue_vue_type_template_id_e08ba1da___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/pages/Admin/Visitors.vue":
/*!***********************************************!*\
  !*** ./resources/js/pages/Admin/Visitors.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Visitors_vue_vue_type_template_id_1c93c824___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Visitors.vue?vue&type=template&id=1c93c824& */ "./resources/js/pages/Admin/Visitors.vue?vue&type=template&id=1c93c824&");
/* harmony import */ var _Visitors_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Visitors.vue?vue&type=script&lang=js& */ "./resources/js/pages/Admin/Visitors.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Visitors_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Visitors_vue_vue_type_template_id_1c93c824___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Visitors_vue_vue_type_template_id_1c93c824___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Admin/Visitors.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Admin/Visitors.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/pages/Admin/Visitors.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Visitors_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Visitors.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/Visitors.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Visitors_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Admin/Visitors.vue?vue&type=template&id=1c93c824&":
/*!******************************************************************************!*\
  !*** ./resources/js/pages/Admin/Visitors.vue?vue&type=template&id=1c93c824& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Visitors_vue_vue_type_template_id_1c93c824___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Visitors.vue?vue&type=template&id=1c93c824& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/Visitors.vue?vue&type=template&id=1c93c824&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Visitors_vue_vue_type_template_id_1c93c824___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Visitors_vue_vue_type_template_id_1c93c824___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);