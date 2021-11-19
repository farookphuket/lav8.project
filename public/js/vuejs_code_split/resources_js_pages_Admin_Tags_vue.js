"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_Admin_Tags_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Admin/TagForm.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Admin/TagForm.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************/
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "TagForm",
  props: ["editId"],
  data: function data() {
    return {
      tag: "",
      saveId: 0,
      error: 0,
      showPreview: false,
      showLength: 0,
      res_status: ""
    };
  },
  watch: {
    editId: function editId(x) {
      this.getEditData(x);
    }
  },
  methods: {
    getEditData: function getEditData(id) {
      var _this = this;

      this.tagPreview();

      if (!id) {
        return;
      }

      var url = "/admin/tags/".concat(id);
      axios.get(url).then(function (res) {
        var fData = res.data.tag;
        _this.tag = fData.tag_name;
        _this.showLength = _this.tag.length;

        _this.$refs.tag.focus();

        _this.saveId = fData.id;
        _this.showPreview = true;
      }, function (err) {
        _this.error = 1;
      });
    },
    tagPreview: function tagPreview() {
      this.showLength = 0;
      this.showPreview = false;
      this.showLength = this.$refs.tag.value.length;

      if (this.showLength >= 1) {
        this.showPreview = true;
      }
    },
    tagSave: function tagSave(id) {
      var _this2 = this;

      var url = "";
      var data = {
        tag: this.tag
      };

      if (id) {
        url = "/admin/tags/".concat(id);
        axios.put(url, data).then(function (res) {
          _this2.error = 0;
          _this2.res_status = res.data.msg;
        }, function (err) {
          _this2.error = 1;
          _this2.res_status = "<span class=\"badge badge-danger\">\n                            ".concat(err.response.data.message, "</span>");
        });
      } else {
        url = "/admin/tags";
        axios.post(url, data).then(function (res) {
          _this2.error = 0;
          _this2.res_status = res.data.msg;
        }, function (err) {
          _this2.error = 1;
          _this2.res_status = "<span class=\"badge badge-danger\">\n                            ".concat(err.response.data.message, "</span>");
        });
      }

      setTimeout(function () {
        _this2.clearFormData();
      }, 2500);
    },
    clearFormData: function clearFormData() {
      var _this3 = this;

      if (this.error != 1) {
        this.saveId = 0;
        this.tag = "";
        this.res_status = "";
        this.showPreview = false;
      } else {
        return;
      }

      setTimeout(function () {
        _this3.$emit("getTags");
      }, 2500);
    },
    onCancel: function onCancel() {
      this.error = 0;
      this.clearFormData();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Admin/TagList.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Admin/TagList.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************/
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
  name: "TagList",
  props: ["tags"],
  data: function data() {
    return {
      moment: moment,
      tag_title: ''
    };
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Admin/Tags.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Admin/Tags.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TagForm_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TagForm.vue */ "./resources/js/pages/Admin/TagForm.vue");
/* harmony import */ var _TagList_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TagList.vue */ "./resources/js/pages/Admin/TagList.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  // props:["tags"],
  components: {
    TagForm: _TagForm_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    TagList: _TagList_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function data() {
    return {
      tags: [],
      editId: 0,
      res_status: '',
      error: 0
    };
  },
  mounted: function mounted() {
    this.getTags();
  },
  methods: {
    getTags: function getTags(page) {
      var _this = this;

      this.editId = 0;
      var url = '';

      if (page) {
        url = page;
        this.$cookies.set("old_admin_tag_page", url);
      }

      url = this.$cookies.get("old_admin_tag_page");

      if (!url) {
        url = "/admin/getTags";
      }

      axios.get(url).then(function (res) {
        _this.tags = res.data.tags;
      }, function (err) {
        console.log("Error code ".concat(err));
      });
    },
    goReadPost: function goReadPost(slug) {
      var url = "/admin/post/".concat(slug);
      location.href = url;
    },
    tagEdit: function tagEdit(id) {
      this.editId = id;
    },
    tagDelete: function tagDelete(id) {
      var _this2 = this;

      if (confirm("This will remove the id ".concat(id, " are you sure?")) == true) {
        var url = "/admin/tags/".concat(id);
        axios["delete"](url).then(function (res) {
          _this2.res_status = res.data.msg;
          _this2.error = 0;
        }, function (err) {
          _this2.error = 1;
          _this2.res_status = err.response.data.message;
        });
      } else {
        return;
      }

      setTimeout(function () {
        _this2.getTags();
      }, 2500);
    }
  }
});

/***/ }),

/***/ "./resources/js/pages/Admin/TagForm.vue":
/*!**********************************************!*\
  !*** ./resources/js/pages/Admin/TagForm.vue ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TagForm_vue_vue_type_template_id_2029b236___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TagForm.vue?vue&type=template&id=2029b236& */ "./resources/js/pages/Admin/TagForm.vue?vue&type=template&id=2029b236&");
/* harmony import */ var _TagForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TagForm.vue?vue&type=script&lang=js& */ "./resources/js/pages/Admin/TagForm.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TagForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TagForm_vue_vue_type_template_id_2029b236___WEBPACK_IMPORTED_MODULE_0__.render,
  _TagForm_vue_vue_type_template_id_2029b236___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Admin/TagForm.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Admin/TagList.vue":
/*!**********************************************!*\
  !*** ./resources/js/pages/Admin/TagList.vue ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TagList_vue_vue_type_template_id_23e44dbf___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TagList.vue?vue&type=template&id=23e44dbf& */ "./resources/js/pages/Admin/TagList.vue?vue&type=template&id=23e44dbf&");
/* harmony import */ var _TagList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TagList.vue?vue&type=script&lang=js& */ "./resources/js/pages/Admin/TagList.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TagList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TagList_vue_vue_type_template_id_23e44dbf___WEBPACK_IMPORTED_MODULE_0__.render,
  _TagList_vue_vue_type_template_id_23e44dbf___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Admin/TagList.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Admin/Tags.vue":
/*!*******************************************!*\
  !*** ./resources/js/pages/Admin/Tags.vue ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Tags_vue_vue_type_template_id_48445cc2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tags.vue?vue&type=template&id=48445cc2& */ "./resources/js/pages/Admin/Tags.vue?vue&type=template&id=48445cc2&");
/* harmony import */ var _Tags_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tags.vue?vue&type=script&lang=js& */ "./resources/js/pages/Admin/Tags.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Tags_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Tags_vue_vue_type_template_id_48445cc2___WEBPACK_IMPORTED_MODULE_0__.render,
  _Tags_vue_vue_type_template_id_48445cc2___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Admin/Tags.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Admin/TagForm.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./resources/js/pages/Admin/TagForm.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TagForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TagForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Admin/TagForm.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TagForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Admin/TagList.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./resources/js/pages/Admin/TagList.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TagList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TagList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Admin/TagList.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TagList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Admin/Tags.vue?vue&type=script&lang=js&":
/*!********************************************************************!*\
  !*** ./resources/js/pages/Admin/Tags.vue?vue&type=script&lang=js& ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tags_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Tags.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Admin/Tags.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tags_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Admin/TagForm.vue?vue&type=template&id=2029b236&":
/*!*****************************************************************************!*\
  !*** ./resources/js/pages/Admin/TagForm.vue?vue&type=template&id=2029b236& ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TagForm_vue_vue_type_template_id_2029b236___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TagForm_vue_vue_type_template_id_2029b236___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TagForm_vue_vue_type_template_id_2029b236___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TagForm.vue?vue&type=template&id=2029b236& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Admin/TagForm.vue?vue&type=template&id=2029b236&");


/***/ }),

/***/ "./resources/js/pages/Admin/TagList.vue?vue&type=template&id=23e44dbf&":
/*!*****************************************************************************!*\
  !*** ./resources/js/pages/Admin/TagList.vue?vue&type=template&id=23e44dbf& ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TagList_vue_vue_type_template_id_23e44dbf___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TagList_vue_vue_type_template_id_23e44dbf___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TagList_vue_vue_type_template_id_23e44dbf___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TagList.vue?vue&type=template&id=23e44dbf& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Admin/TagList.vue?vue&type=template&id=23e44dbf&");


/***/ }),

/***/ "./resources/js/pages/Admin/Tags.vue?vue&type=template&id=48445cc2&":
/*!**************************************************************************!*\
  !*** ./resources/js/pages/Admin/Tags.vue?vue&type=template&id=48445cc2& ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tags_vue_vue_type_template_id_48445cc2___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tags_vue_vue_type_template_id_48445cc2___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tags_vue_vue_type_template_id_48445cc2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Tags.vue?vue&type=template&id=48445cc2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Admin/Tags.vue?vue&type=template&id=48445cc2&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Admin/TagForm.vue?vue&type=template&id=2029b236&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Admin/TagForm.vue?vue&type=template&id=2029b236& ***!
  \********************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "container" }, [
    _c("div", { staticClass: "col-lg-12  mb-4" }, [
      _c(
        "form",
        [
          _c(
            "b-input-group",
            [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.tag,
                    expression: "tag"
                  }
                ],
                ref: "tag",
                staticClass: "form-control",
                attrs: { type: "text", placeholder: "create new tag" },
                domProps: { value: _vm.tag },
                on: {
                  keydown: function($event) {
                    if (
                      !$event.type.indexOf("key") &&
                      _vm._k($event.keyCode, "esc", 27, $event.key, [
                        "Esc",
                        "Escape"
                      ])
                    ) {
                      return null
                    }
                    $event.preventDefault()
                    return _vm.onCancel.apply(null, arguments)
                  },
                  keyup: _vm.tagPreview,
                  keypress: function($event) {
                    if (
                      !$event.type.indexOf("key") &&
                      _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                    ) {
                      return null
                    }
                    $event.preventDefault()
                    return _vm.tagSave(_vm.saveId)
                  },
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.tag = $event.target.value
                  }
                }
              }),
              _vm._v(" "),
              _c(
                "b-input-group-prepend",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.showPreview,
                      expression: "showPreview"
                    }
                  ],
                  attrs: { "is-text": "" }
                },
                [
                  _c(
                    "a",
                    {
                      attrs: { href: "" },
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          return _vm.clearFormData.apply(null, arguments)
                        }
                      }
                    },
                    [
                      _c("b-icon", {
                        attrs: { icon: "trash", variant: "danger" }
                      })
                    ],
                    1
                  )
                ]
              )
            ],
            1
          )
        ],
        1
      )
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "col-lg-12 pt-2 mb-2" }, [_vm._v(" ")]),
    _vm._v(" "),
    _c(
      "div",
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.showPreview == true,
            expression: "showPreview == true"
          }
        ],
        staticClass: "card card-body pt-2"
      },
      [
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col-md-4" }, [
            _c(
              "h3",
              { staticClass: "text-center" },
              [
                _c("b-icon", { attrs: { icon: "tags" } }),
                _vm._v(
                  "\n                    " +
                    _vm._s(_vm.tag) +
                    "\n                "
                )
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col-md-4" }, [
            _vm.showLength < 2
              ? _c("span", { staticClass: "badge badge-danger" }, [
                  _vm._v(
                    "\n                    " +
                      _vm._s(_vm.showLength) +
                      "\n                "
                  )
                ])
              : _vm.showLength <= 3
              ? _c("span", { staticClass: "badge badge-warning" }, [
                  _vm._v(
                    "\n                    " +
                      _vm._s(_vm.showLength) +
                      "\n                "
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.showLength >= 4
              ? _c("span", { staticClass: "badge badge-success" }, [
                  _vm._v(
                    "\n                    " +
                      _vm._s(_vm.showLength) +
                      "\n                "
                  )
                ])
              : _vm._e()
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col-md-4" }, [
            _vm.showLength > 3
              ? _c("div", { staticClass: "badge badge-info" }, [
                  _vm.res_status
                    ? _c(
                        "span",
                        { domProps: { innerHTML: _vm._s(_vm.res_status) } },
                        [
                          _vm._v(
                            "\n                        " +
                              _vm._s(_vm.res_status) +
                              "\n                    "
                          )
                        ]
                      )
                    : _c("span", [
                        _vm._v(
                          "\n                        hit enter to save\n                    "
                        )
                      ])
                ])
              : _c("div", { staticClass: "badge badge-warning" }, [
                  _vm._v("\n                    too short!\n                ")
                ])
          ])
        ])
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Admin/TagList.vue?vue&type=template&id=23e44dbf&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Admin/TagList.vue?vue&type=template&id=23e44dbf& ***!
  \********************************************************************************************************************************************************************************************************************/
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
      _vm._l(_vm.tags.data, function(ta) {
        return _c("div", [
          _c("h3", { staticClass: "text-center pt-2" }, [
            _vm._v("\n            " + _vm._s(ta.tag_name) + "\n        ")
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "clearfix" }, [
            _c("div", { staticClass: "float-right" }, [
              _c(
                "span",
                [
                  _c("b-icon", { attrs: { icon: "calenda2-day" } }),
                  _vm._v(
                    "\n                    " +
                      _vm._s(_vm.moment(ta.created_at)) +
                      "\n                "
                  )
                ],
                1
              ),
              _vm._v(" · \n                "),
              _c(
                "span",
                [
                  _c("b-icon", { attrs: { icon: "clock-history" } }),
                  _vm._v(
                    "\n                    " +
                      _vm._s(_vm.moment(ta.created_at).fromNow()) +
                      "\n                "
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "span",
                [
                  _c("b-icon", { attrs: { icon: "folder-symlink" } }),
                  _vm._v(
                    "\n                    " +
                      _vm._s(ta.posts.length) +
                      "\n                "
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "btn btn-outline-primary btn-sm",
                  on: {
                    click: function($event) {
                      $event.preventDefault()
                      return _vm.$emit("tagEdit", ta.id)
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
                      return _vm.$emit("tagDelete", ta.id)
                    }
                  }
                },
                [_c("b-icon", { attrs: { icon: "trash" } })],
                1
              )
            ])
          ]),
          _vm._v(" "),
          _c("div", [
            _c(
              "ul",
              _vm._l(ta.posts, function(po) {
                return _c("li", [
                  _c(
                    "span",
                    [
                      _c("b-icon", { attrs: { icon: "file-earmark-word" } }),
                      _vm._v(" "),
                      _c(
                        "a",
                        {
                          attrs: { href: "" },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              return _vm.$emit("goReadPost", po.slug)
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n\n                            " +
                              _vm._s(po.post_title) +
                              "\n                        "
                          )
                        ]
                      )
                    ],
                    1
                  )
                ])
              }),
              0
            )
          ]),
          _vm._v(" "),
          _c("hr", { staticClass: "pt-4 mb-2" })
        ])
      }),
      _vm._v(" "),
      _c("div", { staticClass: "col-lg-12 pt-2 mb-2" }, [_vm._v(" ")]),
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
                    _vm._v("\n                            showing from "),
                    _c("span", [_vm._v(_vm._s(_vm.tags.from))]),
                    _vm._v(" to \n                            "),
                    _c("span", [_vm._v(_vm._s(_vm.tags.to))]),
                    _vm._v(" of "),
                    _c("span", [_vm._v(_vm._s(_vm.tags.total))])
                  ])
                ]),
                _vm._v(" "),
                _vm._l(_vm.tags.links, function(li) {
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
                                return _vm.$emit("getTags", li.url)
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
                            staticClass: "page-link active disabled",
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
                    { staticClass: "page-link " },
                    [
                      _c("b-icon", { attrs: { icon: "book-half" } }),
                      _vm._v(
                        "\n                            " +
                          _vm._s(_vm.tags.current_page) +
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
      ])
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Admin/Tags.vue?vue&type=template&id=48445cc2&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Admin/Tags.vue?vue&type=template&id=48445cc2& ***!
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
  return _c(
    "div",
    { staticClass: "col-lg-12" },
    [
      _c("tag-form", {
        attrs: { editId: _vm.editId },
        on: {
          getTags: function($event) {
            return _vm.getTags($event)
          }
        }
      }),
      _vm._v(" "),
      _c("tag-list", {
        attrs: { tags: _vm.tags },
        on: {
          goReadPost: function($event) {
            return _vm.goReadPost($event)
          },
          getTags: function($event) {
            return _vm.getTags($event)
          },
          tagDelete: function($event) {
            return _vm.tagDelete($event)
          },
          tagEdit: function($event) {
            return _vm.tagEdit($event)
          }
        }
      }),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          ref: "onOk",
          attrs: { title: "response message", centered: "", "ok-only": "" }
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