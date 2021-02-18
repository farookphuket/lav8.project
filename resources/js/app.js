window.$ = window.jQuery = require('jquery');
window.Popper = require('popper.js').default;
require('./bootstrap');


window.Vue = require('vue');


import moment from 'moment';


//import 'jodit/build/jodit.min.css'

import Vue from 'vue'

// date 10 Jan 2021 start using vue-cookies
import VueCookies from 'vue-cookies';
Vue.use(VueCookies)



//  date 7 Jan 2021 using bootstrap-vue
import { BootstrapVue, IconsPlugin  } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
 import 'bootstrap/dist/css/bootstrap.css'
 import 'bootstrap-vue/dist/bootstrap-vue.css'
//
// // Make BootstrapVue available throughout your project
 Vue.use(BootstrapVue)
// // Optionally install the BootstrapVue icon components plugin
 Vue.use(IconsPlugin)

//  End date 7 Jan 2021


import JoditVue from 'jodit-vue'
Vue.use(JoditVue)


//  cannot get the line number in code still
//import hljs from 'highlight.js';
//import 'highlight.js/styles/github.css'
//window.hljs = hljs;



//Vue.component('Visitors',require( './components/visitors.vue').default);
Vue.component('Visitors',()=>import( './components/visitors.vue'));
Vue.component('LoginForm',()=>import( './components/LoginForm.vue'));


//Vue.component('resetpass',require('./components/password-reset-form.vue').default);
Vue.component('EmailReq',()=>import('./components/email-request-form.vue'));
Vue.component('PassReset',()=>import('./components/password-reset-form.vue'));


//Vue.component('Whatnews',require('./pages/Member/Whatnews.vue').default);
Vue.component('WhatnewsMember',()=>import('./pages/Member/WhatNews.vue'));
//Vue.component('Postmember',require('./pages/Member/Post.vue').default);
Vue.component('Postmember',()=>import('./pages/Member/Post.vue'));
Vue.component('CommentMember',()=>import('./pages/Member/Comment.vue'));
Vue.component('TagWithPostList',()=>import('./pages/Member/TagWithPostList.vue'));


//Vue.component('Adminwm',require('./pages/Admin/Whatnews.vue').default);
Vue.component('Adminwm',()=>import('./pages/Admin/Whatnews.vue'));


//Vue.component('Admintemplate',require('./pages/Admin/Template.vue').default);
Vue.component('AdminTemplate',()=>import('./pages/Admin/Template.vue'));


//Vue.component('Admintag',require('./pages/Admin/Tags.vue').default);
Vue.component('Admintag',()=>import('./pages/Admin/Tags.vue'));


//Vue.component('Adminpost',require('./pages/Admin/Post.vue').default);
Vue.component('Adminpost',()=>import('./pages/Admin/Post.vue'));
Vue.component('AdminPostComments',()=>import('./pages/Admin/PostComments.vue'));
Vue.component('AdminAbout',()=>import('./pages/Admin/AdminAbout.vue'));
Vue.component('ManageUser',()=>import('./pages/Admin/Users.vue'));


//Vue.component('Admintaglist',require('./pages/Admin/ShowTagList.vue').default);
Vue.component('Admintaglist',()=>import('./pages/Admin/ShowTagList.vue'));



//Vue.component('Memberinfo',require('./components/member-profile-form.vue').default);
Vue.component('MemberProfile',()=>import('./pages/Member/MemberProfile.vue'));

//Vue.component('adminprofile',require('./components/admin-profile-form.vue').default);
Vue.component('AdminProfile',()=>import('./pages/Admin/AdminProfile.vue'));


Vue.component('Avisitor',()=>import('./pages/Admin/Visitors.vue'))
//import VueRouter from 'vue-router'
//Vue.use(VueRouter)
//import routes from './routes'
//
//import App from './components/App.vue'


const {default : Axios } = require('axios');

 const app = new Vue({
     el : '#app'

 });


//const app = new Vue({
//    el : '#app',
//    components: { 
//        App 
//    },
//    router: new VueRouter(routes)
//
//});
