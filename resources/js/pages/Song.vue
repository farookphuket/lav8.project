<template>
   <div class="container">
        <song-search @getSongList="getSongList($event)"></song-search>
        <song-list :songs="songs" @getSongList="getSongList($event)"></song-list>
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
                        this.$cookies.set("psong_old_page",url)
                    }
                    url = this.$cookies.get("psong_old_page")
                        if(!url){
                            url = "/getSongList"
                        }
                    axios.get(url)
                    .then(res=>{
                        let rData = res.data
                        this.songs = rData.songs
                       // console.log(rData)
                            })
            }
        }
}
</script>
