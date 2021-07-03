<template>
    <div class="container-fluid">
        <post-search @openPost="openPost($event)"></post-search>
        <post-list :posts="posts" @openPost="openPost($event)" 
            @getPostList="getPostList($event)" 
            @openTag="openTag($event)"
            v-if="isNorm == true"></post-list>
        <post-list-by-tag :openTagId='openTagId' 
            @getPostList="getPostList($event)" v-else></post-list-by-tag>

    </div>
</template>


<script>

import PostSearch from './PostSearch.vue'
import PostList from './PostList.vue'
import PostListByTag from './PostListByTag.vue'

export default{
    name:"PubPost",
    components:{
        PostSearch,
        PostList,
        PostListByTag
    },
    data(){
        return{
            posts:[],
            openUrl:'',
            isNorm:true,
            openTagId:0,
        }
    },
    mounted(){
        this.getPostList()
        if(this.$cookies.get('cookie_tag_id')){
            this.openTag(this.$cookies.get('cookie_tag_id'))
        }
    },
    methods:{

        getPostList(page){
            if(!this.$cookies.get('cookie_tag_id')){
                this.isNorm = true
            } 
            let url = ''
            if(page){
                url = page
                this.$cookies.set('old_post_page',url)
            }
            url = this.$cookies.get('old_post_page')
            if(!url){
                url = `/api/getPostList`
            }
            axios.get(url)
                .then(res=>{
                    this.posts = res.data.posts
                })
        },
        openPost(theLink){
            let url = `/posts/${theLink}`
            location.href=url
        },
        openTag(id){
            this.isNorm = false
            this.openTagId = id
            this.$cookies.set('cookie_tag_id',id)
        }
    },
}
</script>
