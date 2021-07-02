<template>
    <div class="container">
       <h2>search</h2>
       <search-form @getURL="getURL($event)"></search-form>

    </div>
</template>
<script>
import SearchForm from './SearchForm.vue'

export default{
    name:"PubSearch",
    components:{
        SearchForm,

    },
    methods:{
        getURL(method,id){
            let url = `/search?method=${method}&id=${id}`
            alert(url)
        },
    },
}
</script>
