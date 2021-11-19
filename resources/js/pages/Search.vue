<template>
    <div class="container">
       <h2>search</h2>
       <search-form @getSearchResult="getSearchResult($event)" 
           @clearSearch="clearSearch($event)"></search-form>

       <search-list :result="searchResult" 
           @getURL="getURL($event)"></search-list>
    </div>
</template>
<script>
import SearchForm from './SearchForm.vue'
import SearchList from './SearchList.vue'
export default{
    name:"PubSearch",
    components:{
        SearchForm,
        SearchList,
    },
    data(){
        return{
            searchResult:'',
        }
    },
    methods:{
        getURL({method,target_id,id}){
            let url = `/search/${id}?method=${method}&target_id=${target_id}`
            axios.get(url)
                .then(res=>{
                    console.log(res.data.msg)
                    location.href = res.data.url
                })
        },
        getSearchResult(res){
            this.searchResult = res
        },
        clearSearch(){
            this.searchResult = ''
        },
    },
}
</script>
