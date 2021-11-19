<template>
    <div class="container">
        <div>
            <form action="">
                <input v-model="arSearchForm.q" class="form-control" 
                type="text" name="q" @keyup.prevent="artistSearch" ref="keyword"
                placeholder="Search Artist...">
            </form>
        </div>
        <div class="row">
            <div class="col-md-4" 
            v-for="ar in artistSearchResult.data" 
            v-show="isShowSearchResult"
            >
                <div class="text-center mt-4 mb-2" 
                style="max-height:200px;">
                    <a href="" 
                    @click.prevent="$emit('setArtist',ar.id)">
                        <img class="responsive d-block mx-auto" 
                        style="max-height:180px;min-height:150px;"
                        :src="ar.artist_cover" :alt="ar.artist_name">
                    </a>
                    <p class="text-center">{{ar.artist_name}}</p>
                </div>
            </div>

            <!-- show single artist START -->
            <div class="col-md-4 mb-4 mt-4" v-show="isSongEdit">
                <div class="text-center">
                    <img class="responsive d-block mx-auto" 
                    :src="ar.artist_cover" :alt="ar.artist_name">
                </div>
                <p class="text-center font-weight-bold text-success">
                    {{ar.artist_name}}
                </p>
            </div>
            <!-- show single artist END -->

        </div>

    </div>
</template>
<script>
export default{
    name:"SearchArtist",
    props:["artist_id"],
     data(){
         return{
            artistSearchResult:'',
            arSearchForm: new Form({
                q:''
                    }),
                    ar:'',
                    isSongEdit:false,
                    isShowSearchResult:false,
         }
     },
watch:{
          "artist_id":function(x){
              this.getArtist(x)
          },
      },
methods:{
            artistSearch(){
                this.isShowSearchResult = false
                this.artistSearchResult = ''
                let keylookup = this.$refs.keyword.value
                let url = `/artistsearch?q=${keylookup}`
                if(keylookup.length >= 2){

                    axios.get(url)
                    .then(res=>{
                        this.artistSearchResult = res.data.search_result
                        this.isShowSearchResult = true
                            })
                }

            },
            getArtist(id){
                this.isShowSearchResult = false
                this.isSongEdit = false
                let url = `/artist/${id}`

                if(id != 0){
                    axios.get(url)
                    .then(res=>{
                        this.ar = res.data.artist
                        this.isSongEdit = true
                        this.arSearchForm.reset() 
                        //console.log(this.ar)
                    })
                }

            },
        },
}
</script>
