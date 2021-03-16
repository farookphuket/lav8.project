<template>
    <div>
        <song-search></song-search>
        <song-form :artists="artists" :albums="albums" 
        @getSongList="getSongList($event)" 
        :editId="editId" :songs="songs"></song-form>

        <song-list :songs="songs"   
        @getSongList="getSongList($event)" 
        @songEdit="songEdit($event)" @songDel="songDel($event)"></song-list>

        <b-modal title="Server Said :" ref="onOk" ok-only>
            <div v-html="res_status">
                {{res_status}}
            </div>
        </b-modal>
    </div>
</template>

<script>
import SongSearch from './SongSearch.vue'
import SongForm from './SongForm.vue'
import SongList from './SongList.vue'
export default{
    name:"Msong",
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
                    res_status:''
                 }
             },
             mounted(){
                 this.getSongList()
             },
methods:{
            getSongList(page){
                this.editId = 0
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
                            //console.log(res.data)
                            this.songs = res.data.songs
                            this.albums = res.data.albums
                            this.artists = res.data.artists
                        })
            },
            songEdit(id){
                this.editId = id
            },
            songDel(id){
                //alert(`will delete ${id}`)
                    if(confirm(`this will delete item ${id} are you sure?`)== true){
                        let url = `/member/song/${id}`
                        axios.delete(url)
                        .then(res=>{
                            this.res_status = res.data.msg
                            },err=>{
                                this.res_status = `<span class="badge badge-danger">
                                ${err.response.data.message}</span>`
                            })
                        this.$refs["onOk"].show()
                    }

                    setTimeout(()=>{
                    this.getSongList()
                            },2500)
            },
        }
}
</script>
