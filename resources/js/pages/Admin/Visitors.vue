<template>
    <div class="container-fluid">
            <visitor-form
                @resetVisitor="resetVisitor($event)"></visitor-form>
            <visitor-list @getVisitors="getVisitors($event)"
          @delSelect="delSelect($event)" :visitors="visitors"></visitor-list>

        <b-modal title="server response :" ref="onOk" @ok="closeBox" ok-only>
            <div v-html="res_status">
                {{res_status}}
            </div>
        </b-modal>
    </div>
</template>


<script>
import VisitorForm from './VisitorForm.vue'
import VisitorList from './VisitorList.vue'
export default{
    name:"Avisitor",
    components:{
        VisitorForm,
        VisitorList
    },
    data(){
        return{
            visitors:[],
            editId:0,
            res_status:'',

        }
    },
    mounted(){
        this.getVisitors()
    },
    methods:{
        getVisitors(page){
            let url = ''
            if(page){
                url = page
                this.$cookies.set("old_visitor_page",url)
            }
            url = this.$cookies.get("old_visitor_page")
            if(!url){
                url = `/admin/getVisitorList`
            }
            axios.get(url)
                .then(res=>{
                    this.visitors = res.data.visitors
                })

        },
        delSelect(id){
            let url = `/admin/visitors/${id}`
            axios.delete(url)
                .then(res=>{
                    this.res_status = res.data.msg

                },err=>{
                    this.res_status = err.response.data.message
                })
            this.$refs["onOk"].show()
        },
        closeBox(){
            this.getVisitors()
        },
        resetVisitor(x){
            if(confirm(`This will be remove all of the record\n 
            are you sure?`)==true){
                let url = `/admin/resetVisitor`
                axios.get(url)
                    .then(res=>{
                        this.res_status = res.data.msg
                        
                    },err=>{
                        this.res_status = `<span class="badge badge-danger">
                            ${err.response.data.message}</span>`
                    })
                if(this.$cookies.isKey("old_visitor_page")){
                    this.$cookies.remove("old_visitor_page")
                }
                this.$refs["onOk"].show()
            }else{
                return
            }
        }

    }

}
</script>
