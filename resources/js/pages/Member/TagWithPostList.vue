<template>
  <div class="container">
    <article class="post-preview"
      v-for="po in postlist.data">
      <a href="#" @click.prevent="goReadPage(po.slug)">
        <h2 class="post-title">{{po.post_title}}</h2>
        
        
      </a>
      <p class="post-meta">Posted by
        
      {{po.user.name}}
        
        on
        {{moment(po.created_at)}} &middot; 
        <span class="reading-time" title="Estimated read time">
          {{moment(po.created_at).fromNow()}}
        </span>
        
      </p>
    </article>
    <div class="pa">
      <ul class="pagination">
        <li class="page-item">
          showing from 
          <span>{{postlist.from}}</span> to 
          <span>
            {{postlist.to}} 
          </span> of 
          <span>{{postlist.total}}</span> &middot; 
        </li>
        <li class="page-item" v-for="page in postlist.links">

          <a href="" v-html="page.label" 
            @click.prevent="getPostsList(page.url)"
            v-if="page.active == false && page.url != null">
            {{page.label}}
          </a>
          <span class="active"
            v-html="page.label" v-else>
            {{page.label}}
          </span> &middot; 
        </li>
        <li class="page-item">
          <span class="active">
            {{postlist.current_page}}
          </span>
        </li>
      </ul>
    </div>
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
        url = page
        this.$cookies.set("old_taglist_page",url)
      }
      url = this.$cookies.get("old_taglist_page")
      if(!url){
        url = `/member/getPostsInTagId/${this.tag_id}`
      }
      axios.get(url)
        .then(res=>{
          this.postlist = res.data.postlist
        },err=>{
          alert('Error ! please try again later')
        })
    },
    goReadPage(slug){
      let url = `/member/posts/${slug}`
      location.href=url
    }
  }





}
</script>
