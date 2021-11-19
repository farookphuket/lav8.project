<template>
    <div>
        <!-- float status -->
        <div class="col-lg-12">
            <div class="float_status" v-html="res_status" 
            v-show="isShowResStatus">{{res_status}}</div>
        </div>
        <!-- float status -->


        <!-- tabs will show in main component START -->
        <b-tabs content-class="mt-3">

            
            <song-list :allSong="allSong" 
            :isShowPagination="isShowPagination"
            :mySong="mySong" :user_id="user_id"
            @getAllSong="getAllSong($event)"
            @openSong="openSong($event)" :paginate_mysong="paginate_mysong"
            @edit="edit($event)" @del="del($event)"
            ></song-list>
            
            <song-form 
            @getAllSong="getAllSong($event)"
            :editId="editId" 
            @showFloatStatus="showFloatStatus($event)"></song-form>

            <song-search @openSong="openSong($event)"></song-search>

          </b-tabs>
        <!-- tabs will show in main component END -->

        
    </div>
</template>

<script>

import SongList from './SongList.vue'
import SongForm from './SongForm.vue'
import SongSearch from './SongSearch.vue'

export default{
    name:"Msong",
    props:["user_id"],
             components:{
                 SongList,
                 SongForm,
                 SongSearch,
             },
             data(){
                 return{
                     isAllSongShow:true,
                     isMySongShow:false,
                     allSong:'',
                     mySong:'',
                     res_status:'my default',
                     isShowResStatus:false,
                     editId:0,
                     isShowPagination:false,
                     paginate_mysong:false,
                 }
             },
             mounted(){
                 this.getAllSong()
                 this.getMySong()
             },
methods:{
            getAllSong(page){
                let url = ''
                    if(page){
                        url = page 
                        this.$cookies.set('pubsong_old_page',url)
                    }
                    url = this.$cookies.get('pubsong_old_page')
                    if(!url) url = `/getsong`
                    axios.get(url)
                        .then(res=>{
                            //console.log(res)
                            this.allSong = res.data.songs
                            if(Object.keys(res.data.songs.data).length >= res.data.songs.per_page) this.isShowPagination = true 


                            
                        })
            },
            getMySong(page){
                let url = ''
                if(page){
                    url = page
                    this.$cookies.set("m_song_old_page",url)
                }
                url = this.$cookies.get("m_song_old_page")
                if(!url) url = `/member/getsong`
                axios.get(url)
                    .then(res=>{
                            this.mySong = res.data.my_song
                
                            if(Object.keys(this.mySong.data).length >= res.data.my_song.per_page) this.paginate_mysong = true
                            })

            },
            openSong(id){
                let url = `/song/${id}`
                axios.get(url) 
                .then(res=>{
                    window.open(res.data.url,"_blank")
                        })
                setTimeout(()=>{
                    this.getAllSong()
                        },2100)
            },
            showFloatStatus({msg,it_status}){
                this.isShowResStatus = true 
                this.res_status = msg

                setTimeout(()=>{
                    this.isShowResStatus = false
                        },5200)
            },
            edit(id){
                this.editId = id
            },
            del(id){
                if(id != 0){
                    if(confirm(`delete item id ${id}?`) == true){
                        let url =`/member/song/${id}`
                        axios.delete(url)
                        .then(res=>{
                           this.showFloatStatus({msg:res.data.msg}) 
                                })
                        .catch((err)=>{
                            let erMsg = `<span class="text-danger">
                                ${Object.values(err.response.data.errors).join()}
                            </span>`
                            this.showFloatStatus({msg:erMsg})
                                })
                    }
                }
                setTimeout(()=>{
                    this.getAllSong()
                        },700)
            },
        },

}
</script>
