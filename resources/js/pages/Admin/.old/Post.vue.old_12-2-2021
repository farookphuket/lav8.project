<template>

    <div class="container-fluid">
        <h1 class="text-center">
            Post admin using Vue
        </h1>
        <div v-html="msg">{{msg}}</div>
        <post-form :template="template"></post-form>
    </div>
</template>

<script>
import PostForm from './PostForm.vue'

export default{

    props:{
        template:{
            type: Array
        }
    },
    components:{
        PostForm,
    },
    data(){
        return{
            msg:'',

        }
    },

    mounted(){
        this.getWelcome()
    } 
    ,methods:{ 

        getWelcome(){
            this.msg = `
    <p>
    welcome to blog post this is the version 1.02 using vue so 
    all of the CRUD operation including pagination 
    will be done without page reload  
    </p>

            `;
        }
    }, 



} 



</script>
