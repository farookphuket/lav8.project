<template>
    <div class="container-fluid">
        <div v-html="isFloatStatus" v-show="isShowFloatStatusText"
        class="float_status text-center font-weight-bold text-uppercase">
            {{isFloatStatus}}
        </div>
        <h1>Song Admin</h1>
        <song-form  :editId="editId"

         @getSongList="getSongList($event)" 
        @floatStatus="floatStatus($event)"></song-form>

        <p class="pt-4">&nbsp;</p>
        <song-list :songList="songList" @getSongList="getSongList($event)"
        @songDel="songDel($event)" @songEdit="songEdit($event)" 
        @songShow="songShow($event)" :showPagination="showPagination"></song-list>


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
                    showPagination:false,
                    isFloatStatus:'',
                    isShowFloatStatusText:false,
                 }
             },
             mounted(){
                this.getSongList()
             },
methods:{
            getSongList(page){
                this.editId = 0
                this.showPagination = false 
                this.res_status = ''

                let url = ""
                    if(page){
                        url = page
                        this.$cookies.set("admin_song_old_page",url)
                    }
                    url = this.$cookies.get("admin_song_old_page")
                        if(!url){
                            url = `/getsong`
                        }
                    axios.get(url)
                    .then(res=>{
                    //console.log(res.data.songs)
                    this.songList = res.data.songs
                            })
            },
            songEdit(id){
                this.editId = id
                
            },
            sentAlbumId(id){
                this.album_id = id
            },
            songDel(id){
                let url = `/admin/song/${id}`
                axios.delete(url)
                .then(res=>{
                   this.res_status = res.data.msg 
                   this.$refs["onOk"].show()
                        })
                setTimeout(()=>{this.getSongList()},3200)
            },
            songShow(id){
                let url = `/song/${id}`
                axios.get(url)
                .then(res=>{
                   // console.log(res.data)
                    window.open(res.data.url,"_blank")
                        })
                setTimeout(()=>{this.getSongList()},3200)
            },
            closeBox(){
                this.getSongList()
            },
            floatStatus({msg,false_status}){
                this.isShowFloatStatusText = true
                this.isFloatStatus = msg
                if(false_status != 1){
                    setTimeout(()=>{
                        this.isShowFloatStatusText = false
                            },3200)
                }else{

                    setTimeout(()=>{
                        this.isShowFloatStatusText = false
                            },5200)
                }

            },
        },

}
</script>
