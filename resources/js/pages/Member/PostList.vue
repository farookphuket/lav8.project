<template>
    <div class="container"><!-- main div -->
        <article class="post-preview"
            v-for="po in postlist.data"
            v-show="po.slug != 'about'"
            :pkey="po.id">
          <a href="#"
            @click.prevent="goReadPage(po.slug)">
            <h2 class="post-title">
                {{po.post_title}}
            </h2>
           <h3>
             {{po.slug}}
           </h3>
          </a>
          <p class="post-meta">Posted by
          {{po.name}}
            on
            {{moment(po.created_at)}} &middot; <span class="reading-time" title="Estimated read time">
              {{moment(po.created_at).fromNow()}} </span>
          </p>
          <div class="clearfix">
            <div class="float-right post-btn" v-if="ownerId === po.user_id">
              <div class="btn-group">
                <span class="badge badge-warning" v-if="po.is_public !== '1'">
                  Not public
                </span>
                <span class="badge badge-success" v-else>Public</span>
                <button class="btn btn-primary"
                  @click.prevent="editPost(po.id)">
                  edit
                </button>
                <button class="btn btn-danger"
                  @click.prevent="delPost(po.id)">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </article>


        <div class="pa">
          <ul class="pagination">
            <li class="page-item">
              showing 
              <span>{{postlist.from}}</span>
              to 
              <span>{{postlist.to}}</span>
              of 
              <span>{{postlist.total}}</span>
            </li>
            <li class="page-item"
              v-for="li in postlist.links"
              :pagekey="li.label">
              <a href=""
                v-if="li.url !== null && li.active !== true"
                v-html="li.label"
                @click.prevent="getPaginate(li.url)">
                {{li.label}}
              </a>
              <span v-html="li.label"
                    :class="{active:getActive(li.active)}"
                v-else>
                {{li.label}}
              </span>
            </li>
            <li class="page-item">
                <span class="active">
                    {{postlist.current_page}}
                </span>
              </li>

          </ul>
        </div>
    </div><!-- end of main div -->


</template>




<script>
var moment = require('moment')

export default{
    name:"PostList"
    ,props:["postlist"]
  ,data(){
    return{
      moment:moment,
      ownerName:window.ownerName,
      ownerId:window.ownerId,
      is_public:false
      ,isActive:false
    }
  }
  ,methods:{
    editPost(id){
      this.$emit("editPost",id)
    },
    delPost(id){
      this.$emit('delPost',id)
    },
    goReadPage(id){
      this.$emit('readPost',id)
    },
    getPaginate(page){
      this.$emit('getPostList',page)
    },
    getActive(id){
      let st = ''
      if(id){
        st = 'active'
      }
      return st
    }
  }
}


</script>
