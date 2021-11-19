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
                <input v-model="wnForm.title" 
                ref="title"
                class="form-control" type="text" 
                placeholder="Enter the title">
            </div>
            <div class="form-group">
                <jodit-editor
                    v-model="wnForm.body"
                    height=550
                    placeholder="What's in your mind?"
                    ></jodit-editor>
            </div><!-- end of div.form-group jodit -->

            <!-- status checkbox and button START -->
            <div class="row">
                <div class="col-lg-6">
                   <span v-html="res_status">{{res_status}}</span>
                </div>
                <div class="col-lg-2">
                        <label>
                            <input v-model="wnForm.is_public" 
                            type="checkbox"
                            class="form-control"
                           >
                            <span class="badge badge-warning p-2 mt-2"
                                v-if="!wnForm.is_public">
                                No! I don't want to public my post
                            </span>
                            <span v-else 
                                class="badge badge-success p-2 mt-2">
                                Yes! I want to public my post
                            </span>
                        </label><!-- end label -->
                </div><!-- end of div.col-lg-4 checkbox -->
                <div class="col-lg-4">
                    <div class="float-right btn-group">
                        <button class="btn btn-outline-primary btn-sm"
                            type="submit"
                            @click.prevent="saveWhatnews(saveId)">Post</button>

                        <button class="btn btn-outline-danger btn-sm"
                            @click.prevent="clearForm">clear </button>
                    </div>
                </div>
            </div>
            <!-- status checkbox and button END -->


        </form>
        <b-modal title="Server Said :" size="xl" ref="onOk" ok-only>
            <span v-html="res_status">
                {{res_status}}
            </span>
        </b-modal>
        <div class="col-lg-12 mt-4 mb-4">
            <p>&nbsp;</p>
        </div>
    </div>
</template>


<script>

import JoditEditor from 'jodit-vue'


export default{
    name:"WhatnewsForm",
    props:["editId","template","whatnews"],
    data(){
        return{
            wnForm:new Form({
                title:'',
                body:'',
                is_public:0,
            }),
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
            this.clearForm()
            if(x != 0){
                this.whatnews.data.forEach((val)=>{
                    if(val.id == x){
                        this.wnForm.title = val.whatnews_title
                        this.$refs.title.focus()
                        this.saveId = val.id
                        this.wnForm.body = val.whatnews_body 

                        if(val.is_public != 0){
                            this.wnForm.is_public = true
                        }
                        
                        
                    }
                })
            }
        },
        setTemplate(){
            let tm = this.$refs.getTemplate.value
            this.template.forEach((val)=>{
                if(val.id == tm){
                    this.wnForm.title = val.title+` please edit me`
                    this.$refs.title.focus()
                    this.wnForm.body = val.excerpt
                }
            })
            setTimeout(()=>{
                this.$refs.getTemplate.value = 0
            },2500)
        },
        saveWhatnews(id){
            let url = `/admin/whatnews`
            
                if(id){
                    url = `/admin/whatnews/${id}`
                    this.wnForm.submit('put',url)
                        .then((res)=>{
                            this.res_status = res.msg
                            this.$emit('box',this.res_status)
                                })
                    .catch((err)=>{
                        this.res_status = `<span class="alert alert-danger">
                        ${Object.values(err).join()}</span>`
                            })
                }else{
                    this.wnForm.submit('post',url)
                        .then((res)=>{
                            this.res_status = res.msg
                            this.$emit('box',this.res_status)
                                })
                    .catch((err)=>{
                        this.res_status = `<span class="alert alert-danger">
                        ${Object.values(err).join()}</span>`
                            })
                }


            setTimeout(()=>{
                this.$emit('getWhatnewsList')
                this.clearForm()
                    },3200)

        },
        clearForm(){
            this.res_status = ''
            this.$refs["onOk"].hide()
            this.saveId = 0 
            this.disabled = false
            this.wnForm.reset()

        },


    },
}
</script>
