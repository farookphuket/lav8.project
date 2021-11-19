<template>
<div>

<!-- form START -->
    <div class="col-lg-12 pt-4 mb-4">
        <form >

            <div class="form-group">
                <select name="template" class="form-control" 
@change="setTemplate"
                    ref="selectTemplate">
                    <option value="0">--Select Template --</option>
                    <option :value="tt.id" v-for="tt in template" 
                    >
                    {{tt.title}}
                    </option>
                </select>
            </div>
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
                     @click.prevent="saveAbout(saveId)"
                        class="btn btn-primary">
                        Save
                    </button>
                </div>
            </div><!--  end of div.clearfix -->
        </form>
    </div>
<!-- form END -->


    <div class="col-lg-12 mb-4 pt-4">
        <div class="preview">
            <div class="card card-body">
               <h1 class="text-center">About</h1>
                <div class="pt-4 mb-2" v-html="excerpt">{{excerpt}}</div>
                <div v-html="body">{{body}}</div>
            </div>
        </div>
    </div>

</div>




</template>


<script>

export default{
    name:"AboutForm",
    props:["template","editId","about"],
    data(){
        return{
            excerpt:'',
            body:'',
            saveId:'',
            res_status:''
        }
    },
    mounted(){
        this.showAbout()
    },
    methods:{
        saveAbout(id){
            let data = {
                title:'about',
                slug:'about',
                excerpt:this.excerpt,
                body:this.body,
                is_public:true
            }
            let url = ''
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
                location.reload()
            },3000)
        },
        showAbout(){
            if(!this.about.length){
                this.excerpt = `
                <div class="container">
                    <h2 class="text-center">Template!</h2>
                    <p>
                        you can select the template from the above select form
                    </p>
                </div>
                `
                this.body = `
                <div class="container">
                    <h2 class="text-center pt-2 mb-2">
                        your teams
                    </h2>
                    <p>tell people about your self</p>
                </div>

                `
            }else{
                this.about.forEach((val)=>{
                    this.excerpt = val.post_excerpt
                    this.body = val.post_body
                    this.saveId = val.id
                })
//                console.log(this.about)
            }

        },
        setTemplate(){
            let tm = this.$refs.selectTemplate.value 
            let url = `/admin/templates/${tm}`
            axios.get(url)
                .then(res=>{
                    let val = res.data.template
                        this.excerpt = val.excerpt
                        this.body = val.body
                })

        }
    },
}
</script>
