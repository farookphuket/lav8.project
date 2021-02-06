<template>

    <div class="contaniner-fluid">

            <div class="container">
                <form >

                    <div class="form-group">
                        <jodit-editor
                            v-model="excerpt"
                            height=450></jodit-editor>
                    </div><!--  end of div.form-group-->
                    <div class="form-group">
                        <jodit-editor
                            v-model="body"
                            height=450></jodit-editor>
                    </div><!--  end of div.form-group-->
                    <div class="clearfix">
                        <div class="float-left">
                            <span v-html="res_status">
                                {{res_status}}
                            </span>
                        </div>
                        <div class="float-right">
                            <button 
                             @click.prevent="savePage(editId)"
                                class="btn btn-primary">
                                Save
                            </button>
                        </div>
                    </div><!--  end of div.clearfix -->
                </form>
            </div>
            <div class="container">
                <div class="preview">
                    <div class="card card-body">
                        <div v-html="excerpt">{{excerpt}}</div>
                        <div v-html="body">{{body}}</div>
                    </div>
                </div>
            </div>
    </div>
</template>

<style scoped>
.card-body{
    margin-top:2em;
    margin-bottom:4em;
}
</style>

<script>


import JoditEditor from 'jodit-vue'

export default{
    name:"AdminAbout",
    props:["about"],
    data(){
        return{
            excerpt:'',
            body:'',
            editId:0,
            res_status:''
        }
    },
    mounted(){
        this.getAbout()
    },
    methods:{
        getAbout(){
            //alert('this about')
            if(this.about){
                this.about.forEach((val)=>{
                    this.excerpt = val.post_excerpt
                    this.body = val.post_body
                    this.editId = val.id
                })
            }else{
                this.editId = 0;
            }
            
        },
        savePage(id){
            let url = ``
            let data = {
                is_public:true,
                title:"about",
                excerpt:this.excerpt,
                body:this.body
            }
            if(!id){
                url = '/admin/post'
                axios.post(url,data)
                    .then(res=>{
                        this.res_status = res.data.msg
                    })
            }else{
                url = `/admin/post/${id}`
                axios.put(url,data)
                    .then(res=>{
                        this.res_status = res.data.msg
                    })
            }
            setTimeout(()=>{
                this.res_status = ''
                location.reload()
            },2500)
        }
    }
}
</script>
