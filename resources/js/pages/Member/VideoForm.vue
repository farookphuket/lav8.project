<template>
    <div>
        <div class="row">
            <div class="col-lg-12 pt-4">
                <form>
                    <div class="form-group">
                        <input v-model="title" class="form-control" 
                        type="text" placeholder="Enter video title" ref="title">
                    </div>
                    <div class="form-group">
                        <textarea v-model="embed" class="form-control" 
                        placeholder="Enter the embed code"></textarea>
                    </div>
                    <div class="clearfix">
                        <div class="float-left">
                            <div v-html="res_status">
                                {{res_status}}
                            </div>
                        </div>
                        <div class="float-right">
                            <button 
                            class="btn btn-outline-primary" 
                            @click.prevent="videoSave(saveId)">Save</button>
                        </div>
                    </div>
                </form>
            </div><!-- end of div.col-lg-12 form -->

        </div><!-- end of div.row -->
    </div><!-- end of div.container -->
</template>

<script>
export default{
    name:"VideoForm",
    props:["editId","videos"],
             data(){
                 return{
                    saveId:0,
                    title:"",
                    embed:"",
                    res_status:"",
                 }
             },
watch:{
          "editId":function(x){
            this.getEditData(x)
          }
      },
methods:{
            getEditData(id){
                if(id == 0){
                    return
                }
                this.videos.data.forEach((val)=>{
                        if(val.id == id){
                            this.title = val.title
                            this.embed = val.embed
                            this.saveId = val.id
                            this.$refs.title.focus()
                        }
                        })
            },
            videoSave(id){
                let url = ""
                    let data = {
                        title:this.title,
                        embed:this.embed
                    }
                    if(id){
                        url = `/member/video/${id}`
                        axios.put(url,data)
                        .then(res=>{
                            this.res_status = res.data.msg
                            },err=>{
                               this.res_status = `<span 
                               class="badge badge-danger">
                               ${err.response.data.message}
                               </span>` 
                            })
                    }else{
                        url = `/member/video`
                        axios.post(url,data)
                        .then(res=>{
                            this.res_status = res.data.msg
                        })
                    }
                    
                    setTimeout(()=>{
                        this.clearForm()
                        this.$emit('getVideos')
                            },2000)
                        
            },
            clearForm(){
                this.title = ""
                this.saveId = ""
                this.res_status = ""
                this.embed = ""
            },
        },
}
</script>
