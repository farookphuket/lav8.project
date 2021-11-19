<template>
    <div class="container-fluid">
        <div class="clearfix">
            <div class="float-right">
                <button
                    class="btn btn-outline-primary"
                    @click.prevent="showFormAdd = true"
                    v-if="showFormAdd == false"
                >
                    Add video
                </button>
                <button
                    class="btn btn-outline-danger"
                    @click.prevent="showFormAdd = false"
                    v-else
                >
                    Close
                </button>
            </div>
        </div>
        <div class="col-lg-12 pt-2 mb-2">&nbsp;</div>
        <video-form
            @getVideos="getVideos($event)"
            :editId="editId"
            :videos="videos.data"
            v-show="showFormAdd"
        ></video-form>

        <video-list
            :videos="videos" 
            @openVideo="openVideo($event)"
            @editVideo="editVideo($event)"
            @delVideo="delVideo($event)"
            @getVideos="getVideos($event)"
        ></video-list>
        <b-modal :title="title" ref="showVideoModal" size="xl" hide-footer>
            <div v-for="li in video">
                <div class="video-container" v-html="li.embed">
                    {{li.embed}}
                </div>
                <div class="form-group pt-4 mb-4 p-2">
                    <textarea  class="form-control" ref="embed" 
                    @focus="$event.target.select()">{{li.embed}}</textarea>
                </div>
                <button class="btn btn-outline-danger btn-block" 
                    @click.prevent="closeBox">close</button>
            </div>
        </b-modal>

        <b-modal title="Server Said :" ref="onOk" centered ok-only>
            <div v-html="res_status">
                {{ res_status }}
            </div>
        </b-modal>
    </div>
</template>

<script>
import VideoForm from "./VideoForm.vue";
import VideoList from "./VideoList.vue";
export default {
    name: "Video",
    components: {
        VideoForm,
        VideoList,
    },
    data() {
        return {
            videos: [],
            video:[],
            title:'',
            editId: 0,
            res_status: "",
            showFormAdd: false,
        };
    },
    mounted() {
        this.getVideos();
    },
    methods: {
        getVideos(page) {
            let url = "";
            if (page) {
                url = page;
                this.$cookies.set("avideo_old_page", url);
            }
            url = this.$cookies.get("avideo_old_page");
            if (!url) {
                url = `/admin/getVideos`;
            }
            axios.get(url).then((res) => {
                //console.log(res.data)
                this.videos = res.data.videos;
            });
        },
        openVideo(id){
            let url = `/admin/video/${id}`
            axios.get(url)
                .then(res=>{
                    this.video = res.data.video
                    //console.log(this.video)
                    this.video.forEach((val)=>{
                        this.title = val.title
                    })
                    this.$refs["showVideoModal"].show()
                })
        },
        editVideo(id) {
            this.editId = id;
            this.showFormAdd = true;
        },
        delVideo(id) {
            let url = `/admin/video/${id}`;
            axios.delete(url).then(
                (res) => {
                    this.res_status = res.data.msg;
                },
                (err) => {
                    this.res_status = `<span class="badge badge-danger">
                        ${err.response.data.message}</span>`;
                }
            );

            this.$refs["onOk"].show();
            setTimeout(() => {
                this.getVideos();
            }, 2000);
        },
        closeBox(){
            this.$refs["showVideoModal"].hide()
        },
    },
};
</script>
