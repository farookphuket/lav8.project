<template>
<div class="container">
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

            <div class="col-lg-12">
                <!-- new pagination 3 July 2021 START -->
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

                <!-- new pagination 3 July 2021 End -->
            </div><!-- end of div.col-lg-12 -->

        <!-- new pagination 3 July 2021 END -->


</div>
</template>

<script>
var moment = require("moment")
export default{
  name:"PostList",
  props:["posts","ownerid"],
  data(){
    return{
      moment:moment
    }
  }
}
</script>
