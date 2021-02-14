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
              <button class="btn btn-primary" 
                @click.prevent="$emit('postEdit',post.id)">edit</button>
              <button class="btn btn-danger" 
                @click.prevent="$emit('postDel',post.id)">x</button>
            </div>
          </div>
          <hr>
        </article>
        <div class="pa">
          <ul class="pagination">
            <li class="page-item">
              showing from 
              <span>{{posts.from}}</span> to 
              <span>{{posts.to}}</span> of 
              <span>{{posts.total}}</span> &middot; 
            </li>
            <li class="page-item" v-for="li in posts.links">
              <a href="#" v-if="li.url != null && li.active == false"
                v-html="li.label" @click.prevent="$emit('getPosts',li.url)">
                {{li.label}} 
              </a>  
              <span class="active" v-html="li.label" v-else>
                {{li.label}} 
              </span>  
            </li>
            <li class="page-item">
                &middot;
                <span class="active">
                  {{posts.current_page}}
                </span>
            </li>
          </ul>
        </div>
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
