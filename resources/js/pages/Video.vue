<template>
    <div class="container-fluid">
        <video-list :videos="videos" @getVideos="getVideos($event)"></video-list>
    </div>
</template>

<script>

import VideoList from './VideoList.vue'
export default{
    name:"Pubvideo",
             components:{
                VideoList,
             },
             data(){
                 return{
                    videos:[]
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
                        this.$cookies.set("old_video_page",url)
                    }
                url = this.$cookies.get("old_video_page")
                    if(!url){
                        url = `/getVideos`
                    }
                axios.get(url)
                    .then(res=>{
                        this.videos = res.data.videos
                        },err=>{
                            this.videos = err.response.data.message
                        })
            }
        }
}
</script>
