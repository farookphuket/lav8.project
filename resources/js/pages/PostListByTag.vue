<template>
    

    <section id="about" class="about">
      <div class="container">
          <div class="section-title">
              <h2>
                  <a href='' @click.prevent="viewAll"> 
               <b-icon icon="arrow-bar-up"></b-icon>
               back
                  </a>
              </h2>

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
                        {{po.name}}
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
            
          </div><!-- end div v-for posts.data -->
          <div class="row">
              <div class="col-lg-12 pt-4">
                 <ul class="pagination">
                     <li class="page-item">
                         showing from <span>{{posts.from}}</span>
                     </li>
                     <li class="page-item" v-for="li in posts.links">
                         <a href="" v-html="li.label" 
                             v-if="!li.active && li.url != null" 
                             @click.prevent="getTagPage(li.url)">
                             {{li.label}}
                         </a>
                         <span v-html="li.label" v-else>
                             {{li.label}}
                         </span> &middot;
                     </li>
                     <li class="page-item">
                        <span>
                            <b-icon icon="book-half"></b-icon>
                            {{posts.current_page}}
                        </span>
                     </li>
                 </ul>
              </div>
          </div>
      </div>
    </section>

</template>



<script>
var moment = require('moment')
export default{
    name:"PostListByTag",
    props:["openTagId"],
    data(){
        return{
            posts:[],
            moment:moment,
        }
    },
    mounted(){
        this.getTagPage()
        if(this.$cookies.get('old_tag_page')){
            this.getTagPage(this.$cookies.get('old_tag_page'))
        }
    },
    methods:{
        getTagPage(page){
            if(!this.openTagId){
                return
            }
            let url = ''
            if(page){
                url = page
                this.$cookies.set('old_tag_page',url)
            }
            this.$cookies.get('old_tag_page')
            if(!url){
                url = `/api/getPostListByTag/${this.openTagId}`
            }
            axios.get(url)
                .then(res=>{
            //        console.log(res.data)
                    this.posts =res.data.posts
                })
            
        },
        viewAll(){
            if(this.$cookies.get('cookie_tag_id')){
                this.$cookies.remove('cookie_tag_id')
            }
            this.$emit('getPostList')
        }

    },

}
</script>
