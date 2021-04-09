(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[18],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Member/Video.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Member/Video.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VideoSearch_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../VideoSearch.vue */ "./resources/js/pages/VideoSearch.vue");
/* harmony import */ var _VideoForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VideoForm */ "./resources/js/pages/Member/VideoForm.vue");
/* harmony import */ var _VideoList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VideoList */ "./resources/js/pages/Member/VideoList.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    VideoSearch: _VideoSearch_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    VideoForm: _VideoForm__WEBPACK_IMPORTED_MODULE_1__["default"],
    VideoList: _VideoList__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  data: function data() {
    return {
      videos: [],
      editId: 0,
      openId: 0,
      res_status: '',
      showSearchForm: false,
      showVideoForm: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.getVideos();
    this.$root.$on('smartTitle', function (s, l) {
      _this.smartTitle(s, l);
    });
  },
  methods: {
    getVideos: function getVideos(page) {
      var _this2 = this;

      var url = "";

      if (page) {
        url = page;
        this.$cookies.set("old_mvideo_page", url);
      }

      url = this.$cookies.get("old_mvideo_page");

      if (!url) {
        url = "/member/getVideos";
      }

      axios.get(url).then(function (res) {
        _this2.videos = res.data.videos;
      }, function (err) {
        _this2.videos = "<span \n                                    class=\"badge badge-danger\">\n                                    ".concat(err.response.data.message, "\n                                    </span>");
      });
    },
    videoEdit: function videoEdit(id) {
      this.editId = id;
      this.showVideoForm = true;
    },
    videoDel: function videoDel(id) {
      var _this3 = this;

      var url = "/member/video/".concat(id);
      axios["delete"](url).then(function (res) {
        _this3.res_status = res.data.msg;
      }, function (err) {
        _this3.res_status = "<span class=\"badge badge-danger\">\n                        ".concat(err.response.data.message, "\n                        </span>");
      });
      this.$refs["onOk"].show();
      setTimeout(function () {
        _this3.getVideos();
      }, 2000);
    },
    openVideo: function openVideo(id) {
      this.openId = id;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Member/VideoForm.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Member/VideoForm.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "VideoForm",
  props: ["editId", "videos"],
  data: function data() {
    return {
      saveId: 0,
      title: "",
      embed: "",
      res_status: ""
    };
  },
  watch: {
    "editId": function editId(x) {
      this.getEditData(x);
    }
  },
  methods: {
    getEditData: function getEditData(id) {
      var _this = this;

      if (id == 0) {
        return;
      }

      this.videos.data.forEach(function (val) {
        if (val.id == id) {
          _this.title = val.title;
          _this.embed = val.embed;
          _this.saveId = val.id;

          _this.$refs.title.focus();
        }
      });
    },
    videoSave: function videoSave(id) {
      var _this2 = this;

      var url = "";
      var data = {
        title: this.title,
        embed: this.embed
      };

      if (id) {
        url = "/member/video/".concat(id);
        axios.put(url, data).then(function (res) {
          _this2.res_status = res.data.msg;
        }, function (err) {
          _this2.res_status = "<span \n                               class=\"badge badge-danger\">\n                               ".concat(err.response.data.message, "\n                               </span>");
        });
      } else {
        url = "/member/video";
        axios.post(url, data).then(function (res) {
          _this2.res_status = res.data.msg;
        });
      }

      setTimeout(function () {
        _this2.clearForm();

        _this2.$emit('getVideos');
      }, 2000);
    },
    clearForm: function clearForm() {
      this.title = "";
      this.saveId = "";
      this.res_status = "";
      this.embed = "";
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Member/VideoList.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Member/VideoList.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************/
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
var moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "VideoList",
  props: ["videos", "openId"],
  watch: {
    "openId": function openId(x) {
      this.videoShow(x);
    }
  },
  data: function data() {
    return {
      moment: moment,
      ownerId: window.ownerId,
      title: '',
      embed: '',
      postBy: '',
      createDate: ''
    };
  },
  methods: {
    videoShow: function videoShow(id) {
      var _this = this;

      // this.videos.data.forEach((val)=>{
      //         if(val.id == id){
      //             this.title = val.title
      //             this.embed = val.embed
      //             this.postBy = val.user.name
      //             this.$refs["showVideoModal"].show()
      //         }
      // })
      var url = "/video/".concat(id);
      axios.get(url).then(function (res) {
        console.log(res.data);
        res.data.video.forEach(function (val) {
          if (val.id == id) {
            _this.title = val.title;
            _this.embed = val.embed;
            _this.postBy = val.user.name;
            _this.createDate = val.created_at;
          }

          _this.$refs["showVideoModal"].show();
        });
      });
    },
    selectEmbedCode: function selectEmbedCode() {
      this.$refs.showEmbed.select();
    },
    smartTitle: function smartTitle(str, len) {
      return str.length > len ? str.substr(0, len) + "..." : str;
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Member/Video.vue?vue&type=template&id=6f3100a2&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Member/Video.vue?vue&type=template&id=6f3100a2& ***!
  \**********************************************************************************************************************************************************************************************************/
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
          _c("div", { staticClass: "btn-group" }, [
            _vm.showSearchForm == false
              ? _c(
                  "button",
                  {
                    staticClass: "btn btn-outline-primary btn-sm",
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        _vm.showSearchForm = true
                      }
                    }
                  },
                  [_vm._v("\n                Search Box")]
                )
              : _c(
                  "button",
                  {
                    staticClass: "btn btn-outline-danger btn-sm",
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        _vm.showSearchForm = false
                      }
                    }
                  },
                  [_vm._v("Close")]
                ),
            _vm._v(" "),
            _vm.showVideoForm == false
              ? _c(
                  "button",
                  {
                    staticClass: "btn btn-outline-primary btn-sm",
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        _vm.showVideoForm = true
                      }
                    }
                  },
                  [_vm._v("\n                Create new")]
                )
              : _c(
                  "button",
                  {
                    staticClass: "btn btn-outline-danger btn-sm",
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        _vm.showVideoForm = false
                      }
                    }
                  },
                  [_vm._v("Close")]
                )
          ])
        ])
      ]),
      _vm._v(" "),
      _c("video-search", {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.showSearchForm,
            expression: "showSearchForm"
          }
        ],
        on: {
          openVideo: function($event) {
            return _vm.openVideo($event)
          }
        }
      }),
      _vm._v(" "),
      _c("video-form", {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.showVideoForm,
            expression: "showVideoForm"
          }
        ],
        attrs: { editId: _vm.editId, videos: _vm.videos },
        on: {
          getVideos: function($event) {
            return _vm.getVideos($event)
          }
        }
      }),
      _vm._v(" "),
      _c("p", { staticClass: "pt-4" }, [_vm._v(" ")]),
      _vm._v(" "),
      _c("video-list", {
        attrs: { videos: _vm.videos, openId: _vm.openId },
        on: {
          videoEdit: function($event) {
            return _vm.videoEdit($event)
          },
          videoDel: function($event) {
            return _vm.videoDel($event)
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Member/VideoForm.vue?vue&type=template&id=eb28e9da&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Member/VideoForm.vue?vue&type=template&id=eb28e9da& ***!
  \**************************************************************************************************************************************************************************************************************/
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
      _c("div", { staticClass: "col-lg-12 pt-4" }, [
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
              attrs: { type: "text", placeholder: "Enter video title" },
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
              attrs: { placeholder: "Enter the embed code" },
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
                      return _vm.videoSave(_vm.saveId)
                    }
                  }
                },
                [_vm._v("Save")]
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Member/VideoList.vue?vue&type=template&id=83369c26&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Member/VideoList.vue?vue&type=template&id=83369c26& ***!
  \**************************************************************************************************************************************************************************************************************/
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
    _c(
      "div",
      { staticClass: "row" },
      [
        _vm.videos.data == 0
          ? _c("div", { staticClass: "col-lg-12 pt-4" }, [_vm._m(0)])
          : _vm._l(_vm.videos.data, function(vi) {
              return _c("div", { staticClass: "col-lg-4 pt-2" }, [
                _c(
                  "div",
                  {
                    staticClass: "video-container",
                    domProps: { innerHTML: _vm._s(vi.embed) }
                  },
                  [
                    _vm._v(
                      "\n                " + _vm._s(vi.embed) + "\n            "
                    )
                  ]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "card" }, [
                  _c("div", { staticClass: "card-body" }, [
                    _c("p", [
                      _c(
                        "a",
                        {
                          attrs: { href: "" },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              return _vm.videoShow(vi.id)
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n                        " +
                              _vm._s(_vm.smartTitle(vi.title, 9)) +
                              "\n                    "
                          )
                        ]
                      ),
                      _vm._v(" · \n                        "),
                      _c("span", { staticClass: "badge badge-info" }, [
                        _vm._v(
                          "\n                            " +
                            _vm._s(_vm.moment(vi.created_at).fromNow()) +
                            "\n                        "
                        )
                      ])
                    ])
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "card-footer" }, [
                    _c("div", { staticClass: "clearfix" }, [
                      _c("div", { staticClass: "float-right" }, [
                        _vm.ownerId == vi.user.id
                          ? _c("div", { staticClass: "btn-group" }, [
                              _c(
                                "button",
                                {
                                  staticClass: "btn btn-outline-primary btn-sm",
                                  on: {
                                    click: function($event) {
                                      $event.preventDefault()
                                      return _vm.$emit("videoEdit", vi.id)
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
                                      return _vm.$emit("videoDel", vi.id)
                                    }
                                  }
                                },
                                [_vm._v("x")]
                              )
                            ])
                          : _c("span", { staticClass: "badge badge-info" }, [
                              _vm._v(
                                "\n                                " +
                                  _vm._s(vi.user.name) +
                                  "\n                            "
                              )
                            ])
                      ])
                    ])
                  ])
                ])
              ])
            }),
        _vm._v(" "),
        _c("div", { staticClass: "col-lg-12" }, [
          _c("div", { staticClass: "pa" }, [
            _c(
              "ul",
              { staticClass: "pagination" },
              [
                _c("li", { staticClass: "page-item" }, [
                  _vm._v(
                    "\n                        showing form \n                        "
                  ),
                  _c("span", [_vm._v(_vm._s(_vm.videos.from))]),
                  _vm._v(" to \n                        "),
                  _c("span", [_vm._v(_vm._s(_vm.videos.to))]),
                  _vm._v(" of \n                        "),
                  _c("span", [_vm._v(_vm._s(_vm.videos.total))]),
                  _vm._v(" ·\n                    ")
                ]),
                _vm._v(" "),
                _vm._l(_vm.videos.links, function(li) {
                  return _c("li", { staticClass: "page-item" }, [
                    li.active == false && li.url != null
                      ? _c(
                          "a",
                          {
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
                            staticClass: "active",
                            domProps: { innerHTML: _vm._s(li.label) }
                          },
                          [
                            _vm._v(
                              "\n                            " +
                                _vm._s(li.label) +
                                "\n                        "
                            )
                          ]
                        ),
                    _vm._v(" ·\n                        \n                    ")
                  ])
                }),
                _vm._v(" "),
                _c("li", { staticClass: "page-item" }, [
                  _c("span", { staticClass: "active" }, [
                    _vm._v(
                      "\n                            " +
                        _vm._s(_vm.videos.current_page) +
                        "\n                        "
                    )
                  ])
                ])
              ],
              2
            )
          ])
        ]),
        _vm._v(" "),
        _c(
          "b-modal",
          {
            ref: "showVideoModal",
            attrs: { title: _vm.title, size: "xl", "ok-only": "" }
          },
          [
            _c("div", { staticClass: "container" }, [
              _c(
                "div",
                {
                  staticClass: "video-container",
                  domProps: { innerHTML: _vm._s(_vm.embed) }
                },
                [
                  _vm._v(
                    "\n                    " +
                      _vm._s(_vm.embed) +
                      "\n                "
                  )
                ]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "col-lg-12 pt-2" }, [
                _c("span", { staticClass: "badge badge-info" }, [
                  _vm._v(
                    _vm._s(_vm.title) +
                      " - \n                    " +
                      _vm._s(_vm.postBy)
                  )
                ]),
                _vm._v(" · \n                    "),
                _c("span", { staticClass: "badge badge-info" }, [
                  _vm._v(
                    _vm._s(_vm.moment(_vm.createDate)) +
                      " \n                    ·  " +
                      _vm._s(_vm.moment(_vm.createDate).fromNow())
                  )
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group pt-4" }, [
                _c(
                  "textarea",
                  {
                    ref: "showEmbed",
                    staticClass: "form-control",
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        return _vm.selectEmbedCode($event)
                      }
                    }
                  },
                  [_vm._v(_vm._s(_vm.embed))]
                )
              ])
            ])
          ]
        )
      ],
      2
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "alert alert-warning" }, [
      _c("h2", { staticClass: "text-center " }, [
        _vm._v("\n                    There is no data\n                ")
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/pages/Member/Video.vue":
/*!*********************************************!*\
  !*** ./resources/js/pages/Member/Video.vue ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Video_vue_vue_type_template_id_6f3100a2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Video.vue?vue&type=template&id=6f3100a2& */ "./resources/js/pages/Member/Video.vue?vue&type=template&id=6f3100a2&");
/* harmony import */ var _Video_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Video.vue?vue&type=script&lang=js& */ "./resources/js/pages/Member/Video.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Video_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Video_vue_vue_type_template_id_6f3100a2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Video_vue_vue_type_template_id_6f3100a2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Member/Video.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Member/Video.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./resources/js/pages/Member/Video.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Video_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Video.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Member/Video.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Video_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Member/Video.vue?vue&type=template&id=6f3100a2&":
/*!****************************************************************************!*\
  !*** ./resources/js/pages/Member/Video.vue?vue&type=template&id=6f3100a2& ***!
  \****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Video_vue_vue_type_template_id_6f3100a2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Video.vue?vue&type=template&id=6f3100a2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Member/Video.vue?vue&type=template&id=6f3100a2&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Video_vue_vue_type_template_id_6f3100a2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Video_vue_vue_type_template_id_6f3100a2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/pages/Member/VideoForm.vue":
/*!*************************************************!*\
  !*** ./resources/js/pages/Member/VideoForm.vue ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VideoForm_vue_vue_type_template_id_eb28e9da___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VideoForm.vue?vue&type=template&id=eb28e9da& */ "./resources/js/pages/Member/VideoForm.vue?vue&type=template&id=eb28e9da&");
/* harmony import */ var _VideoForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VideoForm.vue?vue&type=script&lang=js& */ "./resources/js/pages/Member/VideoForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _VideoForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _VideoForm_vue_vue_type_template_id_eb28e9da___WEBPACK_IMPORTED_MODULE_0__["render"],
  _VideoForm_vue_vue_type_template_id_eb28e9da___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Member/VideoForm.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Member/VideoForm.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/pages/Member/VideoForm.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./VideoForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Member/VideoForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Member/VideoForm.vue?vue&type=template&id=eb28e9da&":
/*!********************************************************************************!*\
  !*** ./resources/js/pages/Member/VideoForm.vue?vue&type=template&id=eb28e9da& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoForm_vue_vue_type_template_id_eb28e9da___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./VideoForm.vue?vue&type=template&id=eb28e9da& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Member/VideoForm.vue?vue&type=template&id=eb28e9da&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoForm_vue_vue_type_template_id_eb28e9da___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoForm_vue_vue_type_template_id_eb28e9da___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/pages/Member/VideoList.vue":
/*!*************************************************!*\
  !*** ./resources/js/pages/Member/VideoList.vue ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VideoList_vue_vue_type_template_id_83369c26___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VideoList.vue?vue&type=template&id=83369c26& */ "./resources/js/pages/Member/VideoList.vue?vue&type=template&id=83369c26&");
/* harmony import */ var _VideoList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VideoList.vue?vue&type=script&lang=js& */ "./resources/js/pages/Member/VideoList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _VideoList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _VideoList_vue_vue_type_template_id_83369c26___WEBPACK_IMPORTED_MODULE_0__["render"],
  _VideoList_vue_vue_type_template_id_83369c26___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Member/VideoList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Member/VideoList.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/pages/Member/VideoList.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./VideoList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Member/VideoList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Member/VideoList.vue?vue&type=template&id=83369c26&":
/*!********************************************************************************!*\
  !*** ./resources/js/pages/Member/VideoList.vue?vue&type=template&id=83369c26& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoList_vue_vue_type_template_id_83369c26___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./VideoList.vue?vue&type=template&id=83369c26& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Member/VideoList.vue?vue&type=template&id=83369c26&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoList_vue_vue_type_template_id_83369c26___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoList_vue_vue_type_template_id_83369c26___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);