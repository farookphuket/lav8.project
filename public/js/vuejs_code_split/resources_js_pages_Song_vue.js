"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_Song_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Song.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Song.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SongSearch_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SongSearch.vue */ "./resources/js/pages/SongSearch.vue");
/* harmony import */ var _SongList_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SongList.vue */ "./resources/js/pages/SongList.vue");
//
//
//
//
//
//
//
//
//


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Song",
  components: {
    SongList: _SongList_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    SongSearch: _SongSearch_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      songs: [],
      albums: [],
      artists: [],
      isShowPagination: false
    };
  },
  mounted: function mounted() {
    this.getSongList();
  },
  methods: {
    getSongList: function getSongList(page) {
      var _this = this;

      this.isShowPagination = false;
      var url = "";

      if (page) {
        url = page;
        this.$cookies.set("psong_old_page", url);
      }

      url = this.$cookies.get("psong_old_page");

      if (!url) {
        url = "/getsong";
      }

      axios.get(url).then(function (res) {
        var rData = res.data;
        _this.songs = rData.songs;
        if (Object.keys(rData.songs.data).length >= _this.songs.per_page) _this.isShowPagination = true; //console.log(rData.songs.data.length)
        //console.log(`per page ${rData.songs.per_page}`)
      });
    },
    openSong: function openSong(id) {
      var _this2 = this;

      var url = "/song/".concat(id);
      axios.get(url).then(function (res) {
        window.open(res.data.url, "_blank");
      });
      setTimeout(function () {
        _this2.getSongList();
      }, 2500);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/SongList.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/SongList.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "SongList",
  props: ["songs", "isShowPagination"],
  data: function data() {
    return {
      moment: moment,
      sTitle: new CustomText()
    };
  },
  methods: {
    readCount: function readCount(id) {
      var _this = this;

      var url = "/song/".concat(id);
      axios.get(url).then(function (res) {
        //console.log(res.data.url)
        window.open(res.data.url, "_blank");
        setTimeout(function () {
          _this.$emit("getSongList");
        }, 2000);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/SongSearch.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/SongSearch.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "SongSearch",
  data: function data() {
    return {
      search: "",
      song: [],
      moment: moment,
      sTitle: new CustomText()
    };
  },
  methods: {
    searchSong: function searchSong() {
      var _this = this;

      var keySearch = this.$refs.search.value;

      if (keySearch.length > 2) {
        var url = "/searchSong?search=".concat(this.search);
        axios.get(url).then(function (res) {
          //   console.log(res.data)
          _this.song = res.data.song;
        });
      } else {
        this.clearForm();
      }
    },
    getSong: function getSong(id) {
      var _this2 = this;

      var url = "/song/".concat(id);
      axios.get(url).then(function (res) {
        //   console.log(res.data)
        window.open(res.data.url, "_blank");
        setTimeout(function () {
          _this2.$emit("getSongList");
        }, 2000);
      });
    },
    clearForm: function clearForm() {
      this.song = 0;
    }
  }
});

/***/ }),

/***/ "./resources/js/pages/Song.vue":
/*!*************************************!*\
  !*** ./resources/js/pages/Song.vue ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Song_vue_vue_type_template_id_1e9b0d9e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Song.vue?vue&type=template&id=1e9b0d9e& */ "./resources/js/pages/Song.vue?vue&type=template&id=1e9b0d9e&");
/* harmony import */ var _Song_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Song.vue?vue&type=script&lang=js& */ "./resources/js/pages/Song.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Song_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Song_vue_vue_type_template_id_1e9b0d9e___WEBPACK_IMPORTED_MODULE_0__.render,
  _Song_vue_vue_type_template_id_1e9b0d9e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Song.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/SongList.vue":
/*!*****************************************!*\
  !*** ./resources/js/pages/SongList.vue ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SongList_vue_vue_type_template_id_d99c9f48___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SongList.vue?vue&type=template&id=d99c9f48& */ "./resources/js/pages/SongList.vue?vue&type=template&id=d99c9f48&");
/* harmony import */ var _SongList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SongList.vue?vue&type=script&lang=js& */ "./resources/js/pages/SongList.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SongList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SongList_vue_vue_type_template_id_d99c9f48___WEBPACK_IMPORTED_MODULE_0__.render,
  _SongList_vue_vue_type_template_id_d99c9f48___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/SongList.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/SongSearch.vue":
/*!*******************************************!*\
  !*** ./resources/js/pages/SongSearch.vue ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SongSearch_vue_vue_type_template_id_e73d4234___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SongSearch.vue?vue&type=template&id=e73d4234& */ "./resources/js/pages/SongSearch.vue?vue&type=template&id=e73d4234&");
/* harmony import */ var _SongSearch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SongSearch.vue?vue&type=script&lang=js& */ "./resources/js/pages/SongSearch.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SongSearch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SongSearch_vue_vue_type_template_id_e73d4234___WEBPACK_IMPORTED_MODULE_0__.render,
  _SongSearch_vue_vue_type_template_id_e73d4234___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/SongSearch.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Song.vue?vue&type=script&lang=js&":
/*!**************************************************************!*\
  !*** ./resources/js/pages/Song.vue?vue&type=script&lang=js& ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Song_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Song.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Song.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Song_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/SongList.vue?vue&type=script&lang=js&":
/*!******************************************************************!*\
  !*** ./resources/js/pages/SongList.vue?vue&type=script&lang=js& ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SongList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SongList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/SongList.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SongList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/SongSearch.vue?vue&type=script&lang=js&":
/*!********************************************************************!*\
  !*** ./resources/js/pages/SongSearch.vue?vue&type=script&lang=js& ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SongSearch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SongSearch.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/SongSearch.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SongSearch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Song.vue?vue&type=template&id=1e9b0d9e&":
/*!********************************************************************!*\
  !*** ./resources/js/pages/Song.vue?vue&type=template&id=1e9b0d9e& ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Song_vue_vue_type_template_id_1e9b0d9e___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Song_vue_vue_type_template_id_1e9b0d9e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Song_vue_vue_type_template_id_1e9b0d9e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Song.vue?vue&type=template&id=1e9b0d9e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Song.vue?vue&type=template&id=1e9b0d9e&");


/***/ }),

/***/ "./resources/js/pages/SongList.vue?vue&type=template&id=d99c9f48&":
/*!************************************************************************!*\
  !*** ./resources/js/pages/SongList.vue?vue&type=template&id=d99c9f48& ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SongList_vue_vue_type_template_id_d99c9f48___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SongList_vue_vue_type_template_id_d99c9f48___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SongList_vue_vue_type_template_id_d99c9f48___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SongList.vue?vue&type=template&id=d99c9f48& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/SongList.vue?vue&type=template&id=d99c9f48&");


/***/ }),

/***/ "./resources/js/pages/SongSearch.vue?vue&type=template&id=e73d4234&":
/*!**************************************************************************!*\
  !*** ./resources/js/pages/SongSearch.vue?vue&type=template&id=e73d4234& ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SongSearch_vue_vue_type_template_id_e73d4234___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SongSearch_vue_vue_type_template_id_e73d4234___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SongSearch_vue_vue_type_template_id_e73d4234___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SongSearch.vue?vue&type=template&id=e73d4234& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/SongSearch.vue?vue&type=template&id=e73d4234&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Song.vue?vue&type=template&id=1e9b0d9e&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Song.vue?vue&type=template&id=1e9b0d9e& ***!
  \***********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "container" },
    [
      _c("song-search", {
        on: {
          getSongList: function($event) {
            return _vm.getSongList($event)
          }
        }
      }),
      _vm._v(" "),
      _c("song-list", {
        attrs: { songs: _vm.songs, isShowPagination: _vm.isShowPagination },
        on: {
          getSongList: function($event) {
            return _vm.getSongList($event)
          },
          openSong: function($event) {
            return _vm.openSong($event)
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/SongList.vue?vue&type=template&id=d99c9f48&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/SongList.vue?vue&type=template&id=d99c9f48& ***!
  \***************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticClass: "row" },
      _vm._l(_vm.songs.data, function(so) {
        return _c("div", { staticClass: "col-md-3 pt-2" }, [
          _c("div", { staticStyle: { "min-height": "250px" } }, [
            _c(
              "a",
              {
                attrs: { href: "", title: so.song_name },
                on: {
                  click: function($event) {
                    $event.preventDefault()
                    return _vm.$emit("openSong", so.id)
                  }
                }
              },
              [
                _c("img", {
                  staticClass: "responsive d-block mx-auto",
                  staticStyle: { "max-height": "240px" },
                  attrs: { src: so.song_cover, alt: so.song_name }
                })
              ]
            )
          ]),
          _vm._v(" "),
          _c("p", { staticClass: "text-center pt-2" }, [
            _c(
              "a",
              {
                attrs: { href: "", title: so.song_name },
                on: {
                  click: function($event) {
                    $event.preventDefault()
                    return _vm.$emit("openSong", so.id)
                  }
                }
              },
              [
                _vm._v(
                  "\n                        " +
                    _vm._s(_vm.sTitle.smartTitle(so.song_name, 15)) +
                    " \n                    "
                )
              ]
            ),
            _vm._v(
              "\n                   - " +
                _vm._s(so.user.name) +
                "\n                "
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "card " }, [
            _c("div", { staticClass: "card-body" }, [
              _c("p", { staticClass: "card-text" }, [
                _c(
                  "span",
                  { staticClass: "badge badge-info" },
                  [
                    _c("b-icon", { attrs: { icon: "clock-history" } }),
                    _vm._v(" "),
                    _c(
                      "a",
                      {
                        staticStyle: { color: "white", "font-weight": "bold" },
                        attrs: { href: "", title: _vm.moment(so.posted_at) }
                      },
                      [
                        _vm._v(
                          "\n                            " +
                            _vm._s(_vm.moment(so.posted_at).fromNow()) +
                            "\n                        "
                        )
                      ]
                    )
                  ],
                  1
                ),
                _vm._v(" \n                     - \n                    "),
                _c(
                  "span",
                  { staticClass: "badge badge-info" },
                  [
                    _c("b-icon", { attrs: { icon: "headphones" } }),
                    _vm._v(
                      " \n                         " +
                        _vm._s(so.read_count) +
                        "\n                    "
                    )
                  ],
                  1
                )
              ])
            ])
          ])
        ])
      }),
      0
    ),
    _vm._v(" "),
    _c("div", { staticClass: "nav-scroller py-1 mb-2 pt-4" }, [
      !_vm.isShowPagination == false
        ? _c("nav", { staticClass: "nav d-flex justify-content-center" }, [
            _c(
              "ul",
              { staticClass: "pagination flex-wrap" },
              [
                _c("li", { staticClass: "page-item disabled" }, [
                  _c("div", { staticClass: "page-link" }, [
                    _vm._v(
                      "\n                        showing from  \n                        "
                    ),
                    _c("span", [_vm._v(_vm._s(_vm.songs.from))]),
                    _vm._v(
                      "  \n                        to \n                        "
                    ),
                    _c("span", [_vm._v(_vm._s(_vm.songs.to))]),
                    _vm._v(
                      "   \n                        of \n                        "
                    ),
                    _c("span", [_vm._v(_vm._s(_vm.songs.total))])
                  ])
                ]),
                _vm._v(" "),
                _vm._l(_vm.songs.links, function(ll) {
                  return _c("li", { staticClass: "page-item" }, [
                    ll.active == false && ll.url != null
                      ? _c(
                          "a",
                          {
                            staticClass: "page-link p-2",
                            attrs: { href: "" },
                            domProps: { innerHTML: _vm._s(ll.label) },
                            on: {
                              click: function($event) {
                                $event.preventDefault()
                                return _vm.$emit("getSongList", ll.url)
                              }
                            }
                          },
                          [
                            _vm._v(
                              "\n                        " +
                                _vm._s(ll.label) +
                                "\n                    "
                            )
                          ]
                        )
                      : _c(
                          "span",
                          {
                            staticClass: "page-link active",
                            domProps: { innerHTML: _vm._s(ll.label) }
                          },
                          [
                            _vm._v(
                              "\n                        " +
                                _vm._s(ll.label) +
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
                          _vm._s(_vm.songs.current_page)
                      )
                    ],
                    1
                  )
                ])
              ],
              2
            )
          ])
        : _vm._e()
    ]),
    _vm._v(" "),
    _c("p", { staticClass: "pt-4" }, [_vm._v(" ")])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/SongSearch.vue?vue&type=template&id=e73d4234&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/SongSearch.vue?vue&type=template&id=e73d4234& ***!
  \*****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _vm._m(0),
    _vm._v(" "),
    _c("div", { staticClass: "mt-2 mb-2" }, [
      _c("form", { attrs: { action: "" } }, [
        _c(
          "div",
          { staticClass: "form-group" },
          [
            _c(
              "b-input-group",
              [
                _c(
                  "b-input-group-prepend",
                  { attrs: { "is-text": "" } },
                  [_c("b-icon", { attrs: { icon: "search" } })],
                  1
                ),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.search,
                      expression: "search"
                    }
                  ],
                  ref: "search",
                  staticClass: "form-control",
                  attrs: { placeholder: "Search my karaoke...", type: "text" },
                  domProps: { value: _vm.search },
                  on: {
                    keyup: function($event) {
                      $event.preventDefault()
                      return _vm.searchSong.apply(null, arguments)
                    },
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.search = $event.target.value
                    }
                  }
                })
              ],
              1
            )
          ],
          1
        )
      ])
    ]),
    _vm._v(" "),
    _vm.song != 0
      ? _c("div", { staticClass: "container-fluid" }, [
          _c(
            "div",
            { staticClass: "row" },
            _vm._l(_vm.song, function(li) {
              return _c("div", { staticClass: "col-lg-4 pt-2" }, [
                _c("div", { staticClass: "card" }, [
                  _c(
                    "a",
                    {
                      attrs: { href: "" },
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          return _vm.getSong(li.id)
                        }
                      }
                    },
                    [
                      _c("img", {
                        staticClass: "responsive card-img-top d-block mx-auto",
                        staticStyle: {
                          "max-height": "220px",
                          "max-width": "180px"
                        },
                        attrs: { src: li.song_cover, alt: li.song_name }
                      })
                    ]
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "card-body" }, [
                    _c("div", { staticClass: "table-responsive" }, [
                      _c(
                        "table",
                        { staticClass: "table table-striped table-bordered" },
                        [
                          _c("tr", [
                            _c("th", [_vm._v("Song Title")]),
                            _vm._v(" "),
                            _c("td", [
                              _c(
                                "a",
                                { attrs: { href: "", title: li.song_name } },
                                [
                                  _vm._v(
                                    "\n                                            " +
                                      _vm._s(
                                        _vm.sTitle.smartTitle(li.song_name, 9)
                                      ) +
                                      "\n                                        "
                                  )
                                ]
                              )
                            ])
                          ]),
                          _vm._v(" "),
                          _c("tr", [
                            _c("th", [_vm._v("Post by")]),
                            _vm._v(" "),
                            _c(
                              "td",
                              [
                                _c("b-icon", { attrs: { icon: "person" } }),
                                _vm._v(
                                  "\n                                        " +
                                    _vm._s(li.user.name) +
                                    "\n                                    "
                                )
                              ],
                              1
                            )
                          ])
                        ]
                      )
                    ]),
                    _vm._v(" "),
                    _c(
                      "span",
                      { staticClass: "badge badge-info" },
                      [
                        _c("b-icon", { attrs: { icon: "clock-history" } }),
                        _vm._v(
                          "\n                            " +
                            _vm._s(_vm.moment(li.posted_at).fromNow()) +
                            "\n                        "
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "span",
                      { staticClass: "badge badge-info" },
                      [
                        _c("b-icon", { attrs: { icon: "headphones" } }),
                        _vm._v(
                          "\n                            " +
                            _vm._s(li.read_count) +
                            "\n                        "
                        )
                      ],
                      1
                    )
                  ])
                ])
              ])
            }),
            0
          )
        ])
      : _vm._e(),
    _vm._v(" "),
    _c("p", { staticClass: "mb-4 pt-4" }, [_vm._v(" ")])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "section-title" }, [
      _c("h2", [_vm._v("My Karaoke")])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ normalizeComponent)
/* harmony export */ });
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


/***/ })

}]);