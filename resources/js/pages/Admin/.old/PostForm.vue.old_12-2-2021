<template>


    <div class="container">
                <form>
                    <div class="form-group">
                        <select class="form-control"
                            @change="setTemplate"
                            ref="getTemplate">
                            <option value="0">--Select --</option>
                            <option v-for="li in template" 
                                    :value="li.id">{{li.title}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <input ref="title" class="form-control" 
                        type="text" 
                        v-on:keyup="makeSlug()"
                        placeholder="Enter the post title"
                        v-model="title"
                        required>
                    </div>

                    <div class="form-group">
                        <input ref="slug" class="form-control" 
                        type="text" 
                        placeholder="Enter slug or leave blank"
                        v-model="slug"
                        required>
                    </div>
                    <div class="form-group">
                        <jodit-editor
                            v-model="excerpt"
                            height="350"></jodit-editor>
                    </div>

                    <div class="form-group">
                        <jodit-editor
                            v-model="body"
                            height="550"></jodit-editor>
                    </div>

                    <!-- tags start-->
                    <div class="form-group tags_box">
                        <span v-for="li in tag_all" :tagId="li.id">
                            <label for="">
                                <input v-model="user_select_tags" 
                                v-bind:value="li.id"

                                @change="markSomeTag()"
                                type="checkbox">
                                {{li.id}} {{li.tag_name}} 
                            </label>
                        </span>
                        <p>user select :{{user_select_tags}} 
                        create new tag :{{new_tag}}</p>
                        <div v-if="editId">
                            <p>your current tag will be remove please 
                            re-check again</p>
                            <span class="badge badge-default" 
                                v-for="li in current_user_tag"
                                :tagId="li.pivot.tag_id">
                                {{li.tag_name}}
                            </span>
                        </div>
                    </div><!-- tags -->
                    <div class="clearfix">
                        <div class="float-left">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <label class="input-group-text">
                                        <input v-model="isSelectAll" 
                                        type="checkbox" 
                                        v-bind:value="isSelectAll"
                                        @click="markAllTags()">
                                        &nbsp;select all
                                    </label>
                                </div><!-- select all-->
                                <div class="input-group-prepend">
                                    <label class="input-group-text">
                                        <input v-model="is_public" 
                                        type="checkbox" 
                                        v-bind:value="is_public"
                                        v-bind:true-value="1">
                                        &nbsp;Public?
                                    </label>
                                </div><!-- is_public-->
                            </div><!-- input group all -->
                            
                        </div><!-- float-left -->
                        <div class="float-right">
                            <div class="btn-group">
                                <div class="input-group">
                                    <input v-model="new_tag" 
                                    class="form-control" 
                                    placeholder="create new tag"
                                    type="text" ref="new_tag">
                                </div>
                                <div class="input-group-append">
                                    <button class="btn btn-primary"
                                        @click.prevent="savePost(editId)">
                                        Save
                                    </button>
                                    <button class="btn btn-danger"
                                            @click.prevent="makeResetForm">
                                        Clear</button>
                                </div>
                            </div>
                        </div>
                    </div><!-- end of div.clearfix -->
                    <div class="form-group">
                        <span v-html="res_status">{{res_status}}</span>
                    </div>
                </form>
            
            <b-modal ref="onOk"
                title="response message" 
                @ok="modClose(error)"
                ok-only>
                <div v-html="res_status">{{res_status}}</div>
            </b-modal>
            <postlist :posts="posts" 
            @editPost="editPost($event)"
            @delPost="delPost($event)"
            @getPostsList="getPostsList($event)"
            ></postlist>
            <post-tags :tag_all="tag_all"
                :tag_has_content="tag_has_content"
                @sendToPage='sendToPage($event)'></post-tags>
            
    </div><!-- End of main element -->

</template>

<style scoped>
.tags_box{
    padding:2px;
}

.tags_box span{
    padding:6px 16px;
    background-color:#17a2b8;
    font-size:12px;
    font-weight:bold;
    color:white;
}
.tags_box .badge{
    background-color:#6c757d;
    font-weight:bold;
    font-size:16px;
    color:red;
}
</style>


<script>

import Postlist from './PostList.vue'

import PostTags from './PostTags.vue'
var moment = require("moment")

import JoditEditor from "jodit-vue"

export default{
    props:{
        template:{
            type: Array
        }
    },
    components:{
        Postlist,
        PostTags
    },
    data(){
        return{
            posts : [],
            tag_has_content: [],
            tag_all: [],
            user_select_tags:[],
            current_user_tag:[],
            tag_to_show: [],
            isSelectAll:false,
            title: '',
            slug:'',
            excerpt: '',
            editId: '',
            body: '',
            is_public: '',
            new_tag:'',
            res_status:'',
            error:0,
        };
    },
    created(){
        this.getPostsList();
        this.makeResetForm();
    },
    methods:{
        tagUserSelected(){
            for(var key in this.tag_all){
                this.tag_id.push(this.tag_all[key].id);
            }

        },
        markAllTags(){
            this.isSelectAll = !this.isSelectAll;
            if(this.isSelectAll){
                for(var key in this.tag_all){
                    this.user_select_tags.push(this.tag_all[key].id);
                }
            }else{
                this.user_select_tags = [];
                this.tag_to_show = [];
            }
        },
        markSomeTag(){
            if(this.user_select_tags.length === this.tag_all.length){
                this.isSelectAll = true
            }else{
                this.isSelectAll = false;
            }
        },
        setTemplate(){
            let tmp = this.$refs.getTemplate.value
            let url = `/admin/templates/${tmp}`
            axios.get(url)
                .then(res=>{
                    let get_tmp = res.data.template
                    this.title = `you are using ${get_tmp.title}`
                    this.excerpt = get_tmp.excerpt
                    this.body = get_tmp.body
                    setTimeout(()=>{
                        this.$refs.getTemplate.value = 0
                    },2500)
                    
                })
        },
        getPostsList(page){
            let url = '';
            if(page){
                url = page
                this.$cookies.set("post_old_page",url)
            }
            url = this.$cookies.get("post_old_page");
            if(!url){
                url = '/admin/getPosts'
            }
            axios.get(url)
                .then(res=>{
                    this.posts = res.data.posts;
                    this.tag_has_content = res.data.tag_with_content;
                    this.tag_all = res.data.tags;

                })

        },
        editPost(id){
            let url = `/admin/post/${id}/edit`;

            axios.get(url)
                .then(res=>{
                    let postData = res.data.post;
                    this.title = postData.post_title;
                    this.slug = postData.slug;
                    this.excerpt = postData.post_excerpt;
                    this.body = postData.post_body;
                    this.$refs.title.focus();
                    this.editId = postData.id;
                    this.current_user_tag = postData.tags;
                    this.is_public = postData.is_public;
                    //console.log(postData.is_public);
                })
        },
        savePost(id){
            let url ='';
            let data ={
                title:this.title,
                slug:this.makeSlug(),
                excerpt:this.excerpt,
                body: this.body,
                is_public: this.is_public,
                new_tag:this.new_tag,
                tags:this.user_select_tags
            };
            if(id){
                url = `/admin/post/${id}`;
                axios.put(url,data)
                    .then(res=>{
                        this.res_status = res.data.msg;
                        this.error = 0
                    })
                    .catch(err=>{
                        this.error = 1
                        this.res_status = `<span class="alert alert-danger">
                           Error! check your input</span> `
                    })
            }else{
                url = `/admin/post`
                axios.post(url,data)
                    .then(res=>{
                        this.res_status = res.data.msg
                    })
                    .catch(err=>{
                        this.error = 1
                        this.res_status = `<span class="alert alert-danger">
                           Error! check your input</span> `
                    })
            }
            this.$refs["onOk"].show()
          //  setTimeout(()=>{
          //      this.getPostsList()
          //      this.makeResetForm();
          //  },2500)
        },
        makeResetForm(){
            this.user_select_tags = [];
            this.is_public = 0;
            this.title = "";
            this.slug = ""
            this.excerpt = "";
            this.body = "";
            this.editId = 0;
            this.isSelectAll = false;
            this.new_tag = "";
            this.res_status = '';
        },
        modClose(error){
            if(!error){
                this.getPostsList()
                this.makeResetForm()
            }

        },
        delPost(id){
            let url = `/admin/post/${id}`
            axios.delete(url)
                .then(res=>{
                    this.res_status = res.data.msg
                    this.$refs["onOk"].show()
                })
        }
        ,sendToPage(id){
            let url = `/admin/getPostsByTag?tag=${id}`
            location.href=url
        },
        makeSlug(){
            let make_slug = this.title.replace(/\s+/g,"-")
            .replace(/[^\u0E00-\u0E7F\w\-]+/g,'')            
            .replace(/\-\-+/g,'-')
            .replace(/^-+/,'')
            .toLowerCase()
           return this.slug = make_slug
        },

    }

}

</script>
