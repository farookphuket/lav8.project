<template>


    <div class="container-fluid">
        <div class="container">
            <h1>What's going on</h1>

            <div class="form">
                <form>
                    <div class="form-group">
                        <select id="" 
                            class="form-control"
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
                            <button class="btn btn-primary"
                                @click.prevent="saveWhat(editId)">Post</button>
                        </div>
                    </div><!-- end div.clearfix-->

                </form>

                <b-modal 
                    @click="reSetForm()"
                    ref="onOk"
                    title="Messassge box" ok-only>
                    <div v-html="res_status">
                        {{res_status}}
                    </div>
                </b-modal>
            </div>
        </div>
        <!-- end of div.container -->

        <whatnews-list
            @goToPage="getWhatnewsList($event)"
            @goEdit="goEdit($event)"
            @goDel="goDel($event)"
            @goRead="goRead($event)"
            :wnlist="wnlist"></whatnews-list>
    </div>
</template>

<style scoped>
.form{
    margin-bottom:5em;
}



</style>


<script>

    import WhatnewsList from './WhatnewsList.vue'

    import JoditEditor from 'jodit-vue'

export default{


    props:["template"],
    name:"Adminwm",
    components:{
        WhatnewsList
    },
    data(){
        return{
           wnlist:[],
            title:'',
            body:'',
            editId:'',
            is_public:'',
            show_preview:false,
            error:0,
            error_msg:'',
            res_status:''
        }
    },
    mounted(){
        this.getWhatnewsList()
    },
    methods:{
        
        getWhatnewsList(page){
            let url = ''
            if(page){
                url = page
                this.$cookies.set("awn_old_page",url)
            }
            url = this.$cookies.get("awn_old_page")
            if(!url){
                url = `/admin/whatnews`
            }

            axios.get(url)
                .then(res=>{
                    this.wnlist = res.data.whatnews
                })
        },
        setTemplate(){
            let tmp = this.$refs.getTemplate.value
            let url = `/admin/templates/${tmp}`
            axios.get(url)
                .then(res=>{
                    this.title = res.data.template.title 
                    this.body = res.data.template.excerpt
                })
        },
        goRead(id){
            let url = `/admin/whatnews/${id}`
            location.href=url
        },
        goEdit(id){
            let url = `/admin/whatnews/${id}/edit`
            axios.get(url)
                .then(res=>{
                    //console.log(res.data.wm)
                    let data = res.data.wm
                    this.title = data.whatnews_title 
                    this.body = data.whatnews_body
                    this.editId = data.id
                    this.is_public = data.is_public
                    if(data.is_public !== '1'){
                        this.is_public = false
                    }
                    this.$refs.title.focus()
                })
        },
        saveWhat(id){
            let url ='';
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
                        this.error = 0
                    }).catch(err=>{
                        this.error = 1
                        this.error_msg = err.response.message
                        this.res_status = this.error_msg
                    })
            }else{
                url = `/admin/whatnews`
                axios.post(url,data)
                    .then(res=>{
                        this.res_status = res.data.msg
                        this.error = 0

                    }).catch(err=>{
                        this.error = 1
                        this.error_msg = err.message
                        this.res_status = this.error_msg
                    })
            }


                this.showModal()
            setTimeout(()=>{
                this.getWhatnewsList()
                this.reSetForm()
            },2500)
        },
        showModal(){
            this.$refs["onOk"].show()
        },
        reSetForm(){
            if(this.error !== 0){
                
                this.res_status = `<span class="alert alert-danger">
                    Sorry! 
                    ${this.res_status}
                    </span>`

            }else{
                this.$refs["onOk"].hide()
                this.editId = 0
                this.$refs.getTemplate.value = 0
                this.title = ''
                this.body =''
                this.res_status = ''
                this.error_msg = ''
                this.error = 0
                this.is_public = 0
            }


        },
        goDel(id){
            let url = `/admin/whatnews/${id}`
            axios.delete(url)
                .then(res=>{
                    this.res_status = res.data.msg
                })

          this.showModal()  
            setTimeout(()=>{
                this.getWhatnewsList()
            },2500)
        },
    }

}
</script>
