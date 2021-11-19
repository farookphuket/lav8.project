<template>
    <div class="container">

        <!-- v-for START -->
        <!-- we're wrap every post in div.card -->
        <div class="card mb-4" 
            v-for="po in posts.data">
            <div class="card-header">
                <h3 class="card-title text-center">{{po.post_title}}</h3>
            </div>
            <div class="card-body">
                <div v-html="po.post_excerpt">
                    {{po.post_excerpt}}
                </div>
                <div class="row">
                    <div class="col-lg-6">
                        tags :
                        <span v-for="ta in po.tags">
                            <b-icon icon="tags"></b-icon>
                            {{ta.tag_name}}
                        </span>
                    </div>
                    
                    <div class="col-lg-6">
                        <div class="float-right">
                            <button class="btn btn-outline-primary" 
                                @click.prevent="$emit('openPost',po.slug)">
                                Read more...&middot;
                                (
                                <b-icon icon="eye"></b-icon>
                                {{po.read_count}}
                                )
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- div.card-footer -->
            <div class="card-footer">
                <div class="row">
                    <div class="col-md-8">

                        <span>
                            <b-icon icon="calendar2-day"></b-icon>
                            {{moment(po.created_at)}} &middot;
                            {{moment(po.created_at).fromNow()}}
                        </span>
                    </div>
                    <div class="col-md-4">

                        <div class="float-right">
                            <span>
                                By :
                                <b-icon icon="person"></b-icon>
                                {{po.user.name}}
                            </span>
                            <span>
                                <b-icon icon="chat-left-text"></b-icon>
                                {{po.comments.length}}
                            </span>
                            <span>
                                <b-icon icon="eye"></b-icon>
                                {{po.read_count}}
                            </span>
                        </div>

                    </div>
                </div>
            </div>
            <!-- div.card-footer END -->

        </div>
        <!-- v-for END -->

        <!-- pagination START -->
        <div class="container" style="margin-top:2em;margin-bottom:2em;">
            
                    <div class="nav-scroller py-1 mb-2">
                        <nav class="nav d-flex justify-content-center">
                            <ul class="pagination flex-wrap">
                                <li class="page-item disabled">
                                    <div class="page-link">
                                        showing from
                                        <span>{{ posts.from }}</span> to
                                        <span>{{ posts.to }}</span> of
                                        <span>{{ posts.total }}</span> 
                                    </div> 
                                </li>
                                <li class="page-item" v-for="li in posts.links">
                                    <a
                                        href=""
                                        class="page-link p-2"
                                        v-html="li.label"
                                        v-if="li.active != true && li.url != null"
                                        @click.prevent="$emit('getPostList', li.url)"
                                        >{{ li.label }}</a
                                    >
                                    <span class="page-link disabled" 
                                        v-html="li.label" v-else>
                                        {{ li.label  }}
                                    </span>
                                    
                                </li>
                                <li class="page-item active">
                                    <span class="page-link">
                                        <b-icon icon="book-half"></b-icon> 
                                        {{ posts.current_page }}
                                    </span>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <!-- end of div.nav-scroller pagination -->
        </div>
        <!-- pagination END -->


    </div>
</template>

<script>
var moment = require('moment')
export default{
    name:"PostList",
    props:["posts"],
    data(){
        return{
            moment:moment
        }
    },
    methods:{
        setGoPage(url){
            this.$cookies.set('isNorm',true)
            this.$emit('getPostList',url)

        },
        setGoTagPage(id){
            if(this.$cookies.get('isNorm')== true){
                this.$cookies.remove('isNorm')
            }
            this.$emit('openTag',id)
        }
    }

}
</script>
