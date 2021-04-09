<template>

    <section id="about" class="about">
      <div class="container">
          <div class="section-title">
              <h2>Blog Post</h2>
          </div>
          <div v-for="po in posts.data">
            <div class="section-title mb-4">
                <h2>
                    {{po.post_title}}
                </h2>
            </div>
            <div class="clearfix">
                <div class="float-right">
                    <span>
                        <b-icon icon="person"></b-icon>
                        {{po.user.name}}
                    </span> &middot; 
                    <span class="badge badge-warning">
                        <b-icon icon="clock-history"></b-icon>
                        {{moment(po.created_at).fromNow()}}
                    </span> &middot; 
                    <span class="badge badge-primary">
                        <b-icon icon="eye-fill"></b-icon>
                        {{po.read_count}}
                    </span>
                </div>
            </div>
            <div v-html="po.post_excerpt">{{po.post_excerpt}}</div>

            <div class="clearfix">
                <div class="float-left">
                    <span class="badge badge-primary p-2" v-for="ta in po.tags">
                        <a style="color:white;" href="" 
                            @click.prevent="setGoTagPage(ta.id)">
                            <b-icon icon="tags"></b-icon>
                            {{ta.tag_name}} {{ta.id}}
                        </a>
                    </span>
                </div>
                <div class="float-right">
                    <span>
                        <b-icon icon="calendar2-day"></b-icon>
                        {{moment(po.created_at)}}
                    </span>
                    <button class="btn btn-outline-primary btn-sm" 
                        @click.prevent="$emit('openPost',po.slug)">
                        <b-icon icon="eye-fill"></b-icon> ({{po.read_count}})
                        Read More...</button>
                </div>
            </div>
            <hr class="pt-4">
            </div><!--end of v-for div -->

            <div class="col-lg-12">
                <ul class="pagination">
                    <li class="page-list">
                        showing from <span>{{posts.from}}</span> 
                        to <span>{{posts.to}}</span> of 
                        <span>{{posts.total}}</span> &middot;
                    </li>
                    <li class="page-list" v-for="li in posts.links">
                        <a href="" v-html="li.label" 
                            v-if="li.active != true && li.url != null" 
                            @click.prevent="setGoPage(li.url)">
                            {{li.label}}
                        </a>
                        <span v-html="li.label" v-else>
                            {{li.label}} 
                        </span> &middot;
                    </li>
                    <li class="page-list">
                        <span class="active">
                            <b-icon icon="book-half"></b-icon>
                            {{posts.current_page}}
                        </span>
                    </li>
                </ul>
            </div>
        </div><!-- end of div.container -->
    </section>
    
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
