<template>
    <div class="container-fluid">
        <h1 class="text-center">
            Template for post 
        </h1>
        <div class="clearfix">
            <div class="float-right">
                <p style="color:green">
                    last update 2 Apr 2021
                </p>
                <div class="btn-group mb-4 pt-2">
                    <button v-if="showTemplateForm == false" 
                        @click="showTemplateForm = true"
                        class="btn btn-outline-primary btn-sm">
                        Create New
                    </button>
                
                    <button v-else 
                        @click="showTemplateForm = false"
                        class="btn btn-outline-danger btn-sm">
                        Close
                    </button>
                </div>
            </div>
        </div>
        <template-form 
            @getTemplates="getTemplates($event)"
            :editId="editId" v-show="showTemplateForm"></template-form>


        <template-list 
            @editTemplate="editTemplate($event)"
            @delTemplate="delTemplate($event)"
            @getTemplates="getTemplates($event)"
            @tmpRead="tmpRead($event)"
            :templates="templates"></template-list>
        <b-modal title="message box" 
            ref="onOk"
            @ok="closeBox"
        ok-only>
        <span v-html="res_status">{{res_status}}</span>
        </b-modal>
    </div>

</template>


<script>
import TemplateForm from './TemplateForm.vue'
import TemplateList from './TemplateList.vue'
export default{
    name:"AdminTemplate",
    components:{
        TemplateList,
        TemplateForm
    },
    data(){
        return{
            templates:[],
            editId:0,
            res_status:'',
            showTemplateForm:false,
        }
    },
    mounted(){
        this.getTemplates()
    },
    methods:{
        getTemplates(page){
            this.editId = 0
            let url = ''
            if(page){
                //alert(page)
                url = page
                this.$cookies.set("old_page_tmp",url)
            }
            url = this.$cookies.get("old_page_tmp")
            if(!url){
                url = `/admin/getTemplates`
            }
            axios.get(url)
                .then(res=>{
                    this.templates = res.data.templates
                })
        },
        tmpRead(id){
            let url = `/admin/viewTemplate/${id}`
            location.href=url
        },
        editTemplate(id){
            this.editId = id
            this.showTemplateForm = true
        },
        delTemplate(id){
            if(confirm(`this will delete ${id}?`) == true){
                let url = `/admin/templates/${id}`
                axios.delete(url)
                    .then(res=>{
                        this.res_status = res.data.msg
                        this.$refs["onOk"].show()
                        
                    },err=>{
                        this.res_status = err.response.message
                        this.$refs["onOk"].show()
                    })
            }else{
                return
            }

        },
        closeBox(){
            this.getTemplates()
        }
    }
}
</script>
