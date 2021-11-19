<template>
    <div class="row">
        <!--form area START -->
            <div class="col-lg-12">
                <form action="">
                    <div class="form-group">
                        <input v-model="albSearchForm.keyword" 
                        class="form-control" type="text" name="keyword" 
                        ref="keyword" placeholder="Search Album..."
                        @keyup="searchAction">
                    </div>
                </form>
            </div>
        <!--form area END -->

        <!-- show search result area START -->
            <div class="col-md-4 mt-2" 
            v-show="isShowSearchResult"
            v-for="al in searchResult.data">
                <div class="text-center" 
                style="min-height:200px;">
                    <a href="" @click.prevent="$emit('setAlbum',al.id)">
                        <img class="responsive d-block mx-auto" 
                        style="max-height:250px;"
                        :src="al.album_cover" :alt="al.album_name">
                    </a>
                    <p class="text-center">{{al.album_name}}</p>
                </div>
            </div>

        <!-- show search result area END -->
        <!-- show select album id if update song START -->
        <div class="col-lg-4 mb-4" v-show="isSongEdit">
            <div class="text-center">
                <img class="d-block mx-auto" :src="album.album_cover" 
                :alt="album.album_name">
            </div>
            <p class="text-center text-success font-weight-bold">{{album.album_name}}</p>
        </div>
        <!-- show select album id if update song END -->

    </div>
</template>


<script>
export default{
    name:"AlbumSearch",
    props:["album_id"],
             data(){
                 return{
                    albSearchForm:new Form({
                        keyword:''
                    }),
                    searchResult:'',
                    isShowSearchResult:false,
                    isSongEdit:false,
                    album:'',
                 }
             },
watch:{
          "album_id":function(x){
              this.getAlbum(x)
          }
      },
            methods:{
                        searchAction(){
                            this.isShowSearchResult = false
                            let kb = this.$refs.keyword.value
                            let url = ''
                            // only if the search keyword is 3 letters or more
                            if(kb.length >= 3){

                                this.searchResult = []
                                url = `/api/album-search?q=${kb}`
                                axios.get(url)
                                .then(res=>{
                                    this.isShowSearchResult = true
                                    this.searchResult = res.data.search_result
                                        })
                            }

                        },
                        getAlbum(id){
                            this.isShowSearchResult = false
                            this.isSongEdit = false
                            let url = `/album/${id}`
                            if(id != 0){
                                axios.get(url)
                                .then(res=>{
                                    //console.log(res.data)
                                    this.isSongEdit = true
                                    this.album = res.data.album
                                    this.albSearchForm.reset()
                                    this.$refs.keyword.value = ''
                                })
                            }

                        },

                    },
}
</script>
