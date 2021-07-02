<template>
    <div>
        <form action="" 
            @submit.prevent="submitSearch">
            <div class="form-group">
                <input v-model="sForm.search" 
                @keyup.prevent="xxform"
                @keyup.enter.prevent="submitSearch"
                placeholder="Search : หาอะไรไม่เจอ ก็ Search นะจ๊ะ"
                class="form-control" type="text" name="keywords">
            </div>
        </form>
        <search-list :result="searchResult" 
            @getURL="getURL($event)"
            v-show="canShow"></search-list>
    </div>
</template>

<script>
import SearchList from './SearchList.vue'
export default{
    name:"SearchForm",
    components:{
        SearchList,
    },
    data(){
        return{
            searchResult:[],
            canShow:false,
            sForm:new Form({
                search:'',
            }),
        }
    },
    methods:{
        submitSearch(){
            
           let url = `/getSearchResult`
            this.sForm.submit("post",url)
                .then((res)=>{
                    this.searchResult = res.result
                    if(Object.keys(this.searchResult).length >= 1){
                        this.canShow = true
                    }
                })
                .catch((err)=>{
                    this.searchResult = `<span class="alert alert-warning">
                        ${Object.values(err).join()}</span>`
                })
        },
        xxform(){
            this.searchResult = ''
        },

    },
}
</script>
