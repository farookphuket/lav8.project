(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[20],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Video.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Video.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VideoSearch_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VideoSearch.vue */ "./resources/js/pages/VideoSearch.vue");
/* harmony import */ var _VideoList_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VideoList.vue */ "./resources/js/pages/VideoList.vue");
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
  name: "Pubvideo",
  components: {
    VideoSearch: _VideoSearch_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    VideoList: _VideoList_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function data() {
    return {
      videos: [],
      openId: 0
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
        this.$cookies.set("old_video_page", url);
      }

      url = this.$cookies.get("old_video_page");

      if (!url) {
        url = "/getVideos";
      }

      axios.get(url).then(function (res) {
        _this.videos = res.data.videos;
      }, function (err) {
        _this.videos = err.response.data.message;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/VideoList.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/VideoList.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************/
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
var moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "VideoList",
  props: ["videos"],
  data: function data() {
    return {
      moment: moment,
      title: "",
      embed: ""
    };
  },
  methods: {
    showVideo: function showVideo(id) {
      var _this = this;

      this.videos.data.forEach(function (val) {
        if (val.id == id) {
          _this.title = val.title;
          _this.embed = val.embed;
        }

        _this.$refs["showVideoModal"].show();
      });
    },
    selectText: function selectText() {
      this.$refs.showEmbed.select();
    },
    smartTitle: function smartTitle(str, len) {
      return str.length > len ? str.substring(0, len) + "..." : str;
    },
    closeBox: function closeBox() {
      this.$refs["showVideoModal"].hide();
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Video.vue?vue&type=template&id=1d4fb17c&":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Video.vue?vue&type=template&id=1d4fb17c& ***!
  \***************************************************************************************************************************************************************************************************/
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
      _c("video-search", {
        on: {
          openVideo: function($event) {
            return _vm.openVideo($event)
          }
        }
      }),
      _vm._v(" "),
      _c("video-list", {
        attrs: { videos: _vm.videos, openId: _vm.openId },
        on: {
          getVideos: function($event) {
            return _vm.getVideos($event)
          }
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/VideoList.vue?vue&type=template&id=28c15800&":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/VideoList.vue?vue&type=template&id=28c15800& ***!
  \*******************************************************************************************************************************************************************************************************/
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
      _c(
        "div",
        { staticClass: "row" },
        [
          _vm.videos.data == 0
            ? _c("div", { staticClass: "col-lg-12" }, [_vm._m(0)])
            : _vm._l(_vm.videos.data, function(vi) {
                return _c("div", { staticClass: "col-md-4 pt-2" }, [
                  _c("div", [
                    _c(
                      "div",
                      {
                        staticClass: "video-container",
                        domProps: { innerHTML: _vm._s(vi.embed) }
                      },
                      [
                        _vm._v(
                          "\n                        " +
                            _vm._s(vi.embed) +
                            "\n                    "
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c("p", { staticClass: "pt-2 mb-2" }, [
                      _c(
                        "a",
                        {
                          attrs: { href: "" },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              return _vm.showVideo(vi.id)
                            }
                          }
                        },
                        [
                          _c("b-icon", { attrs: { icon: "film" } }),
                          _vm._v(
                            " \n                            " +
                              _vm._s(_vm.smartTitle(vi.title, 9)) +
                              "\n                        "
                          )
                        ],
                        1
                      ),
                      _vm._v(
                        "\n                        -\n                        "
                      ),
                      _c(
                        "span",
                        { staticClass: "badge badge-info" },
                        [
                          _c("b-icon", { attrs: { icon: "clock-history" } }),
                          _vm._v(
                            " \n                            " +
                              _vm._s(_vm.moment(vi.created_at).fromNow()) +
                              "\n                        "
                          )
                        ],
                        1
                      )
                    ])
                  ])
                ])
              }),
          _vm._v(" "),
          _c("div", { staticClass: "col-lg-12 pt-2" }, [_vm._v(" ")]),
          _vm._v(" "),
          _c("div", { staticClass: "nav-scroller py-1 mb-2" }, [
            _c("nav", { staticClass: "nav d-flex justify-content-center" }, [
              _c(
                "ul",
                { staticClass: "pagination flex-wrap" },
                [
                  _c("li", { staticClass: "page-item disabled" }, [
                    _c("div", { staticClass: "page-link" }, [
                      _vm._v(
                        "\n                            showing from\n                            "
                      ),
                      _c("span", [
                        _vm._v(
                          "\n                                " +
                            _vm._s(_vm.videos.from) +
                            "\n                            "
                        )
                      ]),
                      _vm._v(
                        "\n                            to\n                            "
                      ),
                      _c("span", [
                        _vm._v(
                          "\n                                " +
                            _vm._s(_vm.videos.to) +
                            "\n                            "
                        )
                      ]),
                      _vm._v(
                        "\n                            of\n                            "
                      ),
                      _c("span", [
                        _vm._v(
                          "\n                                " +
                            _vm._s(_vm.videos.total) +
                            "\n                            "
                        )
                      ])
                    ])
                  ]),
                  _vm._v(" "),
                  _vm._l(_vm.videos.links, function(li) {
                    return _c("li", { staticClass: "page-item" }, [
                      li.active != true && li.url != null
                        ? _c(
                            "a",
                            {
                              staticClass: "page-link",
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
                                "\n                            " +
                                  _vm._s(li.label) +
                                  "\n                        "
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
                                "\n                            " +
                                  _vm._s(li.label) +
                                  "\n                        "
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
                          "\n                            " +
                            _vm._s(_vm.videos.current_page) +
                            "\n                        "
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
      ),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          ref: "showVideoModal",
          attrs: { title: _vm.title, size: "xl", "hide-footer": "" }
        },
        [
          _c("h2", { staticClass: "text-center" }, [
            _vm._v("\n            " + _vm._s(_vm.title) + "\n        ")
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "container" }, [
            _c(
              "div",
              {
                staticClass: "video-container",
                domProps: { innerHTML: _vm._s(_vm.embed) }
              },
              [
                _vm._v(
                  "\n                " + _vm._s(_vm.embed) + "\n            "
                )
              ]
            ),
            _vm._v(" "),
            _c("p", [_vm._v(" ")]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group" }, [
              _c(
                "textarea",
                {
                  ref: "showEmbed",
                  staticClass: "form-control",
                  on: {
                    click: function($event) {
                      $event.preventDefault()
                      return _vm.selectText($event)
                    }
                  }
                },
                [_vm._v(_vm._s(_vm.embed))]
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
              [_vm._v("\n                close\n            ")]
            )
          ])
        ]
      )
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "alert alert-warning" }, [
      _c("h1", { staticClass: "text-center" }, [
        _vm._v("\n                    There is no data now\n                ")
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/pages/Video.vue":
/*!**************************************!*\
  !*** ./resources/js/pages/Video.vue ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Video_vue_vue_type_template_id_1d4fb17c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Video.vue?vue&type=template&id=1d4fb17c& */ "./resources/js/pages/Video.vue?vue&type=template&id=1d4fb17c&");
/* harmony import */ var _Video_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Video.vue?vue&type=script&lang=js& */ "./resources/js/pages/Video.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Video_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Video_vue_vue_type_template_id_1d4fb17c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Video_vue_vue_type_template_id_1d4fb17c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Video.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Video.vue?vue&type=script&lang=js&":
/*!***************************************************************!*\
  !*** ./resources/js/pages/Video.vue?vue&type=script&lang=js& ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Video_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Video.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Video.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Video_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Video.vue?vue&type=template&id=1d4fb17c&":
/*!*********************************************************************!*\
  !*** ./resources/js/pages/Video.vue?vue&type=template&id=1d4fb17c& ***!
  \*********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Video_vue_vue_type_template_id_1d4fb17c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Video.vue?vue&type=template&id=1d4fb17c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Video.vue?vue&type=template&id=1d4fb17c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Video_vue_vue_type_template_id_1d4fb17c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Video_vue_vue_type_template_id_1d4fb17c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/pages/VideoList.vue":
/*!******************************************!*\
  !*** ./resources/js/pages/VideoList.vue ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VideoList_vue_vue_type_template_id_28c15800___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VideoList.vue?vue&type=template&id=28c15800& */ "./resources/js/pages/VideoList.vue?vue&type=template&id=28c15800&");
/* harmony import */ var _VideoList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VideoList.vue?vue&type=script&lang=js& */ "./resources/js/pages/VideoList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _VideoList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _VideoList_vue_vue_type_template_id_28c15800___WEBPACK_IMPORTED_MODULE_0__["render"],
  _VideoList_vue_vue_type_template_id_28c15800___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/VideoList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/VideoList.vue?vue&type=script&lang=js&":
/*!*******************************************************************!*\
  !*** ./resources/js/pages/VideoList.vue?vue&type=script&lang=js& ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./VideoList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/VideoList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/VideoList.vue?vue&type=template&id=28c15800&":
/*!*************************************************************************!*\
  !*** ./resources/js/pages/VideoList.vue?vue&type=template&id=28c15800& ***!
  \*************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoList_vue_vue_type_template_id_28c15800___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./VideoList.vue?vue&type=template&id=28c15800& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/VideoList.vue?vue&type=template&id=28c15800&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoList_vue_vue_type_template_id_28c15800___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoList_vue_vue_type_template_id_28c15800___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);