<template>
    <div class="container">
       <h2>search</h2>
       <search-form @getURL="getURL($event)"></search-form>

    </div>
</template>
<script>
import SearchForm from './SearchForm.vue'
import SearchList from './SearchList.vue'
export default{
    name:"PubSearch",
    components:{
        SearchForm,

    },
    data(){
        return{

        }
    },
    methods:{
        getURL({method,target_id,id}){
            let url = `/search/${id}?method=${method}&target_id=${target_id}`
            axios.get(url)
                .then(res=>{
                    console.log(res.data.msg)
                })
        },
    },
}
</script>
