<template>
    <div class="container-fluid">
        <h1>this is the video vue</h1>

        <video-form @getVideos="getVideos($event)" :editId="editId" 
        :videos="videos.data"
        ></video-form>

        <video-list :videos="videos" @editVideo="editVideo($event)" 
        @delVideo="delVideo($event)" @getVideos="getVideos($event)"></video-list>

        <b-modal title="Server Said :" ref="onOk" centered ok-only>
           <div v-html="res_status">
            {{res_status}}
           </div>
        </b-modal>
    </div>
</template>


<script>
import VideoForm from './VideoForm.vue'
import VideoList from './VideoList.vue'
export default{
    name:"Video",
             components:{
             VideoForm,
             VideoList,
             },
             data(){
                 return{
                    videos:[],
                    editId:0,
                    res_status:""
                 }
             },
             mounted(){
                this.getVideos()
             },
methods:{
            getVideos(page){
                let url = `/admin/getVideos`
                axios.get(url)
                .then(res=>{
                //console.log(res.data)
                this.videos = res.data.videos
                        })
            },
            editVideo(id){
                this.editId = id
            },
            delVideo(id){
                let url = `/admin/video/${id}`
                axios.delete(url)
                .then(res=>{
                    this.res_status = res.data.msg
                    },err=>{
                        this.res_status = `<span class="badge badge-danger">
                        ${err.response.data.message}</span>`
                    })

                    this.$refs["onOk"].show()
                        setTimeout(()=>{
                        this.getVideos()
                                },2000)
            },
        }
}
</script>
