(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Member/WhatNews.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Member/WhatNews.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WhatNewsList_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WhatNewsList.vue */ "./resources/js/pages/Member/WhatNewsList.vue");
/* harmony import */ var _WhatNewsForm_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WhatNewsForm.vue */ "./resources/js/pages/Member/WhatNewsForm.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "WhatnewsMember",
  props: ["templates"],
  components: {
    WhatnewsForm: _WhatNewsForm_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    WhatnewsList: _WhatNewsList_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      whatnews: [],
      editId: 0,
      res_status: ''
    };
  },
  mounted: function mounted() {
    this.getWhatnews();
  },
  methods: {
    getWhatnews: function getWhatnews(page) {
      var _this = this;

      this.editId = 0;
      var url = '';

      if (page) {
        url = page;
        this.$cookies.set("old_whatnews_page", url);
      }

      url = this.$cookies.get("old_whatnews_page");

      if (!url) {
        url = "/member/whatnews";
      }

      axios.get(url).then(function (res) {
        _this.whatnews = res.data.whatnews;
      });
    },
    wnRead: function wnRead(id) {
      //this.$bvModal.hide('showBox')
      var url = "/member/wnFullRead/".concat(id);
      location.href = url;
    },
    wnEdit: function wnEdit(id) {
      this.editId = id;
    },
    wnDel: function wnDel(id) {
      var _this2 = this;

      if (confirm("this will delete ".concat(id)) == true) {
        var url = "/member/whatnews/".concat(id);
        axios["delete"](url).then(function (res) {
          _this2.res_status = res.data.msg;

          _this2.$refs["onOk"].show();

          setTimeout(function () {
            _this2.getWhatnews();
          }, 2500);
        });
      } else {
        return;
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Member/WhatNewsForm.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Member/WhatNewsForm.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
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

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "WhatnewsForm",
  props: ["editId", "templates"],
  watch: {
    "editId": function editId(x) {
      this.saveId = x;
      this.getData(x);
    }
  },
  data: function data() {
    return {
      saveId: 0,
      is_public: 0,
      disable: false,
      title: '',
      body: '',
      res_status: '',
      error: 0
    };
  },
  methods: {
    getData: function getData(id) {
      var _this = this;

      var url = "/member/whatnews/".concat(id);
      axios.get(url).then(function (res) {
        var fData = res.data.whatnews;
        _this.body = fData.whatnews_body;
        _this.title = fData.whatnews_title;

        if (fData.is_public != 0) {
          _this.is_public = 1;
        } else {
          _this.is_public = 0;
        }

        _this.saveId = fData.id;
        _this.disable = true;

        _this.$refs.title.focus();
      });
    },
    setTemplate: function setTemplate() {
      var _this2 = this;

      var tmId = this.$refs.getTemplate.value;

      if (tmId == 0) {
        this.clearFormdata();
      } else {
        this.templates.forEach(function (val) {
          if (val.id == tmId) {
            _this2.title = val.title;
            _this2.body = val.excerpt;
          }
        });
      }

      setTimeout(function () {
        _this2.$refs.getTemplate.value = 0;
      }, 2500);
    },
    wnSave: function wnSave(id) {
      var _this3 = this;

      var url = '';
      var data = {
        whatnews_title: this.title,
        whatnews_body: this.body,
        is_public: this.is_public
      };

      if (id) {
        url = "/member/whatnews/".concat(id);
        axios.put(url, data).then(function (res) {
          _this3.res_status = res.data.msg;
          _this3.error = 0;
        }, function (err) {
          _this3.error = 1;
          _this3.res_status = "<span class=\"badge badge-danger\">\n              ".concat(err.response.data.message, "</span>");
        });
        this.$refs["onOk"].show();
      } else {
        url = "/member/whatnews";
        axios.post(url, data).then(function (res) {
          _this3.res_status = res.data.msg;
          _this3.error = 0;
        }, function (err) {
          _this3.error = 1;
          _this3.res_status = "<span class=\"badge badge-danger\">\n              ".concat(err.response.data.message, "</span>");
        });
        this.$refs["onOk"].show();
      }
    },
    clearFormdata: function clearFormdata() {
      this.title = '';
      this.body = '';
      this.saveId = 0;
      this.is_public = 0;
      this.disable = false;
    },
    closeBox: function closeBox() {
      if (this.error == 0) {
        this.clearFormdata();
      } else {
        alert("sorry there are error");
      }

      this.$emit("getWhatnews");
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Member/WhatNewsList.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Member/WhatNewsList.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
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
var moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "WhatNewsList",
  props: ["whatnews"],
  data: function data() {
    return {
      ownerId: '',
      moment: moment,
      showId: 0,
      show_sample: ''
    };
  },
  watch: {},
  mounted: function mounted() {
    this.ownerId = window.ownerId;
  },
  methods: {
    showSample: function showSample(id) {
      var _this = this;

      this.whatnews.data.forEach(function (val) {
        if (val.id == id) {
          //console.log(val.whatnews_title)
          _this.show_sample = val.whatnews_body;
          _this.showId = id;

          _this.$refs["showBox"].show();
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Member/WhatNewsForm.vue?vue&type=style&index=0&id=6e4246d2&scoped=true&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--5-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--5-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Member/WhatNewsForm.vue?vue&type=style&index=0&id=6e4246d2&scoped=true&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.wn-form[data-v-6e4246d2]{\n  margin-bottom:8em;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Member/WhatNewsForm.vue?vue&type=style&index=0&id=6e4246d2&scoped=true&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--5-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--5-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Member/WhatNewsForm.vue?vue&type=style&index=0&id=6e4246d2&scoped=true&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--5-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--5-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./WhatNewsForm.vue?vue&type=style&index=0&id=6e4246d2&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Member/WhatNewsForm.vue?vue&type=style&index=0&id=6e4246d2&scoped=true&lang=css&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Member/WhatNews.vue?vue&type=template&id=f5af999a&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Member/WhatNews.vue?vue&type=template&id=f5af999a& ***!
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
  return _c(
    "div",
    [
      _c("whatnews-form", {
        attrs: { editId: _vm.editId, templates: _vm.templates },
        on: {
          getWhatnews: function($event) {
            return _vm.getWhatnews($event)
          }
        }
      }),
      _vm._v(" "),
      _c("whatnews-list", {
        attrs: { whatnews: _vm.whatnews },
        on: {
          wnEdit: function($event) {
            return _vm.wnEdit($event)
          },
          wnDel: function($event) {
            return _vm.wnDel($event)
          },
          wnRead: function($event) {
            return _vm.wnRead($event)
          },
          getWhatnews: function($event) {
            return _vm.getWhatnews($event)
          }
        }
      }),
      _vm._v(" "),
      _c(
        "b-modal",
        { ref: "onOk", attrs: { title: "message box", "ok-only": "" } },
        [
          _c("div", { domProps: { innerHTML: _vm._s(_vm.res_status) } }, [
            _vm._v("\n      " + _vm._s(_vm.res_status) + "\n    ")
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Member/WhatNewsForm.vue?vue&type=template&id=6e4246d2&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Member/WhatNewsForm.vue?vue&type=template&id=6e4246d2&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "wn-form" },
    [
      _c("form", { attrs: { action: "" } }, [
        _c("div", { staticClass: "form-group" }, [
          _c(
            "select",
            {
              ref: "getTemplate",
              staticClass: "form-control",
              attrs: { disabled: _vm.disable },
              on: { change: _vm.setTemplate }
            },
            [
              _c("option", { attrs: { value: "0" } }, [
                _vm._v("-- Select template --")
              ]),
              _vm._v(" "),
              _vm._l(_vm.templates, function(li) {
                return _c("option", { domProps: { value: li.id } }, [
                  _vm._v("\n        " + _vm._s(li.title) + "\n        ")
                ])
              })
            ],
            2
          )
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
            attrs: { type: "text" },
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
        _c("div", { staticClass: "form-group" }, [
          _c("label", { attrs: { for: "" } }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.is_public,
                  expression: "is_public"
                }
              ],
              staticClass: "form-control",
              attrs: { type: "checkbox" },
              domProps: {
                checked: Array.isArray(_vm.is_public)
                  ? _vm._i(_vm.is_public, null) > -1
                  : _vm.is_public
              },
              on: {
                change: function($event) {
                  var $$a = _vm.is_public,
                    $$el = $event.target,
                    $$c = $$el.checked ? true : false
                  if (Array.isArray($$a)) {
                    var $$v = null,
                      $$i = _vm._i($$a, $$v)
                    if ($$el.checked) {
                      $$i < 0 && (_vm.is_public = $$a.concat([$$v]))
                    } else {
                      $$i > -1 &&
                        (_vm.is_public = $$a
                          .slice(0, $$i)
                          .concat($$a.slice($$i + 1)))
                    }
                  } else {
                    _vm.is_public = $$c
                  }
                }
              }
            }),
            _vm._v(" "),
            _vm.is_public == false
              ? _c("span", { staticClass: "badge badge-warning" }, [
                  _vm._v("\n            No , I don't want to show\n          ")
                ])
              : _c("span", { staticClass: "badge badge-success" }, [
                  _vm._v(
                    "\n            Yes, I want to show this post\n          "
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
                attrs: { type: "submit" },
                on: {
                  click: function($event) {
                    $event.preventDefault()
                    return _vm.wnSave(_vm.saveId)
                  }
                }
              },
              [_vm._v("\n          Save\n        ")]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-outline-danger",
                on: {
                  click: function($event) {
                    $event.preventDefault()
                    return _vm.clearFormdata($event)
                  }
                }
              },
              [_vm._v("\n          Clear\n        ")]
            )
          ])
        ])
      ]),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          ref: "onOk",
          attrs: { title: "message box", "ok-only": "" },
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Member/WhatNewsList.vue?vue&type=template&id=064ff91e&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Member/WhatNewsList.vue?vue&type=template&id=064ff91e& ***!
  \*****************************************************************************************************************************************************************************************************************/
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
      _vm._l(_vm.whatnews.data, function(li) {
        return _c("article", { staticClass: "post-preview" }, [
          _c(
            "a",
            {
              attrs: { href: "" },
              on: {
                click: function($event) {
                  $event.preventDefault()
                  return _vm.showSample(li.id)
                }
              }
            },
            [
              _c("h2", { staticClass: "post-title" }, [
                _vm._v(
                  "\n            " + _vm._s(li.whatnews_title) + "\n          "
                )
              ])
            ]
          ),
          _vm._v(" "),
          _c("p", { staticClass: "post-meta" }, [
            _vm._v(
              "Posted by\n          \n        " +
                _vm._s(li.user.name) +
                "\n          on\n          " +
                _vm._s(_vm.moment(li.created_at)) +
                "  · \n          "
            ),
            _c(
              "span",
              {
                staticClass: "reading-time",
                attrs: { title: "Estimated read time" }
              },
              [
                _vm._v(
                  "\n            " +
                    _vm._s(_vm.moment(li.created_at).fromNow()) +
                    "\n          "
                )
              ]
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "clearfix" }, [
            _vm.ownerId == li.user_id
              ? _c("div", { staticClass: "float-right" }, [
                  li.is_public == 0
                    ? _c("span", { staticClass: "badge badge-warning" }, [
                        _vm._v("\n              Private\n            ")
                      ])
                    : _c("span", { staticClass: "badge badge-success" }, [
                        _vm._v("\n              Public\n            ")
                      ]),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-outline-primary btn-sm",
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          return _vm.$emit("wnEdit", li.id)
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
                          return _vm.$emit("wnDel", li.id)
                        }
                      }
                    },
                    [_vm._v("×")]
                  )
                ])
              : _vm._e()
          ])
        ])
      }),
      _vm._v(" "),
      _c("div", { staticClass: "pa" }, [
        _c(
          "ul",
          { staticClass: "pagination" },
          [
            _c("li", { staticClass: "page-item" }, [
              _vm._v("\n            showing\n            "),
              _c("span", [
                _vm._v(
                  "\n                " +
                    _vm._s(_vm.whatnews.from) +
                    "\n            "
                )
              ]),
              _vm._v(" \n            to   \n            "),
              _c("span", [
                _vm._v(
                  "\n              " +
                    _vm._s(_vm.whatnews.to) +
                    "\n            "
                )
              ]),
              _vm._v("\n            of \n            "),
              _c("span", [
                _vm._v(
                  "\n              " +
                    _vm._s(_vm.whatnews.total) +
                    "\n            "
                )
              ])
            ]),
            _vm._v(" "),
            _vm._l(_vm.whatnews.links, function(mm) {
              return _c("li", { staticClass: "page-item" }, [
                mm.active == false && mm.url != null
                  ? _c(
                      "a",
                      {
                        attrs: { href: "" },
                        domProps: { innerHTML: _vm._s(mm.label) },
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            return _vm.$emit("getWhatnews", mm.url)
                          }
                        }
                      },
                      [_vm._v(_vm._s(mm.label))]
                    )
                  : _c(
                      "span",
                      {
                        staticClass: "active",
                        domProps: { innerHTML: _vm._s(mm.label) }
                      },
                      [
                        _vm._v(
                          "\n              " +
                            _vm._s(mm.label) +
                            "\n            "
                        )
                      ]
                    )
              ])
            }),
            _vm._v(" "),
            _c("li", { staticClass: "page-item" }, [
              _c("span", [
                _vm._v(
                  "\n              " +
                    _vm._s(_vm.whatnews.current_page) +
                    "\n            "
                )
              ])
            ])
          ],
          2
        )
      ]),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          ref: "showBox",
          attrs: {
            title: "show sample",
            size: "xl",
            id: "showBox",
            scrollable: "",
            "hide-footer": ""
          }
        },
        [
          _c(
            "div",
            {
              staticClass: "mb-4 d-block",
              domProps: { innerHTML: _vm._s(_vm.show_sample) }
            },
            [
              _vm._v(
                "\n            " + _vm._s(_vm.show_sample) + "\n          "
              )
            ]
          ),
          _vm._v(" "),
          _c(
            "b-button",
            {
              attrs: { variant: "outline-info", block: "" },
              on: {
                click: function($event) {
                  $event.preventDefault()
                  return _vm.$emit("wnRead", _vm.showId)
                }
              }
            },
            [_vm._v("Read On page")]
          ),
          _vm._v(" "),
          _c(
            "b-button",
            {
              attrs: { variant: "outline-danger", block: "" },
              on: {
                click: function($event) {
                  $event.preventDefault()
                  return _vm.$bvModal.hide("showBox")
                }
              }
            },
            [_vm._v("Just close")]
          )
        ],
        1
      )
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

/***/ "./resources/js/pages/Member/WhatNews.vue":
/*!************************************************!*\
  !*** ./resources/js/pages/Member/WhatNews.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WhatNews_vue_vue_type_template_id_f5af999a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WhatNews.vue?vue&type=template&id=f5af999a& */ "./resources/js/pages/Member/WhatNews.vue?vue&type=template&id=f5af999a&");
/* harmony import */ var _WhatNews_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WhatNews.vue?vue&type=script&lang=js& */ "./resources/js/pages/Member/WhatNews.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _WhatNews_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _WhatNews_vue_vue_type_template_id_f5af999a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _WhatNews_vue_vue_type_template_id_f5af999a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Member/WhatNews.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Member/WhatNews.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/pages/Member/WhatNews.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatNews_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./WhatNews.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Member/WhatNews.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatNews_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Member/WhatNews.vue?vue&type=template&id=f5af999a&":
/*!*******************************************************************************!*\
  !*** ./resources/js/pages/Member/WhatNews.vue?vue&type=template&id=f5af999a& ***!
  \*******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatNews_vue_vue_type_template_id_f5af999a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./WhatNews.vue?vue&type=template&id=f5af999a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Member/WhatNews.vue?vue&type=template&id=f5af999a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatNews_vue_vue_type_template_id_f5af999a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatNews_vue_vue_type_template_id_f5af999a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/pages/Member/WhatNewsForm.vue":
/*!****************************************************!*\
  !*** ./resources/js/pages/Member/WhatNewsForm.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WhatNewsForm_vue_vue_type_template_id_6e4246d2_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WhatNewsForm.vue?vue&type=template&id=6e4246d2&scoped=true& */ "./resources/js/pages/Member/WhatNewsForm.vue?vue&type=template&id=6e4246d2&scoped=true&");
/* harmony import */ var _WhatNewsForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WhatNewsForm.vue?vue&type=script&lang=js& */ "./resources/js/pages/Member/WhatNewsForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _WhatNewsForm_vue_vue_type_style_index_0_id_6e4246d2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WhatNewsForm.vue?vue&type=style&index=0&id=6e4246d2&scoped=true&lang=css& */ "./resources/js/pages/Member/WhatNewsForm.vue?vue&type=style&index=0&id=6e4246d2&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _WhatNewsForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _WhatNewsForm_vue_vue_type_template_id_6e4246d2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _WhatNewsForm_vue_vue_type_template_id_6e4246d2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "6e4246d2",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Member/WhatNewsForm.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Member/WhatNewsForm.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/pages/Member/WhatNewsForm.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatNewsForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./WhatNewsForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Member/WhatNewsForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatNewsForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Member/WhatNewsForm.vue?vue&type=style&index=0&id=6e4246d2&scoped=true&lang=css&":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/pages/Member/WhatNewsForm.vue?vue&type=style&index=0&id=6e4246d2&scoped=true&lang=css& ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_5_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_2_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatNewsForm_vue_vue_type_style_index_0_id_6e4246d2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--5-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--5-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./WhatNewsForm.vue?vue&type=style&index=0&id=6e4246d2&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Member/WhatNewsForm.vue?vue&type=style&index=0&id=6e4246d2&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_5_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_2_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatNewsForm_vue_vue_type_style_index_0_id_6e4246d2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_5_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_2_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatNewsForm_vue_vue_type_style_index_0_id_6e4246d2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_5_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_2_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatNewsForm_vue_vue_type_style_index_0_id_6e4246d2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_5_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_2_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatNewsForm_vue_vue_type_style_index_0_id_6e4246d2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/pages/Member/WhatNewsForm.vue?vue&type=template&id=6e4246d2&scoped=true&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/pages/Member/WhatNewsForm.vue?vue&type=template&id=6e4246d2&scoped=true& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatNewsForm_vue_vue_type_template_id_6e4246d2_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./WhatNewsForm.vue?vue&type=template&id=6e4246d2&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Member/WhatNewsForm.vue?vue&type=template&id=6e4246d2&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatNewsForm_vue_vue_type_template_id_6e4246d2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatNewsForm_vue_vue_type_template_id_6e4246d2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/pages/Member/WhatNewsList.vue":
/*!****************************************************!*\
  !*** ./resources/js/pages/Member/WhatNewsList.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WhatNewsList_vue_vue_type_template_id_064ff91e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WhatNewsList.vue?vue&type=template&id=064ff91e& */ "./resources/js/pages/Member/WhatNewsList.vue?vue&type=template&id=064ff91e&");
/* harmony import */ var _WhatNewsList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WhatNewsList.vue?vue&type=script&lang=js& */ "./resources/js/pages/Member/WhatNewsList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _WhatNewsList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _WhatNewsList_vue_vue_type_template_id_064ff91e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _WhatNewsList_vue_vue_type_template_id_064ff91e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Member/WhatNewsList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Member/WhatNewsList.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/pages/Member/WhatNewsList.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatNewsList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./WhatNewsList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Member/WhatNewsList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatNewsList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Member/WhatNewsList.vue?vue&type=template&id=064ff91e&":
/*!***********************************************************************************!*\
  !*** ./resources/js/pages/Member/WhatNewsList.vue?vue&type=template&id=064ff91e& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatNewsList_vue_vue_type_template_id_064ff91e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./WhatNewsList.vue?vue&type=template&id=064ff91e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Member/WhatNewsList.vue?vue&type=template&id=064ff91e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatNewsList_vue_vue_type_template_id_064ff91e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatNewsList_vue_vue_type_template_id_064ff91e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);