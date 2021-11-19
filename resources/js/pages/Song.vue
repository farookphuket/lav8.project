<template>
   <div class="container">
        <song-search @getSongList="getSongList($event)"></song-search>
        <song-list :songs="songs" @getSongList="getSongList($event)" 
        @openSong="openSong($event)" 
        :isShowPagination="isShowPagination"></song-list>
   </div>
</template>

<script>
import SongSearch from './SongSearch.vue'
import SongList from './SongList.vue'
export default{
    name:"Song",
             components:{
                 SongList,
                 SongSearch
             },
             data(){
                 return{
                    songs:[],
                    albums:[],
                    artists:[],
                    isShowPagination:false,
                 }
             },
             mounted(){
                this.getSongList()
             },
methods:{
            getSongList(page){
                this.isShowPagination = false
                let url = ""
                    if(page){
                        url = page
                        this.$cookies.set("psong_old_page",url)
                    }
                    url = this.$cookies.get("psong_old_page")
                        if(!url){
                            url = "/getsong"
                        }
                    axios.get(url)
                    .then(res=>{
                        let rData = res.data
                        this.songs = rData.songs
                        if(Object.keys(rData.songs.data).length >= this.songs.per_page) this.isShowPagination = true
                        //console.log(rData.songs.data.length)
                        //console.log(`per page ${rData.songs.per_page}`)
                            })
            },
            openSong(id){
                let url = `/song/${id}`
                axios.get(url)
                .then(res=>{
                    window.open(res.data.url,"_blank")
                        })
                setTimeout(()=>{
                    this.getSongList()
                        },2500)
            },
        }
}
</script>
