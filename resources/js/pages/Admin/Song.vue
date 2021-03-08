<template>
    <div class="container-fluid">
        <h1>Song Admin</h1>
        <song-form :albums="albums" :editId="editId"
        :artists="artists" @getSongList="getSongList($event)"></song-form>
        <song-list :songList="songList" @getSongList="getSongList($event)"
        @songDel="songDel($event)" @songEdit="songEdit($event)" 
        @songShow="songShow($event)"></song-list>


        <b-modal title="Server Said : " centered ref="onOk" 
        @ok="closeBox" ok-only>
            <div v-html="res_status">{{res_status}}</div>
        </b-modal>
    </div>
</template>

<script>
import SongForm from './SongForm.vue'
import SongList from './SongList.vue'
export default{
    name:"AdminSong",

             components:{
             SongForm,
             SongList
             },
             data(){
                 return{
                    songList:[],
                    editId:0,
                    albums:[],
                    artists:[],
                    res_status:"",
                 }
             },
             mounted(){
                this.getSongList()
             },
methods:{
            getSongList(page){
                let url = ""
                    if(page){
                        url = page
                        this.$cookies.set("admin_song_old_page",url)
                    }
                    url = this.$cookies.get("admin_song_old_page")
                        if(!url){
                            url = `/admin/getSongList`
                        }
                    axios.get(url)
                    .then(res=>{
                    //console.log(res.data)
                    this.albums = res.data.albums
                    this.artists = res.data.artists
                    this.songList = res.data.songs
                            })
            },
            songEdit(id){
                this.editId = id
            },
            songDel(id){
                let url = `/admin/song/${id}`
                axios.delete(url)
                .then(res=>{
                   this.res_status = res.data.msg 
                   this.$refs["onOk"].show()
                        })
            },
            songShow(id){
                let url = `/admin/song/${id}`
                axios.get(url)
                .then(res=>{
                    console.log(res.data)
                    let rData = res.data.song
                    let url = rData.url
                    window.open(url,"_blank")
                        })
            },
            closeBox(){
                this.getSongList()
            },
        },

}
</script>
