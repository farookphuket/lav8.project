<template>
    <div class="row">
       <div class="col-lg-12">

        <div v-if="showForm==true" class="mb-4">
            <div class="float-right">
                <button class="mb-4 btn btn-outline-danger" @click.prevent="showForm=false">
                   close 
                </button>
            </div>


           <div class="mb-4"><!-- form div -->
 
            <div class="form-group">
                <input v-model="song" ref="song"
                class="form-control" type="text" 
                placeholder="Song title">
            </div>


            <div class="form-group">
                <input v-model="url" class="form-control" type="text" 
                placeholder="url of song">
            </div>


            <div class="form-group">
                <input v-model="cover" class="form-control" type="text" 
                placeholder="cover image url">
                <div class="col-lg-3">
                    <img class="responsive" :src="cover" alt="">
                </div>
            </div>

                <div class="row">
                    <div class="col-lg-6">
                        <div class="form-group">
                            <input class="form-control" type="text" 
                            v-model="artist" placeholder="Artist">
                            <button class="btn btn-outline-primary" 
                            @click.prevent="saveArtist">
                                Save Artist
                            </button>
                        </div>
                        <div class="form-group">
                            <select class="form-control" 
                            @click.prevent="getArtist" 
                            ref="artist" multiple="true">
                                <option value="">Artist</option>
                                <option :value="ar.id"
                                v-for="ar in artists">{{ar.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <input class="form-control " type="text" 
                            v-model="album" placeholder="Album">
                            <button class="btn btn-outline-primary" 
                            @click.prevent="saveAlbum">
                                Save Album
                            </button>
                        </div>
                        <div class="form-group">
                            <select class="form-control pt-2" multiple="true" 
                            ref="album" @click.prevent="getAlbum">
                                <option value="">Album</option>
                                <option :value="al.id" v-for="al in albums">{{al.name}}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="clearfix">
                    <div class="float-right">
                        <button class="btn btn-outline-primary" 
                        @click.prevent="save(saveId)">
                            Save
                        </button>

                        <button class="btn btn-outline-warning" 
                        @click.prevent="clearForm">
                            clear
                        </button>
                    </div>
                </div>
           </div><!-- form div -->



        </div>

        <div class="mb-4" v-else>
            <div class="float-right">

                <button class="mb-4 btn btn-outline-info" @click.prevent="showForm=true">
                    Add my song
                </button>
            </div>
        </div>
       </div><!-- end of div.col-lg-12 -->

        <b-modal title="server said :" ref="onOk" ok-only>
            <div v-html="res_status">
                {{res_status}}
            </div>
        </b-modal>
    </div>
</template>

<script>
export default{
    name:"SongForm",
    props:["editId","artists","albums","songs"],
             data(){
                 return{
                     showForm:false,
                     song:"",
                     cover:"",
                     url:"",
                     artist:"",
                     album:"",
                     saveId:0,
                     error:0,
                     formData:{},
                    res_status:''
                 }
             },
watch:{
          "editId":function(x){
              this.getEditData(x)
          }
      },
methods:{
            getEditData(id){
                //console.log(`the edit id ${id}`)
                if(id == 0){
                    return
                }
                    this.showForm = true

                        this.$nextTick(function(){
                            this.$refs.song.focus()
                                });
                    this.songs.data.forEach((val)=>{
                            if(val.id == id){
                               this.song = val.name
                               this.url = val.url
                               this.cover = val.cover
                               this.album = val.album.name
                               this.artist = val.artist.name
                               this.saveId = val.id
                                //console.log(val.artist.name)
                            }
                            })
            },
            getArtist(){
                let ar = this.$refs.artist.value
                //alert(`click ${ar}`)
                this.artists.forEach((val)=>{
                        if(val.id == ar){
                            this.artist = val.name
                        }
                })
            },
            getAlbum(){
                let al = this.$refs.album.value
                    this.albums.forEach((val)=>{
                            if(val.id == al){
                                this.album = val.name 
                            }
                            })
            },
            save(id){
                let s_url = ''
                this.formData = {
                    artist:this.artist,
                    album:this.album,
                    song:this.song,
                    cover:this.cover,
                    url:this.url
                } 
                if(id){
                   s_url = `/member/song/${id}` 
                   axios.put(s_url,this.formData)
                   .then(res=>{
                        this.res_status = res.data.msg 
                        this.error = 0
                        },err=>{
                            this.res_status = `<span 
                            class="badge badge-danger">Error : 
                            ${err.response.data.message}
                            </span>`
                            this.error = 1
                        })
                }else{
                    s_url = `/member/song`
                    axios.post(s_url,this.formData)
                    .then(res=>{
                        this.res_status = res.data.msg 
                        this.error = 0
                        },err=>{
                            this.res_status = `<span 
                            class="badge badge-danger">Error : 
                            ${err.response.data.message}
                            </span>`
                            this.error = 1;         
                        })
                    
                }
                
                this.$refs["onOk"].show()
                    setTimeout(()=>{
                    this.clearForm()
                    this.$emit('getSongList')
                            },200)
            },
            saveAlbum(){
                let url = `/album`
                axios.post(url,{album:this.album})
                .then(res=>{
                    //console.log(res.data)
                })
            },
            saveArtist(){
                let url = `/artist`
                axios.post(url,{artist:this.artist})
                .then(res=>{
                //console.log(res.data)
                        })
            },
            clearForm(){
                this.song = ""
                this.saveId = 0 
                this.cover = ""
                this.url = ""
                this.artist = ""
                this.album = ""
                
            },
        }
}
</script>
