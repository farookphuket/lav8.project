<template>
    <div class="container-fluid">
        <post-form :templates="template"
         :editId="editId"
         :tags="tags"
         @getPostList="getPostList($event)"></post-form>


        <post-list :posts="posts"
            :tag_with_content="tag_with_content"
            :tag_all="tags"
            @postEdit="postEdit($event)"
            @getPostList="getPostList($event)"
            @postRead="postRead($event)"
            @postDelete="postDelete($event)"></post-list>

        <b-modal title="message :" 
            ref="onOk" ok-only>
            <div v-html="res_status">
                {{res_status}}
            </div>
        </b-modal>
    </div>
</template>


<script>

import PostForm from './PostForm.vue'
import PostList from './PostList.vue'

export default{
    name:"Post",
    props:["template"],
    components:{
        PostList,
        PostForm
    },
    data(){
        return{
            editId:0,
        //    templates:[],
            posts:[],
            tags:[],
            res_status:'',
            tag_with_content:[],
            error:0
        }
    },
    mounted(){
        this.getPostList()

    },
    methods:{
        getPostList(page){
            this.editId = 0
            let url = ''
            if(page){
                url = page
                this.$cookies.set("post_old_page",url)
            }
            url = this.$cookies.get("post_old_page")
            if(!url){
                url = '/admin/getPosts'
            }
            axios.get(url)
                .then(res=>{
                    this.posts = res.data.posts
                    this.tags = res.data.tags
                    this.tag_with_content = res.data.tag_with_content
                },err=>{
                    this.error = 1
                })
        },
        postRead(slug){
            let url = `/admin/post/${slug}`
            location.href=url
        },
        postEdit(id){
            this.editId = id
        },
        postDelete(id){
            if(confirm("this will delete are you sure?") == true){
                let url = `/admin/post/${id}`
                axios.delete(url)
                    .then(res=>{
                        this.res_status = res.data.msg
                    },err=>{
                        this.res_status = `<span class="badge badge-danger">
                            ${err.response.data.message}</span>`
                    })
                this.$refs["onOk"].show()

            }else{
                return
            }
            setTimeout(()=>{
                this.getPostList()
            },2500)
        }
    }
}
</script>
