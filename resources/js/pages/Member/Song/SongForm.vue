<template>
    <div class="row">
        <!-- form area START -->


        <!-- b-modal area START -->
        <b-modal :title='mTitle' size='xl' 
        ref='floatList' ok-only>
            <div v-show="isShowAlbum">

                <album-list :album_id="album_id" 
                @setAlbum="setAlbum($event)"></album-list>
            </div>

            <div v-show="isShowArtist">

            <artist-list :artist_id="artist_id" 
            @setArtist="setArtist($event)" ></artist-list>
            </div>
        </b-modal>
        <!-- b-modal area END -->
       <div class="col-lg-12 mt-4">

            <b-tab title="Add or Edit my song" 
            name="edit_tab" :active="isActive">

                <!-- button select album,artist START --> 

                <div class="col-lg-12">
                    <div class="float-right btn-group mb-4">
                        <button class="btn btn-outline-primary" 
                        @click.prevent="floatWindow">select album</button>
                        <button class="btn btn-outline-primary" 
                        @click.prevent="floatWindow('artist')">select artist</button>
                    </div>
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="text-center" 
                            style="min-height:200px;" v-if="album_id != 0">
                                <img :src="album.album_cover" 
                                class="responsive d-block mx-auto"
                                style="max-height:220px;"
                                alt="">
                                <p>album : {{album.album_name}}</p>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="text-center" 
                               style="min-height:200px;" 
                                v-if="artist_id != 0">
                                <img class="responsive mx-auto d-block" 
                                style="max-height:220px;"
                                :src="artist.artist_cover" :alt="artist.artist_name">

                                <p class="text-center">
                                artist : {{artist.artist_name}}</p>
                            </div>
                        </div>
                    </div>
                    
                </div>


                <!-- button select album,artist START --> 

               <form action="" class="mt-4">
                    <!-- we have to sent artist id,album id via this form --> 
                    <input type="hidden" name="artist_id" 
                    v-model="sForm.artist_id">
                    <input type="hidden" name="album_id" 
                    v-model="sForm.album_id">
                    <!-- we have to sent artist id,album id via this form --> 
                    <div class="form-group">
                        <input v-model="sForm.song_name" class="form-control" type="text" 
                        name="song_name" placeholder="Enter song name">
                    </div>
                    <div class="form-group">
                        <input v-model="sForm.song_url" class="form-control" type="text" 
                        placeholder="Enter Song URL...(*required)"
                        name="song_url">
                    </div>

                    <div class="form-group">
                        <input v-model="sForm.song_posted_at" class="form-control" 
                        type="text" name="posted_at" 
                        placeholder="eg : 2021-10-28 10:24:21"
                        >
                    </div>
                    <!-- song cover START -->
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <input ref="song_cover_url" class="form-control" 
                                type="text" name="song_cover_url" 
                                @keydown.enter.prevent="onUrlChange"
                                placeholder="Enter the cover image url...">
                                <p class="text-center pt-2">
                                Enter the image url then hit enter to preview image.
                                </p>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group">
                                <input ref="song_cover_upload" class="form-control" 
                                type="file" name="song_cover" 
                                @change.prevent="onUploadChange">
                                <p class="pt-2 text-center">*if you choose file 
                                the image url will be remove.
                                </p>
                            </div>
                        </div>

                        <div class="col-md-6 col-lg-12">
                            <div class="text-center" v-show="isShowUploadPreview">
                                <img class="responsive mx-auto d-block" 
                                :src="photo.url" :alt="photo.alt" 
                                style="max-height:220px;">
                                <p class="pt-2">{{photo.alt}}</p>
                            </div>
                        </div>
                    </div>
                    <!-- song cover END -->
                   <!-- button,show status START --> 
                   <div class="row">
                       <div class="col-lg-8">
                            <span class="text-center font-weight-bold"
                            v-html="res_status">{{res_status}}</span>
                       </div>
                       <div class="col-lg-4">
                           <div class="float-right btn-group">
                                <button class="btn btn-outline-primary" 
                                type="submit" 
                                @click.prevent="saveSong(songId)">
                                    <b-icon icon="check2-square"></b-icon>
                                </button>
                                <button class="btn btn-outline-danger" 
                                @click.prevent="clearForm">
                                    <b-icon icon="x-octagon"></b-icon>
                                </button>
                           </div>
                       </div>
                   </div>
                   <!-- button,show status END --> 
               </form>


            </b-tab>


       </div>
        <!-- form area END -->
    </div>
</template>
<script>
import AlbumList from './AlbumList.vue'
import ArtistList from './ArtistList.vue'
export default{
    name:"SongForm",
             components:{
                 AlbumList,
                 ArtistList,
             },
             props:["editId"],
             data(){
                 return{
                     artist_id:0,
                     artist:'',
                     album:'',
                     album_id:0,
                     songId:0,
                    sForm:new Form({
                        artist_id:'',
                        album_id:'',
                        song_name:'',
                        song_cover:'',
                        song_url:'',
                        song_posted_at:'',
                        showInFloat:''

                    }),
                    photo:'',
                    upload_obj:{
                        file:null,
                         img:''
                    },
                    res_status:'',
                   mTitle:'',
                   isShowAlbum:false,
                   isShowArtist:false,
                   isShowUploadPreview:false,
                   isActive:false,
                 }
             },
watch:{
          "editId":function(x){
              this.getEditData(x)
          }
      },
methods:{
            onUploadChange(e){
                this.isShowUploadPreview = false 
                this.$refs.song_cover_url.value = ''

                const theFile = e.target.files[0]
                this.upload_obj.file = theFile
                this.upload_obj.img = URL.createObjectURL(theFile)

                // set form 
                this.sForm.song_cover = theFile 
                this.photo = {
                    url:this.upload_obj.img,
                    alt:this.upload_obj.file.name
                }
                this.isShowUploadPreview = true

            },
            onUrlChange(){
                this.isShowUploadPreview = false 
                this.$refs.song_cover_upload.value = ''

                this.sForm.song_cover = this.$refs.song_cover_url.value 
                this.photo = {
                    url:this.$refs.song_cover_url.value,
                    alt:this.sForm.song_name
                }
                this.isShowUploadPreview = true
            },

            clearForm(){
                setTimeout(()=>{
                    this.sForm.reset()
                    this.isShowUploadPreview = false 
                    this.album_id = 0
                    this.artist_id = 0
                    this.res_status = ''
                    this.$refs.song_cover_url.value = ''
                    this.$refs.song_cover_upload.value = ''
                        },3200)

            }, 
            floatWindow(cmd){
                this.isShowArtist = false
                this.isShowAlbum = false
                switch(cmd){
                    case"artist":
                        this.mTitle = 'show artist'
                        this.isShowArtist = true
                    break;
                    default:
                    this.isShowAlbum = true
                        this.mTitle = 'show album'
                    break;

                }
                this.$refs["floatList"].show()
            },
            setAlbum(id){
                this.$emit('showFloatStatus',{msg:'album has been set'})
                this.album_id = id 
                this.sForm.album_id = id
                let url = `/album/${id}`
                axios.get(url)
                .then(res=>{
                    this.album = res.data.album
                        })
            },
            setArtist(id){
                this.$emit('showFloatStatus',{msg:'artist has been set'})
                this.artist_id = id 
                this.sForm.artist_id = id
                let url = `/artist/${id}`
                axios.get(url)
                .then(res=>{
                    this.artist = res.data.artist
                        })
            },
            getEditData(x){
                if(x != 0){

                    this.isActive = true
                    let url = `/song/${x}/edit`
                    axios.get(url)
                    .then(res=>{
                        let rData = res.data.song
                        console.log(rData)

                        // 
                        this.album = rData.album
                        this.artist = rData.artist
                        //set album 
                        this.album.forEach((al)=>{
                            //console.log(al)
                            if(al.pivot.song_id == rData.id){
                                this.setAlbum(al.pivot.album_id)
                            }
                        })

                        // show the current artist
                        this.artist.forEach((ar)=>{
                            if(ar.pivot.song_id == rData.id){
                                this.setArtist(ar.pivot.artist_id)
                            }
                        })

                        // pop current edit data to form 
                        this.songId = rData.id 
                        this.sForm.song_name = rData.song_name
                        this.sForm.song_url = rData.song_url
                        this.sForm.album_id = this.album_id
                        this.sForm.artist_id = this.artist_id
                        this.sForm.song_cover = rData.song_cover
                        this.sForm.song_posted_at = rData.posted_at
                        this.isShowUploadPreview = true
                        this.photo = {
                            url:rData.song_cover,
                            alt:rData.song_name
                        }

                        
                    })
                }
            },
            saveSong(id){
                let url = `/member/song`
                let sData = new FormData()
                sData.append("song_name",this.sForm.song_name)
                sData.append("song_cover",this.sForm.song_cover)
                sData.append("song_url",this.sForm.song_url)
                sData.append("song_cover_url",this.$refs.song_cover_url.value)
                sData.append("album_id",this.sForm.album_id)
                sData.append("artist_id",this.sForm.artist_id)
                sData.append("posted_at",this.sForm.song_posted_at)
                    if(id){
                        url = `/member/song/${id}`
                        sData.append("_method","put")
                    }
                    axios.post(url,sData)
                        .then(res=>{
                            this.res_status = res.data.msg
                            this.clearForm()
                            this.$emit('getAllSong')
                                })
                    .catch((err)=>{
                        this.res_status = `<span class="text-danger">
                        ${Object.values(err.response.data.errors).join()}
                        </span>`
                        setTimeout(()=>{
                            this.res_status = ''
                                },9500)
                            })
            },
        },
}
</script>
