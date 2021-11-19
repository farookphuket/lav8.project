(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[14],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/Video.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Admin/Video.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VideoForm_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VideoForm.vue */ "./resources/js/pages/Admin/VideoForm.vue");
/* harmony import */ var _VideoList_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VideoList.vue */ "./resources/js/pages/Admin/VideoList.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "Video",
  components: {
    VideoForm: _VideoForm_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    VideoList: _VideoList_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function data() {
    return {
      videos: [],
      video: [],
      title: '',
      editId: 0,
      res_status: "",
      showFormAdd: false
    };
  },
  mounted: function mounted() {
    this.getVideos();
  },
  methods: {
    getVideos: function getVideos(page) {
      var _this = this;

      var url = "";

      if (page) {
        url = page;
        this.$cookies.set("avideo_old_page", url);
      }

      url = this.$cookies.get("avideo_old_page");

      if (!url) {
        url = "/admin/getVideos";
      }

      axios.get(url).then(function (res) {
        //console.log(res.data)
        _this.videos = res.data.videos;
      });
    },
    openVideo: function openVideo(id) {
      var _this2 = this;

      var url = "/admin/video/".concat(id);
      axios.get(url).then(function (res) {
        _this2.video = res.data.video; //console.log(this.video)

        _this2.video.forEach(function (val) {
          _this2.title = val.title;
        });

        _this2.$refs["showVideoModal"].show();
      });
    },
    editVideo: function editVideo(id) {
      this.editId = id;
      this.showFormAdd = true;
    },
    delVideo: function delVideo(id) {
      var _this3 = this;

      var url = "/admin/video/".concat(id);
      axios["delete"](url).then(function (res) {
        _this3.res_status = res.data.msg;
      }, function (err) {
        _this3.res_status = "<span class=\"badge badge-danger\">\n                        ".concat(err.response.data.message, "</span>");
      });
      this.$refs["onOk"].show();
      setTimeout(function () {
        _this3.getVideos();
      }, 2000);
    },
    closeBox: function closeBox() {
      this.$refs["showVideoModal"].hide();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/VideoForm.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Admin/VideoForm.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "VideoForm",
  data: function data() {
    return {
      title: "",
      embed: "",
      saveId: 0,
      res_status: ""
    };
  },
  props: ["editId", "videos"],
  watch: {
    "editId": function editId(x) {
      this.getEditData(x);
    }
  },
  methods: {
    getEditData: function getEditData(id) {
      var _this = this;

      this.videos.forEach(function (val) {
        if (val.id == id) {
          _this.title = val.title;

          _this.$refs.title.focus();

          _this.saveId = val.id;
          _this.embed = val.embed;
        }
      });
    },
    saveVideo: function saveVideo(id) {
      var _this2 = this;

      var url = "";
      var data = {
        title: this.title,
        embed: this.embed
      };

      if (id == 0) {
        url = "/admin/video";
        axios.post(url, data).then(function (res) {
          _this2.res_status = res.data.msg;
        }, function (err) {
          _this2.res_status = "<span class=\"badge badge-danger\">\n                        ".concat(err.response.data.message, "</span>");
        });
      } else {
        url = "/admin/video/".concat(id);
        axios.put(url, data).then(function (res) {
          _this2.res_status = res.data.msg;
        }, function (err) {
          _this2.res_status = "<span class=\"badge badge-danger\">\n                        ".concat(err.response.data.message, "</span>");
        });
      }

      setTimeout(function () {
        _this2.$emit('getVideos');

        _this2.clearForm();
      }, 2000);
    },
    clearForm: function clearForm() {
      this.embed = "";
      this.title = "";
      this.saveId = 0;
      this.res_status = "";
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/VideoList.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Admin/VideoList.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
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
var moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "VideoList",
  props: ["videos"],
  data: function data() {
    return {
      moment: moment
    };
  },
  methods: {
    smartTitle: function smartTitle(str) {
      var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9;
      return str.length > len ? str.substring(0, len) + "..." : str;
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/Video.vue?vue&type=template&id=74b63922&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Admin/Video.vue?vue&type=template&id=74b63922& ***!
  \*********************************************************************************************************************************************************************************************************/
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
      _c("div", { staticClass: "clearfix" }, [
        _c("div", { staticClass: "float-right" }, [
          _vm.showFormAdd == false
            ? _c(
                "button",
                {
                  staticClass: "btn btn-outline-primary",
                  on: {
                    click: function($event) {
                      $event.preventDefault()
                      _vm.showFormAdd = true
                    }
                  }
                },
                [_vm._v("\n                Add video\n            ")]
              )
            : _c(
                "button",
                {
                  staticClass: "btn btn-outline-danger",
                  on: {
                    click: function($event) {
                      $event.preventDefault()
                      _vm.showFormAdd = false
                    }
                  }
                },
                [_vm._v("\n                Close\n            ")]
              )
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-lg-12 pt-2 mb-2" }, [_vm._v(" ")]),
      _vm._v(" "),
      _c("video-form", {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.showFormAdd,
            expression: "showFormAdd"
          }
        ],
        attrs: { editId: _vm.editId, videos: _vm.videos.data },
        on: {
          getVideos: function($event) {
            return _vm.getVideos($event)
          }
        }
      }),
      _vm._v(" "),
      _c("video-list", {
        attrs: { videos: _vm.videos },
        on: {
          openVideo: function($event) {
            return _vm.openVideo($event)
          },
          editVideo: function($event) {
            return _vm.editVideo($event)
          },
          delVideo: function($event) {
            return _vm.delVideo($event)
          },
          getVideos: function($event) {
            return _vm.getVideos($event)
          }
        }
      }),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          ref: "showVideoModal",
          attrs: { title: _vm.title, size: "xl", "hide-footer": "" }
        },
        _vm._l(_vm.video, function(li) {
          return _c("div", [
            _c(
              "div",
              {
                staticClass: "video-container",
                domProps: { innerHTML: _vm._s(li.embed) }
              },
              [
                _vm._v(
                  "\n                " + _vm._s(li.embed) + "\n            "
                )
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "form-group pt-4 mb-4 p-2" }, [
              _c(
                "textarea",
                {
                  ref: "embed",
                  refInFor: true,
                  staticClass: "form-control",
                  on: {
                    focus: function($event) {
                      return $event.target.select()
                    }
                  }
                },
                [_vm._v(_vm._s(li.embed))]
              )
            ]),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-outline-danger btn-block",
                on: {
                  click: function($event) {
                    $event.preventDefault()
                    return _vm.closeBox($event)
                  }
                }
              },
              [_vm._v("close")]
            )
          ])
        }),
        0
      ),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          ref: "onOk",
          attrs: { title: "Server Said :", centered: "", "ok-only": "" }
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/VideoForm.vue?vue&type=template&id=d5eb59f4&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Admin/VideoForm.vue?vue&type=template&id=d5eb59f4& ***!
  \*************************************************************************************************************************************************************************************************************/
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
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-lg-12 pt-4 mb-4" }, [
        _c("form", [
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
              attrs: { type: "text", placeholder: "Video title" },
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
          _c("div", { staticClass: "form-group" }, [
            _c("textarea", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.embed,
                  expression: "embed"
                }
              ],
              staticClass: "form-control",
              attrs: { name: "", placeholder: "embed code here" },
              domProps: { value: _vm.embed },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.embed = $event.target.value
                }
              }
            })
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "clearfix" }, [
            _c("div", { staticClass: "float-left" }, [
              _c("div", { domProps: { innerHTML: _vm._s(_vm.res_status) } }, [
                _vm._v(
                  "\n                            " +
                    _vm._s(_vm.res_status) +
                    "\n                        "
                )
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "float-right" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-outline-primary",
                  on: {
                    click: function($event) {
                      $event.preventDefault()
                      return _vm.saveVideo(_vm.saveId)
                    }
                  }
                },
                [
                  _vm._v(
                    "\n                            Save\n                        "
                  )
                ]
              ),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "btn btn-outline-danger",
                  on: {
                    click: function($event) {
                      $event.preventDefault()
                      return _vm.clearForm($event)
                    }
                  }
                },
                [
                  _vm._v(
                    "\n                            clear\n                        "
                  )
                ]
              )
            ])
          ])
        ])
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/VideoList.vue?vue&type=template&id=6df90c40&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Admin/VideoList.vue?vue&type=template&id=6df90c40& ***!
  \*************************************************************************************************************************************************************************************************************/
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
    _c(
      "div",
      { staticClass: "row" },
      [
        _vm._l(_vm.videos.data, function(vi) {
          return _c("div", { staticClass: "col-lg-4 col-md-2 p-2 pt-2" }, [
            _c("div", { staticClass: "card card-body" }, [
              _c(
                "div",
                {
                  staticClass: "video-container",
                  domProps: { innerHTML: _vm._s(vi.embed) }
                },
                [
                  _vm._v(
                    "\n                    " +
                      _vm._s(vi.embed) +
                      "\n                "
                  )
                ]
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "card-footer" }, [
              _c("div", { staticClass: "clearfix" }, [
                _c("div", { staticClass: "float-left" }, [
                  _c(
                    "span",
                    [
                      _c("b-icon", { attrs: { icon: "film" } }),
                      _vm._v(" "),
                      _c(
                        "a",
                        {
                          attrs: { href: "" },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              return _vm.$emit("openVideo", vi.id)
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n                                " +
                              _vm._s(_vm.smartTitle(vi.title, 16)) +
                              "\n                            "
                          )
                        ]
                      )
                    ],
                    1
                  ),
                  _vm._v(" ·\n                        "),
                  _c(
                    "span",
                    [
                      _c("b-icon", { attrs: { icon: "person" } }),
                      _vm._v(
                        "\n                            " +
                          _vm._s(vi.user.name) +
                          "\n                        "
                      )
                    ],
                    1
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "float-right" }, [
                  _c("span", [
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-outline-primary btn-sm",
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            return _vm.$emit("editVideo", vi.id)
                          }
                        }
                      },
                      [_vm._v("edit")]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-outline-danger btn-sm",
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            return _vm.$emit("delVideo", vi.id)
                          }
                        }
                      },
                      [_c("b-icon", { attrs: { icon: "trash" } })],
                      1
                    )
                  ])
                ])
              ])
            ])
          ])
        }),
        _vm._v(" "),
        _c("div", { staticClass: "col-lg-12 pt-2 mb-2 p-2" }, [_vm._v(" ")]),
        _vm._v(" "),
        _c("div", { staticClass: "col-lg-12" }, [
          _c("div", { staticClass: "nav-scroller py-1 mb-2" }, [
            _c("nav", { staticClass: "nav d-flex justify-content-center" }, [
              _c(
                "ul",
                { staticClass: "pagination flex-wrap" },
                [
                  _c("li", { staticClass: "page-item disabled" }, [
                    _c("div", { staticClass: "page-link" }, [
                      _vm._v("\n                                showing from "),
                      _c("span", [_vm._v(_vm._s(_vm.videos.from))]),
                      _vm._v(" to \n                                "),
                      _c("span", [_vm._v(_vm._s(_vm.videos.to))]),
                      _vm._v(" of \n                                "),
                      _c("span", [_vm._v(_vm._s(_vm.videos.total))])
                    ])
                  ]),
                  _vm._v(" "),
                  _vm._l(_vm.videos.links, function(li) {
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
                                  return _vm.$emit("getVideos", li.url)
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                                " +
                                  _vm._s(li.label) +
                                  "\n                            "
                              )
                            ]
                          )
                        : _c(
                            "span",
                            {
                              staticClass: "page-link disabled",
                              domProps: { innerHTML: _vm._s(li.label) }
                            },
                            [
                              _vm._v(
                                "\n                                " +
                                  _vm._s(li.label) +
                                  "\n                            "
                              )
                            ]
                          )
                    ])
                  }),
                  _vm._v(" "),
                  _c("li", { staticClass: "page-item active" }, [
                    _c(
                      "span",
                      { staticClass: "page-link disabled" },
                      [
                        _c("b-icon", { attrs: { icon: "book-half" } }),
                        _vm._v(
                          "\n                                " +
                            _vm._s(_vm.videos.current_page) +
                            "\n                            "
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
        ])
      ],
      2
    )
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

/***/ "./resources/js/pages/Admin/Video.vue":
/*!********************************************!*\
  !*** ./resources/js/pages/Admin/Video.vue ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Video_vue_vue_type_template_id_74b63922___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Video.vue?vue&type=template&id=74b63922& */ "./resources/js/pages/Admin/Video.vue?vue&type=template&id=74b63922&");
/* harmony import */ var _Video_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Video.vue?vue&type=script&lang=js& */ "./resources/js/pages/Admin/Video.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Video_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Video_vue_vue_type_template_id_74b63922___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Video_vue_vue_type_template_id_74b63922___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Admin/Video.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Admin/Video.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./resources/js/pages/Admin/Video.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Video_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Video.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/Video.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Video_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Admin/Video.vue?vue&type=template&id=74b63922&":
/*!***************************************************************************!*\
  !*** ./resources/js/pages/Admin/Video.vue?vue&type=template&id=74b63922& ***!
  \***************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Video_vue_vue_type_template_id_74b63922___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Video.vue?vue&type=template&id=74b63922& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/Video.vue?vue&type=template&id=74b63922&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Video_vue_vue_type_template_id_74b63922___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Video_vue_vue_type_template_id_74b63922___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/pages/Admin/VideoForm.vue":
/*!************************************************!*\
  !*** ./resources/js/pages/Admin/VideoForm.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VideoForm_vue_vue_type_template_id_d5eb59f4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VideoForm.vue?vue&type=template&id=d5eb59f4& */ "./resources/js/pages/Admin/VideoForm.vue?vue&type=template&id=d5eb59f4&");
/* harmony import */ var _VideoForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VideoForm.vue?vue&type=script&lang=js& */ "./resources/js/pages/Admin/VideoForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _VideoForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _VideoForm_vue_vue_type_template_id_d5eb59f4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _VideoForm_vue_vue_type_template_id_d5eb59f4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Admin/VideoForm.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Admin/VideoForm.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/pages/Admin/VideoForm.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./VideoForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/VideoForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Admin/VideoForm.vue?vue&type=template&id=d5eb59f4&":
/*!*******************************************************************************!*\
  !*** ./resources/js/pages/Admin/VideoForm.vue?vue&type=template&id=d5eb59f4& ***!
  \*******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoForm_vue_vue_type_template_id_d5eb59f4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./VideoForm.vue?vue&type=template&id=d5eb59f4& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/VideoForm.vue?vue&type=template&id=d5eb59f4&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoForm_vue_vue_type_template_id_d5eb59f4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoForm_vue_vue_type_template_id_d5eb59f4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/pages/Admin/VideoList.vue":
/*!************************************************!*\
  !*** ./resources/js/pages/Admin/VideoList.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VideoList_vue_vue_type_template_id_6df90c40___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VideoList.vue?vue&type=template&id=6df90c40& */ "./resources/js/pages/Admin/VideoList.vue?vue&type=template&id=6df90c40&");
/* harmony import */ var _VideoList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VideoList.vue?vue&type=script&lang=js& */ "./resources/js/pages/Admin/VideoList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _VideoList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _VideoList_vue_vue_type_template_id_6df90c40___WEBPACK_IMPORTED_MODULE_0__["render"],
  _VideoList_vue_vue_type_template_id_6df90c40___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Admin/VideoList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Admin/VideoList.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/pages/Admin/VideoList.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./VideoList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/VideoList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Admin/VideoList.vue?vue&type=template&id=6df90c40&":
/*!*******************************************************************************!*\
  !*** ./resources/js/pages/Admin/VideoList.vue?vue&type=template&id=6df90c40& ***!
  \*******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoList_vue_vue_type_template_id_6df90c40___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./VideoList.vue?vue&type=template&id=6df90c40& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/VideoList.vue?vue&type=template&id=6df90c40&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoList_vue_vue_type_template_id_6df90c40___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoList_vue_vue_type_template_id_6df90c40___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);