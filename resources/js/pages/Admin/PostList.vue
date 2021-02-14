<template>
    <div class="container">
        
        <div class="card card-body"
            v-for="li in posts.data">
            <a href="#" @click="$emit('postRead',li.slug)">
            <h2 class="text-center">
                {{li.post_title}}
            </h2>
            </a>
            <div class="clearfix">
                <div class="float-right">
                    <p class="small">
                    by 
                    <span class="badge badge-info">
                        {{li.name}} 
                    </span> &middot; 
                    <span class="badge badge-info">
                        {{li.email}}
                    </span> on 
                    <span class="badge badge-info">
                        {{moment(li.created_at)}}
                    </span> &middot;
                    <span class="badge badge-info">
                        {{moment(li.created_at).fromNow()}}
                    </span>

                    </p>
                </div>
            </div>
            <div v-html="li.post_excerpt">
                {{li.post_excerpt}}
            </div>
            <div class="clearfix">
                <div class="float-right">
                    <span class="alert alert-success"
                          v-if="li.is_public == 1">Public</span>
                    <span class="alert alert-warning" v-else>Private</span>
                    <button class="btn btn-primary"
                            @click.prevent="$emit('postEdit',li.id)">edit</button>
                    <button class="btn btn-danger" 
                        @click.prevent="$emit('postDelete',li.id)">X</button>
                </div>
            </div>
        </div>
        <div class="pa">
            <ul class="pagination">
                <li class="page-item">
                    showing form 
                    <span>
                        {{posts.from}}
                    </span>
                    to 
                    <span> 
                        {{posts.to}}
                    </span> of
                    <span>
                        {{posts.total}}
                    </span>

                </li>
                <li class="page-item"
                    v-for="mm in posts.links">
                    <a href=""
                        v-if="mm.active == false && mm.url != null"
                        v-html="mm.label"

                        @click.prevent="$emit('getPostList',mm.url)">
                        {{mm.label}}
                    </a>
                    <span class="active" 
                          v-html="mm.label"
                        v-else>
                        {{mm.label}}
                    </span>
                </li>
                <li class="page-item">
                    <span class="active">
                        {{posts.current_page}}
                    </span>
                </li>
            </ul>
        </div><!-- end div.card-body -->
        <post-tag :tag_has_content="tag_with_content"
                          :tag_all="tags"
                          @getPostByTagId="getPostByTagId($event)"></post-tag>
    </div>
</template>

<script>
var moment = require('moment')
import PostTag from './PostTags.vue'
export default{
    name:"PostList",
    components:{
        PostTag
    },
    data(){
        return{
            moment:moment
        }
    },
    props:["posts","tag_with_content","tags"],
    methods:{
        getPostByTagId(id){
            let url = `/admin/getPostsByTag?tag=${id}`
            location.href=url
        }
    }
}
</script>
