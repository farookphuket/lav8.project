<template>
    <div><!-- main div-->
        <div class="row">
            <div class="col-lg-12">
                <h1 class="text-center">
                    manage your post
                </h1>
                <p class="pt-2 mb-4">
                    this post component using Vue to render
                    there will be no refresh page here
                    and the `app.js` will hoppfully be resize the file size
                    as it is shown when it in the watch process.


                </p>
                
                <form>
                    <div class="form-group">
                        <input v-model="title" 
                               ref="title" class="form-control" 
                                        placeholder="Enter the post title"
                        type="text" name="">
                    </div><!-- end of title -->

                    <!-- excerpt -->
                    <div class="form-group">
                        <jodit-editor
                            v-model="excerpt"
                            height=335></jodit-editor>
                    </div><!-- end of excerpt -->

                    <!-- body -->
                    <div class="form-group">
                        <jodit-editor
                            v-model="body"
                            height=550></jodit-editor>
                    </div><!-- end of body -->

                    <div class="col-lg-12 mb-4 tags">
                        <span v-for="ta in tag_all">
                            <label for="">
                                <input v-model="user_select_tag" 
                                       :value="ta.id"
                                       
                                type="checkbox">
                                {{ta.id}}.{{ta.tag_name}}
                            </label>
                        </span>
                    </div>

                    <div class="clearfix">
                        <div class="float-left">
                            <div class="input-group"
                                >
                                <div class="input-group-prepend">
                                <label class="input-group-text">
                                    <input v-model="show_preview" 
                                    type="checkbox" 
                                    @click="show_preview === true">

                                Show preview</label>
                                </div>
                                <div class="input-group-prepend">
                                    <label class="input-group-text">
                                        <input v-model="is_public" type="checkbox" 
                                        v-bind:value="is_public">
                                        Public
                                    </label>
                                </div>


                            </div>
                        </div>
                        <div class="float-right">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">new tag</div>
                                </div>
                                <input v-model="new_tag" type="text" 
                                class="form-control">

                                <button class="btn btn-primary"
                                    @click.prevent="savePost(editId)">
                                    Save
                                </button>
                            </div><!-- end of new_tag input-group-->

                        </div><!-- end div.float-right-->
                    </div><!-- end of div.clearfix-->

                </form>
            </div><!-- end of form -->
            <div class="col-lg-12 show_preview" v-show="show_preview">
                <div class="card card-body">
                    <h1>{{title}}</h1>
                    <div v-html="excerpt">{{excerpt}}</div>
                    <div v-html="body">{{body}}</div>
                    <span>{{user_select_tag}} | {{new_tag}}</span>

                    <div class="text-center mb-4 pt-2">
                        <span class="alert alert-success"
                            v-if="is_public === '1' || is_public === true">
                            your post will be pubic</span>
                        <span class="alert alert-warning" v-else>
                            your post will be private.
                        </span>
                    </div>
                    <div v-show="editId !== 0"
                        class="old_tag">
                        <p class="alert alert-warning">
                            your current tag will be list at the below please 
                            make sure you have re-select it or just leave it 
                            un-select if you wish to remove your current tag
                        </p>
                        <span v-for="ut in user_old_tag"
                            class="old_tag">{{ut.tag_name}}</span>
                    </div>
                </div>
            </div>
            <post-list
                :postlist="postlist"
                :tag_all="tag_all"
                :tag_with_content="tag_with_content"
                @readPost="readPost($event)"
                @getPostList="getPostList($event)"
                @editPost="editPost($event)"
                @delPost="delPost($event)"></post-list>
            <Tagmember 
            :tag_all="tag_all"
            :tag_with_content="tag_with_content"
            @getPostsByTagId="getPostsByTagId($event)"></Tagmember>
            <b-modal ref="onOk" title="Message Box" ok-only>
                <div v-html="res_status">{{res_status}}</div>
            </b-modal>
        </div><!-- end of .row -->
    </div><!-- end of main div -->

</template>

<style scoped>

.show_preview{
    padding:2px;
    margin-top:2em;
}

.old_tag span{
    padding:8px 16px;
    background-color:#e7e7e7;
}




</style>

<script>
import PostList from './PostList.vue'
import Tagmember from './PostTag.vue'
import JoditEditor from 'jodit-vue'
export default{

    components:{
        Tagmember,
        PostList,
    }
    ,data(){
        return{
            postlist: [],
            tag_with_content:[],
            tag_all: [],
            title:'',
            editId: 0,
            excerpt: '',
            body:'',
            new_tag: '',
            user_select_tag: [],
            user_old_tag:[],
            tags:[]
            ,show_preview:false,
            is_public:false,
            res_status:'',
            error:0,
            custom_rule:''

        }
    }
    ,mounted(){
        this.custom_rule = `<div class="alert alert-warning">
    <p>you have som Error in your form please make sure that
    your information did not meet any of the below rules</p>
        <ul class="list-group">
            <li class="list-group-item">you have an empty field or less text!</li>
            <li class="list-group-item">the new tag cannot be the same name as the 
            current list tags</li>
            <li class="list-group-item">
please check your form again!
            </li>
        </ul>
            </div>`;
        this.getPostList()
    }
    ,methods:{
        getPostList(page){
            let url = '';
            if(page){
                url = page
                this.$cookies.set("member_post_page",url)
            }
            url = this.$cookies.get("member_post_page")
            if(!url){
                url = '/member/getPosts'
            }

            axios.get(url)
                .then(res=>{
                    this.postlist = res.data.posts;
                    this.tag_with_content = res.data.tag_with_content;
                    this.tag_all = res.data.tag_all;
                })
        },
        editPost(id){
            let url = `/member/posts/${id}/edit`
            axios.get(url)
                .then(res=>{
                    let rData = res.data.post
                    this.title = rData.post_title
                    this.editId = rData.id;
                    this.body = rData.post_body
                    this.excerpt = rData.post_excerpt
                    this.tags = rData.tags
                    this.new_tag = ''
                    this.user_select_tag = []
                    this.user_old_tag = rData.tags;
                    this.is_public = rData.is_public;
                    if(this.is_public !== '1'){
                        this.is_public = false
                    }
                    this.$refs.title.focus()
                    console.log(this.is_public)
                })
        },
        savePost(id){
            let url = '';
            let data = {
                title:this.title,
                excerpt:this.excerpt,
                body:this.body,
                tags:this.user_select_tag,
                new_tag:this.new_tag,
                is_public:this.is_public
                
            }
            if(id){
                url = `/member/posts/${id}`
                axios.put(url,data)
                    .then(res=>{
                        this.$refs["onOk"].show()
                        this.res_status = res.data.msg
                        this.error =0
                    })
                    .catch(error=>{
                        this.res_status = `<span class="alert alert-danger">
                            Error! your input ${error.response.message}`
                        this.error = 1;
                        //this.$refs["onOk"].show()
                    })
            }else{
                url = `/member/posts`
                axios.post(url,data)
                    .then(res=>{
                        this.res_status = res.data.msg
                        this.$refs["onOk"].show()
                        this.error = 0
                    })
                    .catch(error=>{
                        this.res_status = `<span class="alert alert-danger">
                            Error! your input ${error.response.message}`
                        this.error = 1;
                            //this.$refs["onOk"].show()
                    })
            }

                setTimeout(()=>{
                    this.getPostList()
                    this.reNewFormData()
                },2500)
            
        },
        readPost(slug){
            let url = `/member/posts/${slug}`
            //alert(url)
            location.href=url
        },delPost(id){
            alert(`will delete post ${id}`)
        },
        reNewFormData(){
            if(this.error === 1){
                this.res_status = this.custom_rule
                this.$refs['onOk'].show()
            }else{
                this.res_status = ''
                this.title = ''
                this.excerpt = ''
                this.is_public = false
                //this.res_status = ''
                this.body = ''
                this.show_preview = ''
                this.user_select_tag = []
                this.user_old_tag = ''
                this.new_tag = ''
            }
        },
        getPostsByTagId(tagName){
            let url = `/member/getPostsByTagId?tag=${tagName}`
            location.href=url
        },
    }
}

</script>
