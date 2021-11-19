<template>
    <div class="container">
        <div v-for="ta in tags.data">
            <h3 class="text-center pt-2">
                {{ta.tag_name}}
            </h3>
            <div class="clearfix">

                <div class="float-right">
                    <span>
                        <b-icon icon="calenda2-day"></b-icon>
                        {{moment(ta.created_at)}}
                    </span> &middot; 
                    <span>
                        <b-icon icon="clock-history"></b-icon>
                        {{moment(ta.created_at).fromNow()}}
                    </span>
                    <span>
                        <b-icon icon="folder-symlink"></b-icon>
                        {{ta.posts.length}}
                    </span>
                    <button class="btn btn-outline-primary btn-sm" 
                        @click.prevent="$emit('tagEdit',ta.id)">edit</button>

                    <button class="btn btn-outline-danger btn-sm" 
                        @click.prevent="$emit('tagDelete',ta.id)">
                        <b-icon icon="trash"></b-icon>
                        
                    </button>
                </div>
            </div><!-- end of div.clearfix -->
            <div>
                <ul>
                    <li v-for="po in ta.posts">
                        <span>
                            <b-icon icon="file-earmark-word"></b-icon>
                            <a href="" 
                                @click.prevent="$emit('goReadPost',po.slug)">

                                {{po.post_title}}
                            </a>
                        </span>
                    </li>
                </ul>
            </div><!-- end of div post list -->
            <hr class="pt-4 mb-2">
            
        </div><!-- end of div v-for -->
        <!-- ========= need some space START ======= -->
        <div class="col-lg-12 pt-2 mb-2">&nbsp;</div>
        <!-- ========= need some space End ======= -->
        <!-- ========= pagination START =========== -->
        <div class="col-lg-12">
            <div class="nav-scroller py-1 mb-2">
                <nav class="nav d-flex justify-content-center">
                    <ul class="pagination flex-wrap">
                        <li class="page-item disabled">
                            <div class="page-link">
                                showing from <span>{{tags.from}}</span> to 
                                <span>{{tags.to}}</span> of <span>{{tags.total}}</span> 

                            </div>
                        </li>
                        <li class="page-item" v-for="li in tags.links">
                            <a href="" v-html="li.label" class="page-link p-2"
                                v-if="!li.active  && li.url != null" 
                                @click.prevent="$emit('getTags',li.url)"
                                >
                                {{li.label}}
                            </a>
                            <span class="page-link active disabled" 
                                v-html="li.label" v-else>
                                {{li.label}}
                            </span> 
                        </li>
                        <li class="page-item active">
                            <span class="page-link ">
                                <b-icon icon="book-half"></b-icon>
                                {{tags.current_page}}
                            </span>
                        </li>
                    </ul>
                </nav>
            </div><!-- end of div pagination -->

        </div>

        <!-- ========= pagination END =========== -->
    </div><!-- end of main div -->
</template>


<script>
var moment = require('moment')
export default{
    name:"TagList",
    props:["tags"],
    data(){
        return{
            moment:moment,
            tag_title:'',
        }
    },
}
</script>
