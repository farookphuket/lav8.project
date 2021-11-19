<template>
    <div class="row">
        <div class="col-lg-12">
            <form action="">
                <div class="form-group">
                    <input v-model="sForm.keyword" class="form-control" type="text" 
                    name="q" ref="q" @keyup.prevent="getSearch" 
                    placeholder="Search Song...">
                </div>
            </form>
        </div>
        
        <!-- search result START -->
        <div class="col-lg-12 mt-4 mb-4" v-show="isShowSearchResult">
            <div class="row">
                <div class="col-md-3" 
                v-for="se in search_result">
                    <div class="text-center">
                        <img class="responsive d-block mx-auto" 
                        style="max-height:220px;"
                        :src="se.song_cover" :alt="se.song_name">
                    </div>
                    <p class="text-center pt-2">
                        {{se.song_name}} - 
                        <span class="badge badge-info font-weight-bold">
                            <a href="" :title="moment(se.created_at)" 
                            class="text-white p-2">
                                {{moment(se.created_at).fromNow()}}
                            </a>
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <!-- search result END -->
    </div>
</template>
<script>
var moment = require('moment')
export default{
    name:"SongSearch",
             data(){
                 return{
                    search_result:'',
                    sForm:new Form({
                        keyword:''
                    }),
                    moment:moment,
                    isShowSearchResult:false
                 }
             },
methods:{
            getSearch(){
                this.isShowSearchResult = false
                let url = `/searchSong?search=${this.$refs.q.value}`
                if(this.sForm.keyword.length >= 2){
                    axios.get(url)
                        .then(res=>{
                            this.isShowSearchResult = true
                            this.search_result = res.data.song
                        })
                }
            },
        },
}
</script>
