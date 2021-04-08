<template>
    <div>
        <form>
            <div class="form-group">
                <select id="" 
                    class="form-control" :disabled="disabled"
                    @change="setTemplate"
                    ref="getTemplate">
                    <option value="0">
                    -- Select --
                    </option>
                    <option 
                    v-for="li in template"
                    :value="li.id">{{li.title}}</option>
                </select>
            </div>
            <div class="form-group">
                <input v-model="title" 
                ref="title"
                class="form-control" type="text" 
                placeholder="Enter the title">
            </div>
            <div class="form-group">
                <jodit-editor
                    v-model="body"
                    height=550
                    placeholder="What's in your mind?"
                    ></jodit-editor>
            </div><!-- end of div.form-group jodit -->

            <div class="clearfix">
                <div class="float-left">
                    <div class="form-group">
                        <label>
                            <input v-model="is_public" 
                            type="checkbox"
                            class="form-control"
                            :true-value="'1'"
                            v-bind:value="is_public">
                            <span class="badge badge-warning"
                                v-if="is_public !== '1' || is_public === false">
                                No! I don't want to public my post
                            </span>
                            <span v-else 
                                class="badge badge-success">
                                Yes! I want to public my post
                            </span>
                        </label><!-- end label -->
                    </div>
                </div><!-- end div.float-left -->

                <div class="float-right">
                    <button class="btn btn-outline-primary btn-sm"
                        @click.prevent="saveWhatnews(saveId)">Post</button>

                    <button class="btn btn-outline-danger btn-sm"
                        @click.prevent="clearForm">clear </button>
                </div>
            </div><!-- end div.clearfix-->

        </form>
        <b-modal title="Server Said :" size="xl" ref="onOk" ok-only>
            <span v-html="res_status">
                {{res_status}}
            </span>
        </b-modal>
    </div>
</template>


<script>

import JoditEditor from 'jodit-vue'


export default{
    name:"WhatnewsForm",
    props:["editId","template","whatnews"],
    data(){
        return{
            title:'',
            body:'',
            res_status:'',
            is_public:false,
            saveId:0,
            disabled:false,
        }
    },
    watch:{
        "editId":function(x){
            this.getEditData(x)
        }
    },
    methods:{

        getEditData(x){
            this.disabled = true
            this.is_public = !this.is_public
            if(x == 0){
                return
            }
            this.whatnews.data.forEach((val)=>{
                if(val.id == x){
                    this.title = val.whatnews_title
                    this.$refs.title.focus()
                    this.saveId = val.id
                    this.body = val.whatnews_body 
                    this.is_public = val.is_public
                    
                    
                }
            })
        },
        setTemplate(){
            let tm = this.$refs.getTemplate.value
            this.template.forEach((val)=>{
                if(val.id == tm){
                    this.title = val.title+` please edit me`
                    this.$refs.title.focus()
                    this.body = val.excerpt
                }
            })
            setTimeout(()=>{
                this.$refs.getTemplate.value = 0
            },2500)
        },
        saveWhatnews(id){
            let url = ""
            let data = {
                title:this.title,
                body:this.body,
                is_public:this.is_public
            }
            if(id){

                url = `/admin/whatnews/${id}`
                axios.put(url,data)
                    .then(res=>{
                        this.res_status = res.data.msg
                    },err=>{
                        this.status = `<span class="alert alert-danger">
                            ${err.response.data.message}</span>`
                    })
            }else{
                url = `/admin/whatnews`
                axios.post(url,data)
                    .then(res=>{
                        this.res_status = res.data.msg
                    },err=>{
                        this.status = `<span class="alert alert-danger">
                            ${err.response.data.message}</span>`
                    })
            }
            this.$refs["onOk"].show()
            setTimeout(()=>{
                this.$emit('getWhatnewsList')
                this.clearForm()
            },2000)
        },
        clearForm(){
            this.res_status = ''
            this.$refs["onOk"].hide()
            this.saveId = 0 
            this.title = ''
            this.body = ''
            this.is_public = 0
            this.disabled = false

        },


    },
}
</script>
