<template>
    <div class="container-fluid">
        <h1>Song Admin</h1>
        <song-form></song-form>
        <song-list></song-list>
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
                    console.log(res.data)
                            })
            },
        },

}
</script>
