<template>
    <div class="container">

        <div class="row">
            <div class="col-lg-4" v-for="vi in videos.data">

                <div class="card">
                    
                   <div class="video-container" v-html="vi.embed">
                        {{vi.embed}}
                   </div>
                    <div class="card-body">
                        <p>
                        <a href="" @click.prevent="openVideo(vi.id)">
                        {{vi.title}}
                        </a> - {{vi.user.name}}
                        </p>
                    </div>
                    <div class="card-footer">
                        <div class="clearfix">
                            <div class="float-left">
                                <p>
                                    <span class="badge badge-info">
                                        {{moment(vi.created_at).fromNow()}}
                                    </span>
                                </p>
                            </div>
                            <div class="float-right">
                                <button class="btn btn-outline-primary" 
                                @click.prevent="$emit('editVideo',vi.id)">
                                    edit
                                </button>
                                <button class="btn btn-outline-danger" 
                                @click.prevent="$emit('delVideo',vi.id)">X</button>
                            </div>
                        </div><!-- end of div.card-footer -->
                    </div><!-- end of div.card-body -->
                </div><!-- end of div.card -->
            </div><!-- end of div.col-lg-4 -->
            <div class="col-lg-12 ">
                <div class="pa">
                    <ul class="pagination">
                        <li class="page-item">
                           showing from 
                           <span> {{videos.from}}</span> to 
                           <span>{{videos.to}}</span> of 
                           <span>{{videos.total}}</span>
                        </li>
                        <li class="page-item" v-for="li in videos.links">
                           <a href="" @click.prevent="$emit('getVideos',li.url)" 
                           v-if="li.active == false && li.url != null" 
                           v-html="li.label">
                            {{li.label}}
                           </a>
                           <span class="active" v-html="li.label" v-else>
                            {{li.label}}
                           </span>
                        </li>
                        <li class="page-item">
                            <span class="active">
                                {{videos.current_page}}
                            </span>
                        </li>
                    </ul>
                </div>
            </div><!-- end of div.col-lg-12 -->
        </div><!-- end of div.row -->

        <b-modal title="test" ref="showVideo" size="xl" centered ok-only>
            
            <div class="card">
                
                <div class="card-body">
                    <p>
                        {{title}}
                    </p>
                    <div v-html="embed" class="video-container">
                        {{embed}}
                    </div>
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
        embed:""
    }
},
    methods:{
        openVideo(id){
            //console.log(this.videos.data)
                this.videos.data.forEach((val)=>{
                        if(val.id == id){
                            this.title = val.title
                            this.embed = val.embed
                        }       
                            this.$refs["showVideo"].show()
                        })
        },       
    }
}
</script>
