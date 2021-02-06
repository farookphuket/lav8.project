<template>
    <div class="col-lg-12">
        <h1 class="text-center">
            Tags module is now on Vue 
        </h1>

        <tagform></tagform>
    </div>

</template>


<script>

import Tagform from './Tagform.vue'

export default{

    props:["tags"],
    components:{
        Tagform,
    },
    data(){
        return{
            tagData:[],
        }
    },

}


</script>
