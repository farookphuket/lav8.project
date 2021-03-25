<template>
    <div>
        <h1 class="text-center">
Photo list file
        </h1>
    </div><!-- end of main div -->
</template>


<script>
var moment = require('moment')

export default{
    name:"PhotoList",
             data(){
                 return{
                    moment:moment
                 }
             }
}
</script>
