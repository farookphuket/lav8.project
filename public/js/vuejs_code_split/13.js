(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[13],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/Template.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Admin/Template.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TemplateForm_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TemplateForm.vue */ "./resources/js/pages/Admin/TemplateForm.vue");
/* harmony import */ var _TemplateList_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TemplateList.vue */ "./resources/js/pages/Admin/TemplateList.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "AdminTemplate",
  components: {
    TemplateList: _TemplateList_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    TemplateForm: _TemplateForm_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      templates: [],
      editId: 0,
      res_status: '',
      showTemplateForm: false
    };
  },
  mounted: function mounted() {
    this.getTemplates();
  },
  methods: {
    getTemplates: function getTemplates(page) {
      var _this = this;

      this.editId = 0;
      var url = '';

      if (page) {
        //alert(page)
        url = page;
        this.$cookies.set("old_page_tmp", url);
      }

      url = this.$cookies.get("old_page_tmp");

      if (!url) {
        url = "/admin/getTemplates";
      }

      axios.get(url).then(function (res) {
        _this.templates = res.data.templates;
      });
    },
    tmpRead: function tmpRead(id) {
      var url = "/admin/viewTemplate/".concat(id);
      location.href = url;
    },
    editTemplate: function editTemplate(id) {
      this.editId = id;
      this.showTemplateForm = true;
    },
    delTemplate: function delTemplate(id) {
      var _this2 = this;

      if (confirm("this will delete ".concat(id, "?")) == true) {
        var url = "/admin/templates/".concat(id);
        axios["delete"](url).then(function (res) {
          _this2.res_status = res.data.msg;

          _this2.$refs["onOk"].show();
        }, function (err) {
          _this2.res_status = err.response.message;

          _this2.$refs["onOk"].show();
        });
      } else {
        return;
      }
    },
    closeBox: function closeBox() {
      this.getTemplates();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/TemplateForm.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Admin/TemplateForm.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
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

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "TemplateForm",
  props: ["editId"],
  data: function data() {
    return {
      title: '',
      section: '',
      saveId: '',
      excerpt: '',
      body: '',
      res_status: '',
      error: 0,
      errMsg: []
    };
  },
  watch: {
    "editId": function editId(x) {
      this.getData(x);
    }
  },
  mounted: function mounted() {
    this.getXX2();
  },
  methods: {
    getXX2: function getXX2() {
      this.$emit("getTemplates");
    },
    clearFormData: function clearFormData() {
      var _this = this;

      if (this.error == 0) {
        this.saveId = 0;
        this.res_status = '';
        this.section = '';
        this.excerpt = '';
        this.body = '';
        this.title = '';
      } else {
        alert("Sorry! but there is still error on page");
      }

      this.$emit('getTemplates');
      setTimeout(function () {
        _this.res_status = '';
      }, 200);
    },
    getData: function getData(xi) {
      var _this2 = this;

      if (xi == 0) {
        return;
      }

      var url = "/admin/templates/".concat(xi);
      axios.get(url).then(function (res) {
        var fData = res.data.template;
        _this2.title = fData.title;

        _this2.$refs.title.focus();

        _this2.section = fData.section;
        _this2.excerpt = fData.excerpt;
        _this2.body = fData.body;
        _this2.saveId = fData.id;
      });
    },
    saveTmp: function saveTmp(id) {
      var _this3 = this;

      var url = '';
      var data = {
        title: this.title,
        section: this.section,
        excerpt: this.excerpt,
        body: this.body
      };

      if (id) {
        url = "/admin/templates/".concat(id);
        axios.put(url, data).then(function (res) {
          _this3.res_status = res.data.msg;
          _this3.error = 0;
        }, function (error) {
          _this3.res_status = "<span class=\"badge badge-danger\">\n                           ".concat(error.message, "</span>");
          _this3.error = 1;
        });
      } else {
        url = "/admin/templates";
        axios.post(url, data).then(function (res) {
          _this3.res_status = res.data.msg;
          _this3.error = 0;
        }, function (error) {
          //console.log(error.message)
          _this3.res_status = "<span class=\"badge badge-danger\">\n                           ".concat(error.message, "</span>");
          _this3.error = 1;
        });
      }

      setTimeout(function () {
        _this3.clearFormData();
      }, 2500);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/TemplateList.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Admin/TemplateList.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
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
  name: "TemplateList",
  props: ["templates"],
  data: function data() {
    return {
      moment: moment
    };
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/Template.vue?vue&type=template&id=7c2ba7ba&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Admin/Template.vue?vue&type=template&id=7c2ba7ba& ***!
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
      _c("h1", { staticClass: "text-center" }, [
        _vm._v("\n        Template for post \n    ")
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "clearfix" }, [
        _c("div", { staticClass: "float-right" }, [
          _c("p", { staticStyle: { color: "green" } }, [
            _vm._v("\n                last update 2 Apr 2021\n            ")
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "btn-group mb-4 pt-2" }, [
            _vm.showTemplateForm == false
              ? _c(
                  "button",
                  {
                    staticClass: "btn btn-outline-primary btn-sm",
                    on: {
                      click: function($event) {
                        _vm.showTemplateForm = true
                      }
                    }
                  },
                  [_vm._v("\n                    Create New\n                ")]
                )
              : _c(
                  "button",
                  {
                    staticClass: "btn btn-outline-danger btn-sm",
                    on: {
                      click: function($event) {
                        _vm.showTemplateForm = false
                      }
                    }
                  },
                  [_vm._v("\n                    Close\n                ")]
                )
          ])
        ])
      ]),
      _vm._v(" "),
      _c("template-form", {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.showTemplateForm,
            expression: "showTemplateForm"
          }
        ],
        attrs: { editId: _vm.editId },
        on: {
          getTemplates: function($event) {
            return _vm.getTemplates($event)
          }
        }
      }),
      _vm._v(" "),
      _c("template-list", {
        attrs: { templates: _vm.templates },
        on: {
          editTemplate: function($event) {
            return _vm.editTemplate($event)
          },
          delTemplate: function($event) {
            return _vm.delTemplate($event)
          },
          getTemplates: function($event) {
            return _vm.getTemplates($event)
          },
          tmpRead: function($event) {
            return _vm.tmpRead($event)
          }
        }
      }),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          ref: "onOk",
          attrs: { title: "message box", "ok-only": "" },
          on: { ok: _vm.closeBox }
        },
        [
          _c("span", { domProps: { innerHTML: _vm._s(_vm.res_status) } }, [
            _vm._v(_vm._s(_vm.res_status))
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/TemplateForm.vue?vue&type=template&id=711add87&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Admin/TemplateForm.vue?vue&type=template&id=711add87& ***!
  \****************************************************************************************************************************************************************************************************************/
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
    _c("form", [
      _c("div", { staticClass: "form-group" }, [
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.section,
              expression: "section"
            }
          ],
          staticClass: "form-control",
          attrs: {
            placeholder: "Enter section eg : whatnews,post",
            type: "text"
          },
          domProps: { value: _vm.section },
          on: {
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.section = $event.target.value
            }
          }
        })
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "form-group" }, [
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
          attrs: {
            placeholder: "Enter title eg : whatnews template",
            type: "text"
          },
          domProps: { value: _vm.title },
          on: {
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
          _c("jodit-editor", {
            attrs: { height: "550" },
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
      _c("div", { staticClass: "clearfix" }, [
        _c("div", { staticClass: "float-left" }, [
          _c("div", { domProps: { innerHTML: _vm._s(_vm.res_status) } }, [
            _vm._v(_vm._s(_vm.res_status))
          ]),
          _vm._v(" "),
          _c(
            "ul",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.errMsg,
                  expression: "errMsg"
                }
              ]
            },
            _vm._l(_vm.errMsg, function(li) {
              return _c("li", [
                _vm._v(
                  "\n                    " +
                    _vm._s(li.title) +
                    "\n                "
                )
              ])
            }),
            0
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "float-right" }, [
          _c(
            "button",
            {
              staticClass: "btn btn-outline-primary btn-sm ",
              attrs: { type: "submit" },
              on: {
                click: function($event) {
                  $event.preventDefault()
                  return _vm.saveTmp(_vm.saveId)
                }
              }
            },
            [_vm._v("Save")]
          ),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass: "btn btn-outline-danger btn-sm",
              on: {
                click: function($event) {
                  $event.preventDefault()
                  return _vm.clearFormData()
                }
              }
            },
            [_vm._v("Clear")]
          )
        ]),
        _vm._v(" "),
        _c("p", { staticClass: "pt-4 mb-4" }, [_vm._v(" ")])
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/TemplateList.vue?vue&type=template&id=b5d7f73e&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Admin/TemplateList.vue?vue&type=template&id=b5d7f73e& ***!
  \****************************************************************************************************************************************************************************************************************/
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
    [
      _vm._l(_vm.templates.data, function(li) {
        return _c("div", { staticClass: "card card-body pt-2 mb-2" }, [
          _c(
            "a",
            {
              attrs: { href: "" },
              on: {
                click: function($event) {
                  $event.preventDefault()
                  return _vm.$emit("tmpRead", li.id)
                }
              }
            },
            [
              _c("h2", { staticClass: "text-center" }, [
                _vm._v(
                  "\n               " + _vm._s(li.title) + " \n            "
                )
              ])
            ]
          ),
          _vm._v(" "),
          _c("div", { staticClass: "clearfix" }, [
            _c("div", { staticClass: "float-right" }, [
              _c(
                "span",
                [
                  _c("b-icon", { attrs: { icon: "calendar2-day" } }),
                  _vm._v(
                    "\n                    " +
                      _vm._s(_vm.moment(li.created_at)) +
                      " \n                "
                  )
                ],
                1
              ),
              _vm._v(" ·\n                "),
              _c(
                "span",
                [
                  _c("b-icon", { attrs: { icon: "clock-history" } }),
                  _vm._v(
                    "\n                    " +
                      _vm._s(_vm.moment(li.created_at).fromNow()) +
                      "\n                "
                  )
                ],
                1
              ),
              _vm._v(" ·\n                "),
              _c(
                "span",
                [
                  _c("b-icon", { attrs: { icon: "person" } }),
                  _vm._v(
                    "\n                    " +
                      _vm._s(li.user.name) +
                      "   \n                "
                  )
                ],
                1
              ),
              _vm._v(" ·\n                "),
              _c(
                "span",
                [
                  _c("b-icon", { attrs: { icon: "envelope" } }),
                  _vm._v(
                    "\n                    " +
                      _vm._s(li.user.email) +
                      "\n                "
                  )
                ],
                1
              )
            ])
          ]),
          _vm._v(" "),
          _c("div", { domProps: { innerHTML: _vm._s(li.excerpt) } }, [
            _vm._v("\n            " + _vm._s(li.excerpt) + "\n        ")
          ]),
          _vm._v(" "),
          _c("hr", { staticClass: "pt-2 mb-2" }),
          _vm._v(" "),
          _c("div", { staticClass: "clearfix" }, [
            _c("div", { staticClass: "float-left" }, [
              _c(
                "span",
                { staticClass: "badge badge-info p-2" },
                [
                  _c("b-icon", { attrs: { icon: "tags", variant: "danger" } }),
                  _vm._v(
                    "\n                    " +
                      _vm._s(li.section) +
                      "\n                "
                  )
                ],
                1
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "float-right" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-outline-primary btn-sm",
                  on: {
                    click: function($event) {
                      $event.preventDefault()
                      return _vm.$emit("editTemplate", li.id)
                    }
                  }
                },
                [_vm._v("\n                    edit\n                ")]
              ),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "btn btn-outline-danger btn-sm",
                  on: {
                    click: function($event) {
                      $event.preventDefault()
                      return _vm.$emit("delTemplate", li.id)
                    }
                  }
                },
                [
                  _c(
                    "span",
                    [
                      _c("b-icon", {
                        attrs: { icon: "trash", variant: "danger" }
                      })
                    ],
                    1
                  )
                ]
              )
            ])
          ])
        ])
      }),
      _vm._v(" "),
      _c("div", { staticClass: "col-lg-12 pt-2 mb-2" }, [_vm._v(" ")]),
      _vm._v(" "),
      _c("div", { staticClass: "nav-scroller py-1 mb-2" }, [
        _c("nav", { staticClass: "nav d-flex justify-content-center" }, [
          _c(
            "ul",
            { staticClass: "pagination flex-wrap" },
            [
              _c("li", { staticClass: "page-item" }, [
                _c("div", { staticClass: "page-link disabled" }, [
                  _vm._v(
                    "\n                        showing\n                        "
                  ),
                  _c("span", [
                    _vm._v(
                      "\n                            " +
                        _vm._s(_vm.templates.from) +
                        "\n                        "
                    )
                  ]),
                  _vm._v(" to \n                        "),
                  _c("span", [
                    _vm._v(
                      "\n                            " +
                        _vm._s(_vm.templates.to) +
                        "\n                        "
                    )
                  ]),
                  _vm._v(" total \n                        "),
                  _c("span", [
                    _vm._v(
                      "\n                            " +
                        _vm._s(_vm.templates.total) +
                        "\n                        "
                    )
                  ])
                ])
              ]),
              _vm._v(" "),
              _vm._l(_vm.templates.links, function(li) {
                return _c("li", { staticClass: "page-item" }, [
                  li.active == false && li.url != null
                    ? _c(
                        "a",
                        {
                          staticClass: "page-link p-2",
                          attrs: { href: "" },
                          domProps: { innerHTML: _vm._s(li.label) },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              return _vm.$emit("getTemplates", li.url)
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n                        " +
                              _vm._s(li.label) +
                              "\n                    "
                          )
                        ]
                      )
                    : _c(
                        "span",
                        {
                          staticClass: "page-link",
                          domProps: { innerHTML: _vm._s(li.label) }
                        },
                        [
                          _vm._v(
                            "\n                        " +
                              _vm._s(li.label) +
                              "\n                    "
                          )
                        ]
                      )
                ])
              }),
              _vm._v(" "),
              _c("li", { staticClass: "page-item active" }, [
                _c(
                  "span",
                  { staticClass: "page-link" },
                  [
                    _c("b-icon", { attrs: { icon: "book-half" } }),
                    _vm._v(
                      "\n                        " +
                        _vm._s(_vm.templates.current_page) +
                        "\n                    "
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

/***/ "./resources/js/pages/Admin/Template.vue":
/*!***********************************************!*\
  !*** ./resources/js/pages/Admin/Template.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Template_vue_vue_type_template_id_7c2ba7ba___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Template.vue?vue&type=template&id=7c2ba7ba& */ "./resources/js/pages/Admin/Template.vue?vue&type=template&id=7c2ba7ba&");
/* harmony import */ var _Template_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Template.vue?vue&type=script&lang=js& */ "./resources/js/pages/Admin/Template.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Template_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Template_vue_vue_type_template_id_7c2ba7ba___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Template_vue_vue_type_template_id_7c2ba7ba___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
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

/***/ "./resources/js/pages/Admin/Template.vue?vue&type=template&id=7c2ba7ba&":
/*!******************************************************************************!*\
  !*** ./resources/js/pages/Admin/Template.vue?vue&type=template&id=7c2ba7ba& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Template_vue_vue_type_template_id_7c2ba7ba___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Template.vue?vue&type=template&id=7c2ba7ba& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/Template.vue?vue&type=template&id=7c2ba7ba&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Template_vue_vue_type_template_id_7c2ba7ba___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Template_vue_vue_type_template_id_7c2ba7ba___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/pages/Admin/TemplateForm.vue":
/*!***************************************************!*\
  !*** ./resources/js/pages/Admin/TemplateForm.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TemplateForm_vue_vue_type_template_id_711add87___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TemplateForm.vue?vue&type=template&id=711add87& */ "./resources/js/pages/Admin/TemplateForm.vue?vue&type=template&id=711add87&");
/* harmony import */ var _TemplateForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TemplateForm.vue?vue&type=script&lang=js& */ "./resources/js/pages/Admin/TemplateForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TemplateForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TemplateForm_vue_vue_type_template_id_711add87___WEBPACK_IMPORTED_MODULE_0__["render"],
  _TemplateForm_vue_vue_type_template_id_711add87___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Admin/TemplateForm.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Admin/TemplateForm.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/pages/Admin/TemplateForm.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TemplateForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./TemplateForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/TemplateForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TemplateForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Admin/TemplateForm.vue?vue&type=template&id=711add87&":
/*!**********************************************************************************!*\
  !*** ./resources/js/pages/Admin/TemplateForm.vue?vue&type=template&id=711add87& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TemplateForm_vue_vue_type_template_id_711add87___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./TemplateForm.vue?vue&type=template&id=711add87& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/TemplateForm.vue?vue&type=template&id=711add87&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TemplateForm_vue_vue_type_template_id_711add87___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TemplateForm_vue_vue_type_template_id_711add87___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/pages/Admin/TemplateList.vue":
/*!***************************************************!*\
  !*** ./resources/js/pages/Admin/TemplateList.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TemplateList_vue_vue_type_template_id_b5d7f73e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TemplateList.vue?vue&type=template&id=b5d7f73e& */ "./resources/js/pages/Admin/TemplateList.vue?vue&type=template&id=b5d7f73e&");
/* harmony import */ var _TemplateList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TemplateList.vue?vue&type=script&lang=js& */ "./resources/js/pages/Admin/TemplateList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TemplateList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TemplateList_vue_vue_type_template_id_b5d7f73e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _TemplateList_vue_vue_type_template_id_b5d7f73e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Admin/TemplateList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Admin/TemplateList.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/pages/Admin/TemplateList.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TemplateList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./TemplateList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/TemplateList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TemplateList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Admin/TemplateList.vue?vue&type=template&id=b5d7f73e&":
/*!**********************************************************************************!*\
  !*** ./resources/js/pages/Admin/TemplateList.vue?vue&type=template&id=b5d7f73e& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TemplateList_vue_vue_type_template_id_b5d7f73e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./TemplateList.vue?vue&type=template&id=b5d7f73e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/TemplateList.vue?vue&type=template&id=b5d7f73e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TemplateList_vue_vue_type_template_id_b5d7f73e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TemplateList_vue_vue_type_template_id_b5d7f73e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);