<template>
<div>
<form >
    <div class="form-group">
        <input v-model="section" class="form-control" 
        placeholder="Enter section eg : whatnews,post" type="text">
    </div>
    <div class="form-group">
        <input v-model="title" class="form-control" 
            ref="title" placeholder="Enter title eg : whatnews template"
        type="text">
    </div>
    <div class="form-group">
        <jodit-editor
            height="550"
            v-model="excerpt"
            ></jodit-editor>
    </div>

    <div class="form-group">
        <jodit-editor
            height="550"
            v-model="body"
            ></jodit-editor>
    </div>
    <div class="clearfix">
        <div class="float-left">
            <div v-html="res_status">{{res_status}}</div>
            <ul v-show="errMsg">
                <li v-for="li in errMsg">
                    {{li.title}}
                </li>
            </ul>
        </div>
       <div class="float-right">
       <button type="submit"
       class="btn btn-outline-primary btn-sm "
                @click.prevent="saveTmp(saveId)">Save</button>

            <button 
                class="btn btn-outline-danger btn-sm"
                @click.prevent="clearFormData()">Clear</button>
       </div>
       <p class="pt-4 mb-4">&nbsp;</p>
    </div>
</form>

</div>

</template>



<script>

import JoditEditor from 'jodit-vue'
export default{
    name:"TemplateForm",
    props:["editId"],

    data(){
        return{
            title:'',
            section:'',
            saveId:'',
            excerpt:'',
            body: '',
            res_status:'',
            error:0,
            errMsg:[]
        }
    },
    watch:{
        "editId":function(x){
            this.getData(x)

        }
    },
    mounted(){
        this.getXX2()
    },
    methods:{
        getXX2(){
            this.$emit("getTemplates")
        },
        clearFormData(){
            if(this.error == 0){
                this.saveId = 0
                this.res_status = ''
                this.section = ''
                this.excerpt = ''
                this.body = ''
                this.title = ''
            }else{
                alert(`Sorry! but there is still error on page`)
            }
            this.$emit('getTemplates')
            setTimeout(()=>{
                this.res_status = ''
            },200)
        },
        getData(xi){
            if(xi == 0){
                return
            }
            let url = `/admin/templates/${xi}`
            axios.get(url)
                .then(res=>{
                    let fData = res.data.template
                    this.title = fData.title
                    this.$refs.title.focus()
                    this.section = fData.section
                    this.excerpt = fData.excerpt
                    this.body = fData.body
                    this.saveId = fData.id
                })
        },
        saveTmp(id){
            let url = ''
            let data = {
                title:this.title,
                section:this.section,
                excerpt:this.excerpt,
                body:this.body
            }
            if(id){
                url = `/admin/templates/${id}`
                axios.put(url,data)
                    .then(res=>{
                        this.res_status = res.data.msg
                        this.error = 0;
                    },error=>{
                        this.res_status = `<span class="badge badge-danger">
                           ${error.message}</span>`
                        this.error = 1;
                    })
            }else{
                url = `/admin/templates`
                axios.post(url,data)
                    .then(res=>{
                       this.res_status = res.data.msg 
                        this.error = 0;
                    },error=>{
                        //console.log(error.message)
                        this.res_status = `<span class="badge badge-danger">
                           ${error.message}</span>`
                        this.error = 1;
                    })
            }
            setTimeout(()=>{
                this.clearFormData()
            },2500)
        }
    }
}
</script>
