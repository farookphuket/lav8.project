<template>
    <div>
        <form action="">
            <div class="form-group">
                <select class="form-control" ref="getTemplate"
                    @change="setTemplate" :disabled="disabled">
                    <option value="0">-- Select template --</option>
                    <option v-for="li in templates" 
                            :value="li.id">{{li.title}}</option>
                </select>
            </div>
            <div class="form-group">
                <input v-model="title" class="form-control" 
                    type="text" ref="title" 
            placeholder="Enter the title eg : this is the title of your post"
                    @keyup="makeSlug(title)">
            </div>
            <div class="form-group">
                <input v-model="slug" class="form-control" type="text" 
                    placeholder="Please leave this field blank">
            </div>
            <div class="form-group">
                <jodit-editor
                    v-model="excerpt"
                    height=550></jodit-editor>
            </div>
            <div class="form-group">
                <jodit-editor
                    v-model="body"
                    height=550></jodit-editor>
            </div>

            <div class="clearfix">
                <div class="float-left">
                    <div class="tags">
                        <ul>
                            <li v-for="li in tags">

                                <input v-model="user_select_tag"  
                                       :value="li.id"
                                type="checkbox"> 
                                <span>
                                    {{li.tag_name}}
                                </span>
                                
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
            
            <div class="form-row">
                <div class="form-group col-md-4"
                     v-html="res_status">
                    {{res_status}}
                </div>
                <div class="form-group col-md-4">
                    <input v-model="new_tag" class="form-control"
                    placeholder="Create new Tag">
                </div>
                <div class="form-group col-md-4">
                    <div class="clearfix">
                        <div class="float-left">
                            <label>
                                <input v-model="is_public" 
                                class="form-control" type="checkbox">
                                <span class="badge badge-warning"
                                      v-if="is_public == false">
                                    No, Keep it private
                                </span>
                                <span class="badge badge-success"
                                    v-else>
                                    Yes, Publish this post
                                </span>
                            </label>
                        </div>
                        <div class="float-right">
                            <button class="btn btn-outline-primary btn-sm"
                                @click.prevent="postSave(saveId)">Save</button>
                            <button class="btn btn-outline-danger btn-sm"
                                @click.prevent="clearFormData">Clear</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>

        <b-modal
            ref="onOk" 
            @ok="closeBox"
            centered ok-only>
           <div v-html="res_status">
               {{res_status}}
           </div>
        </b-modal>
    </div>
</template>
<style scoped>

.tags{
    color:white;
    font-weight:bold;
}

.selected{
    color:red;
}
.tags li{
    padding:5px;
}
</style>

<script>
import JoditEditor from 'jodit-vue'
export default{
    name:"PostForm",
    props:["editId","templates","tags"],
    mounted(){

    },
    watch:{
        "editId":function(x){
            this.getEditData(x)
        }
    },
    data(){
        return{
            disabled:false,
            saveId:0,
            title:'',
            slug:'',
            new_tag:'',
            excerpt:'',
            body:'',
            is_public:0,
            user_select_tag:[],
            error:0,
            res_status:'',
        }
    },
    methods:{
        makeSlug(slug){
            let make_slug = slug.replace(/\s+/g,"-")
            .replace(/[^\u0E00-\u0E7F\w\-]+/g,'')            
            .replace(/\-\-+/g,'-')
            .replace(/^-+/,'')
            .toLowerCase()
            this.slug = make_slug
           return make_slug
        },
        setTemplate(){
            let tmp = this.$refs.getTemplate.value
            let url = `/admin/templates/${tmp}`
            axios.get(url)
                .then(res=>{
                    let tData = res.data.template
                    this.title = tData.title
                    this.excerpt = tData.excerpt
                    this.body = tData.body
                })
            setTimeout(()=>{
                this.$refs.getTemplate.value = 0
            },2500)
        },
        getEditData(id){
            /* 
            the template should not be able to select on the edit mode 
            fixed 10 Apr 2021
            */ 
            (!this.editId || id == this.editId)?this.disabled = true:this.disabled = false

            this.user_select_tag = []
            this.is_public = false
            let url = `/admin/post/${id}/edit`
            axios.get(url)
                .then(res=>{
                    let fData = res.data.post
                    this.title = fData.post_title
                    this.$refs.title.focus()
                    this.slug = fData.slug
                    this.excerpt = fData.post_excerpt
                    this.body = fData.post_body
                    this.saveId = fData.id
                    if(fData.is_public != '0'){
                        this.is_public = true
                    }
                    //console.log(fData)
                    fData.tags.forEach((val)=>{
                        this.user_select_tag.push(val.id)
                    })
                })
        },
        postSave(id){
            let url = ''
            let data = {
                title:this.title,
                slug:this.slug,
                excerpt:this.excerpt,
                body:this.body,
                tags:this.user_select_tag,
                new_tag:this.new_tag,
                is_public:this.is_public
            }
            if(id){
                url = `/admin/post/${id}`
                axios.put(url,data)
                    .then(res=>{
                        this.error = 0
                        this.res_status = res.data.msg
                    },error=>{
                        this.error = 1
                        this.res_status = `<span class="badge badge-danger">
                            ${error.response.data.message}</span>`
                    })
            }else{
                url = `/admin/post`
                axios.post(url,data)
                    .then(res=>{
                        this.error = 0
                        this.res_status = res.data.msg
                    },error=>{
                        this.error = 1
                        this.res_status = `<span class="badge badge-danger">
                            ${error.response.data.message}</span>`
                    })
            }

            this.$refs["onOk"].show()
        },
        closeBox(){
            this.clearFormData()
            setTimeout(()=>{
                this.res_status = ''
                this.$emit('getPostList')
            },2500)
        },
        clearFormData(){
            if(this.error == 1){
                return
            }else{
                this.saveId = 0
                this.title = ''
                this.excerpt = ''
                this.new_tag = ''
                this.slug = ''
                this.body = ''
                this.user_select_tag = []
                this.res_status = ''
                this.is_public = false

            }
        },

    },

}
</script>
