<template>
    <div class="container">
       <div class="row">
            <div class="col-lg-12" v-if="videos.data.length == 0">
                <div class="alert alert-warning">
                    <h1 class="text-center">
                        There is no data now
                    </h1>
                </div>
            </div>
           <div class="col-md-4 " v-for="vi in videos.data" v-else>
                <div class="card">
                    <div class="card-body">
                        <div class="video-container" v-html="vi.embed">
                            {{vi.embed}}
                        </div>
                        <p class="pt-2 mb-2">
                            <a href="" @click.prevent="showVideo(vi.id)">
                            {{vi.title}}
                            </a>
                        </p>
                    </div><!-- end of div.card-body -->
                </div><!-- end of div.card -->
           </div><!-- end of div.col-md-4 -->
       </div><!-- end of div.row -->

       <b-modal title="Show video" ref="showVideoModal" size="xl" ok-only>
            <h2 class="text-center">
                {{title}}
            </h2>
            <div class="container">
                <div class="video-container" v-html="embed">
                    {{embed}}
                </div>
                <p>&nbsp;</p>

                <div class="form-group">
                    <textarea class="form-control" ref="showEmbed" 
                    @click.prevent="selectText">{{embed}}</textarea>
                </div>
            </div>

       </b-modal>
    </div><!-- end of div.container -->
</template>


<script>
var moment = require("moment")

export default{
    name:"VideoList",
    props:["videos"],
    data(){
        return{
            moment:moment,
            title:"",
            embed:"",
        }
    },
methods:{
            showVideo(id){
                this.videos.data.forEach((val)=>{
                        if(val.id == id){
                            this.title = val.title
                            this.embed = val.embed
                        }
                        this.$refs["showVideoModal"].show()
                        })
            },
            selectText(){
                this.$refs.showEmbed.select()
            },
        }
}
</script>
