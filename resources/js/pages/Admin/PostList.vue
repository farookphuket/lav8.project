<template>
    <div class="container">
        <div class="card card-body p-2"
            v-for="li in posts.data">
            <a href="#" @click="$emit('postRead',li.slug)">
            <h2 class="text-center">
                {{li.post_title}}
            </h2>
            </a>
            <div class="clearfix">
                <div class="float-right">
                    <p class="small">
                    <span class="badge badge-info">
                        <b-icon icon="person"></b-icon>
                        {{li.name}} 
                    </span> &middot; 
                    <span class="badge badge-info">
                        <b-icon icon="envelope"></b-icon>
                        {{li.email}}
                    </span> 
                    <span class="badge badge-info p-2">
                        <b-icon icon="calendar2-day"></b-icon>
                        {{moment(li.created_at)}}
                    </span> &middot;
                    <span class="badge badge-info p-2">
                        <b-icon icon="clock-history"></b-icon>
                        {{moment(li.created_at).fromNow()}}
                    </span>
                    </p>
                </div>
            </div>
            <div v-html="li.post_excerpt">
                {{li.post_excerpt}}
            </div>
            <hr class="pt-2 mb-2">
            
            <div class="clearfix">
                <div class="float-left">
                    <span v-for="ta in li.tags">
                        <b-icon icon="tags"></b-icon>
                       <a @click.prevent="getPostByTagId(ta.id)" 
                       class="btn btn-outline-info btn-sm"
                       >
                        {{ta.tag_name}}
                       </a>
                    </span>
                </div>
                <div class="float-right">
                    <div>
                       <span>
                           <b-icon icon="eye"></b-icon>
                           {{li.read_count}}
                       </span>
                        <span class="alert alert-success"
                              v-if="li.is_public == 1">
                            <b-icon icon="unlock"></b-icon>
                        </span>

                        <span class="alert alert-warning" v-else>
                            <b-icon icon="lock"></b-icon>
                        </span>
                        <button class="btn btn-outline-primary btn-sm"
                                @click.prevent="$emit('postEdit',li.id)">
                            <b-icon icon="box-arrow-up"></b-icon>
                        </button>
                        <button class="btn btn-outline-danger btn-sm" 
                            @click.prevent="$emit('postDelete',li.id)">
                            <b-icon icon="trash"></b-icon>
                            
                        </button>
                    </div>
                </div>
            </div>
        </div><!-- end of div.card.card-body content list -->
        <!-- need a space between the content -->
        <div class="col-lg-12 pt-2 mb-2">&nbsp;</div>
        <!-- need a space between the content -->
        <div class="nav-scroller py-1 mb-2">
            <nav class="nav d-flex justify-content-center">
                <ul class="pagination">
                    <li class="page-item disabled">
                        <div class="page-link">
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
                        </div>
                    </li>
                    <li class="page-item"
                        v-for="mm in posts.links">
                        <a href="" class="page-link p-2"
                            v-if="mm.active == false && mm.url != null"
                            v-html="mm.label"

                            @click.prevent="$emit('getPostList',mm.url)">
                            {{mm.label}}
                        </a>
                        <span class="page-link disabled" 
                              v-html="mm.label"
                            v-else>
                            {{mm.label}}
                        </span>
                    </li>
                    <li class="page-item active">
                        <span class="page-link">
                            <b-icon icon="book-half"></b-icon>
                            {{posts.current_page}}
                        </span>
                    </li>
                </ul>

            </nav>
        </div><!-- end of div pagination  -->
        <post-tag :tag_has_content="tag_with_content"
                          :tag_all="tag_all"
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
    props:["posts","tag_with_content","tag_all"],
    methods:{
        getPostByTagId(id){
            let url = `/admin/getPostsByTag?tag=${id}`
            location.href=url
        }
    }
}
</script>
