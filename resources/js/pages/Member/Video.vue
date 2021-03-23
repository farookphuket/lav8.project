<template>
    <div class="container-fluid">
        <video-form @getVideos="getVideos($event)" :editId="editId" 
        :videos="videos"></video-form>
        <video-list :videos="videos" @videoEdit="videoEdit($event)" 
        @videoDel="videoDel($event)" @getVideos="getVideos($event)"></video-list>

        <b-modal title="Server Said :" ref="onOk" centered ok-only>
            <div v-html="res_status">
                {{res_status}}
            </div>
        </b-modal>
    </div>
</template>

<script>
import VideoForm from './VideoForm'
import VideoList from './VideoList'

export default{
    name:"Video",
             components:{
                VideoForm,
                VideoList
             },
             data(){
                 return{
                    videos:[],
                    editId:0,
                    res_status:'',

                 }
             },
             mounted(){
                this.getVideos()
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
                                    this.videos = `<span class="badge badge-danger">${err.response.data.message}</span>`
                                })
            },
            videoEdit(id){
                this.editId = id
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
        },
}
</script>
