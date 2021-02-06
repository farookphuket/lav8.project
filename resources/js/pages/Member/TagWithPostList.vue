<template>
  <div class="container">
    <article class="post-preview"
      v-for="po in postlist">
      <a href="#" @click.prevent="goReadPage(po.slug)">
        <h2 class="post-title">{{po.post_title}}</h2>
        
        
      </a>
      <p class="post-meta">Posted by
        
      {{po.name}}
        
        on
        {{moment(po.created_at)}} &middot; 
        <span class="reading-time" title="Estimated read time">
          {{moment(po.created_at).fromNow()}}
        </span>
        
      </p>
    </article>

  </div>
</template>

<script>
var moment = require('moment')
export default{
  name:"TagWithPostList"
  ,props:["tag_id","tag_all"]
  ,data(){
    return{
      postlist:'',
      moment:moment,
      tag_with_content:[]
    }
  },
  mounted(){
    this.getPostsList()
  },
  methods:{
    getPostsList(page){
      let url = ''
      if(page){
        url = `/member/getPostsInTagId/${this.tag_id}${page}`
      }
      url = `/member/getPostsInTagId/${this.tag_id}`
      axios.get(url)
        .then(res=>{
          this.postlist = res.data.postlist
        })
    },
    goReadPage(slug){
      let url = `/member/posts/${slug}`
      location.href=url
    }
  }





}
</script>
