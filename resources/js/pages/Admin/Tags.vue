<template>
    <div class="col-lg-12">

        <tag-form :editId="editId" 
            @getTags="getTags($event)"></tag-form>

        <tag-list :tags="tags"
            @goReadPost="goReadPost($event)"
            @getTags="getTags($event)"
            @tagDelete="tagDelete($event)"
            @tagEdit="tagEdit($event)"
            ></tag-list>

        <b-modal title="response message"
            ref="onOk" centered ok-only>
            <div v-html="res_status">
                {{res_status}}
            </div>
        </b-modal>
    </div>

</template>


<script>

import TagForm from './TagForm.vue'
import TagList from './TagList.vue'
export default{

   // props:["tags"],
    components:{
        TagForm,
        TagList
    },
    data(){
        return{
            tags:[],
            editId:0,
            res_status:'',
            error:0,
        }
    },
    mounted(){
        this.getTags()

    },
    methods:{
        getTags(page){
            this.editId = 0
            let url = ''
            if(page){
                url = page
                this.$cookies.set("old_admin_tag_page",url)
            }
            url = this.$cookies.get("old_admin_tag_page")
            if(!url){
                url = `/admin/getTags`
            }
            axios.get(url)
                .then(res=>{
                    this.tags = res.data.tags

                },err=>{
                    console.log(`Error code ${err}`)
                })
        },
        goReadPost(slug){
            let url = `/admin/post/${slug}`
            location.href=url
        },
        tagEdit(id){
            this.editId = id
        },
        
        tagDelete(id){
            if(confirm(`This will remove the id ${id} are you sure?`) == true){
                let url = `/admin/tags/${id}`
                axios.delete(url)
                    .then(res=>{
                        this.res_status = res.data.msg
                        this.error = 0
                    },err=>{
                        this.error = 1
                        this.res_status = err.response.data.message
                    })
            }else{
                return
            }
            setTimeout(()=>{
                this.getTags()
            },2500)
        },
    }

}


</script>
