
<template>
<div>
    <form>
        
        <div class="form-group">
            <input class="form-control" type="text" v-model="song"
            placeholder="Song title" ref="song">
        </div>
        
            <div class="form-group">
                <input class="form-control" type="text" v-model="cover"
                placeholder="The Album cover " ref="cover">
                <img class="responsive" :src="cover" alt="">
            </div>
            <div class="form-group">
                <input class="form-control" type="text" v-model="posted_at"
                placeholder="eg: 2021-03-20 12:05:00" ref="posted_at">
            </div>
            <div class="form-group">
                <input class="form-control" type="text" v-model="url"
                placeholder="The song url " ref="url">
            </div>


        <div class="row">
            <div class="col-lg-6">
                <div class="input-group ">
                    <div class="input-group-prepend">
                        <span class="input-group-text">
                            Album
                        </span>
                        <input  class="form-control" type="text" 
                        v-model="album">
                        <button class="btn btn-outline-warning" 
                        @click.prevent="makeAlbum">
                            Save {{album}} {{album_id}}?
                        </button>
                    </div>
                </div>

                <div class="form-group pt-2">
                    <select class="form-control" ref="getAlbum" 
                    multiple="true" @change="getTheAlbum">
                        <option value="">Album List</option>
                        <option :value="ab.id" v-for="ab in albums" 
                        >{{ab.name}}</option>
                    </select>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="input-group ">
                    <div class="input-group-prepend">
                        <span class="input-group-text">
                            Artist
                        </span>

                        <input class="form-control" type="text" v-model="artist"
                        
                        placeholder="Artist">
                    
                        <button class="btn btn-outline-secondary" @click.prevent="makeArtist">
                            Save {{artist}} ?
                        </button>

                    </div>
                </div>
                <div class="form-group pt-2">
                    <select class="form-control" ref="getArtist" 
                    multiple="true" @change="getTheArtist">
                        <option >The Artist</option>
                        <option v-for="ar in artists"
                        :value="ar.id">{{ar.name}}</option>
                    </select>
                </div>
            </div>
        </div>


        <div class="clearfix">
            <div class="float-right">
                <button class="btn btn-outline-primary"
                @click.prevent="saveSong(saveId)">
                    Save
                </button>

                <button class="btn btn-outline-danger"
                @click.prevent="clearForm">
                    clear
                </button>
            </div>
        </div>
    </form>
    <b-modal @ok="closeBox" title="Server Said : " ref="onOk" centered 
    ok-only>
        <div v-html="res_status">{{res_status}}</div>
    </b-modal>
</div>
</template>

<script>
var moment = require("moment")
export default{
    name:"SongForm",
    props:["editId","albums","artists"],
             data(){
                 return{
                 saveId:0,
                 album_id:0,
                 artist_id:0,
                 song:"",
                 artist:"",
                 album:"",
                 cover:'',
                 posted_at:'',
                 moment:moment,
                 url:'',
                 date_holder:new Date(),
                 fData:{},
                 fUrl:'',
                 res_status:"",
                 }
             },
             watch:{
                 "editId":function(x){
                   this.getEditData(x) 
                 } 
             },
methods:{
            getEditData(id){
                if(id ==0){
                    return
                }
                let url = `/admin/song/${id}`
                axios.get(url)
                .then(res=>{
                    //console.log(res.data.song)
                    let eData = res.data.song
                    this.saveId = eData.id
                    this.song = eData.name
                    this.$refs.song.focus()
                    this.album = eData.album.name
                    this.artist = eData.artist.name
                    this.cover = eData.cover
                    this.posted_at = this.moment(eData.posted_at)
                    this.url = eData.url
                        })
            },
            saveSong(id){
                this.fData = {
                    song:this.song,
                    artist:this.artist,
                    album:this.album,
                    cover:this.cover,
                    posted_at:this.posted_at,
                    url:this.url,
                }
                    if(id){
                        this.fUrl = `/admin/song/${id}`
                        axios.put(this.fUrl,this.fData)
                        .then(res=>{
                            //console.log(res.msg)
                            //this.$emit("getSongList")
                            this.res_status = res.data.msg
                            this.$refs["onOk"].show()
                                })
                    }else{
                        this.fUrl = `/admin/song`
                        axios.post(this.fUrl,this.fData)
                        .then(res=>{
                            //console.log(res.msg)
                            this.res_status = res.data.msg
                            this.$refs["onOk"].show()
                            //this.$emit("getSongList")
                                })
                    }
                    setTimeout(()=>{
                        this.clearForm()
                            },2000);
            },
            makeArtist(){
               let url  =  `/admin/makeArtist`
                axios.post(url,{artist:this.artist})
                .then(res=>{
                    this.$emit("getSongList")
                })
                setTimeout(()=>{
                    this.artist = ""
                    this.artist_id = 0
                },2000)
                
            },
            makeAlbum(){
                let url = `/admin/makeAlbum`
                axios.post(url,{album:this.album})
                .then(res=>{
                    this.$emit("getSongList")
                })
                setTimeout(()=>{
                    this.album = ""
                    this.album_id = 0
                },2000)

            },
            getTheArtist(){
               let ar_id = this.$refs.getArtist.value 
                   this.artists.forEach((val)=>{
                        if(val.id == ar_id){
                           this.artist = val.name
                           this.artist_id = val.id
                        }
                     })
               //alert(`the artist id is ${ar_id}`)
            },
            getTheAlbum(){
                let al_id = this.$refs.getAlbum.value
                this.albums.forEach((val)=>{
                    if(val.id == al_id){
                     //console.log(val.name)
                         this.album = val.name
                         this.album_id = val.id
                    }
                })
            },
            findArtist(){
                // save for later
            },
            clearForm(){
               this.album = ""
               this.artist = ""
               this.song = ""
               this.saveId = 0
               this.cover = ""
               this.url = ""
               this.posted_at = ""
            },
            closeBox(){
                this.$emit("getSongList")
            },
        }

}
</script>
