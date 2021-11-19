"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_Video_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Video.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Video.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/VideoList.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/VideoList.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/VideoSearch.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/VideoSearch.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************/
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
var moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "VideoSearch",
  data: function data() {
    return {
      search: "",
      videos: [],
      moment: moment
    };
  },
  mounted: function mounted() {},
  methods: {
    searchVideo: function searchVideo() {
      var _this = this;

      var url = "/searchVideo?search=".concat(this.search);
      axios.get(url).then(function (res) {
        _this.videos = res.data.videos;
      });
    },
    openVideo: function openVideo(id) {
      this.$emit("openVideo", id);
    },
    smartTitle: function smartTitle(str, len) {
      return str.length > len ? str.substring(0, len) + "..." : str;
    }
  }
});

/***/ }),

/***/ "./resources/js/pages/Video.vue":
/*!**************************************!*\
  !*** ./resources/js/pages/Video.vue ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Video_vue_vue_type_template_id_1d4fb17c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Video.vue?vue&type=template&id=1d4fb17c& */ "./resources/js/pages/Video.vue?vue&type=template&id=1d4fb17c&");
/* harmony import */ var _Video_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Video.vue?vue&type=script&lang=js& */ "./resources/js/pages/Video.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Video_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Video_vue_vue_type_template_id_1d4fb17c___WEBPACK_IMPORTED_MODULE_0__.render,
  _Video_vue_vue_type_template_id_1d4fb17c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Video.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/VideoList.vue":
/*!******************************************!*\
  !*** ./resources/js/pages/VideoList.vue ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _VideoList_vue_vue_type_template_id_28c15800___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VideoList.vue?vue&type=template&id=28c15800& */ "./resources/js/pages/VideoList.vue?vue&type=template&id=28c15800&");
/* harmony import */ var _VideoList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VideoList.vue?vue&type=script&lang=js& */ "./resources/js/pages/VideoList.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _VideoList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _VideoList_vue_vue_type_template_id_28c15800___WEBPACK_IMPORTED_MODULE_0__.render,
  _VideoList_vue_vue_type_template_id_28c15800___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/VideoList.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/VideoSearch.vue":
/*!********************************************!*\
  !*** ./resources/js/pages/VideoSearch.vue ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _VideoSearch_vue_vue_type_template_id_06b4a4ec___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VideoSearch.vue?vue&type=template&id=06b4a4ec& */ "./resources/js/pages/VideoSearch.vue?vue&type=template&id=06b4a4ec&");
/* harmony import */ var _VideoSearch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VideoSearch.vue?vue&type=script&lang=js& */ "./resources/js/pages/VideoSearch.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _VideoSearch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _VideoSearch_vue_vue_type_template_id_06b4a4ec___WEBPACK_IMPORTED_MODULE_0__.render,
  _VideoSearch_vue_vue_type_template_id_06b4a4ec___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/VideoSearch.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Video.vue?vue&type=script&lang=js&":
/*!***************************************************************!*\
  !*** ./resources/js/pages/Video.vue?vue&type=script&lang=js& ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Video_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Video.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Video.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Video_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/VideoList.vue?vue&type=script&lang=js&":
/*!*******************************************************************!*\
  !*** ./resources/js/pages/VideoList.vue?vue&type=script&lang=js& ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./VideoList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/VideoList.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/VideoSearch.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./resources/js/pages/VideoSearch.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoSearch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./VideoSearch.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/VideoSearch.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoSearch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Video.vue?vue&type=template&id=1d4fb17c&":
/*!*********************************************************************!*\
  !*** ./resources/js/pages/Video.vue?vue&type=template&id=1d4fb17c& ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Video_vue_vue_type_template_id_1d4fb17c___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Video_vue_vue_type_template_id_1d4fb17c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Video_vue_vue_type_template_id_1d4fb17c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Video.vue?vue&type=template&id=1d4fb17c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Video.vue?vue&type=template&id=1d4fb17c&");


/***/ }),

/***/ "./resources/js/pages/VideoList.vue?vue&type=template&id=28c15800&":
/*!*************************************************************************!*\
  !*** ./resources/js/pages/VideoList.vue?vue&type=template&id=28c15800& ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoList_vue_vue_type_template_id_28c15800___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoList_vue_vue_type_template_id_28c15800___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoList_vue_vue_type_template_id_28c15800___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./VideoList.vue?vue&type=template&id=28c15800& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/VideoList.vue?vue&type=template&id=28c15800&");


/***/ }),

/***/ "./resources/js/pages/VideoSearch.vue?vue&type=template&id=06b4a4ec&":
/*!***************************************************************************!*\
  !*** ./resources/js/pages/VideoSearch.vue?vue&type=template&id=06b4a4ec& ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoSearch_vue_vue_type_template_id_06b4a4ec___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoSearch_vue_vue_type_template_id_06b4a4ec___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoSearch_vue_vue_type_template_id_06b4a4ec___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./VideoSearch.vue?vue&type=template&id=06b4a4ec& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/VideoSearch.vue?vue&type=template&id=06b4a4ec&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Video.vue?vue&type=template&id=1d4fb17c&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Video.vue?vue&type=template&id=1d4fb17c& ***!
  \************************************************************************************************************************************************************************************************************/
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/VideoList.vue?vue&type=template&id=28c15800&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/VideoList.vue?vue&type=template&id=28c15800& ***!
  \****************************************************************************************************************************************************************************************************************/
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
                          _vm._v(" "),
                          _c("a", { attrs: { href: "", title: vi.title } }, [
                            _vm._v(
                              "\n                                " +
                                _vm._s(_vm.smartTitle(vi.title, 9)) +
                                "\n                            "
                            )
                          ])
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
          _c(
            "div",
            { staticClass: "container", staticStyle: { "margin-top": "2em" } },
            [
              _c("div", { staticClass: "nav-scroller py-1 mb-2" }, [
                _c(
                  "nav",
                  { staticClass: "nav d-flex justify-content-center" },
                  [
                    _c(
                      "ul",
                      { staticClass: "pagination flex-wrap" },
                      [
                        _c("li", { staticClass: "page-item disabled" }, [
                          _c("div", { staticClass: "page-link" }, [
                            _vm._v(
                              "\n                                showing from\n                                "
                            ),
                            _c("span", [
                              _vm._v(
                                "\n                                    " +
                                  _vm._s(_vm.videos.from) +
                                  "\n                                "
                              )
                            ]),
                            _vm._v(
                              "\n                                to\n                                "
                            ),
                            _c("span", [
                              _vm._v(
                                "\n                                    " +
                                  _vm._s(_vm.videos.to) +
                                  "\n                                "
                              )
                            ]),
                            _vm._v(
                              "\n                                of\n                                "
                            ),
                            _c("span", [
                              _vm._v(
                                "\n                                    " +
                                  _vm._s(_vm.videos.total) +
                                  "\n                                "
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
                                    staticClass: "page-link",
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
                            { staticClass: "page-link" },
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
                  ]
                )
              ])
            ]
          )
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
                      return _vm.selectText.apply(null, arguments)
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
                    return _vm.closeBox.apply(null, arguments)
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/VideoSearch.vue?vue&type=template&id=06b4a4ec&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/VideoSearch.vue?vue&type=template&id=06b4a4ec& ***!
  \******************************************************************************************************************************************************************************************************************/
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
      [
        _c("div", { staticClass: "container pt-4" }, [
          _vm._m(0),
          _vm._v(" "),
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
                      staticClass: "form-control",
                      attrs: { placeholder: "Search video...", type: "text" },
                      domProps: { value: _vm.search },
                      on: {
                        keyup: _vm.searchVideo,
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
        _vm._l(_vm.videos, function(vi) {
          return _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.search,
                  expression: "search"
                }
              ],
              staticClass: "container"
            },
            [
              _c("div", { staticClass: "card" }, [
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
                ),
                _vm._v(" "),
                _c("div", { staticClass: "card-body" }, [
                  _c("p", { staticClass: "pt-2 mb-4" }, [
                    _c(
                      "a",
                      {
                        attrs: { href: "" },
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            return _vm.openVideo(vi.id)
                          }
                        }
                      },
                      [
                        _c("b-icon", { attrs: { icon: "info-circle" } }),
                        _vm._v(
                          " \n                            " +
                            _vm._s(vi.title) +
                            "\n                        "
                        )
                      ],
                      1
                    )
                  ]),
                  _vm._v("\n                    ·\n                    "),
                  _c(
                    "span",
                    { staticClass: "badge badge-info" },
                    [
                      _c("b-icon", { attrs: { icon: "person" } }),
                      _vm._v(
                        " \n                        " + _vm._s(vi.user.name)
                      )
                    ],
                    1
                  ),
                  _vm._v("\n                    ·\n                    "),
                  _c(
                    "span",
                    { staticClass: "badge badge-info" },
                    [
                      _c("b-icon", { attrs: { icon: "clock-history" } }),
                      _vm._v(
                        " \n                        " +
                          _vm._s(_vm.moment(vi.created_at).fromNow())
                      )
                    ],
                    1
                  )
                ])
              ])
            ]
          )
        })
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
    return _c("div", { staticClass: "section-title" }, [
      _c("h2", [_vm._v("Video")])
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