<template>
    <div>
        <div class="row">
            <div class="col-lg-12 pt-4 mb-4">
                <form>
                    <div class="form-group">
                        <input v-model="title" class="form-control" type="text" 
                        ref="title" placeholder="Video title">
                    </div>
                    <div class="form-group">
                        <textarea v-model="embed" class="form-control" 
                        name="" placeholder="embed code here"></textarea>
                    </div>
                    <div class="clearfix">
                        <div class="float-left">
                            <div v-html="res_status">
                                {{res_status}}
                            </div>
                        </div>
                        <div class="float-right">
                            <button class="btn btn-outline-primary" 
                            @click.prevent="saveVideo(saveId)">
                                Save
                            </button>

                            <button class="btn btn-outline-danger" 
                            @click.prevent="clearForm">
                                clear
                            </button>
                        </div>
                    </div>
                </form>
            </div><!-- end of div.col-lg-12 form -->
        </div><!-- end of div.row -->
    </div><!-- end of main div -->
</template>


<script>

export default{
    name:"VideoForm",
             data(){
                 return{
                    title:"",
                    embed:"" ,
                    saveId:0,
                    res_status:""
                 }
             },
             props:["editId","videos"],
watch:{
          "editId":function(x){
            this.getEditData(x)
          }
      },
methods:{
            getEditData(id){
                this.videos.forEach((val)=>{
                        if(val.id == id){
                            this.title = val.title
                            this.$refs.title.focus()
                            this.saveId = val.id
                            this.embed = val.embed
                        }
                        })
            },
            saveVideo(id){
                let url = ""
                    let data = {
                        title:this.title,
                        embed:this.embed
                    }
                if(id == 0){
                   url = `/admin/video` 
                   axios.post(url,data)
                   .then(res=>{
                    this.res_status = res.data.msg
                    },err=>{
                        this.res_status = `<span class="badge badge-danger">
                        ${err.response.data.message}</span>`
                    })
                }else{
                   url = `/admin/video/${id}`
                   axios.put(url,data)
                   .then(res=>{
                    this.res_status = res.data.msg
                    },err=>{
                        this.res_status = `<span class="badge badge-danger">
                        ${err.response.data.message}</span>`
                    })
                }    
                setTimeout(()=>{
                    this.$emit('getVideos')
                    this.clearForm()
                        },2000)
            },
            clearForm(){
                this.embed = ""
                this.title = ""
                this.saveId = 0
                this.res_status = ""
            },

        },
}
</script>
