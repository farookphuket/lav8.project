<template>
<div>
        

        <div class="row">
            <!-- album form -->
            <div class="col-lg-6">
                <!-- button float right START -->
                    <div class="clearfix">
                        <div class="float-right mb-4">
                            <button class="btn btn-outline-info" 
                            @click.prevent="floatWindow('album')">
                                view all album
                            </button>
                            <button class="btn btn-outline-info"
                            @click="isSearchAlbum = false" v-if="isSearchAlbum != false">
                                <b-icon icon="pen"></b-icon>
                                Add Album
                            </button>
                            <button class="btn btn-outline-info"
                            @click="isSearchAlbum = true" v-else>
                                <b-icon icon="x-circle"></b-icon>
                                Search Album
                            </button>
                        </div>
                    </div>
                <!-- button float right END -->
                <album-form v-if="isSearchAlbum == false" 
                :isSearchAlbum="isSearchAlbum" 
                @isCancelAddAlbum="isCancelAddAlbum"></album-form>
                <album-search 
                @setAlbum="setAlbum($event)" 
                :album_id="album_id"
                v-else></album-search>



            </div>
            <!-- album form -->

            <!-- artist Form START -->
            <div class="col-lg-6">
                <div class="clearfix">
                    <div class="float-right mb-4">
                        <button class="btn btn-outline-info" 
                        @click.prevent="floatWindow('artist')">
                            view all artist 
                        </button>
                        <button class="btn btn-outline-info" 
                        v-if="isSearchArtist == false" 
                        @click="isSearchArtist = true">
                            <b-icon icon="pen"></b-icon>
                            Search Artist
                        </button>
                        <button class="btn btn-outline-info" 
                        @click="isSearchArtist = false"
                        v-else>
                            <b-icon icon="pen"></b-icon>
                            Add Artist
                        </button>
                    </div>
                </div>
                <artist-search 
                @setArtist="setArtist($event)" :artist_id="artist_id"
                v-if="isSearchArtist != false"></artist-search>

                <artist-form :isSearchArtist="isSearchArtist" 
                @isCancelAddArtist="isCancelAddArtist($event)" 
                v-else></artist-form>     
            </div>
            <!-- artist Form END  -->
            <!-- show the list of album,artis in the float window START -->
            <div class="col-lg-12">
                <b-modal :title="modalTitle" size="xl"
                ref="showFloatWindow" ok-only>

                    <div v-show="isArtistList">
                        <artist-list @setArtist="setArtist($event)"></artist-list>    
                    </div>
                    <div v-show="isAlbumList">
                        <album-list @setAlbum="setAlbum($event)"></album-list>
                    </div>
                </b-modal>
            </div>
            <!-- show the list of album,artis in the float window END -->


            <!-- song Form START -->

            <div class="col-lg-12">
                
                <song-search ></song-search>
                <form action="">

                    <!-- input hidden artist_idlbum_id --> 
                    <input type="hidden" name="album_id" v-model="songForm.album_id">
                    <input type="hidden" name="artist_id" v-model="songForm.artist_id">
                    <!-- input hidden artist_idlbum_id --> 
                    <!-- song title -->
                    <div class="form-group">
                        <input 
                        v-model="songForm.song_name" class="form-control" 
                        type="text" name="song_name" 
                        placeholder="Enter song title..."
                        >
                    </div>

                    <!-- song title -->
                    <!-- song posted at START -->
                    <div class="form-group">
                        <input v-model="songForm.song_posted_at" 
                        class="form-control" type="text" 
                        name="posted_at" 
                        placeholder="eg : 2021-10-20 18:06:46">
                    </div>
                    <!-- song posted at START -->
                    <!-- song url START -->
                    <div class="form-group">
                        <input v-model="songForm.song_url" class="form-control" type="text" name="song_url" 
                        placeholder="Enter the song url...">
                    </div>
                    <!-- song url END -->
                    <!-- song cover START -->
                    <div class="form-group">
                        <input ref="song_cover_url" class="form-control" 
                        type="text" name="song_cover_url"
                        @keydown.enter.prevent="previewImageUrl"
                        placeholder="Enter song cover (not require)">
                        <p>*hit enter to preview image</p>
                    </div>
                    <!-- song cover END -->
                    <!-- upload song cover START -->
                    <div class="form-group">
                        <input @change.prevent="showImagePreview" type="file" 
                        ref="song_cover_upload"
                        name="song_cover">
                    </div>
                    <!-- upload song cover END -->
                    <!-- song cover preview START -->
                    <div class="col-lg-12">
                        <span class="text-center" 
                        style="max-width:250px;" v-show="isShowPreview">
                            <img class="responsive d-block" 
                            style="max-height:250px;"
                            :src="photo.url" :alt="photo.alt">
                        </span>
                    </div>
                    <!-- song cover preview End -->

                    <div class="row">
                        <div class="col-lg-8">
                            <span class="text-center font-weight-bold" 
                            v-html="res_status">{{res_status}}</span>
                        </div>

                        <!-- button START -->
                        <div class="col-lg-4">
                            <div class="btn-group float-right">
                                <button class="btn btn-outline-info" 
                                type="submit" @click.prevent="saveSong(songId)">
                                    <b-icon icon="pen"></b-icon>
                                </button>
                                <button class="btn btn-outline-danger" 
                                @click.prevent="clearForm"
                                >
                                    <b-icon icon="x-circle"></b-icon>
                                </button>
                            </div>
                        </div>
                        <!-- button END -->
                    </div>
                </form>
            </div>
            <!-- song Form START -->

        </div>

</div>
</template>

<script>
var moment = require("moment")

import AlbumForm from './AlbumForm.vue'
import AlbumSearch from './AlbumSearch.vue'
import ArtistForm from './ArtistForm.vue'
import ArtistSearch from './ArtistSearch.vue'
import SongSearch from './SongSearch.vue'
import AlbumList from './AlbumList.vue'
import ArtistList from './ArtistList.vue'
export default{
    name:"SongForm",
             components:{
                 AlbumForm,
                 AlbumSearch,
                 ArtistForm,
                 ArtistSearch,
                 SongSearch,
                 AlbumList,
                 ArtistList,
             },
    props:["editId"],
             data(){
                 return{
                    isSearchAlbum:true,
                    isSearchArtist:true,
                    isSearchSong:false,
                    songSearchResultMatch:0,
                    isShowPreview:false,
                    photo:'',
                    upload_obj:{
                        file:null,
                        img:''
                    },
                    songId:0,
                    album_id:0,
                    artist_id:0,
                    songForm:new Form({
                        album_id:'',
                        artist_id:'',
                        song_name:'',
                        song_cover:'',
                        song_cover_url:'',
                        song_url:'',
                        song_posted_at:''
                    }),
                    modalTitle:'',
                    isArtistList:false,
                    isAlbumList:false,
                    res_status:'',
                 }
             },
             watch:{
                 "editId":function(x){
                   this.getEditData(x) 
                 } 
             },
methods:{
            getEditData(id){
                if(id != 0){
                    let url = `/song/${id}/edit`
                    axios.get(url)
                    .then(res=>{
                        //console.log(res.data)
                        let rData = res.data.song
                        let ab = rData.album
                        let ar = rData.artist
                        this.songForm.song_name = rData.song_name
                        this.songForm.song_cover = rData.song_cover
                        this.songForm.song_url = rData.song_url
                        this.songForm.song_posted_at = rData.posted_at
                        this.isShowPreview = true
                        this.songId = rData.id
                        this.photo = {
                            url:rData.song_cover,
                            alt:rData.song_name
                        }
                        // album
                        ab.forEach((alb)=>{
                            //console.log(alb)
                            this.album_id = alb.pivot.album_id
                            this.songForm.album_id = alb.pivot.album_id
                        })

                        // artist 
                        ar.forEach((art)=>{
                            this.artist_id = art.pivot.artist_id
                            this.songForm.artist_id = art.pivot.artist_id
                                })

                    })
                }
                

            },
            saveSong(id){

                let url = `/admin/song`
                let sData = new FormData() 
               sData.append('song_name',this.songForm.song_name)
                sData.append('song_cover',this.songForm.song_cover)
                sData.append('song_cover_url',this.$refs.song_cover_url.value)
                sData.append('song_url',this.songForm.song_url)
                sData.append('posted_at',this.songForm.song_posted_at)
                sData.append('artist_id',this.songForm.artist_id)
                sData.append('album_id',this.songForm.album_id)
               if(id){
                   url = `/admin/song/${id}`
                   sData.append('_method','put')
               }
               axios.post(url,sData)
                   .then(res=>{
                       this.res_status = res.data.msg
                       this.$emit('floatStatus',{msg:res.data.msg})
                       this.clearForm()
                           })
               .catch((err)=>{
                   let msg = `<span class="text-danger">
                    ${Object.values(err.response.data.errors).join()}
                   </span>`
                   this.res_status = msg
                   
                   this.$emit('floatStatus',{msg:msg,false_status:true})
                       })
               setTimeout(()=>{
                   this.res_status = ''
                       },4500)
            },
            
            clearForm(){

                setTimeout(()=>{
                    this.songForm.reset()
                    this.isSearchAlbum = true 
                    this.isSearchArtist = true
                    this.isShowPreview = false
                    this.album_id = 0
                    this.artist_id = 0
                    this.$refs.song_cover_url.value = ''
                    this.$emit('getSongList')
                    this.songId = 0
                },1200)
            },
            closeBox(){
                this.$emit("getSongList")
            },
            showImagePreview(e){
                this.isShowPreview = true
                this.$refs.song_cover_url.value = ''
                const theFile = e.target.files[0]
                this.upload_obj.file = theFile 
                this.upload_obj.img = URL.createObjectURL(theFile)

                this.photo = {
                    url:this.upload_obj.img,
                    alt:this.upload_obj.file.name
                }
                this.songForm.song_cover = theFile
            },
            previewImageUrl(){
               this.$refs.song_cover_upload.value = ''
               this.isShowPreview = true
               this.photo = {
                   url:this.$refs.song_cover_url.value,
                   alt:this.songForm.song_name
               }
               this.songForm.song_cover = this.$refs.song_cover_url.value
            },
            isCancelAddAlbum(isCancel){
                this.isSearchAlbum = isCancel
            },
            isCancelAddArtist(isCancel){
                this.isSearchArtist = isCancel
            },
            setArtist(id){
                this.songForm.artist_id = id
                this.artist_id = id
                //console.log(`id ${this.songForm.artist_id}`)
            },
            setAlbum(id){
                this.songForm.album_id = id 
                this.album_id = id
            },
            floatWindow(cmd){
                this.isArtistList = false 
                this.isAlbumList = false
                this.modalTitle = ""

                switch(cmd){
                    case"artist":
                        // fetch data from artist model
                        this.isArtistList = true
                        this.modalTitle = "Select the Artist"

                    break;
                    default:
                        this.isAlbumList = true
                        // will fetch data from album model
                        this.modalTitle = "Select the Album"

                    break;
                }

                this.$refs["showFloatWindow"].show()
            },
        }

}
</script>
