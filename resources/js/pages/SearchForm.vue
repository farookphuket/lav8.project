<template>
    <div>
        <form action="" 
            >
            <div class="form-group">
                <input v-model="sForm.search" 
                @keyup.prevent="submitSearch"
                placeholder="Search : หาอะไรไม่เจอก็ Search นะจ๊ะ"
                class="form-control" type="text" name="keywords">
            </div>
        </form>

    </div>
</template>

<script>

export default{
    name:"SearchForm",
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
            this.$emit('clearSearch')
           //console.log(Object.keys(this.sForm.search).length) 
            if(this.sForm.search.length >= 2){
                let url = `/getSearchResult`
                let data = {
                    keywords:this.sForm.search
                }
                axios.post(url,data)
                    .then(res=>{
                        //console.log(res.data)
                        this.searchResult = res.data.result
                        this.$emit('getSearchResult',this.searchResult)
                    })
            }
        },
        xxform(){
            this.searchResult = ''
        },


    },
}
</script>
