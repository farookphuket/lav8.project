<template>
        <!-- <navbar></navbar> -->

        <!-- <div class="container"> -->
        <!--     <router-view></router-view> -->
        <!-- </div> -->

        <!-- <app-footer></app-footer> -->
        <resetE></resetE>

</template>

<script>
//    import Navbar from './Navbar'
 //   import Footer from './Footer'
 //  import resetpass from './password-reset-form.vue'
    import resetE from './email-request-form.vue'

    export default {
        name: 'App',
        components: {
            'resetE': resetE,
        }
    }
</script>
