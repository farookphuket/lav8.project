<template>
    <div class="container-fluid">
    
        <div class="clearfix">
            <div class="float-right">
                <div class="btn-group">
                    <button class="btn btn-outline-primary btn-sm" 
                    v-if="showSearchForm == false" 
                    @click.prevent="showSearchForm=true">
                    Search Box</button>
                    <button class="btn btn-outline-danger btn-sm" v-else 
                    @click.prevent="showSearchForm = false">Close</button>

                    <button class="btn btn-outline-primary btn-sm" 
                    v-if="showVideoForm == false" 
                    @click.prevent="showVideoForm=true">
                    Create new</button>
                    <button class="btn btn-outline-danger btn-sm" v-else 
                    @click.prevent="showVideoForm = false">Close</button>
                </div>
            </div>
        </div>
        <video-search v-show="showSearchForm" 
        @openVideo="openVideo($event)"></video-search>

        <video-form @getVideos="getVideos($event)" :editId="editId" 
        :videos="videos" v-show="showVideoForm"></video-form>


        <p class="pt-4">&nbsp;</p>
        <video-list :videos="videos" @videoEdit="videoEdit($event)" 
        :openId="openId"
        @videoDel="videoDel($event)" @getVideos="getVideos($event)"></video-list>

        <b-modal title="Server Said :" ref="onOk" centered ok-only>
            <div v-html="res_status">
                {{res_status}}
            </div>
        </b-modal>
    </div>
</template>

<script>
import VideoSearch from '../VideoSearch.vue'
import VideoForm from './VideoForm'
import VideoList from './VideoList'

export default{
    name:"Video",
             components:{
                VideoSearch,
                VideoForm,
                VideoList
             },
             data(){
                 return{
                    videos:[],
                    editId:0,
                    openId:0,
                    res_status:'',
                    showSearchForm:false,
                    showVideoForm:false,
                 }
             },
             mounted(){
                this.getVideos()
                    this.$root.$on('smartTitle',(s,l)=>{
                        this.smartTitle(s,l)
                            })
             },
methods:{
            getVideos(page){
                let url = ""
                    if(page){
                        url = page
                        this.$cookies.set("old_mvideo_page",url)
                    }
                    url = this.$cookies.get("old_mvideo_page")
                        if(!url){
                            url = `/member/getVideos`
                        }
                        axios.get(url)
                            .then(res=>{
                                this.videos = res.data.videos
                                },err=>{
                                    this.videos = `<span 
                                    class="badge badge-danger">
                                    ${err.response.data.message}
                                    </span>`
                                })
            },
            videoEdit(id){
                this.editId = id
                this.showVideoForm = true
            }, 
            videoDel(id){
                let url = `/member/video/${id}`
                axios.delete(url)
                .then(res=>{
                    this.res_status = res.data.msg
                    },err=>{
                        this.res_status = `<span class="badge badge-danger">
                        ${err.response.data.message}
                        </span>`
                    })
                    this.$refs["onOk"].show()
                        setTimeout(()=>{
                            this.getVideos()
                                },2000)
            }, 
            openVideo(id){
             this.openId = id
            },
        },
}
</script>
