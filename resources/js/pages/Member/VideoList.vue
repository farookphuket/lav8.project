
<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12 pt-4" v-if="videos.data == 0">
                <div class="alert alert-warning">
                    <h2 class="text-center ">
                        There is no data
                    </h2>
                </div>
            </div>
            <div class="col-lg-4 pt-2" v-for="vi in videos.data" v-else>
                
                <div class="video-container" v-html="vi.embed">
                    {{vi.embed}}
                </div>
                <div class="card">
                    <div class="card-body">
                        <p>
                        <a href="" :title="vi.title" @click.prevent="videoShow(vi.id)">
                            {{smartTitle(vi.title,9)}}
                        </a> &middot; 
                            <span class="badge badge-info">
                                {{moment(vi.created_at).fromNow()}}
                            </span>
                        </p>
                    </div>


                    <div class="card-footer">
                        <div class="clearfix">
                            <div class="float-right">
                                <div class="btn-group" 
                                v-if="ownerId == vi.user.id">

                                    <button 
                                    class="btn btn-outline-primary btn-sm" 
                                    @click.prevent="$emit('videoEdit',vi.id)">edit</button>
                                    <button 
                                    class="btn btn-outline-danger btn-sm" 
                                    @click.prevent="$emit('videoDel',vi.id)">x</button>
                                </div>
                                <span class="badge badge-info" v-else>
                                    {{vi.user.name}}
                                </span>
                            </div>
                        </div>
                    </div>
                </div><!-- end of div.card -->
            </div><!-- end of div.col-lg-3 -->
            <div class="col-lg-12">
                <div class="pa">
                    <ul class="pagination">
                        <li class="page-item">
                            showing form 
                            <span>{{videos.from}}</span> to 
                            <span>{{videos.to}}</span> of 
                            <span>{{videos.total}}</span> &middot;
                        </li>
                        <li class="page-item" v-for="li in videos.links">
                            <a href="" 
                            v-if="li.active == false && li.url != null" 
                            v-html="li.label" 
                            @click.prevent="$emit('getVideos',li.url)">
                                {{li.label}}
                            </a>
                            <span class="active" v-html="li.label" v-else>
                                {{li.label}}
                            </span> &middot;
                            
                        </li>
                        <li class="page-item">
                            <span class="active">
                                {{videos.current_page}}
                            </span>
                        </li>
                    </ul>
                </div><!-- end of div.pa -->
            </div><!-- end of div.col-lg-12 -->
            <b-modal :title="title" ref="showVideoModal" size="xl" 
            ok-only>
                <div class="container">
                    <div class="video-container" v-html="embed">
                        {{embed}}
                    </div>
                    <div class="col-lg-12 pt-2">
                        <span class="badge badge-info">{{title}} - 
                        {{postBy}}</span> &middot; 
                        <span class="badge badge-info">{{moment(createDate)}} 
                        &middot;  {{moment(createDate).fromNow()}}</span>
                    </div>
                    <div class="form-group pt-4">
                        <textarea class="form-control" ref="showEmbed" 
                        @click.prevent="selectEmbedCode">{{embed}}</textarea>
                    </div>
                </div>
            </b-modal>
        </div><!-- end of div.row -->
    </div><!-- end of div container -->
</template>

<script>
var moment = require("moment")

export default{
    name:"VideoList",
    props:["videos","openId"],
    watch:{
        "openId":function(x){
            this.videoShow(x)
        }
    },
    data(){
        return{
            moment:moment,
            ownerId:window.ownerId,
            title:'',
            embed:'',
            postBy:'',
            createDate:'',

        }
    },
methods:{
            videoShow(id){
               // this.videos.data.forEach((val)=>{
               //         if(val.id == id){
               //             this.title = val.title
               //             this.embed = val.embed
               //             this.postBy = val.user.name
               //             this.$refs["showVideoModal"].show()
               //         }
               // })
               let url = `/video/${id}`
               axios.get(url)
               .then(res=>{
                    console.log(res.data)
                    res.data.video.forEach((val)=>{
                            if(val.id == id){
                                this.title = val.title
                                this.embed = val.embed
                                this.postBy = val.user.name
                                this.createDate = val.created_at
                            }
                        this.$refs["showVideoModal"].show()
                    })
                })
            },
            selectEmbedCode(){
                this.$refs.showEmbed.select()
            },
            smartTitle(str,len){
                return (str.length > len)?str.substr(0,len)+"...":str
            },
        },
}
</script>
