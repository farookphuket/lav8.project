<template>

<div class="contaniner-fluid">
    <div class="container">
        <about-form :editId="editId" :about="about"
            :template="template"></about-form>
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

import AboutForm from './AboutForm.vue'
import JoditEditor from 'jodit-vue'

export default{
    name:"AdminAbout",
    props:["about","template"],
    components:{
        AboutForm,
    },
    data(){
        return{
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
