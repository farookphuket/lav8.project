<template>
  <div>

    <article class="post-preview"
             v-for="li in whatnews.data">
          <a href=""
            @click.prevent="showSample(li.id)">
            <h2 class="post-title">
              {{li.whatnews_title}}
            </h2>

          </a>
          <p class="post-meta">Posted by
            
          {{li.user.name}}
            on
            {{moment(li.created_at)}}  &middot; 
            <span class="reading-time" title="Estimated read time">
              {{moment(li.created_at).fromNow()}}
            </span>
            
          </p>

          <div class="clearfix">
            <div class="float-right"
              v-if="ownerId == li.user_id">

              <span class="badge badge-warning"
                    v-if="li.is_public == 0">
                Private
              </span>
              <span class="badge badge-success"
                    v-else>
                Public
              </span>
              <button class="btn btn-primary btn-small"
                      @click.prevent="$emit('wnEdit',li.id)" >edit</button>

              <button class="btn btn-danger"
                     @click.prevent="$emit('wnDel',li.id)" >&times;</button>

            </div>
          </div>
        </article>

        <div class="pa">
          <ul class="pagination">
            <li class="page-item">
              showing
              <span>
                  {{whatnews.from}}
              </span> 
              to   
              <span>
                {{whatnews.to}}
              </span>
              of 
              <span>
                {{whatnews.total}}
              </span>
            </li>
            <li class="page-item"
              v-for="mm in whatnews.links">
              <a href=""
                 @click.prevent="$emit('getWhatnews',mm.url)"
                v-if="mm.active == false && mm.url != null"
                v-html="mm.label">{{mm.label}}</a>
              <span v-else
                class="active"
                v-html="mm.label">
                {{mm.label}}
              </span>
            </li>
            <li class="page-item">
              <span>
                {{whatnews.current_page}}
              </span>
            </li>
          </ul>
        </div>
        <b-modal title="show sample" 
                 ref="showBox" size="xl" 
            id="showBox"
          scrollable hide-footer
          >
            <div class="mb-4 d-block" v-html="show_sample">
              {{show_sample}}
            </div>
          <b-button variant="outline-info" block 
            @click.prevent="$emit('wnRead',showId)">Read On page</b-button>
          <b-button variant="outline-danger" block 
            @click.prevent="$bvModal.hide('showBox')">Just close</b-button>
        </b-modal>


  </div>
</template>

<script>
var moment = require('moment')
export default{
  name:"WhatNewsList",
  props:["whatnews"],
  data(){
    return{
      ownerId:'',
      moment:moment,
      showId:0,
      show_sample:''
    }
  },
  watch:{
    
  },
  mounted(){
    this.ownerId = window.ownerId

  },
  methods:{
    showSample(id){
      this.whatnews.data.forEach((val)=>{
        if(val.id == id){
          //console.log(val.whatnews_title)
          this.show_sample = val.whatnews_body
          this.showId = id
          this.$refs["showBox"].show()
        }
      })

    },
  
  }
}
</script>
