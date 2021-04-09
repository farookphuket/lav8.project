// import Homepage from '../pages/Homepage.vue'
// import About from '../pages/About.vue'
// import Contact from '../pages/Contact.vue'

import resetP from '../components/password-reset-form.vue'
import resetE from '../components/email-request-form.vue'

//import Memberinfo from '../components/member-profile-form.vue'
//
//import adminProfile from '../components/admin-profile-form.vue'

import PostList from '../pages/Admin/PostList.vue'


// test on 9 Apr 2021
import PostListByTag from '../pages/PostListByTag.vue'

// export default {
//     mode: 'history',
//     routes: [
//         {
//             path: '/',
//             name: 'home',
//             component: Homepage,
//         },
//         {
//             path: '/about',
//             name: 'about',
//             component: About,
//         },
//         {
//             path: '/contact',
//             name: 'contact',
//             component: Contact,
//         },
//     ]
// }


export default {
    mode: 'history',
    routes: [

        {
            path: '/forgot-password',
            name: 'resetE',
            component: resetE,
        },

        {
            path: '/passwordreset',
            name: 'resetP',
            component: resetP,
        },


        {
            path: '/posts',
            name: 'PostListByTag',
            component: PostListByTag,
        },

        {
            path: '/admin/post',
            name: 'PostList',
            component: PostList,
        },

    ]
}
