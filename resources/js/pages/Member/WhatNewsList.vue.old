<template>
  <div class="container">
        <article class="post-preview"
          v-for="wn in wnlist.data">
          <a href=""
            @click.prevent="goRead(wn.id)">
            <h2 class="post-title">
              {{wn.whatnews_title}}
            </h2>
          </a>
          <p class="post-meta">Posted by
            
          {{wn.user.name}}
            
            on
            {{moment(wn.created_at)}} &middot; 
            <span class="reading-time" title="Estimated read time">
              {{moment(wn.created_at).fromNow()}}
            </span>
            
          </p>
          <!-- div.clearfix-->
          <div class="clearfix">
            <div class="float-left">
              By <span class="badge badge-info">{{wn.user.name}}</span>
            </div>
            <div class="float-right" 
              v-if="wn.user_id === ownerId">
              <div class="btn-group">

                <span class="badge badge-success"
                  v-if="wn.is_public === '1'">
                  Public
                </span>
                <span class="badge badge-warning"
                  v-else>
                  Not public
                </span>
                <button class="btn btn-primary"
                  @click.prevent="getEdit(wn.id)">
                  Edit
                </button>

                <button class="btn btn-danger"
                  @click.prevent="getDel(wn.id)">
                  Del
                </button>
              </div>
            </div>
          </div>
          <!-- div.clearfix END-->
        </article>

        <div class="pa">
          <ul class="pagination">
            <li class="page-item">
              showing form
              <span>
                {{wnlist.from}}
              </span>
              to 
              <span>
                {{wnlist.to}}
              </span>
              of 
              <span>
                {{wnlist.total}}
              </span>
            </li>
            <li class="page-item"
              v-for="li in wnlist.links">
              <a href=""
                v-html="li.label"
                @click.prevent="goToPage(li.url)"
                v-if="li.active===false && li.url !== null">
                {{li.label}}
              </a>
              <span v-else
                class="active"
                v-html="li.label">
                {{li.label}}
              </span>
            </li>
          </ul>
        </div>

  </div>

</template>
<script>

var moment = require('moment')
export default{
  name:"WhatNewsList"
  ,props:['wnlist'],
  data(){
    return{
      moment:moment,
      wnslist:'',
      ownerId:window.ownerId,
      ownerName:window.ownerName
    }
  },
  mounted(){

  },
  methods:{
    getEdit(id){
      this.$emit("getEdit",id)
    },
    goRead(id){
      this.$emit("goRead",id)
    },
    goToPage(url){
      this.$emit("goToPage",url)
    },
    getDel(id){
      this.$emit("getDel",id)
    }
  }
}


</script>
