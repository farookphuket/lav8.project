<template>
    <div>
        <song-search></song-search>
        <song-form :artists="artists" :albums="albums" 
        :editId="editId"></song-form>
        <song-list :songs="songs"   
        @getSongList="getSongList($event)" 
        @songEdit="songEdit($event)" @songDel="songDel($event)"></song-list>
    </div>
</template>

<script>
import SongSearch from './SongSearch.vue'
import SongForm from './SongForm.vue'
import SongList from './SongList.vue'
export default{
    name:"Song",
             components:{
                SongList,
                SongForm,
                SongSearch
             },
             data(){
                 return{
                    songs:[],
                    albums:[],
                    artists:[],
                    editId:0,
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
                        this.$cookies.set("msong_old_page",url)
                    }
                url = this.$cookies.get("msong_old_page")
                    if(!url){
                        url = `/member/getSongList`
                    }

                axios.get(url)
                .then(res=>{
                            console.log(res.data)
                            this.songs = res.data.songs
                            this.albums = res.data.albums
                            this.artists = res.data.artists
                        })
            },
            songEdit(id){
                this.editId = id
            },
            songDel(id){
                alert(`will delete ${id}`)
            },
        }
}
</script>
