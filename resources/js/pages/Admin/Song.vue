<template>
    <div class="container-fluid">
        <h1>Song Admin</h1>
        <song-form :albums="albums" :editId="editId"
        :artists="artists" @getSongList="getSongList($event)"></song-form>
        <song-list :songList="songList" @getSongList="getSongList($event)"></song-list>
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
                    }
                    url = `/admin/getSongList`
                    axios.get(url)
                    .then(res=>{
                    //console.log(res.data)
                    this.albums = res.data.albums
                    this.artists = res.data.artists
                    this.songList = res.data.songs
                            })
            },
        },

}
</script>
