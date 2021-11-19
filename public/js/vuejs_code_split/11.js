(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/Song.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Admin/Song.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SongForm_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SongForm.vue */ "./resources/js/pages/Admin/SongForm.vue");
/* harmony import */ var _SongList_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SongList.vue */ "./resources/js/pages/Admin/SongList.vue");
//
//
//
//
//
//
//
//
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
  name: "AdminSong",
  components: {
    SongForm: _SongForm_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    SongList: _SongList_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function data() {
    return {
      songList: [],
      editId: 0,
      albums: [],
      artists: [],
      res_status: ""
    };
  },
  mounted: function mounted() {
    this.getSongList();
  },
  methods: {
    getSongList: function getSongList(page) {
      var _this = this;

      var url = "";

      if (page) {
        url = page;
        this.$cookies.set("admin_song_old_page", url);
      }

      url = this.$cookies.get("admin_song_old_page");

      if (!url) {
        url = "/admin/getSongList";
      }

      axios.get(url).then(function (res) {
        //console.log(res.data)
        _this.albums = res.data.albums;
        _this.artists = res.data.artists;
        _this.songList = res.data.songs;
      });
    },
    songEdit: function songEdit(id) {
      this.editId = id;
    },
    songDel: function songDel(id) {
      var _this2 = this;

      var url = "/admin/song/".concat(id);
      axios["delete"](url).then(function (res) {
        _this2.res_status = res.data.msg;

        _this2.$refs["onOk"].show();
      });
    },
    songShow: function songShow(id) {
      var url = "/admin/song/".concat(id);
      axios.get(url).then(function (res) {
        console.log(res.data);
        var rData = res.data.song;
        var url = rData.url;
        window.open(url, "_blank");
      });
    },
    closeBox: function closeBox() {
      this.getSongList();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/SongForm.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Admin/SongForm.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************/
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
var moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "SongForm",
  props: ["editId", "albums", "artists"],
  data: function data() {
    return {
      saveId: 0,
      album_id: 0,
      artist_id: 0,
      song: "",
      artist: "",
      album: "",
      cover: '',
      posted_at: '',
      moment: moment,
      url: '',
      date_holder: new Date(),
      fData: {},
      fUrl: '',
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

      var url = "/admin/song/".concat(id);
      axios.get(url).then(function (res) {
        //console.log(res.data.song)
        var eData = res.data.song;
        _this.saveId = eData.id;
        _this.song = eData.name;

        _this.$refs.song.focus();

        _this.album = eData.album.name;
        _this.artist = eData.artist.name;
        _this.cover = eData.cover;
        _this.posted_at = _this.moment(eData.posted_at);
        _this.url = eData.url;
      });
    },
    saveSong: function saveSong(id) {
      var _this2 = this;

      this.fData = {
        song: this.song,
        artist: this.artist,
        album: this.album,
        cover: this.cover,
        posted_at: this.posted_at,
        url: this.url
      };

      if (id) {
        this.fUrl = "/admin/song/".concat(id);
        axios.put(this.fUrl, this.fData).then(function (res) {
          //console.log(res.msg)
          //this.$emit("getSongList")
          _this2.res_status = res.data.msg;

          _this2.$refs["onOk"].show();
        });
      } else {
        this.fUrl = "/admin/song";
        axios.post(this.fUrl, this.fData).then(function (res) {
          //console.log(res.msg)
          _this2.res_status = res.data.msg;

          _this2.$refs["onOk"].show(); //this.$emit("getSongList")

        });
      }

      setTimeout(function () {
        _this2.clearForm();
      }, 2000);
    },
    makeArtist: function makeArtist() {
      var _this3 = this;

      var url = "/admin/makeArtist";
      axios.post(url, {
        artist: this.artist
      }).then(function (res) {
        _this3.$emit("getSongList");
      });
      setTimeout(function () {
        _this3.artist = "";
        _this3.artist_id = 0;
      }, 2000);
    },
    makeAlbum: function makeAlbum() {
      var _this4 = this;

      var url = "/admin/makeAlbum";
      axios.post(url, {
        album: this.album
      }).then(function (res) {
        _this4.$emit("getSongList");
      });
      setTimeout(function () {
        _this4.album = "";
        _this4.album_id = 0;
      }, 2000);
    },
    getTheArtist: function getTheArtist() {
      var _this5 = this;

      var ar_id = this.$refs.getArtist.value;
      this.artists.forEach(function (val) {
        if (val.id == ar_id) {
          _this5.artist = val.name;
          _this5.artist_id = val.id;
        }
      }); //alert(`the artist id is ${ar_id}`)
    },
    getTheAlbum: function getTheAlbum() {
      var _this6 = this;

      var al_id = this.$refs.getAlbum.value;
      this.albums.forEach(function (val) {
        if (val.id == al_id) {
          //console.log(val.name)
          _this6.album = val.name;
          _this6.album_id = val.id;
        }
      });
    },
    findArtist: function findArtist() {// save for later
    },
    clearForm: function clearForm() {
      this.album = "";
      this.artist = "";
      this.song = "";
      this.saveId = 0;
      this.cover = "";
      this.url = "";
      this.posted_at = "";
    },
    closeBox: function closeBox() {
      this.$emit("getSongList");
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/SongList.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Admin/SongList.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************/
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
var moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "SongList",
  props: ["songList"],
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/Song.vue?vue&type=template&id=5f798084&":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Admin/Song.vue?vue&type=template&id=5f798084& ***!
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
    { staticClass: "container-fluid" },
    [
      _c("h1", [_vm._v("Song Admin")]),
      _vm._v(" "),
      _c("song-form", {
        attrs: { albums: _vm.albums, editId: _vm.editId, artists: _vm.artists },
        on: {
          getSongList: function($event) {
            return _vm.getSongList($event)
          }
        }
      }),
      _vm._v(" "),
      _c("song-list", {
        attrs: { songList: _vm.songList },
        on: {
          getSongList: function($event) {
            return _vm.getSongList($event)
          },
          songDel: function($event) {
            return _vm.songDel($event)
          },
          songEdit: function($event) {
            return _vm.songEdit($event)
          },
          songShow: function($event) {
            return _vm.songShow($event)
          }
        }
      }),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          ref: "onOk",
          attrs: { title: "Server Said : ", centered: "", "ok-only": "" },
          on: { ok: _vm.closeBox }
        },
        [
          _c("div", { domProps: { innerHTML: _vm._s(_vm.res_status) } }, [
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/SongForm.vue?vue&type=template&id=818aa8bc&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Admin/SongForm.vue?vue&type=template&id=818aa8bc& ***!
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
    [
      _c("form", [
        _c("div", { staticClass: "form-group" }, [
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.song,
                expression: "song"
              }
            ],
            ref: "song",
            staticClass: "form-control",
            attrs: { type: "text", placeholder: "Song title" },
            domProps: { value: _vm.song },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.song = $event.target.value
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
                value: _vm.cover,
                expression: "cover"
              }
            ],
            ref: "cover",
            staticClass: "form-control",
            attrs: { type: "text", placeholder: "The Album cover " },
            domProps: { value: _vm.cover },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.cover = $event.target.value
              }
            }
          }),
          _vm._v(" "),
          _c("img", {
            staticClass: "responsive",
            attrs: { src: _vm.cover, alt: "" }
          })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "form-group" }, [
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.posted_at,
                expression: "posted_at"
              }
            ],
            ref: "posted_at",
            staticClass: "form-control",
            attrs: { type: "text", placeholder: "eg: 2021-03-20 12:05:00" },
            domProps: { value: _vm.posted_at },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.posted_at = $event.target.value
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
                value: _vm.url,
                expression: "url"
              }
            ],
            ref: "url",
            staticClass: "form-control",
            attrs: { type: "text", placeholder: "The song url " },
            domProps: { value: _vm.url },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.url = $event.target.value
              }
            }
          })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col-lg-6" }, [
            _c("div", { staticClass: "input-group " }, [
              _c("div", { staticClass: "input-group-prepend" }, [
                _c("span", { staticClass: "input-group-text" }, [
                  _vm._v(
                    "\n                            Album\n                        "
                  )
                ]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.album,
                      expression: "album"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: { type: "text" },
                  domProps: { value: _vm.album },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.album = $event.target.value
                    }
                  }
                }),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "btn btn-outline-warning",
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        return _vm.makeAlbum($event)
                      }
                    }
                  },
                  [
                    _vm._v(
                      "\n                            Save " +
                        _vm._s(_vm.album) +
                        " " +
                        _vm._s(_vm.album_id) +
                        "?\n                        "
                    )
                  ]
                )
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group pt-2" }, [
              _c(
                "select",
                {
                  ref: "getAlbum",
                  staticClass: "form-control",
                  attrs: { multiple: "true" },
                  on: { change: _vm.getTheAlbum }
                },
                [
                  _c("option", { attrs: { value: "" } }, [
                    _vm._v("Album List")
                  ]),
                  _vm._v(" "),
                  _vm._l(_vm.albums, function(ab) {
                    return _c("option", { domProps: { value: ab.id } }, [
                      _vm._v(_vm._s(ab.name))
                    ])
                  })
                ],
                2
              )
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col-lg-6" }, [
            _c("div", { staticClass: "input-group " }, [
              _c("div", { staticClass: "input-group-prepend" }, [
                _c("span", { staticClass: "input-group-text" }, [
                  _vm._v(
                    "\n                            Artist\n                        "
                  )
                ]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.artist,
                      expression: "artist"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: { type: "text", placeholder: "Artist" },
                  domProps: { value: _vm.artist },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.artist = $event.target.value
                    }
                  }
                }),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "btn btn-outline-secondary",
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        return _vm.makeArtist($event)
                      }
                    }
                  },
                  [
                    _vm._v(
                      "\n                            Save " +
                        _vm._s(_vm.artist) +
                        " ?\n                        "
                    )
                  ]
                )
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group pt-2" }, [
              _c(
                "select",
                {
                  ref: "getArtist",
                  staticClass: "form-control",
                  attrs: { multiple: "true" },
                  on: { change: _vm.getTheArtist }
                },
                [
                  _c("option", [_vm._v("The Artist")]),
                  _vm._v(" "),
                  _vm._l(_vm.artists, function(ar) {
                    return _c("option", { domProps: { value: ar.id } }, [
                      _vm._v(_vm._s(ar.name))
                    ])
                  })
                ],
                2
              )
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "clearfix" }, [
          _c("div", { staticClass: "float-right" }, [
            _c(
              "button",
              {
                staticClass: "btn btn-outline-primary",
                on: {
                  click: function($event) {
                    $event.preventDefault()
                    return _vm.saveSong(_vm.saveId)
                  }
                }
              },
              [_vm._v("\n                    Save\n                ")]
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
              [_vm._v("\n                    clear\n                ")]
            )
          ])
        ])
      ]),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          ref: "onOk",
          attrs: { title: "Server Said : ", centered: "", "ok-only": "" },
          on: { ok: _vm.closeBox }
        },
        [
          _c("div", { domProps: { innerHTML: _vm._s(_vm.res_status) } }, [
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/SongList.vue?vue&type=template&id=19985b08&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Admin/SongList.vue?vue&type=template&id=19985b08& ***!
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
  return _c("div", { staticClass: "container" }, [
    _c(
      "div",
      { staticClass: "row" },
      [
        _vm._m(0),
        _vm._v(" "),
        _vm._l(_vm.songList.data, function(so) {
          return _c("div", { staticClass: "col-lg-4 col-md-2 pt-2" }, [
            _c("div", { staticClass: "card" }, [
              _c(
                "a",
                {
                  attrs: { href: "" },
                  on: {
                    click: function($event) {
                      $event.preventDefault()
                      return _vm.$emit("songShow", so.id)
                    }
                  }
                },
                [
                  _c("img", {
                    staticClass: "responsive card-img-top",
                    attrs: { src: so.cover, alt: "" }
                  })
                ]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "card-body" }, [
                _c("p", { staticClass: "card-text" }, [
                  _vm._v(
                    "\n                    " +
                      _vm._s(_vm.smartTitle(so.name, 16)) +
                      " - " +
                      _vm._s(so.user.name)
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "clearfix" }, [
                  _c("div", { staticClass: "float-left" }, [
                    _c(
                      "span",
                      [
                        _c("b-icon", { attrs: { icon: "clock-history" } }),
                        _vm._v(
                          "\n                                " +
                            _vm._s(_vm.moment(so.posted_at).fromNow()) +
                            "\n                            "
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "span",
                      [
                        _c("b-icon", { attrs: { icon: "headphones" } }),
                        _vm._v(
                          "\n                                " +
                            _vm._s(so.read_count) +
                            " \n                            "
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
                        staticClass: "btn btn-sm btn-outline-primary",
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            return _vm.$emit("songEdit", so.id)
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n                                Edit\n                            "
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-sm btn-outline-danger",
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            return _vm.$emit("songDel", so.id)
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n                            x\n                            "
                        )
                      ]
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
                      _vm._v(
                        "\n                                showing from \n                                "
                      ),
                      _c("span", [_vm._v(_vm._s(_vm.songList.from))]),
                      _vm._v(" to \n                                "),
                      _c("span", [_vm._v(_vm._s(_vm.songList.to))]),
                      _vm._v(" of \n                                "),
                      _c("span", [_vm._v(_vm._s(_vm.songList.total))])
                    ])
                  ]),
                  _vm._v(" "),
                  _vm._l(_vm.songList.links, function(li) {
                    return _c("li", { staticClass: "page-item" }, [
                      li.url != null && li.active != true
                        ? _c(
                            "a",
                            {
                              staticClass: "page-link p-2",
                              attrs: { href: "" },
                              domProps: { innerHTML: _vm._s(li.label) },
                              on: {
                                click: function($event) {
                                  $event.preventDefault()
                                  return _vm.$emit("getSongList", li.url)
                                }
                              }
                            },
                            [_vm._v(_vm._s(li.label))]
                          )
                        : _c(
                            "span",
                            {
                              staticClass: "page-link active disabled",
                              domProps: { innerHTML: _vm._s(li.label) }
                            },
                            [_vm._v(_vm._s(li.label))]
                          )
                    ])
                  }),
                  _vm._v(" "),
                  _c("li", { staticClass: "page-item active" }, [
                    _c(
                      "span",
                      { staticClass: "page-link p-2" },
                      [
                        _c("b-icon", { attrs: { icon: "book-half" } }),
                        _vm._v(
                          "\n                                " +
                            _vm._s(_vm.songList.current_page) +
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
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-lg-12 mb-4" }, [
      _c("h1", { staticClass: "text-center" }, [
        _vm._v("\n                My Karaoke' \n            ")
      ])
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

/***/ "./resources/js/pages/Admin/Song.vue":
/*!*******************************************!*\
  !*** ./resources/js/pages/Admin/Song.vue ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Song_vue_vue_type_template_id_5f798084___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Song.vue?vue&type=template&id=5f798084& */ "./resources/js/pages/Admin/Song.vue?vue&type=template&id=5f798084&");
/* harmony import */ var _Song_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Song.vue?vue&type=script&lang=js& */ "./resources/js/pages/Admin/Song.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Song_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Song_vue_vue_type_template_id_5f798084___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Song_vue_vue_type_template_id_5f798084___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Admin/Song.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Admin/Song.vue?vue&type=script&lang=js&":
/*!********************************************************************!*\
  !*** ./resources/js/pages/Admin/Song.vue?vue&type=script&lang=js& ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Song_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Song.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/Song.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Song_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Admin/Song.vue?vue&type=template&id=5f798084&":
/*!**************************************************************************!*\
  !*** ./resources/js/pages/Admin/Song.vue?vue&type=template&id=5f798084& ***!
  \**************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Song_vue_vue_type_template_id_5f798084___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Song.vue?vue&type=template&id=5f798084& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/Song.vue?vue&type=template&id=5f798084&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Song_vue_vue_type_template_id_5f798084___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Song_vue_vue_type_template_id_5f798084___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/pages/Admin/SongForm.vue":
/*!***********************************************!*\
  !*** ./resources/js/pages/Admin/SongForm.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SongForm_vue_vue_type_template_id_818aa8bc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SongForm.vue?vue&type=template&id=818aa8bc& */ "./resources/js/pages/Admin/SongForm.vue?vue&type=template&id=818aa8bc&");
/* harmony import */ var _SongForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SongForm.vue?vue&type=script&lang=js& */ "./resources/js/pages/Admin/SongForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SongForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SongForm_vue_vue_type_template_id_818aa8bc___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SongForm_vue_vue_type_template_id_818aa8bc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Admin/SongForm.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Admin/SongForm.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/pages/Admin/SongForm.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SongForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./SongForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/SongForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SongForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Admin/SongForm.vue?vue&type=template&id=818aa8bc&":
/*!******************************************************************************!*\
  !*** ./resources/js/pages/Admin/SongForm.vue?vue&type=template&id=818aa8bc& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SongForm_vue_vue_type_template_id_818aa8bc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./SongForm.vue?vue&type=template&id=818aa8bc& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/SongForm.vue?vue&type=template&id=818aa8bc&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SongForm_vue_vue_type_template_id_818aa8bc___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SongForm_vue_vue_type_template_id_818aa8bc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/pages/Admin/SongList.vue":
/*!***********************************************!*\
  !*** ./resources/js/pages/Admin/SongList.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SongList_vue_vue_type_template_id_19985b08___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SongList.vue?vue&type=template&id=19985b08& */ "./resources/js/pages/Admin/SongList.vue?vue&type=template&id=19985b08&");
/* harmony import */ var _SongList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SongList.vue?vue&type=script&lang=js& */ "./resources/js/pages/Admin/SongList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SongList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SongList_vue_vue_type_template_id_19985b08___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SongList_vue_vue_type_template_id_19985b08___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Admin/SongList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Admin/SongList.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/pages/Admin/SongList.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SongList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./SongList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/SongList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SongList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Admin/SongList.vue?vue&type=template&id=19985b08&":
/*!******************************************************************************!*\
  !*** ./resources/js/pages/Admin/SongList.vue?vue&type=template&id=19985b08& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SongList_vue_vue_type_template_id_19985b08___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./SongList.vue?vue&type=template&id=19985b08& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Admin/SongList.vue?vue&type=template&id=19985b08&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SongList_vue_vue_type_template_id_19985b08___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SongList_vue_vue_type_template_id_19985b08___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);