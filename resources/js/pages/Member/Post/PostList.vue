<template>
<div>
    <b-tab title="Public Post">

        <post-search @postRead="$emit('postRead',$event)"></post-search>

        <article class="post-preview" v-for="post in posts.data">
          <a href="#" :title="post.post_title"
            @click.prevent="$emit('postRead',post.slug)">
            <h2 class="post-title">
              {{post.post_title}}
            </h2>
            
            <h3 class="post-subtitle">
              {{post.slug}}
            </h3>
            
          </a>
          <p class="post-meta">Posted by
          {{post.user.name}}
            on
            {{moment(post.created_at)}} &middot; 
            <span class="reading-time" title="Estimated read time">
              {{moment(post.created_at).fromNow()}}
            </span>
            &middot;
            <span class="badge badge-info p-2">
                <b-icon icon="eye"></b-icon>
                    {{post.read_count}}
            </span>
            
          </p>
          <div v-html="post.post_excerpt">
            {{post.post_excerpt}}
          </div>
          <div class="clearfix">
            <div class="float-right"
              v-if="ownerid == post.user_id">
              <span class="badge badge-warning"
                    v-if="post.is_public == false">
                Private Post
              </span>
              <span class="badge badge-success"
                    v-else>
                Public Post
              </span>
              <button class="btn btn-outline-primary btn-sm" 
                @click.prevent="$emit('postEdit',post.id)">edit</button>
              <button class="btn btn-outline-danger btn-sm" 
                @click.prevent="$emit('postDel',post.id)">x</button>
            </div>
          </div>
          <hr>
        </article>


        <!-- new pagination 3 July 2021 START -->

                    <div class="container" style="margin-top:2em;margin-bottom:2em;">
                                <div class="nav-scroller py-1 mb-2" v-show="isShowPostPagination">
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
                                                    @click.prevent="$emit('getPosts', li.url)"
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

    </b-tab>

    <b-tab title="My Post" @click.prevent="$emit('getMyPost')">
        <div class="row">
            <div class="col-md-12 mt-2" v-for="po in my_post.data" v-if="po.user_id == ownerid">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">{{po.post_title}}</h3>
                    </div>
                    <div class="card-body">
                        <div v-html="po.post_excerpt">{{po.post_excerpt}}</div>

                    </div>

                    <div class="card-footer">
                        <div class="row">
                            <div class="col-md-8">
                                <a href="" :title="moment(po.created_at)">
                                    {{moment(po.created_at).fromNow()}}
                                </a>

                            </div>
                            <div class="col-md-4">
                                <div class="float-right btn-group">
                                    <span class="badge badge-success" v-if="po.is_public == true">
                                        Public
                                    </span>
                                    <span class="badge badge-warning" v-else>
                                        Private
                                    </span>
                                    <button class="btn btn-outline-primary" 
                                    @click.prevent="$emit('postEdit',po.id)">
                                        <b-icon icon="pen"></b-icon>
                                    </button>

                                    <button class="btn btn-outline-danger" 
                                    @click.prevent="$emit('postDel',po.id)">
                                        <b-icon icon="x-circle"></b-icon>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div><!-- end of div.card -->

            </div>


            <!-- pagination area START -->
            <div class="col-lg-12">

                <div class="nav-scroller py-1 mb-2" v-show="isShowMyPostPagination">
                    <nav class="nav d-flex justify-content-center">
                        <ul class="pagination flex-wrap">
                            <li class="page-item disabled">
                                <div class="page-link">
                                    showing from
                                    <span>{{ my_post.from }}</span> to
                                    <span>{{ my_post.to }}</span> of
                                    <span>{{ my_post.total }}</span> 
                                </div> 
                            </li>
                            <li class="page-item" v-for="li in my_post.links">
                                <a
                                    href=""
                                    class="page-link p-2"
                                    v-html="li.label"
                                    v-if="li.active != true && li.url != null"
                                    @click.prevent="$emit('getMyPost', li.url)"
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
                                    {{ my_post.current_page }}
                                </span>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <!-- pagination area END -->


        </div>

    </b-tab>





</div>
</template>

<script>
import PostSearch from './PostSearch.vue'
var moment = require("moment")
export default{
  name:"PostList",
  props:["posts","ownerid","my_post","isShowMyPostPagination","isShowPostPagination"],
  components:{
      PostSearch,
  },
  data(){
    return{
      moment:moment,
      sTitle:new CustomText(),
    }
  },
methods:{

        },
}
</script>
