<template>
    <div>
        <div class="row">
            <div class="col-lg-12 pt-4">
                <form>
                   <div class="form-group">
                        <input v-model="title" class="form-control" type="text" 
                        ref="title" placeholder="Photo title">
                   </div>

                   <div class="form-group">
                        <input v-model="embed" class="form-control" type="text" 
                        placeholder="embed photo url : www.url.co/photo.jpg">
                   </div>
                   
                   <div class="clearfix">
                        <div class="float-left">
                            <span v-html="res_status">
                                {{res_status}}
                            </span>
                        </div>
                       <div class="float-right">
                            <div class="btn-group">
                                <button class="btn btn-outline-primary" 
                                @click.prevent="savePhoto(saveId)">
                                    Save
                                </button>
                            </div>
                       </div>
                   </div>
                </form>
            </div><!-- end of div.col-lg-12 -->
        </div><!-- end of div.row -->
    </div><!-- end of div.container -->
</template>


<script>

export default{
    name:"PhotoForm",
    props:["photos","editId"],
             data(){
                 return{
                    title:"",
                    embed:"",
                    saveId:0,
                    res_status:'',
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
                this.photos.data.forEach((val)=>{
                        if(val.id == id){
                            this.title = val.title
                            this.saveId = val.id
                            this.embed = val.embed
                        }
                        })
            },
            savePhoto(id){
                let data = {
                    title:this.title,
                    embed:this.embed
                }       
                let url = ""
                    if(id){
                        url = `/admin/photo/${id}`
                        axios.put(url,data)
                        .then(res=>{
                            this.res_status = res.data.msg
                            },err=>{
                                this.res_status = `<span 
                                class="badge badge-danger">
                                ${err.response.data.message}</span>`
                            })
                    }else{
                        url = `/admin/photo`
                        axios.post(url,data)
                        .then(res=>{
                            this.res_status = res.data.msg
                            },err=>{
                                this.res_status = `<span 
                                class="badge badge-danger">
                                ${err.response.data.message}</span>`
                            })
                    }
                setTimeout(()=>{
                    this.$emit('getPhotos')
                    this.clearForm()
                        },2000)
            },
            clearForm(){
                this.title = ''
                this.embed = ''
                this.res_status = ''
                this.saveId = 0
            },
        },
}
</script>
